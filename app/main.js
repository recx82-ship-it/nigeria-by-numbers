// Router and interactions. Hash routes only, no network: every page is
// rendered from the data in data.js, and every control on a page works.

import { GDP_GROWTH, GDP_NOMINAL, POPULATION_SERIES, STATES } from './data.js';
import { barChart, fmt, lineChart } from './charts.js';
import { economy, healthEducation, missing, overview, population, sources, statesTable } from './views.js';

const app = document.getElementById('app');

const ROUTES = {
  '/': overview,
  '/population': population,
  '/economy': economy,
  '/states': statesTable,
  '/health-education': healthEducation,
  '/sources': sources,
};

function route() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  const render = ROUTES[path] || missing;
  app.innerHTML = render();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('href') === `#${path}`);
  });
  if (path === '/states') initStatesTable();
  if (path === '/population') initPopToggle();
  if (path === '/economy') initGdpToggle();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function popChartData(view) {
  if (view === 'growth') {
    return POPULATION_SERIES.slice(1).map((d, i) => ({
      label: `${POPULATION_SERIES[i].year}–${d.year}`,
      value: Math.round(((d.pop - POPULATION_SERIES[i].pop) / POPULATION_SERIES[i].pop) * 1000) / 10,
    }));
  }
  return POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.pop }));
}

function initPopToggle() {
  const chart = document.getElementById('pop-chart');
  if (!chart) return;
  document.querySelectorAll('[data-pop-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-pop-view]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const view = btn.getAttribute('data-pop-view');
      chart.innerHTML = view === 'growth'
        ? barChart(popChartData('growth'), { format: (v) => `${v}%`, color: '#c9a227' })
        : barChart(popChartData('total'), { format: (v) => `${v}m` });
    });
  });
}

function initGdpToggle() {
  const chart = document.getElementById('gdp-chart');
  if (!chart) return;
  document.querySelectorAll('[data-gdp-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-gdp-view]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const view = btn.getAttribute('data-gdp-view');
      if (view === 'growth') {
        const data = GDP_GROWTH.map((d) => ({ label: String(d.year).slice(2), value: d.growth }));
        chart.innerHTML = lineChart(data, { format: (v) => `${v}%` });
      } else {
        const data = GDP_NOMINAL.map((d) => ({ label: String(d.year).slice(2), value: d.gdp }));
        chart.innerHTML = barChart(data, { format: (v) => `₦${v}trn` });
      }
    });
  });
}

// States table: sortable columns, zone filter buttons, live search.
function initStatesTable() {
  const tbody = document.querySelector('#states-table tbody');
  const search = document.getElementById('state-search');
  const count = document.getElementById('state-count');
  if (!tbody || !search || !count) return;

  const state = { sort: 'pop', dir: 'desc', zone: 'All zones', query: '' };

  function density(s) {
    return s.pop / s.area;
  }

  function compare(a, b) {
    const key = state.sort;
    let va;
    let vb;
    if (key === 'density') {
      va = density(a);
      vb = density(b);
    } else if (key === 'pop' || key === 'area') {
      va = a[key];
      vb = b[key];
    } else {
      va = a[key].toLowerCase();
      vb = b[key].toLowerCase();
    }
    if (va < vb) return state.dir === 'asc' ? -1 : 1;
    if (va > vb) return state.dir === 'asc' ? 1 : -1;
    return 0;
  }

  function render() {
    const q = state.query.trim().toLowerCase();
    const rows = STATES.filter(
      (s) => (state.zone === 'All zones' || s.zone === state.zone) &&
        (!q || s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q)),
    ).sort(compare);
    tbody.innerHTML = rows
      .map(
        (s) => `<tr><td><strong>${s.name}</strong></td><td>${s.capital}</td><td>${s.zone}</td>` +
          `<td class="num">${fmt(s.pop)}</td><td class="num">${fmt(s.area)}</td>` +
          `<td class="num">${fmt(Math.round(density(s)))}</td></tr>`,
      )
      .join('') || '<tr><td colspan="6">No state matches that search.</td></tr>';
    count.textContent = `${rows.length} of ${STATES.length} states & FCT`;
    document.querySelectorAll('#states-table th button').forEach((b) => {
      const active = b.getAttribute('data-sort') === state.sort;
      b.classList.toggle('is-sorted', active);
      b.textContent = b.textContent.replace(/ [▲▼]$/, '');
      if (active) b.textContent += state.dir === 'asc' ? ' ▲' : ' ▼';
    });
  }

  document.querySelectorAll('#states-table th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-sort');
      if (state.sort === key) {
        state.dir = state.dir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort = key;
        state.dir = key === 'name' || key === 'capital' || key === 'zone' ? 'asc' : 'desc';
      }
      render();
    });
  });

  document.querySelectorAll('[data-zone]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-zone]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.zone = btn.getAttribute('data-zone');
      render();
    });
  });

  search.addEventListener('input', () => {
    state.query = search.value;
    render();
  });

  render();
}

window.addEventListener('hashchange', route);
route();
