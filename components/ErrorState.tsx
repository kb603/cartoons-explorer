"use client";

import { Button } from "@/components/ui/button";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="flex items-center space-x-2 text-destructive">
        {isOnline ? (
          <AlertCircle className="h-6 w-6" />
        ) : (
          <WifiOff className="h-6 w-6" />
        )}
        <h3 className="text-lg font-semibold">
          {isOnline ? "Something went wrong" : "You're offline"}
        </h3>
      </div>

      <p className="text-muted-foreground text-center max-w-md text-balance">
        {isOnline
          ? message
          : "Please check your internet connection and try again when you're back online."}
      </p>

      <Button
        onClick={onRetry}
        className="flex items-center gap-2"
        disabled={!isOnline}
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>

      {!isOnline && (
        <p className="text-xs text-muted-foreground">
          The retry button will be enabled when your connection is restored.
        </p>
      )}
    </div>
  );
}
