"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UrlState {
  search: string;
  genres: string[];
  page: number;
}

export default function useUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log("🔄 useUrlState render - searchParams:", searchParams.toString());

  const state = useMemo((): UrlState => {
    const search = searchParams.get("q") || "";
    const genresParam = searchParams.get("genres") || "";
    const genres = genresParam ? genresParam.split(",").filter(Boolean) : [];
    const page = Number.parseInt(searchParams.get("page") || "1", 10);

    const newState = { search, genres, page };
    console.log("📊 State computed:", newState);
    return newState;
  }, [searchParams]);

  const updateState = useCallback(
    (updates: Partial<UrlState>) => {
      console.log("🔄 updateState called with:", updates);

      // Get current state fresh from searchParams instead of using the memoized state
      const currentSearch = searchParams.get("q") || "";
      const currentGenresParam = searchParams.get("genres") || "";
      const currentGenres = currentGenresParam
        ? currentGenresParam.split(",").filter(Boolean)
        : [];
      const currentPage = Number.parseInt(searchParams.get("page") || "1", 10);
      const currentState = {
        search: currentSearch,
        genres: currentGenres,
        page: currentPage,
      };

      const newState = { ...currentState, ...updates };
      console.log("🔄 newState:", newState);

      const params = new URLSearchParams();

      // Only set search param if it's not empty
      if (newState.search && newState.search.trim() !== "") {
        params.set("q", newState.search);
      }

      // Only set genres param if there are genres
      if (newState.genres.length > 0) {
        params.set("genres", newState.genres.join(","));
      }

      // Only set page param if it's greater than 1
      if (newState.page > 1) {
        params.set("page", newState.page.toString());
      }

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : "/";

      // Always navigate to ensure URL is updated (even if it means removing params)
      const currentUrl = searchParams.toString()
        ? `?${searchParams.toString()}`
        : "/";

      if (newUrl !== currentUrl) {
        console.log("📍 Navigating to:", newUrl, "from:", currentUrl);
        router.push(newUrl, { scroll: false });
      } else {
        console.log("⚠️ Skipping navigation - URL unchanged:", newUrl);
      }
    },
    [router, searchParams]
  );

  return {
    state,
    updateState,
  };
}
