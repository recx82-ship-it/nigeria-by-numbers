// HTML for each page of the site, built from the data. Every value that
// comes from the data is escaped before it goes into the page.

import {
  AGE_STRUCTURE,
  COUNTRY,
  DEBT,
  EDUCATION,
  GDP_GROWTH,
  GDP_NOMINAL,
  HEADLINE,
  HEALTH,
  POPULATION_SERIES,
  SECTORS,
  SOURCES,
  STATES,
  TRADE,
  ZONES,
} from './data.js';
import { ageBars, barChart, donutChart, fmt, hbarChart, lineChart } from './charts.js';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function kpiCards() {
  return `<div class="kpis">${HEADLINE.map(
    (k) => `<article class="kpi"><p class="kpi-label">${esc(k.label)}</p><p class="kpi-value">${esc(k.value)}</p><p class="kpi-note">${esc(k.note)}</p><p class="kpi-detail">${esc(k.detail)}</p></article>`,
  ).join('')}</div>`;
}

function sectionHead(title, blurb, source) {
  return `<div class="section-head"><h2>${esc(title)}</h2><p>${esc(blurb)}</p>${source ? `<p class="source">Source: ${esc(source)}</p>` : ''}</div>`;
}

export function overview() {
  const pop = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.pop }));
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year).slice(2), value: d.growth }));
  return `
  <section class="hero">
    <p class="eyebrow">Federal Republic of Nigeria · National statistics explorer</p>
    <h1>Nigeria by numbers</h1>
    <p class="lede">The population, the economy, the states, health and education of Africa’s
    largest country — every figure published, sourced and dated, in one place.</p>
    <p class="hero-facts"><strong>Capital:</strong> ${esc(COUNTRY.capital)} · <strong>States:</strong> ${COUNTRY.statesCount} + FCT ·
    <strong>Area:</strong> ${fmt(COUNTRY.areaKm2)} km² · <strong>Currency:</strong> ${esc(COUNTRY.currency)} ·
    <strong>Independence:</strong> ${esc(COUNTRY.independence)}</p>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>Population, 2000–2025</h2>
      <p class="card-sub">Millions of people. Nigeria has nearly doubled in 25 years.</p>
      ${barChart(pop, { format: (v) => `${v}m` })}
      <p class="source">Source: World Bank to 2020; UN World Population Prospects 2024 for 2025.</p>
      <p><a class="btn" href="#/population">Explore population &amp; demographics →</a></p>
    </section>
    <section class="card">
      <h2>Real GDP growth, 2015–2024</h2>
      <p class="card-sub">Percent change in real GDP per year, including two recessions.</p>
      ${lineChart(growth, { format: (v) => `${v}%` })}
      <p class="source">Source: National Bureau of Statistics.</p>
      <p><a class="btn" href="#/economy">Explore the economy →</a></p>
    </section>
  </div>
  ${kpiCards()}
  <div class="grid-2">
    <section class="card">
      <h2>What the economy is made of</h2>
      <p class="card-sub">Share of GDP by sector, 2024.</p>
      ${donutChart(SECTORS.slice(0, 5).map((s) => ({ label: s.sector, value: s.share })).concat([{ label: 'All other sectors', value: 27.8 }]), { centerTop: '₦269.3trn', centerBottom: 'GDP, 2024' })}
      <p class="source">Source: National Bureau of Statistics, 2024 (rounded).</p>
      <p><a class="btn" href="#/economy">See every sector →</a></p>
    </section>
    <section class="card">
      <h2>Explore the country</h2>
      <ul class="explore">
        <li><a href="#/population"><strong>Population &amp; demographics</strong><span>237.5 million people, a median age of 17, and the fastest-growing large population on earth.</span></a></li>
        <li><a href="#/economy"><strong>Economy &amp; trade</strong><span>GDP, growth, sectors, trade, debt, inflation and jobs.</span></a></li>
        <li><a href="#/states"><strong>States &amp; regions</strong><span>All 36 states and the FCT — population, area and density, sortable and searchable.</span></a></li>
        <li><a href="#/health-education"><strong>Health &amp; education</strong><span>Life expectancy, mortality, literacy and schooling.</span></a></li>
        <li><a href="#/sources"><strong>Sources &amp; methods</strong><span>Where every figure comes from, and what to watch for.</span></a></li>
      </ul>
    </section>
  </div>
  <section class="card">
    <h2>At a glance</h2>
    <dl class="facts">
      <div><dt>Urban population</dt><dd>54% of Nigerians live in towns and cities (World Bank, 2023). Lagos, the largest city, holds about 16 million people.</dd></div>
      <div><dt>Age structure</dt><dd>43% of the population is under 15. The working-age share (15–64) is 54%.</dd></div>
      <div><dt>Exports</dt><dd>₦79.7 trillion in 2024; crude oil is about 68% of export value (NBS).</dd></div>
      <div><dt>Public debt</dt><dd>₦149.4 trillion at the end of Q1 2025 (Debt Management Office).</dd></div>
      <div><dt>Out of school</dt><dd>About 20.2 million children are out of school (UNESCO, 2022) — the most of any country.</dd></div>
      <div><dt>Languages</dt><dd>English is official. Hausa, Yoruba and Igbo are the largest native languages; over 500 languages are spoken.</dd></div>
    </dl>
  </section>`;
}

export function population() {
  const pop = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.pop }));
  const growth = POPULATION_SERIES.slice(1).map((d, i) => ({
    label: `${POPULATION_SERIES[i].year}–${d.year}`,
    value: Math.round(((d.pop - POPULATION_SERIES[i].pop) / POPULATION_SERIES[i].pop) * 1000) / 10,
  }));
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>Population &amp; demographics</h1>
  <p class="lede">Nigeria is Africa’s most populous country and the sixth most populous in the
  world. Its population has nearly doubled since 2000 and is still growing fast.</p>
  <div class="grid-2">
    <section class="card">
      <h2>Population growth</h2>
      <div class="toggle" role="group" aria-label="Population chart view">
        <button type="button" class="toggle-btn is-active" data-pop-view="total">Total population</button>
        <button type="button" class="toggle-btn" data-pop-view="growth">5-year growth %</button>
      </div>
      <div id="pop-chart">${barChart(pop, { format: (v) => `${v}m` })}</div>
      <p class="source">Source: World Bank to 2020; UN World Population Prospects 2024 for 2025.</p>
    </section>
    <section class="card">
      <h2>Age structure, 2024</h2>
      <p class="card-sub">Share of the population in each age band.</p>
      ${ageBars(AGE_STRUCTURE)}
      <p class="source">Source: UN World Population Prospects 2024.</p>
      <p>Nigeria’s age structure is a pyramid: a very large young cohort, a
      working-age majority, and a small share over 65. That is why the median
      age is only 17.2 years.</p>
    </section>
  </div>
  <section class="card">
    <h2>Key demographic figures</h2>
    <dl class="facts">
      <div><dt>Population, 2025</dt><dd>237.5 million (UN estimate). About 1 in 6 Africans is Nigerian.</dd></div>
      <div><dt>Median age</dt><dd>17.2 years (UN, 2024) — one of the youngest populations in the world.</dd></div>
      <div><dt>Fertility rate</dt><dd>4.5 births per woman (UN, 2024), down from 6.4 in 1980.</dd></div>
      <div><dt>Life expectancy</dt><dd>52.6 years at birth (World Bank, 2023): 52.0 for men, 53.2 for women.</dd></div>
      <div><dt>Urban share</dt><dd>54% live in urban areas (World Bank, 2023). The urban population grows by about 4% a year.</dd></div>
      <div><dt>Largest city</dt><dd>Lagos, about 16 million people in the metropolitan area (UN estimate, 2025).</dd></div>
    </dl>
  </section>
  <p><a class="btn" href="#/states">See the population of every state →</a></p>`;
}

export function economy() {
  const nominal = GDP_NOMINAL.map((d) => ({ label: String(d.year).slice(2), value: d.gdp }));
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year).slice(2), value: d.growth }));
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>Economy</h1>
  <p class="lede">Nigeria has Africa’s fourth-largest economy by GDP in US dollars after the
  2023–2024 naira devaluation — and its largest by the size of its market.</p>
  <div class="grid-2">
    <section class="card">
      <h2>Output, 2015–2024</h2>
      <div class="toggle" role="group" aria-label="GDP chart view">
        <button type="button" class="toggle-btn is-active" data-gdp-view="nominal">Nominal GDP (₦trn)</button>
        <button type="button" class="toggle-btn" data-gdp-view="growth">Real growth (%)</button>
      </div>
      <div id="gdp-chart">${barChart(nominal, { format: (v) => `₦${v}trn` })}</div>
      <p class="source">Source: National Bureau of Statistics. Nominal GDP is in current naira; growth is in constant prices.</p>
    </section>
    <section class="card">
      <h2>GDP by sector, 2024</h2>
      <p class="card-sub">Share of GDP, percent.</p>
      ${hbarChart(SECTORS.map((s) => ({ label: s.sector, value: s.share, note: s.note })), { format: (v) => `${v}%` })}
      <p class="source">Source: National Bureau of Statistics, 2024 (rounded).</p>
      <p>Agriculture is the largest single sector, but services together — trade,
      telecoms, finance, transport and more — are more than half of the economy.
      Oil, once dominant, is now under 6% of GDP, though it still earns most of
      the foreign exchange.</p>
    </section>
  </div>
  <section class="card">
    <h2>Trade, 2024</h2>
    <dl class="facts">
      <div><dt>Exports</dt><dd>₦${TRADE.exportsNgn} trillion — crude petroleum about ${TRADE.crudeShare}% of export value.</dd></div>
      <div><dt>Imports</dt><dd>₦${TRADE.importsNgn} trillion — refined fuel, machinery, vehicles and food dominate.</dd></div>
      <div><dt>Trade balance</dt><dd>Surplus of ₦${TRADE.surplusNgn} trillion on total trade of ₦${TRADE.totalNgn} trillion.</dd></div>
      <div><dt>Top exports</dt><dd>${TRADE.topExports.map((e) => `${esc(e.item)} (${e.share}%)`).join(', ')}.</dd></div>
    </dl>
    <p class="source">Source: National Bureau of Statistics, Foreign Trade in Goods Statistics, 2024.</p>
  </section>
  <section class="card">
    <h2>Money, prices and jobs</h2>
    <dl class="facts">
      <div><dt>Inflation</dt><dd>Consumer prices rose 34.8% in the year to December 2024 (NBS). The CPI was rebased in January 2025, when the rate printed 24.5%.</dd></div>
      <div><dt>Unemployment</dt><dd>4.3% in Q2 2024 (NBS Labour Force Survey, new methodology). Underemployment and informal work are far more common than outright unemployment.</dd></div>
      <div><dt>Poverty</dt><dd>40.1% of Nigerians lived below the national poverty line in 2019 — about 83 million people (NBS).</dd></div>
      <div><dt>Public debt</dt><dd>₦${DEBT.totalNgn} trillion at the end of ${esc(DEBT.asOf)} (Debt Management Office).</dd></div>
      <div><dt>GDP per person</dt><dd>About US$809 in 2024 (World Bank), down from about US$2,100 in 2014 as the naira weakened.</dd></div>
    </dl>
  </section>`;
}

export function statesTable() {
  const total = STATES.reduce((s, st) => s + st.pop, 0);
  const zoneBtns = ZONES.map(
    (z) => `<button type="button" class="zone-btn${z === 'All zones' ? ' is-active' : ''}" data-zone="${esc(z)}">${esc(z)}</button>`,
  ).join('');
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>States &amp; regions</h1>
  <p class="lede">Nigeria is a federation of 36 states and the Federal Capital Territory,
  grouped into six geopolitical zones. The 2006 census counted ${fmt(total)} people;
  Kano was the most populous state and Bayelsa the least.</p>
  <section class="card">
    <div class="table-tools">
      <label class="search">Search states or capitals
        <input type="search" id="state-search" placeholder="Type a state or capital…" autocomplete="off">
      </label>
      <div class="zones" role="group" aria-label="Filter by zone">${zoneBtns}</div>
    </div>
    <p class="table-meta"><span id="state-count">${STATES.length} states &amp; FCT</span> · Click a column heading to sort · Population from the 2006 census (NPC)</p>
    <div class="table-wrap">
    <table id="states-table">
      <thead><tr>
        <th><button type="button" data-sort="name">State</button></th>
        <th><button type="button" data-sort="capital">Capital</button></th>
        <th><button type="button" data-sort="zone">Zone</button></th>
        <th class="num"><button type="button" data-sort="pop" data-dir="desc">Population</button></th>
        <th class="num"><button type="button" data-sort="area">Area (km²)</button></th>
        <th class="num"><button type="button" data-sort="density">Density (/km²)</button></th>
      </tr></thead>
      <tbody></tbody>
    </table>
    </div>
    <p class="source">Sources: population — National Population Commission, 2006 census; area — official state figures; density is population divided by area.</p>
  </section>`;
}

export function healthEducation() {
  const healthRows = HEALTH.map((h) => `<div><dt>${esc(h.label)}</dt><dd><strong>${esc(h.value)}</strong> — ${esc(h.source)}</dd></div>`).join('');
  const eduRows = EDUCATION.map((e) => `<div><dt>${esc(e.label)}</dt><dd><strong>${esc(e.value)}</strong> — ${esc(e.source)}</dd></div>`).join('');
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>Health &amp; education</h1>
  <p class="lede">The human side of the statistics: how long Nigerians live, how healthy
  they are, and how much schooling they get.</p>
  <div class="grid-2">
    <section class="card">
      <h2>Health</h2>
      <dl class="facts">${healthRows}</dl>
      <p>Nigeria’s health indicators are among the weakest of any large country:
      life expectancy of 52.6 years and the world’s highest maternal mortality
      burden. The health system is thin — about 0.4 doctors per 1,000 people —
      and most care is paid for out of pocket.</p>
    </section>
    <section class="card">
      <h2>Education</h2>
      <dl class="facts">${eduRows}</dl>
      <p>Schooling is free and compulsory for nine years on paper, but about 20
      million children are out of school — the highest number in the world — and
      adult literacy is 62%. The north-east and north-west have the lowest
      enrolment, and girls the lowest of all.</p>
    </section>
  </div>
  <section class="card">
    <h2>What these numbers mean</h2>
    <p>Nigeria’s population is young and growing fast, so every year roughly 5
    million more children need a classroom and, later, a job. The statistics
    above are the reason the country’s biggest policy debates are about
    schools, clinics and jobs — not just about oil.</p>
  </section>`;
}

export function sources() {
  const rows = SOURCES.map((s) => `<div><dt>${esc(s.publisher)}</dt><dd>${esc(s.items)}</dd></div>`).join('');
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>Sources &amp; methods</h1>
  <p class="lede">Every figure on this site names its publisher and year where it appears.
  This page lists them all in one place.</p>
  <section class="card">
    <h2>Where the figures come from</h2>
    <dl class="facts">${rows}</dl>
  </section>
  <section class="card">
    <h2>Notes and cautions</h2>
    <ul class="notes">
      <li>State populations are from the 2006 census — the last full census. Figures since then are estimates, and different estimators disagree by millions.</li>
      <li>Nigeria’s GDP was rebased in 2014 and again in 2025; sector shares and nominal GDP use the National Bureau of Statistics series as published.</li>
      <li>The naira was floated in June 2023, so US-dollar GDP fell sharply in 2023–2024 even as naira GDP kept growing. Naira and dollar figures tell different stories.</li>
      <li>The consumer price index was rebased in January 2025; inflation before and after the rebase is not directly comparable.</li>
      <li>Unemployment uses the NBS Labour Force Survey’s 2023 methodology, which counts anyone working at least one hour a week as employed. The old methodology gave far higher rates.</li>
      <li>Figures are rounded where the source rounds them; shares may not sum exactly to 100.</li>
    </ul>
  </section>
  <section class="card">
    <h2>About this site</h2>
    <p>“Nigeria by Numbers” is an independent statistics explorer built for
    make.fun’s national statistics site bounty. It is not affiliated with the
    National Bureau of Statistics or any government body. All content on this
    site is original; the figures are published official statistics, cited
    with their source and year.</p>
  </section>`;
}

export function missing() {
  return `
  <p class="crumb"><a href="#/">← Overview</a></p>
  <h1>Page not found</h1>
  <p class="lede">There is no page at this address.</p>
  <p><a class="btn" href="#/">Back to the overview →</a></p>`;
}
