// Hash router and control wiring for Nigeria by Numbers.
// Routes: #/ overview, #/population, #/economy, #/states,
// #/health-education, #/sources. Anything else is the not-found page.

import { economyView, healthView, notFoundView, overviewView, populationView, sourcesView, statesView } from './views.js';

const NAV = [
  { path: '#/', label: 'Overview' },
  { path: '#/population', label: 'Population' },
  { path: '#/economy', label: 'Economy' },
  { path: '#/states', label: 'States' },
  { path: '#/health-education', label: 'Health & Education' },
  { path: '#/sources', label: 'Sources' },
];

// Page state that survives re-renders: the two chart toggles and the
// states table's sort, zone filter and search text.
const pageState = {
  popMode: 'total',
  gdpMode: 'nominal',
  states: { sort: 'population', zone: 'All zones', query: '' },
};

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

function navHtml(activePath) {
  return NAV.map((item) => {
    const active = item.path === activePath ? ' aria-current="page"' : '';
    return `<a href="${item.path}"${active}>${item.label}</a>`;
  }).join('');
}

function route() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '') || '/';
  if (path === '/' || path === '') return { name: 'overview', html: overviewView() };
  if (path === '/population') return { name: 'population', html: populationView(pageState.popMode) };
  if (path === '/economy') return { name: 'economy', html: economyView(pageState.gdpMode) };
  if (path === '/states') return { name: 'states', html: statesView(pageState.states) };
  if (path === '/health-education') return { name: 'health', html: healthView() };
  if (path === '/sources') return { name: 'sources', html: sourcesView() };
  return { name: 'notfound', html: notFoundView() };
}

function activeNavPath(path) {
  const found = NAV.find((item) => item.path === `#${path}`);
  return found ? found.path : '#/';
}

function render() {
  const { name, html } = route();
  const path = (window.location.hash || '#/').replace(/^#/, '') || '/';
  app.innerHTML = html;
  nav.innerHTML = navHtml(activeNavPath(path));
  const titles = {
    overview: 'Overview',
    population: 'Population & demographics',
    economy: 'Economy',
    states: 'States & regions',
    health: 'Health & education',
    sources: 'Sources & methods',
    notfound: 'Page not found',
  };
  document.title = `Nigeria by numbers — ${titles[name] ?? 'Nigeria'}`;
  window.__shotReady = true;
}

// One delegated listener for every control the pages render: the two
// chart toggles, the states sort and zone buttons, and the search box.
document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const popView = button.getAttribute('data-pop-view');
  if (popView) {
    pageState.popMode = popView;
    render();
    return;
  }
  const gdpView = button.getAttribute('data-gdp-view');
  if (gdpView) {
    pageState.gdpMode = gdpView;
    render();
    return;
  }
  const sort = button.getAttribute('data-sort');
  if (sort) {
    pageState.states.sort = sort;
    render();
    return;
  }
  const zone = button.getAttribute('data-zone');
  if (zone) {
    pageState.states.zone = zone;
    render();
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id !== 'state-search') return;
  pageState.states.query = event.target.value;
  // Re-render only the table and the count, so the search box keeps focus.
  const html = statesView(pageState.states);
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const table = temp.querySelector('#states-table');
  const count = temp.querySelector('#state-count');
  const liveTable = document.getElementById('states-table');
  const liveCount = document.getElementById('state-count');
  if (liveTable && table) liveTable.replaceWith(table);
  if (liveCount && count) liveCount.replaceWith(count);
});

window.addEventListener('hashchange', render);
render();
