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
type ResumePosition = { week: number; itemTitle?: string; updatedAt?: number };

const weekData = [
  [1, 'Orient & prototype', 'generative AI models applications capabilities limits safe use prototype trust boundary'],
  [2, 'Deploy & use', 'prompting context human oversight responsible data deploy dashboard deadlines priorities progress'],
  [3, 'Research & know', 'research sources citation verification knowledge management resource library evidence brief'],
  [4, 'Analyze & decide', 'managerial data analysis bias uncertainty decision support calculations recommendation'],
  [5, 'Automate & coordinate', 'workflow bots agents automation checkpoints permissions recovery owners escalation'],
  [6, 'AI Ethics: When Does Using AI Become Unethical?', 'ethics bias fairness privacy transparency explainability accountability human oversight BrightPath'],
  [7, 'Responsible AI & Governance', 'governance confidentiality verification accountability incident reporting NIST policy Palmetto'],
  [8, 'AI in Management', 'leadership communication planning project management agents decision support human judgment'],
  [9, 'Accuracy, Hallucinations, and Verification', 'hallucination sources claims calculation uncertainty verification correction confidence'],
  [10, 'AI and Plagiarism', 'academic integrity attribution disclosure original work support substitution copyright'],
  [11, 'Christian Perspective on AI', 'human dignity truthfulness justice fairness stewardship responsibility moral discernment values'],
  [12, 'AI and the Workforce', 'tasks jobs automation augmentation worker voice reskilling transition human skills'],
  [13, 'Measure value', 'business case adoption metrics quality costs benefits KPI scorecard investment'],
  [14, 'Lead adoption', 'stakeholders change readiness training resistance rollout feedback implementation'],
  [15, 'Integrate & defend', 'final dashboard portfolio defense testing deployment exam paper synthesis'],
] as const;

const lessonData: Record<number, string[]> = {
  6: [
    'Lesson 1 · What Is AI Ethics?', 'Lesson 2 · Bias & Fairness', 'Lesson 3 · Privacy & Data Ethics', 'Lesson 4 · Transparency & Explainability',
    'Lesson 5 · Accountability', 'Lesson 6 · Human Oversight', 'Lesson 7 · AI Reliability & Hallucinations', 'Lesson 8 · Stakeholder Impact',
    'Ethics Decision Lab', 'Bias Practice', 'Privacy Decision Lab', 'AI Verification Exercise', 'BrightPath Manufacturing Case',
    'AI Ethics Checker', 'Week 6 Knowledge Check', 'Discussion 3', 'AI Ethics Risk Assessment', 'Week 6 Reflection', 'Week 6 Resources',
  ],
  7: [
    'Lesson 1 · What Is Responsible AI?', 'Lesson 2 · What Is AI Governance?', 'Lesson 3 · Policy ≠ Governance', 'Lesson 4 · NIST GOVERN',
    'Lesson 5 · NIST MAP', 'Lesson 6 · NIST MEASURE', 'Lesson 7 · NIST MANAGE', 'Lesson 8 · AI Policies', 'Lesson 9 · Data Governance',
    'Lesson 10 · Incident Response', 'Lesson 11 · Continuous Monitoring', 'Governance Role Activity', 'Palmetto AI Use Case Map',
    'Before You Deploy', 'Risk Treatment Activity', 'Data Governance Decision', 'AI Governance Maturity', 'Palmetto Governance Simulation',
    'Responsible AI Policy Builder', 'Connect Your Week 6 & Week 7 Builds', 'Test 1', 'Test 1 Study Guide', 'Final Governance Challenge',
    'Responsible AI Policy', 'Week 7 Reflection', 'Week 7 Resources',
  ],
  8: ['Lesson 1 · AI in Leadership and Communication', 'Lesson 2 · Planning and Project Management', 'Lesson 3 · AI Agents and Agentic AI', 'Lesson 4 · Manager AI Assistant', 'Lesson 5 · Human-in-the-Loop Decisions', 'Lesson 6 · Discussion 4: Trust and Verification', 'Manager Practice Lab', 'Manager AI Assistant', 'Week 8 Decision Memo', 'Week 8 Reflection', 'Week 8 Resources'],
  9: ['Lesson 1 · Why Fluent Output Fails', 'Lesson 2 · Source Quality', 'Lesson 3 · Claim Verification', 'Lesson 4 · Calculation Checks', 'Lesson 5 · Uncertainty and Limits', 'Lesson 6 · Correction Workflows', 'Manager Practice Lab', 'AI Verification Center', 'Week 9 Verification Audit', 'Week 9 Reflection', 'Week 9 Resources'],
  10: ['Lesson 1 · Academic Integrity', 'Lesson 2 · Support vs. Substitution', 'Lesson 3 · Attribution', 'Lesson 4 · Disclosure Quality', 'Lesson 5 · Verification Records', 'Lesson 6 · Accountable Authorship', 'Manager Practice Lab', 'AI Use / Disclosure Log', 'Week 10 Integrity Check', 'Week 10 Reflection', 'Week 10 Resources'],
  11: ['Lesson 1 · Human Dignity', 'Lesson 2 · Truthfulness', 'Lesson 3 · Justice and Fairness', 'Lesson 4 · Stewardship', 'Lesson 5 · Responsibility', 'Lesson 6 · Moral Discernment', 'Manager Practice Lab', 'Values-Based AI Decision Framework', 'Week 11 Values Case', 'Week 11 Reflection', 'Week 11 Resources'],
  12: ['Lesson 1 · Tasks vs. Jobs', 'Lesson 2 · Automation and Augmentation', 'Lesson 3 · Human Skills', 'Lesson 4 · Worker Voice', 'Lesson 5 · Reskilling', 'Lesson 6 · Transition Risk', 'Manager Practice Lab', 'Workforce Impact Map', 'Week 12 Workforce Case', 'Week 12 Reflection', 'Week 12 Resources'],
  13: ['Lesson 1 · Problem and Stakeholder Fit', 'Lesson 2 · Benefits and Risks', 'Lesson 3 · Controls and Ownership', 'Lesson 4 · Training and Change', 'Lesson 5 · Timeline and Pilot', 'Lesson 6 · KPIs and Stop Conditions', 'Manager Practice Lab', 'AI Implementation Plan', 'Week 13 Implementation Review', 'Week 13 Reflection', 'Week 13 Resources'],
  14: ['Lesson 1 · Acceptance Criteria', 'Lesson 2 · Usability Testing', 'Lesson 3 · Peer Feedback', 'Lesson 4 · Risk and Safeguard Testing', 'Lesson 5 · Revision Priorities', 'Lesson 6 · Release Readiness', 'Manager Practice Lab', 'Dashboard Testing and Revision Record', 'Week 14 Peer Product Review', 'Week 14 Reflection', 'Week 14 Resources'],
  15: ['Course Synthesis: From Problem to Product', 'AI Tools, Prompting, and Verification', 'Productivity, Decisions, and Automation', 'Ethics, Bias, Privacy, and Human Oversight', 'Governance, Disclosure, and Accountability', 'Values, Workforce, and Organizational Impact', 'Implementation, Measurement, and Adoption', 'Final Integrated AI Management Dashboard'],
};

const assignmentData = [
  ['Set up team operating agreement', 'Team setup'],
  ['Prototype the Week 1 dashboard structure', 'Course build'],
  ['Document AI use and verification notes', 'AI accountability'],
  ['Run the Week 1 knowledge check', 'Learning'],
  ['Submit the dashboard starter version', 'Course build'],
  ['Week 6 AI Ethics Checker', 'Course build'],
  ['Discussion 3: When Does Using AI Become Unethical?', 'Discussion'],
  ['Week 7 Responsible AI Policy', 'Course build'],
  ['Test 1: Weeks 1–7', 'Assessment'],
] as const;

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
  ...Object.entries(lessonData).flatMap(([week, items]) => items.map((title, index) => ({ id: `lesson-${week}-${index}`, category: 'Lesson & activity' as const, title, detail: `Week ${week}`, keywords: `${title} week ${week}`, action: { view: 'content', week: Number(week), itemTitle: title } }))),
  ...assignmentData.map(([title, category], index) => ({ id: `assignment-${index}`, category: 'Assignment' as const, title, detail: category, keywords: `${title} ${category}`, action: { view: 'assignments', text: title } })),
  ...toolkitItems.map(([title, keywords], index) => ({ id: `toolkit-${index}`, category: 'AI Toolkit' as const, title, detail: 'Toolkit starter', keywords, action: { view: 'toolkit', text: title } })),
];

const structuredIds: Record<number, string[]> = {
  6: ['lesson-1','lesson-2','lesson-3','lesson-4','lesson-5','lesson-6','lesson-7','lesson-8','practice-ethics','practice-bias','practice-privacy','practice-verify','case-brightpath','build-ethics','assessment-knowledge','assessment-discussion','submit-ethics','reflect-ethics','resources-ethics'],
  7: ['lesson-1','lesson-2','lesson-3','lesson-4','lesson-5','lesson-6','lesson-7','lesson-8','lesson-9','lesson-10','lesson-11','practice-roles','practice-map','practice-deploy','practice-treatment','practice-data','practice-maturity','case-governance','build-policy','connect-builds','assessment-test','assessment-guide','assessment-capstone','submit-policy','reflect-policy','resources-policy'],
};

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

  if (highest <= 5) {
    const labels = ['Learn', 'Create', 'Test', 'Manage', 'Present'];
    const done = labels.every((label) => moduleSteps[`${highest}-${label}`]);
    return { week: done && highest < 15 ? highest + 1 : highest };
  }

  const ids = structuredIds[highest];
  if (ids?.length) {
    const nextId = ids.find((id) => !completions[`${highest}-${id}`]);
    if (!nextId && highest < 15) return { week: highest + 1 };
    if (nextId) {
      const titles = lessonData[highest] || [];
      const index = ids.indexOf(nextId);
      return { week: highest, itemTitle: titles[index] };
    }
  }
  return { week: highest };
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
        setOpen(false);
      }
    };
    const handleInputKey = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelectedIndex((current) => Math.min(current + 1, Math.max(0, results.length - 1))); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelectedIndex((current) => Math.max(0, current - 1)); }
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
  }, [open, results.length]);

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
          }, 120);
        }
      }, 80);
    } else if (action.text) {
      window.setTimeout(() => {
        const target = Array.from(document.querySelectorAll<HTMLElement>('button, h3, h4, strong')).find((node) => normalize(node.textContent || '').includes(normalize(action.text!)));
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (target instanceof HTMLButtonElement && action.view === 'toolkit') target.click();
      }, 100);
    }
  }

  function choose(item: SearchItem) {
    rememberSearch(query || item.title);
    navigate(item.action);
    clearNativeSearch();
    setQuery('');
    setOpen(false);
  }

  function continueCourse() {
    navigate({ view: 'content', week: resume.week, itemTitle: resume.itemTitle });
  }

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});
  const resultIndex = new Map(results.map((item, index) => [item.id, index]));

  return <>
    {open && <div className="qolSearchBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="qolSearchPanel" role="dialog" aria-label="Search course">
        <header><div><span>⌕</span><strong>{query.trim() ? `Search results for “${query.trim()}”` : 'Search the entire course'}</strong></div><kbd>ESC</kbd></header>
        {!query.trim() ? <div className="qolSearchEmpty">
          <p>Search weeks, lessons, activities, assignments, course areas, and AI Toolkit starters.</p>
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
            return <button className={index === selectedIndex ? 'selected' : ''} type="button" key={item.id} onMouseEnter={() => setSelectedIndex(index)} onClick={() => choose(item)} onKeyDown={(event) => { if (event.key === 'Enter') choose(item); }}><div><strong>{item.title}</strong><small>{item.detail}</small></div><i>→</i></button>;
          })}</div>)}
        </div> : <div className="qolNoResults"><strong>No matches yet.</strong><p>Try a topic such as “privacy,” “Week 7,” “hallucinations,” “grades,” or “decision.”</p></div>}
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
