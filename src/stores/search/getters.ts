import { state } from "./state"
import { ShowInterface, SearchShowResults } from "@/types/ShowInterface"

export const getters = {
  getSearchResults(): ShowInterface[] {
    // search results coming from @/api/GetShows
    return state.results.value.searchResults
  },
  getSearchQuery(): SearchShowResults["searchQuery"] {
    return state.results.value.searchQuery
  },
  isSearchResults(): boolean {
    return state.results.value.searchResults &&
      state.results.value.searchResults.length > 0
      ? true
      : false
  }
}
