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
