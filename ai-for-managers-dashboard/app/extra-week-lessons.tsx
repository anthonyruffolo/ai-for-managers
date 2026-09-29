type Lesson = {
  title: string; objective: string; term: string; explanation: string[];
  example: string; practice: string; feedback: string; takeaway: string;
};

export const extraWeekLessons: Record<number, Lesson[]> = {
  8: [
    {
      title: 'Choose a Useful AI Task',
      objective: 'Choose a small management task where AI can help and identify what a person must decide.',
      term: 'Augmentation means using AI to support a person’s work and judgment.',
      explanation: [
        'Start with a problem, not a tool. Ask which task takes time, what a good result looks like, and whether you have suitable information. AI can help draft a routine message, organize feedback, or suggest alternatives. A manager must still check whether the output fits the situation.',
        'Choose a small, reversible task for a first trial. Consider the consequences of a mistake and the effort needed to review the result. Saving drafting time is not useful if checking and correcting the draft takes even longer. Use fictional information for this activity.',
      ],
      example: 'A fictional café manager has 12 customer comments. AI groups them into themes such as waiting time and menu clarity. The manager reads the original comments, corrects any mistaken grouping, and decides which issue to address first. The comments are evidence; the AI’s proposed solution is a suggestion.',
      practice: 'Choose one: summarizing customer comments or automatically dismissing an employee. Which is a better first AI trial, and what would you review?',
      feedback: 'Summarizing comments is the better first trial because the result is easier to check and correct. Compare each theme with the original comments and look for missing views. Employment decisions have serious consequences and require qualified human judgment and appropriate safeguards.',
      takeaway: 'Use AI for a clearly defined task. Keep a person responsible for the decision.',
    },
    {
      title: 'Write a Clear Management Prompt',
      objective: 'Write a prompt that states the task, context, limits, and desired format.',
      term: 'A prompt is the instruction and context you give an AI tool.',
      explanation: [
        'A useful prompt tells AI what you need and supplies the information it should use. Include the task, relevant context, the intended audience, and an output format. State limits such as “use only the supplied comments” and “label anything not supported as an assumption.”',
        'Clear prompts can improve relevance, but they cannot guarantee accuracy. Review the result against your source material. Do not include confidential or personal information in an unapproved tool. If a response is too vague, ask for a revision with a more specific requirement.',
      ],
      example: 'Using these fictional customer comments, identify two service problems. For each problem, quote the supporting comment and suggest one low-cost improvement. Present a table with Problem, Evidence, Suggested action, and What the manager should check. Do not invent customer opinions.',
      practice: 'Improve this prompt: “Tell me how to manage better.” Add a specific task, fictional context, and output format.',
      feedback: 'Example: “A fictional café receives complaints about long waits. Using the three comments below, suggest two scheduling options in a table. Include the evidence and one limitation for each. Do not assume a budget or staffing level that I have not provided.” Many other specific prompts can work.',
      takeaway: 'Give clear instructions and evidence, then inspect the answer.',
    },
    {
      title: 'Compare Options Before Deciding',
      objective: 'Compare two actions using evidence, cost, benefits, and uncertainty.',
      term: 'A tradeoff occurs when improving one outcome creates a cost or reduces another benefit.',
      explanation: [
        'Ask AI to suggest more than one option. A recommendation is easier to evaluate when you can compare alternatives, including keeping the current process for now. Use the same criteria for each option: customer benefit, cost, effort, risks, and evidence.',
        'Separate what you observed from what you infer. A complaint about a wait supports investigating waiting time; it does not prove that hiring more staff is the only solution. Consider whose experience is missing and what small test could reduce uncertainty before a larger commitment.',
      ],
      example: 'A fictional support desk receives three complaints about queues. Option A adds a staff member during busy hours. Option B posts clearer self-service instructions. A may increase service capacity but costs more. B may be cheaper but will not solve every request. The manager measures peak-hour demand before choosing a trial.',
      practice: 'Choose one option from the example. Give one benefit, one limitation, and one piece of information you would collect before deciding.',
      feedback: 'For Option B, a benefit is a potentially low-cost improvement. A limitation is that complex requests still need staff. Check how many waiting customers have questions that instructions could answer. Either option can be reasonable when supported by evidence.',
      takeaway: 'Explain why an option fits the evidence and what could change your decision.',
    },
    {
      title: 'Check Whether AI Actually Helps',
      objective: 'Plan a small trial and choose a measure of success and a reason to pause.',
      term: 'A baseline is the starting measurement used to compare results after a change.',
      explanation: [
        'Before introducing AI, record how the task works now. Measure something meaningful, such as minutes per reviewed response, correction rate, or customer satisfaction. Set a trial period and a clear goal. Count human review time as part of the work.',
        'After the trial, compare similar tasks and conditions. Faster work is not automatically better if accuracy or customer experience suffers. A small trial gives useful clues, but differences in workload or case difficulty can affect the comparison. Decide whether to continue, revise, or stop.',
      ],
      example: 'In a fictional trial, drafting a reply drops from 10 to 4 minutes. Review takes another 3 minutes, so the total is 7 minutes. The manager also tracks incorrect replies. The time saving is 3 minutes per reply, provided quality remains acceptable.',
      practice: 'Name one success measure and one reason to pause an AI-assisted customer reply trial.',
      feedback: 'A success measure could be total minutes per accurate, reviewed reply. A pause condition could be repeated incorrect policy information reaching customers. Name the manager who will monitor the results and make the decision.',
      takeaway: 'Measure both usefulness and quality, and keep a clear stop condition.',
    },
  ],
  9: [
    {
      title: 'Spot Claims That Need Checking',
      objective: 'Identify a factual claim and explain what evidence would support it.',
      term: 'A hallucination is AI-generated information that is invented or unsupported.',
      explanation: [
        'AI can produce an answer that sounds confident but contains a wrong date, invented statistic, or nonexistent citation. Fluent writing and precise numbers do not prove accuracy. Treat factual claims as things to check before you use them.',
        'Separate facts, recommendations, and assumptions. “The center opens at 9 a.m.” is a factual claim. “The center should open earlier” is a recommendation. “Students would attend earlier” is an assumption unless evidence supports it. Each requires a different kind of review.',
      ],
      example: 'An AI draft says, “Ninety percent of students prefer weekend service.” No survey is supplied. The manager cannot treat the number as evidence. They ask for the original survey and, if it cannot be found, remove the statistic or state that student preferences are unknown.',
      practice: 'An AI says, “Adding a chatbot will cut complaints by 50%.” What would you check before repeating this claim?',
      feedback: 'Ask for the original evidence, how complaints were measured, the comparison period, and whether the situation matches yours. Without support, describe the reduction as unverified rather than presenting 50% as a fact.',
      takeaway: 'Confidence is a writing style, not evidence.',
    },
    {
      title: 'Find and Read the Original Source',
      objective: 'Check whether a source exists, is current, and supports the exact claim.',
      term: 'A primary source provides information directly from the responsible organization or original work.',
      explanation: [
        'Open the source instead of trusting a citation that AI supplies. Check who published it, when it was updated, and what it actually says. A real link can still point to a page that does not support the claim. Read the relevant passage and its context.',
        'Choose a source suited to the question. For opening hours, use the organization’s current official notice. For a research finding, inspect the original study and its limits. Repetition across websites is not independent confirmation if all sites copied the same unsupported statement.',
      ],
      example: 'A fictional AI answer says the support center is open on Sunday. An old event flyer mentions one Sunday opening, but the current official notice says the center is closed on weekends. The special event does not establish regular Sunday hours.',
      practice: 'Which would you use to check regular opening hours: an old event flyer or the current official notice? Explain your choice.',
      feedback: 'Use the current official notice because it addresses the regular schedule. If two current official sources conflict, contact the center rather than guessing. Record the source and the date you checked it.',
      takeaway: 'Verify that the source supports this claim, in this context, now.',
    },
    {
      title: 'Check Numbers, Units, and Comparisons',
      objective: 'Recalculate a simple percentage and check what the numbers measure.',
      term: 'Percentage change compares the difference with the original value: difference ÷ original value × 100.',
      explanation: [
        'Do not rely on a number just because AI shows a calculation. Check the original inputs, redo the arithmetic, and confirm the units. A weekly total cannot be compared fairly with a monthly total without adjustment. Also check whether the groups or time periods are comparable.',
        'Distinguish a change in percentage points from a percent change. If satisfaction rises from 60% to 70%, it rises by 10 percentage points. Relative to the original 60%, the increase is about 16.7%. These descriptions answer different questions.',
      ],
      example: 'A fictional desk’s average wait falls from 20 minutes to 15 minutes. The decrease is 5 minutes. The percentage decrease is 5 ÷ 20 × 100 = 25%. An AI claim of a 50% decrease would be incorrect.',
      practice: 'A task used to take 10 minutes and now takes 8 minutes, including review. How many minutes are saved, and what is the percentage decrease?',
      feedback: 'Two minutes are saved. The percentage decrease is 2 ÷ 10 × 100 = 20%. Check that both measurements include the same steps and similar tasks before attributing the change to AI.',
      takeaway: 'Check the inputs, arithmetic, units, and meaning of the comparison.',
    },
    {
      title: 'Handle Uncertainty and Ask for Review',
      objective: 'Decide when to correct, pause, or escalate an AI-generated answer.',
      term: 'Escalation means sending an unresolved issue to someone with the knowledge and authority to decide.',
      explanation: [
        'When evidence is missing or conflicting, make the uncertainty visible. Do not fill the gap with a confident guess. Decide whether the output can be corrected with a reliable source or whether it should be paused for review.',
        'Build a review checkpoint before an answer reaches its audience. Name the reviewer, the checks required, and the condition that triggers escalation. Keep a short record of the claim, source, correction, remaining uncertainty, and person responsible for approval.',
      ],
      example: 'A fictional support chatbot gives two different refund deadlines. The reviewer checks the current policy but finds conflicting dates in two official documents. They pause the reply and ask the policy owner to confirm the correct deadline. They record the resolution before approving a revised answer.',
      practice: 'Complete this workflow: AI drafts → person checks sources → ______ → publish. What should happen if the sources still conflict?',
      feedback: 'A person approves the verified answer before publication. If the sources conflict, pause publication and escalate to the responsible owner. Record the answer and supporting evidence when the conflict is resolved.',
      takeaway: 'It is better to say “not yet verified” than to pass an unsupported answer to someone else.',
    },
  ],
};

export function extraLessonItems(week: number) {
  return (extraWeekLessons[week] || []).map((lesson, index) => ({
    id: `lesson-${index + 5}`, title: `Lesson ${index + 5} · ${lesson.title}`,
    description: lesson.objective, type: 'lesson' as const, time: '10–15 min',
  }));
}

export function ExtraWeekLesson({ week, index, response, onResponse }: {
  week: number; index: number; response: string; onResponse: (value: string) => void;
}) {
  const lesson = extraWeekLessons[week]?.[index - 4];
  if (!lesson) return null;
  return <section className="lmsPanel structuredLesson">
    <div className="panelBar"><h3>{lesson.title}</h3><span>10–15 minutes</span></div>
    <p><strong>By the end:</strong> {lesson.objective}</p>
    <div className="lessonCallout"><strong>Key term</strong><span>{lesson.term}</span></div>
    <h4>Learn</h4>{lesson.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    <h4>Fictional management example</h4><p>{lesson.example}</p>
    <div className="moduleWorkPrompt"><label><strong>Try it · Write 1–3 sentences</strong><p>{lesson.practice}</p><textarea value={response} onChange={(event) => onResponse(event.target.value)} placeholder="Write your reasoning here." /></label><p>Your notes save on this device.</p></div>
    <details className="decisionFeedback"><summary>Check your thinking</summary><p>{lesson.feedback}</p></details>
    <div className="lessonCallout"><strong>Manager takeaway</strong><span>{lesson.takeaway}</span></div>
  </section>;
}
