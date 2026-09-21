'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type PageContext = { week?: number; section?: string };

const starters = [
  'Explain the main idea from this week',
  'Quiz me on what I am studying',
  'Help me understand this assignment',
];

function currentContext(): PageContext {
  const selected = document.querySelector<HTMLButtonElement>('.moduleList button.selected');
  const week = Number(selected?.querySelector('span')?.textContent || '');
  const heading = document.querySelector<HTMLElement>('.moduleDetail h2, .moduleDetail h3, main h2')?.textContent?.trim();
  return { week: Number.isFinite(week) && week > 0 ? week : undefined, section: heading || undefined };
}

export default function CourseAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [context, setContext] = useState<PageContext>({});
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setContext(currentContext());
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: 'user' as const, content: question }];
    setMessages(next); setInput(''); setBusy(true);
    try {
      const response = await fetch('/api/course-assistant', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, context: currentContext() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assistant unavailable');
      setMessages([...next, { role: 'assistant', content: data.text }]);
    } catch (error) {
      setMessages([...next, { role: 'assistant', content: error instanceof Error ? error.message : 'The course assistant is temporarily unavailable.' }]);
    } finally { setBusy(false); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(input); }

  return <>
    <button className="courseAssistantLauncher" type="button" onClick={() => setOpen(true)} aria-label="Open AI Course Assistant">
      <span>✦</span><strong>Ask AI</strong>
    </button>
    {open && <aside className="courseAssistantPanel" role="dialog" aria-modal="true" aria-label="AI Course Assistant">
      <header>
        <div><span className="courseAssistantMark">✦</span><div><strong>AI Course Assistant</strong><small>{context.week ? `Week ${context.week} context` : 'AI for Managers'}</small></div></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
      </header>
      <div className="courseAssistantBody">
        {messages.length === 0 && <div className="courseAssistantWelcome">
          <div>✦</div><h3>How can I help?</h3>
          <p>I know the AI for Managers course material and can explain concepts, help you study, clarify assignments, or quiz you.</p>
          <div className="courseAssistantStarters">{starters.map((item) => <button type="button" key={item} onClick={() => void ask(item)}>{item}<span>→</span></button>)}</div>
          <small>Use AI as learning support. Verify important claims and keep responsibility for your submitted work.</small>
        </div>}
        {messages.map((message, index) => <div key={index} className={`courseAssistantMessage ${message.role}`}><span>{message.role === 'assistant' ? 'AI' : 'YOU'}</span><p>{message.content}</p></div>)}
        {busy && <div className="courseAssistantMessage assistant"><span>AI</span><p className="courseAssistantThinking">Thinking…</p></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about a concept, lesson, quiz, or assignment…" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void ask(input); } }} />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Send question">↑</button>
      </form>
      <footer>AI can make mistakes · Verify important information</footer>
    </aside>}
    <style jsx global>{`
      .courseAssistantLauncher{position:fixed;right:22px;bottom:22px;z-index:8000;border:0;border-radius:999px;background:#173f5d;color:#fff;padding:12px 17px;display:flex;align-items:center;gap:8px;box-shadow:0 12px 34px rgba(13,43,65,.28);font:inherit;cursor:pointer}.courseAssistantLauncher span{font-size:18px}.courseAssistantLauncher strong{font-size:13px}
      .courseAssistantPanel{position:fixed;right:20px;bottom:76px;z-index:8001;width:min(410px,calc(100vw - 24px));height:min(650px,calc(100vh - 100px));background:#fff;border:1px solid #d8e2e9;border-radius:16px;box-shadow:0 24px 70px rgba(16,42,61,.28);display:flex;flex-direction:column;overflow:hidden;color:#183247}
      .courseAssistantPanel>header{padding:14px 15px;background:#173f5d;color:#fff;display:flex;align-items:center;justify-content:space-between}.courseAssistantPanel>header>div{display:flex;align-items:center;gap:10px}.courseAssistantPanel>header div div{display:grid;gap:2px}.courseAssistantPanel>header strong{font-size:13px}.courseAssistantPanel>header small{font-size:10px;opacity:.72}.courseAssistantMark{width:31px;height:31px;border-radius:9px;background:rgba(255,255,255,.13);display:grid;place-items:center}.courseAssistantPanel>header button{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}
      .courseAssistantBody{flex:1;overflow-y:auto;padding:17px;background:#f7f9fb}.courseAssistantWelcome{text-align:center;padding:20px 5px}.courseAssistantWelcome>div:first-child{margin:auto;width:45px;height:45px;border-radius:13px;background:#e7f0f6;color:#245c81;display:grid;place-items:center;font-size:22px}.courseAssistantWelcome h3{margin:12px 0 6px}.courseAssistantWelcome p{margin:0 auto 17px;color:#607686;font-size:12px;line-height:1.55;max-width:320px}.courseAssistantWelcome>small{display:block;margin-top:16px;color:#8495a1;font-size:9px;line-height:1.4}.courseAssistantStarters{display:grid!important;width:auto!important;height:auto!important;background:none!important;gap:7px}.courseAssistantStarters button{border:1px solid #d9e3ea;background:#fff;border-radius:9px;padding:10px 11px;display:flex;justify-content:space-between;color:#294b63;text-align:left;font-size:11px;cursor:pointer}
      .courseAssistantMessage{margin:0 0 13px;display:grid;gap:4px}.courseAssistantMessage>span{font-size:8px;font-weight:800;letter-spacing:.12em;color:#78909f}.courseAssistantMessage p{margin:0;padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.55;white-space:pre-wrap}.courseAssistantMessage.user{justify-items:end}.courseAssistantMessage.user p{background:#173f5d;color:#fff;max-width:88%}.courseAssistantMessage.assistant p{background:#fff;border:1px solid #dce5eb;color:#294657;max-width:95%}.courseAssistantThinking{color:#718795!important}
      .courseAssistantPanel>form{border-top:1px solid #e0e7ec;padding:10px;background:#fff;display:flex;gap:7px;align-items:flex-end}.courseAssistantPanel textarea{flex:1;resize:none;border:1px solid #ccd9e2;border-radius:10px;padding:9px 10px;font:inherit;font-size:11px;outline:none}.courseAssistantPanel textarea:focus{border-color:#5782a0;box-shadow:0 0 0 2px rgba(69,119,153,.1)}.courseAssistantPanel>form button{width:34px;height:34px;border:0;border-radius:9px;background:#173f5d;color:#fff;font-size:17px;cursor:pointer}.courseAssistantPanel>form button:disabled{opacity:.4;cursor:not-allowed}.courseAssistantPanel>footer{text-align:center;padding:0 8px 8px;color:#8a9aa5;font-size:8px;background:#fff}
      @media(max-width:600px){.courseAssistantLauncher{right:12px;bottom:12px}.courseAssistantPanel{inset:8px;width:auto;height:auto;border-radius:12px}.courseAssistantPanel>header{padding-top:max(14px,env(safe-area-inset-top))}}
    `}</style>
  </>;
}
