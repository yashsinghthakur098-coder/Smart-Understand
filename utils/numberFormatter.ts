/**
 * Utility functions for formatting numbers in the calculator
 */

/**
 * Formats a number with commas for thousands
 * @param value The number to format
 * @returns Formatted string
 */
export const formatNumber = (value: number | string): string => {
  if (value === '' || value === undefined || value === null) return '0';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0';
  
  // Handle decimal precision
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
};

/**
 * Clean up an expression for display (e.g., replace * with ×, / with ÷)
 */
export const formatExpression = (expression: string): string => {
  return expression
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/-/g, ' - ')
    .replace(/sin\(/g, 'sin(')
    .replace(/cos\(/g, 'cos(')
    .replace(/tan\(/g, 'tan(')
    .replace(/log\(/g, 'log(')
    .replace(/ln\(/g, 'ln(')
    .replace(/sqrt\(/g, '√(');
};
