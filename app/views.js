// The six pages of the site, each a function returning an HTML string.
// Data comes from data.js; charts from charts.js. The router in main.js
// calls these and wires up the controls they render.

import {
  AGE_GROUPS, CAUTIONS, DEMOGRAPHICS, ECONOMY_FACTS, GDP_GROWTH, GDP_NOMINAL,
  HEALTH_EDUCATION, POPULATION, POVERTY, PUBLISHERS, SECTORS, SITE, STATES,
  SUBSECTORS, TRADE, ZONES,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

function sourceLine(text) {
  return `<p class="source-note">${text}</p>`;
}

function factList(items) {
  return `<div class="facts">${items
    .map((it) => `<div><span class="fact-label">${it.label}</span><span class="fact-value">${it.value}</span><span class="fact-source">${it.source}</span></div>`)
    .join('')}</div>`;
}

function kpi(label, value, source) {
  return `<div class="kpi"><span class="kpi-value">${value}</span><span class="kpi-label">${label}</span><span class="kpi-source">${source}</span></div>`;
}

export function overviewView() {
  const popBars = barChart(
    POPULATION.map((p) => ({ axis: String(p.year), value: p.millions, label: `${p.millions.toFixed(1)}m` })),
    { label: 'Nigeria population 2000 to 2025' },
  );
  const growthLine = lineChart(
    GDP_GROWTH.map((g) => ({ axis: String(g.year), value: g.pct, label: `${g.pct.toFixed(1)}%` })),
    { label: 'Nigeria real GDP growth 2015 to 2024' },
  );
  const donut = donutChart(SECTORS, { label: 'Share of GDP by broad sector' });
  return `
<section class="hero">
  <h1>Nigeria by numbers</h1>
  <p class="lede">The country in figures: how many people, how the economy is doing, where they live, and how healthy and educated they are — every number labelled with where it came from.</p>
  <p class="hero-meta">Africa’s largest economy and most populous country · 36 states + the Federal Capital Territory · Currency: the naira (₦)</p>
</section>
<section class="kpi-grid" aria-label="Key figures">
  ${kpi('Population', '237.5m', 'UN World Population Prospects 2024')}
  ${kpi('GDP', '$187.8bn', 'World Bank, 2024')}
  ${kpi('Real GDP growth', '3.4%', 'NBS, 2024')}
  ${kpi('Inflation', '34.8%', 'NBS CPI, Dec 2024')}
  ${kpi('Unemployment', '4.3%', 'NBS Labour Force Survey, Q2 2024')}
  ${kpi('Life expectancy', '54.6 years', 'World Bank, 2023')}
  ${kpi('Median age', '17.8 years', 'UN World Population Prospects 2024')}
  ${kpi('Public debt', '₦144.7tr', 'Debt Management Office, Dec 2024')}
</section>
<section class="chart-grid">
  <article class="card">
    <h2>Population, 2000–2025</h2>
    ${popBars}
    ${sourceLine('Millions of people. UN World Population Prospects 2024, medium estimate.')}
  </article>
  <article class="card">
    <h2>Real GDP growth, 2015–2024</h2>
    ${growthLine}
    ${sourceLine('Annual change in real GDP, %. National Bureau of Statistics.')}
  </article>
  <article class="card">
    <h2>What the economy is made of</h2>
    ${donut}
    ${sourceLine('Share of nominal GDP, 2023, rounded. National Bureau of Statistics.')}
  </article>
</section>
<section class="two-col">
  <article class="card">
    <h2>At a glance</h2>
    <dl class="glance">
      <div><dt>Capital</dt><dd>${SITE.capital}</dd></div>
      <div><dt>Largest city</dt><dd>${SITE.largestCity}</dd></div>
      <div><dt>Land area</dt><dd>${SITE.landAreaKm2.toLocaleString('en-GB')} km²</dd></div>
      <div><dt>Official language</dt><dd>${SITE.language}</dd></div>
      <div><dt>Independence</dt><dd>${SITE.independence}</dd></div>
      <div><dt>Time zone</dt><dd>${SITE.timezone}</dd></div>
    </dl>
  </article>
  <article class="card">
    <h2>Explore the numbers</h2>
    <ul class="explore">
      <li><a href="#/population">Population &amp; demographics</a> — 237.5 million people, and getting younger</li>
      <li><a href="#/economy">Economy</a> — GDP, trade, prices, jobs and debt</li>
      <li><a href="#/states">States &amp; regions</a> — all 36 states plus the FCT, sortable and searchable</li>
      <li><a href="#/health-education">Health &amp; education</a> — 14 indicators, from life expectancy to literacy</li>
      <li><a href="#/sources">Sources &amp; methods</a> — who published each figure, and what to be careful about</li>
    </ul>
  </article>
</section>`;
}

// Five-year growth between census points, computed from the series.
function growthRows() {
  const rows = [];
  for (let i = 1; i < POPULATION.length; i++) {
    const prev = POPULATION[i - 1];
    const cur = POPULATION[i];
    const cagr = (Math.pow(cur.millions / prev.millions, 1 / 5) - 1) * 100;
    rows.push({ axis: `${prev.year}–${cur.year}`, value: cagr, label: `${cagr.toFixed(1)}%` });
  }
  return rows;
}

export function populationView(mode) {
  const total = mode === 'total';
  const chart = total
    ? barChart(
        POPULATION.map((p) => ({ axis: String(p.year), value: p.millions, label: `${p.millions.toFixed(1)}m` })),
        { label: 'Nigeria population 2000 to 2025' },
      )
    : barChart(
        growthRows().map((r) => ({ axis: r.axis, value: r.value, label: r.label })),
        { label: 'Five-year population growth, percent per year', colour: '#c9a227' },
      );
  const ages = hbarChart(
    AGE_GROUPS.map((a) => ({ axis: a.band, value: a.share, label: `${a.share}%` })),
    { label: 'Age structure of the population' },
  );
  return `
<h1>Population &amp; demographics</h1>
<p class="lede">Nigeria is Africa’s most populous country and one of the youngest — a median age under 18 and more than two in five people under 15.</p>
<div class="toggle" role="group" aria-label="Population view">
  <button type="button" data-pop-view="total" class="${total ? 'active' : ''}" aria-pressed="${total}">Total population</button>
  <button type="button" data-pop-view="growth" class="${total ? '' : 'active'}" aria-pressed="${!total}">5-year growth %</button>
</div>
<article class="card">
  <h2>${total ? 'Total population, 2000–2025' : 'Population growth, 5-year periods'}</h2>
  <div id="pop-chart">${chart}</div>
  ${sourceLine(total
    ? 'Millions of people, mid-year. UN World Population Prospects 2024, medium estimate.'
    : 'Average annual growth between the points shown, computed from the UN World Population Prospects 2024 series.')}
</article>
<article class="card">
  <h2>Age structure, 2025</h2>
  ${ages}
  ${sourceLine('Share of the population in each age band. UN World Population Prospects 2024.')}
</article>
<section>
  <h2>Key demographic figures</h2>
  ${factList(DEMOGRAPHICS)}
</section>`;
}

export function economyView(mode) {
  const nominal = mode === 'nominal';
  const chart = nominal
    ? barChart(
        GDP_NOMINAL.map((g) => ({ axis: String(g.year), value: g.trillion, label: `₦${g.trillion.toFixed(1)}tr` })),
        { label: 'Nominal GDP in naira trillions', colour: '#1d4e89' },
      )
    : lineChart(
        GDP_GROWTH.map((g) => ({ axis: String(g.year), value: g.pct, label: `${g.pct.toFixed(1)}%` })),
        { label: 'Real GDP growth 2015 to 2024' },
      );
  const sectors = hbarChart(
    SUBSECTORS.map((s) => ({ axis: s.name, value: s.share, label: `${s.share}%` })),
    { label: 'Largest sectors by share of GDP' },
  );
  return `
<h1>Economy</h1>
<p class="lede">Africa’s largest economy: oil matters less than it used to, services and farming now carry most of output — but prices rose fast in 2024 and debt keeps climbing.</p>
<div class="toggle" role="group" aria-label="GDP view">
  <button type="button" data-gdp-view="nominal" class="${nominal ? 'active' : ''}" aria-pressed="${nominal}">Nominal GDP (₦ trillion)</button>
  <button type="button" data-gdp-view="growth" class="${nominal ? '' : 'active'}" aria-pressed="${!nominal}">Real growth %</button>
</div>
<article class="card">
  <h2>${nominal ? 'Nominal GDP, 2015–2024' : 'Real GDP growth, 2015–2024'}</h2>
  <div id="gdp-chart">${chart}</div>
  ${sourceLine(nominal
    ? 'Nominal GDP in ₦ trillion. National Bureau of Statistics, national accounts (series as published before the 2025 rebasing).'
    : 'Annual change in real GDP, %. National Bureau of Statistics, national accounts. The 2016 and 2020 recessions are the dips below zero.')}
</article>
<article class="card">
  <h2>Largest sectors, % of GDP</h2>
  ${sectors}
  ${sourceLine('Share of nominal GDP, 2023. National Bureau of Statistics.')}
</article>
<section>
  <h2>Money, prices and jobs</h2>
  ${factList(ECONOMY_FACTS)}
</section>
<section>
  <h2>Trade</h2>
  ${factList(TRADE)}
</section>
<section>
  <h2>Poverty</h2>
  ${factList(POVERTY)}
</section>`;
}

function densityOf(state) {
  return Math.round((state.pop * 1000000) / state.area);
}

export function statesView(state) {
  const { sort, zone, query } = state;
  let rows = STATES.slice();
  if (zone !== 'All zones') rows = rows.filter((s) => s.zone === zone);
  const q = query.trim().toLowerCase();
  if (q) rows = rows.filter((s) => s.name.toLowerCase().includes(q));
  if (sort === 'name') rows.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'density') rows.sort((a, b) => densityOf(b) - densityOf(a));
  else rows.sort((a, b) => b.pop - a.pop);
  const body = rows.length
    ? rows
        .map((s) => `<tr><td>${s.name}</td><td>${s.zone}</td><td>${s.pop.toFixed(2)}m</td><td>${s.area.toLocaleString('en-GB')}</td><td>${densityOf(s).toLocaleString('en-GB')}</td></tr>`)
        .join('')
    : '<tr><td colspan="5">No state matches that search.</td></tr>';
  return `
<h1>States &amp; regions</h1>
<p class="lede">Nigeria’s 36 states and the Federal Capital Territory, from the 2006 census — the last completed one. Sort them, filter by geopolitical zone, or search by name.</p>
<div class="controls">
  <div class="control-group" role="group" aria-label="Sort states">
    <span class="control-label">Sort by</span>
    <button type="button" data-sort="population" class="${sort === 'population' ? 'active' : ''}">Population</button>
    <button type="button" data-sort="name" class="${sort === 'name' ? 'active' : ''}">Name</button>
    <button type="button" data-sort="density" class="${sort === 'density' ? 'active' : ''}">Density</button>
  </div>
  <div class="control-group" role="group" aria-label="Filter by zone">
    <span class="control-label">Zone</span>
    ${ZONES.map((z) => `<button type="button" data-zone="${z}" class="${zone === z ? 'active' : ''}">${z}</button>`).join('')}
  </div>
  <div class="control-group">
    <label class="control-label" for="state-search">Search</label>
    <input id="state-search" type="search" placeholder="Search states…" value="${query.replace(/"/g, '&quot;')}" autocomplete="off">
  </div>
</div>
<p id="state-count" aria-live="polite">${rows.length} of 37 states shown</p>
<table id="states-table">
  <caption>States and the Federal Capital Territory, 2006 census</caption>
  <thead><tr><th scope="col">State</th><th scope="col">Zone</th><th scope="col">Population, 2006</th><th scope="col">Land area (km²)</th><th scope="col">People per km²</th></tr></thead>
  <tbody>${body}</tbody>
</table>
${sourceLine('Populations: National Population Commission, 2006 census. Land areas: published state areas. Densities are calculated from those two figures.')}`;
}

export function healthView() {
  return `
<h1>Health &amp; education</h1>
<p class="lede">Fourteen indicators that say the most about how Nigerians live and learn — long lives are still short by world standards, and classrooms are crowded.</p>
${factList(HEALTH_EDUCATION)}
<p class="source-note">Mortality and health figures are the best published estimates for their year; survey-based numbers move between editions. See <a href="#/sources">Sources &amp; methods</a> for the publishers.</p>`;
}

export function sourcesView() {
  return `
<h1>Sources &amp; methods</h1>
<p class="lede">Every figure on this site comes from one of these ten publishers. Where a figure is calculated from two published ones — a density, a growth rate, a per-person figure — the page says so.</p>
${factList(PUBLISHERS.map((p) => ({ label: `${p.name} (${p.short})`, value: p.covers, source: 'Publisher' })))}
<section>
  <h2>What to be careful about</h2>
  <ol class="cautions">
    ${CAUTIONS.map((c) => `<li>${c}</li>`).join('')}
  </ol>
</section>`;
}

export function notFoundView() {
  return `
<h1>Page not found</h1>
<p class="lede">There is no page at this address. Try one of the sections below.</p>
<ul class="explore">
  <li><a href="#/">Overview</a></li>
  <li><a href="#/population">Population &amp; demographics</a></li>
  <li><a href="#/economy">Economy</a></li>
  <li><a href="#/states">States &amp; regions</a></li>
  <li><a href="#/health-education">Health &amp; education</a></li>
  <li><a href="#/sources">Sources &amp; methods</a></li>
</ul>`;
}
