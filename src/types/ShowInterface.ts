// Declaration des interfaces pour TV Shows, Recherche, et les functions
export interface ShowInterface {
  score: number;
  show: {
    id: number;
    name: string;
    summary: string;
    image: { medium: string; original: string };
    premiered: string;
    length: number;
    averageRuntime: number;
    rating: { average: number };
    isSelected: boolean;
  };
}

export interface SearchShowResults {
  searchQuery: string;
  searchResults: ShowInterface[] | [] | undefined;
}

export interface ShowCardInterface {
  tvshow: ShowInterface;
  mode: "search" | "list" | "watch";
}

export interface UpdateButtonTextState {
  mode: "search" | "list" | "watch";
  tvshow?: ShowInterface;
}
