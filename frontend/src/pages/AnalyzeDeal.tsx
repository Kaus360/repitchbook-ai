import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnalyzeSteps } from "@/components/analyze/AnalyzeSteps";
import { PropertyBasicsStep } from "@/components/analyze/PropertyBasicsStep";
import { FinancialInputsStep } from "@/components/analyze/FinancialInputsStep";
import { AIProcessingStep } from "@/components/analyze/AIProcessingStep";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { useDealAnalysis } from "@/contexts/DealAnalysisContext";
import { toast } from "sonner";

const steps = ["Property Basics", "Financial Inputs", "AI Analysis"];

export default function AnalyzeDeal() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  const {
    propertyData,
    financialData,
    setPropertyData,
    setFinancialData,
    clearError,
  } = useDealAnalysis();

  const handleNext = () => {
    // Validate before moving to next step
    if (currentStep === 0) {
      if (!propertyData.city) {
        toast.error("Please select a city");
        return;
      }
      if (!propertyData.purchasePrice || parseFloat(propertyData.purchasePrice) <= 0) {
        toast.error("Please enter a valid purchase price");
        return;
      }
      if (!propertyData.monthlyRent || parseFloat(propertyData.monthlyRent) <= 0) {
        toast.error("Please enter a valid monthly rent");
        return;
      }
    }

    if (currentStep === 1) {
      if (!financialData.operatingCosts) {
        toast.error("Please enter annual operating costs (use 0 if none)");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setAnalysisError(null);
      clearError();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnalysisError(null);
      clearError();
    }
  };

  const handleAnalysisComplete = () => {
    navigate("/deal-result");
  };

  const handleAnalysisError = (error: string) => {
    setAnalysisError(error);
    toast.error("Analysis failed. Please try again.");
  };

  const handleRetry = () => {
    setAnalysisError(null);
    clearError();
    setCurrentStep(1); // Go back to financial inputs
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Analyze New Deal</h1>
          <p className="mt-2 text-muted-foreground">
            Enter property details for AI-powered investment analysis
          </p>
        </div>

        {/* Steps indicator */}
        <AnalyzeSteps currentStep={currentStep} steps={steps} />

        {/* Step content */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          {currentStep === 0 && (
            <PropertyBasicsStep
              data={propertyData}
              onChange={(data) => setPropertyData(data)}
            />
          )}
          {currentStep === 1 && (
            <FinancialInputsStep
              data={financialData}
              onChange={(data) => setFinancialData(data)}
            />
          )}
          {currentStep === 2 && !analysisError && (
            <AIProcessingStep 
              onComplete={handleAnalysisComplete} 
              onError={handleAnalysisError}
            />
          )}
          
          {/* Error state */}
          {currentStep === 2 && analysisError && (
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <div className="rounded-full bg-destructive/10 p-4 mb-6">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Failed</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                {analysisError}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleRetry}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
                <Button 
                  onClick={() => {
                    setAnalysisError(null);
                    clearError();
                  }}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep < 2 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                {currentStep === 1 ? "Run Analysis" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
