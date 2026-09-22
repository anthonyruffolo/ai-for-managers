'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type SearchCategory = 'Course area' | 'Week' | 'Lesson & activity' | 'Assignment' | 'AI Toolkit';
type SearchAction = { view?: string; week?: number; itemTitle?: string; text?: string };
type SearchItem = {
  id: string;
  category: SearchCategory;
  title: string;
  detail: string;
  keywords: string;
  action: SearchAction;
};
type ModuleSearchItem = {
  id: string;
  title: string;
  category?: SearchCategory;
  keywords?: string;
};
type ResumePosition = { week: number; itemTitle?: string; updatedAt?: number };

const weekData = [
  [1, 'Orient & prototype', 'generative AI models applications capabilities limits safe use prototype trust boundary dashboard starter'],
  [2, 'Deploy & Use', 'AI assistants plugins integrations APIs tool comparison privacy deploy dashboard'],
  [3, 'Research & know', 'AI research better questions prompts source quality hallucinations verification knowledge building'],
  [4, 'AI for Productivity', 'email meeting summaries research brainstorming presentations project planning task organization workflow automation productivity human review'],
  [5, 'AI-Assisted Managerial Decisions', 'decision support recommendations missing information alternative solutions verification automation bias human in the loop accountability'],
  [6, 'AI Ethics: When Does Using AI Become Unethical?', 'ethics bias fairness privacy transparency explainability accountability human oversight BrightPath'],
  [7, 'Responsible AI & Governance', 'governance confidentiality verification accountability incident reporting NIST policy Palmetto'],
  [8, 'AI in Management', 'leadership communication planning project management agents decision support human judgment'],
  [9, 'Accuracy, Hallucinations, and Verification', 'hallucination sources claims calculation uncertainty verification correction confidence'],
  [10, 'AI and Plagiarism', 'academic integrity attribution disclosure original work support substitution verification accountable authorship'],
  [11, 'Christian Perspective on AI', 'human dignity truthfulness justice fairness stewardship responsibility moral discernment values'],
  [12, 'AI and the Workforce', 'tasks jobs automation augmentation worker voice reskilling transition human skills'],
  [13, 'Measure value', 'business case adoption metrics quality costs benefits KPI scorecard investment implementation'],
  [14, 'Lead adoption', 'stakeholders change readiness training resistance rollout feedback testing release readiness'],
  [15, 'Integrate & defend', 'final dashboard portfolio defense testing deployment exam paper synthesis'],
] as const;

const moduleItems: Record<number, ModuleSearchItem[]> = {
  1: [
    ['lesson-1', 'Lesson 1 · What AI Is'], ['lesson-2', 'Lesson 2 · Models, Tools, and LLMs'], ['lesson-3', 'Lesson 3 · Capabilities and Limits'],
    ['lesson-4', 'Lesson 4 · AI Use Boundaries'], ['lesson-5', 'Lesson 5 · Problem Framing for the Dashboard'],
    ['practice-1', 'AI Foundations Prompt Lab'], ['build-1', 'Dashboard Starter Version'], ['assessment-1', 'Week 1 Knowledge Check', 'Assignment'],
    ['submit-1', 'Week 1 Submission', 'Assignment'], ['reflect-1', 'Week 1 Reflection'], ['resources-1', 'Week 1 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  2: [
    ['lesson-1', 'Lesson 1 · What Is an AI Assistant?'], ['lesson-2', 'Lesson 2 · Plugins, Integrations, and APIs'], ['lesson-3', 'Lesson 3 · Comparing AI Tools'],
    ['lesson-4', 'Lesson 4 · Example AI Tool Comparison'], ['lesson-5', 'Lesson 5 · AI Risks and Data Privacy'], ['scenario-2', 'Manager Scenario · Confidential Review'],
    ['practice-2', 'AI Tool Comparison Lab'], ['build-2', 'AI Tools Page'], ['assessment-2', 'Week 2 Knowledge Check', 'Assignment'],
    ['submit-2', 'Week 2 Submission', 'Assignment'], ['reflect-2', 'Week 2 Reflection'], ['resources-2', 'Week 2 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  3: [
    ['lesson-1', 'Lesson 1 · Using AI for Research'], ['lesson-2', 'Lesson 2 · Asking AI Better Research Questions'], ['lesson-3', 'Lesson 3 · Research ≠ Just Asking AI'],
    ['lesson-4', 'Lesson 4 · Evaluating AI-Generated Information'], ['lesson-5', 'Lesson 5 · Hallucinations & Verification'], ['lesson-6', 'Lesson 6 · AI for Knowledge Building'],
    ['practice-3', 'Research Practice Activity'], ['build-3', 'Research & Know Page'], ['assessment-3', 'Week 3 Knowledge Check', 'Assignment'],
    ['submit-3', 'Week 3 Submission', 'Assignment'], ['reflect-3', 'Week 3 Reflection'], ['resources-3', 'Week 3 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  4: [
    ['lesson-1', 'Lesson 1 · AI for Email and Meeting Summaries'], ['lesson-2', 'Lesson 2 · AI for Research and Brainstorming'],
    ['lesson-3', 'Lesson 3 · AI for Presentations and Project Planning'], ['lesson-4', 'Lesson 4 · Task Organization and Workflow Automation'],
    ['lesson-5', 'Lesson 5 · Productivity Gains and Human Review'], ['practice-4', 'AI Productivity Comparison Lab'], ['build-4', 'AI for Productivity'],
    ['assessment-4', 'Week 4 Knowledge Check', 'Assignment'], ['assessment-discussion-2', 'Discussion 2', 'Assignment'], ['submit-4', 'Week 4 Submission', 'Assignment'],
    ['reflect-4', 'Week 4 Reflection'], ['resources-4', 'Week 4 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  5: [
    ['lesson-1', 'Lesson 1 · AI Decision Support'], ['lesson-2', 'Lesson 2 · Recommendations and Missing Information'],
    ['lesson-3', 'Lesson 3 · Comparing Alternative Solutions'], ['lesson-4', 'Lesson 4 · Verification and Automation Bias'],
    ['lesson-5', 'Lesson 5 · Human-in-the-Loop and Manager Accountability'], ['practice-5', 'Manager Decision Practice Lab'],
    ['case-5', 'Management Case · AI-Assisted Decision'], ['build-5', 'Manager Decision Assistant'], ['assessment-5', 'Week 5 Knowledge Check', 'Assignment'],
    ['assessment-quiz-2', 'Quiz 2', 'Assignment'], ['submit-5', 'Week 5 Submission', 'Assignment'], ['reflect-5', 'Week 5 Reflection'], ['resources-5', 'Week 5 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  6: [
    ['lesson-1', 'Lesson 1 · What Is AI Ethics?'], ['lesson-2', 'Lesson 2 · Bias & Fairness'], ['lesson-3', 'Lesson 3 · Privacy & Data Ethics'],
    ['lesson-4', 'Lesson 4 · Transparency & Explainability'], ['lesson-5', 'Lesson 5 · Accountability'], ['lesson-6', 'Lesson 6 · Human Oversight'],
    ['lesson-7', 'Lesson 7 · AI Reliability & Hallucinations'], ['lesson-8', 'Lesson 8 · Stakeholder Impact'], ['practice-ethics', 'Ethics Decision Lab'],
    ['practice-bias', 'Bias Practice'], ['practice-privacy', 'Privacy Decision Lab'], ['practice-verify', 'AI Verification Exercise'],
    ['case-brightpath', 'BrightPath Manufacturing Case'], ['build-ethics', 'AI Ethics Checker'], ['assessment-knowledge', 'Week 6 Knowledge Check', 'Assignment'],
    ['assessment-discussion', 'Discussion 3', 'Assignment'], ['submit-ethics', 'AI Ethics Risk Assessment', 'Assignment'], ['reflect-ethics', 'Week 6 Reflection'], ['resources-ethics', 'Week 6 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  7: [
    ['lesson-1', 'Lesson 1 · What Is Responsible AI?'], ['lesson-2', 'Lesson 2 · What Is AI Governance?'], ['lesson-3', 'Lesson 3 · Policy ≠ Governance'],
    ['lesson-4', 'Lesson 4 · NIST GOVERN'], ['lesson-5', 'Lesson 5 · NIST MAP'], ['lesson-6', 'Lesson 6 · NIST MEASURE'], ['lesson-7', 'Lesson 7 · NIST MANAGE'],
    ['lesson-8', 'Lesson 8 · AI Policies'], ['lesson-9', 'Lesson 9 · Data Governance'], ['lesson-10', 'Lesson 10 · Incident Response'], ['lesson-11', 'Lesson 11 · Continuous Monitoring'],
    ['practice-roles', 'Governance Role Activity'], ['practice-map', 'Palmetto AI Use Case Map'], ['practice-deploy', 'Before You Deploy'],
    ['practice-treatment', 'Risk Treatment Activity'], ['practice-data', 'Data Governance Decision'], ['practice-maturity', 'AI Governance Maturity'],
    ['case-governance', 'Palmetto Governance Simulation'], ['build-policy', 'Responsible AI Policy Builder'], ['connect-builds', 'Connect Your Week 6 & Week 7 Builds'],
    ['assessment-test', 'Test 1', 'Assignment'], ['assessment-guide', 'Test 1 Study Guide', 'Assignment'], ['assessment-capstone', 'Final Governance Challenge', 'Assignment'],
    ['submit-policy', 'Responsible AI Policy', 'Assignment'], ['reflect-policy', 'Week 7 Reflection'], ['resources-policy', 'Week 7 Resources'],
  ].map(([id, title, category]) => ({ id, title, category: category as SearchCategory | undefined })),
  8: standardSearchItems(8, ['AI in Leadership and Communication', 'Planning and Project Management', 'AI Agents and Agentic AI', 'Manager AI Assistant', 'Human-in-the-Loop Decisions', 'Discussion 4: Trust and Verification'], 'Manager AI Assistant', 'Week 8 Decision Memo'),
  9: standardSearchItems(9, ['Why Fluent Output Fails', 'Source Quality', 'Claim Verification', 'Calculation Checks', 'Uncertainty and Limits', 'Correction Workflows'], 'AI Verification Center', 'Week 9 Verification Audit'),
  10: [
    ...standardSearchItems(10, ['Academic Integrity', 'Support vs. Substitution', 'Attribution', 'Disclosure Quality', 'Verification Records', 'Accountable Authorship'], 'AI Use / Disclosure Log', 'Week 10 Integrity Check'),
    { id: 'quiz-10-lesson-1', title: 'Quiz 1 · Lesson 1: Academic Integrity', category: 'Assignment' },
    { id: 'quiz-10-lesson-2', title: 'Quiz 2 · Lesson 2: Support vs. Substitution', category: 'Assignment' },
    { id: 'quiz-10-lesson-3', title: 'Quiz 3 · Lesson 3: Attribution', category: 'Assignment' },
    { id: 'quiz-10-lesson-4', title: 'Quiz 4 · Lesson 4: Disclosure Quality', category: 'Assignment' },
    { id: 'assignment-10-lesson-1', title: 'Assignment · Academic Integrity Decision', category: 'Assignment' },
    { id: 'assignment-10-lesson-2', title: 'Assignment · Support vs. Substitution', category: 'Assignment' },
    { id: 'assignment-10-lesson-3', title: 'Assignment · Attribution', category: 'Assignment' },
    { id: 'assignment-10-lesson-4', title: 'Assignment · Disclosure Quality', category: 'Assignment' },
  ],
  11: [
    ...standardSearchItems(11, ['Human Dignity', 'Truthfulness', 'Justice and Fairness', 'Stewardship', 'Responsibility', 'Moral Discernment'], 'Values-Based AI Decision Framework', 'Week 11 Values Case'),
    { id: 'quiz-11-lesson-1', title: 'Quiz 1 · Lesson 1: Human Dignity in AI-Enabled Work', category: 'Assignment' },
    { id: 'quiz-11-lesson-2', title: 'Quiz 2 · Lesson 2: Truthfulness in AI-Enabled Work', category: 'Assignment' },
    { id: 'quiz-11-lesson-3', title: 'Quiz 3 · Lesson 3: Justice and Fairness in AI-Enabled Work', category: 'Assignment' },
    { id: 'quiz-11-lesson-4', title: 'Quiz 4 · Lesson 4: Stewardship in AI-Enabled Work', category: 'Assignment' },
  ],
  12: standardSearchItems(12, ['Tasks vs. Jobs', 'Automation and Augmentation', 'Human Skills', 'Worker Voice', 'Reskilling', 'Transition Risk'], 'Workforce Impact Map', 'Week 12 Workforce Case'),
  13: standardSearchItems(13, ['Problem and Stakeholder Fit', 'Benefits and Risks', 'Controls and Ownership', 'Training and Change', 'Timeline and Pilot', 'KPIs and Stop Conditions'], 'AI Implementation Plan', 'Week 13 Implementation Review'),
  14: standardSearchItems(14, ['Acceptance Criteria', 'Usability Testing', 'Peer Feedback', 'Risk and Safeguard Testing', 'Revision Priorities', 'Release Readiness'], 'Dashboard Testing and Revision Record', 'Week 14 Peer Product Review'),
  15: [
    ...['Course Synthesis: From Problem to Product', 'AI Tools, Prompting, and Verification', 'Productivity, Decisions, and Automation', 'Ethics, Bias, Privacy, and Human Oversight', 'Governance, Disclosure, and Accountability', 'Values, Workforce, and Organizational Impact', 'Implementation, Measurement, and Adoption'].map((title, index) => ({ id: `lesson-${index + 1}`, title: `Lesson ${index + 1} · ${title}` })),
    { id: 'practice-15', title: 'Final Defense Rehearsal' }, { id: 'build-15', title: 'Final Integrated Dashboard' },
    { id: 'assessment-final-exam', title: 'Final Exam · Cumulative Weeks 1–15', category: 'Assignment' },
    { id: 'submit-final-paper', title: 'Final Paper · AI Management Synthesis', category: 'Assignment' },
    { id: 'submit-final-dashboard', title: 'Final Dashboard Portfolio and Defense', category: 'Assignment' },
    { id: 'reflect-15', title: 'Final Reflection' }, { id: 'resources-15', title: 'Final Review Resources' },
  ],
};

function standardSearchItems(week: number, lessons: string[], artifact: string, assessment: string): ModuleSearchItem[] {
  return [
    ...lessons.map((title, index) => ({ id: `lesson-${index + 1}`, title: `Lesson ${index + 1} · ${title}` })),
    { id: `practice-${week}`, title: 'Manager Practice Lab' },
    { id: `build-${week}`, title: artifact },
    { id: `assessment-${week}`, title: assessment, category: 'Assignment' },
    { id: `submit-${week}`, title: week === 8 ? 'Manager AI Assistant and decision memo' : week === 9 ? 'AI Verification Center and three-claim audit' : week === 10 ? 'AI Use / Disclosure Log and integrity reflection' : week === 11 ? 'Values-Based AI Decision Framework and decision memo' : week === 12 ? 'Workforce Impact Map and management recommendation' : week === 13 ? 'AI Implementation Plan and rollout recommendation' : week === 14 ? 'Testing record, peer feedback, and revision evidence' : `Week ${week} Submission`, category: 'Assignment' },
    { id: `reflect-${week}`, title: `Week ${week} Reflection` },
    { id: `resources-${week}`, title: `Week ${week} Resources` },
  ];
}

const courseAreas = [
  ['Course Home', 'home', 'dashboard announcements progress current module'],
  ['Course Content', 'content', 'weeks modules lessons activities'],
  ['Assignments', 'assignments', 'tasks deadlines due dates priority'],
  ['Discussions', 'discussions', 'discussion posts participation'],
  ['My Grades', 'grades', 'grades progress weights'],
  ['Messages & Help', 'messages', 'support technical team instructions help'],
  ['AI Toolkit', 'toolkit', 'prompt builder research decision workflow briefing'],
  ['Syllabus', 'syllabus', 'course policies schedule expectations'],
] as const;

const toolkitItems = [
  ['Research a question', 'evidence-backed research brief sources verification'],
  ['Prepare a decision', 'decision memo options tradeoffs assumptions risks'],
  ['Improve a workflow', 'AI assistance process owner checkpoint recovery'],
  ['Draft a briefing', 'management briefing recommendation evidence audience action'],
] as const;

const searchIndex: SearchItem[] = [
  ...courseAreas.map(([title, view, keywords]) => ({ id: `area-${view}`, category: 'Course area' as const, title, detail: 'Course area', keywords, action: { view } })),
  ...weekData.map(([week, title, keywords]) => ({ id: `week-${week}`, category: 'Week' as const, title: `Week ${week}: ${title}`, detail: 'Open module overview', keywords: `${keywords} week ${week}`, action: { view: 'content', week } })),
  ...Object.entries(moduleItems).flatMap(([week, items]) => items.map((item) => ({
    id: `module-${week}-${item.id}`,
    category: item.category || 'Lesson & activity',
    title: item.title,
    detail: `Week ${week}`,
    keywords: `${item.title} ${item.keywords || ''} week ${week}`,
    action: { view: 'content', week: Number(week), itemTitle: item.title },
  }))),
  ...toolkitItems.map(([title, keywords], index) => ({ id: `toolkit-${index}`, category: 'AI Toolkit' as const, title, detail: 'Toolkit starter', keywords, action: { view: 'toolkit', text: title } })),
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[’'“”"–—·/:(),?]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreItem(item: SearchItem, query: string) {
  const q = normalize(query);
  const words = q.split(' ').filter(Boolean);
  const title = normalize(item.title);
  const detail = normalize(item.detail);
  const haystack = `${title} ${detail} ${normalize(item.keywords)}`;
  if (!words.every((word) => haystack.includes(word))) return 0;
  let score = 10;
  if (title === q) score += 120;
  if (title.startsWith(q)) score += 80;
  else if (title.includes(q)) score += 55;
  if (detail.includes(q)) score += 20;
  score += words.reduce((total, word) => total + (title.includes(word) ? 12 : 4), 0);
  return score;
}

function findButtonByText(selector: string, text: string) {
  return Array.from(document.querySelectorAll<HTMLButtonElement>(selector)).find((button) => normalize(button.textContent || '').includes(normalize(text)));
}

function clearNativeSearch() {
  const input = document.querySelector<HTMLInputElement>('.portalSearch input');
  if (!input) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, '');
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function getSelectedWeek() {
  const selected = document.querySelector<HTMLButtonElement>('.moduleList button.selected');
  const value = Number(selected?.querySelector('span')?.textContent || '');
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function saveResume(position: ResumePosition) {
  const next = { ...position, updatedAt: Date.now() };
  window.localStorage.setItem('aim-resume-position-v1', JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('aim-resume-updated', { detail: next }));
}

function inferResumePosition(): ResumePosition {
  try {
    const saved = JSON.parse(window.localStorage.getItem('aim-resume-position-v1') || 'null') as ResumePosition | null;
    if (saved?.week) return saved;
  } catch { /* fall through to progress inference */ }

  let moduleSteps: Record<string, boolean> = {};
  let completions: Record<string, boolean> = {};
  try { moduleSteps = JSON.parse(window.localStorage.getItem('aim-module-steps-v1') || '{}'); } catch { /* ignore */ }
  try { completions = JSON.parse(window.localStorage.getItem('aim-structured-module-completions-v1') || '{}'); } catch { /* ignore */ }

  const progressedWeeks = new Set<number>();
  Object.entries(moduleSteps).forEach(([key, complete]) => { if (complete) progressedWeeks.add(Number(key.split('-')[0])); });
  Object.entries(completions).forEach(([key, complete]) => { if (complete) progressedWeeks.add(Number(key.split('-')[0])); });
  const highest = Math.max(0, ...Array.from(progressedWeeks).filter((week) => Number.isFinite(week)));
  if (!highest) return { week: 1 };

  const structured = moduleItems[highest];
  if (structured?.length) {
    const nextItem = structured.find((item) => !completions[`${highest}-${item.id}`]);
    if (!nextItem && highest < 15) return { week: highest + 1 };
    if (nextItem) return { week: highest, itemTitle: nextItem.title };
  }

  const labels = ['Learn', 'Create', 'Test', 'Manage', 'Present'];
  const done = labels.every((label) => moduleSteps[`${highest}-${label}`]);
  return { week: done && highest < 15 ? highest + 1 : highest };
}

export default function QolEnhancements() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [resume, setResume] = useState<ResumePosition>({ week: 1 });
  const [continueHost, setContinueHost] = useState<HTMLElement | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchIndex
      .map((item) => ({ item, score: scoreItem(item, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 14)
      .map((entry) => entry.item);
  }, [query]);

  function closeSearch() {
    clearNativeSearch();
    setQuery('');
    setSelectedIndex(0);
    setOpen(false);
  }

  function rememberSearch(value: string) {
    const cleaned = value.trim();
    if (!cleaned) return;
    const next = [cleaned, ...recent.filter((item) => normalize(item) !== normalize(cleaned))].slice(0, 5);
    setRecent(next);
    window.localStorage.setItem('aim-search-recent-v1', JSON.stringify(next));
  }

  function navigate(action: SearchAction) {
    const viewLabel: Record<string, string> = {
      home: 'Course Home', content: 'Course Content', assignments: 'Assignments', discussions: 'Discussions', grades: 'My Grades', messages: 'Messages & Help', toolkit: 'AI Toolkit', syllabus: 'Syllabus',
    };
    const label = action.view ? viewLabel[action.view] : undefined;
    const navButton = label ? findButtonByText('.courseSidebar nav button', label) : undefined;
    navButton?.click();

    if (action.week) {
      saveResume({ week: action.week, itemTitle: action.itemTitle });
      window.setTimeout(() => {
        const weekButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.moduleList button'));
        const weekButton = weekButtons.find((button) => Number(button.querySelector('span')?.textContent || '') === action.week);
        weekButton?.click();
        if (action.itemTitle) {
          window.setTimeout(() => {
            const itemButton = findButtonByText('.moduleCard', action.itemTitle!);
            itemButton?.click();
          }, 140);
        }
      }, 90);
    } else if (action.text) {
      window.setTimeout(() => {
        const target = Array.from(document.querySelectorAll<HTMLElement>('button, h3, h4, strong')).find((node) => normalize(node.textContent || '').includes(normalize(action.text!)));
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (target instanceof HTMLButtonElement && action.view === 'toolkit') target.click();
      }, 120);
    }
  }

  function choose(item: SearchItem) {
    rememberSearch(query || item.title);
    navigate(item.action);
    closeSearch();
  }

  function continueCourse() {
    navigate({ view: 'content', week: resume.week, itemTitle: resume.itemTitle });
  }

  useEffect(() => {
    try { setRecent(JSON.parse(window.localStorage.getItem('aim-search-recent-v1') || '[]').slice(0, 5)); } catch { /* ignore */ }
    setResume(inferResumePosition());

    const input = document.querySelector<HTMLInputElement>('.portalSearch input');
    if (!input) return;

    const handleInput = () => { setQuery(input.value); setSelectedIndex(0); setOpen(true); };
    const handleFocus = () => { setQuery(input.value); setOpen(true); };
    const handleGlobalKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
        setQuery(input.value);
        setOpen(true);
      } else if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        input.focus();
        setOpen(true);
      } else if (event.key === 'Escape' && open) {
        closeSearch();
      }
    };
    const handleInputKey = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelectedIndex((current) => Math.min(current + 1, Math.max(0, results.length - 1))); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelectedIndex((current) => Math.max(0, current - 1)); }
      if (event.key === 'Enter' && results[selectedIndex]) { event.preventDefault(); choose(results[selectedIndex]); }
    };

    input.addEventListener('input', handleInput);
    input.addEventListener('focus', handleFocus);
    input.addEventListener('keydown', handleInputKey);
    window.addEventListener('keydown', handleGlobalKey);
    return () => {
      input.removeEventListener('input', handleInput);
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('keydown', handleInputKey);
      window.removeEventListener('keydown', handleGlobalKey);
    };
  }, [open, results, selectedIndex]);

  useEffect(() => {
    const syncHost = () => setContinueHost(document.querySelector<HTMLElement>('.welcomeBanner > div:first-child'));
    syncHost();
    const observer = new MutationObserver(syncHost);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResume = (event: Event) => setResume((event as CustomEvent<ResumePosition>).detail || inferResumePosition());
    const trackNavigation = (event: MouseEvent) => {
      const button = (event.target as HTMLElement | null)?.closest('button');
      if (!button) return;
      if (button.closest('.moduleList')) {
        const week = Number(button.querySelector('span')?.textContent || '');
        if (week) saveResume({ week });
      } else if (button.closest('.moduleCard')) {
        const week = getSelectedWeek();
        const title = button.querySelector('strong')?.textContent?.trim();
        saveResume({ week, itemTitle: title || undefined });
      } else if (button.closest('.learningSequence')) {
        saveResume({ week: getSelectedWeek() });
      }
    };
    window.addEventListener('aim-resume-updated', handleResume);
    document.addEventListener('click', trackNavigation, true);
    return () => {
      window.removeEventListener('aim-resume-updated', handleResume);
      document.removeEventListener('click', trackNavigation, true);
    };
  }, []);

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});
  const resultIndex = new Map(results.map((item, index) => [item.id, index]));

  return <>
    {open && <div className="qolSearchBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
      <section className="qolSearchPanel" role="dialog" aria-label="Search course">
        <header><div><span>⌕</span><strong>{query.trim() ? `Search results for “${query.trim()}”` : 'Search the entire course'}</strong></div><kbd>ESC</kbd></header>
        {!query.trim() ? <div className="qolSearchEmpty">
          <p>Search weeks, lessons, activities, quizzes, assignments, course areas, and AI Toolkit starters.</p>
          {recent.length > 0 && <><strong>RECENT SEARCHES</strong><div className="qolRecent">{recent.map((item) => <button type="button" key={item} onClick={() => {
            const input = document.querySelector<HTMLInputElement>('.portalSearch input');
            if (!input) return;
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setter?.call(input, item);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.focus();
          }}>{item}</button>)}</div></>}
          <small><kbd>⌘/Ctrl K</kbd> opens search · <kbd>/</kbd> also works · use ↑ ↓ and Enter</small>
        </div> : results.length ? <div className="qolGroups">
          {Object.entries(grouped).map(([category, items]) => <div className="qolGroup" key={category}><span>{category.toUpperCase()}</span>{items.map((item) => {
            const index = resultIndex.get(item.id) ?? 0;
            return <button className={index === selectedIndex ? 'selected' : ''} type="button" key={item.id} onMouseEnter={() => setSelectedIndex(index)} onClick={() => choose(item)}><div><strong>{item.title}</strong><small>{item.detail}</small></div><i>→</i></button>;
          })}</div>)}
        </div> : <div className="qolNoResults"><strong>No matches yet.</strong><p>Try a topic such as “productivity,” “Week 7,” “attribution,” “hallucinations,” or “decision.”</p></div>}
        {query.trim() && results.length > 0 && <footer><span>{results.length} best match{results.length === 1 ? '' : 'es'}</span><span>↑ ↓ navigate · Enter open</span></footer>}
      </section>
    </div>}

    {continueHost && createPortal(<div className="qolContinueCard">
      <div><span>CONTINUE WHERE YOU LEFT OFF</span><strong>Week {resume.week}{resume.itemTitle ? ` · ${resume.itemTitle}` : ''}</strong></div>
      <button type="button" onClick={continueCourse}>Continue →</button>
    </div>, continueHost)}

    <style jsx global>{`
      .portalSearch { position: relative; }
      .portalSearch::after { content: '⌘K'; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); padding: 3px 6px; border: 1px solid rgba(255,255,255,.22); border-radius: 5px; color: rgba(255,255,255,.7); font-size: 10px; font-weight: 700; letter-spacing: .04em; pointer-events: none; }
      .portalSearch input { padding-right: 48px !important; }
      .qolSearchBackdrop { position: fixed; inset: 0; z-index: 9999; background: rgba(10,18,27,.34); backdrop-filter: blur(2px); display: flex; align-items: flex-start; justify-content: center; padding: 72px 18px 24px; }
      .qolSearchPanel { width: min(760px, 100%); max-height: min(720px, calc(100vh - 100px)); overflow: hidden; display: flex; flex-direction: column; background: #fff; border: 1px solid #d9e2ea; border-radius: 14px; box-shadow: 0 28px 80px rgba(19,39,57,.24); color: #172a3a; }
      .qolSearchPanel > header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 18px; border-bottom: 1px solid #e7edf2; }
      .qolSearchPanel > header div { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .qolSearchPanel > header span { font-size: 22px; color: #2d658f; }
      .qolSearchPanel > header strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .qolSearchPanel kbd, .qolSearchEmpty kbd { font: 700 10px/1.2 var(--font-geist-mono), monospace; padding: 4px 6px; border: 1px solid #ccd7df; border-bottom-width: 2px; border-radius: 5px; background: #f8fafc; color: #526879; }
      .qolGroups { overflow-y: auto; padding: 8px 0 12px; }
      .qolGroup > span { display: block; padding: 12px 18px 7px; color: #6c8292; font-size: 9px; font-weight: 800; letter-spacing: .14em; }
      .qolGroup > button { width: calc(100% - 16px); margin: 0 8px; padding: 11px 12px; border: 0; border-radius: 8px; background: transparent; display: flex; align-items: center; justify-content: space-between; gap: 14px; text-align: left; color: inherit; cursor: pointer; }
      .qolGroup > button:hover, .qolGroup > button.selected { background: #eef5fa; }
      .qolGroup button div { min-width: 0; display: grid; gap: 3px; }
      .qolGroup button strong { font-size: 13px; }
      .qolGroup button small { color: #718696; font-size: 11px; }
      .qolGroup button i { color: #477898; font-style: normal; }
      .qolSearchPanel > footer { display: flex; justify-content: space-between; gap: 12px; padding: 10px 16px; border-top: 1px solid #e7edf2; color: #778b99; font-size: 10px; }
      .qolSearchEmpty, .qolNoResults { padding: 28px 22px; }
      .qolSearchEmpty p, .qolNoResults p { margin: 0 0 18px; color: #597080; }
      .qolSearchEmpty > strong { display: block; margin-bottom: 8px; color: #6c8292; font-size: 9px; letter-spacing: .12em; }
      .qolRecent { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
      .qolRecent button { border: 1px solid #d7e1e8; background: #f8fafc; border-radius: 999px; padding: 6px 10px; color: #31546c; cursor: pointer; }
      .qolSearchEmpty small { color: #718696; }
      .qolContinueCard { margin-top: 16px; padding: 13px 14px; border: 1px solid rgba(255,255,255,.35); border-radius: 10px; background: rgba(255,255,255,.12); display: flex; align-items: center; justify-content: space-between; gap: 14px; }
      .qolContinueCard div { display: grid; gap: 3px; min-width: 0; }
      .qolContinueCard div span { font-size: 9px; font-weight: 800; letter-spacing: .12em; opacity: .8; }
      .qolContinueCard div strong { font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .qolContinueCard button { flex: 0 0 auto; border: 0; border-radius: 7px; padding: 8px 11px; background: #fff; color: #17364c; font-weight: 800; cursor: pointer; }
      @media (max-width: 680px) {
        .portalSearch::after { content: '⌘K'; right: 7px; }
        .qolSearchBackdrop { padding: 58px 8px 8px; }
        .qolSearchPanel { max-height: calc(100vh - 66px); border-radius: 10px; }
        .qolContinueCard { align-items: stretch; flex-direction: column; }
        .qolContinueCard button { width: 100%; }
      }
    `}</style>
  </>;
}
