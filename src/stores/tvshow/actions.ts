import { Ref } from "vue";
import { state } from "./state";
import api from "@/api/shows";

import {
  ShowInterface,
  SearchShowResults,
  ShowCardInterface
} from "@/types/ShowInterface";
import { useButtonStore } from "@/stores/ButtonStore";

export const actions = {
  searchShow: async (
    results: Ref<SearchShowResults>,
    searchInput: Ref<string>
  ) => {
    results.value.searchQuery = searchInput.value;
    const showReq = await api.getShows(results.value);
    if (showReq !== undefined) {
      results.value.searchResults = showReq as [];
    }
  },

  actionList: (show: ShowInterface, mode: ShowCardInterface["mode"]) => {
    actions.isInMyList(show, mode);
    //add a show to list
    if (mode === "search") {
      const buttonStore = useButtonStore();
      buttonStore.updateButtonState("list");

      show.show.isSelected = true; // injected when button is click from search results
      actions.addShowToLocalStorage(show, "list"); // injected to localStorage too
      state.myList.value = actions.getShowsFromLocalStorage("list"); // unshift to always push to the beginning
    }

    //add a show what to watch
    if (mode === "list" && show.show.id) {
      const isInMyList = actions.isInMyList(show, "watch");

      // if number means the index was found
      if (typeof isInMyList === "number") {
        // remove from watch
        actions.removeShowFromLocalStorage(show, "watch");
        state.watchTonight.value?.splice(isInMyList, 1);
      } else {
        //  add to watch
        actions.addShowToLocalStorage(show, "watch");
        state.watchTonight.value?.push(show);
      }
    }
  },

  // Add a show to localStorage
  addShowToLocalStorage(show: ShowInterface, mode: ShowCardInterface["mode"]) {
    const whatToWatch = localStorage.getItem(mode) ?? "";
    let whatToWatchObj: ShowInterface[] = [];

    if (whatToWatch.length > 0) {
      // Attempt to parse, ensuring the result is an array
      const parsedWhatToWatch = JSON.parse(whatToWatch);
      whatToWatchObj = Array.isArray(parsedWhatToWatch)
        ? parsedWhatToWatch
        : [];
    } else {
      whatToWatchObj = [];
    }

    // Add the new show
    whatToWatchObj.unshift(show);

    // Update local storage
    localStorage.setItem(mode, JSON.stringify(whatToWatchObj));
  },

  // get shows from localStorage
  getShowsFromLocalStorage(
    mode: ShowCardInterface["mode"]
  ): ShowInterface[] | null {
    const whatToWhatchStr: string | null = localStorage.getItem(mode);
    return whatToWhatchStr ? JSON.parse(whatToWhatchStr) : null;
  },

  // remove a show from localStorage
  removeShowFromLocalStorage(
    show: ShowInterface,
    mode: ShowCardInterface["mode"]
  ) {
    const isInMyList: number | false = actions.isInMyList(show, mode);
    const getShows = actions.getShowsFromLocalStorage(mode);
    // check if the type is a number (0 & 1 converts to true / false)
    typeof isInMyList === "number" && getShows?.splice(isInMyList, 1);

    localStorage.setItem(mode, JSON.stringify(getShows));
  },

  randWhatToWatch(): ShowInterface | null {
    const whatToWatchList = actions.getShowsFromLocalStorage("watch");

    if (whatToWatchList) {
      const randomizeWatchIndex = Math.floor(
        Math.random() * whatToWatchList.length
      );
      return (state.suggestWhatToWatch.value =
        whatToWatchList[randomizeWatchIndex]);
    }
    return (state.suggestWhatToWatch.value = {} as ShowInterface);
  },

  // check if the clicked show is already in our list
  isInMyList: (
    show: ShowInterface,
    mode: ShowCardInterface["mode"]
  ): number | false => {
    const getShowsFromLocalStorage = actions.getShowsFromLocalStorage(mode);
    const index = getShowsFromLocalStorage?.findIndex(
      obj => obj.show.id === show.show.id
    );
    return index !== undefined && index > -1 && index;
  }
};
