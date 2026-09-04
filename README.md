# AI for Managers

**🚀 Live Dashboard:** [Open the AI for Managers Dashboard](https://ai-for-managers-dashboard.vercel.app/)

## Project

This repository contains the **AI for Managers** undergraduate course dashboard and the materials used to build it.

Students learn AI for management and progressively build an AI Management Dashboard. The course is designed for business students; advanced programming is not required.

## Course build

- 15 weekly modules
- Student AI Management Dashboard developed throughout the course
- Weekly lessons, builds, examples, submissions, rubrics, and assessments
- Three tests, four quizzes, and seven discussions
- Responsible AI, verification, disclosure, human judgment, and GitHub collaboration

The source course-development document is stored in `docs/`:

`docs/BUSI.610 Course Overview and Guide Fall I 2026 - AI COURSE DEVELOPMENT.docx`

## Team workflow

**Builder → second-builder review → project lead review → dashboard implementation → student-view testing → merge to main**

Use branches for work in progress. Keep `main` stable.

## Builder handoff

Each weekly package should include:

- Lesson / course content
- 5–8 key terms
- Student dashboard build
- Student directions
- Example / model
- Submission requirements
- Rubric / answer key
- Assessment materials when assigned
- Dashboard needs

## Dashboard

The main app is in `ai-for-managers-dashboard/`.

Key routes:

- `/` — student course dashboard
- `/course-structure` — course build and weekly implementation workspace

## Local development

```bash
cd ai-for-managers-dashboard
pnpm install
pnpm dev
```

For a production build:

```bash
pnpm build
```

## Deployment

The Vercel configuration explicitly installs and builds from `ai-for-managers-dashboard/` so the nested application is deployed from the repository root correctly.

## Project standards

- Build for undergraduate business students.
- Keep weekly work connected across the full course.
- Verify important AI-generated information.
- Preserve human judgment and accountability.
- Protect confidential, private, credential, and API-key information.
- Test student-facing changes before merging.
