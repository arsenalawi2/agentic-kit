---
name: dirham-symbol
description: Guide for using the new UAE Dirham (AED) currency symbol in all your projects. Covers font loading, CSS setup, Vue/HTML usage patterns, USD-to-AED conversion, and dark mode. Read this whenever building financial displays, cost breakdowns, pricing, or any UI showing monetary values.
---

# UAE Dirham Symbol (AED)

All your projects display costs in **AED (UAE Dirham)** using the official new Dirham symbol, not USD. The symbol is provided as a custom web font where the character `ê` (U+00EA) renders as the Dirham glyph.

**Source:** [abdulrysrr/new-dirham-symbol](https://github.com/abdulrysrr/new-dirham-symbol) (MIT license)

## Quick Start

### 1. Install the font files

Copy these three files into your project's `public/fonts/` directory:

```
public/fonts/dirham-symbol.woff2   (1 KB — primary, best compression)
public/fonts/dirham-symbol.woff    (3 KB — fallback)
public/fonts/dirham-symbol.ttf     (2 KB — legacy fallback)
```

Font files are available in the design-system assets or via npm:
```bash
npm i new-dirham-symbol
```

### 2. Add the CSS `@font-face`

Add this at the top of your main stylesheet (or in `<style>` for single-file apps):

```css
@font-face {
  font-family: 'UAESymbol';
  src: url('/fonts/dirham-symbol.woff2') format('woff2'),
       url('/fonts/dirham-symbol.woff') format('woff'),
       url('/fonts/dirham-symbol.ttf') format('truetype');
  font-display: swap;
}

.dirham-symbol {
  font-family: 'UAESymbol', sans-serif;
  font-size: inherit;
  color: inherit;
  font-weight: bold;
}
```

### 3. Use in HTML/Vue templates

```html
<!-- Inline in templates -->
<span class="dirham-symbol">&#xea;</span> 10,000

<!-- In stat cards -->
<div class="stat-value">
  <span class="dirham-symbol">&#xea;</span> {{ formatAED(cost) }}
</div>

<!-- In tables -->
<td class="r mono">
  <span class="dirham-symbol">&#xea;</span> {{ formatAED(row.cost) }}
</td>
```

### 4. JavaScript conversion helper

The backend stores costs in USD (since APIs bill in USD). Convert to AED on the frontend:

```javascript
const USD_TO_AED = 3.6725  // Fixed peg — no live API needed

function toAED(usd) {
  return Math.round((usd || 0) * USD_TO_AED)
}

function formatAED(usd) {
  return toAED(usd).toLocaleString()
}
```

### 5. For Vue column formatters (v-html required)

When the Dirham symbol is returned from a JS function (not a template), use `v-html` to render it:

```javascript
const DIRHAM_HTML = '<span class="dirham-symbol">&#xea;</span>'

const columns = [
  { key: 'cost', label: 'Cost (AED)', fmt: v => DIRHAM_HTML + ' ' + formatAED(v) },
]
```

```html
<!-- Use v-html, NOT {{ }} for columns that return HTML -->
<td v-html="col.fmt(row[col.key])"></td>
```

> **Important:** `{{ col.fmt(...) }}` renders HTML as text. Always use `v-html` when the formatter returns HTML containing the Dirham symbol span.

## Usage Guidelines

Follow the [official UAE Dirham symbol guidelines](https://github.com/abdulrysrr/new-dirham-symbol):

| Rule | Detail |
|------|--------|
| **Position** | Place symbol to the **left** of the numeral |
| **Spacing** | One space between symbol and number: `د.إ 10,000` not `د.إ10,000` |
| **Proportions** | Do not stretch or distort — use `font-size: inherit` |
| **Alignment** | Match the symbol's height with surrounding text |
| **Direction** | Follow text direction (LTR for English contexts) |
| **Contrast** | Ensure legibility against background (works with EZ Design System light/dark modes) |

## Patterns

### Stat Cards
```html
<div class="stat-card">
  <div class="stat-value"><span class="dirham-symbol">&#xea;</span> {{ formatAED(totalCost) }}</div>
  <div class="stat-label">Est. Cost (AED)</div>
</div>
```

### Cost Breakdown Rows
```html
<div class="cost-row" v-for="item in costBreakdown" :key="item.label">
  <span class="cost-name">{{ item.label }}</span>
  <span class="cost-amount">
    <span class="dirham-symbol">&#xea;</span> {{ formatAED(item.cost) }}
  </span>
</div>
```

### Inline in Text
```html
<p>Total project cost: <span class="dirham-symbol">&#xea;</span> {{ formatAED(project.cost) }}</p>
```

## Dark Mode

The `.dirham-symbol` class inherits `color: inherit`, so it automatically adapts to dark mode when used within the EZ Design System. No additional dark mode styles are needed.

## What NOT To Do

- **Don't use `$` or `USD`** — all your projects show AED
- **Don't use `{{ }}` for formatters returning HTML** — use `v-html`
- **Don't convert on the backend** — store USD, convert on frontend only
- **Don't use a live exchange rate API** — USD/AED is a fixed peg (3.6725)
- **Don't use plain text `AED`** when the symbol font is available — use the glyph
- **Don't hardcode converted values** — always compute from the USD source

## Font Reference

| Property | Value |
|----------|-------|
| Font family | `UAESymbol` |
| Unicode character | `U+00EA` (`ê`) |
| HTML entity | `&#xea;` |
| CSS content | `content: '\00EA'` |
| Formats | woff2, woff, ttf |
| Total size | ~6 KB (all formats) |
| Glyph count | 1 (Dirham symbol only) |
