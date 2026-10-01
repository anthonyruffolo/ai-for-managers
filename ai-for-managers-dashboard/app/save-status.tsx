'use client';
import { useEffect, useState } from 'react';
export type SaveState = 'loading' | 'saving' | 'saved' | 'error';
export function persistAnswers(storage: Pick<Storage, 'setItem'>, key: string, value: unknown): 'saved' | 'error' {
  try { storage.setItem(key, JSON.stringify(value)); return 'saved'; } catch { return 'error'; }
}
export function useAnswerSave(value: Record<string, string | boolean | number>, ready: boolean): SaveState {
  const [result, setResult] = useState<{ value: typeof value; state: 'saved' | 'error' } | null>(null);
  useEffect(() => {
    if (!ready) return;
    let state: 'saved' | 'error';
    try { state = persistAnswers(window.localStorage, 'aim-structured-answers-v1', value); } catch { state = 'error'; }
    const timer = window.setTimeout(() => setResult({ value, state }), 0);
    return () => window.clearTimeout(timer);
  }, [value, ready]);
  if (!ready) return 'loading';
  return result?.value === value ? result.state : 'saving';
}
export function SaveStatus({ state }: { state: SaveState }) {
  return <p className={'answerSaveStatus ' + state} role="status" aria-live="polite" aria-atomic="true">{state === 'loading' ? 'Loading saved work…' : state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved on this device ✓' : 'Couldn’t save—copy your answer before leaving this page.'}</p>;
}
