import { ShowInterface } from "@/types/ShowInterface"

export interface ShowCardInterface {
  tvshow: ShowInterface | null
  mode: "search" | "watch" | "list"
}
