# AI for Managers

This repository contains the course dashboard for the AI for Managers project. The goal is to give students a clean, friendly course portal where they can see the weekly roadmap, assignments, progress, discussion prompts, grades, and help tools.

The live website is here:

https://ai-for-managers-dashboard.vercel.app

This is the version teammates and students should open. It is already deployed and connected to GitHub, so updates to the main branch will publish automatically.

## What this project is

This is a web application built with Next.js and React. It is designed to feel like a learning portal or student dashboard, not a coding project with complicated backend systems.

The main user experience includes:

- a course homepage
- weekly modules and learning objectives
- assignments and deadlines
- task tracking
- discussion draft areas
- grades and progress tracking
- AI help prompts and brief templates
- a search bar and navigation experience

In other words: this app is mainly a front-end website for presenting course content and student workflow tools.

## Who should use this repo

This project is intended for:

- team members who want to update course text
- instructors or organizers who want to revise assignments
- students who want to view the site
- anyone making small design or content tweaks without needing advanced development experience

If you do not know how to code, you can still contribute by editing text, adding items to the dashboard, modifying colors, and updating layout choices.

## The most important files

You do not need to understand everything in the project to make safe changes. Most edits will happen in these files:

- app/page.tsx — the main dashboard page and most of the actual content
- app/globals.css — styling, spacing, colors, and general layout
- app/layout.tsx — page metadata and global setup
- public/ — images and shared assets
- package.json — scripts and project config

### app/page.tsx

This is the heart of the app. It contains:

- the course hero text and navigation
- weekly module details
- assignment data
- checklist logic
- discussion drafts
- help templates
- AI briefing content

If you want to change wording, due dates, assignments, or module content, this is the first place to look.

### app/globals.css

This file controls the visual design of the site:

- colors
- spacing
- button styles
- cards and panel layout
- typography and responsiveness

If you want the site to look different or more polished, this is the styling file to edit.

### app/layout.tsx

This file sets metadata for the page, including:

- title
- description
- social preview information

You usually do not need to edit this unless you are changing the branding or website identity.

## How to run it locally

If you want to work on the code on your own machine, use the following steps.

### 1. Open a terminal in the project folder

From the repo root, go into the app folder:

```bash
cd ai-for-managers-dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the local development website

```bash
pnpm dev
```

Then open the local address shown in the terminal, usually:

```text
http://localhost:3000
```

This is the same site running in a browser, but only on your machine while the dev server is running.

## How to use the site

Once the app is running, you can:

- browse the course content
- review assignments and tasks
- update task status in the dashboard
- check progress and completion percentages
- use the AI toolkit prompts and help templates
- search week topics and assignments

The app is meant to be easy to use, even for people who do not know coding.

## How to edit content without deep coding knowledge

You do not need to be an experienced programmer to make useful edits.

### Typical safe edits

These are easy and common changes:

- update a week title or description
- change assignment due dates
- modify wording in the FAQ
- add a new task to the dashboard
- change the profile or branding text
- update a color in the CSS

### What to edit for text changes

If you want to change something the user sees on the page, start in app/page.tsx.

Look for strings like:

- week titles
- assignment names
- instructions
- question text
- task names
- labels on buttons or sections

When you change text there, the page updates automatically when you save.

### What to edit for appearance changes

If you want to make the site easier to read or look more polished, edit app/globals.css.

Common things to change there:

- colors
- border radius
- spacing between sections
- card backgrounds
- typography size

## How to make a simple change

Here is the basic flow:

1. Open the file you want to change in VS Code.
2. Edit the text or CSS.
3. Save the file.
4. Refresh the browser to see the result.
5. If the project is running locally, changes usually appear automatically.

If you are unsure where a piece of content lives, search for a keyword in the project using VS Code search.

## How deployment works

This project is automatically connected to Vercel.

The live site is deployed from the main branch of GitHub. That means:

- when you push changes to the main branch,
- Vercel builds the app,
- and the public website updates automatically.

This is the best setup for teammates because they can simply click a link and use the live site without installing anything.

## Recommended workflow for the team

For non-coders, the easiest workflow is:

1. open the project in VS Code
2. edit the text or styling you want
3. run the app locally to preview it
4. commit the changes
5. push to main
6. let Vercel publish the new version automatically

This keeps everything simple and low-risk.

## Common commands

Run these in the app folder:

```bash
pnpm install
pnpm dev
pnpm build
```

### What they do

- pnpm install — installs the project dependencies
- pnpm dev — runs the local website for testing
- pnpm build — checks whether the site builds successfully for production

## If something breaks

If the app fails to run, try these steps in order:

1. Make sure you are in the correct folder:

```bash
cd ai-for-managers-dashboard
```

2. Install dependencies again:

```bash
pnpm install
```

3. Start the app:

```bash
pnpm dev
```

4. If there is a build issue, run:

```bash
pnpm build
```

This will show the exact error and usually point to the file causing the problem.

## Good editing habits

- make small changes one at a time
- keep backups of important content before major revisions
- test locally before pushing to main
- use clear commit messages when saving work
- avoid editing large unrelated sections at once

## Final note

This project is designed to be approachable. A teammate does not need to understand React, TypeScript, or deployment pipelines to make useful updates. Most of the work is editing visible content and styling. The important thing is to keep the app simple, understandable, and easy to maintain.

If you are unsure where to edit something, start with app/page.tsx for content and app/globals.css for design. Those are the two most important files for everyday updates.
