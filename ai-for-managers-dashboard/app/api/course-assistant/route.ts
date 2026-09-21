import { coursePrinciples, structuredModules } from '../../course-assistant-data';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function relevantCourseMaterial(question: string, requestedWeek?: number) {
  const terms = question.toLowerCase().split(/\W+/).filter((word) => word.length > 3);
  const scores = Object.entries(structuredModules).map(([week, module]) => {
    const text = [module.overview, module.artifact, module.buildDescription, ...module.objectives, ...module.items.flatMap((item) => [item.title, item.description])].join(' ').toLowerCase();
    const score = (requestedWeek === Number(week) ? 20 : 0) + terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
    return { week: Number(week), module, score };
  }).sort((a, b) => b.score - a.score);
  const chosen = scores.filter((entry, index) => entry.score > 0 || index < 2).slice(0, requestedWeek ? 2 : 3);
  return chosen.map(({ week, module }) => `WEEK ${week}
Overview: ${module.overview}
Objectives: ${module.objectives.join(' | ')}
Artifact: ${module.artifact}
Build: ${module.buildDescription}
Items:
${module.items.map((item) => `- ${item.title}: ${item.description}`).join('\n')}`).join('\n\n');
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { messages?: ChatMessage[]; context?: { week?: number; section?: string } };
    const messages = (body.messages || []).filter((message) => (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string').slice(-10);
    const question = [...messages].reverse().find((message) => message.role === 'user')?.content?.trim();
    if (!question) return Response.json({ error: 'Ask a course question to get started.' }, { status: 400 });

    const courseMaterial = relevantCourseMaterial(question, body.context?.week);
    const system = `You are the AI Course Assistant embedded in the AI for Managers student dashboard. Help students learn the course; do not impersonate the instructor.
Ground answers in the supplied COURSE MATERIAL. If the material does not contain the answer, say that clearly instead of inventing course requirements.
Be concise, friendly, and practical. Explain concepts in plain language and use examples when useful.
You may tutor, clarify instructions, create practice questions, and help students think through assignments. Do not claim that AI output is verified evidence. Encourage students to verify important claims and keep responsibility for submitted work.
For graded work, coach the student through reasoning rather than pretending your answer is the student's own work.
Current page context: ${body.context?.week ? `Week ${body.context.week}` : 'unknown week'}${body.context?.section ? `, ${body.context.section}` : ''}.
COURSE PRINCIPLES:
${coursePrinciples.map((item) => `- ${item}`).join('\n')}
COURSE MATERIAL:
${courseMaterial}`;

    const gatewayResponse = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.AI_GATEWAY_API_KEY ? { Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: process.env.AI_COURSE_ASSISTANT_MODEL || 'openai/gpt-5.4-mini',
        messages: [{ role: 'system', content: system }, ...messages],
        max_tokens: 900,
      }),
    });

    if (!gatewayResponse.ok) {
      const detail = await gatewayResponse.text();
      console.error('Course assistant gateway error', gatewayResponse.status, detail.slice(0, 500));
      return Response.json({ error: 'The AI Course Assistant is not configured yet. Add AI_GATEWAY_API_KEY in the deployment environment.' }, { status: 503 });
    }
    const result = await gatewayResponse.json();
    const text = result?.choices?.[0]?.message?.content;
    if (!text) return Response.json({ error: 'The assistant returned an empty response. Please try again.' }, { status: 502 });
    return Response.json({ text });
  } catch (error) {
    console.error('Course assistant error', error);
    return Response.json({ error: 'The course assistant hit an unexpected error. Please try again.' }, { status: 500 });
  }
}
