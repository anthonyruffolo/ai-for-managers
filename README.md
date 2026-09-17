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

The current team workflow source document is stored at the repository root:

`MGMT 610 Team work flow.docx`

Implementation guidance derived from the team workflow is maintained in `docs/GITHUB_COLLABORATION_WORKFLOW.md`, `docs/BUILDER_HANDOFF_CHECKLIST.md`, and `docs/WEEKLY_PAGE_TEMPLATE.md`.

## Team workflow

**Builder → second-builder review → Daniel/project lead approval → Anthony dashboard implementation → student-view testing → merge to main**

Builders own the approved instructional package. Anthony owns technical implementation and cross-week integration after approval. Use focused branches for work in progress and keep `main` stable.

Before opening a pull request, run `pnpm build` from `ai-for-managers-dashboard`, test the changed flow as a student, and commit only focused changes. Push the branch, request review for requirements, accessibility, privacy, and the student flow, resolve comments, rerun the build, and merge only after approval. Do not commit generated files such as `tsconfig.tsbuildinfo` or any passwords, API keys, student records, or confidential data.

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
