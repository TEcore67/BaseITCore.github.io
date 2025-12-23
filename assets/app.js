import { kpis, users, roles, activity, settings, checkoutLinks } from './mock-data.js';

const THEME_KEY = 'gpo-theme';

const setTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
};

const initTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    setTheme(stored);
    return stored;
  }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const defaultTheme = prefersLight ? 'light' : 'dark';
  setTheme(defaultTheme);
  return defaultTheme;
};

const updateThemeToggleText = (button, theme) => {
  if (!button) return;
  button.querySelector('.theme-label').textContent = theme === 'light' ? 'Light mode' : 'Dark mode';
};

const highlightNavigation = () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    const file = href.split('/').pop();
    const isIndex = !path || path === '' || path === 'index.html';
    const match = (isIndex && (file === '' || file === 'index.html')) || file === path;
    link.classList.toggle('active', match);
  });
};

const renderKpis = () => {
  const grid = document.getElementById('kpi-grid');
  if (!grid) return;
  grid.innerHTML = '';
  kpis.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = item.label;
    const value = document.createElement('h3');
    value.textContent = item.value;
    const trend = document.createElement('p');
    trend.className = 'highlighted-text';
    trend.textContent = item.trend;
    card.append(badge, value, trend);
    grid.appendChild(card);
  });
};

const renderUsers = () => {
  const tbody = document.getElementById('user-rows');
  if (!tbody) return;
  tbody.innerHTML = '';
  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>${user.status}</td>
      <td>${user.lastSeen}</td>
    `;
    tbody.appendChild(row);
  });
};

const renderRoles = () => {
  const list = document.getElementById('role-list');
  if (!list) return;
  list.innerHTML = '';
  roles.forEach((role) => {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = role.name;
    const perms = document.createElement('p');
    perms.className = 'highlighted-text';
    perms.textContent = role.permissions.join(' • ');
    item.append(title, perms);
    list.appendChild(item);
  });
};

const drawActivityChart = () => {
  const canvas = document.getElementById('activity-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const padding = 32;
  const maxValue = Math.max(...activity.map((a) => a.value)) || 1;
  const barWidth = (width - padding * 2) / activity.length - 12;
  activity.forEach((point, index) => {
    const x = padding + index * ((width - padding * 2) / activity.length);
    const barHeight = ((height - padding * 2) * point.value) / maxValue;
    const y = height - padding - barHeight;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(point.label, x, height - padding + 14);
  });
};

const renderSettings = () => {
  const region = document.getElementById('setting-region');
  const sso = document.getElementById('setting-sso');
  const retention = document.getElementById('setting-retention');
  const approvals = document.getElementById('setting-approvals');
  if (!region || !sso || !retention || !approvals) return;
  region.value = settings.region;
  sso.value = settings.sso;
  retention.value = settings.auditRetention;
  approvals.value = settings.changeApprovals;
};

const bindCheckout = () => {
  const buttons = document.querySelectorAll('[data-checkout]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-checkout');
      const url = checkoutLinks[plan];
      if (url) {
        window.open(url, '_blank', 'noopener');
      }
    });
  });
};

const init = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const initialTheme = initTheme();
  updateThemeToggleText(themeToggle, initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = localStorage.getItem(THEME_KEY) || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      updateThemeToggleText(themeToggle, next);
    });
  }

  highlightNavigation();
  renderKpis();
  renderUsers();
  renderRoles();
  drawActivityChart();
  renderSettings();
  bindCheckout();
};

window.addEventListener('DOMContentLoaded', init);
