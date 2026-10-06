# AI for Managers

**Live Dashboard:** [Open the AI for Managers Dashboard](https://ai-for-managers-dashboard.vercel.app/)

## Project

This repository contains the **AI for Managers** undergraduate course dashboard and the materials used to build, review, and maintain it.

Students progressively build one AI Management Dashboard across 15 weeks. The course is designed for business students; advanced programming is not required.

## Current course structure

The canonical progression and assessment schedule are maintained in [`docs/COURSE_CANON.md`](docs/COURSE_CANON.md). The current course uses:

- 15 weekly modules;
- one progressive AI Management Dashboard;
- weekly lessons, applied work, dashboard builds, submission guidance, grading criteria, and reflection;
- four major quizzes, two mid-course tests, and one cumulative final exam;
- seven required course discussions;
- lesson-level knowledge checks and practice quizzes that do not count toward the four major quizzes; and
- responsible AI, verification, disclosure, privacy, human judgment, and accountability throughout the course.

If older planning documents conflict with the canonical progression or current student dashboard, update the stale material rather than preserving two versions of the same week.

## Team workflow

The original team workflow source document is stored at the repository root as `MGMT 610 Team work flow.docx`.

Implementation guidance is maintained in:

- `docs/COURSE_CANON.md`
- `docs/GITHUB_COLLABORATION_WORKFLOW.md`
- `docs/BUILDER_HANDOFF_TEMPLATE.md`
- `docs/WEEKLY_PAGE_TEMPLATE.md`
- `docs/COURSE_DASHBOARD_ARCHITECTURE.md`

The normal workflow is:

**Builder → second-builder review → project-lead approval → dashboard implementation → student-view testing → merge to main**

Builders own instructional content and approved assessment material. Technical implementation owns cross-week consistency, navigation, state, search/assistant synchronization, regression protection, and student-view behavior.

Before merging a change, run the application build and course QA, test the changed flow as a student, and review privacy, accessibility, submission language, and cross-week consistency. Never commit passwords, API keys, student records, or confidential data.

## Weekly handoff standard

A weekly package should include the approved lesson content, key terms, applied activity, dashboard build, directions, example/model, submission requirements, grading criteria or answer key, assigned assessment material, resources, and any dashboard requirements needed to support the week.

## Dashboard

The main app is in `ai-for-managers-dashboard/`.

Key routes:

- `/` — student course dashboard
- `/course-structure` — implementation and weekly-structure workspace

## Local development

```bash
cd ai-for-managers-dashboard
pnpm install
pnpm dev
```

For the release build:

```bash
pnpm build
```

The build runs `scripts/course-qa.mjs` before `next build` so course naming and key student-facing paths fail fast when they drift.

## Deployment

The Vercel configuration installs and builds from `ai-for-managers-dashboard/` so the nested application can be deployed from the repository root.

The AI Course Assistant requires its deployment environment to contain `AI_GATEWAY_API_KEY`. The source code alone does not prove that the assistant is configured in production; the deployed route must be tested after environment changes.

## Project standards

- Build for undergraduate business students.
- Keep each week connected to the same semester dashboard.
- Use one canonical name and requirement set for each week.
- Verify important AI-generated information.
- Preserve human judgment and accountability.
- Protect confidential, private, credential, and API-key information.
- Distinguish locally saved work from work actually submitted to an instructor or gradebook.
- Test student-facing changes before release.
