import { Ref } from "vue";
import { state } from "./state";
import { ShowInterface } from "@/types/ShowInterface";

export const getters = {
  getMyList(): Ref<ShowInterface[] | null> {
    return state.myList;
  }
};
