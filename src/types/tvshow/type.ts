import { Ref } from "vue"
import { ShowCardInterface, ShowInterface } from "../ShowInterface"

export type ShowStateType = {
  shows: Ref<ShowInterface[]>
  watchTonight: Ref<ShowInterface[] | null>
  suggestWhatToWatch: Ref<ShowInterface>
  loadedResult: Ref<boolean>
  buttonWatchClick: Ref<boolean>
}

export type ShowModeParams = {
  show: ShowInterface
  mode: ShowCardInterface["mode"]
}
