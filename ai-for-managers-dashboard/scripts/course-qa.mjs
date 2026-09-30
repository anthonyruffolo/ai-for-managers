import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const repoRoot = resolve(appRoot, '..');

const read = (path) => readFileSync(path, 'utf8');
const page = read(resolve(appRoot, 'app/page.tsx'));
const assistant = read(resolve(appRoot, 'app/course-assistant-data.ts'));
const search = read(resolve(appRoot, 'app/qol-enhancements.tsx'));
const structure = read(resolve(appRoot, 'app/course-structure/page.tsx'));
const progression = read(resolve(appRoot, 'app/course-progression.ts'));
const tracker = read(resolve(repoRoot, 'docs/DASHBOARD_BUILD_TRACKER.md'));
const architecture = read(resolve(repoRoot, 'docs/COURSE_DASHBOARD_ARCHITECTURE.md'));

const failures = [];
const requireText = (name, source, value) => {
  if (!source.includes(value)) failures.push(`${name}: missing "${value}"`);
};

const earlyArtifacts = [
  'Dashboard Starter Version',
  'AI Tools',
  'Prompt Library',
  'AI Productivity',
  'Manager Decision Assistant',
  'AI Ethics Checker',
  'Responsible AI Policy',
];

for (const artifact of earlyArtifacts) requireText('page.tsx', page, artifact);

const finalizedArtifacts = [
  'Customer Evidence Decision Brief',
  'Human-Reviewed AI Workflow',
  'AI Use / Disclosure Log',
  'Values-Based AI Decision Framework',
  'Workforce Impact Map',
  'AI Implementation Plan',
  'Dashboard Testing and Revision Record',
  'Final Integrated AI Management Dashboard',
];

for (const artifact of finalizedArtifacts) {
  requireText('course-progression.ts', progression, artifact);
  requireText('page.tsx', page, artifact);
  requireText('course-assistant-data.ts', assistant, artifact);
  requireText('qol-enhancements.tsx', search, artifact);
  requireText('course-structure/page.tsx', structure, artifact);
  requireText('DASHBOARD_BUILD_TRACKER.md', tracker, artifact);
  requireText('COURSE_DASHBOARD_ARCHITECTURE.md', architecture, artifact);
}

requireText('page.tsx', page, 'FinalizedArtifactBuilder');
requireText('page.tsx', page, 'week10-log-task');
requireText('page.tsx', page, 'renderFinalDashboard');
requireText('page.tsx', page, 'week15-check-');
requireText('page.tsx', page, 'Responsible AI Policy Builder');
requireText('page.tsx', page, 'Manager Decision Assistant');

if (page.includes('dedicated interactive artifact is still pending implementation')) {
  failures.push('page.tsx: legacy pending-artifact fallback still exists');
}
if (search.includes('Manager AI Assistant and decision memo')) {
  failures.push('qol-enhancements.tsx: stale Week 8 submission name remains');
}
if (search.includes('AI Verification Center and three-claim audit')) {
  failures.push('qol-enhancements.tsx: stale Week 9 submission name remains');
}

if (failures.length) {
  console.error('Course QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Course QA passed: Weeks 1-7 artifact paths are present and Weeks 8-15 use the finalized progression across app, assistant, search, course structure, architecture, and tracker.');
