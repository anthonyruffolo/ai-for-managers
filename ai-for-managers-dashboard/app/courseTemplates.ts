import type { CourseLanguage } from './useCourseLocale';

type HelpMode = 'instructions' | 'technical' | 'team';
type BriefFields = { goal: string; context: string; constraints: string; success: string };

type Copy = {
  brief: { goal: string; context: string; constraints: string; success: string; hints: [string, string, string, string]; guidance: string };
  help: Record<HelpMode, (week: number) => string>;
};

const copy: Record<CourseLanguage, Copy> = {
  en: {
    brief: { goal: 'Goal', context: 'Context', constraints: 'Constraints', success: 'Success looks like', hints: ['[state the outcome]', '[add audience, situation, inputs, and background]', '[add limits, privacy rules, time, and format]', '[define an observable standard]'], guidance: 'Ask focused questions before proposing a solution. Help me work in small steps, test the result, identify risks, and improve it. Distinguish facts, assumptions, and recommendations. I remain responsible for the final decision.' },
    help: {
      instructions: (week) => ['Subject: Question about Week ' + week + ' instructions', '', 'Module or assignment: ', 'The instruction I am unsure about: ', 'What I think it means: ', 'What I have already tried: ', 'My specific question: '].join('\n'),
      technical: (week) => ['Subject: Technical blocker in Week ' + week, '', 'What I expected to happen: ', 'What happened instead: ', 'Steps I already tried: ', 'Device/browser (no passwords or private data): ', 'When I need help by: '].join('\n'),
      team: (week) => ['Subject: Request for a private team check-in', '', 'Week: ' + week, 'Contribution concern: ', 'Evidence from our contribution record: ', 'Steps the team has already taken: ', 'What support I am requesting: '].join('\n'),
    },
  },
  es: {
    brief: { goal: 'Objetivo', context: 'Contexto', constraints: 'Restricciones', success: 'Criterio de éxito', hints: ['[indica el resultado esperado]', '[añade público, situación, datos de entrada y antecedentes]', '[añade límites, privacidad, plazo y formato]', '[define un criterio observable]'], guidance: 'Haz preguntas concretas antes de proponer una solución. Ayúdame a trabajar en pasos pequeños, probar el resultado, identificar riesgos y mejorarlo. Distingue entre hechos, supuestos y recomendaciones. La decisión final es mi responsabilidad.' },
    help: {
      instructions: (week) => ['Asunto: Pregunta sobre las instrucciones de la semana ' + week, '', 'Módulo o tarea: ', 'Instrucción que no entiendo: ', 'Lo que creo que significa: ', 'Lo que ya intenté: ', 'Mi pregunta concreta: '].join('\n'),
      technical: (week) => ['Asunto: Problema técnico en la semana ' + week, '', 'Qué esperaba que sucediera: ', 'Qué sucedió: ', 'Pasos que ya intenté: ', 'Dispositivo/navegador (sin contraseñas ni datos privados): ', 'Fecha en que necesito ayuda: '].join('\n'),
      team: (week) => ['Asunto: Solicitud de conversación privada sobre el equipo', '', 'Semana: ' + week, 'Problema de contribución: ', 'Pruebas del registro de contribuciones: ', 'Medidas que ya tomó el equipo: ', 'Apoyo que solicito: '].join('\n'),
    },
  },
  de: {
    brief: { goal: 'Ziel', context: 'Kontext', constraints: 'Vorgaben', success: 'Erfolgskriterium', hints: ['[gewünschtes Ergebnis angeben]', '[Zielgruppe, Situation, Eingaben und Hintergrund ergänzen]', '[Grenzen, Datenschutz, Zeit und Format ergänzen]', '[beobachtbaren Maßstab festlegen]'], guidance: 'Stelle gezielte Fragen, bevor du eine Lösung vorschlägst. Hilf mir, in kleinen Schritten zu arbeiten, das Ergebnis zu prüfen, Risiken zu erkennen und es zu verbessern. Unterscheide Fakten, Annahmen und Empfehlungen. Die endgültige Entscheidung liegt bei mir.' },
    help: {
      instructions: (week) => ['Betreff: Frage zu den Anweisungen für Woche ' + week, '', 'Modul oder Aufgabe: ', 'Unklare Anweisung: ', 'Meine bisherige Deutung: ', 'Was ich bereits versucht habe: ', 'Meine konkrete Frage: '].join('\n'),
      technical: (week) => ['Betreff: Technisches Problem in Woche ' + week, '', 'Was ich erwartet habe: ', 'Was stattdessen passiert ist: ', 'Bereits versuchte Schritte: ', 'Gerät/Browser (keine Passwörter oder privaten Daten): ', 'Bis wann ich Hilfe brauche: '].join('\n'),
      team: (week) => ['Betreff: Bitte um vertrauliches Teamgespräch', '', 'Woche: ' + week, 'Anliegen zur Mitarbeit: ', 'Belege aus unserem Beitragsprotokoll: ', 'Bereits unternommene Schritte des Teams: ', 'Welche Unterstützung ich brauche: '].join('\n'),
    },
  },
  ko: {
    brief: { goal: '목표', context: '맥락', constraints: '제약 조건', success: '성공 기준', hints: ['[원하는 결과를 적으세요]', '[대상, 상황, 입력 자료와 배경을 추가하세요]', '[제한 사항, 개인정보 보호, 시간과 형식을 추가하세요]', '[관찰 가능한 기준을 정의하세요]'], guidance: '해결책을 제안하기 전에 구체적인 질문을 하세요. 작은 단계로 작업하고, 결과를 시험하고, 위험을 파악하고, 개선하도록 도와주세요. 사실, 가정, 권고를 구분하세요. 최종 결정의 책임은 저에게 있습니다.' },
    help: {
      instructions: (week) => ['제목: ' + week + '주차 지침에 관한 질문', '', '모듈 또는 과제: ', '이해되지 않는 지침: ', '제가 이해한 내용: ', '이미 시도한 것: ', '구체적인 질문: '].join('\n'),
      technical: (week) => ['제목: ' + week + '주차 기술적 문제', '', '예상한 결과: ', '실제로 일어난 일: ', '이미 시도한 단계: ', '기기/브라우저(비밀번호나 개인정보 제외): ', '도움이 필요한 시점: '].join('\n'),
      team: (week) => ['제목: 비공개 팀 상담 요청', '', '주차: ' + week, '팀 기여 관련 우려: ', '기여 기록에 있는 근거: ', '팀에서 이미 취한 조치: ', '요청하는 지원: '].join('\n'),
    },
  },
  'zh-CN': {
    brief: { goal: '目标', context: '背景', constraints: '限制条件', success: '成功标准', hints: ['[写明预期结果]', '[补充受众、情境、输入信息和背景]', '[补充限制、隐私要求、时间和格式]', '[定义可观察的标准]'], guidance: '在提出方案前先问具体问题。帮助我分步骤开展工作、测试结果、识别风险并加以改进。区分事实、假设和建议。最终决定由我负责。' },
    help: {
      instructions: (week) => ['主题：关于第' + week + '周说明的问题', '', '模块或作业：', '我不确定的说明：', '我对说明的理解：', '我已经尝试过的方法：', '我的具体问题：'].join('\n'),
      technical: (week) => ['主题：第' + week + '周的技术问题', '', '我预期发生的情况：', '实际发生的情况：', '我已尝试的步骤：', '设备/浏览器（请勿填写密码或私人信息）：', '我需要帮助的时间：'].join('\n'),
      team: (week) => ['主题：申请私下讨论团队问题', '', '周次：' + week, '团队贡献方面的顾虑：', '贡献记录中的证据：', '团队已采取的措施：', '我需要的支持：'].join('\n'),
    },
  },
};

export function buildAiBrief(language: CourseLanguage, fields: BriefFields) {
  const t = copy[language].brief;
  return [
    t.goal + ': ' + (fields.goal || t.hints[0]),
    t.context + ': ' + (fields.context || t.hints[1]),
    t.constraints + ': ' + (fields.constraints || t.hints[2]),
    t.success + ': ' + (fields.success || t.hints[3]),
    t.guidance,
  ].join('\n\n');
}

export function buildHelpMessage(language: CourseLanguage, mode: HelpMode, week: number) {
  return copy[language].help[mode](week);
}
