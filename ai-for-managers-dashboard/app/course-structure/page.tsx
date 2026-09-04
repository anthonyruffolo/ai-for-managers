'use client';

import { useMemo, useState } from 'react';
import './structure.css';

const weeks = [
  ['Week 1', 'Orient & prototype', 'Define the problem, target user, dashboard purpose, and initial prototype.'],
  ['Week 2', 'Deploy & use', 'Deploy a usable dashboard and establish the core student workflow.'],
  ['Week 3', 'Research & know', 'Add research, source-quality, citation, and knowledge-management capabilities.'],
  ['Week 4', 'Analyze & decide', 'Add data analysis and decision-support with human decision rights.'],
  ['Week 5', 'Automate & coordinate', 'Add a bounded automation or workflow with owners and recovery steps.'],
  ['Week 6', 'Test & govern', 'Add testing, failure logging, privacy, security, bias, and governance controls.'],
  ['Week 7', 'Communicate & persuade', 'Add an executive briefing and responsible AI-assisted communication workflow.'],
  ['Week 8', 'Understand customers', 'Add customer-insight and journey-mapping capabilities using responsible inputs.'],
  ['Week 9', 'Support people & teams', 'Add a people-support workflow with fairness and human-review boundaries.'],
  ['Week 10', 'Forecast & plan', 'Add scenario planning with assumptions, uncertainty, and contingency triggers.'],
  ['Week 11', 'Explore strategy', 'Add a strategy canvas for options, tradeoffs, assumptions, and second-order effects.'],
  ['Week 12', 'Innovate & experiment', 'Prototype a bounded AI-enabled improvement and define experiment criteria.'],
  ['Week 13', 'Measure value', 'Add a value scorecard connecting features to outcomes, costs, and risks.'],
  ['Week 14', 'Lead adoption', 'Add stakeholder, training, communication, rollout, and feedback planning.'],
  ['Week 15', 'Integrate & defend', 'Integrate the control center, complete acceptance testing, and prepare the final defense.'],
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
    <main className="structurePage">
      <header className="structureHeader">
        <div>
          <span>BUSI 610 · FALL I 2026</span>
          <h1>AI for Managers</h1>
          <p>Course build workspace · shared implementation structure</p>
        </div>
        <a href="/">← Back to dashboard</a>
      </header>

      <section className="structureIntro">
        <div>
          <span className="eyebrow">IMPLEMENTATION READY</span>
          <h2>The course shell is ready for builder content.</h2>
          <p>This page turns the prep work into a visible workspace. Teammates should provide the instructional package for their assigned weeks; the dashboard implementation follows this common structure.</p>
        </div>
        <div className="progressBox"><strong>{percent}%</strong><span>Prep checklist progress</span><div><i style={{ width: `${percent}%` }} /></div><small>{completedCount} of {totalItems} checklist items marked complete</small></div>
      </section>

      <section className="roadmapSection">
        <div className="sectionHeading"><div><span className="eyebrow">15-WEEK ROADMAP</span><h2>Semester dashboard progression</h2></div><p>Each week adds one connected capability. Do not treat the weeks as isolated assignments.</p></div>
        <div className="weekGrid">
          {weeks.map(([week, title, build], index) => (
            <button key={week} className={index === selectedWeek ? 'weekCard selected' : 'weekCard'} onClick={() => setSelectedWeek(index)}>
              <span>{week}</span><strong>{title}</strong><small>{build}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="builderWorkspace">
        <aside className="weekPicker">
          <div className="sectionHeading compact"><div><span className="eyebrow">SELECT A WEEK</span><h2>Builder workspace</h2></div></div>
          {weeks.map(([week, title], index) => <button key={week} className={index === selectedWeek ? 'pickerItem selected' : 'pickerItem'} onClick={() => setSelectedWeek(index)}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><small>{week}</small></div><b>{index < selectedWeek ? '✓' : '›'}</b></button>)}
        </aside>

        <section className="templateArea">
          <div className="templateHero"><span>{active[0]} · {active[1]}</span><h2>{active[1]}</h2><p>{active[2]}</p><div><span>Standard page structure</span><span>{status}</span></div></div>
          <div className="templateGrid">
            {template.map(([number, label, description], index) => {
              const key = `${selectedWeek}-${index}`;
              const done = Boolean(completed[key]);
              return <article className={done ? 'templateCard complete' : 'templateCard'} key={label}><div className="cardTop"><span>{number}</span><button onClick={() => toggle(key)} aria-pressed={done}>{done ? 'Prepared' : 'Mark prepared'}</button></div><h3>{label}</h3><p>{description}</p></article>;
            })}
          </div>
        </section>
      </section>

      <section className="handoffSection">
        <div className="sectionHeading"><div><span className="eyebrow">BUILDER HANDOFF</span><h2>What a teammate gives Anthony</h2></div><p>The builder owns the instructional package. Technical implementation happens after review and approval.</p></div>
        <div className="handoffGrid">
          <article><b>01</b><h3>Instructional package</h3><p>Lesson, 5–8 key terms, student activity, exact dashboard build, directions, example, resources, and assessment.</p></article>
          <article><b>02</b><h3>Assessment alignment</h3><p>Submission requirements, rubric or answer key, and any quiz, test, or discussion tied to the learning objectives.</p></article>
          <article><b>03</b><h3>Coordination check</h3><p>Review the adjacent weeks so terminology, dashboard progression, workload, and expectations remain consistent.</p></article>
          <article><b>04</b><h3>Implementation handoff</h3><p>Second-builder review → Daniel review → dashboard implementation → student-view testing → merge to main.</p></article>
        </div>
      </section>

      <section className="qualityGate"><div><span className="eyebrow">QUALITY GATE</span><h2>Before content reaches students</h2></div><ul><li>Instructions are complete enough for a student to act without guessing.</li><li>The dashboard build is clearly connected to the week’s learning.</li><li>Examples demonstrate the expected level without completing the student’s work.</li><li>Assessment criteria match the stated objectives and submission requirements.</li><li>Privacy, responsible AI use, verification, and human accountability are addressed where relevant.</li><li>The implemented page is tested from a student perspective before merge.</li></ul></section>

      <footer>AI for Managers · Build carefully. Verify evidence. Keep humans accountable.</footer>
    </main>
  );
}
