"use client";

import { useState, useEffect, useCallback } from "react";
import { cartoonAPI } from "@/lib/api";
import type { CartoonResponse } from "@/types/cartoon";

interface UseCartoonsOptions {
  search?: string;
  genres?: string[];
  page?: number;
  itemsPerPage?: number;
}

export function useCartoons({
  search = "",
  genres = [],
  page = 1,
  itemsPerPage = 50,
}: UseCartoonsOptions = {}) {
  const [data, setData] = useState<CartoonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [genresLoading, setGenresLoading] = useState(true);

  const loadCartoons = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await cartoonAPI.searchAndFilterCartoons(
        search,
        genres,
        page,
        itemsPerPage
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cartoons");
      setData(null);
    }

    setLoading(false);
  }, [search, genres, page, itemsPerPage]);

  const loadGenres = useCallback(async () => {
    setGenresLoading(true);

    try {
      const genres = await cartoonAPI.getAllGenres();
      setAllGenres(genres);
    } catch (err) {
      console.log("Could not load genres:", err);
      setAllGenres([]);
    }

    setGenresLoading(false);
  }, []);

  const retry = useCallback(() => {
    loadCartoons();
    loadGenres();
  }, [loadCartoons, loadGenres]);

  useEffect(() => {
    loadCartoons();
  }, [loadCartoons]);

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  return {
    data,
    loading,
    error,
    retry,
    allGenres,
    genresLoading,
  };
}
