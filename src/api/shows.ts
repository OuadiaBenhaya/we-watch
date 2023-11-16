import { apiService } from "./fetch";
import { SearchShowResults, ShowInterface } from "@/types/ShowInterface";

const api = {
  getShows: async (results: SearchShowResults): Promise<object | undefined> => {
    try {
      // Requette à TV Maze
      const response: object = await apiService.get(
        `/search/shows?q=${results.searchQuery}`
      );
      return response as ShowInterface[];
    } catch (error) {
      console.error("Failed to fetch the shows:", error);
    }
  }
};
export default api;
