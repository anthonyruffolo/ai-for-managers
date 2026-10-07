# Student-View QA Record

This record documents implementation QA for the student-facing course and the build gate used to prevent the 15-week progression from drifting.

## QA method

The QA pass combines:

- student-flow source review of the interactive artifact path;
- verification that student inputs are connected to the dashboard's persisted structured-answer state where applicable;
- verification that the correct artifact opens for the correct week;
- checks for duplicate or misleading fallback workspaces;
- production build validation through the repository build gate; and
- deployment-status verification after the change reaches `main`.

The automated gate lives at `ai-for-managers-dashboard/scripts/course-qa.mjs` and runs before every production `next build`.

This is an implementation QA record. Instructor acceptance testing on representative desktop/mobile browsers should still be performed before the course is released to students.

## Weeks 1–5

| Week | Student artifact | QA result | What was checked |
|---:|---|---|---|
| 1 | Dashboard Starter Version | Passed | Project brief, target user/problem, homepage/navigation planning, submission path, and saved structured responses are present. The legacy generic “pending implementation” fallback no longer appears on the Week 1 build. |
| 2 | AI Tools | Passed | Student comparison/build path, assessment activity, and the named artifact are present in the structured module. |
| 3 | Research & Know | Passed | Research question/prompt improvement, source evaluation, two-source verification, artifact naming, submission path, and course-search visibility are present. |
| 4 | AI Productivity | Passed | Dedicated interactive productivity workspace, time comparison, quality/risk/human-review fields, submission checklist, and reflection path are present. |
| 5 | Manager Decision Assistant | Passed | Dedicated interactive decision workspace clearly separates AI analysis/recommendation from the manager's final decision, with missing information, alternatives, verification, risk, submission, and reflection paths. |

## Weeks 6–7

| Week | Student artifact | QA result | What was checked |
|---:|---|---|---|
| 6 | AI Ethics Checker / Risk Assessment | Passed | Dedicated ethics workflow, risk fields, bias/privacy/oversight activities, recommendation logic, management rationale, and Week 6 → Week 7 bridge are present. |
| 7 | Responsible AI Policy | Passed | Dedicated policy builder, governance decision step, safeguard selection, policy sections, accountability/monitoring language, cumulative Test 1 path, and Week 6 risk → Week 7 control connection are present. |

## Weeks 8–15 source-level QA

Weeks 8–15 have usable artifact workspaces, synchronized artifact names, submission paths, and course-search/assistant references. The source pass also verifies the newly scheduled Quiz 3 (Week 9), Test 2 (Week 12), Quiz 4 (Week 14), and the seven-discussion schedule.

This status is intentionally **source QA complete, browser acceptance pending**. A representative student/instructor still needs to click through these weeks on desktop and mobile, verify saved state and scoring behavior, and confirm the deployed AI Course Assistant environment before release.

## Regression protections added

- Weeks 1–5 no longer fall through to the later-week generic build placeholder.
- Weeks 10–12 once again expose their finalized build/submission/reflection/resource paths while preserving their detailed lesson assignments and quizzes.
- Weeks 8–15 are checked against one finalized progression across the student dashboard, course assistant, search, course-structure workspace, architecture document, and build tracker.
- Week 3 is canonically `Research & Know`; the retired `Prompt Library` artifact name is treated as drift.
- Major assessment and discussion schedules are defined in `docs/COURSE_CANON.md` and should be checked against the student-facing module map.
- The build fails if the old Week 8 “Manager AI Assistant” submission or old Week 9 “AI Verification Center” submission reappears in search metadata.
