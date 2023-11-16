import { ref } from "vue";
import { ShowStateType } from "@/types/tvshow/type";

export const state = {
  shows: ref([]),
  myList: ref([]),
  watchTonight: ref([]),
  suggestWhatToWatch: ref(),
  loadedResult: ref(false),
  buttonWatchClick: ref(false)
} as ShowStateType;
