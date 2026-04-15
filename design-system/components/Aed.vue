<script setup>
// <Aed :value="1234" /> → ê 1,234 (rendered in the UAESymbol font so
// the dirham glyph shows properly in any browser).
//
// DAK default currency helper. One import, zero formatting ambiguity.
// Usage:
//   <Aed :value="1234" />               → ê 1,234
//   <Aed :value="1234.50" :decimals="2" /> → ê 1,234.50
//   <Aed :value="0.4"  :from-usd="true" /> → ê 1.47   (USD → AED at 3.6725)
//   <Aed :value="999"  compact />        → ê 999      (no space)
//   <Aed :value="999"  locale="ar-AE" /> → ê ٩٩٩     (Arabic digits)
//
// Style via the `aed-value` and `aed-symbol` classes (scoped slot-like).
import { computed } from "vue"

// Design-system constant. Keep in sync with tokens.css --usd-to-aed.
// Central bank peg has been constant since 1997 — fine to hardcode.
export const USD_TO_AED = 3.6725

const props = defineProps({
  value:    { type: Number,  required: true },
  /** 0 for summaries (integer), 2 for line items. */
  decimals: { type: Number,  default: 0 },
  /** Multiply `value` by USD_TO_AED before display. */
  fromUsd:  { type: Boolean, default: false },
  /** Omit the space between symbol and number. */
  compact:  { type: Boolean, default: false },
  /** JS Intl locale, e.g. "en-AE" (default), "ar-AE". */
  locale:   { type: String,  default: "en-AE" },
})

const formatted = computed(() => {
  const v = props.fromUsd ? props.value * USD_TO_AED : props.value
  return v.toLocaleString(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  })
})
</script>

<template>
  <span class="aed" :class="{ compact }">
    <span class="aed-symbol" aria-label="AED">&#234;</span>
    <span class="aed-value">{{ formatted }}</span>
  </span>
</template>

<style scoped>
.aed {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3em;
  white-space: nowrap;
}
.aed.compact { gap: 0.15em; }
.aed-symbol {
  font-family: "UAESymbol", sans-serif;
  font-weight: 700;
  color: inherit;
  /* Slightly smaller — the glyph tends to be optically heavier
     than Latin digits, this evens it out. */
  font-size: 0.92em;
}
.aed-value {
  font-family: inherit;
  font-variant-numeric: tabular-nums;
}
</style>
