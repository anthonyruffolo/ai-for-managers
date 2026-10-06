# Course Dashboard Architecture

This document defines the technical/content scaffolding for the AI for Managers course dashboard. Builders own approved lessons, examples, rubrics, assessments, and weekly student-build requirements. Technical implementation integrates the approved material into one coherent student experience.

## Course shell

The dashboard provides stable destinations for:

- Course Home
- Course Content / Weeks 1–15
- Assignments
- Discussions
- My Grades
- Messages & Help
- AI Toolkit
- Syllabus
- progress and resume support
- final dashboard / portfolio work

## Standard weekly page

Each week should preserve a predictable student sequence:

1. Week Overview
2. Learning Objectives
3. Required Learning Materials / Lesson
4. Key Terms
5. AI Activity or Practice
6. Your Dashboard Build
7. Step-by-Step Student Directions
8. Example / Model
9. Submission Requirements
10. Rubric / Grading
11. Quiz / Test / Discussion when applicable
12. Resources
13. Week Progress

## Finalized student project progression

The student's AI Management Dashboard is a progressive semester project. The Week 8–15 progression below is final for implementation and should not be renamed independently in search, assistant data, assignments, translations, or weekly pages.

| Week | Final dashboard component / milestone | Required result |
|---:|---|---|
| 1 | Dashboard Starter Version | Define the management problem, target user, purpose, homepage/navigation, and future placeholders. |
| 2 | AI Tools | Compare appropriate AI tools, limitations, privacy considerations, and management use cases. |
| 3 | Research & Know | Build an AI-assisted research workflow with stronger questions, source evaluation, claim verification, and documented human judgment. |
| 4 | AI Productivity | Compare a normal and AI-assisted workflow, including time, quality, risk, and human review. |
| 5 | Manager Decision Assistant | Separate AI analysis/recommendation from alternatives, missing information, verification, risk, and the manager's final decision. |
| 6 | AI Ethics Checker / Risk Assessment | Evaluate fairness, privacy, harm, explainability, oversight, accountability, verification, and overall risk. |
| 7 | Responsible AI Policy | Translate Week 6 risks into policy rules, safeguards, roles, monitoring, and escalation. |
| 8 | Customer Evidence Decision Brief | Produce three sourced insights, evidence labels, a missing voice, validation question, tradeoffs, and a manager-owned recommendation. |
| 9 | Human-Reviewed AI Workflow | Connect to the Week 8 problem; define AI steps, human review, verification, escalation, accountable ownership, and test evidence. |
| 10 | AI Use / Disclosure Log | Record task, tool, prompt/input, AI contribution, student changes, verification, and disclosure. |
| 11 | Values-Based AI Decision Framework | Evaluate affected people, values, tensions, evidence, safeguards, and the accountable decision. |
| 12 | Workforce Impact Map | Map tasks, automation/augmentation, human-retained work, skills, training, worker voice, transition risk, and the management recommendation. |
| 13 | AI Implementation Plan | Define the business problem, bounded solution, benefits, risks, controls, owners, training, timeline, KPIs, stop conditions, and rollout recommendation. |
| 14 | Dashboard Testing and Revision Record | Run acceptance tests, record defects/peer feedback, revise, retest, and make a release-readiness decision. |
| 15 | Final Integrated AI Management Dashboard | Connect Weeks 1–14, document limitations, make the final release/deployment decision, and prepare portfolio/defense evidence. |

## Assessment and discussion architecture

Major assessments use a deliberate cadence: Quiz 1 (Week 2), Quiz 2 (Week 5), Test 1 (Week 7), Quiz 3 (Week 9), Test 2 (Week 12), Quiz 4 (Week 14), and the cumulative Final Exam (Week 15). Lesson-level checks are practice or formative assessment and do not create extra major-course quiz numbers.

The Discussion Board contains exactly seven required discussions: Weeks 1, 4, 6, 8, 10, 11, and 14. Weeks without a required discussion may contain reflection or peer-review work, but they should not display a generic required-discussion fallback.

## Progress architecture

Track two distinct kinds of progress.

### Course progress

- Current week out of 15
- Weekly lesson/activity completion
- Assignment status
- Quiz/test status
- Discussion status
- Overall course completion

### Dashboard-build progress

Track completion of each major artifact above. A component should move from planned → implemented → tested → accepted/complete rather than being considered done because its name appears in a module.

## Submission architecture

Each weekly assignment area should support:

- assignment description;
- what to submit;
- dashboard build requirement;
- supporting files or evidence when required;
- student confirmation/checklist;
- rubric or grading criteria; and
- submission/completion status.

Assessments and discussions retain separate course-navigation destinations even when they are linked from a weekly module.

## Search and assistant synchronization

The enhanced course search and AI Course Assistant must use the same finalized artifact names and requirements as the student-facing dashboard. The production build gate verifies this synchronization for Weeks 8–15.

## Student testing

Before a weekly artifact is considered complete, test it as an undergraduate student:

- Can the student find the week's work?
- Are directions understandable without developer knowledge?
- Is the expected deliverable obvious?
- Does the artifact workspace collect the evidence named in the requirements?
- Does the submission area match the assignment?
- Do links, scoring, completion, and saved state behave as expected?
- Does the page work at representative desktop and mobile widths?
- Does the new build connect to prior dashboard work?
- Does previously built functionality still work?

The implementation QA record is maintained in `docs/STUDENT_VIEW_QA.md`. The canonical course and assessment schedule is maintained in `docs/COURSE_CANON.md`.

## Scope rule

Do not pre-write another builder's unapproved lesson or assessment simply to fill a page. Once a weekly package is approved, however, the artifact name and requirements should be integrated consistently across the dashboard instead of leaving contradictory placeholders.
