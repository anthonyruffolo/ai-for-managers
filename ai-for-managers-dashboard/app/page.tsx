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

const initialTasks: Task[] = [
  { id: 1, title: 'Define the dashboard problem', category: 'Course build', due: '2026-08-26', priority: 'High', complete: false, verified: true },
  { id: 2, title: 'Read: AI capabilities and limits', category: 'Learning', due: '2026-08-27', priority: 'Medium', complete: false, verified: false },
  { id: 3, title: 'Test one AI claim with a source', category: 'Verification', due: '2026-08-28', priority: 'High', complete: false, verified: false },
  { id: 4, title: 'Draft team roles and contribution log', category: 'Team management', due: '2026-08-29', priority: 'Medium', complete: false, verified: true },
  { id: 5, title: 'Sketch the Week 1 prototype', category: 'Course build', due: '2026-08-30', priority: 'Low', complete: true, verified: true },
];

const weeklyPlan = [
  { week: 1, dates: 'Aug 24–30', title: 'Orient & prototype', learn: 'How generative AI works, the difference between a model and an application, capabilities, limits, and safe use.', build: 'Define a real student problem and prototype the control center.', test: 'Use known-answer tests to find hallucinations and overconfidence.', manage: 'Set team roles, scope, contribution records, and a definition of done.', present: 'Show the problem, prototype, AI use, and first trust boundary.', output: 'Prototype + team operating agreement', studentQuestion: 'Can I do this if I have never coded?', studentWin: 'Explain AI in plain language and turn one student problem into a prototype.', career: 'Scope a useful tool before investing time or money.', workload: '6–8 hours' },
  { week: 2, dates: 'Aug 31–Sep 6', title: 'Deploy & use', learn: 'Context, iterative prompting, human oversight, and responsible data handling.', build: 'Deploy a usable dashboard with assignments, deadlines, priorities, and progress.', test: 'Test every core flow and confirm Week 1 functions still work.', manage: 'Coordinate integration and address unequal contribution early.', present: 'Demonstrate a working deployed dashboard—not slides about it.', output: 'Working dashboard URL', studentQuestion: 'Will I actually make something that works?', studentWin: 'Deploy and use a basic dashboard instead of only describing an idea.', career: 'Deliver a small working product and support its users.', workload: '7–9 hours' },
  { week: 3, dates: 'Sep 7–13', title: 'Research & know', learn: 'AI-assisted research, source quality, citation verification, and knowledge management.', build: 'Add a resource library and a research-briefing workflow.', test: 'Check fabricated citations, source relevance, and unsupported claims.', manage: 'Set evidence standards and decide who approves sources.', present: 'Defend a short, verified research brief and the workflow behind it.', output: 'Research system + verified brief', studentQuestion: 'How do I know the AI did not make this up?', studentWin: 'Produce a useful research brief and trace every important claim to evidence.', career: 'Research a market, competitor, policy, or customer responsibly.', workload: '7–9 hours' },
  { week: 4, dates: 'Sep 14–20', title: 'Analyze & decide', learn: 'Managerial data analysis, framing, bias, uncertainty, and decision support.', build: 'Add a small data-analysis or decision-support tool.', test: 'Recalculate numbers and test blanks, outliers, and misleading framing.', manage: 'Define decision rights: what AI recommends and what humans decide.', present: 'Show the analysis, recommendation, limitations, and rejected alternatives.', output: 'Decision tool + management recommendation', studentQuestion: 'What if I am not a “numbers person”?', studentWin: 'Use AI to explore data while independently checking the math and recommendation.', career: 'Turn analysis into an accountable management decision.', workload: '7–9 hours' },
  { week: 5, dates: 'Sep 21–27', title: 'Automate & coordinate', learn: 'Workflows, bots, agents, tool use, and human checkpoints.', build: 'Add one useful automation, bot, or multi-step workflow.', test: 'Probe permissions, loops, bad inputs, failed handoffs, and recovery.', manage: 'Assign owners and escalation rules for every automated step.', present: 'Demonstrate time saved, failure handling, and residual risk.', output: 'Working workflow + process map', studentQuestion: 'Can AI save time without taking control away from me?', studentWin: 'Automate a repeatable process with clear owners, checkpoints, and recovery steps.', career: 'Improve a process without hiding risk or accountability.', workload: '8–10 hours' },
  { week: 6, dates: 'Sep 28–Oct 4', title: 'Test & govern', learn: 'Privacy, security, bias, failure modes, evaluation, and organizational risk.', build: 'Add a failure log, quality checks, and governance controls.', test: 'Run adversarial cases and regression-test everything already built.', manage: 'Conduct managerial peer review and revise from feedback.', present: 'Make an evidence-based approve, revise, or reject decision.', output: 'Test report + feedback-driven revision', studentQuestion: 'What could go wrong—and will I notice?', studentWin: 'Find failures, respond to peer feedback, and decide whether a product is safe enough to use.', career: 'Review AI-enabled work before organizational approval.', workload: '7–9 hours' },
  { week: 7, dates: 'Oct 5–11', title: 'Communicate & persuade', learn: 'Audience analysis, responsible AI-assisted writing, tone, visuals, and disclosure.', build: 'Add an executive briefing and presentation workflow to the dashboard.', test: 'Check accuracy, audience fit, accessibility, and whether evidence supports the story.', manage: 'Assign review ownership and approval rules for external communication.', present: 'Deliver a concise management briefing with clear AI-use disclosure.', output: 'Executive brief + presentation workflow', studentQuestion: 'How do I use AI without sounding generic or losing my voice?', studentWin: 'Create a persuasive briefing while keeping the evidence, judgment, and final voice my own.', career: 'Communicate recommendations to leaders, clients, and stakeholders.', workload: '6–8 hours' },
  { week: 8, dates: 'Oct 12–18', title: 'Understand customers', learn: 'Customer research, journey mapping, segmentation, privacy, and synthetic-data limits.', build: 'Add a customer-insight board using de-identified or synthetic inputs.', test: 'Look for invented needs, weak segments, missing voices, and privacy risks.', manage: 'Define which customer conclusions require human research before action.', present: 'Share one evidence-based customer insight and one unresolved question.', output: 'Customer insight board + journey map', studentQuestion: 'Can AI help me understand customers without making them up?', studentWin: 'Use AI to organize customer evidence without treating synthetic patterns as facts.', career: 'Support marketing, service design, and customer-experience decisions.', workload: '7–9 hours' },
  { week: 9, dates: 'Oct 19–25', title: 'Support people & teams', learn: 'AI in hiring, coaching, performance, collaboration, and employee decision-making.', build: 'Add a team-support workflow with explicit human review and fairness checks.', test: 'Probe bias, inappropriate inference, privacy, and high-stakes decision boundaries.', manage: 'Separate administrative assistance from decisions about people.', present: 'Defend where AI may assist and where it must not decide.', output: 'People-management workflow + boundary memo', studentQuestion: 'Where is AI useful—and dangerous—in managing people?', studentWin: 'Design a people workflow that improves support without automating human judgment.', career: 'Manage teams and HR-related processes more responsibly.', workload: '7–9 hours' },
  { week: 10, dates: 'Oct 26–Nov 1', title: 'Forecast & plan', learn: 'Forecasting, assumptions, scenarios, uncertainty, and operational planning.', build: 'Add a small planning tool with base, upside, and downside scenarios.', test: 'Stress-test assumptions, recalculate outputs, and identify false precision.', manage: 'Assign owners for assumptions, updates, and contingency triggers.', present: 'Recommend a plan and explain what would cause it to change.', output: 'Scenario planner + action recommendation', studentQuestion: 'How can I plan when the future is uncertain?', studentWin: 'Build scenarios that support action without pretending the forecast is certain.', career: 'Support budgeting, staffing, inventory, and operational planning.', workload: '7–9 hours' },
  { week: 11, dates: 'Nov 2–8', title: 'Explore strategy', learn: 'Competitive analysis, strategic options, assumptions, and second-order effects.', build: 'Add a strategy canvas comparing three plausible choices.', test: 'Challenge source quality, hidden assumptions, and missing alternatives.', manage: 'Clarify who recommends, who decides, and who monitors results.', present: 'Defend one strategic option and explain why the others were rejected.', output: 'Strategy canvas + decision memo', studentQuestion: 'Can AI help with strategy without choosing for me?', studentWin: 'Use AI to widen strategic options while retaining managerial accountability.', career: 'Prepare structured options for executive decision-making.', workload: '7–9 hours' },
  { week: 12, dates: 'Nov 9–15', title: 'Innovate & experiment', learn: 'Opportunity discovery, rapid experiments, desirability, feasibility, and viability.', build: 'Prototype one new AI-enabled service or process improvement.', test: 'Run a small experiment with success, stop, and learning criteria.', manage: 'Limit scope, time, cost, and exposure before scaling.', present: 'Show what the experiment proved, disproved, and left unknown.', output: 'Innovation prototype + experiment card', studentQuestion: 'How do I test an AI idea without overinvesting?', studentWin: 'Run a bounded experiment and learn from evidence instead of enthusiasm.', career: 'Evaluate innovation opportunities before committing resources.', workload: '8–10 hours' },
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

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const savedTasks = window.localStorage.getItem('aim-dashboard-tasks-v1');
      const savedChecks = window.localStorage.getItem('aim-dashboard-checks-v1');
      const savedSteps = window.localStorage.getItem('aim-module-steps-v1');
      const savedDiscussion = window.localStorage.getItem('aim-discussion-draft-v1');
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
                <section className="lmsPanel moduleOutcome"><div className="panelBar"><h3>By the end of this week</h3></div><p className="outcomeStatement">I can {activeWeek.studentWin.charAt(0).toLowerCase() + activeWeek.studentWin.slice(1)}</p><p><strong>Career connection:</strong> {activeWeek.career}</p></section>
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
              <section className="lmsPanel"><div className="panelBar"><h3>Discussion Board</h3><span>Week {selectedWeek}</span></div><article className="discussionPrompt"><span>REQUIRED DISCUSSION</span><h3>Where should a manager refuse AI assistance?</h3><p>Describe one situation in which using AI would create more risk than value. Use one course concept, identify who remains accountable, and reply constructively to one classmate.</p><dl><div><dt>Your post</dt><dd>250–350 words</dd></div><div><dt>Reply</dt><dd>100–150 words</dd></div><div><dt>Due</dt><dd>Friday, 11:59 PM</dd></div></dl><button type="button" onClick={() => setDraftOpen((open) => !open)}>{draftOpen ? 'Close private draft' : discussionDraft ? 'Continue private draft' : 'Start private draft'}</button></article>{draftOpen && <div className="discussionEditor"><div><strong>Private working draft</strong><span>Saved only on this device—not submitted to the class.</span></div><textarea value={discussionDraft} onChange={(event) => setDiscussionDraft(event.target.value)} placeholder="Start with a specific situation. What decision is at stake? What could go wrong? Who remains accountable?" /><div><span>{discussionDraft.trim() ? discussionDraft.trim().split(/\s+/).length : 0} words</span><button type="button" onClick={saveDiscussionDraft}>{draftSaved ? 'Saved' : 'Save draft'}</button></div></div>}</section>
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
                    <p><strong>Team fairness promise:</strong> You are not graded only on the team's final polish or by one forced ranking. Weekly contribution records, demonstrations, and individual judgment checks show patterns over time. Your individual work and judgment are recognized throughout the semester.</p>
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
                    <p>Academic dishonesty violates the university's code of conduct and this course's standards. Specifically:</p>
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
                    <p>If you need accommodations for a disability or documented access need, contact the university's disability services office. I am committed to ensuring this course is accessible to all students. Please reach out early in the semester to discuss your needs.</p>

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
                      <li><strong>Week 10:</strong> Forecast & plan</li>
                      <li><strong>Week 11:</strong> Explore strategy</li>
                      <li><strong>Week 12:</strong> Innovate & experiment</li>
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
