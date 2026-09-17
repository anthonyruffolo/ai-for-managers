# GitHub Collaboration Workflow

GitHub is the source of truth for the course dashboard. Keep `main` stable and use focused branches for work that is not ready to publish.

## Course-team workflow

**Builder → second-builder review → Daniel approval → Anthony implementation → student-view testing → merge to main**

### Branch guidance

- `main` = approved/stable version
- `feature/...` = focused development work
- Keep changes small enough to review
- Do not mix unrelated content or redesign work into a weekly change

## Basic GitHub vocabulary

- **Repository:** the project space containing the course dashboard files.
- **Branch:** an independent line of work based on the repository.
- **Commit:** a saved snapshot of a change with a message explaining what changed.
- **Push:** send local commits to GitHub.
- **Pull:** bring newer repository changes into your local copy.
- **Pull request:** a request to review and merge a branch into another branch.
- **Merge:** combine approved branch changes into the target branch.
- **Version control:** the system for tracking changes so the team can review and recover work.

## For builders

You do not need to become a programmer. Your primary job is to produce the approved course content package. If you need a dashboard change, describe what the student should see and do; Anthony handles implementation after approval.

## For dashboard changes

Before merging:

1. Confirm the content has been approved.
2. Check that the page matches the weekly template.
3. Test the page from a student perspective.
4. Verify links and submission instructions.
5. Confirm earlier dashboard functionality still works.
6. Commit with a specific message.
7. Review the changed files.
8. Merge only after required review/testing is complete.

## Commit message pattern

Use an action-oriented first line, for example:

`Add Week 4 dashboard build structure`

Then explain the important details in the commit body when the change is substantial.

## Safety

Never commit passwords, API keys, tokens, private student data, or other secrets.
