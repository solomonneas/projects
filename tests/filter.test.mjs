import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects } from "../app.js";

const fixtures = [
  {
    name: "Brigade",
    owner: "escoffier-labs",
    ownerLabel: "Escoffier Labs",
    category: "agent-operations",
    description: "Agent work receipts.",
  },
  {
    name: "Vervet",
    owner: "lidless-labs",
    ownerLabel: "Lidless Labs",
    category: "threat-intelligence",
    description: "Network threat hunting.",
  },
];

test("search is case insensitive across project fields", () => {
  assert.deepEqual(
    filterProjects(fixtures, { query: "VERVET", owner: "all", category: "all" }),
    [fixtures[1]],
  );
  assert.deepEqual(
    filterProjects(fixtures, { query: "agent", owner: "all", category: "all" }),
    [fixtures[0]],
  );
  assert.deepEqual(
    filterProjects(fixtures, { query: "LIDLESS", owner: "all", category: "all" }),
    [fixtures[1]],
  );
});

test("owner and category filters combine", () => {
  assert.deepEqual(
    filterProjects(fixtures, {
      query: "",
      owner: "lidless-labs",
      category: "threat-intelligence",
    }),
    [fixtures[1]],
  );
  assert.deepEqual(
    filterProjects(fixtures, {
      query: "",
      owner: "escoffier-labs",
      category: "threat-intelligence",
    }),
    [],
  );
});
