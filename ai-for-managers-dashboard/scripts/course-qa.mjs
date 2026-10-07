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
const canon = read(resolve(repoRoot, 'docs/COURSE_CANON.md'));
const readme = read(resolve(repoRoot, 'README.md'));

const failures = [];
const requireText = (name, source, value) => {
  if (!source.includes(value)) failures.push(`${name}: missing "${value}"`);
};
const forbidText = (name, source, value) => {
  if (source.includes(value)) failures.push(`${name}: stale or forbidden text "${value}"`);
};

const artifacts = [
  [1, 'Dashboard Starter Version'],
  [2, 'AI Tools'],
  [3, 'Research & Know'],
  [4, 'AI Productivity'],
  [5, 'Manager Decision Assistant'],
  [6, 'AI Ethics Checker'],
  [7, 'Responsible AI Policy'],
  [8, 'Customer Evidence Decision Brief'],
  [9, 'Human-Reviewed AI Workflow'],
  [10, 'AI Use / Disclosure Log'],
  [11, 'Values-Based AI Decision Framework'],
  [12, 'Workforce Impact Map'],
  [13, 'AI Implementation Plan'],
  [14, 'Dashboard Testing and Revision Record'],
  [15, 'Final Integrated AI Management Dashboard'],
];

for (const [week, artifact] of artifacts) {
  for (const [name, source] of [
    ['page.tsx', page],
    ['course-assistant-data.ts', assistant],
    ['course-structure/page.tsx', structure],
    ['DASHBOARD_BUILD_TRACKER.md', tracker],
    ['COURSE_DASHBOARD_ARCHITECTURE.md', architecture],
    ['COURSE_CANON.md', canon],
  ]) requireText(`${name} Week ${week}`, source, artifact);
}

for (const [, artifact] of artifacts.filter(([week]) => week >= 8)) {
  requireText('course-progression.ts', progression, artifact);
  requireText('qol-enhancements.tsx', search, artifact);
}

const majorAssessmentIds = [
  'quiz-2-tools',
  'assessment-quiz-2',
  'assessment-test',
  'assessment-quiz-3',
  'assessment-test-2',
  'assessment-quiz-4',
  'assessment-final-exam',
];
for (const id of majorAssessmentIds) requireText('page.tsx assessment schedule', page, id);
for (const id of ['quiz-2-tools', 'assessment-quiz-2', 'assessment-test', 'assessment-quiz-3', 'assessment-test-2', 'assessment-quiz-4', 'assessment-final-exam']) {
  requireText('course-assistant-data.ts assessment schedule', assistant, id);
  requireText('qol-enhancements.tsx assessment schedule', search, id);
}

for (let discussion = 1; discussion <= 7; discussion += 1) {
  requireText('page.tsx discussion schedule', page, `DISCUSSION ${discussion}`);
  requireText('COURSE_CANON.md discussion schedule', canon, `Discussion ${discussion}`);
}

requireText('page.tsx', page, 'FinalizedArtifactBuilder');
requireText('page.tsx', page, 'MajorAssessment');
requireText('page.tsx', page, 'week10-log-task');
requireText('page.tsx', page, 'renderFinalDashboard');
forbidText('page.tsx', page, '<h3>Responsible AI Policy Builder</h3>');
forbidText('page.tsx', page, "id: 'build-policy'");
forbidText('page.tsx', page, "id: 'submit-policy'");
forbidText('page.tsx', page, '<h3>AI Ethics Checker</h3>');
forbidText('page.tsx', page, "id: 'build-ethics'");
forbidText('page.tsx', page, "id: 'submit-ethics'");
requireText('page.tsx', page, 'Test 1 Study Guide · Weeks 1–7');
requireText('page.tsx', page, 'Object.keys(focusedDiscussions).map(Number)');
requireText('README.md', readme, 'docs/COURSE_CANON.md');
requireText('README.md', readme, 'docs/BUILDER_HANDOFF_TEMPLATE.md');

forbidText('page.tsx', page, "artifact: 'Prompt Library'");
forbidText('course-assistant-data.ts', assistant, "artifact: 'Prompt Library'");
forbidText('course-structure/page.tsx', structure, "Add a Prompt Library");
forbidText('page.tsx', page, 'Manager AI Assistant and decision brief');
forbidText('page.tsx', page, 'AI Verification Center and claim audit');
forbidText('qol-enhancements.tsx', search, 'Manager AI Assistant and decision memo');
forbidText('qol-enhancements.tsx', search, 'AI Verification Center and three-claim audit');
forbidText('page.tsx', page, "[6, 7, 8, 9, 11, 12, 13, 14, 15].includes(selectedWeek)");
forbidText('page.tsx', page, "title: 'Orient & prototype'");
forbidText('page.tsx', page, "title: 'Deploy & Use'");
forbidText('page.tsx', page, "title: 'Analyze & decide'");
forbidText('page.tsx', page, "title: 'Automate & coordinate'");
forbidText('qol-enhancements.tsx', search, "'Orient & prototype'");
forbidText('qol-enhancements.tsx', search, "'Deploy & Use'");
forbidText('qol-enhancements.tsx', search, "'Measure value'");
forbidText('qol-enhancements.tsx', search, "'Lead adoption'");
forbidText('qol-enhancements.tsx', search, 'Course Synthesis: From Problem to Product');
forbidText('README.md', readme, 'BUILDER_HANDOFF_CHECKLIST.md');

if (page.includes('dedicated interactive artifact is still pending implementation')) {
  failures.push('page.tsx: legacy pending-artifact fallback still exists');
}

if (failures.length) {
  console.error('Course QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Course QA passed: canonical artifacts, assessment IDs, seven-discussion schedule, search/assistant synchronization, and retired-content guards are all present.');
