import type { Cartoon } from "@/types/cartoon";

const API_BASE_URL = "https://api.sampleapis.com/cartoons/cartoons2D";

export const cartoonAPI = {
  async fetchCartoons(): Promise<Cartoon[]> {
    try {
      const response = await fetch(API_BASE_URL);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch cartoons: ${response.status}`);
      }

      const data = await response.json();

      // Make sure we got an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data received from server");
      }

      // Clean up the data to make sure it has what we need
      return data.map((cartoon, index) => ({
        ...cartoon,
        id: cartoon.id || index + 1,
        creator: Array.isArray(cartoon.creator)
          ? cartoon.creator
          : [cartoon.creator || "Unknown"],
        genre: Array.isArray(cartoon.genre)
          ? cartoon.genre
          : [cartoon.genre || "Unknown"],
        image: cartoon.image || "/whimsical-cartoon-scene.jpg",
      }));
    } catch (error) {
      // Simple error handling
      if (error instanceof Error) {
        throw new Error(`Error loading cartoons: ${error.message}`);
      }
      throw new Error("Something went wrong while loading cartoons");
    }
  },

  // Filter cartoons by search term and genres
  filterCartoons(
    cartoons: Cartoon[],
    search = "",
    genres: string[] = []
  ): Cartoon[] {
    let filtered = cartoons;

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((cartoon) =>
        cartoon.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by genres
    if (genres.length > 0) {
      filtered = filtered.filter((cartoon) =>
        genres.some((genre) => cartoon.genre.includes(genre))
      );
    }

    return filtered;
  },

  // Simple pagination
  paginateCartoons(cartoons: Cartoon[], page = 1, itemsPerPage = 50) {
    const totalCount = cartoons.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCartoons = cartoons.slice(startIndex, endIndex);

    return {
      cartoons: paginatedCartoons,
      totalCount,
      currentPage: page,
      totalPages,
    };
  },

  // Get all unique genres from cartoons
  getGenres(cartoons: Cartoon[]): string[] {
    const genres = new Set<string>();

    cartoons.forEach((cartoon) => {
      cartoon.genre.forEach((genre) => genres.add(genre));
    });

    return Array.from(genres).sort();
  },

  // Main function that combines everything
  async searchAndFilterCartoons(
    search = "",
    genres: string[] = [],
    page = 1,
    itemsPerPage = 50
  ) {
    // 1. Fetch all cartoons
    const allCartoons = await this.fetchCartoons();

    // 2. Filter them
    const filtered = this.filterCartoons(allCartoons, search, genres);

    // 3. Paginate them
    return this.paginateCartoons(filtered, page, itemsPerPage);
  },

  // Get all genres
  async getAllGenres(): Promise<string[]> {
    const allCartoons = await this.fetchCartoons();
    return this.getGenres(allCartoons);
  },
};
