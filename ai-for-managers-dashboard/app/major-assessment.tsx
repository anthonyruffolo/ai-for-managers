'use client';

import { MajorAssessmentQuestion } from './major-assessment-data';

type AnswerValue = string | boolean | number | number[];

type Props = {
  title: string;
  description: string;
  prefix: string;
  questions: MajorAssessmentQuestion[];
  answers: Record<string, AnswerValue>;
  onAnswer: (key: string, value: AnswerValue) => void;
  onComplete?: () => void;
  passingPercent?: number;
};

export function MajorAssessment({ title, description, prefix, questions, answers, onAnswer, onComplete, passingPercent = 70 }: Props) {
  const submitted = Boolean(answers[`${prefix}-submitted`]);
  const answered = questions.filter((_, index) => typeof answers[`${prefix}-${index}`] === 'number').length;
  const score = questions.filter((question, index) => answers[`${prefix}-${index}`] === question.answer).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  function submit() {
    onAnswer(`${prefix}-submitted`, true);
    onComplete?.();
  }

  return <section className="lmsPanel structuredLesson">
    <div className="panelBar"><h3>{title}</h3><span>{submitted ? `${score} / ${questions.length} correct · ${percent}%` : `${answered} of ${questions.length} answered`}</span></div>
    <p>{description}</p>
    <div className="lessonCallout"><strong>Assessment rule</strong><span>Complete every question before submitting. Your answers save on this device. Submission here records completion in the dashboard; it does not send a grade to an external LMS.</span></div>
    {questions.map((question, index) => <fieldset className="knowledgeItem" key={question.question}>
      <legend>{index + 1}. {question.question}</legend>
      {question.options.map((option, optionIndex) => <label className="choiceLabel" key={option}>
        <input type="radio" name={`${prefix}-${index}`} checked={answers[`${prefix}-${index}`] === optionIndex} disabled={submitted} onChange={() => onAnswer(`${prefix}-${index}`, optionIndex)} />
        {String.fromCharCode(65 + optionIndex)}. {option}
      </label>)}
      {submitted && <p className={answers[`${prefix}-${index}`] === question.answer ? 'feedbackCorrect' : 'feedback'}><strong>{answers[`${prefix}-${index}`] === question.answer ? 'Correct. ' : `Review. Answer: ${String.fromCharCode(65 + question.answer)}. `}</strong>{question.explanation}</p>}
    </fieldset>)}
    {submitted && <div className={percent >= passingPercent ? 'decisionFeedback' : 'feedback'}><strong>Final score: {score}/{questions.length} · {percent}%</strong><p>{percent >= passingPercent ? 'Assessment complete. Review the explanations before moving on.' : 'Review the explanations and revisit the related lessons before continuing.'}</p></div>}
    <div className="formActions"><button className="primaryAction" type="button" disabled={submitted || answered < questions.length} onClick={submit}>{submitted ? 'Submitted' : answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Submit assessment'}</button></div>
  </section>;
}
