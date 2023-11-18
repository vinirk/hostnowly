/**
 * Formats a numerical value into a currency string.
 * Utilizes the Internationalization API for locale-aware formatting.
 *
 * @param {number} value - The numerical amount to be formatted.
 * @param {string} [currency='USD'] - The ISO 4217 currency code. Defaults to 'USD'.
 * @param {string} [locale='en-US'] - The locale identifier (e.g., 'en-US'). Defaults to 'en-US'.
 * @returns {string} - The formatted currency string.
 *
 * The function formats the number based on the specified locale and currency.
 * If the number is a whole number, it omits the fractional part. Otherwise, it includes two decimal places.
 *
 * Example:
 * formatCurrency(1234.56) returns "$1,234.56 USD"
 * formatCurrency(1234, 'EUR', 'de-DE') returns "1.234,00 € EUR"
 */
export default function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

  return `${formattedValue} ${currency}`;
}
