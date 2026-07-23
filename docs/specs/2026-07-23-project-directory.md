# GitHub Project Directory

## Goal

Publish a compact GitHub Pages directory for Solomon Neas that lists all curated active public projects across Escoffier Labs, Lidless Labs, and the personal `solomonneas` account.

The profile README will link to the directory instead of carrying a long inline project list.

## Approved visual direction

Use the selected **Split Directory** layout:

- light, neutral Vercel/shadcn-style interface
- a narrow filter rail on the left
- one continuous project list on the right
- one project per row
- one sentence of explanation per project
- the whole row is the only outbound project link
- no project cards, status dots, decorative numbering, fake telemetry, badges, or link clusters

Typography supplies the hierarchy. Separators and whitespace supply the structure.

## Page structure

1. A small masthead with `solomonneas / projects` and the total repository count.
2. A two-column header:
   - title and concise description
   - labeled search input
3. A directory region:
   - owner filters: All, Escoffier Labs, Lidless Labs, Solomon Neas
   - category filters: Agent operations, Publishing, Reference, Security & SOC, Threat intelligence, Network, Homelab, Developer tools, Media & desktop, Education
   - one flat project list
4. A small footer linking back to the GitHub profile.

## Dataset

The directory contains exactly 51 curated projects:

- Escoffier Labs: 12
- Lidless Labs: 25
- Solomon Neas: 14

The source of truth is a checked-in JavaScript data module. Each record contains:

- `name`
- `owner`
- `ownerLabel`
- `category`
- `description`
- `url`

Repository state is curated, not inferred from recent pushes. Website, profile, asset, policy, shared-theme, and duplicate adapter repositories stay excluded.

## Interaction

- Search matches project name, description, owner, and category.
- Owner and category filters combine with search.
- Only one owner and one category may be selected at a time.
- Selecting the active filter again returns that filter group to `all`.
- Results update immediately without network requests.
- A visible result count reports the filtered total.
- Zero results display a plain empty-state sentence with a reset button.
- Every filter is a native button and the search field has a visible label.
- Every project row is a single anchor with a visible keyboard focus state.

## Responsive behavior

- At widths below 700px, the filter rail moves above the list.
- Owner and category filters become compact wrapping controls.
- Project rows stack the project name above the description.
- Descriptions may wrap naturally on small screens.
- No horizontal page scrolling is allowed.

## Publication

- Repository: `solomonneas/projects`
- Visibility: public
- Pages URL: `https://solomonneas.github.io/projects/`
- Publishing source: `main` branch, repository root
- License: MIT
- No runtime dependencies, build service, analytics, cookies, or external API calls

## Profile change

Remove the crowded `Other work` project line from `solomonneas/solomonneas/README.md`.

Add the directory to the existing link row:

```md
› [Projects](https://solomonneas.github.io/projects/) · [Writing](https://solomonneas.dev/blog) · [Brigade blog](https://brigade.tools/blog) · [Consulting](https://scubedsystems.com)
```

## Verification

- Dataset contains exactly 51 unique repository URLs with owner totals 12, 25, and 14.
- Every project record has a non-empty name, description, category, and HTTPS GitHub URL.
- HTML contains one search input, filter controls, result count, list container, and empty state.
- JavaScript search and combined filtering pass automated tests.
- Each rendered project has exactly one outbound anchor.
- No forbidden card/status patterns appear in source.
- Desktop and mobile screenshots show no clipping or horizontal overflow.
- GitHub Pages returns HTTP 200 after publication.

