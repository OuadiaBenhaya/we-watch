import { defineStore } from "pinia"
import { state } from "./state"
import { actions } from "./actions"
import { getters } from "./getters"

export const useSearchStore = defineStore({
	id: "search",
	state: () => ({
		...state,
	}),
	actions,
	getters,
})
