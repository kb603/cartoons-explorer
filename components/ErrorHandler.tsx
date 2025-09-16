import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export default function ErrorHandler({
  message,
  onRetry,
  children,
}: ErrorProps) {
  if (!message) {
    return <>{children}</>;
  }
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="flex items-center space-x-2 text-red-600">
        <AlertTriangle className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Oops! Something went wrong</h3>
      </div>

      <p className="text-gray-600 text-center max-w-md">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
