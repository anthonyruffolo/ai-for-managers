'use client';

import { FINALIZED_PROGRESSION, isFinalizedWeek } from './course-progression';

type AnswerValue = string | boolean | number | number[];

type Props = {
  week: number;
  answers: Record<string, AnswerValue>;
  onAnswer: (key: string, value: AnswerValue) => void;
};

export function FinalizedArtifactBuilder({ week, answers, onAnswer }: Props) {
  if (!isFinalizedWeek(week)) return null;

  const spec = FINALIZED_PROGRESSION[week];
  const requiredFields = spec.fields.filter((field) => field.required);
  const completedRequired = requiredFields.filter((field) => {
    const value = answers[`week${week}-artifact-${field.key}`];
    return typeof value === 'number' ? true : String(value ?? '').trim().length > 0;
  }).length;
  const complete = requiredFields.length > 0 && completedRequired === requiredFields.length;

  return (
    <section className="lmsPanel structuredLesson finalizedArtifact">
      <div className="panelBar">
        <h3>{spec.artifact}</h3>
        <span>{completedRequired} / {requiredFields.length} required fields complete</span>
      </div>
      <p>{spec.buildDescription}</p>

      <div className="lessonCallout">
        <strong>Required evidence</strong>
        <ul>{spec.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
      </div>

      <div className="assessmentFields">
        {spec.fields.map((field) => {
          const key = `week${week}-artifact-${field.key}`;
          const value = answers[key] ?? '';
          const common = {
            value: String(value),
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onAnswer(key, event.target.value),
          };

          return (
            <label className="fullField" key={field.key}>
              {field.label}
              <span>{field.help}</span>
              {field.kind === 'select' ? (
                <select {...common}>
                  <option value="">Select one</option>
                  {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : field.kind === 'textarea' ? (
                <textarea {...common} />
              ) : (
                <input {...common} />
              )}
            </label>
          );
        })}
      </div>

      <div className="decisionFeedback">
        <strong>Build completion</strong>
        <p>{complete ? 'Required build evidence is complete. Review the artifact as a student, test the full flow, and then submit the named deliverable.' : 'Complete every required field before treating this artifact as ready for student-view QA.'}</p>
      </div>
    </section>
  );
}
