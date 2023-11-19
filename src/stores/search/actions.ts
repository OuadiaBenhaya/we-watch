import { state } from "./state"
import api from "@/api/shows"
import { SearchShowResults } from "@/types/ShowInterface"

export const actions = {
  showSearch: async () => {
    const response = await api.getShows(state.results.value)
    state.loadedResults.value = response.length ? true : false
    state.results.value.searchResults = response
  },
  setSearchQuery(val: SearchShowResults["searchQuery"]) {
    state.results.value.searchQuery = val
  }
}
