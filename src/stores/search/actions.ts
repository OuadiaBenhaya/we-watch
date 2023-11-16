import { state } from "./state";
import api from "@/api/shows";

export const actions = {
  async showSearch() {
    // state.results.value.searchQuery = state.results.value.searchQuery; // Asign search query to the result object
    const awaitReq = await api.getShows(state.results.value);
    if (awaitReq !== undefined) {
      state.results.value.searchResults = awaitReq as [];
    }
  },
  setSearchQuery(val: string) {
    state.results.value.searchQuery = val;
  }
};
