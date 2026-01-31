import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { useDealAnalysis } from "@/contexts/DealAnalysisContext";

const processingSteps = [
  { message: "Validating input data...", duration: 500 },
  { message: "Connecting to analysis engine...", duration: 800 },
  { message: "Evaluating market conditions...", duration: 1200 },
  { message: "Calculating financial metrics...", duration: 1000 },
  { message: "Generating AI investment memo...", duration: 2000 },
];

interface AIProcessingStepProps {
  onComplete: () => void;
  onError: (error: string) => void;
}

export function AIProcessingStep({ onComplete, onError }: AIProcessingStepProps) {
  const { runAnalysis, analysisError, isAnalyzing } = useDealAnalysis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  // Start the API call when component mounts
  useEffect(() => {
    if (!apiCalled) {
      setApiCalled(true);
      runAnalysis().then((success) => {
        setApiSuccess(success);
      });
    }
  }, [apiCalled, runAnalysis]);

  // Animate through steps while API is processing
  useEffect(() => {
    if (currentIndex >= processingSteps.length) {
      // All animation steps done, wait for API
      if (!isAnalyzing && apiCalled) {
        if (apiSuccess && !analysisError) {
          setTimeout(onComplete, 500);
        } else if (analysisError) {
          onError(analysisError);
        }
      }
      return;
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, processingSteps[currentIndex].duration);

    return () => clearTimeout(timer);
  }, [currentIndex, isAnalyzing, apiCalled, apiSuccess, analysisError, onComplete, onError]);

  // Handle error mid-animation
  useEffect(() => {
    if (analysisError && !isAnalyzing) {
      // Give a small delay for visual feedback
      setTimeout(() => onError(analysisError), 500);
    }
  }, [analysisError, isAnalyzing, onError]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      {/* Animated ring */}
      <div className="relative mb-12">
        <div className="h-32 w-32 animate-pulse-ring rounded-full border-4 border-primary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-primary" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-primary shadow-glow" />
        </div>
      </div>

      {/* Status messages */}
      <div className="w-full max-w-md space-y-3">
        {processingSteps.map((step, index) => (
          <div
            key={step.message}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 transition-all duration-300",
              completedSteps.includes(index) && "border-success/30 bg-success/5",
              index === currentIndex && "border-primary/30 bg-primary/5",
              analysisError && index === currentIndex && "border-destructive/30 bg-destructive/5"
            )}
            style={{
              opacity: index <= currentIndex ? 1 : 0.4,
              transform: index <= currentIndex ? "translateX(0)" : "translateX(8px)",
              transition: "all 0.3s ease-out",
            }}
          >
            <div className="flex h-6 w-6 items-center justify-center">
              {completedSteps.includes(index) ? (
                <Check className="h-4 w-4 text-success" />
              ) : index === currentIndex ? (
                analysisError ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )
              ) : (
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                completedSteps.includes(index)
                  ? "text-success"
                  : index === currentIndex
                  ? analysisError
                    ? "text-destructive"
                    : "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.message}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-full max-w-md">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              analysisError ? "bg-destructive" : "bg-gradient-primary"
            )}
            style={{ width: `${(completedSteps.length / processingSteps.length) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {analysisError
            ? "Analysis failed"
            : completedSteps.length === processingSteps.length
            ? isAnalyzing
              ? "Finalizing analysis..."
              : "Analysis complete!"
            : `Processing... ${Math.round((completedSteps.length / processingSteps.length) * 100)}%`}
        </p>
      </div>
    </div>
  );
}
