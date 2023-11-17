import { defineStore } from "pinia"
import { state } from "./state"
import { actions } from "./actions"
import { getters } from "./getters"

export const useTvShowStore = defineStore({
  id: "tvshow",
  state: () => ({
    ...state
  }),
  actions,
  getters
})
