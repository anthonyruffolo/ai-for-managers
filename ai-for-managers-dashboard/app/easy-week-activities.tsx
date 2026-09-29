type Question = { question: string; options: string[]; answer: number; explanation: string };
type Activity = { topic: string; assignment: string; scenario: string[]; prompts: string[]; questions: Question[] };

const activities: Record<number, Activity> = {
  8: {
    topic: 'AI in Management', assignment: 'Help a Manager',
    scenario: ['Customer A: “I waited 20 minutes for help.”', 'Customer B: “The employee was friendly.”', 'Customer C: “I couldn’t find the opening hours.”'],
    prompts: ['Choose one problem the manager could improve. Name the customer whose feedback supports your answer.', 'Describe one way AI could help.', 'What should the manager check before using AI’s suggestion?'],
    questions: [
      { question: 'Which task could AI help a manager with?', options: ['Taking full responsibility for business decisions', 'Summarizing customer feedback', 'Guaranteeing every customer will be happy'], answer: 1, explanation: 'AI can help organize and summarize feedback.' },
      { question: 'Which statement is supported by the feedback above?', options: ['Customer A reported waiting 20 minutes.', 'Every customer waited 20 minutes.', 'All employees are slow.'], answer: 0, explanation: 'This accurately reflects one customer’s report.' },
      { question: 'AI suggests that longer opening hours will improve sales. How should the manager treat this suggestion?', options: ['As a proven fact', 'As a guaranteed result', 'As an idea that needs checking'], answer: 2, explanation: 'AI suggestions need supporting evidence.' },
      { question: 'A manager only surveys weekday customers. Whose feedback might be missing?', options: ['Customers who answered the survey', 'Customers who visit on weekends', 'The manager who wrote the survey'], answer: 1, explanation: 'Weekend customers may have different experiences.' },
      { question: 'Who is responsible for the final decision when AI helps?', options: ['The manager', 'The AI tool', 'Nobody'], answer: 0, explanation: 'The manager remains accountable.' },
    ],
  },
  9: {
    topic: 'Accuracy, Hallucinations, and Verification', assignment: 'Spot the AI Mistake',
    scenario: ['Source: Campus Support Center notice — “The center is open Monday–Friday, 9 a.m.–5 p.m. It is closed on weekends.”', 'AI answer — “The center is open every day from 9 a.m.–5 p.m., including weekends.”'],
    prompts: ['What did the AI get wrong?', 'Rewrite its answer using the source.', 'Who should review the answer before it is shared with students?'],
    questions: [
      { question: 'What is an AI hallucination?', options: ['An AI answer written in a friendly tone', 'An AI answer that includes a question', 'An AI answer containing invented or unsupported information'], answer: 2, explanation: 'AI can produce information without reliable support.' },
      { question: 'AI sounds confident. Does that mean its answer is correct?', options: ['Yes, always', 'No, it still needs checking', 'Yes, if the answer is long'], answer: 1, explanation: 'Confidence does not prove accuracy.' },
      { question: 'What is the best source for checking the center’s opening hours?', options: ['The center’s current official notice', 'An unrelated social media comment', 'Another AI answer with no source'], answer: 0, explanation: 'Use the current official source.' },
      { question: 'An AI answer conflicts with an official source. What should you do?', options: ['Share it immediately', 'Ignore the difference', 'Pause, check the source, and correct the answer'], answer: 2, explanation: 'Resolve the conflict before sharing the answer.' },
      { question: 'Which workflow includes human review?', options: ['AI drafts → automatically publish', 'AI drafts → person checks sources → person approves → publish', 'AI drafts → skip checking → publish'], answer: 1, explanation: 'A person verifies and approves the output.' },
    ],
  },
};

export const easyQuizDefinitions = Object.entries(activities).map(([week, activity]) => ({
  week: Number(week), itemId: `quiz-${week}-easy`, prefix: `week${week}-easy-quiz`, questions: activity.questions,
}));

export function easyWeekItems(week: number) {
  const activity = activities[week];
  return activity ? [
    { id: `assignment-${week}-easy`, title: `Easy Assignment · ${activity.assignment}`, description: 'Read a fictional scenario and write three short answers. 3 points total.', type: 'assignment' as const, time: '10–15 min' },
    { id: `quiz-${week}-easy`, title: `Quick Quiz · ${activity.topic}`, description: 'Five easy multiple-choice questions with a score and explanations. 5 points total.', type: 'quiz' as const, time: '5–10 min' },
  ] : [];
}

type Props = {
  week: number;
  kind: 'assignment' | 'quiz';
  answers: Record<string, string | boolean | number>;
  onAnswer: (key: string, value: string | boolean | number) => void;
};

export function EasyWeekActivity({ week, kind, answers, onAnswer }: Props) {
  const activity = activities[week];
  if (!activity) return null;
  const prefix = `week${week}-easy-${kind}`;
  const submitted = Boolean(answers[`${prefix}-submitted`]);
  const answered = activity.questions.filter((_, index) => typeof answers[`${prefix}-${index}`] === 'number').length;
  const score = activity.questions.filter((question, index) => answers[`${prefix}-${index}`] === question.answer).length;
  return <section className="lmsPanel structuredLesson">
    <div className="panelBar"><h3>{kind === 'assignment' ? activity.assignment : `Quick Quiz · ${activity.topic}`}</h3><span>{kind === 'assignment' ? '10–15 minutes · 3 points' : '5 questions · 5 points · Untimed'}</span></div>
    <div className="lessonCallout"><strong>Fictional scenario</strong><div>{activity.scenario.map((line) => <p key={line}>{line}</p>)}</div></div>
    {kind === 'assignment' ? <>
      <p>Write three short answers. One or two sentences per answer is enough. You do not need an AI tool.</p>
      <div className="assessmentFields">{activity.prompts.map((prompt, index) => <label key={prompt}>{index + 1}. {prompt}<textarea value={String(answers[`${prefix}-${index}`] || '')} onChange={(event) => onAnswer(`${prefix}-${index}`, event.target.value)} placeholder="Write your short answer here." /></label>)}</div>
      <p><strong>Grading:</strong> 1 point for each complete answer. Total: 3 points.</p>
      <p>Your answers save on this device. To hand in your work, copy the three answers to the submission location your instructor specifies. Marking this activity complete does not send it to your instructor.</p>
    </> : <>
      <p>Choose one answer for each question. Each question is worth 1 point. Check your answers to see your score and explanations.</p>
      {activity.questions.map((question, index) => <fieldset className="knowledgeItem" key={question.question}>
        <legend>{index + 1}. {question.question}</legend>
        {question.options.map((option, optionIndex) => <label className="choiceLabel" key={option}><input type="radio" name={`${prefix}-${index}`} checked={answers[`${prefix}-${index}`] === optionIndex} disabled={submitted} onChange={() => onAnswer(`${prefix}-${index}`, optionIndex)} />{String.fromCharCode(65 + optionIndex)}. {option}</label>)}
        {submitted && <p className={answers[`${prefix}-${index}`] === question.answer ? 'feedbackCorrect' : 'feedback'}><strong>{answers[`${prefix}-${index}`] === question.answer ? 'Correct.' : 'Review.'} Answer: {String.fromCharCode(65 + question.answer)}.</strong> {question.explanation}</p>}
      </fieldset>)}
      <div aria-live="polite"><p>{submitted ? `Score: ${score} / 5` : `${answered} of 5 answered`}</p></div>
      <div className="formActions">{submitted ? <button className="primaryAction" type="button" onClick={() => onAnswer(`${prefix}-submitted`, false)}>Try again</button> : <button className="primaryAction" type="button" disabled={answered < 5} onClick={() => onAnswer(`${prefix}-submitted`, true)}>Check answers</button>}</div>
      <p>Your answers and score save on this device. They are not sent to an instructor gradebook.</p>
    </>}
  </section>;
}
