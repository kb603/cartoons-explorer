export interface Cartoon {
  id: number;
  title: string;
  year: number;
  creator: string[];
  rating: string;
  genre: string[];
  runtime_in_minutes: number;
  episodes: number;
  image: string;
  wikiUrl?: string;
}

export interface CartoonFilters {
  search: string;
  genres: string[];
  page: number;
}

export interface CartoonResponse {
  cartoons: Cartoon[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
