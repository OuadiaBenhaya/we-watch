import { defineStore } from "pinia"
import { UpdateButtonTextState } from "../types/ShowInterface"

export const useButtonStore = defineStore("button", {
	state: () => ({
		buttonText: "Ajouter à ma liste",
	}),
	getters: {},
	actions: {
		updateButtonState(mode: UpdateButtonTextState["mode"]) {
			let updateTextButton = ""
			switch (mode) {
			case "search":
				updateTextButton = "Ajouter à ma liste"
				break
			case "list":
				updateTextButton = "Ajouté"
				break
			case "watch":
				updateTextButton = "Je vais regarder quoi ce soir ?"
				break
			}
			this.buttonText = updateTextButton
		},
	},
})
