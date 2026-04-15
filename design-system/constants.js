// Design-system constants — import into any DAK project.
//
//   import { USD_TO_AED, CURRENCY_SYMBOL, CURRENCY_CODE } from "~/design-system/constants.js"
//
// Keep in sync with tokens.css :root variables.

/** UAE central bank peg, constant since 1997. */
export const USD_TO_AED = 3.6725

/** Unicode: U+00EA. In the UAESymbol font this renders as the dirham glyph. */
export const CURRENCY_SYMBOL = "\u00EA"

/** ISO-4217 currency code. */
export const CURRENCY_CODE = "AED"

/** Format a USD amount as AED. */
export function usdToAed(usd) {
  return usd * USD_TO_AED
}

/** Render a number with the AED glyph. Returns a plain string —
 *  the glyph won't render properly unless the element (or the page)
 *  uses font-family: "UAESymbol". Prefer <Aed> for Vue contexts. */
export function formatAed(value, { decimals = 0, locale = "en-AE" } = {}) {
  return `${CURRENCY_SYMBOL} ${value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}
