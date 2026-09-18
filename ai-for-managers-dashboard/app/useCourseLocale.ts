'use client';

import { useEffect, useRef } from 'react';
import translations from './course-translations.json';

export type CourseLanguage = 'en' | 'es' | 'de' | 'ko' | 'zh-CN';

export function courseText(language: CourseLanguage, value: string) {
  return language === 'en' ? value : (translations[language] as Record<string, string>)[value] ?? value;
}

type TextRecord = { original: string; display: string };
type AttributeRecord = Record<string, TextRecord>;

export function useCourseLocale(language: CourseLanguage) {
  const textRecords = useRef(new WeakMap<Text, TextRecord>());
  const attributeRecords = useRef(new WeakMap<Element, AttributeRecord>());

  useEffect(() => {
    const root = document.querySelector('.lmsShell');
    if (!root) return;
    const dictionary: Record<string, string> = language === 'en' ? {} : translations[language];
    document.documentElement.lang = language;

    function translated(value: string) {
      const plain = value.trim();
      const replacement = dictionary[plain];
      if (!replacement || !plain) return value;
      const start = value.indexOf(plain);
      return value.slice(0, start) + replacement + value.slice(start + plain.length);
    }

    function scan() {
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        const parent = text.parentElement;
        if (!parent || parent.closest('script, style, textarea, select, option, [contenteditable], [data-no-translate]')) continue;
        const current = text.data;
        const prior = textRecords.current.get(text);
        if (['BUSI 610', 'DW'].includes((prior?.original ?? current).trim())) {
          if (prior && current !== prior.original) text.data = prior.original;
          continue;
        }
        let record = textRecords.current.get(text);
        if (!record) {
          record = { original: current, display: current };
          textRecords.current.set(text, record);
        } else if (current !== record.display && current !== record.original) {
          record.original = current;
        }
        const next = translated(record.original);
        record.display = next;
        if (current !== next) text.data = next;
      }

      root.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach((element) => {
        if (element.closest('[data-no-translate]')) return;
        const records = attributeRecords.current.get(element) ?? {};
        for (const attribute of ['placeholder', 'aria-label', 'title', 'alt']) {
          const current = element.getAttribute(attribute);
          if (current === null) continue;
          let record = records[attribute];
          if (!record) record = records[attribute] = { original: current, display: current };
          else if (current !== record.display && current !== record.original) record.original = current;
          const next = translated(record.original);
          record.display = next;
          if (current !== next) element.setAttribute(attribute, next);
        }
        attributeRecords.current.set(element, records);
      });
    }

    const observer = new MutationObserver(scan);
    observer.observe(root, { childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title', 'alt'], subtree: true });
    scan();
    return () => observer.disconnect();
  }, [language]);
}
