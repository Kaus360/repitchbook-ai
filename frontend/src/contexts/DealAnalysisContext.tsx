import { createContext, useContext, useState, ReactNode } from "react";
import { 
  PropertyFormData, 
  FinancialFormData, 
  DealAnalysisResponse, 
  DealInput,
  transformFormToApiInput 
} from "@/lib/api/types";
import { analyzeDeal, validateDealInput, DealApiError } from "@/lib/api/dealService";

interface DealAnalysisContextType {
  // Form data
  propertyData: PropertyFormData;
  financialData: FinancialFormData;
  
  // Analysis state
  analysisResult: DealAnalysisResponse | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  
  // Actions
  setPropertyData: (data: Partial<PropertyFormData>) => void;
  setFinancialData: (data: Partial<FinancialFormData>) => void;
  runAnalysis: () => Promise<boolean>;
  resetAnalysis: () => void;
  clearError: () => void;
}

const DealAnalysisContext = createContext<DealAnalysisContextType | undefined>(undefined);

const initialPropertyData: PropertyFormData = {
  city: "",
  purchasePrice: "",
  monthlyRent: "",
  investmentHorizon: 5,
};

const initialFinancialData: FinancialFormData = {
  operatingCosts: "",
  appreciationRate: 3.5,
};

export function DealAnalysisProvider({ children }: { children: ReactNode }) {
  const [propertyData, setPropertyDataState] = useState<PropertyFormData>(initialPropertyData);
  const [financialData, setFinancialDataState] = useState<FinancialFormData>(initialFinancialData);
  const [analysisResult, setAnalysisResult] = useState<DealAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const setPropertyData = (data: Partial<PropertyFormData>) => {
    setPropertyDataState(prev => ({ ...prev, ...data }));
  };

  const setFinancialData = (data: Partial<FinancialFormData>) => {
    setFinancialDataState(prev => ({ ...prev, ...data }));
  };

  const runAnalysis = async (): Promise<boolean> => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      // Transform frontend data to API format
      const apiInput: DealInput = transformFormToApiInput(propertyData, financialData);
      
      // Validate before sending
      const validation = validateDealInput(apiInput);
      if (!validation.valid) {
        setAnalysisError(validation.errors.join("\n"));
        setIsAnalyzing(false);
        return false;
      }

      // Call the backend API
      const result = await analyzeDeal(apiInput);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      return true;
    } catch (error) {
      setIsAnalyzing(false);
      
      if (error instanceof DealApiError) {
        if (error.status === 400) {
          setAnalysisError(error.detail || error.message);
        } else if (error.status === 500) {
          setAnalysisError("The analysis engine encountered an error. Please try again.");
        } else {
          setAnalysisError(error.message);
        }
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        setAnalysisError("Unable to connect to the analysis server. Please check if the backend is running.");
      } else {
        setAnalysisError("An unexpected error occurred. Please try again.");
      }
      
      return false;
    }
  };

  const resetAnalysis = () => {
    setPropertyDataState(initialPropertyData);
    setFinancialDataState(initialFinancialData);
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const clearError = () => {
    setAnalysisError(null);
  };

  return (
    <DealAnalysisContext.Provider
      value={{
        propertyData,
        financialData,
        analysisResult,
        isAnalyzing,
        analysisError,
        setPropertyData,
        setFinancialData,
        runAnalysis,
        resetAnalysis,
        clearError,
      }}
    >
      {children}
    </DealAnalysisContext.Provider>
  );
}

export function useDealAnalysis() {
  const context = useContext(DealAnalysisContext);
  if (context === undefined) {
    throw new Error("useDealAnalysis must be used within a DealAnalysisProvider");
  }
  return context;
}
