import { state } from "./state"
import { ShowInterface } from "@/types/ShowInterface"

export const getters = {
	getSearchResults(): ShowInterface[] {
		// search results coming from @/api/GetShows
		return state.results.value.searchResults
	},
	getSearchQuery(): string {
		return state.results.value.searchQuery
	},
}
