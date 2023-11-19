import { ref } from "vue"
import { SearchShowResults } from "@/types/ShowInterface"

export const state = {
  results: ref<SearchShowResults>({
    searchQuery: "",
    searchResults: []
  }),
  loadedResults: ref(false)
}
