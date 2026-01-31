import { DealInput, DealAnalysisResponse, HealthCheckResponse, ApiError } from "./types";

/**
 * Backend API base URL
 * In production, this should be configured via environment variable
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Custom error class for API errors
 */
export class DealApiError extends Error {
  status: number;
  detail?: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "DealApiError";
    this.status = status;
    this.detail = detail;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        error: "Request failed",
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    throw new DealApiError(
      errorData.message || errorData.error,
      response.status,
      errorData.detail
    );
  }

  return response.json();
}

/**
 * Check backend health status
 * GET /health
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
  return apiFetch<HealthCheckResponse>("/health");
}

/**
 * Analyze a real estate deal
 * POST /deal/analyze
 * 
 * @param deal - Deal input data matching backend schema
 * @returns Analysis results including AI-generated memo
 * @throws DealApiError on validation or server errors
 */
export async function analyzeDeal(deal: DealInput): Promise<DealAnalysisResponse> {
  return apiFetch<DealAnalysisResponse>("/deal/analyze", {
    method: "POST",
    body: JSON.stringify(deal),
  });
}

/**
 * Validate deal input before sending to API
 */
export function validateDealInput(deal: DealInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // City validation
  const supportedCities = ["mumbai", "bangalore", "hyderabad"];
  if (!supportedCities.includes(deal.city.toLowerCase())) {
    errors.push(`City "${deal.city}" is not supported. Please use Mumbai, Bangalore, or Hyderabad.`);
  }

  // Property price validation
  if (!deal.property_price || deal.property_price <= 0) {
    errors.push("Property price must be greater than 0");
  }

  // Expected rent validation
  if (!deal.expected_rent || deal.expected_rent <= 0) {
    errors.push("Expected rent must be greater than 0");
  }

  // Annual costs validation
  if (deal.annual_costs < 0) {
    errors.push("Annual costs cannot be negative");
  }

  // Appreciation rate validation
  if (deal.appreciation_rate < 0 || deal.appreciation_rate > 25) {
    errors.push("Appreciation rate must be between 0% and 25%");
  }

  // Loan years validation
  if (!deal.loan_years || deal.loan_years <= 0 || deal.loan_years > 40) {
    errors.push("Investment horizon must be between 1 and 40 years");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
