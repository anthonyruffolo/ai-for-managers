from pathlib import Path

path = Path('ai-for-managers-dashboard/app/page.tsx')
text = path.read_text()
old = "</section>{selectedWeek === 6 ? renderEthicsModule() : renderGovernanceModule()}</>}"
new = "</section>{selectedWeek === 6 ? renderEthicsModule() : selectedWeek === 7 ? renderGovernanceModule() : <section className=\"lmsPanel structuredLesson\"><div className=\"panelBar\"><h3>{structuredModule.artifact}</h3><span>Build workspace</span></div><p>{structuredModule.buildDescription}</p><div className=\"moduleWorkPrompt\"><strong>Implementation status</strong><span>This module defines the approved build requirement. The dedicated interactive artifact is still pending implementation; use this workspace to record the required decision, evidence, safeguards, and verification notes without showing another week&apos;s tool.</span><textarea placeholder=\"Record build notes, evidence, decisions, safeguards, and verification here.\" /></div></section>}</>}"
count = text.count(old)
if count != 1:
    raise SystemExit(f'Expected one shared build-routing match, found {count}')
path.write_text(text.replace(old, new, 1))
print('Generic build routing fixed.')
