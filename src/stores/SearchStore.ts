import { Ref, ref } from "vue"
import { defineStore } from "pinia"
import { SearchShowResults, ShowInterface } from "../types/ShowInterface"

export const useSearchStore = defineStore({
	id: "search",
	state: (): Ref<SearchShowResults> =>
		ref({
			searchQuery: "",
			searchResults: [], // initialiser le tableau
		}),
	actions: {
		updateSearchQuery(results: SearchShowResults) {
			this.searchQuery = results.searchQuery
			this.searchResults = results.searchResults
		},
		searchShow(show: ShowInterface) {
			show && true
		},
	},
})
