# World of Earisia

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Deploy-2088FF?logo=githubactions&logoColor=white)](./.github/workflows/deploy.yml)

Official website for the homebrew **Dungeons & Dragons** (5e / 5.5e) campaign world **Earisia** (also styled *Erasia* in places). A place to share lore, player characters, and recorded sessions with the table and visitors.

**Author:** Stephen Nicholas Jones De Giorgi

---

## What the site includes

| Area | Description |
| --- | --- |
| **Home** | Campaign introduction and overview |
| **World** | Lore / setting surface (expanding) |
| **Characters** | Roster list + individual profile pages from a content collection |
| **Sessions** | Episode cards with cover art and audio players |
| **Contact** | Contact surface |

Character profiles are driven by Astro **Content Collections** (`src/content/characters/*.md`) and routed at `/characters/[slug]`.

---

## Tech stack

| Technology | Role |
| --- | --- |
| **Astro 7** | Multi-page static site (MPA), layouts, file-based routing |
| **Tailwind CSS v4** | Utility styling (`@tailwindcss/vite`) + `@theme` tokens |
| **GSAP** | Scroll reveals and hover polish |
| **Vite 8** | Bundler used by Astro |
| **TypeScript** | Typed content config and scripts |
| **GitHub Actions** | Build + deploy `dist/` to a VPS via SCP |

Visual identity from the original static site is preserved: custom fonts (**DungeonDepths**, **DnDC**, **Outfit**), paper background, and campaign imagery under `public/`.

---

## Project structure (high level)

```text
src/
  components/     Banner, Nav, Footer
  layouts/        BaseLayout.astro
  pages/          Routes (index, world, characters, sessions, contact)
  content/        Markdown content collections (characters)
  content.config.ts
  scripts/        GSAP animations
  styles/         global.css (theme + shared layout)
public/           Static assets (img, fonts, audio)
.github/workflows/deploy.yml
legacy/           Original HTML/CSS reference copy
```

---

## Develop locally

**Requirements:** Node.js `>= 22.12.0`

```bash
npm install
npm run dev
```

Production build / preview:

```bash
npm run build
npm run preview
```

---

## Content: character profiles

1. Add a Markdown file in `src/content/characters/` (filename = URL slug).
2. Fill frontmatter fields defined in `src/content.config.ts` (`name`, `playedBy`, `image`, etc.).
3. Write the profile body in Markdown under the frontmatter.
4. The list page (`/characters`) and profile route (`/characters/<slug>`) update from the collection.

After changing `content.config.ts`, **restart** `npm run dev` so Astro re-syncs collections.

---

## Deploy (GitHub Actions → VPS)

Pushing to `main` (or running the workflow manually) executes [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. Checkout + Node 22
2. `npm ci` + `npm run build`
3. SSH probe of `VPS_TARGET_DIR` (mkdir + write test)
4. Sync `dist/` to the VPS with [`Burnett01/rsync-deployments`](https://github.com/Burnett01/rsync-deployments) (`rsync --delete`)

### Required repository secrets

| Secret | Purpose |
| --- | --- |
| `VPS_HOST` | Server hostname or IP |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key |
| `VPS_SSH_PASSPHRASE` | Passphrase for the key |
| `VPS_TARGET_DIR` | Absolute path on the VPS (web root) |

Confirm these secrets exist under **Settings → Secrets and variables → Actions** before relying on the first deploy.

### If deploy fails

1. Confirm the **Probe VPS target directory** step passes (proves SSH + write access). Check its `df -h` / `df -ih` output — **no space left on device** means free disk (or inodes) on the VPS before redeploying.
2. On the VPS:

```bash
df -h
df -ih
sudo du -xh / --max-depth=2 2>/dev/null | sort -h | tail -n 20
```

`VPS_TARGET_DIR` must be an absolute path (e.g. `/var/www/html/worldoferasia.stephennicholasjones.com`).

---

## License / rights

All rights reserved © Stephen Nicholas Jones De Giorgi 2025.
