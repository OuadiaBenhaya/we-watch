import { ShowInterface } from "@/types/ShowInterface"
import { ref } from "vue"

export const state = {
  myList: ref<ShowInterface[] | null>([]),
  watchTonight: ref<ShowInterface[]>(),
  suggestWhatToWatch: ref<ShowInterface>({
    score: 0,
    show: {
      id: 0,
      name: "title",
      summary: "lorem",
      image: {
        medium: "string",
        original: "string"
      },
      premiered: "string",
      length: 0,
      averageRuntime: 0,
      rating: {
        average: 10
      },
      isSelected: false
    }
  }),
  buttonWatchClick: ref(false)
}
