const CHECKOUT_ERROR_MESSAGE =
  "We couldn't start checkout. Please contact support if this persists.";

function setTheme(theme) {
  const body = document.body;
  if (theme === "light") {
    body.classList.add("light");
  } else {
    body.classList.remove("light");
  }
  localStorage.setItem("gpo-theme", theme);
}

function initThemeToggle() {
  const saved = localStorage.getItem("gpo-theme");
  if (saved === "light") setTheme("light");
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
    toggle.setAttribute("aria-pressed", String(!isLight));
  });
}

function highlightNav() {
  const path = window.location.pathname.split("/").filter(Boolean);
  const current = path[path.length - 1] || "index.html";
  const section = path.includes("docs") ? "docs" : path.includes("dashboard") ? "dashboard" : null;
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    const navSection = link.getAttribute("data-nav-section");
    if ((section && navSection === section) || (href && href.endsWith(current))) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initDocsSearch() {
  const search = document.querySelector("[data-docs-search]");
  const links = document.querySelectorAll(".docs-nav a");
  if (!search || !links.length) return;
  const noResults = document.querySelector("[data-search-empty]");

  const filter = () => {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    links.forEach((link) => {
      const match = link.textContent.toLowerCase().includes(term);
      link.parentElement.style.display = match ? "block" : "none";
      if (match) visible += 1;
    });
    if (noResults) noResults.hidden = visible !== 0;
  };

  search.addEventListener("input", filter);
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== search) {
      search.focus();
      event.preventDefault();
    }
  });
  filter();
}

function initCheckoutButtons() {
  const buttons = document.querySelectorAll("[data-checkout-plan]");
  if (!buttons.length) return;
  const apiBase = document.body.dataset.billingApiBase || "";
  const userId = document.body.dataset.userId;
  buttons.forEach((button) => {
    button.setAttribute("href", "#");
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      if (!userId) {
        console.warn("Missing data-user-id on <body> for checkout.");
        window.alert(CHECKOUT_ERROR_MESSAGE);
        return;
      }

      try {
        const response = await fetch(`${apiBase}/billing/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
          window.alert(CHECKOUT_ERROR_MESSAGE);
          return;
        }

        const data = await response.json();
        if (data.checkout_url) {
          window.open(data.checkout_url, "_blank", "noopener,noreferrer");
          return;
        }

        window.alert(CHECKOUT_ERROR_MESSAGE);
      } catch (error) {
        console.error("Checkout error:", error);
        window.alert(CHECKOUT_ERROR_MESSAGE);
      }
    });
  });
}

function renderKPIs() {
  const grid = document.querySelector("[data-kpi-grid]");
  if (!grid || !window.MOCK_KPIS) return;
  grid.innerHTML = "";
  window.MOCK_KPIS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card metric";
    const badge = document.createElement("span");
    badge.className = `badge status ${item.trend === "warning" ? "warning" : item.trend === "up" ? "success" : "danger"}`;
    badge.textContent = item.trend === "up" ? "Stable" : item.trend === "warning" ? "Watch" : "Attention";
    card.innerHTML = `<div class="meta">${item.label}</div><div class="value">${item.value}</div>`;
    card.appendChild(badge);
    grid.appendChild(card);
  });
}

function renderUsers() {
  const tableBody = document.querySelector("[data-users-table]");
  if (!tableBody || !window.MOCK_USERS) return;
  tableBody.innerHTML = "";
  window.MOCK_USERS.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.name}</td><td>${user.role}</td><td><span class="status ${user.status === "active" ? "success" : "warning"}">${user.status}</span></td>`;
    tableBody.appendChild(row);
  });
}

function renderRoles() {
  const list = document.querySelector("[data-roles-list]");
  if (!list || !window.MOCK_ROLES) return;
  list.innerHTML = "";
  window.MOCK_ROLES.forEach((role) => {
    const li = document.createElement("li");
    li.textContent = `${role.name} — ${role.permissions}`;
    list.appendChild(li);
  });
}

function renderActivity() {
  const list = document.querySelector("[data-activity]");
  if (!list || !window.MOCK_ACTIVITY) return;
  list.innerHTML = "";
  window.MOCK_ACTIVITY.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `<div class="stack"><strong>${entry.title}</strong><span class="meta">${entry.detail}</span><span class="status ${entry.status}">${entry.status}</span></div>`;
    list.appendChild(item);
  });
}

function renderAnalytics() {
  const list = document.querySelector("[data-analytics]");
  if (!list || !window.MOCK_ANALYTICS) return;
  list.innerHTML = "";
  window.MOCK_ANALYTICS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="stack"><div class="meta">${item.metric}</div><div class="value">${item.value}</div><span class="meta">${item.change}</span></div>`;
    list.appendChild(card);
  });
}

function renderSettings() {
  const list = document.querySelector("[data-settings]");
  if (!list || !window.MOCK_SETTINGS) return;
  list.innerHTML = "";
  window.MOCK_SETTINGS.forEach((setting) => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `<strong>${setting.name}</strong><div class="meta">${setting.status}</div>`;
    list.appendChild(item);
  });
}

function initDocsBreadcrumb() {
  const trail = document.querySelector("[data-breadcrumb]");
  if (!trail) return;
  const segments = window.location.pathname.split("/").filter(Boolean);
  trail.innerHTML = "";
  segments.forEach((segment, index) => {
    const span = document.createElement("span");
    const readable = segment.replace(".html", "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    span.textContent = readable;
    trail.appendChild(span);
    if (index < segments.length - 1) {
      const divider = document.createElement("span");
      divider.textContent = "/";
      trail.appendChild(divider);
    }
  });
}

function initKeyboardNavigation() {
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      const firstLink = document.querySelector(".nav-link");
      if (firstLink) {
        firstLink.focus();
        event.preventDefault();
      }
    }
  });
}

function initializeDashboard() {
  renderKPIs();
  renderUsers();
  renderRoles();
  renderActivity();
  renderAnalytics();
  renderSettings();
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  highlightNav();
  initDocsSearch();
  initCheckoutButtons();
  initDocsBreadcrumb();
  initKeyboardNavigation();
  initializeDashboard();
});
