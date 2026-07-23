import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("the page exposes the directory controls and live results", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /<label[^>]*for="project-search"/);
  assert.match(html, /<input[^>]*id="project-search"[^>]*type="search"/);
  assert.match(html, /id="owner-filters"/);
  assert.match(html, /id="category-filters"/);
  assert.match(html, /id="result-count"[^>]*aria-live="polite"/);
  assert.match(html, /id="project-list"/);
  assert.match(html, /id="empty-state"[^>]*hidden/);
});

test("the source stays flat and responsive", async () => {
  const [html, css] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);
  const source = `${html}\n${css}`.toLowerCase();

  assert.doesNotMatch(source, /\b(card|badge|online|registry online)\b/);
  assert.doesNotMatch(source, /row-number|project-number/);
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.match(css, /overflow-x:\s*hidden/);
});

test("project links open a new tab safely", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.match(app, /link\.target\s*=\s*"_blank"/);
  assert.match(app, /link\.rel\s*=\s*"noopener noreferrer"/);
});
