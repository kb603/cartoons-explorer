"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search cartoons...",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasChangedRef = useRef(false);

  // Custom debounce with cancellation capability
  const debouncedOnChange = useCallback(
    (searchValue: string) => {
      // Clear any existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        console.log(
          "🔍 SearchBar: Debounced onChange called with:",
          searchValue
        );
        if (searchValue !== value) {
          onChange(searchValue);
        }
        debounceTimerRef.current = null;
      }, 500);
    },
    [onChange, value]
  );

  // Sync localValue with prop value (handles external updates like URL changes)
  useEffect(() => {
    if (value !== localValue && !hasChangedRef.current) {
      console.log("📥 SearchBar: Syncing with external value:", value);
      setLocalValue(value);
    }
    hasChangedRef.current = false;
  }, [value, localValue]);

  // Handle input changes with debouncing
  useEffect(() => {
    if (hasChangedRef.current && localValue !== value) {
      console.log("⏳ SearchBar: Setting up debounced call for:", localValue);
      debouncedOnChange(localValue);
    }
  }, [localValue, value, debouncedOnChange]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log("⌨️ SearchBar: Input changed:", newValue);
    hasChangedRef.current = true;
    setLocalValue(newValue);
  };

  const handleClear = () => {
    console.log("🧹 SearchBar: Clear button clicked");

    // Cancel any pending debounced call
    if (debounceTimerRef.current) {
      console.log("❌ SearchBar: Cancelling pending debounced call");
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    hasChangedRef.current = true;
    setLocalValue("");
    // Immediately call onChange to bypass debouncing for clear action
    onChange("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={handleInputChange}
          className="pl-10 pr-10 h-12 text-base bg-input border-border focus:ring-primary"
        />
        {localValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
