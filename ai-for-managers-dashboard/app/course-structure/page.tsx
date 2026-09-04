'use client';

import { useMemo, useState } from 'react';
import styles from './structure.module.css';

const weeks = [
  ['Week 1', 'What AI Is', 'Create the first AI Management Dashboard: name, purpose, target user, management problem, homepage, navigation, and placeholders for future sections.'],
  ['Week 2', 'AI Tools for Managers', 'Add an AI Tools page comparing at least three tools by purpose, use, strengths, limitations, risks, and management use cases.'],
  ['Week 3', 'Prompt Engineering', 'Add a Prompt Library with management prompts and selected before/after prompt and response examples.'],
  ['Week 4', 'AI for Productivity', 'Add an AI Productivity section comparing a normal management task with an AI-assisted process, including time, quality, risk, and human review.'],
  ['Week 5', 'AI-Assisted Managerial Decisions', 'Add a Manager Decision Assistant that records the problem, AI analysis, recommendation, alternatives, missing information, risks, and final human decision.'],
  ['Week 6', 'AI Ethics', 'Add an AI Ethics Checker / Risk Assessment covering sensitive information, bias, harm, human review, explainability, verification, accountability, and risk level.'],
  ['Week 7', 'Responsible AI and Governance', 'Add a Responsible AI Policy covering approved uses, prohibited uses, confidentiality, verification, human review, disclosure, and accountability.'],
  ['Week 8', 'AI and Management', 'Add a Manager AI Assistant that supports management problems while clearly separating AI recommendations from the manager’s final decision.'],
  ['Week 9', 'Accuracy, Hallucinations, and Verification', 'Add an AI Verification section and verify at least three AI-generated claims, sources, accuracy, reliability, and corrections.'],
  ['Week 10', 'AI and Plagiarism', 'Add an AI Use / Disclosure Log recording major AI use, prompts, AI contribution, student changes, verification, and disclosure.'],
  ['Week 11', 'Christian Perspective on AI', 'Add a Values-Based AI Decision Framework addressing truthfulness, human dignity, fairness, responsibility, stewardship, harm, and accountability.'],
  ['Week 12', 'AI and the Workforce', 'Add a Workforce Impact section covering a profession’s current tasks, automation opportunities, human-retained work, skills, training, risks, and management recommendations.'],
  ['Week 13', 'Implementing AI in an Organization', 'Add an AI Implementation Plan connecting the business problem, solution, benefits, risks, oversight, training, timeline, KPIs, and applicable policy.'],
  ['Week 14', 'Future of AI and Dashboard Testing', 'Stop adding major features. Test the full dashboard, test another student’s dashboard, document feedback, and revise.'],
  ['Week 15', 'Final AI Management Dashboard', 'Complete and present the integrated AI Management Dashboard, explain its development and safeguards, and complete the final reflection.'],
];

const template = [
  ['01', 'Overview', 'What this week is about and why it matters.'],
  ['02', 'Learning Objectives', 'What students should be able to explain or do by the end of the week.'],
  ['03', 'Lesson', 'Builder-provided instructional content.'],
  ['04', 'Key Terms', 'Five to eight important terms with concise definitions.'],
  ['05', 'AI Activity', 'The guided AI practice students complete.'],
  ['06', 'Dashboard Build', 'The exact capability students add to their semester dashboard.'],
  ['07', 'Directions', 'Step-by-step build instructions and expectations.'],
  ['08', 'Example', 'A completed or model example students can inspect.'],
  ['09', 'Submission Requirements', 'Exactly what students submit and how they submit it.'],
  ['10', 'Rubric / Grading', 'Criteria used to evaluate the work.'],
  ['11', 'Assessment', 'Quiz, test, discussion, or other assessment tied to the week.'],
  ['12', 'Resources', 'Required and optional readings, tools, references, and support.'],
  ['13', 'Progress', 'Student completion and dashboard-build status.'],
];

export default function CourseStructurePage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const active = weeks[selectedWeek];
  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalItems = weeks.length * template.length;
  const percent = Math.round((completedCount / totalItems) * 100);

  const status = useMemo(() => {
    const prefix = `${selectedWeek}-`;
    const done = template.filter((_, i) => completed[`${prefix}${i}`]).length;
    return `${done} of ${template.length} prepared`;
  }, [completed, selectedWeek]);

  function toggle(key: string) {
    setCompleted((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <main className={styles.structurePage}>
      <header className={styles.structureHeader}>
        <div>
          <span>BUSI 610 · FALL I 2026</span>
          <h1>AI for Managers</h1>
          <p>Course build workspace · shared implementation structure</p>
        </div>
        <a href="/">← Back to dashboard</a>
      </header>

      <section className={styles.structureIntro}>
        <div>
          <span className={styles.eyebrow}>IMPLEMENTATION READY</span>
          <h2>The course shell is ready for builder content.</h2>
          <p>This workspace turns the team plan into a visible implementation structure. Each weekly package should be reviewed before it is added to the student-facing dashboard.</p>
        </div>
        <div className={styles.progressBox}><strong>{percent}%</strong><span>Prep checklist progress</span><div><i style={{ width: `${percent}%` }} /></div><small>{completedCount} of {totalItems} checklist items marked complete</small></div>
      </section>

      <section className={styles.roadmapSection}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>15-WEEK ROADMAP</span><h2>Student dashboard progression</h2></div><p>Each week extends the same student-built AI Management Dashboard rather than starting a separate project.</p></div>
        <div className={styles.weekGrid}>
          {weeks.map(([week, title, build], index) => (
            <button key={week} className={`${styles.weekCard} ${index === selectedWeek ? styles.selected : ''}`} onClick={() => setSelectedWeek(index)}>
              <span>{week}</span><strong>{title}</strong><small>{build}</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.builderWorkspace}>
        <aside className={styles.weekPicker}>
          <div className={`${styles.sectionHeading} ${styles.compact}`}><div><span className={styles.eyebrow}>SELECT A WEEK</span><h2>Builder workspace</h2></div></div>
          {weeks.map(([week, title], index) => <button key={week} className={`${styles.pickerItem} ${index === selectedWeek ? styles.selected : ''}`} onClick={() => setSelectedWeek(index)}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><small>{week}</small></div><b>{index < selectedWeek ? '✓' : '›'}</b></button>)}
        </aside>

        <section className={styles.templateArea}>
          <div className={styles.templateHero}><span>{active[0]} · {active[1]}</span><h2>{active[1]}</h2><p>{active[2]}</p><div><span>Standard page structure</span><span>{status}</span></div></div>
          <div className={styles.templateGrid}>
            {template.map(([number, label, description], index) => {
              const key = `${selectedWeek}-${index}`;
              const done = Boolean(completed[key]);
              return <article className={`${styles.templateCard} ${done ? styles.complete : ''}`} key={label}><div className={styles.cardTop}><span>{number}</span><button onClick={() => toggle(key)} aria-pressed={done}>{done ? 'Prepared' : 'Mark prepared'}</button></div><h3>{label}</h3><p>{description}</p></article>;
            })}
          </div>
        </section>
      </section>

      <section className={styles.handoffSection}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>BUILDER HANDOFF</span><h2>Weekly package requirements</h2></div><p>Builders provide the instructional package. Implementation follows review and approval.</p></div>
        <div className={styles.handoffGrid}>
          <article><b>01</b><h3>Instructional package</h3><p>Lesson, 5–8 key terms, student activity, exact dashboard build, directions, example, resources, and assessment.</p></article>
          <article><b>02</b><h3>Assessment alignment</h3><p>Submission requirements, rubric or answer key, and any quiz, test, or discussion tied to the learning objectives.</p></article>
          <article><b>03</b><h3>Coordination check</h3><p>Review adjacent weeks so terminology, dashboard progression, workload, and expectations remain consistent.</p></article>
          <article><b>04</b><h3>Implementation handoff</h3><p>Builder review → project lead review → dashboard implementation → student-view testing → merge to main.</p></article>
        </div>
      </section>

      <section className={styles.qualityGate}><div><span className={styles.eyebrow}>QUALITY GATE</span><h2>Before content reaches students</h2></div><ul><li>Instructions are complete enough for a student to act without guessing.</li><li>The dashboard build is clearly connected to the week’s learning.</li><li>Examples demonstrate the expected level without completing the student’s work.</li><li>Assessment criteria match the stated objectives and submission requirements.</li><li>Privacy, responsible AI use, verification, and human accountability are addressed where relevant.</li><li>The implemented page is tested from a student perspective before merge.</li></ul></section>

      <footer>AI for Managers · Build carefully. Verify evidence. Keep humans accountable.</footer>
    </main>
  );
}
