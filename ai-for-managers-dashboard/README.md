# AI for Managers Dashboard

This folder contains the actual website project for the AI for Managers course.

## Live website

https://ai-for-managers-dashboard.vercel.app

## What this project does

This app is a student-facing dashboard that shows:

- the 15-week course roadmap
- assignments and deadlines
- task tracking and progress
- discussion prompts
- grades and expectations
- help templates for students
- AI planning and briefing tools

## Tech stack

This app uses:

- Next.js
- React
- TypeScript
- CSS styling

## Run it locally

From this folder, run:

```bash
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Production build

```bash
pnpm build
```

## Important files

- app/page.tsx — most of the actual dashboard content and website behavior
- app/globals.css — layout, colors, spacing, and design styling
- app/layout.tsx — page metadata and global layout wrapper
- public/ — images and shared media
- package.json — scripts and dependency setup
- .openai/hosting.json — environment config needed for the Vite/OpenAI setup used during local development

## For non-coders

If you are not comfortable editing code, the easiest places to change content are:

- week descriptions in app/page.tsx
- assignment text in app/page.tsx
- FAQ and help copy in app/page.tsx
- styling in app/globals.css

You can usually update text without needing any advanced coding knowledge.

## Deployment and GitHub flow

This project is connected to GitHub and Vercel. Once changes are pushed to the main branch, Vercel will publish the new site automatically.

This lets teammates use the live link without needing to install anything.

## Basic editing workflow

1. Open the project in VS Code.
2. Edit the text or style you want to change.
3. Save the file.
4. Run pnpm dev to preview it locally.
5. Commit and push when you are ready.
6. Vercel publishes the new version automatically.

## If you get stuck

Run:

```bash
pnpm install
pnpm build
```

If the build fails, the terminal output usually points to the exact file or wording causing the issue.

## Summary

This is a simple, student-friendly web app. Most meaningful updates are text or design changes, not complicated backend changes. If you want to help, the main areas to look at are app/page.tsx and app/globals.css.
