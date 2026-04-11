---
name: ez-design-system
description: Design and build frontend interfaces with the EZ Design System — analytical precision aesthetic with warm neutrals, big Space Grotesk typography, sidebar-first layouts, and overlay panels. Use this skill whenever building a new web app, dashboard, data visualization UI, landing page, or any frontend that should feel professional, analytical, and presentation-ready. Trigger for requests mentioning dashboards, admin panels, analytics, data apps, or polished UI.
---

# EZ Design System

Build interfaces that feel like Bloomberg meets clean data viz. Confident, information-dense, warm. Not a template, not a demo, not "AI-generated."

Read `reference/design-tokens.css` and copy it into the project as the foundation. Then follow the patterns below.

## Fonts

Load these three fonts in the HTML head (or via your framework's font loading):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

| Role | Font | When |
|------|------|------|
| **Display** | Space Grotesk 500-700 | Headings, stat numbers, nav items, badges, section titles |
| **Body** | DM Sans 400-700 | All readable text, descriptions, labels, form inputs |
| **Mono** | JetBrains Mono 400-500 | Code, metrics, timestamps, counts, technical values |

## Core Principles

1. **Big and Breathable** — Headings at 24-32px. Stat values at 32-56px. Labels at 14-16px. 72px vertical padding between sections. White space is a feature.

2. **One Accent Color** — Pick ONE strong hue (default: dark green #0f4024). Everything else is warm neutral. Don't double-encode information with color + icon + badge.

3. **Sidebar First** — 240px collapsible left sidebar for navigation and filters. Content takes remaining space. Detail panels slide in from right (380px).

4. **Warm Neutrals** — Never use pure black (#000) or pure white (#fff). The neutral scale is tinted warm toward brown/olive. Background is #faf9f7, not white. Text is #23221f, not black.

5. **Overlays Over Pages** — Stats, controls, and metadata go in positioned overlay boxes on top of content. Don't waste full pages on what fits in a panel.

6. **Borders Over Shadows** — Use `1px solid var(--border-light)` for containers. Shadows only for elevated overlays. Keep shadows barely visible.

7. **Presentation-Ready** — Every screen should look good projected in a meeting. If you wouldn't screenshot it, it's not done.

## What NOT to Do

- Heavy shadows or Material Design elevation
- Gradient text on headings
- Glassmorphism, blur cards, glow borders
- Bounce/elastic easing (real objects decelerate smoothly)
- Pure black or pure white anywhere
- Identical same-sized card grids repeated endlessly
- Component library default themes (no MUI/Chakra out-of-box look)
- Modals unless absolutely necessary
- Serif fonts (unless explicitly editorial)
- Neon accents in dark mode

## Color Quick Reference

```
Background:  #faf9f7 (primary)  #f6f5f3 (secondary)  #eeedeb (tertiary)
Text:        #23221f (primary)  #65635d (secondary)   #85837c (tertiary)  #a8a69f (muted)
Borders:     #e2e0dc (light)    #d1cfc9 (default)     #a8a69f (hover)
Accent:      #0f4024 (primary)  #0a2e1a (dark)        #dcfce7 (light bg)  #86efac (light)
Semantic:    #2d9d78 (success)  #d4940a (warning)     #d64545 (error)     #3B82F6 (info)
```

For dark mode, toggle `body.dark` class. Override semantic tokens, not individual components. See design-tokens.css for dark overrides.

## Type Scale

```
11px (xs) — metadata, timestamps
12px (sm) — secondary labels, table cells
14px (base) — default body text
15px (md) — slightly emphasized body
16px (lg) — section labels, prominent body
18px (xl) — subheadings
20px (2xl) — section titles
24px (3xl) — page section headings
32px (4xl) — hero/page titles
```

Weights: 400 normal, 500 medium, 600 semibold, 700 bold.

## Layout Architecture

```
+--sidebar (240px)--+--------main content--------+--detail panel (380px)--+
|  brand/logo       |                            |  (slides in on click)  |
|  navigation       |  overlay stats [controls]  |  breadcrumb trail      |
|  filters/search   |                            |  item details          |
|  ─────────────    |  main visualization        |  badges/tags           |
|  stats summary    |  or content grid           |  metadata              |
|  ─────────────    |                            |  related items         |
|  theme toggle     |  [floating FAB]            |  actions               |
+-------------------+----------------------------+------------------------+
```

The sidebar collapses to a 44px icon bar. At 960px it disappears entirely with a mobile hamburger toggle.

## Page Patterns

For detailed component code and page layout implementations, read `reference/component-patterns.md`.

### Landing/Journey Page
- Hero section: large Space Grotesk title + subtitle + stats row + CTA button
- Sections alternate bg-primary / bg-secondary backgrounds
- Each section: uppercase label (10px, accent) + heading (24px) + description + content grid
- Stats showcase: 56px numbers in accent color with 16px labels
- 3-column responsive card grids with 24px gaps

### Analytical Dashboard (Main View)
- Sidebar + full-screen visualization + detail panel
- Stats overlay boxes (absolute positioned, top-left)
- Trending items overlay (3-column, recent per source)
- Zoom/control buttons (vertical stack, top-right)
- Mobile: sidebar toggle overlay with backdrop

### List/Explore View
- Sidebar + scrollable item list + detail panel
- Header: count + sort dropdown
- Item rows: 16px vertical padding, border-bottom divider
- Row hover: background shift + subtle 2px rightward slide
- Source badge (uppercase, small) + title + significance (accent)
- Row meta line: domain, maturity (colored), type, date
- Summary line in secondary color, text-overflow ellipsis

### Analytics/Usage Dashboard
- Top nav + full-width responsive grid
- KPI cards: 6-column layout with value + label + change percentage
- Chart cards: 1-3 column grids
- Minimal D3 charts: subtle colors, grid lines, legends
- Session/activity rows with compact styling

### Detail Panel (Slide-in)
- Breadcrumb trail navigation at top
- Badges row: source, maturity, type, significance (pill-shaped)
- Summary + full description
- Concepts as clickable tags
- Metrics grid (stars, forks, downloads in mono font)
- Related items list
- External link button

## Responsive Breakpoints

```
1200px — sidebar narrows to 200px, panels to 340px
 960px — sidebar hidden, panels full-width, mobile toggle appears
 640px — text sizes reduce (base 13px, 3xl 20px, 4xl 26px), single-column grids
```

## Animations

Keep them subtle and purposeful:
- `slideUp`: 400ms ease-out, opacity 0->1, translateY(8px)->0 (list items on load)
- `fadeIn`: 200ms ease-out, opacity 0->1 (general reveals)
- Hover transitions: 150ms ease-out
- Panel reveals: 200ms ease-out
- Page transitions: 300ms ease-out
- Easing: always `cubic-bezier(0.16, 1, 0.3, 1)` — snappy deceleration

## Dark Mode

Toggle `body.dark` class. Store preference in localStorage. The token overrides handle everything:
- Backgrounds become warm darks (#1a1917, #222120, #2a2928)
- Text lightens but keeps hierarchy (#e5e4e1 primary, #a09e98 secondary)
- Borders lighten for visibility (#333230, #44433f)
- Shadows increase opacity (0.2-0.3)
- Accent colors stay the same, accent text shifts to light variant

## Framework Adaptation

This system is framework-agnostic. The design tokens (CSS variables) are the source of truth.

- **Vue 3**: Use `<style scoped>` referencing CSS variables. Import design-tokens.css globally.
- **React/Next.js**: Import design-tokens.css in layout. Use inline styles or CSS modules with variable references.
- **Tailwind CSS**: Map tokens to tailwind.config theme. Use `extend` to add the custom colors, spacing, fonts.
- **Vanilla HTML**: Just link the CSS file. It includes base resets.

## Quick Start Checklist

1. Copy `reference/design-tokens.css` into the project
2. Add the Google Fonts link to HTML head
3. Choose your accent color (default: dark green #0f4024)
4. Build sidebar-first layout
5. Use overlay boxes for stats/controls
6. Alternate section backgrounds (primary/secondary)
7. Space Grotesk for headings, DM Sans for body, JetBrains Mono for metrics
8. Test dark mode by toggling body.dark class
9. Check all three breakpoints (1200, 960, 640)
