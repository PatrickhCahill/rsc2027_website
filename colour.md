# Colour overview

All colours come from `src/styles/global.css`. The site uses a small set of
`--color-*` custom properties, defined once for light and once for dark. Every
component reads from these tokens; there are only three hard-coded colours (see
[Hard-coded colours](#hard-coded-colours)).

Hex values are approximate sRGB conversions of the OKLCH source values, for
reference only. The CSS itself uses OKLCH.

## Theme tokens

| Token                 | Role                                        | Light                                    | Dark                                     |
| --------------------- | ------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `--color-accent`      | Brand accent: links, rules, buttons, labels | `oklch(0.54 0.14 35)` ≈ `#b14a31`        | `oklch(0.72 0.13 42)` ≈ `#e88761`        |
| `--color-accent-hover`| Hover state for accent                      | accent mixed with 12% black              | accent mixed with 10% white              |
| `--color-accent-soft` | Tints: selection, focus ring, keynote cards | accent at 16% opacity                    | accent at 22% opacity                    |
| `--color-on-accent`   | Text on a filled accent (buttons)           | `oklch(0.99 0.003 100)` ≈ `#fcfcfa`      | `oklch(0.18 0.009 250)` ≈ `#0f1215`      |
| `--color-bg`          | Page background                             | `oklch(0.99 0.003 100)` ≈ `#fcfcfa`      | `oklch(0.18 0.009 250)` ≈ `#0f1215`      |
| `--color-surface`     | Raised surface (search fallback box)        | `oklch(0.965 0.004 100)` ≈ `#f4f3f0`     | `oklch(0.22 0.01 250)` ≈ `#171b1f`       |
| `--color-soft`        | Code blocks, image placeholders, tags       | `oklch(0.94 0.006 100)` ≈ `#ecebe7`      | `oklch(0.26 0.01 250)` ≈ `#202429`       |
| `--color-text`        | Body text                                   | `oklch(0.25 0.01 250)` ≈ `#1e2226`       | `oklch(0.93 0.006 95)` ≈ `#e9e8e3`       |
| `--color-muted`       | Secondary text, nav links, meta             | `oklch(0.5 0.012 250)` ≈ `#5e646a`       | `oklch(0.69 0.012 250)` ≈ `#969ca3`      |
| `--color-line`        | Hairline borders and grid gaps              | `oklch(0.86 0.008 100)` ≈ `#d2d1cb`      | `oklch(0.34 0.012 250)` ≈ `#33393e`      |
| `--color-line-strong` | Stronger borders (defined, currently unused)| `oklch(0.72 0.012 120)` ≈ `#a3a69e`      | `oklch(0.44 0.016 230)` ≈ `#4a545a`      |

### Palette character

- **Light:** warm off-white paper (hue ~100) with cool slate-blue text (hue 250)
  and a terracotta / brick-red accent (hue 35).
- **Dark:** near-black slate (hue 250) with warm off-white text and a lighter
  coral accent (hue 42). Because the dark accent is light, buttons flip to dark
  text (`--color-on-accent`).

## Derived tokens

Other variables that are built from the colour tokens:

| Token          | Value                                  |
| -------------- | -------------------------------------- |
| `--hairline`   | `1px solid var(--color-line)`          |
| `--focus-ring` | `0 0 0 3px var(--color-accent-soft)`   |

The Pagefind search UI (`#search`) maps onto the theme so it follows light/dark:

| Pagefind variable           | Maps to              |
| --------------------------- | -------------------- |
| `--pagefind-ui-primary`     | `--color-accent`     |
| `--pagefind-ui-text`        | `--color-text`       |
| `--pagefind-ui-background`  | `--color-bg`         |
| `--pagefind-ui-border`      | `--color-line`       |
| `--pagefind-ui-tag`         | `--color-soft`       |

Code highlighting uses Shiki's `github-light` / `github-dark` themes through
the `--shiki-light` / `--shiki-dark` variables. Those colours come from Shiki,
not from this file.

## Where the theme is defined

The same token set is written out **four times**:

1. `:root`: default (light)
2. `@media (prefers-color-scheme: dark) :root`: follows the OS setting
3. `:root[data-theme='light']`: manual toggle, light
4. `:root[data-theme='dark']`: manual toggle, dark

A colour change has to be made in both matching blocks (1 + 3 for light,
2 + 4 for dark).

## Hard-coded colours

These don't use tokens and stay white in both schemes. That is on purpose:
the content inside them is always light.

| Selector                  | Value  | Why                                         |
| ------------------------- | ------ | ------------------------------------------- |
| `.embed iframe`           | `#fff` | Third-party widgets are light-only          |
| `.venue-map`              | `#fff` | Leaflet map tiles are light                 |
| `.speaker-affiliation img`| `#fff` | Logo tile, so dark logos stay visible        |

## Things worth tidying

- **Duplicate accent in `:root` (uncommitted change).** `:root` now sets
  `--color-accent` twice: `oklch(0.54 0.14 35)` followed by `#b04a30`. The hex
  wins because it comes last. It is almost the same colour as the OKLCH value,
  but `[data-theme='light']` still uses only the OKLCH value. Keep one of them,
  and if you choose the hex, update the `data-theme='light'` block to match.
- **`--color-line-strong`** is defined in all four blocks but nothing uses it.
- **Social-share (OG) images keep their own copy.** `src/pages/og/[collection]/[slug].png.ts`
  hard-codes hex versions of the light palette, because Satori can't read
  OKLCH: bg `#fcfcfa`, text `#252831`, muted `#697080`, line `#dbd8d0`,
  accent `#a8492c`. Several of these have drifted from the CSS values above,
  so update them whenever you change the palette.
