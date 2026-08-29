# AI for Managers

This project is a basic version of a course dashboard for a 7-week undergraduate business course called AI for Managers.

The goal is simple: help students with no coding experience understand how AI can be used responsibly in management, business decisions, teamwork, and everyday workplace problems.

This app is meant to feel like a Blackboard-style student portal: organized, practical, clear, and easy to navigate.

Live website:
https://ai-for-managers-dashboard.vercel.app

## What this project is trying to do

This course experience is designed for business students who are not software developers.

The dashboard should help students:

- understand weekly learning goals
- see assignments and deadlines
- track workload and progress
- review important business concepts
- work with AI in a responsible way
- practice using AI as a support tool, not as a replacement for judgment
- navigate the course like they would in an LMS or student portal

This project is about teaching management, business judgment, and responsible AI use—not about writing complex code.

## The big idea

The app is built to feel familiar to students:

- a left navigation
- weekly course modules
- assignment lists
- progress tracking
- discussion prompts
- help and coaching sections
- AI-use guidance

The aim is to make business students feel comfortable using AI tools without being overwhelmed by technical details.

## What the app currently includes

The current version already has:

- a course homepage
- weekly unit information
- assignment and task tracking
- checklist and progress tools
- discussion draft areas
- grades/progress sections
- AI briefing and help templates
- a student-friendly dashboard layout

This is a starting point, not the final version. It should stay easy to improve and easy to teach from.

## The most important rule for the team

Do not panic if you do not know code.

This project is mainly about course design, content, and user experience.

Most changes will be simple edits to text and layout, not deep programming work.

## Where to edit things

The most common places to make changes are:

- app/page.tsx — main course content, assignments, weekly modules, tasks, and text
- app/globals.css — colors, spacing, design, and layout styling
- app/layout.tsx — page title and global metadata

You do not need to edit everything. Start with the page content and CSS.

## How to run the project locally

Open a terminal and go into the app folder:

```bash
cd ai-for-managers-dashboard
```

Then install packages:

```bash
pnpm install
```

Then run the site:

```bash
pnpm dev
```

Open the local link shown in the terminal, usually:

```text
http://localhost:3000
```

## How to make a small change

For most teammates, the process is simple:

1. Open the file you want to change.
2. Find the text or section you want to update.
3. Edit it.
4. Save the file.
5. Refresh the browser.

Examples of easy edits:

- change a week title
- edit assignment wording
- update due dates
- fix a typo
- change a color
- make a section easier to read

## What to do if you are not sure what to change

Use the GitHub AI helper.

This is important: GitHub Copilot/AI is meant to help you, not replace your thinking.

You can ask it things like:

- “Rewrite this assignment in simpler language for business students.”
- “Make this dashboard feel more student-friendly.”
- “Help me clean up this FAQ.”
- “Suggest a better title for this week.”
- “What would a business student need in this section?”

Use AI to speed up writing, editing, and brainstorming. But always check the result.

This course is about responsible AI use, so the team should model that mindset.

## Best practices for students and teammates

- Keep the content clear and easy to understand
- Write for students, not for developers
- Make the dashboard friendly, organized, and usable
- Avoid technical jargon unless it is necessary
- Focus on business value, not coding complexity
- Use AI as a helper, not as a final authority
- Always review the output before publishing it

## Deployment and GitHub

This project is built to be easy to develop and deploy.

GitHub is the source of truth.

The website is deployed on Vercel and is meant to stay easy for teammates to access from a simple link.

When changes are pushed to the main branch, Vercel updates the live site.

That means teammates can usually just open the website and see the latest version without installing anything.

## Basic team workflow

A simple workflow for the team is:

1. open the project in VS Code
2. update text or design
3. preview locally with pnpm dev
4. make sure it looks good
5. commit the change
6. push to main
7. let Vercel publish the update

## Helpful commands

From the project folder:

```bash
pnpm install
pnpm dev
pnpm build
```

### What these do

- pnpm install — gets everything ready
- pnpm dev — runs the app for local editing
- pnpm build — checks whether the app can be published successfully

## If something breaks

Do not panic. Usually the fix is simple.

Try this order:

```bash
cd ai-for-managers-dashboard
pnpm install
pnpm dev
```

If the site still fails, run:

```bash
pnpm build
```

This usually shows the exact issue in plain language.

## Final reminder

This is a course design project, not a computer science project.

The audience is business students, not programmers.

The website should feel:

- clean
- familiar
- professional
- easy to navigate
- supportive of student learning
- realistic for management and business education

If you want to help, start with the content and design. That is where the real value is.

Use GitHub AI tools to help write, revise, summarize, and improve your work. Just remember: the final decision should still be made by a human being.
