# Project Directory Implementation Plan

## Goal and architecture

Build a dependency-free static project directory for GitHub Pages. A checked-in `projects.js` module owns the 51-record curated dataset, `app.js` owns filtering and rendering, `index.html` owns accessible structure, and `styles.css` implements the approved Split Directory layout.

Execute the tasks in order and track every checkbox. Tests use Node's built-in test runner and must fail before the implementation is added.

## File map

- `projects.js`: the curated 51-project data source.
- `app.js`: pure filtering helpers plus browser rendering and event wiring.
- `index.html`: semantic page structure and metadata.
- `styles.css`: Split Directory tokens, layout, rows, focus states, and responsive rules.
- `tests/projects.test.mjs`: dataset count, uniqueness, completeness, and owner-total tests.
- `tests/filter.test.mjs`: search and combined-filter behavior tests.
- `tests/markup.test.mjs`: source-level accessibility and anti-card assertions.
- `package.json`: dependency-free test and local-server scripts.
- `README.md`: purpose, local preview, curation policy, and Pages URL.
- `LICENSE`: MIT license.
- `.gitignore`: local and agent artifacts.
- `.nojekyll`: disables Jekyll processing.
- `404.html`: small route fallback linking to the directory root.

### Task 1: Dataset contract

**Files:**
- Create: `tests/projects.test.mjs`
- Create: `projects.js`

- [x] Write the failing dataset test:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { projects } from "../projects.js";

test("the curated registry contains 51 unique complete projects", () => {
  assert.equal(projects.length, 51);
  assert.equal(new Set(projects.map((project) => project.url)).size, 51);
  for (const project of projects) {
    assert.ok(project.name);
    assert.ok(project.owner);
    assert.ok(project.ownerLabel);
    assert.ok(project.category);
    assert.ok(project.description);
    assert.match(project.url, /^https:\/\/github\.com\/[^/]+\/[^/]+$/);
  }
});

test("owner totals match the approved curation", () => {
  const totals = projects.reduce((counts, { owner }) => {
    counts[owner] = (counts[owner] ?? 0) + 1;
    return counts;
  }, {});
  assert.equal(totals["escoffier-labs"], 12);
  assert.equal(totals["lidless-labs"], 25);
  assert.equal(totals.solomonneas, 14);
});
```

- [x] Run `node --test tests/projects.test.mjs` and expect failure because `projects.js` does not exist.
- [x] Add all 51 approved records to `projects.js`.
- [x] Run the same command and expect two passing tests.
- [x] Commit with `git add projects.js tests/projects.test.mjs && git commit -m "feat: add curated project registry"`.

### Task 2: Filtering behavior

**Files:**
- Create: `tests/filter.test.mjs`
- Create: `app.js`

- [x] Write failing tests for case-insensitive search, owner filtering, category filtering, and combined filtering:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects } from "../app.js";

const fixtures = [
  { name: "Brigade", owner: "escoffier-labs", ownerLabel: "Escoffier Labs", category: "agent-operations", description: "Agent work receipts." },
  { name: "Vervet", owner: "lidless-labs", ownerLabel: "Lidless Labs", category: "threat-intelligence", description: "Network threat hunting." },
];

test("search is case insensitive across project fields", () => {
  assert.deepEqual(filterProjects(fixtures, { query: "VERVET", owner: "all", category: "all" }), [fixtures[1]]);
  assert.deepEqual(filterProjects(fixtures, { query: "agent", owner: "all", category: "all" }), [fixtures[0]]);
});

test("owner and category filters combine", () => {
  assert.deepEqual(filterProjects(fixtures, { query: "", owner: "lidless-labs", category: "threat-intelligence" }), [fixtures[1]]);
  assert.deepEqual(filterProjects(fixtures, { query: "", owner: "escoffier-labs", category: "threat-intelligence" }), []);
});
```

- [x] Run `node --test tests/filter.test.mjs` and expect failure because `app.js` does not exist.
- [x] Implement and export `filterProjects(projects, filters)` without touching the DOM.
- [x] Add guarded browser rendering that only runs when `document` exists.
- [x] Run the test and expect two passing tests.
- [x] Commit with `git add app.js tests/filter.test.mjs && git commit -m "feat: add directory filtering"`.

### Task 3: Accessible Split Directory shell

**Files:**
- Create: `tests/markup.test.mjs`
- Create: `index.html`
- Create: `styles.css`
- Create: `.nojekyll`
- Create: `404.html`

- [x] Write a failing source-level test that reads `index.html` and `styles.css` and asserts:
  - one labeled search input
  - owner and category filter containers
  - a result-count live region
  - a project-list container
  - no `card`, `badge`, `online`, `live`, or numbered-row patterns
  - responsive rules at 700px
- [x] Run `node --test tests/markup.test.mjs` and expect failure because the page files do not exist.
- [x] Implement the semantic page shell in `index.html`.
- [x] Implement the approved light Split Directory layout in `styles.css` using one neutral palette, one density scale, flat separator rows, and radius only on controls.
- [x] Add `.nojekyll` and a small `404.html` root link.
- [x] Run `node --test tests/markup.test.mjs` and expect all markup assertions to pass.
- [x] Commit with `git add index.html styles.css .nojekyll 404.html tests/markup.test.mjs && git commit -m "feat: build split project directory"`.

### Task 4: Repository documentation and complete verification

**Files:**
- Create: `package.json`
- Create: `README.md`
- Create: `LICENSE`
- Create: `.gitignore`

- [x] Add dependency-free scripts:

```json
{
  "type": "module",
  "scripts": {
    "test": "node --test",
    "serve": "python3 -m http.server 4173"
  }
}
```

- [x] Write the public README with the Pages URL, local preview command, dataset policy, and repository structure.
- [x] Add the MIT license and ignore environment, editor, OS, agent, and temporary files.
- [x] Run `npm test` and expect all tests to pass.
- [x] Run a local server and verify desktop plus mobile behavior in a browser.
- [x] Run the complete publish-readiness tree and history checks. The required verdict is `SHIP`.
- [x] Commit with `git add -A && git commit -m "docs: prepare project directory for publication"`.

### Task 5: Publish and connect the profile

**Files:**
- Remote-create: `solomonneas/projects`
- Remote-modify: `solomonneas/solomonneas/README.md`

- [ ] Create the public GitHub repository without an generated README or license.
- [ ] Push local `main` and confirm the remote commit matches local `HEAD`.
- [ ] Enable GitHub Pages from the `main` branch root.
- [ ] Wait for `https://solomonneas.github.io/projects/` to return HTTP 200.
- [ ] Replace the profile README's `Other work` line with the approved `Projects` link in the existing link row.
- [ ] Fetch both remote READMEs and the live Pages site to verify the final public state.
- [ ] Write the standard memory handoff under `.claude/memory-handoffs/`.
