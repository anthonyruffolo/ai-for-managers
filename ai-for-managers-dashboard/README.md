# AI for Managers

A responsive student dashboard for an **AI for Managers** course. It includes a 15-week course roadmap, assignments, progress tracking, discussions, grades, help templates, and an AI briefing toolkit.

## Requirements

- Node.js 22.13 or newer
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown in the terminal.

## Production build

```bash
pnpm build
pnpm start
```

## Code-quality check

```bash
pnpm lint
```

## Project structure

- `app/page.tsx` — dashboard content and interactions
- `app/globals.css` — responsive design and visual styles
- `app/layout.tsx` — page metadata, fonts, and social-sharing configuration
- `public/` — favicon and social-sharing image
- `.openai/hosting.json` — OpenAI Sites project configuration

## Data and privacy

The dashboard stores task progress, checklist state, module progress, and discussion drafts in the visitor's browser using `localStorage`. It does not require a database or API key.

## Publishing to GitHub

Create an empty GitHub repository, then upload this folder or connect it with Git. Keep `.gitignore` in the repository so dependencies, local environment files, and generated build output are not committed.

No license is included. Add the license that fits how you want others to use the project.
