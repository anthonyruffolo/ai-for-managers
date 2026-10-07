import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../app/save-status.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const moduleExports = { exports: {} };
new Function('require','module','exports',compiled)(require,moduleExports,moduleExports.exports);
const { persistAnswers, SaveStatus } = moduleExports.exports;
const { renderToStaticMarkup } = require('react-dom/server');
const { createElement } = require('react');
let stored;
assert.equal(persistAnswers({ setItem: (key, value) => { stored = [key, value]; } }, 'answers', { reflection: 'My notes' }), 'saved');
assert.deepEqual(stored, ['answers', '{"reflection":"My notes"}']);
assert.equal(persistAnswers({ setItem: () => { throw new Error('Quota exceeded'); } }, 'answers', {}), 'error');
assert.equal(persistAnswers({ setItem: () => { throw new Error('Storage blocked'); } }, 'answers', {}), 'error');
for (const [state, text] of [['loading','Loading saved work'],['saving','Saving'],['saved','Saved on this device'],['error','copy your answer']]) {
 const markup = renderToStaticMarkup(createElement(SaveStatus, { state }));
 assert.ok(markup.includes(text));
 assert.ok(markup.includes('role="status"'));
 if (state === 'error') assert.ok(!markup.includes('Saved on this device'));
}
console.log('Save checks passed: successful writes, quota failures, blocked storage, and accessible status messages.');
