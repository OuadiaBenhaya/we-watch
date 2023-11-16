import { ref } from "vue";
import { ShowInterface } from "@/types/ShowInterface";

export const state = {
  results: ref({
    searchQuery: "",
    searchResults: [] as ShowInterface[]
  })
};
