export type FinalizedWeek = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type ArtifactField = {
  key: string;
  label: string;
  help: string;
  kind?: 'text' | 'textarea' | 'select';
  options?: string[];
  required?: boolean;
};

export type FinalizedWeekSpec = {
  week: FinalizedWeek;
  artifact: string;
  buildDescription: string;
  submission: string;
  requirements: string[];
  fields: ArtifactField[];
};

export const FINALIZED_PROGRESSION: Record<FinalizedWeek, FinalizedWeekSpec> = {
  8: {
    week: 8,
    artifact: 'Customer Evidence Decision Brief',
    buildDescription: 'Turn customer evidence into a decision-ready brief that separates observed evidence, inference, and AI-generated ideas before a manager recommends action.',
    submission: 'Customer Evidence Decision Brief and management recommendation',
    requirements: [
      'Document at least three customer insights and name a source for each one.',
      'Label each insight as observed, inferred, or AI-generated.',
      'Identify one missing customer voice and one question that still needs validation.',
      'Compare realistic options, explain tradeoffs and risk, and name the manager who owns the final decision.',
    ],
    fields: [
      { key: 'problem', label: 'Customer or management problem', help: 'What decision needs to be made, and who is affected?', kind: 'textarea', required: true },
      { key: 'insight1', label: 'Insight 1 + source', help: 'State the insight, source, and evidence label (observed, inferred, or AI-generated).', kind: 'textarea', required: true },
      { key: 'insight2', label: 'Insight 2 + source', help: 'State a second insight, source, and evidence label.', kind: 'textarea', required: true },
      { key: 'insight3', label: 'Insight 3 + source', help: 'State a third insight, source, and evidence label.', kind: 'textarea', required: true },
      { key: 'missingVoice', label: 'Missing customer voice', help: 'Whose perspective is missing or underrepresented?', kind: 'textarea', required: true },
      { key: 'validationQuestion', label: 'Validation question', help: 'What question must be answered before acting?', kind: 'textarea', required: true },
      { key: 'tradeoffs', label: 'Options and tradeoffs', help: 'Compare at least two realistic options and their risks.', kind: 'textarea', required: true },
      { key: 'recommendation', label: 'Manager recommendation', help: 'What should the manager do, why, and what remains uncertain?', kind: 'textarea', required: true },
      { key: 'owner', label: 'Accountable decision owner', help: 'Name the role responsible for the final decision.', required: true },
    ],
  },
  9: {
    week: 9,
    artifact: 'Human-Reviewed AI Workflow',
    buildDescription: 'Build a small AI-assisted workflow from a documented Week 8 problem with a visible human review checkpoint, verification steps, escalation trigger, and accountable owner.',
    submission: 'Human-Reviewed AI Workflow and test evidence',
    requirements: [
      'Connect the workflow to a documented Week 8 customer problem.',
      'Show what AI may draft, summarize, classify, or flag and what a person must review.',
      'Add source, calculation, and uncertainty checks before the output is used.',
      'Define an escalation trigger, accountable owner, and one tested example from input to reviewed output.',
    ],
    fields: [
      { key: 'problem', label: 'Week 8 problem carried forward', help: 'What documented customer or management problem does this workflow address?', kind: 'textarea', required: true },
      { key: 'input', label: 'Workflow input / trigger', help: 'What starts the workflow?', kind: 'textarea', required: true },
      { key: 'aiStep', label: 'AI-supported step', help: 'What may AI draft, summarize, classify, or flag?', kind: 'textarea', required: true },
      { key: 'humanReview', label: 'Human review checkpoint', help: 'What must a person inspect, decide, approve, or revise?', kind: 'textarea', required: true },
      { key: 'verification', label: 'Verification checks', help: 'List the source, calculation, context, and uncertainty checks required before use.', kind: 'textarea', required: true },
      { key: 'escalation', label: 'Escalation trigger', help: 'What condition stops the normal workflow and requires additional review?', kind: 'textarea', required: true },
      { key: 'owner', label: 'Accountable owner', help: 'Which role owns the final decision and the workflow outcome?', required: true },
      { key: 'test', label: 'Test case and result', help: 'Run one fictional or permitted example and document what changed after human review.', kind: 'textarea', required: true },
    ],
  },
  10: {
    week: 10,
    artifact: 'AI Use / Disclosure Log',
    buildDescription: 'Maintain a transparent record of the task, tool, prompt or input, AI contribution, student changes, verification, and disclosure statement.',
    submission: 'AI Use / Disclosure Log and integrity reflection',
    requirements: [
      'Identify the task and AI tool used.',
      'Record the prompt or input and describe the AI contribution.',
      'Explain what the student changed or completed independently.',
      'Document verification and write a clear disclosure statement.',
    ],
    fields: [],
  },
  11: {
    week: 11,
    artifact: 'Values-Based AI Decision Framework',
    buildDescription: 'Use a structured values framework to document the situation, affected people, competing values, evidence, safeguards, and accountable management decision.',
    submission: 'Values-Based AI Decision Framework and decision memo',
    requirements: [
      'Describe the decision and the people who could benefit or be harmed.',
      'Evaluate truthfulness, human dignity, justice/fairness, stewardship, responsibility, and moral discernment.',
      'Identify tensions between values rather than treating a single value as a slogan.',
      'Connect evidence and safeguards to a clear accountable recommendation.',
    ],
    fields: [
      { key: 'situation', label: 'Decision situation', help: 'What AI-enabled management decision is being considered?', kind: 'textarea', required: true },
      { key: 'people', label: 'Affected people', help: 'Who benefits, who bears risk, and who needs a voice or remedy?', kind: 'textarea', required: true },
      { key: 'values', label: 'Relevant values', help: 'Address truthfulness, dignity, fairness, stewardship, responsibility, and discernment as applicable.', kind: 'textarea', required: true },
      { key: 'tensions', label: 'Value tensions and tradeoffs', help: 'Where do important values or outcomes pull in different directions?', kind: 'textarea', required: true },
      { key: 'evidence', label: 'Evidence and uncertainty', help: 'What evidence supports the recommendation, and what is still uncertain?', kind: 'textarea', required: true },
      { key: 'safeguards', label: 'Safeguards', help: 'What controls protect people and preserve human accountability?', kind: 'textarea', required: true },
      { key: 'recommendation', label: 'Values-based recommendation', help: 'What should the manager decide and why?', kind: 'textarea', required: true },
      { key: 'owner', label: 'Accountable owner', help: 'Which role is responsible for the final decision and follow-up?', required: true },
    ],
  },
  12: {
    week: 12,
    artifact: 'Workforce Impact Map',
    buildDescription: 'Map how AI changes tasks, human-retained work, skills, training, worker voice, transition risk, and the manager’s workforce recommendation.',
    submission: 'Workforce Impact Map and management recommendation',
    requirements: [
      'Separate tasks from jobs and distinguish automation from augmentation.',
      'Identify work that should remain human and the skills that become more important.',
      'Include worker voice, reskilling needs, and transition risks.',
      'Make a management recommendation that explains safeguards and support for affected workers.',
    ],
    fields: [
      { key: 'team', label: 'Role, team, or profession', help: 'What work area are you evaluating?', required: true },
      { key: 'tasks', label: 'Current tasks', help: 'List the major tasks that make up the work today.', kind: 'textarea', required: true },
      { key: 'automate', label: 'Tasks AI may automate', help: 'Which bounded, repeatable tasks could AI perform with appropriate controls?', kind: 'textarea', required: true },
      { key: 'augment', label: 'Tasks AI should augment', help: 'Where should AI assist while a person remains responsible?', kind: 'textarea', required: true },
      { key: 'human', label: 'Human-retained work', help: 'Which tasks should remain primarily human and why?', kind: 'textarea', required: true },
      { key: 'skills', label: 'Skills and reskilling needs', help: 'What human skills, training, or new capability will workers need?', kind: 'textarea', required: true },
      { key: 'voice', label: 'Worker voice', help: 'How will affected workers provide input, challenge problems, or report harm?', kind: 'textarea', required: true },
      { key: 'risk', label: 'Transition risks and safeguards', help: 'What could go wrong during the change, and how will the organization respond?', kind: 'textarea', required: true },
      { key: 'recommendation', label: 'Management recommendation', help: 'Recommend how the work should change and what support is required.', kind: 'textarea', required: true },
    ],
  },
  13: {
    week: 13,
    artifact: 'AI Implementation Plan',
    buildDescription: 'Turn one bounded AI capability into a phased implementation plan with benefits, risks, owners, training, timeline, KPIs, policy controls, and stop conditions.',
    submission: 'AI Implementation Plan and rollout recommendation',
    requirements: [
      'Define the business problem, intended users, and bounded AI solution.',
      'Connect expected benefits to measurable KPIs and realistic baselines.',
      'Assign owners for oversight, training, policy compliance, measurement, and incident response.',
      'Use a phased pilot with explicit stop conditions and a clear recommendation to pilot, revise, pause, or stop.',
    ],
    fields: [
      { key: 'problem', label: 'Business problem and intended users', help: 'What problem is worth solving, and for whom?', kind: 'textarea', required: true },
      { key: 'solution', label: 'Bounded AI solution', help: 'What exactly will the AI do, and what will it not do?', kind: 'textarea', required: true },
      { key: 'benefits', label: 'Expected benefits', help: 'What measurable improvement is expected?', kind: 'textarea', required: true },
      { key: 'risks', label: 'Key risks', help: 'What could harm people, performance, compliance, trust, or the organization?', kind: 'textarea', required: true },
      { key: 'controls', label: 'Controls and oversight', help: 'What safeguards, approvals, verification, and monitoring are required?', kind: 'textarea', required: true },
      { key: 'owners', label: 'Owners', help: 'Name the roles responsible for training, oversight, measurement, policy, and incident response.', kind: 'textarea', required: true },
      { key: 'training', label: 'Training and change plan', help: 'What must employees learn before the pilot?', kind: 'textarea', required: true },
      { key: 'timeline', label: 'Pilot timeline', help: 'Define the phased rollout and review points.', kind: 'textarea', required: true },
      { key: 'kpis', label: 'KPIs and baseline', help: 'How will success, harm, quality, and adoption be measured?', kind: 'textarea', required: true },
      { key: 'stop', label: 'Stop conditions', help: 'What evidence would cause the organization to pause or stop?', kind: 'textarea', required: true },
      { key: 'recommendation', label: 'Rollout recommendation', help: 'Pilot, revise, pause, or stop — and why?', kind: 'textarea', required: true },
    ],
  },
  14: {
    week: 14,
    artifact: 'Dashboard Testing and Revision Record',
    buildDescription: 'Run end-to-end acceptance tests, capture defects and peer feedback, document revisions, retest high-priority issues, and make a release-readiness decision.',
    submission: 'Testing record, peer feedback, revision evidence, and release recommendation',
    requirements: [
      'Write clear acceptance criteria and test the dashboard as a first-time user.',
      'Test navigation, content, safeguards, verification, disclosure, persistence, and responsive usability.',
      'Capture peer feedback and prioritize defects by impact.',
      'Document revisions, retest high-priority items, and make a release-readiness recommendation.',
    ],
    fields: [
      { key: 'criteria', label: 'Acceptance criteria', help: 'What must work for the dashboard to be considered ready?', kind: 'textarea', required: true },
      { key: 'test', label: 'End-to-end test performed', help: 'Describe the student journey you tested from start to finish.', kind: 'textarea', required: true },
      { key: 'actual', label: 'Actual result and defects', help: 'What worked, what failed, and how severe were the problems?', kind: 'textarea', required: true },
      { key: 'peer', label: 'Peer feedback', help: 'What did another student or reviewer find confusing, risky, or valuable?', kind: 'textarea', required: true },
      { key: 'revision', label: 'Revision made', help: 'What did you change in response to evidence or feedback?', kind: 'textarea', required: true },
      { key: 'retest', label: 'Retest result', help: 'What happened when you repeated the affected flow?', kind: 'textarea', required: true },
      { key: 'release', label: 'Release-readiness decision', help: 'Choose the current release decision.', kind: 'select', options: ['Ready to release', 'Release with documented limitations', 'Revise and retest', 'Do not release'], required: true },
      { key: 'rationale', label: 'Release rationale', help: 'Explain the evidence behind the release decision.', kind: 'textarea', required: true },
    ],
  },
  15: {
    week: 15,
    artifact: 'Final Integrated AI Management Dashboard',
    buildDescription: 'Integrate the full semester dashboard, verify cross-week connections, document remaining limitations, and prepare the evidence needed for the final portfolio and defense.',
    submission: 'Final dashboard portfolio, defense evidence, final paper, and reflection',
    requirements: [
      'Connect the approved artifacts from Weeks 1–14 into one coherent dashboard.',
      'Confirm end-to-end navigation, persistence, verification, disclosure, safeguards, and human decision ownership.',
      'Document remaining limitations and a final release/deployment decision.',
      'Prepare a concise defense that uses working evidence from the dashboard.',
    ],
    fields: [
      { key: 'evidence', label: 'Integrated dashboard evidence', help: 'Identify the working pages, links, screenshots, or repository evidence that demonstrate the integrated system.', kind: 'textarea', required: true },
      { key: 'connections', label: 'Cross-week connections', help: 'Explain how the major artifacts work together rather than existing as isolated assignments.', kind: 'textarea', required: true },
      { key: 'limitations', label: 'Remaining limitations', help: 'What is still imperfect, uncertain, or intentionally out of scope?', kind: 'textarea', required: true },
      { key: 'decision', label: 'Final release / deployment decision', help: 'Choose the final management decision.', kind: 'select', options: ['Ready to demonstrate', 'Ready with documented limitations', 'Needs revision before demonstration', 'Do not deploy'], required: true },
      { key: 'defense', label: 'Defense evidence', help: 'What evidence best supports your design choices, safeguards, and management judgment?', kind: 'textarea', required: true },
      { key: 'reflection', label: 'Final reflection', help: 'What changed in your approach to AI management, and what would you do next?', kind: 'textarea', required: true },
    ],
  },
};

export function isFinalizedWeek(week: number): week is FinalizedWeek {
  return week >= 8 && week <= 15;
}
