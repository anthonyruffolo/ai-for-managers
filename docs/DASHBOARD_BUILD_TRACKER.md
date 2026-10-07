# Dashboard Build Tracker

This tracker records the implementation state of the student-facing AI Management Dashboard. The Week 8–15 progression was finalized on 2026-09-30 and is now enforced by the production build gate in `ai-for-managers-dashboard/scripts/course-qa.mjs`.

A named artifact is not complete merely because its lesson title exists. The student must have a usable workspace, the required evidence fields, a submission path, and a tested student flow.

| Week | Final student dashboard milestone | Current state |
|---:|---|---|
| 1 | Dashboard Starter Version | **Tested — implementation QA passed** |
| 2 | AI Tools | **Tested — implementation QA passed** |
| 3 | Research & Know | **Tested — implementation QA passed** |
| 4 | AI Productivity | **Tested — implementation QA passed** |
| 5 | Manager Decision Assistant | **Tested — implementation QA passed** |
| 6 | AI Ethics Checker / Risk Assessment | **Tested — formal implementation QA passed** |
| 7 | Responsible AI Policy | **Tested — formal implementation QA passed** |
| 8 | Customer Evidence Decision Brief | **Implemented — source QA complete; browser acceptance QA pending** |
| 9 | Human-Reviewed AI Workflow | **Implemented — source QA complete; browser acceptance QA pending** |
| 10 | AI Use / Disclosure Log | **Implemented — source QA complete; browser acceptance QA pending** |
| 11 | Values-Based AI Decision Framework | **Implemented — source QA complete; browser acceptance QA pending** |
| 12 | Workforce Impact Map | **Implemented — source QA complete; browser acceptance QA pending** |
| 13 | AI Implementation Plan | **Implemented — source QA complete; browser acceptance QA pending** |
| 14 | Dashboard Testing and Revision Record | **Implemented — source QA complete; browser acceptance QA pending** |
| 15 | Final Integrated AI Management Dashboard | **Implemented — source QA complete; final browser acceptance/defense QA pending** |

See `docs/STUDENT_VIEW_QA.md` for the implementation QA record and regression protections enforced by the course build gate. Source-level QA is not a substitute for the remaining representative desktop/mobile browser acceptance pass.

## Canonical assessment rhythm

Major assessments are scheduled as Quiz 1 (Week 2), Quiz 2 (Week 5), Test 1 (Week 7), Quiz 3 (Week 9), Test 2 (Week 12), Quiz 4 (Week 14), and the cumulative Final Exam (Week 15). Seven required discussions occur in Weeks 1, 4, 6, 8, 10, 11, and 14. Lesson-level checks are practice/knowledge checks, not additional major quizzes.

See `docs/COURSE_CANON.md` for the complete source-of-truth map.

## Final Week 8–15 progression

The following artifact names and requirements are the canonical implementation. Search, assistant data, course structure, assignments, architecture, translations, and the student dashboard should use these names.

### Week 8 — Customer Evidence Decision Brief

Students document at least three sourced customer insights, label evidence as observed/inferred/AI-generated, identify a missing customer voice and validation question, compare options/tradeoffs, and make a manager-owned recommendation.

### Week 9 — Human-Reviewed AI Workflow

Students connect the workflow to the Week 8 problem, define the AI-supported step, add a visible human review checkpoint, verification checks, an escalation trigger, an accountable owner, and test evidence.

### Week 10 — AI Use / Disclosure Log

Students record the task, tool, prompt/input, AI contribution, their own changes, verification, and a clear disclosure statement.

### Week 11 — Values-Based AI Decision Framework

Students record the situation, affected people, relevant values, tensions/tradeoffs, evidence/uncertainty, safeguards, and an accountable recommendation.

### Week 12 — Workforce Impact Map

Students distinguish tasks from jobs, identify automation/augmentation/human-retained work, document skills and reskilling needs, include worker voice and transition risk, and make a management recommendation.

### Week 13 — AI Implementation Plan

Students define the business problem and bounded AI solution, expected benefits, risks, controls, owners, training, pilot timeline, KPIs/baseline, stop conditions, and rollout recommendation.

### Week 14 — Dashboard Testing and Revision Record

Students define acceptance criteria, run an end-to-end test, document defects and peer feedback, make revisions, retest high-priority issues, and make a release-readiness decision.

### Week 15 — Final Integrated AI Management Dashboard

Students connect the approved artifacts from Weeks 1–14, confirm end-to-end navigation/persistence/verification/disclosure/safeguards, document remaining limitations, make a final release/deployment decision, and prepare evidence for the portfolio and defense.

## Component states

- **Planned** — approved requirement exists but is not represented in the dashboard.
- **Module defined** — instructions and the named artifact exist, but the student cannot yet complete the workflow in the dashboard.
- **Implemented** — the student has a usable workspace with the required artifact fields and submission path.
- **Tested** — the implementation has passed the documented implementation QA and production build gate.
- **Acceptance QA pending** — implementation exists, but a representative student/instructor browser acceptance pass should still be completed before release.
- **Complete** — approved, implemented, tested, accepted, and ready to remain on `main`.

## Course progress

The class dashboard should separately track:

- current week / 15;
- weekly learning completion;
- assignment completion;
- quiz/test completion;
- discussion completion; and
- dashboard-build completion.

## Quality gate

Before moving an item to **Complete**:

1. Confirm the builder content is approved.
2. Confirm the artifact name and requirements match the finalized progression.
3. Run the production build gate.
4. Test the page from a student perspective.
5. Verify links, persistence, scoring, and submission instructions.
6. Confirm earlier dashboard functionality still works.
7. Review the changed files and commit message.
