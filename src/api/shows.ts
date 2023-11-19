import { apiService } from "./fetch"
import { SearchShowResults, ShowInterface } from "@/types/ShowInterface"

const api = {
  getShows: async (results: SearchShowResults): Promise<ShowInterface[]> => {
    try {
      // Requette à TV Maze
      const response: ShowInterface[] = await apiService.get(
        `/search/shows?q=${results.searchQuery}`
      )
      response.map(
        (item: ShowInterface): ShowInterface => ({
          score: item.score,
          show: {
            id: item?.show?.id,
            name: item?.show?.name,
            summary: item?.show?.summary,
            image: {
              medium: item?.show?.image?.medium,
              original: item?.show?.image?.original
            },
            premiered: item?.show?.premiered,
            length: item?.show?.length,
            averageRuntime: item?.show?.averageRuntime,
            rating: { average: item?.show?.rating.average },
            isSelected: false
          }
        })
      )
      return response
    } catch (error) {
      // we can handle other errors related to the API or the network...
      console.error("Failed to fetch the shows:", error)
      return []
    }
  }
}
export default api
