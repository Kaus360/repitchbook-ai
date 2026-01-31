// Backend API Types - matches repitchbook-ai backend models

/**
 * Supported cities for deal analysis
 */
export type SupportedCity = "mumbai" | "bangalore" | "hyderabad";

/**
 * Input payload for deal analysis API
 * Maps to: POST /deal/analyze
 */
export interface DealInput {
  city: string; // Target investment city (must be one of SupportedCity)
  property_price: number; // Property purchase price (> 0)
  expected_rent: number; // Expected monthly rent (> 0)
  annual_costs: number; // Annual operating costs (>= 0)
  appreciation_rate: number; // Expected appreciation rate (0-25%)
  loan_years: number; // Investment horizon in years (1-40)
}

/**
 * Market snapshot data for a city
 */
export interface MarketSnapshot {
  avg_price_per_sqft: number;
  avg_rental_yield: number;
  avg_appreciation: number;
  vacancy_rate: number;
  liquidity_score: number;
  market_sentiment: string;
}

/**
 * Response from deal analysis API
 * Returns from: POST /deal/analyze
 */
export interface DealAnalysisResponse {
  investment_score: number; // 0-100 score
  verdict: string; // "Strong Buy" | "Buy" | "Hold" | "Avoid"
  rental_yield: number; // Percentage
  cash_flow: number; // Annual cash flow amount
  roi_percent: number; // Total ROI percentage over investment period
  roi_projection: number[]; // Array of projected values per year
  risk_level: string; // "Low" | "Moderate" | "High"
  executive_summary: string; // AI-generated summary
  recommendation: string; // Same as verdict
  market_snapshot: MarketSnapshot; // City market data
  ai_investment_memo: string; // Detailed AI-generated investment memo
}

/**
 * Health check response
 * Returns from: GET /health
 */
export interface HealthCheckResponse {
  status: "ok";
}

/**
 * API error response
 */
export interface ApiError {
  error: string;
  message: string;
  detail?: string;
}

/**
 * Frontend form data structure for property basics step
 */
export interface PropertyFormData {
  city: string;
  purchasePrice: string;
  monthlyRent: string;
  investmentHorizon: number;
}

/**
 * Frontend form data structure for financial inputs step
 */
export interface FinancialFormData {
  operatingCosts: string;
  appreciationRate: number;
}

/**
 * Combined deal form data (frontend representation)
 */
export interface DealFormData {
  property: PropertyFormData;
  financial: FinancialFormData;
}

/**
 * Transform frontend form data to backend API format
 */
export function transformFormToApiInput(
  property: PropertyFormData,
  financial: FinancialFormData
): DealInput {
  return {
    city: property.city.toLowerCase(),
    area: property.area?.toLowerCase(),
    property_price: parseFloat(property.purchasePrice.replace(/,/g, "")) || 0,
    expected_rent: parseFloat(property.monthlyRent.replace(/,/g, "")) || 0,
    annual_costs: parseFloat(financial.operatingCosts.replace(/,/g, "")) || 0,
    appreciation_rate: financial.appreciationRate,
    loan_years: property.investmentHorizon,
  };
}
