"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";

interface GenreFilterProps {
  availableGenres: string[];
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
  loading?: boolean;
}

export default function GenreFilter({
  availableGenres,
  selectedGenres,
  onChange,
  loading,
}: GenreFilterProps) {
  const [open, setOpen] = useState(false);

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    onChange(newGenres);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleSelectAll = () => {
    onChange(availableGenres);
  };

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-12 justify-start gap-2 min-w-[200px] bg-transparent"
          >
            <Filter className="h-4 w-4" />
            Filter by Genre
            {selectedGenres.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {selectedGenres.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Filter by Genre</h4>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={loading}
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  disabled={loading}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="h-64">
            <div className="p-4 space-y-3">
              {loading ? (
                <div className="text-center text-muted-foreground py-4">
                  Loading genres...
                </div>
              ) : (
                availableGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={() => handleGenreToggle(genre)}
                    />
                    <label
                      htmlFor={genre}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {genre}
                    </label>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedGenres.map((genre) => (
            <Badge key={genre} variant="secondary" className="gap-1">
              {genre}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleGenreToggle(genre)}
                className="h-auto p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
