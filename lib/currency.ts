export type SupportedCurrency = "INR" | "USD" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  rateFromINR: number; // approximate exchange rate for display
  basePrice: number;
  originalPrice: number;
}

export const currencies: Record<SupportedCurrency, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee (INR)",
    rateFromINR: 1,
    basePrice: 4999,
    originalPrice: 7999,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar (USD)",
    rateFromINR: 0.012,
    basePrice: 149,
    originalPrice: 249,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro (EUR)",
    rateFromINR: 0.011,
    basePrice: 139,
    originalPrice: 229,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound (GBP)",
    rateFromINR: 0.0095,
    basePrice: 119,
    originalPrice: 199,
  },
};

export function getPriceForCurrency(currency: SupportedCurrency) {
  return currencies[currency] || currencies.INR;
}
