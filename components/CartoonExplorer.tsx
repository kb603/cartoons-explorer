"use client";

import { useCallback } from "react";
import { useCartoons } from "@/hooks/useCartoon";
import useUrlState from "@/hooks/useUrlState";
import { ErrorState } from "./ErrorState";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import LoadingSkeleton from "./LoadingSkeleton";
import Grid from "./Grid";
import Pagination from "./Pagination";

export default function CartoonExplorer() {
  console.log('🎬 CartoonExplorer rendering');
  const { state, updateState } = useUrlState();
  console.log('🎬 CartoonExplorer state:', state);
  const { data, loading, error, retry, allGenres, genresLoading } = useCartoons(
    {
      search: state.search,
      genres: state.genres,
      page: state.page,
      itemsPerPage: 50,
    }
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      console.log('🔍 handleSearchChange called with:', search);
      updateState({ search, page: 1 });
    },
    [updateState]
  );

  const handleGenreChange = useCallback(
    (genres: string[]) => {
      console.log('🎜️ handleGenreChange called with:', genres);
      updateState({ genres, page: 1 });
    },
    [updateState]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      console.log('📑 handlePageChange called with:', page);
      updateState({ page });
    },
    [updateState]
  );

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={state.search} onChange={handleSearchChange} />
          </div>
          <GenreFilter
            availableGenres={allGenres}
            selectedGenres={state.genres}
            onChange={handleGenreChange}
            loading={genresLoading}
          />
        </div>

        {(state.search || state.genres.length > 0) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {state.search && (
              <span className="bg-muted px-2 py-1 rounded">
                Search: &apos;{state.search}&apos;
              </span>
            )}
            {state.genres.length > 0 && (
              <span className="bg-muted px-2 py-1 rounded">
                {state.genres.length} genre
                {state.genres.length !== 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : !data || data.cartoons.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No cartoons found
          </h3>
          <p className="text-muted-foreground">
            {state.search || state.genres.length > 0
              ? "Try adjusting your search or filters"
              : "No cartoons available"}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {data.cartoons.length} of {data.totalCount} cartoons
            </p>
            <p className="text-muted-foreground">
              Page {data.currentPage} of {data.totalPages}
            </p>
          </div>

          <Grid cartoons={data.cartoons} />

          {data.totalPages > 1 && (
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
