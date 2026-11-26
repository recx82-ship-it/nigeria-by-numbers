// Nigeria by Numbers — every figure in this file is a published statistic,
// labelled on the page with its publisher and year. Figures I could not
// recall with confidence were left out rather than estimated.

export const SITE = {
  title: 'Nigeria by numbers',
  country: 'Nigeria',
  currency: 'naira (₦)',
  capital: 'Abuja',
  largestCity: 'Lagos',
  landAreaKm2: 923768,
  independence: '1 October 1960',
  timezone: 'West Africa Time (UTC+1)',
  language: 'English',
  statesCount: 36,
};

// Population, millions, mid-year — UN World Population Prospects 2024,
// medium estimate. Growth rates are computed from these points.
export const POPULATION = [
  { year: 2000, millions: 122.9 },
  { year: 2005, millions: 138.6 },
  { year: 2010, millions: 158.5 },
  { year: 2015, millions: 180.4 },
  { year: 2020, millions: 208.3 },
  { year: 2025, millions: 237.5 },
];

// Age structure, % of population — UN World Population Prospects 2024.
export const AGE_GROUPS = [
  { band: '0–14 years', share: 41 },
  { band: '15–24 years', share: 20 },
  { band: '25–54 years', share: 32 },
  { band: '55–64 years', share: 4 },
  { band: '65+ years', share: 3 },
];

export const DEMOGRAPHICS = [
  { label: 'Median age', value: '17.8 years', source: 'UN World Population Prospects 2024' },
  { label: 'Fertility rate', value: '4.6 births per woman', source: 'UN World Population Prospects 2024' },
  { label: 'Life expectancy at birth', value: '54.6 years', source: 'World Bank, 2023' },
  { label: 'Urban population', value: '53% of Nigerians', source: 'World Bank, 2023' },
  { label: 'Population density', value: '257 people per km²', source: 'Calculated from UN WPP 2024 and land area' },
  { label: 'Dependency ratio', value: '79 dependents per 100 working-age people', source: 'Calculated from UN WPP 2024 age structure' },
  { label: 'Largest city', value: 'Lagos — about 15 million in the metro area', source: 'UN World Urbanization Prospects 2018' },
];

// Real GDP growth, % — National Bureau of Statistics, national accounts.
export const GDP_GROWTH = [
  { year: 2015, pct: 2.8 },
  { year: 2016, pct: -1.6 },
  { year: 2017, pct: 0.8 },
  { year: 2018, pct: 1.9 },
  { year: 2019, pct: 2.2 },
  { year: 2020, pct: -1.8 },
  { year: 2021, pct: 3.6 },
  { year: 2022, pct: 3.3 },
  { year: 2023, pct: 2.9 },
  { year: 2024, pct: 3.4 },
];

// Nominal GDP, ₦ trillion — National Bureau of Statistics, national
// accounts (series as published before the 2025 rebasing).
export const GDP_NOMINAL = [
  { year: 2015, trillion: 95.2 },
  { year: 2016, trillion: 102.6 },
  { year: 2017, trillion: 113.7 },
  { year: 2018, trillion: 127.8 },
  { year: 2019, trillion: 144.2 },
  { year: 2020, trillion: 152.4 },
  { year: 2021, trillion: 176.1 },
  { year: 2022, trillion: 199.3 },
  { year: 2023, trillion: 234.4 },
  { year: 2024, trillion: 252.7 },
];

// Broad sectors, % of nominal GDP — NBS 2023, rounded so they sum to 100.
export const SECTORS = [
  { name: 'Services', share: 57, colour: '#0b6e3f' },
  { name: 'Agriculture', share: 24, colour: '#c9a227' },
  { name: 'Industries', share: 19, colour: '#1d4e89' },
];

// Largest sub-sectors, % of nominal GDP — NBS 2023.
export const SUBSECTORS = [
  { name: 'Agriculture', share: 24.4 },
  { name: 'Trade', share: 14.6 },
  { name: 'Information & Communication', share: 13.7 },
  { name: 'Manufacturing', share: 8.6 },
  { name: 'Crude petroleum & natural gas', share: 5.7 },
  { name: 'Real estate', share: 5.6 },
];

export const ECONOMY_FACTS = [
  { label: 'GDP in US dollars', value: '$187.8 billion', source: 'World Bank, 2024' },
  { label: 'GDP per person', value: 'about $791', source: 'World Bank, 2024 — GDP divided by population' },
  { label: 'Inflation', value: '34.8% in December 2024', source: 'NBS Consumer Price Index, Dec 2024' },
  { label: 'Food inflation', value: '39.8% in December 2024', source: 'NBS Consumer Price Index, Dec 2024' },
  { label: 'Unemployment', value: '4.3%', source: 'NBS Nigeria Labour Force Survey, Q2 2024' },
  { label: 'Youth unemployment', value: '6.5%', source: 'NBS Nigeria Labour Force Survey, Q2 2024' },
  { label: 'Public debt', value: '₦144.7 trillion', source: 'Debt Management Office, Dec 2024' },
  { label: 'Exchange rate', value: 'about ₦1,535 per US$', source: 'Central Bank of Nigeria, Dec 2024' },
];

export const TRADE = [
  { label: 'Total trade in goods', value: '₦129.6 trillion', source: 'NBS Foreign Trade in Goods Statistics, 2024' },
  { label: 'Exports', value: '₦77.4 trillion', source: 'NBS Foreign Trade in Goods Statistics, 2024' },
  { label: 'Imports', value: '₦52.2 trillion', source: 'NBS Foreign Trade in Goods Statistics, 2024' },
  { label: 'Trade surplus', value: '₦25.2 trillion', source: 'NBS Foreign Trade in Goods Statistics, 2024' },
  { label: 'Crude oil share of exports', value: 'about 71%', source: 'NBS Foreign Trade in Goods Statistics, 2024' },
];

export const POVERTY = [
  { label: 'Below the national poverty line', value: '40.1% of Nigerians', source: 'NBS Living Standards Survey, 2019' },
  { label: 'Multidimensionally poor', value: '63% — about 133 million people', source: 'NBS Multidimensional Poverty Index, 2022' },
];

// 2006 census populations (millions) and land areas (km²) — National
// Population Commission. Zones are the six geopolitical zones.
export const STATES = [
  { name: 'Abia', zone: 'South East', pop: 2.83, area: 6320 },
  { name: 'Adamawa', zone: 'North East', pop: 3.17, area: 36917 },
  { name: 'Akwa Ibom', zone: 'South South', pop: 3.92, area: 7081 },
  { name: 'Anambra', zone: 'South East', pop: 4.18, area: 4844 },
  { name: 'Bauchi', zone: 'North East', pop: 4.68, area: 45837 },
  { name: 'Bayelsa', zone: 'South South', pop: 1.70, area: 10773 },
  { name: 'Benue', zone: 'North Central', pop: 4.22, area: 34059 },
  { name: 'Borno', zone: 'North East', pop: 4.17, area: 70898 },
  { name: 'Cross River', zone: 'South South', pop: 2.89, area: 20156 },
  { name: 'Delta', zone: 'South South', pop: 4.10, area: 17698 },
  { name: 'Ebonyi', zone: 'South East', pop: 2.17, area: 5670 },
  { name: 'Edo', zone: 'South South', pop: 3.22, area: 17802 },
  { name: 'Ekiti', zone: 'South West', pop: 2.38, area: 6353 },
  { name: 'Enugu', zone: 'South East', pop: 3.27, area: 7161 },
  { name: 'FCT — Abuja', zone: 'North Central', pop: 1.41, area: 7315 },
  { name: 'Gombe', zone: 'North East', pop: 2.35, area: 18768 },
  { name: 'Imo', zone: 'South East', pop: 3.93, area: 5530 },
  { name: 'Jigawa', zone: 'North West', pop: 4.36, area: 23154 },
  { name: 'Kaduna', zone: 'North West', pop: 6.07, area: 46053 },
  { name: 'Kano', zone: 'North West', pop: 9.40, area: 20131 },
  { name: 'Katsina', zone: 'North West', pop: 5.80, area: 24192 },
  { name: 'Kebbi', zone: 'North West', pop: 3.26, area: 36800 },
  { name: 'Kogi', zone: 'North Central', pop: 3.31, area: 29833 },
  { name: 'Kwara', zone: 'North Central', pop: 2.37, area: 36825 },
  { name: 'Lagos', zone: 'South West', pop: 9.01, area: 3577 },
  { name: 'Nasarawa', zone: 'North Central', pop: 1.86, area: 27117 },
  { name: 'Niger', zone: 'North Central', pop: 3.95, area: 76363 },
  { name: 'Ogun', zone: 'South West', pop: 3.73, area: 16762 },
  { name: 'Ondo', zone: 'South West', pop: 3.46, area: 14606 },
  { name: 'Osun', zone: 'South West', pop: 3.42, area: 14875 },
  { name: 'Oyo', zone: 'South West', pop: 5.59, area: 28454 },
  { name: 'Plateau', zone: 'North Central', pop: 3.18, area: 30913 },
  { name: 'Rivers', zone: 'South South', pop: 5.19, area: 11077 },
  { name: 'Sokoto', zone: 'North West', pop: 3.70, area: 25973 },
  { name: 'Taraba', zone: 'North East', pop: 2.30, area: 54473 },
  { name: 'Yobe', zone: 'North East', pop: 2.32, area: 45502 },
  { name: 'Zamfara', zone: 'North West', pop: 3.28, area: 39762 },
];

export const ZONES = ['All zones', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];

// Health and education indicators — 14, each with publisher and year.
export const HEALTH_EDUCATION = [
  { label: 'Life expectancy at birth', value: '54.6 years', source: 'World Bank, 2023' },
  { label: 'Infant mortality', value: '57 deaths per 1,000 live births', source: 'UN Inter-agency Group for Child Mortality Estimation, 2023' },
  { label: 'Under-five mortality', value: '95 deaths per 1,000 live births', source: 'UN Inter-agency Group for Child Mortality Estimation, 2023' },
  { label: 'Maternal mortality', value: '1,047 deaths per 100,000 live births', source: 'UN Maternal Mortality Estimation Inter-Agency Group, 2020' },
  { label: 'HIV prevalence, ages 15–49', value: '1.3%', source: 'UNAIDS, 2023' },
  { label: 'People living with HIV', value: '1.9 million', source: 'UNAIDS, 2023' },
  { label: 'Share of world malaria cases', value: '27%', source: 'World Health Organization, 2023' },
  { label: 'Tuberculosis incidence', value: '219 cases per 100,000 people', source: 'World Health Organization, 2023' },
  { label: 'Doctors', value: '0.4 per 1,000 people', source: 'World Health Organization, 2018' },
  { label: 'Health spending', value: '3.4% of GDP', source: 'World Bank, 2021' },
  { label: 'Human Development Index', value: '0.548 — low human development', source: 'UN Development Programme, 2023/24' },
  { label: 'Adult literacy', value: '62%', source: 'UNESCO, 2021' },
  { label: 'Children out of school', value: '18.3 million', source: 'UNESCO, 2023' },
  { label: 'Children under five stunted', value: '33%', source: 'UNICEF, 2023' },
];

// The publishers behind the figures, in the order the sources page lists
// them — 10 in total.
export const PUBLISHERS = [
  { name: 'National Bureau of Statistics', short: 'NBS', covers: 'GDP and growth, inflation, unemployment, foreign trade, poverty. Nigeria’s official statistics office; its figures are the ones this site uses first.' },
  { name: 'World Bank', short: 'World Bank', covers: 'Population, GDP in US dollars, life expectancy, health spending, urban share. World Development Indicators.' },
  { name: 'United Nations', short: 'UN', covers: 'Population estimates and projections, median age and fertility (World Population Prospects 2024); child and maternal mortality (UN IGME and UN MMEIG).' },
  { name: 'National Population Commission', short: 'NPC', covers: 'The 2006 population census — the state populations in the states table. Nigeria’s last completed census.' },
  { name: 'Debt Management Office', short: 'DMO', covers: 'Nigeria’s total public debt stock, published quarterly.' },
  { name: 'UNESCO', short: 'UNESCO', covers: 'Adult literacy and out-of-school children (UNESCO Institute for Statistics).' },
  { name: 'World Health Organization', short: 'WHO', covers: 'Malaria burden, tuberculosis incidence, doctors per 1,000 people.' },
  { name: 'UNAIDS', short: 'UNAIDS', covers: 'HIV prevalence and the number of people living with HIV.' },
  { name: 'UN Development Programme', short: 'UNDP', covers: 'The Human Development Index (Human Development Report 2023/24).' },
  { name: 'Central Bank of Nigeria', short: 'CBN', covers: 'The official naira exchange rate.' },
];

export const CAUTIONS = [
  'State populations come from the 2006 census — the last completed one. Anything since then is an estimate, and the next census has been delayed several times.',
  'Nominal GDP in naira jumped after the 2023–24 currency devaluation, so naira figures across those years are not directly comparable; real growth rates are the safer comparison.',
  'Nigeria rebased its GDP in 2025, which raised the level of nominal GDP. The naira series on this site is the series as published before that rebasing.',
  'Different publishers count differently: the World Bank and the UN do not always agree on population, and survey-based figures (poverty, unemployment) depend on the survey’s method and year.',
  'Health figures for a single year can move a lot between estimates; treat them as the best published estimate for that year, not as an exact count.',
];
