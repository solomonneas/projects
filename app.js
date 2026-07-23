import { categoryLabels, ownerLabels, projects } from "./projects.js";

export function filterProjects(items, filters) {
  const query = filters.query.trim().toLocaleLowerCase();

  return items.filter((item) => {
    const matchesOwner = filters.owner === "all" || item.owner === filters.owner;
    const matchesCategory =
      filters.category === "all" || item.category === filters.category;
    const searchable = [
      item.name,
      item.description,
      item.owner,
      item.ownerLabel,
      item.category,
      categoryLabels[item.category] ?? "",
    ]
      .join(" ")
      .toLocaleLowerCase();

    return matchesOwner && matchesCategory && (!query || searchable.includes(query));
  });
}

function createFilterButtons(container, labels, group, state, render) {
  const options = [["all", "All"], ...Object.entries(labels)];

  for (const [value, label] of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = label;
    button.dataset.value = value;
    button.setAttribute("aria-pressed", String(state[group] === value));
    button.addEventListener("click", () => {
      state[group] = state[group] === value && value !== "all" ? "all" : value;
      render();
    });
    container.append(button);
  }
}

function createProjectRow(item) {
  const row = document.createElement("li");
  const link = document.createElement("a");
  const copy = document.createElement("span");
  const name = document.createElement("span");
  const description = document.createElement("span");
  const arrow = document.createElement("span");

  link.className = "project-row";
  link.href = item.url;
  copy.className = "project-copy";
  name.className = "project-name";
  name.textContent = item.name;
  description.className = "project-description";
  description.textContent = item.description;
  arrow.className = "project-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  copy.append(name, description);
  link.append(copy, arrow);
  row.append(link);
  return row;
}

function initializeDirectory() {
  const search = document.querySelector("#project-search");
  const ownerFilters = document.querySelector("#owner-filters");
  const categoryFilters = document.querySelector("#category-filters");
  const resultCount = document.querySelector("#result-count");
  const projectList = document.querySelector("#project-list");
  const emptyState = document.querySelector("#empty-state");
  const resetButton = document.querySelector("#reset-filters");

  if (
    !search ||
    !ownerFilters ||
    !categoryFilters ||
    !resultCount ||
    !projectList ||
    !emptyState ||
    !resetButton
  ) {
    return;
  }

  const state = { query: "", owner: "all", category: "all" };

  const render = () => {
    const filtered = filterProjects(projects, state);

    for (const [group, container] of [
      ["owner", ownerFilters],
      ["category", categoryFilters],
    ]) {
      for (const button of container.querySelectorAll("button")) {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.value === state[group]),
        );
      }
    }

    projectList.replaceChildren(...filtered.map(createProjectRow));
    resultCount.textContent = `${filtered.length} ${
      filtered.length === 1 ? "project" : "projects"
    }`;
    emptyState.hidden = filtered.length !== 0;
  };

  createFilterButtons(ownerFilters, ownerLabels, "owner", state, render);
  createFilterButtons(
    categoryFilters,
    categoryLabels,
    "category",
    state,
    render,
  );

  search.addEventListener("input", (event) => {
    state.query = event.currentTarget.value;
    render();
  });

  resetButton.addEventListener("click", () => {
    state.query = "";
    state.owner = "all";
    state.category = "all";
    search.value = "";
    render();
    search.focus();
  });

  render();
}

if (typeof document !== "undefined") {
  initializeDirectory();
}
