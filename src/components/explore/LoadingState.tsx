
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

interface LoadingStateProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const LoadingState = ({ isLoading, isError, onRetry }: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertTitle>Error loading hotels</AlertTitle>
          <AlertDescription>
            Something went wrong while fetching hotels. Please try again.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={onRetry} className="mt-2" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingState;
