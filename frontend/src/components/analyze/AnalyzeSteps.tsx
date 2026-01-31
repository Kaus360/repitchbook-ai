import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AnalyzeStepsProps {
  currentStep: number;
  steps: string[];
}

export function AnalyzeSteps({ currentStep, steps }: AnalyzeStepsProps) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                index < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "hidden text-sm font-medium sm:block",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mx-4 h-px w-12 transition-colors sm:w-24",
                index < currentStep ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
