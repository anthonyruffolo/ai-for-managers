'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Priority = 'High' | 'Medium' | 'Low';
type View = 'home' | 'content' | 'assignments' | 'discussions' | 'grades' | 'messages' | 'toolkit' | 'syllabus';
type HelpMode = 'instructions' | 'technical' | 'team';
type Task = {
  id: number;
  title: string;
  category: string;
  due: string;
  priority: Priority;
  complete: boolean;
  verified: boolean;
};

type EthicsAssessment = {
  useCase: string;
  personalData: string;
  disadvantage: string;
  harm: string;
  humanReview: string;
  explainability: string;
  challenge: string;
  dataFit: string;
  accountable: string;
  risk: string;
  recommendation: string;
  rationale: string;
  categoryRisks: Record<string, string>;
  caseDecision: string;
  caseRationale: string;
  reflection: string;
  connectSafeguards: string;
  complete: boolean;
};

type PolicyDraft = {
  organization: string;
  industry: string;
  policyOwner: string;
  effectiveDate: string;
  reviewDate: string;
  status: string;
  purpose: string;
  scope: string;
  definitions: string;
  approved: string;
  prohibited: string;
  highRisk: string;
  confidentiality: string;
  humanReview: string;
  verification: string;
  disclosure: string;
  accountability: string;
  security: string;
  vendors: string;
  incidents: string;
  recordkeeping: string;
  training: string;
  monitoring: string;
  reviewSchedule: string;
  readinessChecks: Record<string, boolean>;
  version: string;
  complete: boolean;
};

type KnowledgeQuestion = [string, string[], string];
type GovernanceAnswers = Record<string, string | boolean>;
type PolicyEditableKey = 'organization' | 'purpose' | 'scope' | 'definitions' | 'approved' | 'prohibited' | 'highRisk' | 'confidentiality' | 'humanReview' | 'verification' | 'disclosure' | 'accountability' | 'security' | 'vendors' | 'incidents' | 'recordkeeping' | 'training' | 'monitoring' | 'reviewSchedule';

const initialEthicsAssessment: EthicsAssessment = {
  useCase: '', personalData: '', disadvantage: '', harm: '', humanReview: '', explainability: '', challenge: '', dataFit: '', accountable: '', risk: '', recommendation: '', rationale: '', categoryRisks: {}, caseDecision: '', caseRationale: '', reflection: '', connectSafeguards: '', complete: false,
};

const initialPolicyDraft: PolicyDraft = {
  organization: '', industry: '', policyOwner: '', effectiveDate: '', reviewDate: '', status: 'Draft', purpose: '', scope: '', definitions: '', approved: '', prohibited: '', highRisk: '', confidentiality: '', humanReview: '', verification: '', disclosure: '', accountability: '', security: '', vendors: '', incidents: '', recordkeeping: '', training: '', monitoring: '', reviewSchedule: '', readinessChecks: {}, version: 'v1', complete: false,
};

const ethicsLessons = [
  ['Lesson 1 · Ethics vs. Efficiency', 'An AI system can be fast, inexpensive, accurate, and scalable while still creating an ethical problem. A system that is 90% accurate does not answer who bears the 10% of errors, whether errors are distributed fairly, or whether people can challenge them.', 'TRY: A company could save $300,000 by automatically screening applicants. Would 90% accuracy alone justify deployment? Explain what fairness, privacy, explainability, impact, and oversight questions remain.'],
  ['Lesson 2 · Bias and Fairness', 'Data bias reflects incomplete or unrepresentative examples. Design bias comes from labels, objectives, thresholds, or features chosen by people. Deployment bias appears when a system is used in a context different from the one tested. Historical data can reproduce historical decisions; AI does not automatically remove bias.', 'APPLY: If 70% of ten years of historical hires were men, investigate whether the data represents the qualified labor pool, whether job criteria encode past preferences, and whether outcomes should be monitored by group. Fairness is context-dependent, not one universal metric.'],
  ['Lesson 3 · Privacy and Data', 'Managers should ask what data is collected, whether it is necessary, whether it is sensitive, who can access it, where it is stored, and whether the organization is authorized to use it. Organizational policy and applicable law determine what is permissible; this course does not give legal advice.', 'TRY: Classify a public earnings report, customer email list, employee Social Security number, internal strategy, public job description, customer medical information, company password, and public news article as safe, caution, or do not enter.'],
  ['Lesson 4 · Transparency and Explainability', 'Transparency means people receive relevant information about when and, where appropriate, how AI is used. Explainability means relevant reasons for an output can be understood. “Candidate rejected” is not enough; “42/100 based on five criteria” may still be insufficient for a high-stakes decision without meaningful criteria, appeal, and context.', 'CHECK: Ask what explanation the affected person needs, what the decision-maker needs, and what the organization can document.'],
  ['Lesson 5 · Accountability', '“The AI made the decision” is not an acceptable transfer of responsibility. Employees, managers, vendors, data providers, developers, and the organization may have different responsibilities, but the organization must assign decision rights and escalation paths.', 'APPLY: Map who selected the tool, supplied data, approved use, monitored outputs, reviewed the recommendation, and can stop the system.'],
  ['Lesson 6 · Human Oversight', 'Oversight should be proportionate to risk and context. AI suggesting meeting times is low risk; retention recommendations are moderate; termination recommendations are high; sensitive or consequential decisions may be very high. A human needs time, information, authority, and a real ability to override AI.', 'DECIDE: When should a human be able to override the output, and what evidence should the reviewer document?'],
  ['Lesson 7 · Hallucination and Reliability', 'Generative AI can produce incorrect facts, fabricated citations, invented sources, incorrect calculations, and confident but unsupported statements. Fluency is not evidence. Verification means checking claims, calculations, sources, assumptions, and limits before a management decision.', 'SPOT THE PROBLEM: “Our campaign will increase revenue 28% because a 2023 industry study proves it. The study was published by MarketPulse, and the model found the exact effect.” Verify the statistic, source, causal claim, and calculation before using it.'],
  ['Lesson 8 · Stakeholder Impact', 'Ask who could be affected: employees, customers, managers, shareholders, community members, vendors, and regulators. For each stakeholder, identify a benefit, a risk, a possible harm, and what voice or remedy they have.', 'MAP: A hiring system may save recruiter time while shifting risk to applicants, employees, and the organization’s reputation.'],
];

const ethicsRiskCategories = ['Purpose', 'Data', 'People', 'Impact', 'Transparency', 'Oversight', 'Accountability', 'Verification'];
const privacyExamples = [
  ['Public company earnings report', 'SAFE TO USE', 'Public information, assuming the tool and assignment permit it.'],
  ['Customer email list', 'USE CAUTION / VERIFY POLICY', 'Contains personal information and may require authorization, minimization, or de-identification.'],
  ['Employee Social Security number', 'DO NOT ENTER', 'Highly sensitive personal information.'],
  ['Internal strategic plan', 'USE CAUTION / VERIFY POLICY', 'Confidential company information should only enter an approved system for an approved purpose.'],
  ['Public job description', 'SAFE TO USE', 'Public information, while still checking the purpose and tool policy.'],
  ['Customer medical information', 'DO NOT ENTER', 'Highly sensitive information with significant privacy and harm concerns.'],
  ['Company password', 'DO NOT ENTER', 'Credentials must never be entered into an AI tool.'],
  ['Public news article', 'SAFE TO USE', 'Public information, but verify the article and any AI summary.'],
];
const ethicsComparison = [
  ['Ethics', 'What should we do?', 'A legal hiring practice may still be unfair or harmful.'],
  ['Law', 'What are we required or prohibited from doing?', 'Applicable law may set minimum duties, but compliance is not the whole ethical analysis.'],
  ['Compliance', 'Are we following applicable rules, policies, and requirements?', 'An organization checks its own policy and relevant obligations before deployment.'],
  ['Risk management', 'What could go wrong, how serious is it, and how should we respond?', 'A manager identifies unknowns, assigns an owner, and chooses safeguards or escalation.'],
];
const biasExamples = [
  ['Historical bias', 'Past hiring decisions favor one group.', 'Data', 'A model learns patterns from unequal outcomes.'],
  ['Representation bias', 'The training sample excludes rural applicants.', 'Data', 'Performance may be weaker for people missing from the sample.'],
  ['Measurement bias', 'Keyboard activity is used as a proxy for productivity.', 'Measurement', 'The variable may not measure valuable work.'],
  ['Design bias', 'The team optimizes only for speed and ignores false rejections.', 'Design', 'The objective rewards one outcome at others\' expense.'],
  ['Deployment bias', 'A tool tested on volunteers is used for disciplinary decisions.', 'Deployment', 'The context and stakes changed after testing.'],
];
const verificationClaims = [
  ['"The 2023 MarketPulse study proves revenue will rise 28%."', 'Find the original study; confirm it exists, date, sample, measure, and whether correlation supports the causal claim.'],
  ['"The model calculated a 14.7% improvement."', 'Recalculate from the raw numbers and state the baseline, formula, and rounding.'],
  ['"Customers prefer the new workflow."', 'Check how preference was measured, whose voices are missing, and whether the evidence supports all customers.'],
  ['"The vendor guarantees fairness."', 'Ask what population, metric, threshold, test data, and monitoring evidence support the claim.'],
  ['"No privacy risk exists because the data is internal."', 'Confirm authorization, access, retention, vendor handling, and whether internal data contains personal or confidential information.'],
];
const oversightScenarios = [
  ['Draft social captions', 'Low', 'A person reviews before publishing, but errors are usually easy to correct.'],
  ['Summarize meeting notes', 'Low', 'The meeting owner checks names, decisions, and action items.'],
  ['Flag possible fraud', 'Moderate', 'An investigator reviews evidence before contacting or restricting a customer.'],
  ['Recommend job candidates', 'High', 'Qualified HR staff review criteria and outcomes; AI cannot make the final decision.'],
  ['Recommend employee termination', 'Human decision required', 'The consequence is serious and difficult to reverse; a manager must investigate independently.'],
  ['Generate a customer refund response', 'Moderate', 'A trained employee verifies policy, amount, tone, and exceptions.'],
  ['Make a medical recommendation', 'Human decision required', 'A qualified professional must evaluate the person and evidence; AI is not the decision-maker.'],
  ['Approve a large financial transaction', 'High', 'Authorized staff verify identity, evidence, limits, and fraud controls before approval.'],
];
const governanceDecisionScenarios = [
  ['The vendor model changed and performance is unknown.', 'Escalate', 'Decision authority needs the change documented and tested before continued high-impact use.'],
  ['A low-risk draft tool has occasional formatting errors.', 'Accept', 'A bounded, reversible risk may be accepted when it is within tolerance and monitored.'],
  ['Applicant outcomes differ sharply across groups.', 'Reduce', 'Pause automatic rejection, test the causes, and add controls before proceeding.'],
  ['The organization cannot provide data needed for a vendor audit.', 'Transfer', 'Contractual terms can allocate obligations and evidence requirements, but the organization retains oversight.'],
  ['The only proposed use is automated termination approval.', 'Avoid', 'Do not pursue a use that removes accountable human judgment from a consequential decision.'],
  ['A privacy incident exposes customer prompts.', 'Escalate', 'Contain the issue and move it to the authority responsible for incident response and notification decisions.'],
];
const ethicsLabCases = [
  ['A', 'AI-generated marketing copy', 'Drafting campaign language from approved, non-confidential inputs.'],
  ['B', 'AI employee-monitoring system', 'Analyzing activity signals to recommend productivity interventions.'],
  ['C', 'AI hiring recommendation system', 'Ranking applicants and recommending who moves forward.'],
];
const knowledgeCheckQuestions: KnowledgeQuestion[] = [
  ['Which response best addresses a 90% accurate hiring system?', ['Deploy immediately', 'Investigate error distribution, fairness, privacy, explainability, and oversight', 'Reject every AI system', 'Let the vendor decide'], 'Investigating context and consequences is stronger than treating accuracy as a complete management decision.'],
  ['Historical hiring data is 70% men. What should the manager do first?', ['Assume the system is fair', 'Investigate representation, criteria, and outcome patterns', 'Delete all historical data', 'Use the data without testing'], 'Historical patterns may reflect unequal representation or past decisions and need investigation.'],
  ['True or false: Automation automatically eliminates human bias.', ['True', 'False'], 'False. Automation can reproduce or amplify problems in data, design, and use.'],
  ['Which item should never be entered into an AI tool?', ['Public news article', 'Public job description', 'Company password', 'Public earnings report'], 'Credentials are not appropriate inputs to an AI tool.'],
  ['“Candidate rejected” is an adequate explanation for a high-stakes decision.', ['True', 'False'], 'False. People need relevant reasons, context, and a meaningful opportunity to question or appeal.'],
  ['Who remains accountable when AI recommends termination?', ['The AI', 'Only the vendor', 'The responsible manager and organization', 'Nobody'], 'Human decision-makers and the organization retain accountability.'],
  ['Which oversight is most proportionate?', ['Meeting-time suggestions need the same controls as termination recommendations', 'High-impact decisions need qualified review and override authority', 'No AI output needs review', 'Only the model developer can review'], 'Oversight should be proportionate to risk and context.'],
  ['A recommendation cites a study that cannot be found. What is the best response?', ['Use it because the claim sounds plausible', 'Verify the source and replace or remove the unsupported claim', 'Hide the citation', 'Ask AI to sound more confident'], 'Verification includes checking sources, calculations, claims, and uncertainty.'],
  ['Which stakeholder question is most useful?', ['Who benefits and who bears risk?', 'How can we avoid documenting the decision?', 'Can the vendor promise perfection?', 'Can we remove all human review?'], 'Stakeholder analysis makes benefits, risks, harms, and remedies visible.'],
  ['A high-risk use case has unknown accountability. Best response?', ['Approve quickly', 'Escalate and assign ownership before deployment', 'Ignore the gap', 'Allow the AI to decide'], 'Unclear accountability is itself a governance risk that must be addressed.'],
];
const governanceLessons = [
  ['Lesson 1 · Responsible AI', 'Responsible AI is an organizational capability: intentionally establishing processes to identify, evaluate, manage, and monitor AI-related risks. It is more than saying “use AI ethically.”'],
  ['Lesson 2 · AI Governance', 'Governance joins people, policies, processes, controls, documentation, and monitoring. Ethics asks what should happen; governance makes responsible choices repeatable; compliance addresses applicable requirements; risk management identifies and treats uncertainty.'],
  ['Lesson 3 · NIST Govern', 'GOVERN is cross-cutting. Assign who owns AI, approves it, monitors it, can stop it, handles incidents, and documents decisions. Roles may include executive sponsor, AI owner, business owner, IT/security, legal/compliance, end users, and risk manager.'],
  ['Lesson 4 · NIST Map', 'MAP establishes context: what problem is being solved, why AI is used, who is affected, where it is used, what data is involved, what could go wrong, and what assumptions are being made.'],
  ['Lesson 5 · NIST Measure', 'MEASURE uses testing, performance and reliability checks, bias evaluation, security and privacy review, documentation, and monitoring. Before deployment, identify limitations and define evidence that would change the decision.'],
  ['Lesson 6 · NIST Manage', 'MANAGE identifies, prioritizes, treats, documents, monitors, and improves risk. A response may accept, reduce, transfer, avoid, or escalate risk, with a named owner and review date.'],
  ['Lesson 7 · AI Policies', 'A policy translates governance into approved and prohibited uses, data rules, human review, verification, disclosure, accountability, security, vendors, incidents, records, training, and review.'],
  ['Lesson 8 · Human Oversight', 'A human checkpoint is meaningful only when the reviewer is qualified, has relevant information and time, can challenge the output, and has authority to pause or overturn action.'],
  ['Lesson 9 · Data Governance', 'Data governance covers quality, access, purpose, retention, protection, provenance, and appropriate use. It connects policy language to the actual data lifecycle.'],
  ['Lesson 10 · Incident Response', 'Organizations need a route to report significant errors, privacy or security incidents, discriminatory outcomes, and other serious concerns, followed by containment, documentation, review, and corrective action.'],
  ['Lesson 11 · Continuous Monitoring', 'AI risk changes as data, users, vendors, goals, and contexts change. Monitor outcomes, complaints, overrides, drift, incidents, and whether controls still work.'],
];
const policySections = [
  ['purpose', '1. Purpose'], ['scope', '2. Scope'], ['definitions', '3. Definitions'], ['approved', '4. Approved AI uses'], ['prohibited', '5. Prohibited AI uses'], ['highRisk', '6. High-risk uses'], ['confidentiality', '7. Data and confidentiality'], ['humanReview', '8. Human oversight'], ['verification', '9. Verification'], ['disclosure', '10. Transparency and disclosure'], ['accountability', '11. Accountability'], ['security', '12. Security'], ['vendors', '13. Vendor management'], ['incidents', '14. Incident reporting'], ['recordkeeping', '15. Recordkeeping'], ['training', '16. Training'], ['monitoring', '17. Monitoring'], ['reviewSchedule', '18. Policy review'],
];

const ethicsTerms = [
  ['AI Ethics', 'The practice of deciding whether AI use is fair, appropriate, transparent, and accountable.'],
  ['Algorithmic Bias', 'Systematic unfair outcomes caused by data, design, assumptions, or implementation.'],
  ['Fairness', 'Treating people equitably and checking whether outcomes disadvantage a group.'],
  ['Privacy', 'Protecting people’s information and using only data the organization is authorized to use.'],
  ['Transparency', 'Making it understandable when and, where appropriate, how AI is being used.'],
  ['Explainability', 'Providing understandable reasons for an AI output when appropriate.'],
  ['Accountability', 'Keeping people and organizations responsible for decisions made with AI.'],
  ['Human Oversight', 'Meaningful human review, judgment, and authority to correct or stop an AI process.'],
];

const governanceTerms = [
  ['Responsible AI', 'Using AI in ways that respect people, reduce harm, and preserve human accountability.'],
  ['AI Governance', 'Policies, processes, responsibilities, and controls for managing AI use.'],
  ['AI Policy', 'An organization’s written rules for approved, prohibited, and controlled AI uses.'],
  ['Human Oversight', 'Qualified people review consequential AI outputs and can intervene.'],
  ['Data Governance', 'Rules for data quality, access, protection, retention, and appropriate use.'],
  ['Risk Management', 'A continuous process of identifying, evaluating, and responding to possible harm.'],
  ['Accountability', 'A named person or group owns decisions, controls, and follow-up.'],
  ['Audit Trail', 'A record of inputs, outputs, reviews, changes, and decisions that supports learning.'],
];

const assessmentQuestions = [
  ['Which statement best describes algorithmic bias?', 'B. AI systems can produce systematic unfair outcomes based on data, design, or use.'],
  ['Why is human oversight important in high-stakes AI applications?', 'B. Humans remain accountable for consequential decisions.'],
  ['Which situation represents the greatest ethical risk?', 'C. AI automatically rejects job applicants.'],
  ['What should a manager do when an AI system’s potential harm is unknown?', 'C. Investigate the risk and establish appropriate safeguards.'],
  ['What is AI governance?', 'B. A system of policies, processes, responsibilities, and controls for managing AI.'],
  ['Which policy requirement is most appropriate for high-stakes AI decisions?', 'B. Human review and accountability.'],
  ['Why avoid entering confidential information into unauthorized AI systems?', 'B. It may expose sensitive organizational or personal information.'],
  ['What is the primary purpose of a Git branch?', 'B. Create a separate development path for changes.'],
];

const initialTasks: Task[] = [
  { id: 1, title: 'Complete the AI foundations lesson', category: 'Learning', due: '2026-08-26', priority: 'High', complete: false, verified: false },
  { id: 2, title: 'Choose a dashboard problem and target user', category: 'Course build', due: '2026-08-27', priority: 'High', complete: false, verified: false },
  { id: 3, title: 'Create the dashboard homepage and navigation', category: 'Course build', due: '2026-08-28', priority: 'High', complete: false, verified: false },
  { id: 4, title: 'Run the Week 1 knowledge check', category: 'Learning', due: '2026-08-29', priority: 'Medium', complete: false, verified: false },
  { id: 5, title: 'Submit the dashboard starter version', category: 'Course build', due: '2026-08-30', priority: 'High', complete: false, verified: false },
  { id: 6, title: 'Week 6 AI Ethics Checker', category: 'Course build', due: '2026-10-04', priority: 'High', complete: false, verified: false },
  { id: 7, title: 'Discussion 3: When Does Using AI Become Unethical?', category: 'Discussion', due: '2026-10-04', priority: 'High', complete: false, verified: false },
  { id: 8, title: 'Week 7 Responsible AI Policy', category: 'Course build', due: '2026-10-11', priority: 'High', complete: false, verified: false },
  { id: 9, title: 'Test 1: Weeks 1–7', category: 'Assessment', due: '2026-10-11', priority: 'Medium', complete: false, verified: false },
];

const weeklyPlan = [
  { week: 1, dates: 'Aug 24–30', title: 'Orient & prototype', learn: 'How generative AI works, the difference between a model and an application, capabilities, limits, and safe use.', build: 'Define a real student problem and prototype the control center.', test: 'Use known-answer tests to find hallucinations and overconfidence.', manage: 'Set team roles, scope, contribution records, and a definition of done.', present: 'Show the problem, prototype, AI use, and first trust boundary.', output: 'Prototype + team operating agreement', studentQuestion: 'Can I do this if I have never coded?', studentWin: 'Explain AI in plain language and turn one student problem into a prototype.', career: 'Scope a useful tool before investing time or money.', workload: '6–8 hours' },
  { week: 2, dates: 'Aug 31–Sep 6', title: 'Deploy & use', learn: 'Context, iterative prompting, human oversight, and responsible data handling.', build: 'Deploy a usable dashboard with assignments, deadlines, priorities, and progress.', test: 'Test every core flow and confirm Week 1 functions still work.', manage: 'Coordinate integration and address unequal contribution early.', present: 'Demonstrate a working deployed dashboard—not slides about it.', output: 'Working dashboard URL', studentQuestion: 'Will I actually make something that works?', studentWin: 'Deploy and use a basic dashboard instead of only describing an idea.', career: 'Deliver a small working product and support its users.', workload: '7–9 hours' },
  { week: 3, dates: 'Sep 7–13', title: 'Research & know', learn: 'AI-assisted research, source quality, citation verification, and knowledge management.', build: 'Add a resource library and a research-briefing workflow.', test: 'Check fabricated citations, source relevance, and unsupported claims.', manage: 'Set evidence standards and decide who approves sources.', present: 'Defend a short, verified research brief and the workflow behind it.', output: 'Research system + verified brief', studentQuestion: 'How do I know the AI did not make this up?', studentWin: 'Produce a useful research brief and trace every important claim to evidence.', career: 'Research a market, competitor, policy, or customer responsibly.', workload: '7–9 hours' },
  { week: 4, dates: 'Sep 14–20', title: 'Analyze & decide', learn: 'Managerial data analysis, framing, bias, uncertainty, and decision support.', build: 'Add a small data-analysis or decision-support tool.', test: 'Recalculate numbers and test blanks, outliers, and misleading framing.', manage: 'Define decision rights: what AI recommends and what humans decide.', present: 'Show the analysis, recommendation, limitations, and rejected alternatives.', output: 'Decision tool + management recommendation', studentQuestion: 'What if I am not a “numbers person”?', studentWin: 'Use AI to explore data while independently checking the math and recommendation.', career: 'Turn analysis into an accountable management decision.', workload: '7–9 hours' },
  { week: 5, dates: 'Sep 21–27', title: 'Automate & coordinate', learn: 'Workflows, bots, agents, tool use, and human checkpoints.', build: 'Add one useful automation, bot, or multi-step workflow.', test: 'Probe permissions, loops, bad inputs, failed handoffs, and recovery.', manage: 'Assign owners and escalation rules for every automated step.', present: 'Demonstrate time saved, failure handling, and residual risk.', output: 'Working workflow + process map', studentQuestion: 'Can AI save time without taking control away from me?', studentWin: 'Automate a repeatable process with clear owners, checkpoints, and recovery steps.', career: 'Improve a process without hiding risk or accountability.', workload: '8–10 hours' },
  { week: 6, dates: 'Sep 28–Oct 4', title: 'AI Ethics: When Does Using AI Become Unethical?', learn: 'AI ethics, bias, fairness, privacy, transparency, explainability, accountability, and human oversight.', build: 'Add an AI Ethics Checker and evaluate the BrightPath hiring case.', test: 'Test risk answers, recommendations, safeguards, and correction paths.', manage: 'Make a defensible management recommendation while keeping humans accountable.', present: 'Defend the risk rating, recommendation, and written rationale.', output: 'AI Ethics Checker + BrightPath assessment', studentQuestion: 'Should we use AI for this?', studentWin: 'Identify ethical risks and make a defensible management recommendation.', career: 'Review AI-enabled work before organizational approval.', workload: '7–9 hours' },
  { week: 7, dates: 'Oct 5–11', title: 'Responsible AI & Governance', learn: 'Responsible AI, organizational governance, confidentiality, verification, accountability, and incident reporting.', build: 'Add a Responsible AI Policy Builder to the dashboard.', test: 'Review policy clarity, coverage, human checkpoints, and incident paths.', manage: 'Assign policy responsibilities and apply NIST Govern, Map, Measure, Manage.', present: 'Defend an organizational AI policy and branch documentation.', output: 'Responsible AI Policy + branch activity', studentQuestion: 'If we use AI, how should we govern it?', studentWin: 'Create organizational safeguards for responsible AI use.', career: 'Create practical controls for AI-enabled work.', workload: '6–8 hours' },
  { week: 8, dates: 'Oct 12–18', title: 'Understand customers', learn: 'Customer research, journey mapping, segmentation, privacy, and synthetic-data limits.', build: 'Add a customer-insight board using de-identified or synthetic inputs.', test: 'Look for invented needs, weak segments, missing voices, and privacy risks.', manage: 'Define which customer conclusions require human research before action.', present: 'Share one evidence-based customer insight and one unresolved question.', output: 'Customer insight board + journey map', studentQuestion: 'Can AI help me understand customers without making them up?', studentWin: 'Use AI to organize customer evidence without treating synthetic patterns as facts.', career: 'Support marketing, service design, and customer-experience decisions.', workload: '7–9 hours' },
  { week: 9, dates: 'Oct 19–25', title: 'Support people & teams', learn: 'AI in hiring, coaching, performance, collaboration, and employee decision-making.', build: 'Add a team-support workflow with explicit human review and fairness checks.', test: 'Probe bias, inappropriate inference, privacy, and high-stakes decision boundaries.', manage: 'Separate administrative assistance from decisions about people.', present: 'Defend where AI may assist and where it must not decide.', output: 'People-management workflow + boundary memo', studentQuestion: 'Where is AI useful—and dangerous—in managing people?', studentWin: 'Design a people workflow that improves support without automating human judgment.', career: 'Manage teams and HR-related processes more responsibly.', workload: '7–9 hours' },
  { week: 10, dates: 'Oct 26–Nov 1', title: 'AI and Plagiarism', learn: 'Academic integrity, acceptable AI assistance, attribution, disclosure, and the difference between support and substitution.', build: 'Add an AI Use / Disclosure Log recording major AI use, prompts, AI contribution, student changes, verification, and disclosure.', test: 'Review the log for accurate attribution, unsupported claims, copied language, and missing verification.', manage: 'Set clear boundaries for AI use and keep the student accountable for the submitted work.', present: 'Explain how AI assisted the work, what you changed, and how you verified the final result.', output: 'AI Use / Disclosure Log + integrity reflection', studentQuestion: 'How can I use AI helpfully without submitting work that is not my own?', studentWin: 'Use AI transparently, verify the result, and show where my own judgment shaped the final work.', career: 'Build trustworthy documentation and attribution habits for AI-assisted work.', workload: '6–8 hours' },
  { week: 11, dates: 'Nov 2–8', title: 'Christian Perspective on AI', learn: 'Competitive analysis, strategic options, assumptions, and second-order effects.', build: 'Add a strategy canvas comparing three plausible choices.', test: 'Challenge source quality, hidden assumptions, and missing alternatives.', manage: 'Clarify who recommends, who decides, and who monitors results.', present: 'Defend one strategic option and explain why the others were rejected.', output: 'Strategy canvas + decision memo', studentQuestion: 'Can AI help with strategy without choosing for me?', studentWin: 'Use AI to widen strategic options while retaining managerial accountability.', career: 'Prepare structured options for executive decision-making.', workload: '7–9 hours' },
  { week: 12, dates: 'Nov 9–15', title: 'AI and the Workforce', learn: 'Opportunity discovery, rapid experiments, desirability, feasibility, and viability.', build: 'Prototype one new AI-enabled service or process improvement.', test: 'Run a small experiment with success, stop, and learning criteria.', manage: 'Limit scope, time, cost, and exposure before scaling.', present: 'Show what the experiment proved, disproved, and left unknown.', output: 'Innovation prototype + experiment card', studentQuestion: 'How do I test an AI idea without overinvesting?', studentWin: 'Run a bounded experiment and learn from evidence instead of enthusiasm.', career: 'Evaluate innovation opportunities before committing resources.', workload: '8–10 hours' },
  { week: 13, dates: 'Nov 16–22', title: 'Measure value', learn: 'Business cases, adoption metrics, quality measures, costs, benefits, and unintended effects.', build: 'Add a value scorecard for one feature in the course system.', test: 'Check baselines, measurement gaps, double-counted benefits, and hidden costs.', manage: 'Assign metric owners and a schedule for reviewing results.', present: 'Recommend continue, revise, or stop based on the scorecard.', output: 'AI value scorecard + investment recommendation', studentQuestion: 'How do I prove the AI work is actually valuable?', studentWin: 'Connect an AI feature to measurable outcomes, costs, and risks.', career: 'Build a credible business case and monitor realized value.', workload: '7–9 hours' },
  { week: 14, dates: 'Nov 23–29', title: 'Lead adoption', learn: 'Stakeholder analysis, change readiness, training, resistance, and responsible rollout.', build: 'Add an adoption plan with stakeholder, training, and communication actions.', test: 'Pilot instructions with a novice and document where adoption fails.', manage: 'Set rollout stages, support owners, feedback loops, and stop conditions.', present: 'Propose a phased implementation plan and respond to stakeholder concerns.', output: 'Adoption plan + novice pilot findings', studentQuestion: 'What if a good tool fails because people will not use it?', studentWin: 'Plan adoption around real people, support needs, and feedback—not just technology.', career: 'Lead organizational change and technology implementation.', workload: '6–8 hours' },
  { week: 15, dates: 'Nov 30–Dec 6', title: 'Integrate & defend', learn: 'How to evaluate emerging capabilities and continue learning after the course.', build: 'Integrate the final control center and portfolio of connected work.', test: 'Run end-to-end acceptance tests and confirm all prior functions work.', manage: 'Decide whether, where, and under what controls to deploy.', present: 'Defend the product, process, revisions, team management, and trust limits.', output: 'Final system + evolution portfolio + defense', studentQuestion: 'Can I explain and defend what my team built?', studentWin: 'Demonstrate an integrated system, my contribution, its limits, and a responsible deployment decision.', career: 'Present work to a manager, client, or review committee.', workload: '8–10 hours' },
];

const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'home', label: 'Course Home', icon: '⌂' },
  { id: 'content', label: 'Course Content', icon: '▤' },
  { id: 'assignments', label: 'Assignments', icon: '✓' },
  { id: 'discussions', label: 'Discussions', icon: '◫' },
  { id: 'grades', label: 'My Grades', icon: '▥' },
  { id: 'messages', label: 'Messages & Help', icon: '✉' },
  { id: 'toolkit', label: 'AI Toolkit', icon: '✦' },
  { id: 'syllabus', label: 'Syllabus', icon: '📋' },
];

const verificationItems = [
  'A credible source directly supports the claim',
  'The source is current enough for this decision',
  'Numbers, formulas, and sample outputs were checked',
  'Bias, alternatives, and uncertainty were considered',
  'Privacy, security, and confidentiality were reviewed',
  'A human remains accountable for the final decision',
];

const toolkitStarters = [
  { id: 'research', label: 'Research a question', description: 'Turn a broad topic into an evidence-backed brief.', goal: 'Create a verified research brief about a management question', context: 'I am researching a question for a business audience. Help me separate claims that need evidence from ideas that need exploration.', constraints: 'Use credible, current sources. Flag uncertainty and do not invent citations. Do not include confidential or personal information.', success: 'Every important claim has a source I can open and check, with assumptions and open questions called out.' },
  { id: 'decision', label: 'Prepare a decision', description: 'Compare options without handing over judgment.', goal: 'Prepare a decision memo with clear options and tradeoffs', context: 'I need to help a manager choose among realistic options. Organize the decision, surface missing information, and show what each option would require.', constraints: 'Distinguish facts, assumptions, and recommendations. Show risks and alternatives. A human makes the final decision.', success: 'A manager can compare the options, understand the tradeoffs, and see what evidence would change the recommendation.' },
  { id: 'workflow', label: 'Improve a workflow', description: 'Find a useful, bounded place for AI assistance.', goal: 'Improve a repeatable management workflow with responsible AI assistance', context: 'Describe the current steps, who owns them, where time is lost, and what a better handoff could look like.', constraints: 'Keep a human checkpoint for consequential decisions. Exclude private data, credentials, and information I do not have permission to share.', success: 'The proposed workflow has an owner, a measurable improvement, failure handling, and a clear stop condition.' },
  { id: 'brief', label: 'Draft a briefing', description: 'Shape a clear message for a real audience.', goal: 'Draft a concise management briefing for a specific audience', context: 'Help me organize the situation, recommendation, supporting evidence, and the action I am asking the audience to take.', constraints: 'Preserve my judgment and voice. Do not add unsupported claims. Make AI assistance easy to disclose and review.', success: 'The audience can understand the recommendation, why it matters, and what decision or action comes next.' },
];

const gradeItems = [
  { name: 'Progressive dashboard & weekly builds', weight: 42, status: 'In progress' },
  { name: 'Final integrated portfolio', weight: 18, status: 'Not started' },
  { name: 'Team management & accountability', weight: 15, status: 'In progress' },
  { name: 'Management reviews & demonstrations', weight: 10, status: 'Upcoming' },
  { name: 'Individual AI judgment checks', weight: 10, status: 'Upcoming' },
  { name: 'Peer product review & revision', weight: 5, status: 'Upcoming' },
];

const faqItems = [
  { question: 'Do I need coding experience for this course?', answer: 'No. You will learn to frame management problems, work with AI tools, build prototypes, test results, and explain your decisions. Curiosity and careful judgment matter more than prior coding experience.' },
  { question: 'What AI use is allowed on graded work?', answer: 'AI may support brainstorming, research organization, drafting, analysis, prototyping, and revision when the assignment permits it. You must still verify the work, follow disclosure requirements, and be able to explain and defend everything you submit.' },
  { question: 'What information should I never enter into an AI tool?', answer: 'Never enter FERPA-protected student records, confidential or proprietary information, passwords, credentials, API keys, private personnel data, or any information you do not have permission to share.' },
  { question: 'How is individual work recognized in a team project?', answer: 'Weekly contribution records, demonstrations, judgment checks, and peer review show each student’s work over time. Your grade is not based only on the final team presentation.' },
  { question: 'Where do I find each week’s work?', answer: 'Open Course Content for the 15 weekly modules. Use Assignments for current tasks and the full semester roadmap. Each week identifies the expected workload, deliverable, career connection, and five learning steps.' },
  { question: 'How does course search work?', answer: 'Type a week, topic, assignment, or course tool in the search field. Select a result to open the matching module, assignment area, gradebook, help page, or AI toolkit.' },
  { question: 'What should I do when I am stuck?', answer: 'Name the smallest specific blocker, record what you already tried, and ask for help early. Messages & Help provides templates for instruction questions, technical blockers, and private team check-ins.' },
];

function formatDate(value: string) {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>('home');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Course build');
  const [due, setDue] = useState('2026-08-31');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [checks, setChecks] = useState<boolean[]>(verificationItems.map(() => false));
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedStarter, setSelectedStarter] = useState('');
  const [copied, setCopied] = useState(false);
  const [studentPulse, setStudentPulse] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleSteps, setModuleSteps] = useState<Record<string, boolean>>({});
  const [draftOpen, setDraftOpen] = useState(false);
  const [discussionDraft, setDiscussionDraft] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [helpMode, setHelpMode] = useState<HelpMode | null>(null);
  const [helpDraft, setHelpDraft] = useState('');
  const [helpCopied, setHelpCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [hydrated, setHydrated] = useState(false);
  const [ethicsAssessment, setEthicsAssessment] = useState<EthicsAssessment>(initialEthicsAssessment);
  const [policyDraft, setPolicyDraft] = useState<PolicyDraft>(initialPolicyDraft);
  const [saveNotice, setSaveNotice] = useState('');
  const [ethicsCase, setEthicsCase] = useState('');
  const [privacyChoices, setPrivacyChoices] = useState<Record<string, string>>({});
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, string>>({});
  const [governanceAnswers, setGovernanceAnswers] = useState<GovernanceAnswers>({});

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const savedTasks = window.localStorage.getItem('aim-dashboard-tasks-v1');
      const savedChecks = window.localStorage.getItem('aim-dashboard-checks-v1');
      const savedSteps = window.localStorage.getItem('aim-module-steps-v1');
      const savedDiscussion = window.localStorage.getItem('aim-discussion-draft-v1');
      const savedEthics = window.localStorage.getItem('aiManagers_week6_ethicsChecker');
      const savedPolicy = window.localStorage.getItem('aiManagers_week7_responsiblePolicy');
      const savedEthicsActivities = window.localStorage.getItem('aiManagers_week6_activities');
      const savedGovernanceActivities = window.localStorage.getItem('aiManagers_week7_activities');
      if (savedTasks) {
        try { setTasks(JSON.parse(savedTasks)); } catch { /* use course defaults */ }
      }
      if (savedChecks) {
        try { setChecks(JSON.parse(savedChecks)); } catch { /* keep checklist blank */ }
      }
      if (savedSteps) {
        try { setModuleSteps(JSON.parse(savedSteps)); } catch { /* keep module steps open */ }
      }
      if (savedDiscussion) setDiscussionDraft(savedDiscussion);
      if (savedEthics) { try { setEthicsAssessment({ ...initialEthicsAssessment, ...JSON.parse(savedEthics) }); } catch { /* use blank assessment */ } }
      if (savedPolicy) { try { setPolicyDraft({ ...initialPolicyDraft, ...JSON.parse(savedPolicy) }); } catch { /* use blank policy */ } }
      if (savedEthicsActivities) { try { const saved = JSON.parse(savedEthicsActivities); setEthicsCase(saved.ethicsCase || ''); setPrivacyChoices(saved.privacyChoices || {}); setKnowledgeAnswers(saved.knowledgeAnswers || {}); } catch { /* use blank activities */ } }
      if (savedGovernanceActivities) { try { setGovernanceAnswers(JSON.parse(savedGovernanceActivities)); } catch { /* use blank activities */ } }
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem('aim-dashboard-tasks-v1', JSON.stringify(tasks));
    window.localStorage.setItem('aim-dashboard-checks-v1', JSON.stringify(checks));
    window.localStorage.setItem('aim-module-steps-v1', JSON.stringify(moduleSteps));
  }, [tasks, checks, moduleSteps, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem('aiManagers_week6_ethicsChecker', JSON.stringify(ethicsAssessment));
    window.localStorage.setItem('aiManagers_week7_responsiblePolicy', JSON.stringify(policyDraft));
    window.localStorage.setItem('aiManagers_week6_activities', JSON.stringify({ ethicsCase, privacyChoices, knowledgeAnswers }));
    window.localStorage.setItem('aiManagers_week7_activities', JSON.stringify(governanceAnswers));
  }, [ethicsAssessment, policyDraft, ethicsCase, privacyChoices, knowledgeAnswers, governanceAnswers, hydrated]);

  useEffect(() => {
    if (!faqOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setFaqOpen(false);
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [faqOpen]);

  const focusTasks = useMemo(() => [...tasks].sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? 1 : -1;
    const rank = { High: 3, Medium: 2, Low: 1 };
    return rank[b.priority] - rank[a.priority] || a.due.localeCompare(b.due);
  }), [tasks]);

  const activeWeek = weeklyPlan[selectedWeek - 1];
  const completedPercent = tasks.length ? Math.round(tasks.filter((task) => task.complete).length / tasks.length * 100) : 0;
  const checkPercent = Math.round(checks.filter(Boolean).length / checks.length * 100);
  const pageTitle = navItems.find((item) => item.id === activeView)?.label ?? 'Course Home';
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearch ? [
    ...navItems.filter((item) => item.label.toLowerCase().includes(normalizedSearch)).map((item) => ({ id: `view-${item.id}`, label: item.label, detail: 'Course area', view: item.id as View })),
    ...weeklyPlan.filter((week) => `${week.title} ${week.learn} ${week.output}`.toLowerCase().includes(normalizedSearch)).map((week) => ({ id: `week-${week.week}`, label: `Week ${week.week}: ${week.title}`, detail: week.output, view: 'content' as View, week: week.week })),
    ...tasks.filter((task) => `${task.title} ${task.category}`.toLowerCase().includes(normalizedSearch)).map((task) => ({ id: `task-${task.id}`, label: task.title, detail: `${task.category} · Due ${formatDate(task.due)}`, view: 'assignments' as View })),
  ].slice(0, 8) : [];
  const completedModuleSteps = ['Learn', 'Create', 'Test', 'Manage', 'Present'].filter((label) => moduleSteps[`${selectedWeek}-${label}`]).length;
  const aiBrief = `Goal: ${goal || '[state the outcome]'}\n\nContext: ${context || '[add audience, situation, inputs, and background]'}\n\nConstraints: ${constraints || '[add limits, privacy rules, time, and format]'}\n\nSuccess looks like: ${success || '[define an observable standard]'}\n\nAsk focused questions before proposing a solution. Help me work in small steps, test the result, identify risks, and improve it. Distinguish facts, assumptions, and recommendations. I remain responsible for the final decision.`;

  const selectOptions: Record<string, string[]> = {
    personalData: ['No', 'Possibly', 'Yes'], disadvantage: ['Low possibility', 'Moderate possibility', 'High possibility', 'Unknown'], harm: ['Low', 'Moderate', 'High'], humanReview: ['Yes', 'No', 'Not currently'], explainability: ['Yes', 'Partially', 'No', 'Unknown'], challenge: ['Yes', 'No', 'Unknown'], dataFit: ['Yes', 'No', 'Uncertain'], accountable: ['Yes', 'No'], risk: ['LOW', 'MODERATE', 'HIGH'], recommendation: ['Approve', 'Approve with safeguards', 'Escalate for human review', 'Reject'],
  };

  const ethicsField = (field: Exclude<keyof EthicsAssessment, 'complete' | 'categoryRisks' | 'caseDecision' | 'caseRationale' | 'reflection' | 'connectSafeguards'>, label: string) => field === 'useCase' || field === 'rationale' ? <label key={field}>{label}{field === 'useCase' ? <input value={ethicsAssessment[field]} onChange={(event) => updateEthics(field, event.target.value)} placeholder="Describe the business use case" /> : <textarea value={ethicsAssessment[field]} onChange={(event) => updateEthics(field, event.target.value)} placeholder="Explain your decision and safeguards" />}</label> : <label key={field}>{label}<select value={ethicsAssessment[field]} onChange={(event) => updateEthics(field, event.target.value)}><option value="">Select one</option>{selectOptions[field].map((option) => <option key={option}>{option}</option>)}</select></label>;

  const renderEthicsModule = () => <>
    <section className="lmsPanel moduleLesson"><div className="panelBar"><h3>Overview</h3><span>Should we use AI for this?</span></div><p>AI can make business processes faster, but efficiency does not automatically make an application ethical. Managers must evaluate fairness, privacy, transparency, explainability, security, and meaningful human oversight.</p><p><strong>Why this matters:</strong> Ethical evaluation helps managers make defensible decisions before an AI system affects people.</p></section>
    <section className="lmsPanel bridgePanel"><div className="panelBar"><h3>Week 6 → Week 7</h3><span>Understand · Apply · Analyze · Decide · Create · Test · Reflect</span></div><div className="bridgeFlow"><article><strong>ETHICAL EVALUATION</strong><span>What could go wrong?</span><b>AI Ethics Checker</b></article><i>↓</i><article><strong>GOVERNANCE</strong><span>What will our organization do about it?</span><b>Responsible AI Policy</b></article><i>↓</i><article><strong>MANAGEMENT CAPABILITY</strong><span>Responsible AI decision-making</span></article></div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Why AI Ethics Matters to Managers</h3><span>Learn</span></div><p>AI can automate tasks, analyze information, generate content, identify patterns, support decisions, personalize experiences, and increase productivity. It can also introduce discrimination, privacy, misinformation, security, unfair decisions, loss of human agency, opacity, inappropriate automation, and accountability gaps.</p><div className="fourQuestions"><article><strong>TECHNICAL</strong><span>Can the AI perform the task?</span></article><article><strong>MANAGEMENT</strong><span>Should the organization use AI for it?</span></article><article><strong>ETHICAL</strong><span>What consequences could this create for people?</span></article><article><strong>GOVERNANCE</strong><span>What safeguards should be required?</span></article></div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Learning Objectives</h3></div><ol>{['Define ethics, bias, fairness, privacy, transparency, explainability, and accountability.', 'Identify ethical risks and explain how data or design can create unfair outcomes.', 'Evaluate privacy, transparency, and human-oversight concerns.', 'Assign a simple risk rating and defend a management recommendation.'].map((item) => <li key={item}>{item}</li>)}</ol></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Ethics, Law, Compliance, and Risk</h3><span>Learn the distinction</span></div><p>These questions overlap, but they are not interchangeable. A manager should know which question is being answered before deciding that a use is acceptable.</p><div className="comparisonTable">{ethicsComparison.map(([term, question, example]) => <article key={term}><strong>{term}</strong><span>{question}</span><p>{example}</p></article>)}</div><div className="lessonCallout"><strong>Manager checkpoint</strong><span>A use can be legal and still unethical, compliant and still risky, or ethical in principle and still require a formal review.</span></div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Key Terms</h3></div><div className="termGrid">{ethicsTerms.map(([term, definition]) => <article key={term}><strong>{term}</strong><p>{definition}</p></article>)}</div></section>
    <section className="lessonDeck">{ethicsLessons.map(([title, lesson, activity]) => <article className="lmsPanel lessonCard" key={title}><div className="panelBar"><h3>{title}</h3><span>Learn · Try · Apply</span></div><p>{lesson}</p><div className="activityCallout"><strong>{activity.split(':')[0]}</strong><span>{activity.substring(activity.indexOf(':') + 1)}</span><button type="button" onClick={() => markActivityComplete(title.split(' · ')[0].toLowerCase().replace('lesson ', ''))}>Mark activity complete</button></div></article>)}</section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Bias and Fairness: Diagnose the Entry Point</h3><span>See it · Try it</span></div><p>Bias can enter through historical data, representation, measurement, design, or deployment context. These categories can overlap, and no single fairness metric resolves every management judgment.</p><div className="biasGrid">{biasExamples.map(([kind, scenario, source, feedback]) => <article key={kind}><strong>{kind}</strong><p>{scenario}</p><span>Likely entry point: {source}</span><small>{feedback}</small></article>)}</div><div className="lessonCallout"><strong>Accuracy is not fairness</strong><span>An overall accuracy number can hide systematically worse outcomes for a group. Ask who benefits, who bears errors, and what evidence would reveal unequal impact.</span></div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Can I Put This Into AI?</h3><span>Privacy and data activity</span></div><p>Classify each example based on organizational policy and authorization. These are educational prompts, not legal advice. Feedback explains the typical management response; local rules and policy may differ.</p><div className="privacyGrid">{privacyExamples.map(([item, expected, reason]) => <label key={item}>{item}<select value={privacyChoices[item] || ''} onChange={(event) => setPrivacyChoices((current) => ({ ...current, [item]: event.target.value }))}><option value="">Choose</option><option>SAFE TO USE</option><option>USE CAUTION / VERIFY POLICY</option><option>DO NOT ENTER</option></select><small>{privacyChoices[item] ? `${privacyChoices[item] === expected ? 'Good judgment. ' : 'Reconsider. '}${reason}` : 'Choose a classification to reveal the reasoning.'}</small></label>)}</div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Ethical Decision Lab</h3><span>Analyze · Decide</span></div><p>For each case, record the benefit, affected people, possible harm, data involved, oversight needed, risk, approval decision, and safeguard. Your responses persist on this device.</p><div className="caseTabs">{ethicsLabCases.map(([id, title, description]) => <article key={id}><strong>CASE {id}: {title}</strong><p>{description}</p><textarea value={ethicsAssessment.categoryRisks[`lab-${id}`] || ''} onChange={(event) => updateEthicsCategory(`lab-${id}`, event.target.value)} placeholder="Benefit; stakeholders; harm; data; oversight; risk; decision; safeguard" /></article>)}</div></section>
    <section className="lmsPanel caseStudy"><div className="panelBar"><h3>The AI Hiring Shortcut</h3><span>15–20 minute case</span></div><p><strong>Background:</strong> BrightPath Manufacturing receives 4,000 applications annually and has six recruiters. <strong>Company goal:</strong> reduce recruiting cost by approximately $250,000. <strong>AI system:</strong> HireSmart scores résumés from 1–100 and claims speed, consistency, and reduced bias.</p><p><strong>Data used:</strong> historical employee data from a workforce that was not demographically representative. <strong>Benefits:</strong> faster screening and more consistent prioritization. <strong>Concerns:</strong> unclear factors, automatic rejection below 60, outside-vendor processing of personal information, and possible historical bias. <strong>Stakeholders:</strong> applicants, recruiters, managers, current employees, the vendor, and the organization’s leadership.</p><fieldset><legend>Should BrightPath implement HireSmart?</legend>{['Approve', 'Approve with safeguards', 'Delay implementation pending further testing', 'Reject the system'].map((choice) => <label className="choiceLabel" key={choice}><input type="radio" name="brightpath" checked={ethicsAssessment.caseDecision === choice} onChange={() => updateEthics('caseDecision', choice)} />{choice}</label>)}</fieldset><textarea value={ethicsAssessment.caseRationale} onChange={(event) => updateEthics('caseRationale', event.target.value)} placeholder="Weigh business benefit, risks, stakeholders, safeguards, and what evidence you still need." /><p className="smallNote">There is no automatically correct answer. Quality of ethical reasoning matters.</p></section>
    <section className="lmsPanel buildPanel"><div className="panelBar"><h3>AI Ethics Checker</h3><span>{ethicsAssessment.complete ? 'Complete' : 'In progress'}</span></div><p>Use this educational decision-support tool, not a legal classification system. Save your assessment before leaving the module.</p><div className="assessmentFields">{ethicsField('useCase', '1. What is the AI being used for?')}{ethicsField('personalData', '2. Personal or sensitive information?')}{ethicsField('disadvantage', '3. Could it disadvantage a person or group?')}{ethicsField('harm', '4. Could an incorrect decision cause significant harm?')}{ethicsField('humanReview', '5. Can a human review the recommendation?')}{ethicsField('explainability', '6. Can the organization explain the result?')}{ethicsField('challenge', '7. Can the decision be challenged or overturned?')}{ethicsField('dataFit', '8. Is the data appropriate for the purpose?')}{ethicsField('accountable', '9. Does the organization know who is accountable?')}{ethicsField('risk', '10. Overall risk rating')}{ethicsField('recommendation', '11. Management recommendation')}{ethicsField('rationale', '12. Explain your decision.')}</div><div className="formActions"><button type="button" onClick={() => saveBuild('ethics')}>{saveNotice || 'Save as draft'}</button><button type="button" onClick={resetEthics}>Reset</button><button className="primaryAction" type="button" onClick={() => markBuildComplete('ethics')}>Submit / mark complete</button></div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>BUSI 610 Educational Risk Assessment</h3><span>Not an official NIST scoring formula</span></div><p>Rate each category LOW, MEDIUM, HIGH, or UNKNOWN. The summary helps you reason about risk; it does not classify an AI system legally.</p><div className="riskAssessmentGrid">{ethicsRiskCategories.map((category) => <label key={category}>{category}<select value={ethicsAssessment.categoryRisks[category] || ''} onChange={(event) => updateEthicsCategory(category, event.target.value)}><option value="">Choose</option><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>UNKNOWN</option></select></label>)}</div><p className="readinessLine"><strong>Overall risk summary:</strong> {Object.values(ethicsAssessment.categoryRisks).filter((value) => value === 'HIGH').length >= 2 ? 'Multiple high-risk categories require safeguards and escalation.' : Object.values(ethicsAssessment.categoryRisks).filter(Boolean).length >= 5 ? 'Context is developing; document unknowns before deciding.' : 'Complete the categories to identify the risk pattern.'}</p></section>
    <section className="lmsPanel riskGuide"><div className="panelBar"><h3>Risk guide</h3></div><div className="riskGrid"><div><strong>LOW</strong><p>Limited data, low harm, easy review and correction. Example: marketing slogan ideas.</p></div><div><strong>MODERATE</strong><p>Meaningful decisions or employee/customer data requiring human review. Example: retention-offer recommendations.</p></div><div><strong>HIGH</strong><p>Employment, termination, major financial, health/safety, sensitive-data, or poorly supervised decisions.</p></div></div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Human Oversight Risk Spectrum</h3><span>Apply proportional review</span></div><p>Human-in-the-loop means review before a consequential decision. Human-on-the-loop means active supervision and intervention. Human-in-command means people retain ultimate authority over the system and its use.</p><div className="oversightGrid">{oversightScenarios.map(([scenario, level, reason]) => <article key={scenario}><strong>{scenario}</strong><span>{level}</span><p>{reason}</p></article>)}</div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Verify Before You Trust</h3><span>Hallucinations and reliability</span></div><p>Fluent language does not prove accuracy. For each claim, find the source, check the date and numbers, compare evidence where appropriate, test whether the evidence supports the conclusion, and document uncertainty.</p><div className="verificationGrid">{verificationClaims.map(([claim, check]) => <article key={claim}><strong>{claim}</strong><p>{check}</p></article>)}</div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Stakeholder Impact Map</h3><span>Apply it</span></div><p>For BrightPath&apos;s hiring system, name benefits and risks for applicants, recruiters, managers, current employees, the vendor, leadership, and the community. One stakeholder&apos;s efficiency gain can become another stakeholder&apos;s burden.</p><textarea value={ethicsAssessment.categoryRisks.stakeholders || ''} onChange={(event) => updateEthicsCategory('stakeholders', event.target.value)} placeholder="Stakeholder; benefit; possible harm; voice or remedy; safeguard" /></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>The 8-Step AI Ethics Test</h3><span>Use it before approval</span></div><ol>{['Purpose: what are we trying to accomplish?', 'People: who is affected?', 'Data: what information is used and are we authorized?', 'Impact: what could go right or wrong?', 'Transparency: who needs to know how AI is involved?', 'Oversight: who reviews and can intervene?', 'Accountability: who owns the outcome?', 'Verification: how do we know the output is reliable enough?'].map((item) => <li key={item}>{item}</li>)}</ol><p className="smallNote">This is an instructional BUSI 610 framework, not a regulatory test, legal determination, or professional risk assessment.</p></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Your Dashboard Build</h3></div><ol><li>Add an AI Ethics Checker with the ten risk questions, risk rating, recommendations, and rationale.</li><li>Test it with BrightPath, review the result, and save the completed component.</li><li>Verify it remains available when you return to the dashboard.</li></ol><h4>Model example</h4><p><strong>High risk, approve with safeguards:</strong> Hiring affects employment opportunities; historical data may contain bias; automatic rejection removes meaningful review; personal data creates privacy concerns; explainability is limited. Testing and human oversight should precede deployment. Other recommendations are defensible when well reasoned.</p></section>
    <section className="lmsPanel discussionGuide"><div className="panelBar"><h3>Discussion 3: When Does Using AI Become Unethical?</h3><span>20 points</span></div><p>Choose hiring, employee monitoring, customer analysis, performance evaluation, marketing, or financial decision-making. Explain the use, one benefit, two ethical risks, whether you would allow it, and one required safeguard. Use your Ethics Checker.</p><ul><li>AI application identified: 3</li><li>Ethical risks: 5</li><li>Ethical reasoning: 5</li><li>Use of Ethics Checker: 3</li><li>Defensible recommendation: 2</li><li>Professional writing: 2</li></ul></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Knowledge Check · Feedback Included</h3><span>{Object.keys(knowledgeAnswers).length} of {knowledgeCheckQuestions.length} answered</span></div>{knowledgeCheckQuestions.map(([question, options, feedback], index) => <fieldset className="knowledgeItem" key={question}><legend>{index + 1}. {question}</legend>{options.map((option) => <label className="choiceLabel" key={option}><input type="radio" name={`knowledge-${index}`} checked={knowledgeAnswers[index] === option} onChange={() => setKnowledgeAnswers((current) => ({ ...current, [index]: option }))} />{option}</label>)}{knowledgeAnswers[index] && <p className={knowledgeAnswers[index] === (index === 0 ? options[1] : index === 1 ? options[1] : index === 2 ? options[1] : index === 3 ? options[2] : index === 4 ? options[1] : index === 5 ? options[2] : index === 6 ? options[1] : index === 7 ? options[1] : index === 8 ? options[0] : options[1]) ? 'feedbackCorrect' : 'feedback'}>{knowledgeAnswers[index] === (index === 0 ? options[1] : index === 1 ? options[1] : index === 2 ? options[1] : index === 3 ? options[2] : index === 4 ? options[1] : index === 5 ? options[2] : index === 6 ? options[1] : index === 7 ? options[1] : index === 8 ? options[0] : options[1]) ? 'Correct. ' : 'Review. '}{feedback}</p>}</fieldset>)}</section>
    <section className="lmsPanel reflectionPanel"><div className="panelBar"><h3>Reflection</h3><span>150–200 words</span></div><p>Which AI use case would you personally be most uncomfortable approving as a manager, and why?</p><textarea value={ethicsAssessment.reflection} onChange={(event) => updateEthics('reflection', event.target.value)} placeholder="Connect your response to risk, stakeholders, oversight, and accountability." /></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Test 1 · Week 6–7 Study Guide and Answer Key</h3><span>8 questions added</span></div><p>Review AI ethics, algorithmic bias, fairness, privacy, transparency, explainability, human oversight, responsible AI, governance, confidentiality, verification, accountability, incident reporting, NIST Govern/Map/Measure/Manage, branches, testing, review, and merge.</p><ol>{assessmentQuestions.map(([question, answer]) => <li key={question}><strong>{question}</strong><span className="answerKey">Answer: {answer}</span></li>)}</ol></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Submission, Reflection, and Workload</h3><span>6–8 hours</span></div><div className="workloadGrid"><p><strong>Lessons and activities:</strong> 1.5–2 hours</p><p><strong>BrightPath case:</strong> 45–60 minutes</p><p><strong>Ethics Checker build:</strong> 2–3 hours</p><p><strong>Discussion 3:</strong> 45–60 minutes</p><p><strong>Knowledge check/reflection:</strong> 30–45 minutes</p></div><p><strong>Definition of done:</strong> risk questions work; users can select answers; risk rating, recommendation, rationale, persistence, reset, case testing, and verification all work.</p><p><strong>Submit:</strong> completed Ethics Checker, BrightPath assessment, risk rating, management recommendation, written rationale, Discussion 3, knowledge check, and reflection.</p><div className="alignmentTable"><p><strong>Identify ethical risks</strong> → Ethics lessons → Ethics Checker → Knowledge Check</p><p><strong>Evaluate AI use</strong> → BrightPath Case → Risk Assessment → Discussion 3</p></div></section>
    <section className="lmsPanel resourcesPanel"><div className="panelBar"><h3>Resources</h3><span>Authoritative guidance</span></div><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST AI Risk Management Framework 1.0</a><a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/" target="_blank" rel="noreferrer">NIST AI RMF Core</a><a href="https://www.oecd.org/en/topics/ai-principles.html" target="_blank" rel="noreferrer">OECD AI Principles</a><a href="https://www.unesco.org/en/articles/ai-competency-framework-students" target="_blank" rel="noreferrer">UNESCO AI Competency Framework for Students</a></section>
  </>;

  const policyField = (field: PolicyEditableKey, label: string, placeholder: string) => <label key={field}>{label}{field === 'organization' || field === 'reviewSchedule' ? <input value={String(policyDraft[field])} onChange={(event) => updatePolicy(field, event.target.value)} placeholder={placeholder} /> : <textarea value={String(policyDraft[field])} onChange={(event) => updatePolicy(field, event.target.value)} placeholder={placeholder} />}</label>;

  const renderGovernanceModule = () => <>
    <section className="lmsPanel moduleLesson"><div className="panelBar"><h3>Overview</h3><span>How should AI be governed?</span></div><p>Week 6 identified ethical risks. Week 7 turns those principles into policies, responsibilities, safeguards, and governance practices. Students create a basic organizational AI policy for their dashboard.</p></section>
    <section className="lmsPanel bridgePanel"><div className="panelBar"><h3>Week 7 Outcome</h3><span>Make responsible AI repeatable</span></div><p>Week 6 asked, “Is this AI use responsible?” Week 7 asks, “How does an organization make responsible AI repeatable?” Your policy should become an artifact an organization could review, customize, and improve.</p></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Learning Objectives</h3></div><ol>{['Define responsible AI and AI governance.', 'Identify approved and prohibited uses and rules for sensitive information.', 'Establish human review, verification, accountability, and incident reporting.', 'Apply the NIST Govern, Map, Measure, Manage functions as instructional guidance.'].map((item) => <li key={item}>{item}</li>)}</ol></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Responsible AI Is an Organizational Practice</h3><span>Learn</span></div><p>Responsible AI, trustworthy AI, human-centered AI, ethical AI, and risk-aware AI overlap, but none is a marketing slogan or a substitute for evidence. A responsible system needs validity and reliability, safety, security and resilience, accountability and transparency, explainability, privacy enhancement, and fairness with harmful bias managed.</p><div className="fourQuestions"><article><strong>PEOPLE</strong><span>Who owns the use, decision, monitoring, and stop authority?</span></article><article><strong>POLICIES</strong><span>What is allowed, prohibited, or subject to additional review?</span></article><article><strong>CONTROLS</strong><span>What prevents, detects, or corrects harm?</span></article><article><strong>EVIDENCE</strong><span>What documentation shows the control works over time?</span></article></div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Key Terms</h3></div><div className="termGrid">{governanceTerms.map(([term, definition]) => <article key={term}><strong>{term}</strong><p>{definition}</p></article>)}</div></section>
    <section className="lessonDeck governanceDeck">{governanceLessons.map(([title, lesson]) => <article className="lmsPanel lessonCard" key={title}><div className="panelBar"><h3>{title}</h3><span>Learn · Apply</span></div><p>{lesson}</p><button type="button" onClick={() => markActivityComplete(title.split(' · ')[0].toLowerCase().replace('lesson ', ''))}>Mark activity complete</button></article>)}</section>
    <section className="nistPanel"><p>NIST AI RISK MANAGEMENT</p><div><article><strong>GOVERN</strong><span>Who is responsible?</span></article><i>↓</i><article><strong>MAP</strong><span>What could go wrong?</span></article><i>↓</i><article><strong>MEASURE</strong><span>How serious is the risk?</span></article><i>↓</i><article><strong>MANAGE</strong><span>What safeguards should be used?</span></article></div><small>This is an instructional simplification of the NIST AI RMF Core, not an official checklist. NIST describes GOVERN as cross-cutting, with risk management continuing throughout the AI lifecycle.</small></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Policy, Procedure, Standard, Guideline</h3><span>Governance vocabulary</span></div><div className="comparisonTable"><article><strong>Policy</strong><span>What the organization requires.</span><p>AI use must be disclosed when it materially shapes customer communication.</p></article><article><strong>Procedure</strong><span>How a person performs the task.</span><p>Reviewer checks source, date, calculation, and customer-specific details.</p></article><article><strong>Standard</strong><span>The specific expected control.</span><p>High-risk outputs require two-person review before action.</p></article><article><strong>Guideline</strong><span>Recommended practice.</span><p>Prefer de-identified examples when a real dataset is unnecessary.</p></article></div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Governance Roles and AI Use Case Map</h3><span>GOVERN · MAP</span></div><p>For Palmetto Retail Group, a 500-person company using AI for marketing, customer service, HR, forecasting, and productivity, assign owners and establish context.</p><div className="governanceGrid">{['Executive sponsor', 'AI owner', 'Business owner', 'IT / security', 'Legal / compliance', 'End users', 'Risk manager'].map((role) => <label key={role}>{role}<input value={String(governanceAnswers[role] || '')} onChange={(event) => setGovernanceAnswers((current) => ({ ...current, [role]: event.target.value }))} placeholder="Name or responsibility" /></label>)}<label className="fullField">What problem are we solving, who is affected, what data is involved, and what could go wrong?<textarea value={String(governanceAnswers.context || '')} onChange={(event) => setGovernanceAnswers((current) => ({ ...current, context: event.target.value }))} /></label></div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Before You Deploy · MEASURE</h3><span>Readiness decision</span></div><p>Testing once is not necessarily enough. Data, users, contexts, vendors, models, and organizational goals can change after deployment.</p><div className="checklistGrid">{['Has the purpose and intended use been documented?', 'Has data quality and provenance been evaluated?', 'Has performance been tested for relevant groups?', 'Have privacy and security risks been reviewed?', 'Has human oversight and override authority been established?', 'Are limitations and assumptions documented?', 'Is there an incident and monitoring plan?', 'Do we know what evidence would stop deployment?'].map((item) => <label key={item}><input type="checkbox" checked={Boolean(governanceAnswers[`measure-${item}`])} onChange={() => setGovernanceAnswers((current) => ({ ...current, [`measure-${item}`]: !current[`measure-${item}`] }))} />{item}</label>)}</div><div className="choiceRow">{['READY', 'NEEDS SAFEGUARDS / TESTING', 'NOT READY'].map((choice) => <button className={governanceAnswers.readiness === choice ? 'selected' : ''} type="button" onClick={() => setGovernanceAnswers((current) => ({ ...current, readiness: choice }))} key={choice}>{choice}</button>)}</div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>MANAGE: Choose a Risk Treatment</h3><span>Decide and document</span></div><p>Risk treatment is not a menu of excuses. The choice should fit the severity, reversibility, evidence, authority, and organizational risk tolerance.</p><div className="decisionGrid">{governanceDecisionScenarios.map(([scenario, choice, reason]) => <article key={scenario}><strong>{scenario}</strong><span>Suggested treatment: {choice}</span><p>{reason}</p></article>)}</div></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Governance Case: The AI Pilot That Got Out of Control</h3><span>MANAGE</span></div><p>A regional company approved an AI assistant for customer emails, internal reports, sales analysis, HR questions, and financial summaries, but created no policy. Three months later, confidential data entered the tool, inaccurate information reached a customer, a manager used AI in employee evaluations, and nobody knew who monitored use.</p><p><strong>What failed?</strong> Categorize the failures under GOVERN, MAP, MEASURE, or MANAGE, then propose controls.</p><textarea value={String(governanceAnswers.case || '')} onChange={(event) => setGovernanceAnswers((current) => ({ ...current, case: event.target.value }))} placeholder="Failure category; control; owner; evidence; review date" /><div className="choiceRow">{['ACCEPT', 'REDUCE', 'TRANSFER', 'AVOID', 'ESCALATE'].map((choice) => <button className={governanceAnswers.response === choice ? 'selected' : ''} type="button" onClick={() => setGovernanceAnswers((current) => ({ ...current, response: choice }))} key={choice}>{choice}</button>)}</div></section>
    <section className="lmsPanel buildPanel"><div className="panelBar"><h3>Responsible AI Policy Builder</h3><span>{policyDraft.complete ? 'Complete' : policyDraft.organization ? 'In progress' : 'Not started'} · {policyDraft.version}</span></div><p>Create and save an organizational policy without writing code. This is an organizational artifact, not a claim of legal compliance.</p><div className="policyMeta"><label>Organization name<input value={policyDraft.organization} onChange={(event) => updatePolicy('organization', event.target.value)} placeholder="Example: Palmetto Retail Group" /></label><label>Industry<input value={policyDraft.industry} onChange={(event) => updatePolicy('industry', event.target.value)} placeholder="Retail, manufacturing, healthcare, etc." /></label><label>Policy owner<input value={policyDraft.policyOwner} onChange={(event) => updatePolicy('policyOwner', event.target.value)} placeholder="Role responsible for this policy" /></label><label>Effective date<input type="date" value={policyDraft.effectiveDate} onChange={(event) => updatePolicy('effectiveDate', event.target.value)} /></label><label>Review date<input type="date" value={policyDraft.reviewDate} onChange={(event) => updatePolicy('reviewDate', event.target.value)} /></label><label>Policy status<select value={policyDraft.status} onChange={(event) => updatePolicy('status', event.target.value)}><option>Draft</option><option>Under review</option><option>Approved for class simulation</option></select></label></div><div className="assessmentFields policyFields">{policySections.map(([field, label]) => policyField(field as PolicyEditableKey, label, 'Write a clear, organization-specific rule.'))}</div><div className="formActions"><button type="button" onClick={() => saveBuild('policy')}>{saveNotice || 'Save draft'}</button><button type="button" onClick={savePolicyVersion}>Save version</button><button type="button" onClick={resetPolicy}>Reset</button><button className="primaryAction" type="button" onClick={() => markBuildComplete('policy')}>Mark complete</button></div></section>
    <section className="lmsPanel readinessPanel"><div className="panelBar"><h3>Policy Readiness</h3><span>{Object.values(policyDraft.readinessChecks).filter(Boolean).length} of 10</span></div><p>This educational readiness check identifies important policy elements that may be missing. It is not an official compliance score and does not determine legal compliance. Obtain appropriate legal, privacy, security, compliance, or other professional review where applicable.</p><div className="checklistGrid">{['Approved uses', 'Prohibited uses', 'High-risk uses', 'Confidential information rules', 'Human review', 'Verification', 'Accountability', 'Incident reporting', 'Policy owner and review date', 'Monitoring'].map((item) => <label key={item}><input type="checkbox" checked={Boolean(policyDraft.readinessChecks[item])} onChange={() => updatePolicyReadiness(item)} />{item}</label>)}</div></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Company AI Use Policy: model</h3></div><p><strong>Purpose:</strong> Use AI productively, securely, ethically, and responsibly.</p><p><strong>Approved:</strong> Brainstorming, non-confidential drafts, summaries, ideas, approved analysis, and productivity support.</p><p><strong>Prohibited:</strong> Unauthorized confidential-data entry, deceptive content, final employment decisions without review, and high-stakes decisions without oversight.</p><p><strong>Human review and verification:</strong> A qualified employee reviews consequential output and checks facts, calculations, recommendations, citations, and compliance claims.</p><p><strong>Accountability and reporting:</strong> Employees remain responsible and report serious errors, privacy incidents, security problems, or discriminatory outcomes to the designated governance owner.</p></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>GitHub collaboration and build directions</h3></div><p><strong>Repository:</strong> project home. <strong>Branch:</strong> separate workspace. <strong>Commit:</strong> saved change with a message. <strong>Pull request:</strong> request for review. <strong>Merge:</strong> approved change incorporated into main.</p><p>Workflow: <strong>START FROM MAIN → CREATE BRANCH → MAKE CHANGES → COMMIT → PUSH → OPEN PULL REQUEST → REQUEST REVIEW → RESPOND → MERGE AFTER APPROVAL</strong></p><p>For the simulation, document branch name <strong>week7-responsible-ai</strong>, the policy change, why it was made, what was tested, reviewer feedback, and whether it is ready to merge. Advanced GitHub expertise is not required.</p><p><strong>Policy assignment rubric, 20 points:</strong> understanding 4, realistic application 4, reasoning 4, completeness 3, practical controls 3, accountability and verification 2.</p></section>
    <section className="lmsPanel activityPanel"><div className="panelBar"><h3>Connect Your Builds</h3><span>Reflect · Apply</span></div><p>Choose one high-risk use case from your Week 6 Ethics Checker. Identify at least three safeguards your Week 7 policy requires for that use case.</p><textarea value={ethicsAssessment.connectSafeguards} onChange={(event) => updateEthics('connectSafeguards', event.target.value)} placeholder="High-risk use case; safeguard 1; safeguard 2; safeguard 3; responsible owner" /></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Test 1 Study Guide and Scenario Assessment</h3><span>Weeks 1–7</span></div><p><strong>Explain:</strong> ethics, bias, privacy, human oversight, responsible AI, governance, NIST functions, policy, verification, incident response, and Git collaboration.</p><p><strong>Apply:</strong> analyze historical hiring data, classify sensitive inputs, assign accountability, choose a risk treatment, and diagnose the uncontrolled AI pilot.</p><p><strong>Build:</strong> an Ethics Checker that informs a Responsible AI Policy.</p><ol>{assessmentQuestions.map(([question, answer]) => <li key={question}><strong>{question}</strong><span className="answerKey">Answer: {answer}</span></li>)}</ol></section>
    <section className="lmsPanel reflectionPanel"><div className="panelBar"><h3>Week 7 Reflection</h3><span>150–250 words</span></div><p>You are responsible for AI governance at a 500-person organization. What is the single biggest AI governance risk you would address first, and why? Reference at least one NIST function.</p><textarea value={String(governanceAnswers.reflection || '')} onChange={(event) => setGovernanceAnswers((current) => ({ ...current, reflection: event.target.value }))} /></section>
    <section className="lmsPanel lessonGrid"><div className="panelBar"><h3>Submission Checklist and Workload</h3><span>6–8 hours</span></div><div className="workloadGrid"><p><strong>Lessons and activities:</strong> 2 hours</p><p><strong>Governance case:</strong> 45–60 minutes</p><p><strong>Policy design:</strong> 1 hour</p><p><strong>Policy Builder:</strong> 2–3 hours</p><p><strong>GitHub activity:</strong> 30–45 minutes</p><p><strong>Test, study, reflection:</strong> 45–60 minutes</p></div><p><strong>Submit:</strong> completed Responsible AI Policy, policy readiness evidence, branch activity documentation, Test 1, Week 7 checklist, Connect Your Builds response, and reflection.</p><div className="alignmentTable"><p><strong>Create governance controls</strong> → NIST lessons → Policy Builder → Policy assignment</p><p><strong>Apply governance</strong> → Governance Case → Connect Your Builds → Test 1</p></div></section>
    <section className="lmsPanel resourcesPanel"><div className="panelBar"><h3>Resources</h3><span>Frameworks are guidance, not law</span></div><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST AI Risk Management Framework 1.0</a><a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/" target="_blank" rel="noreferrer">NIST AI RMF Core</a><a href="https://airc.nist.gov/airmf-resources/playbook/" target="_blank" rel="noreferrer">NIST AI RMF Playbook</a><a href="https://www.oecd.org/en/topics/ai-principles.html" target="_blank" rel="noreferrer">OECD AI Principles</a><a href="https://www.unesco.org/en/articles/ai-competency-framework-students" target="_blank" rel="noreferrer">UNESCO AI Competency Framework for Students</a></section>
  </>;

  function switchView(view: View) {
    setActiveView(view);
    setMenuOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSearchResult(result: { view: View; week?: number }) {
    if (result.week) setSelectedWeek(result.week);
    switchView(result.view);
  }

  function toggleModuleStep(label: string) {
    const key = `${selectedWeek}-${label}`;
    setModuleSteps((current) => ({ ...current, [key]: !current[key] }));
  }

  function updateEthics(field: keyof EthicsAssessment, value: string) {
    setEthicsAssessment((current) => ({ ...current, [field]: value }));
  }

  function updatePolicy(field: keyof PolicyDraft, value: string) {
    setPolicyDraft((current) => ({ ...current, [field]: value }));
  }

  function updateEthicsCategory(category: string, value: string) {
    setEthicsAssessment((current) => ({ ...current, categoryRisks: { ...current.categoryRisks, [category]: value } }));
  }

  function updatePolicyReadiness(item: string) {
    setPolicyDraft((current) => ({ ...current, readinessChecks: { ...current.readinessChecks, [item]: !current.readinessChecks[item] } }));
  }

  function markActivityComplete(key: string) {
    setModuleSteps((current) => ({ ...current, [`${selectedWeek}-${key}`]: true }));
  }

  function savePolicyVersion() {
    setPolicyDraft((current) => ({ ...current, version: current.version === 'v1' ? 'v2' : `v${Number(current.version.replace('v', '') || 1) + 1}`, status: 'Saved version' }));
    saveBuild('policy');
  }

  function saveBuild(kind: 'ethics' | 'policy') {
    setSaveNotice(`${kind === 'ethics' ? 'AI Ethics Checker' : 'Responsible AI Policy'} saved on this device.`);
    window.setTimeout(() => setSaveNotice(''), 2200);
  }

  function resetEthics() {
    setEthicsAssessment(initialEthicsAssessment);
  }

  function resetPolicy() {
    setPolicyDraft(initialPolicyDraft);
  }

  function markBuildComplete(kind: 'ethics' | 'policy') {
    if (kind === 'ethics') {
      setEthicsAssessment((current) => ({ ...current, complete: true }));
      setModuleSteps((current) => ({ ...current, '6-Learn': true, '6-Create': true, '6-Test': true, '6-Manage': true, '6-Present': true }));
    } else {
      setPolicyDraft((current) => ({ ...current, complete: true }));
      setModuleSteps((current) => ({ ...current, '7-Learn': true, '7-Create': true, '7-Test': true, '7-Manage': true, '7-Present': true }));
    }
    saveBuild(kind);
  }

  function saveDiscussionDraft() {
    window.localStorage.setItem('aim-discussion-draft-v1', discussionDraft);
    setDraftSaved(true);
    window.setTimeout(() => setDraftSaved(false), 1800);
  }

  function prepareHelpMessage(mode: HelpMode) {
    const templates: Record<HelpMode, string> = {
      instructions: `Subject: Question about Week ${selectedWeek} instructions\n\nModule or assignment: \nThe instruction I am unsure about: \nWhat I think it means: \nWhat I have already tried: \nMy specific question: `,
      technical: `Subject: Technical blocker in Week ${selectedWeek}\n\nWhat I expected to happen: \nWhat happened instead: \nSteps I already tried: \nDevice/browser (no passwords or private data): \nWhen I need help by: `,
      team: `Subject: Request for a private team check-in\n\nWeek: ${selectedWeek}\nContribution concern: \nEvidence from our contribution record: \nSteps the team has already taken: \nWhat support I am requesting: `,
    };
    setHelpMode(mode);
    setHelpDraft(templates[mode]);
  }

  async function copyHelpMessage() {
    await navigator.clipboard.writeText(helpDraft);
    setHelpCopied(true);
    window.setTimeout(() => setHelpCopied(false), 1800);
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: title.trim(), category, due, priority, complete: false, verified: false }]);
    setTitle('');
    setShowTaskForm(false);
    setActiveView('assignments');
  }

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, complete: !task.complete } : task));
  }

  function toggleVerified(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, verified: !task.verified } : task));
  }

  async function copyBrief() {
    await navigator.clipboard.writeText(aiBrief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function applyToolkitStarter(starter: typeof toolkitStarters[number]) {
    setSelectedStarter(starter.id);
    setGoal(starter.goal);
    setContext(starter.context);
    setConstraints(starter.constraints);
    setSuccess(starter.success);
  }

  return (
    <main className="lmsShell">
      <header className="globalBar">
        <button className="mobileMenu" type="button" aria-label="Open course menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
        <a className="portalBrand" href="#" onClick={(event) => { event.preventDefault(); switchView('home'); }}><span>AI</span><strong>LEARNING PORTAL</strong></a>
        <label className="portalSearch"><span aria-hidden="true">⌕</span><input aria-label="Search course" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search modules, assignments, and tools" /></label>
        <div className="globalActions"><button className="faqTrigger" type="button" aria-label="Open frequently asked questions" aria-expanded={faqOpen} title="Frequently asked questions" onClick={() => setFaqOpen(true)}>?</button><button type="button" aria-label="Notifications">●</button><span className="profileBadge">DW</span></div>
      </header>

      <header className="courseMasthead">
        <div><p>BUSI 610 · FALL I 2026</p><h1>AI for Managers</h1></div>
        <div className="courseStatus"><span /> Course is available</div>
      </header>

      <div className="portalLayout">
        <aside className={`courseSidebar ${menuOpen ? 'isOpen' : ''}`} aria-label="Course menu">
          <div className="sidebarTitle"><span>COURSE MENU</span><button type="button" aria-label="Close course menu" onClick={() => setMenuOpen(false)}>×</button></div>
          <nav>
            {navItems.map((item) => (
              <button className={activeView === item.id ? 'active' : ''} type="button" aria-current={activeView === item.id ? 'page' : undefined} onClick={() => switchView(item.id)} key={item.id}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="sidebarHelp"><strong>New to AI?</strong><p>No coding experience is required. Start small, ask questions, and document what you learn.</p><button type="button" onClick={() => switchView('messages')}>Get course help</button></div>
        </aside>

        <section className="portalContent">
          <div className="breadcrumbs">Courses <span>/</span> BUSI 610 <span>/</span> {pageTitle}</div>
          <div className="pageHeading"><div><p>AI FOR MANAGERS</p><h2>{pageTitle}</h2></div>{(activeView === 'home' || activeView === 'assignments') && <button className="primaryAction" type="button" onClick={() => setShowTaskForm(true)}>＋ Add assignment</button>}</div>

          {normalizedSearch && (
            <section className="searchResults" aria-live="polite">
              <div><span>SEARCH RESULTS</span><strong>{searchResults.length} match{searchResults.length === 1 ? '' : 'es'} for “{searchQuery.trim()}”</strong><button type="button" onClick={() => setSearchQuery('')}>Clear</button></div>
              {searchResults.length ? searchResults.map((result) => <button type="button" onClick={() => openSearchResult(result)} key={result.id}><span>↗</span><div><strong>{result.label}</strong><small>{result.detail}</small></div></button>) : <p>No matching course content. Try a week number, assignment name, “grades,” “help,” or “AI toolkit.”</p>}
            </section>
          )}

          {activeView === 'home' && (
            <div className="homeView">
              <section className="welcomeBanner">
                <div><span className="weekLabel">WEEK {selectedWeek} OF {weeklyPlan.length}</span><h3>You do not need to be a coder.</h3><p>Bring a real management problem, curiosity, and a willingness to build, test, explain, and improve. AI helps with the work; you remain responsible for the result.</p><button type="button" onClick={() => switchView('content')}>Open Week {selectedWeek} module</button></div>
                <div className="weekProgress"><strong>{Math.round(selectedWeek / weeklyPlan.length * 100)}%</strong><span>Course journey</span><div><i style={{ width: `${selectedWeek / weeklyPlan.length * 100}%` }} /></div><small>{activeWeek.dates}</small></div>
              </section>

              <div className="homeColumns">
                <div className="mainColumn">
                  <section className="lmsPanel announcementsPanel">
                    <div className="panelBar"><h3>Announcements</h3><span>2 new</span></div>
                    <article className="announcement"><div className="announcementIcon">!</div><div><span>Posted Aug 24</span><h4>Welcome—begin with the Start Here module</h4><p>Review the course promise, AI boundaries, weekly rhythm, and Week 1 acceptance checks before your team builds anything.</p><button type="button" onClick={() => switchView('content')}>Read announcement</button></div></article>
                    <article className="announcement"><div className="announcementIcon neutral">i</div><div><span>Posted Aug 25</span><h4>Protect confidential and student information</h4><p>Do not enter FERPA-protected, confidential, proprietary, credential, password, or API-key data into an AI tool.</p></div></article>
                  </section>

                  <section className="lmsPanel">
                    <div className="panelBar"><h3>Coming Up</h3><button type="button" onClick={() => switchView('assignments')}>View all assignments</button></div>
                    <div className="dueList">
                      {focusTasks.slice(0, 4).map((task) => (
                        <article className={task.complete ? 'complete' : ''} key={task.id}>
                          <button className="roundCheck" type="button" aria-label={`Mark ${task.title} ${task.complete ? 'incomplete' : 'complete'}`} onClick={() => toggleTask(task.id)}>{task.complete ? '✓' : ''}</button>
                          <div><strong>{task.title}</strong><span>{task.category} · Due {formatDate(task.due)}</span></div>
                          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                        </article>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="rightColumn">
                  <section className="lmsPanel progressPanel"><div className="panelBar"><h3>My Progress</h3></div><div className="progressDonut" style={{ '--progress': `${completedPercent * 3.6}deg` } as React.CSSProperties}><span>{completedPercent}%</span></div><p>{tasks.filter((task) => task.complete).length} of {tasks.length} assignments completed</p><button type="button" onClick={() => switchView('grades')}>View my grades</button></section>
                  <section className="lmsPanel currentModule"><div className="panelBar"><h3>Current Module</h3></div><span>Week {selectedWeek} · {activeWeek.dates}</span><h4>{activeWeek.title}</h4><p><strong>By Friday, I can:</strong> {activeWeek.studentWin}</p><dl><div><dt>Estimated work</dt><dd>{activeWeek.workload}</dd></div><div><dt>Submit</dt><dd>{activeWeek.output}</dd></div></dl><button type="button" onClick={() => switchView('content')}>Continue module →</button></section>
                  <section className="pulseCard" aria-live="polite"><span>WEEKLY CHECK-IN</span><h3>How does this week feel?</h3><div>{['Clear', 'Stretched', 'Stuck'].map((option) => <button className={studentPulse === option ? 'selected' : ''} type="button" aria-pressed={studentPulse === option} onClick={() => setStudentPulse(option)} key={option}>{option}</button>)}</div><p>{studentPulse ? studentPulse === 'Clear' ? 'Keep building and document what you learn.' : studentPulse === 'Stretched' ? 'Choose the smallest next step and ask for one focused check-in.' : 'Pause, name the blocker, and ask for help before adding complexity.' : 'Your response stays in this visit.'}</p></section>
                </aside>
              </div>
            </div>
          )}

          {activeView === 'content' && (
            <div className="contentView">
              <aside className="moduleList" aria-label="Course modules"><div className="moduleListTitle">15 WEEK MODULES</div>{weeklyPlan.map((week) => <button className={selectedWeek === week.week ? 'selected' : ''} type="button" onClick={() => setSelectedWeek(week.week)} key={week.week}><span>{week.week}</span><div><strong>{week.title}</strong><small>{week.dates}</small></div><i>{week.week < selectedWeek ? '✓' : '›'}</i></button>)}</aside>
              <section className="moduleDetail">
                <div className="moduleHero"><span>MODULE {activeWeek.week} · {activeWeek.dates}</span><h3>{activeWeek.title}</h3><p>{activeWeek.studentQuestion}</p><div><span>Expected effort: {activeWeek.workload}</span><span>Deliverable: {activeWeek.output}</span></div></div>
                {selectedWeek === 6 ? renderEthicsModule() : selectedWeek === 7 ? renderGovernanceModule() : <><section className="lmsPanel moduleOutcome"><div className="panelBar"><h3>By the end of this week</h3></div><p className="outcomeStatement">I can {activeWeek.studentWin.charAt(0).toLowerCase() + activeWeek.studentWin.slice(1)}</p><p><strong>Career connection:</strong> {activeWeek.career}</p></section>
                <section className="lmsPanel learningSequence"><div className="panelBar"><h3>Learning Sequence</h3><span>{completedModuleSteps} of 5 complete</span></div>{[
                  ['1', 'Learn', activeWeek.learn],
                  ['2', 'Create', activeWeek.build],
                  ['3', 'Test', activeWeek.test],
                  ['4', 'Manage', activeWeek.manage],
                  ['5', 'Present', activeWeek.present],
                ].map(([number, label, copy]) => {
                  const isComplete = Boolean(moduleSteps[`${selectedWeek}-${label}`]);
                  return <article className={isComplete ? 'stepComplete' : ''} key={label}><span>{isComplete ? '✓' : number}</span><div><strong>{label}</strong><p>{copy}</p></div><button type="button" aria-pressed={isComplete} onClick={() => toggleModuleStep(label)}>{isComplete ? 'Completed' : 'Mark complete'}</button></article>;
                })}</section>
                {selectedWeek === 1 && <div className="weekOneContent">
                  <section className="lmsPanel lessonPanel">
                    <div className="panelBar"><h3>Lesson: What AI Is</h3><span>Read · 20 min</span></div>
                    <div className="lessonIntro"><p>Artificial intelligence is a broad field of systems that perform tasks associated with human intelligence, such as recognizing patterns, making predictions, or generating language. In this course, treat AI as a capable assistant inside a management process, not as an independent decision-maker.</p><p><strong>The manager’s job:</strong> frame the problem, choose an appropriate tool, inspect the output, verify important claims, and remain accountable for the decision.</p></div>
                    <div className="conceptGrid">
                      <article><span>01 · FIELD</span><h4>Artificial intelligence</h4><p>The broad category of computer systems that sense, predict, recommend, generate, or act to accomplish a task.</p></article>
                      <article><span>02 · METHOD</span><h4>Machine learning</h4><p>A way to build systems that learn patterns from examples instead of following only hand-written rules.</p></article>
                      <article><span>03 · OUTPUT</span><h4>Generative AI</h4><p>AI that creates new text, images, audio, code, or other content in response to an instruction.</p></article>
                      <article><span>04 · MODEL</span><h4>Large language model</h4><p>A model trained on very large text datasets to predict and generate language. It produces likely sequences, not guaranteed truth.</p></article>
                    </div>
                    <div className="lessonColumns"><div><h4>How to think about a model</h4><p>A <strong>model</strong> is the trained pattern-making engine. An <strong>AI tool</strong> or application wraps a model with an interface, instructions, connected data, and permissions. The same model can behave differently in different tools because context and controls change.</p><p><strong>Training data</strong> is the collection of examples used to adjust a model’s patterns. It may be incomplete, outdated, biased, or not a source that the model can cite. Ask where an important answer came from.</p></div><div><h4>Strengths and limits</h4><ul><li><strong>Strengths:</strong> summarize, brainstorm, classify, translate, draft, compare, and find patterns quickly.</li><li><strong>Limits:</strong> weak source awareness, uncertain reasoning, outdated knowledge, bias, and difficulty knowing when it is wrong.</li><li><strong>Hallucination:</strong> a confident-sounding output that is false, unsupported, or invented. Fluency is not evidence.</li></ul></div></div>
                    <div className="lessonCallout"><strong>Manager’s rule</strong><span>Use AI for speed and breadth. Use people, evidence, and explicit checks for truth, judgment, and accountability.</span></div>
                  </section>

                  <section className="lmsPanel objectivesPanel"><div className="panelBar"><h3>Learning Objectives</h3><span>By Friday</span></div><ol><li>Explain the relationship between AI, machine learning, generative AI, models, and LLMs.</li><li>Describe how training data shapes what a model can and cannot do.</li><li>Identify at least two useful AI strengths and two important limits, including hallucinations.</li><li>Choose a bounded management problem where an AI-enabled dashboard could help, while naming the human responsibility that remains.</li></ol></section>

                  <section className="lmsPanel knowledgePanel"><div className="panelBar"><h3>Quick Knowledge Check</h3><span>Answer before building</span></div><div className="knowledgeQuestion"><strong>Which statement is most accurate?</strong><p>A. An LLM retrieves facts from a perfect database.</p><p>B. A hallucination is an answer that sounds plausible but is unsupported or false.</p><p>C. Generative AI and machine learning are unrelated.</p><p>D. If an AI tool is confident, a manager can skip verification.</p><div className="answerKey"><strong>Answer: B.</strong> An LLM generates likely language from learned patterns. Confidence and correctness are different, so important outputs need verification.</div></div></section>

                  <section className="lmsPanel projectPanel"><div className="panelBar"><h3>Semester Project: Your AI Management Dashboard</h3><span>Build from here</span></div><div className="projectIntro"><div><p>You will progressively build a small control center that helps a real target user manage an AI-enabled workflow. Each week adds one capability, one test, and one management decision.</p><dl><div><dt>Week 1</dt><dd>Define the problem and prototype the structure.</dd></div><div><dt>Final week</dt><dd>Integrate, test, govern, and defend the system.</dd></div></dl></div><div className="dashboardExample"><span>EXAMPLE · COMPLETED DASHBOARD</span><h4>LaunchPad AI</h4><p>Helps student venture teams move from idea to evidence-backed launch decisions.</p><div className="exampleNav"><b>Home</b><span>AI Tools</span><span>Prompt Library</span><span>Decision Support</span></div><div className="exampleTiles"><span>Evidence queue <b>12</b></span><span>Open decisions <b>4</b></span><span>Next review <b>Fri</b></span></div></div></div></section>

                  <section className="lmsPanel starterPanel"><div className="panelBar"><h3>Starter Guide: Set Up Your Dashboard</h3><span>60–90 min</span></div><div className="starterSteps"><article><b>1</b><div><strong>Open or create your repository</strong><p>Use the class template or create a new GitHub repository. A repository is the project’s shared home for files, history, and collaboration.</p></div></article><article><b>2</b><div><strong>Work from the main branch</strong><p>The main branch is the current shared version. Read the README before editing, and make small, clearly named changes.</p></div></article><article><b>3</b><div><strong>Write your project brief</strong><p>Add the dashboard name, purpose, target user, management problem, and a one-sentence definition of success to the README.</p></div></article><article><b>4</b><div><strong>Create the first navigation</strong><p>Build a basic homepage with links or visible placeholders for AI Tools, Prompt Library, Decision Support, Ethics, AI Policy, Verification, Workforce, and Implementation.</p></div></article><article><b>5</b><div><strong>Preview, test, and share</strong><p>Open the homepage as a user, check every navigation item, confirm no private data is present, and submit the repository link with a screenshot.</p></div></article></div><div className="starterNote"><strong>GitHub vocabulary</strong><span><b>Repository</b> = project home · <b>Branch</b> = version line · <b>File</b> = one piece of project content · <b>README</b> = orientation and setup notes</span></div></section>

                  <section className="lmsPanel submissionPanel"><div className="panelBar"><h3>Week 1 Submission</h3><span>Due Saturday · 11:59 PM</span></div><div className="submissionGrid"><div><h4>Checklist</h4><ul><li>Dashboard name, purpose, target user, and management problem are clear.</li><li>Homepage and navigation are usable.</li><li>All eight future sections appear as labeled placeholders.</li><li>README explains the project and includes the repository link.</li><li>Knowledge check is complete and the AI use is disclosed.</li><li>Screenshot shows the first version running.</li></ul></div><div><h4>Rubric · 20 points</h4><div className="rubricRows"><p><b>5</b><span>AI foundations: accurate key terms and limits.</span></p><p><b>5</b><span>Problem framing: specific user, need, and success.</span></p><p><b>5</b><span>Dashboard structure: clear homepage and complete navigation.</span></p><p><b>3</b><span>GitHub practice: readable README and repository hygiene.</span></p><p><b>2</b><span>Management judgment: accountability and verification boundary.</span></p></div></div></div></section>
                </div>}
                {selectedWeek === 10 && <div className="weekTenContent">
                  <section className="lmsPanel folderPanel">
                    <div className="panelBar"><h3>Introduction</h3><span>Start here · 10 min</span></div>
                    <div className="folderContent"><p>This week focuses on using AI without misrepresenting who did the work. Responsible AI use means following the assignment rules, keeping a record of meaningful assistance, checking the output, and being able to explain the final submission.</p><p><strong>Core distinction:</strong> AI may support learning and revision when permitted, but submitting generated work as your own or hiding substantial assistance can violate academic integrity.</p><div className="lessonCallout"><strong>Manager’s rule</strong><span>Make the work traceable: disclose meaningful AI assistance, preserve your judgment, and verify what you submit.</span></div></div>
                  </section>

                  <section className="lmsPanel folderPanel">
                    <div className="panelBar"><h3>Read and Study</h3><span>Required · 30 min</span></div>
                    <div className="folderContent"><h4>Before using AI on graded work</h4><ul><li>Read the assignment instructions and identify what AI use is allowed.</li><li>Do not enter private, confidential, proprietary, or personally identifying information.</li><li>Save the prompts and meaningful outputs that shaped your work.</li><li>Check claims, citations, calculations, and wording before submitting.</li><li>Rewrite, revise, and explain the final work in your own judgment and voice.</li></ul><h4>Study terms</h4><div className="conceptGrid"><article><span>01 · INTEGRITY</span><h4>Plagiarism</h4><p>Presenting another person&apos;s words, ideas, or generated content as your own without appropriate attribution.</p></article><article><span>02 · TRACEABILITY</span><h4>Disclosure</h4><p>A clear account of meaningful AI assistance, including what the tool contributed and what the student changed.</p></article><article><span>03 · ACCOUNTABILITY</span><h4>Verification</h4><p>Checking the accuracy, relevance, originality, and appropriateness of AI-assisted work before submission.</p></article></div></div>
                  </section>

                  <section className="lmsPanel folderPanel">
                    <div className="panelBar"><h3>Due This Week</h3><span>Submit by Friday · 11:59 PM</span></div>
                    <div className="folderContent"><div className="starterSteps"><article><b>1</b><div><strong>Complete the reading and study check</strong><p>Identify one permitted use, one prohibited use, and one verification step for AI-assisted coursework.</p></div></article><article><b>2</b><div><strong>Build the AI Use / Disclosure Log</strong><p>Record the tool, purpose, prompt or task, AI contribution, your changes, verification performed, and disclosure statement.</p></div></article><article><b>3</b><div><strong>Submit your integrity reflection</strong><p>Explain how your log shows what the AI did, what you did, and why the final submission remains accountable to you.</p></div></article></div><div className="starterNote"><strong>Submission</strong><span>AI Use / Disclosure Log · integrity reflection · dashboard evidence showing the completed log</span></div></div>
                  </section>
                </div>}</>}
              </section>
            </div>
          )}

          {activeView === 'assignments' && (
            <section className="lmsPanel assignmentView">
              <div className="panelBar"><h3>Assignments and Deliverables</h3><span>{tasks.filter((task) => !task.complete).length} open</span></div>
              <div className="assignmentHeader"><span>Status</span><span>Assignment</span><span>Due</span><span>Evidence check</span><span>Priority</span></div>
              {focusTasks.map((task) => <article className={task.complete ? 'complete' : ''} key={task.id}><button className="roundCheck" type="button" onClick={() => toggleTask(task.id)} aria-label={`Mark ${task.title} ${task.complete ? 'incomplete' : 'complete'}`}>{task.complete ? '✓' : ''}</button><div><strong>{task.title}</strong><span>{task.category}</span></div><time>{formatDate(task.due)}</time><button className={`evidenceButton ${task.verified ? 'verified' : ''}`} type="button" onClick={() => toggleVerified(task.id)}>{task.verified ? '✓ Verified' : 'Verify first'}</button><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></article>)}
              <div className="roadmapHeading"><div><span>15-WEEK ASSIGNMENT ROADMAP</span><h3>One meaningful deliverable every week</h3></div><p>Select any week to open its instructions, outcomes, workload, and five-step learning sequence.</p></div>
              <div className="semesterRoadmap">
                {weeklyPlan.map((week) => <button className={selectedWeek === week.week ? 'selected' : ''} type="button" onClick={() => { setSelectedWeek(week.week); switchView('content'); }} key={week.week}><span>Week {week.week}</span><strong>{week.title}</strong><small>{week.output}</small><i>{week.dates} →</i></button>)}
              </div>
            </section>
          )}

          {activeView === 'discussions' && (
            <div className="discussionView">
              <section className="lmsPanel"><div className="panelBar"><h3>Discussion Board</h3><span>Week {selectedWeek}</span></div><article className="discussionPrompt"><span>REQUIRED DISCUSSION</span><h3>{selectedWeek === 6 ? 'Discussion 3: When Does Using AI Become Unethical?' : 'Where should a manager refuse AI assistance?'}</h3><p>{selectedWeek === 6 ? 'Choose one business application of AI. Explain the benefit, at least two ethical risks, whether you would allow it, and one safeguard. Use your AI Ethics Checker.' : 'Describe one situation in which using AI would create more risk than value. Use one course concept, identify who remains accountable, and reply constructively to one classmate.'}</p><dl><div><dt>Your post</dt><dd>250–350 words</dd></div><div><dt>Reply</dt><dd>100–150 words</dd></div><div><dt>Due</dt><dd>Friday, 11:59 PM</dd></div></dl><button type="button" onClick={() => setDraftOpen((open) => !open)}>{draftOpen ? 'Close private draft' : discussionDraft ? 'Continue private draft' : 'Start private draft'}</button></article>{draftOpen && <div className="discussionEditor"><div><strong>Private working draft</strong><span>Saved only on this device—not submitted to the class.</span></div><textarea value={discussionDraft} onChange={(event) => setDiscussionDraft(event.target.value)} placeholder="Start with a specific situation. What decision is at stake? What could go wrong? Who remains accountable?" /><div><span>{discussionDraft.trim() ? discussionDraft.trim().split(/\s+/).length : 0} words</span><button type="button" onClick={saveDiscussionDraft}>{draftSaved ? 'Saved' : 'Save draft'}</button></div></div>}</section>
              <aside className="lmsPanel discussionGuide"><div className="panelBar"><h3>A strong post</h3></div><ol><li>Names a specific managerial situation.</li><li>Uses evidence or a course concept.</li><li>Explains risk, tradeoffs, and accountability.</li><li>Adds something useful to a classmate’s thinking.</li></ol><p>AI may help you brainstorm or revise. Your judgment, evidence, and final writing must be your own.</p></aside>
            </div>
          )}

          {activeView === 'grades' && (
            <div className="gradesView">
              <section className="gradeSummary"><div><span>COURSE PROGRESS</span><strong>{completedPercent}%</strong><small>assignment completion</small></div><div><span>GRADEBOOK STATUS</span><strong>—</strong><small>No final grade calculated</small></div><div><span>EVIDENCE CHECKS</span><strong>{tasks.filter((task) => task.verified).length}/{tasks.length}</strong><small>assignment records verified</small></div></section>
              <section className="lmsPanel gradebook"><div className="panelBar"><h3>How Your Grade Works</h3><span>Total: 100%</span></div>{gradeItems.map((item) => <article key={item.name}><div><strong>{item.name}</strong><span>{item.status}</span></div><div className="weightTrack"><i style={{ width: `${item.weight}%` }} /></div><b>{item.weight}%</b></article>)}</section>
              <section className="fairnessCallout"><strong>Team fairness promise</strong><p>You are not graded only by the team’s polish or by one forced-ranking position. Weekly contribution records, demonstrations, and individual judgment checks show patterns over time.</p></section>
            </div>
          )}

          {activeView === 'messages' && (
            <div className="messagesView">
              <section className="lmsPanel helpPanel"><div className="panelBar"><h3>Messages & Help</h3><span>Response goal: 1 business day</span></div><div className="helpChoice"><span>1</span><div><strong>Question about instructions</strong><p>Include the module, assignment name, and the exact sentence or step that is unclear.</p></div><button type="button" onClick={() => prepareHelpMessage('instructions')}>Prepare message</button></div><div className="helpChoice"><span>2</span><div><strong>Technical blocker</strong><p>Describe what you expected, what happened, and what you already tried. Never send passwords or keys.</p></div><button type="button" onClick={() => prepareHelpMessage('technical')}>Report blocker</button></div><div className="helpChoice"><span>3</span><div><strong>Team contribution concern</strong><p>Use the private contribution record and contact the instructor early—before the final week.</p></div><button type="button" onClick={() => prepareHelpMessage('team')}>Request check-in</button></div>{helpMode && <div className="messageComposer"><div><strong>{helpMode === 'instructions' ? 'Instruction question' : helpMode === 'technical' ? 'Technical blocker' : 'Team check-in'} template</strong><span>Complete the blanks, then copy it into your course messaging system.</span></div><textarea value={helpDraft} onChange={(event) => setHelpDraft(event.target.value)} /><div><small>This dashboard does not send the message for you.</small><button type="button" onClick={copyHelpMessage}>{helpCopied ? 'Copied' : 'Copy message'}</button></div></div>}</section>
              <aside className="lmsPanel responseGuide"><div className="panelBar"><h3>Before you send</h3></div><ul><li>I tried one reasonable next step.</li><li>I can name the specific blocker.</li><li>I removed private or confidential data.</li><li>I explained when I need a response.</li></ul></aside>
            </div>
          )}

          {activeView === 'toolkit' && (
            <div className="toolkitView">
              <section className="lmsPanel briefBuilder"><div className="panelBar"><h3>AI Collaboration Brief</h3><span>Planning aid—not assessed work</span></div><div className="toolkitIntro"><strong>Start with the work in front of you.</strong><p>Choose a manager scenario to get useful starting language, then edit the brief until it matches your real situation.</p></div><div className="toolkitStarters" aria-label="AI brief starters">{toolkitStarters.map((starter) => <button className={selectedStarter === starter.id ? 'selected' : ''} type="button" onClick={() => applyToolkitStarter(starter)} key={starter.id}><span>{starter.label}</span><small>{starter.description}</small></button>)}</div><div className="briefFields"><label>Goal<input value={goal} onChange={(event) => { setGoal(event.target.value); setSelectedStarter(''); }} placeholder="What are you trying to accomplish?" /></label><label>Context<textarea value={context} onChange={(event) => { setContext(event.target.value); setSelectedStarter(''); }} placeholder="Audience, situation, inputs, and background" /></label><label>Constraints<textarea value={constraints} onChange={(event) => { setConstraints(event.target.value); setSelectedStarter(''); }} placeholder="Rules, privacy, time, format, and boundaries" /></label><label>Success standard<input value={success} onChange={(event) => { setSuccess(event.target.value); setSelectedStarter(''); }} placeholder="How will you know it works?" /></label></div><div className="briefOutput"><div><span>READY-TO-USE BRIEF</span><small>Review it, then paste it into the course-approved AI tool.</small></div><pre>{aiBrief}</pre><button className="primaryAction" type="button" onClick={copyBrief}>{copied ? 'Copied to clipboard' : 'Copy AI brief'}</button></div></section>
              <aside className="lmsPanel verificationPanel"><div className="panelBar"><h3>Verify Before You Trust</h3><strong>{checkPercent}%</strong></div><p>Complete this before you submit, recommend, automate, or deploy an AI-assisted output.</p><div className="verificationProgress"><i style={{ width: `${checkPercent}%` }} /></div>{verificationItems.map((item, index) => <label className={checks[index] ? 'checked' : ''} key={item}><input type="checkbox" checked={checks[index]} onChange={() => setChecks((current) => current.map((value, checkIndex) => checkIndex === index ? !value : value))} /><span>{item}</span></label>)}<div className="dataWarning"><strong>Never enter</strong><span>FERPA-protected, confidential, proprietary, password, credential, or API-key data.</span></div></aside>
            </div>
          )}

          {activeView === 'syllabus' && (
            <div className="syllabusView">
              <section className="lmsPanel">
                <div className="syllabusHeader">
                  <div>
                    <p>BUSI 610</p>
                    <h2>AI for Managers</h2>
                    <p className="semester">Fall I 2026</p>
                  </div>
                </div>
                
                <div className="syllabusContent">
                  <article>
                    <h3>Course Description</h3>
                    <p>This is a 7–15 week course designed for business students with no coding experience to understand how AI can be used responsibly in management, business decisions, teamwork, and everyday workplace problems.</p>
                    <p>Rather than learning AI theory, students build a complete AI-enabled dashboard system from the ground up. Each week adds a new capability: prototyping, deployment, research workflows, data analysis, automation, governance, communication, customer insights, people management, forecasting, strategy, innovation, value measurement, adoption planning, and final integration.</p>
                    <p>The course emphasizes judgment over features: framing problems, testing AI outputs, identifying risks, explaining decisions, and maintaining human accountability.</p>
                  </article>

                  <article>
                    <h3>Learning Outcomes</h3>
                    <p>By the end of this course, students can:</p>
                    <ul>
                      <li>Explain how generative AI works and identify its capabilities and limits</li>
                      <li>Frame management problems in ways that AI can help solve</li>
                      <li>Build, test, and iterate on AI-assisted prototypes and workflows</li>
                      <li>Verify AI outputs, identify hallucinations and bias, and assess reliability</li>
                      <li>Deploy working AI systems and support their users</li>
                      <li>Conduct research, analysis, and decision-making with AI assistance</li>
                      <li>Automate processes while maintaining human oversight and accountability</li>
                      <li>Design systems that balance efficiency with governance and fairness</li>
                      <li>Communicate AI-assisted work clearly and disclose AI involvement</li>
                      <li>Evaluate innovation opportunities and measure business value responsibly</li>
                      <li>Lead organizational adoption of AI-enabled work</li>
                      <li>Defend management decisions about AI use to peers, leaders, and stakeholders</li>
                    </ul>
                  </article>

                  <article>
                    <h3>How Your Grade Works</h3>
                    <div className="gradeBreakdown">
                      {gradeItems.map((item) => (
                        <div key={item.name}>
                          <div><strong>{item.name}</strong></div>
                          <div className="gradeBreakdownBar"><i style={{ width: `${item.weight}%` }} /></div>
                          <div><strong>{item.weight}%</strong></div>
                        </div>
                      ))}
                    </div>
                    <p><strong>Team fairness promise:</strong> You are not graded only on the team&apos;s final polish or by one forced ranking. Weekly contribution records, demonstrations, and individual judgment checks show patterns over time. Your individual work and judgment are recognized throughout the semester.</p>
                  </article>

                  <article>
                    <h3>Course Policies</h3>
                    
                    <h4>AI Use Policy</h4>
                    <p>AI may support brainstorming, research organization, drafting, analysis, prototyping, and revision when the assignment permits it. You must:</p>
                    <ul>
                      <li>Verify all AI-assisted work before submitting</li>
                      <li>Follow disclosure requirements—be clear about what AI did</li>
                      <li>Be able to explain and defend everything you submit</li>
                      <li>Retain responsibility for the final decision and output</li>
                    </ul>

                    <h4>Data Privacy and Security</h4>
                    <p><strong>Never enter into an AI tool:</strong></p>
                    <ul>
                      <li>FERPA-protected student records</li>
                      <li>Confidential or proprietary information</li>
                      <li>Passwords, credentials, or API keys</li>
                      <li>Private personnel data</li>
                      <li>Any information you do not have permission to share</li>
                    </ul>

                    <h4>Academic Integrity</h4>
                    <p>Academic dishonesty violates the university&apos;s code of conduct and this course&apos;s standards. Specifically:</p>
                    <ul>
                      <li>Do not submit work created entirely by AI without your own judgment, revision, and verification</li>
                      <li>Do not plagiarize from classmates, sources, or AI outputs</li>
                      <li>Do not misrepresent team contributions or individual work</li>
                      <li>Disclose AI use honestly when required</li>
                    </ul>
                    <p>When in doubt, ask the instructor before submitting.</p>

                    <h4>Attendance and Participation</h4>
                    <p>Success in this course requires consistent engagement. Weekly participation includes:</p>
                    <ul>
                      <li>Completing assigned readings and module content</li>
                      <li>Contributing to team work on the dashboard system</li>
                      <li>Submitting deliverables by the stated deadline</li>
                      <li>Participating in discussions and peer review</li>
                      <li>Requesting help early when stuck</li>
                    </ul>

                    <h4>Late Work</h4>
                    <p>Weekly deliverables are due by Friday at 11:59 PM. Late work accepted with reduced credit unless prior arrangement is made with the instructor. Communicate early if you anticipate a delay.</p>
                  </article>

                  <article>
                    <h3>Course Expectations</h3>
                    
                    <h4>What This Course Is</h4>
                    <ul>
                      <li>A hands-on, project-based course where you build a working system</li>
                      <li>An opportunity to develop judgment about responsible AI use</li>
                      <li>A team experience that mirrors real workplace collaboration</li>
                      <li>A low-code course—most changes involve content and design, not complex programming</li>
                    </ul>

                    <h4>What This Course Is Not</h4>
                    <ul>
                      <li>A computer science or software engineering course</li>
                      <li>A deep dive into AI algorithms or machine learning</li>
                      <li>A course where you code from scratch in Python or JavaScript</li>
                      <li>A passive lecture series—you build and demonstrate throughout</li>
                    </ul>

                    <h4>Time Commitment</h4>
                    <p>Expect 6–10 hours per week, depending on your background and the module. This includes readings, teamwork, prototyping, testing, and documentation.</p>
                  </article>

                  <article>
                    <h3>Support and Resources</h3>
                    
                    <h4>Getting Help</h4>
                    <p>Three types of support are available in the Messages & Help section:</p>
                    <ul>
                      <li><strong>Instruction questions:</strong> Use the template to ask about specific module instructions or assignments</li>
                      <li><strong>Technical blockers:</strong> Report technical issues or setup problems you have already tried to resolve</li>
                      <li><strong>Team check-ins:</strong> Request a private conversation about team dynamics or contribution concerns</li>
                    </ul>
                    <p><strong>Response goal:</strong> 1 business day for most questions.</p>

                    <h4>When to Ask for Help</h4>
                    <ul>
                      <li>Name the smallest specific blocker</li>
                      <li>Record what you already tried</li>
                      <li>Ask for help early—before the blocker becomes a crisis</li>
                    </ul>

                    <h4>Accessibility</h4>
                    <p>If you need accommodations for a disability or documented access need, contact the university&apos;s disability services office. I am committed to ensuring this course is accessible to all students. Please reach out early in the semester to discuss your needs.</p>

                    <h4>Diversity and Inclusion</h4>
                    <p>This course welcomes students of all backgrounds and experiences. Diverse perspectives strengthen our work. If you experience any barriers to participation or inclusion, please contact me or university support services.</p>
                  </article>

                  <article>
                    <h3>Course Philosophy</h3>
                    <p><strong>Build carefully. Verify evidence. Keep humans accountable.</strong></p>
                    <p>This course is built on three core beliefs:</p>
                    <ul>
                      <li><strong>AI is a tool, not a replacement for judgment.</strong> Your role is to frame problems, evaluate outputs, identify risks, and make the final call. AI assists; you decide.</li>
                      <li><strong>Responsible use matters more than speed or scale.</strong> A small, well-tested system with clear boundaries and human oversight beats a large system with hidden risks.</li>
                      <li><strong>Learning happens through building and testing, not just reading.</strong> You will build things, test them, fail, learn, and improve. That cycle is where deep understanding comes from.</li>
                    </ul>
                  </article>

                  <article>
                    <h3>Course Schedule Overview</h3>
                    <p>The course spans 15 weeks, with each week building one capability into the system:</p>
                    <ul>
                      <li><strong>Week 1:</strong> Orient & prototype</li>
                      <li><strong>Week 2:</strong> Deploy & use</li>
                      <li><strong>Week 3:</strong> Research & know</li>
                      <li><strong>Week 4:</strong> Analyze & decide</li>
                      <li><strong>Week 5:</strong> Automate & coordinate</li>
                      <li><strong>Week 6:</strong> Test & govern</li>
                      <li><strong>Week 7:</strong> Communicate & persuade</li>
                      <li><strong>Week 8:</strong> Understand customers</li>
                      <li><strong>Week 9:</strong> Support people & teams</li>
                      <li><strong>Week 10:</strong> AI and Plaigarism</li>
                      <li><strong>Week 11:</strong> Christian Perspective on AI</li>
                      <li><strong>Week 12:</strong> AI and the Workforce</li>
                      <li><strong>Week 13:</strong> Measure value</li>
                      <li><strong>Week 14:</strong> Lead adoption</li>
                      <li><strong>Week 15:</strong> Integrate & defend</li>
                    </ul>
                  </article>

                  <article>
                    <h3>Questions and Feedback</h3>
                    <p>This syllabus is a guide, not a legal contract. I may update it based on class needs, feedback, and circumstances. I will notify the class of any significant changes.</p>
                    <p>Your feedback is valuable. If something is not working—whether it is course design, pacing, or clarity—please let me know. The best learning experiences are built together.</p>
                  </article>
                </div>
              </section>
            </div>
          )}

          <footer className="courseFooter"><span>BUSI 610 · AI for Managers</span><span>Build carefully. Verify evidence. Keep humans accountable.</span></footer>
        </section>
      </div>

      {faqOpen && (
        <div className="modalBackdrop faqBackdrop" role="presentation" onMouseDown={() => setFaqOpen(false)}>
          <section className="faqModal" role="dialog" aria-modal="true" aria-labelledby="faq-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="faqHeader"><div><span>COURSE SUPPORT</span><h2 id="faq-title">Frequently asked questions</h2><p>Quick answers for navigating AI for Managers responsibly.</p></div><button type="button" onClick={() => setFaqOpen(false)} aria-label="Close frequently asked questions">×</button></div>
            <div className="faqList">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return <article className={isOpen ? 'open' : ''} key={item.question}><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaqIndex(isOpen ? null : index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong><i aria-hidden="true">{isOpen ? '−' : '+'}</i></button><div id={`faq-answer-${index}`} hidden={!isOpen}><p>{item.answer}</p></div></article>;
              })}
            </div>
            <div className="faqFooter"><span>Still need help? Open Messages & Help from the course menu.</span><button type="button" onClick={() => { setFaqOpen(false); switchView('messages'); }}>Go to Messages & Help</button></div>
          </section>
        </div>
      )}

      {showTaskForm && (
        <div className="modalBackdrop" role="presentation" onMouseDown={() => setShowTaskForm(false)}>
          <section className="taskModal" role="dialog" aria-modal="true" aria-labelledby="task-form-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modalHeader"><div><span>NEW ASSIGNMENT</span><h2 id="task-form-title">Add to your course work</h2></div><button type="button" onClick={() => setShowTaskForm(false)} aria-label="Close">×</button></div>
            <form onSubmit={addTask}><label>Assignment name<input autoFocus required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Example: Test the research workflow" /></label><div className="formRow"><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Course build</option><option>Learning</option><option>Verification</option><option>Team management</option><option>Presentation</option></select></label><label>Due date<input type="date" required value={due} onChange={(event) => setDue(event.target.value)} /></label></div><label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}><option>High</option><option>Medium</option><option>Low</option></select></label><div className="modalActions"><button className="cancelButton" type="button" onClick={() => setShowTaskForm(false)}>Cancel</button><button className="primaryAction" type="submit">Add assignment</button></div></form>
          </section>
        </div>
      )}
    </main>
  );
}
