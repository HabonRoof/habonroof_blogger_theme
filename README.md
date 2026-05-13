# HabonRoof Blogger theme (split workflow)

This repo keeps the Lightify-based template as **small fragment files** under `theme/fragments/` and **merges** them into a single uploadable XML: `theme-habonroof.xml`.

Blogger only accepts **one** theme file. Edits happen in fragments locally; you **build** before uploading.

## Prerequisites

- **Node.js** (any current LTS is fine). No extra npm dependencies.

## Build the theme

From the project root:

```bash
npm run build:theme
```

This reads `theme/manifest.json`, concatenates each listed fragment in order, and writes **`theme-habonroof.xml`** at the repo root. Upload that file in Blogger: **Theme → Edit HTML** (or restore from file).

Run the build again after any fragment change so the root XML stays current.

## Verify fragment assembly (optional)

To confirm the core fragments still match the frozen baseline (excluding the optional custom script slot):

```bash
npm run verify:theme
```

Baseline file: `theme/theme-habonroof.reference.xml`.

## Re-split from baseline (rare)

If you replace `theme/theme-habonroof.reference.xml` with a new golden copy and need to regenerate slices:

```bash
npm run extract:theme
```

Then reconcile `theme/manifest.json` if you added or renamed fragments.

---

## Where things live (mental map)

| Concern | Primary location |
|--------|-------------------|
| Theme Designer variables (colors, fonts, layout toggles) | [`theme/fragments/11-skin-variables-groups.xml`](theme/fragments/11-skin-variables-groups.xml) (inside `<b:skin>` CDATA as commented XML) |
| CSS (layout, components, media queries) | [`theme/fragments/12-skin-main.css`](theme/fragments/12-skin-main.css) |
| Layout editor only (Blogger “Layout” screen) | [`theme/fragments/20-layout-mode-template-skin.xml`](theme/fragments/20-layout-mode-template-skin.xml) |
| Widget HTML / includables | [`theme/fragments/31-defaultmarkup-*.xml`](theme/fragments/) … `46-*` |
| Page structure (header, main, sidebar, footer) | [`theme/fragments/51-body-header.xml`](theme/fragments/51-body-header.xml) … `55-*` |
| Third-party JS (Owl Carousel, Theia Sticky Sidebar, etc.) | [`theme/fragments/61-vendor-plugins.raw.js`](theme/fragments/61-vendor-plugins.raw.js) |
| Theme behavior (menuify, carousels, shortcodes, …) | [`theme/fragments/64-theme-init.js`](theme/fragments/64-theme-init.js) |
| **Your** extensions | [`theme/fragments/66-theme-custom.xml`](theme/fragments/66-theme-custom.xml) |
| Prism, Font Awesome, early head | [`theme/fragments/00-document-head-start.xml`](theme/fragments/00-document-head-start.xml) |

Fragment order is defined in [`theme/manifest.json`](theme/manifest.json). To add another file, drop it under `theme/fragments/` and append its name to the `fragments` array in the correct place.

---

## Maintaining theme colors

Two approaches; they can be mixed, but staying consistent avoids surprise.

### 1. Blogger Theme Designer (recommended for day-to-day)

After the theme is live, many colors and layout options are exposed in **Theme → Customize** (or “Theme designer”). Those values are stored by Blogger and override the defaults embedded in the template.

### 2. Edit template variables in the repo

Canonical definitions for color groups (main accent, titles, menu, footer, widgets, etc.) live in **`theme/fragments/11-skin-variables-groups.xml`**. Each `<Variable>` has `default` and `value` attributes; Blogger’s designer typically follows the `value` you ship on first install.

- Prefer editing the **`value="..."`** attributes for colors you want as the shipped default.
- Related colors often reference others, e.g. `default="$(main.color)"`. If you change `main.color`, those references follow.

If a color is **not** driven by a variable, it may be hard-coded in **`12-skin-main.css`**. Search that file for the hex you see in the browser, or for the relevant selector (e.g. `#footer-wrapper`).

After edits: `npm run build:theme`, then re-upload `theme-habonroof.xml` or sync your changes with what Blogger has saved in the designer.

---

## Maintaining content fonts

### Theme Designer font variables

In **`11-skin-variables-groups.xml`**, the group **“Theme Fonts”** defines:

- `main.font` — site / body
- `title.font` — headings
- `meta.font` — metadata
- `text.font` — article text

Each uses a `family="'Poppins',sans-serif"` style declaration and a `value` with weight/size. Adjust those variables when you want global typography without touching raw CSS.

### Google Fonts and `@font-face`

The skin loads **Poppins** via multiple `@font-face` rules at the top of **`12-skin-main.css`**. If you switch the font family in the variables:

1. Add or replace `@font-face` blocks for the new family (Google Fonts URLs or self-hosted files).
2. Update the `family="..."` attributes in the Theme Fonts variables to match.

Changing only the variable `family` without matching `@font-face` can cause FOUT or fallback fonts.

---

## Maintaining “plugin” / script behavior

Treat layers separately so upgrades stay safe.

| Layer | File | Guidance |
|-------|------|----------|
| CDN / head libraries | `00-document-head-start.xml` | Prism CSS/JS, Font Awesome, etc. Change versions or URLs here; keep XML well-formed. |
| jQuery | `60-jquery-and-vendor-script-open.xml` | Upgrade jQuery only if you test Owl/theme code for compatibility. |
| **Vendor bundle** | `61-vendor-plugins.raw.js` | Treat as **read-only**. Replace the whole block when upgrading Owl, Theia, Tabify, etc. |
| **Theme init** | `64-theme-init.js` | Wiring that depends on jQuery and vendor code: menus, carousels, dark mode UI, shortcodes. |
| **Custom tools** | `66-theme-custom.xml` | Put new site-specific scripts here (inside the existing `<script>` / CDATA). Runs after theme init. |

Runtime options (e.g. `darkMode`, `relatedPostsNum`) are set in the globals script inside **`29-head-globals-and-defaultmarkups-open.xml`**. Keep that mostly **configuration**, not large application logic.

Load order in the merged file is: **jQuery → vendor CDATA → theme init → custom script** (per `manifest.json`).

---

## Troubleshooting

- **Upload errors in Blogger** — Ensure you built first; the file to upload is **`theme-habonroof.xml`**. Check for unclosed tags if you hand-edited fragments.
- **Styles not updating** — Clear cache; confirm you edited `12-skin-main.css` or variables and ran `npm run build:theme`.
- **Script errors after jQuery/vendor change** — Compare against `64-theme-init.js` and test carousels, sticky sidebar, and mobile menu.

---

## Quick reference

```bash
npm run build:theme    # produce theme-habonroof.xml
npm run verify:theme   # cmp merge (reference manifest) to theme/theme-habonroof.reference.xml
npm run extract:theme # regenerate fragments from theme/theme-habonroof.reference.xml
```
