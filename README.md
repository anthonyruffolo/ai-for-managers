# AI for Managers

This repository contains the course dashboard and the implementation scaffolding for the **AI for Managers** undergraduate course.

The dashboard is being built as a practical, student-friendly management environment. Students learn AI concepts and responsible management judgment while progressively developing their own AI Management Dashboard.

> **Important:** This repository includes preparation scaffolding so teammates can build and hand off content consistently. It does not pre-write another builder's lessons, examples, rubrics, or assessments. Approved instructional content is added after team review.

## Course architecture

The class dashboard provides stable destinations for:

- Course Home
- Course Overview
- Weeks 1–15
- Assignments
- Quizzes & Tests
- Discussions
- My Progress
- Resources / Key Terms
- GitHub Help
- Final Dashboard / Project

Each weekly experience follows the same implementation structure:

1. Week Overview
2. Learning Objectives
3. Lesson / Required Materials
4. Key Terms
5. AI Activity
6. Your Dashboard Build
7. Student Directions
8. Example / Model
9. Submission Requirements
10. Rubric / Grading
11. Quiz / Test / Discussion when applicable
12. Resources
13. Week Progress

## Visible course build workspace

The prep structure is now also implemented as a visible route inside the dashboard app:

`/course-structure`

The workspace provides:

- A 15-week roadmap showing the connected dashboard progression
- A selectable builder workspace for every week
- The standard weekly page template with all required content slots
- A builder handoff checklist showing what teammates provide
- A quality gate for review and student-view testing
- Local preparation tracking so the team can mark template sections as prepared

This page is intentionally a **structure and handoff workspace**, not a replacement for the approved weekly instructional content.

## Student dashboard progression

The student's dashboard is designed to grow across the semester. The current architecture provides checkpoints for:

1. Home, purpose, target user, management problem, and navigation
2. AI Tools comparison
3. Prompt Library
4. AI Productivity
5. Manager Decision Assistant
6. AI Ethics Checker / Risk Assessment
7. Responsible AI Policy
8. Manager AI Assistant
9. AI Verification
10. AI Use / Disclosure Log
11. Values-Based AI Decision Framework
12. Workforce Impact
13. AI Implementation Plan
14. Testing, peer feedback, and revision
15. Final integrated dashboard and reflection

See `docs/DASHBOARD_BUILD_TRACKER.md` for the implementation tracker.

## Team implementation workflow

**Builder → second-builder review → Daniel approval → Anthony implementation → student-view testing → merge to main**

`main` is the stable version. Focused work should use feature branches when practical.

See:

- `docs/COURSE_DASHBOARD_ARCHITECTURE.md` — technical/content scaffolding
- `docs/WEEKLY_PAGE_TEMPLATE.md` — standard structure for Weeks 1–15
- `docs/BUILDER_HANDOFF_TEMPLATE.md` — exactly what a builder should hand to Anthony
- `docs/COURSE_BUILDER_MAP.md` — ownership and implementation boundaries
- `docs/GITHUB_COLLABORATION_WORKFLOW.md` — branch/commit/pull-request guidance
- `docs/STUDENT_GITHUB_HELP.md` — student-facing GitHub basics
- `docs/DASHBOARD_BUILD_TRACKER.md` — semester dashboard milestones

## What builders hand to Anthony

Every approved weekly package should include:

- Course content / lesson
- 5–8 key terms with definitions
- Exact student dashboard build
- Student directions
- Example / model
- Submission requirements
- Rubric or answer key
- Assessment materials when assigned
- Dashboard needs

The builder handoff checklist is in `docs/BUILDER_HANDOFF_TEMPLATE.md`.

## What Anthony implements

- Course navigation and weekly page structure
- Assignment and submission areas
- Quiz/test and discussion areas
- Due-date and progress infrastructure
- Dashboard build tracking
- Approved examples, directions, rubrics, and resources
- GitHub workflow support
- Student-view testing and technical fixes

## GitHub basics

Students and teammates are not expected to be advanced programmers. Basic collaboration concepts include repository, branch, commit, push, pull, pull request, merge, and version control.

The intended AI-assisted workflow is:

**Explain the goal → provide context → ask AI questions → develop an approach → build → test → identify problems → iterate.**

AI can help with unfamiliar work, but people remain responsible for reviewing the result and making the final decision.

## Current application

The main dashboard application lives in:

`ai-for-managers-dashboard/`

Common files:

- `ai-for-managers-dashboard/app/page.tsx` — main dashboard experience and course UI
- `ai-for-managers-dashboard/app/globals.css` — styling and responsive layout
- `ai-for-managers-dashboard/app/layout.tsx` — global metadata/layout
- `ai-for-managers-dashboard/app/course-structure/page.tsx` — visible course build workspace
- `ai-for-managers-dashboard/app/course-structure/structure.module.css` — scoped workspace styling

The existing app remains the main student dashboard. The new course-structure route adds the missing visible prep layer without replacing the existing dashboard experience.

## Run locally

From the repository root:

```bash
cd ai-for-managers-dashboard
pnpm install
pnpm dev
```

Then open the local URL shown by the development server, normally `http://localhost:3000`.

The visible prep workspace is available at:

`http://localhost:3000/course-structure`

Before considering a substantial change ready, run:

```bash
pnpm build
```

## Before merging a weekly update

- [ ] Approved content is being implemented
- [ ] Weekly structure matches the template
- [ ] Student directions are clear
- [ ] Submission requirements match the assignment
- [ ] Links work
- [ ] New dashboard functionality works
- [ ] Earlier functionality still works
- [ ] Student view has been tested
- [ ] No secrets or private student information were added
- [ ] Commit message clearly describes the change

## Project principles

- Build for undergraduate business students, not developers.
- Keep the dashboard practical, organized, and easy to navigate.
- Treat AI as a support tool rather than a final authority.
- Preserve human judgment and accountability.
- Verify important AI-generated claims and outputs.
- Keep weekly builds connected so students evolve one product instead of starting over.
- Do not add technical complexity simply for its own sake.
