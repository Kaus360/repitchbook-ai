/**
 * Format a number to Indian Rupee currency format
 * Uses Indian numbering system (lakhs, crores)
 * e.g., 12500 -> ₹12,500
 * e.g., 125000 -> ₹1,25,000
 * e.g., 10000000 -> ₹1,00,00,000
 */
export function formatINR(amount: number): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  
  // Format using Indian numbering system
  const formatted = absAmount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
  
  return `${sign}₹${formatted}`;
}

/**
 * Format large numbers with abbreviations (L for Lakh, Cr for Crore)
 */
export function formatINRCompact(amount: number): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  
  if (absAmount >= 10000000) {
    // Crores (1,00,00,000+)
    return `${sign}₹${(absAmount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
  } else if (absAmount >= 100000) {
    // Lakhs (1,00,000+)
    return `${sign}₹${(absAmount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
  } else if (absAmount >= 1000) {
    // Thousands
    return `${sign}₹${(absAmount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  
  return formatINR(amount);
}

/**
 * Parse a string to extract numeric value (removes currency symbols, commas)
 */
export function parseAmount(value: string): number {
  return parseFloat(value.replace(/[₹$,\s]/g, "")) || 0;
}
