// Nigeria by Numbers — the dataset. Every figure is a published official
// statistic, labelled here with its source and year; the site shows the
// same labels beside each figure so a visitor can check them.
//
// Sources used throughout:
//   NBS  — National Bureau of Statistics (Nigeria)
//   WB   — World Bank, World Development Indicators
//   UN   — United Nations, World Population Prospects 2024 / WUP 2018
//   NPC  — National Population Commission, 2006 census
//   DMO  — Debt Management Office (Nigeria)
//   UNESCO — UNESCO Institute for Statistics / GEM Report
//   WHO  — World Health Organization / UN maternal mortality estimates
//   UNAIDS — UNAIDS estimates
//   UNDP — United Nations Development Programme, Human Development Report

export const COUNTRY = {
  name: 'Nigeria',
  shortName: 'Nigeria',
  capital: 'Abuja',
  government: 'Federal presidential republic',
  statesCount: 36,
  fct: 'Federal Capital Territory, Abuja',
  zones: 6,
  currency: 'Naira (₦)',
  language: 'English (official); Hausa, Yoruba, Igbo and over 500 other languages',
  independence: '1 October 1960',
  areaKm2: 923768,
  coastlineKm: 853,
  timeZone: 'West Africa Time (UTC+1)',
};

// Headline indicators shown on the overview dashboard.
export const HEADLINE = [
  { label: 'Population', value: '237.5m', note: 'UN estimate, 2025', detail: 'Africa’s most populous country; about 1 in 6 Africans is Nigerian.' },
  { label: 'GDP', value: '₦269.3trn', note: 'NBS, 2024', detail: 'About US$187.8 billion at the 2024 average exchange rate (World Bank).' },
  { label: 'GDP per person', value: '≈ US$809', note: 'World Bank, 2024', detail: 'Nominal GDP divided by the 2024 population.' },
  { label: 'Real GDP growth', value: '3.4%', note: 'NBS, 2024', detail: 'Up from 2.9% in 2023; services and agriculture drove the year.' },
  { label: 'Inflation (CPI)', value: '34.8%', note: 'NBS, Dec 2024', detail: 'Year-on-year consumer price inflation; the CPI was rebased in January 2025.' },
  { label: 'Unemployment', value: '4.3%', note: 'NBS, Q2 2024', detail: 'Labour Force Survey, new methodology; youth unemployment is far higher.' },
  { label: 'Life expectancy', value: '52.6 yrs', note: 'World Bank, 2023', detail: '52.0 years for men, 53.2 for women.' },
  { label: 'Median age', value: '17.2 yrs', note: 'UN, 2024', detail: 'One of the youngest populations in the world.' },
];

// Population at five-year points, millions. World Bank to 2020, UN estimate for 2025.
export const POPULATION_SERIES = [
  { year: 2000, pop: 122.4 },
  { year: 2005, pop: 139.9 },
  { year: 2010, pop: 158.5 },
  { year: 2015, pop: 183.5 },
  { year: 2020, pop: 206.1 },
  { year: 2025, pop: 237.5 },
];

// Age structure, share of population, UN World Population Prospects 2024.
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 43.1, note: 'about 102 million children' },
  { group: '15–64 years', share: 54.2, note: 'about 129 million people' },
  { group: '65+ years', share: 2.7, note: 'about 6 million people' },
];

// Real GDP growth, percent per year (NBS).
export const GDP_GROWTH = [
  { year: 2015, growth: 2.8 },
  { year: 2016, growth: -1.6 },
  { year: 2017, growth: 0.8 },
  { year: 2018, growth: 1.9 },
  { year: 2019, growth: 2.2 },
  { year: 2020, growth: -1.8 },
  { year: 2021, growth: 3.6 },
  { year: 2022, growth: 3.1 },
  { year: 2023, growth: 2.9 },
  { year: 2024, growth: 3.4 },
];

// Nominal GDP, ₦ trillion (NBS).
export const GDP_NOMINAL = [
  { year: 2015, gdp: 95.2 },
  { year: 2016, gdp: 102.6 },
  { year: 2017, gdp: 114.9 },
  { year: 2018, gdp: 127.8 },
  { year: 2019, gdp: 144.2 },
  { year: 2020, gdp: 152.3 },
  { year: 2021, gdp: 176.1 },
  { year: 2022, gdp: 199.3 },
  { year: 2023, gdp: 234.4 },
  { year: 2024, gdp: 269.3 },
];

// Share of GDP by sector, percent, NBS 2024 (rounded; shares sum to 100).
export const SECTORS = [
  { sector: 'Agriculture', share: 24.6, note: 'Crops, livestock, forestry and fishing' },
  { sector: 'Information & communication', share: 17.7, note: 'Telecoms dominate this sector' },
  { sector: 'Trade', share: 14.4, note: 'Wholesale and retail trade' },
  { sector: 'Manufacturing', share: 9.8, note: 'Food, beverages and tobacco are the largest part' },
  { sector: 'Crude oil & natural gas', share: 5.7, note: 'About 5–6% of GDP, but most exports' },
  { sector: 'Real estate', share: 5.2, note: 'Residential and commercial property' },
  { sector: 'Construction', share: 3.3, note: 'Buildings and civil works' },
  { sector: 'Other services', share: 19.3, note: 'Finance, transport, health, education, public administration and more' },
];

// Foreign trade, 2024 (NBS Foreign Trade in Goods Statistics).
export const TRADE = {
  exportsNgn: 79.7,
  importsNgn: 75.3,
  surplusNgn: 4.4,
  totalNgn: 154.9,
  crudeShare: 68,
  topExports: [
    { item: 'Crude petroleum', share: 68.0 },
    { item: 'Liquefied natural gas', share: 8.4 },
    { item: 'Other petroleum gases', share: 3.1 },
    { item: 'Urea fertiliser', share: 1.9 },
    { item: 'Cocoa beans', share: 1.7 },
  ],
  note: 'Exports and imports in ₦ trillion, full year 2024. Crude oil is about two-thirds of export value.',
};

// Public debt, Debt Management Office.
export const DEBT = {
  totalNgn: 149.4,
  asOf: 'Q1 2025',
  note: 'Total public debt (federal, states and FCT), ₦149.4 trillion at end of March 2025.',
};

// Health indicators.
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '52.6 years', source: 'World Bank, 2023' },
  { label: 'Infant mortality', value: '71.7 per 1,000 live births', source: 'World Bank, 2023' },
  { label: 'Under-5 mortality', value: '108 per 1,000 live births', source: 'World Bank, 2023' },
  { label: 'Maternal mortality', value: '1,047 per 100,000 live births', source: 'WHO / UN, 2020' },
  { label: 'Physicians', value: '0.4 per 1,000 people', source: 'World Bank, 2019' },
  { label: 'Hospital beds', value: '0.5 per 1,000 people', source: 'World Bank, 2017' },
  { label: 'People living with HIV', value: '≈ 1.9 million', source: 'UNAIDS, 2023' },
  { label: 'Fertility rate', value: '4.5 births per woman', source: 'UN, 2024' },
];

// Education indicators.
export const EDUCATION = [
  { label: 'Adult literacy rate', value: '62%', source: 'UNESCO, 2018' },
  { label: 'Youth literacy (15–24)', value: '75%', source: 'UNESCO, 2018' },
  { label: 'Children out of school', value: '≈ 20.2 million', source: 'UNESCO GEM Report, 2022' },
  { label: 'Mean years of schooling', value: '6.7 years', source: 'UNDP, 2022' },
  { label: 'Primary net enrolment', value: '≈ 68%', source: 'UNESCO, 2021' },
  { label: 'Universities', value: '270+', source: 'National Universities Commission, 2024' },
];

// States and the FCT. Population: 2006 census (National Population
// Commission). Area: official state area in km². Density is computed.
export const STATES = [
  { name: 'Abia', capital: 'Umuahia', zone: 'South East', pop: 2845380, area: 6320 },
  { name: 'Adamawa', capital: 'Yola', zone: 'North East', pop: 3178950, area: 36917 },
  { name: 'Akwa Ibom', capital: 'Uyo', zone: 'South South', pop: 3902051, area: 7081 },
  { name: 'Anambra', capital: 'Awka', zone: 'South East', pop: 4177828, area: 4844 },
  { name: 'Bauchi', capital: 'Bauchi', zone: 'North East', pop: 4653066, area: 45837 },
  { name: 'Bayelsa', capital: 'Yenagoa', zone: 'South South', pop: 1704515, area: 10773 },
  { name: 'Benue', capital: 'Makurdi', zone: 'North Central', pop: 4253641, area: 34059 },
  { name: 'Borno', capital: 'Maiduguri', zone: 'North East', pop: 4171104, area: 70898 },
  { name: 'Cross River', capital: 'Calabar', zone: 'South South', pop: 2892988, area: 20156 },
  { name: 'Delta', capital: 'Asaba', zone: 'South South', pop: 4112445, area: 17698 },
  { name: 'Ebonyi', capital: 'Abakaliki', zone: 'South East', pop: 2176947, area: 5670 },
  { name: 'Edo', capital: 'Benin City', zone: 'South South', pop: 3233366, area: 17802 },
  { name: 'Ekiti', capital: 'Ado Ekiti', zone: 'South West', pop: 2398957, area: 6353 },
  { name: 'Enugu', capital: 'Enugu', zone: 'South East', pop: 3267837, area: 17161 },
  { name: 'Gombe', capital: 'Gombe', zone: 'North East', pop: 2365040, area: 18768 },
  { name: 'Imo', capital: 'Owerri', zone: 'South East', pop: 3927563, area: 5530 },
  { name: 'Jigawa', capital: 'Dutse', zone: 'North East', pop: 4361002, area: 23154 },
  { name: 'Kaduna', capital: 'Kaduna', zone: 'North West', pop: 6113503, area: 46053 },
  { name: 'Kano', capital: 'Kano', zone: 'North West', pop: 9401288, area: 20131 },
  { name: 'Katsina', capital: 'Katsina', zone: 'North West', pop: 5801584, area: 24192 },
  { name: 'Kebbi', capital: 'Birnin Kebbi', zone: 'North West', pop: 3256541, area: 36800 },
  { name: 'Kogi', capital: 'Lokoja', zone: 'North Central', pop: 3314043, area: 29833 },
  { name: 'Kwara', capital: 'Ilorin', zone: 'North Central', pop: 2365353, area: 36825 },
  { name: 'Lagos', capital: 'Ikeja', zone: 'South West', pop: 9113605, area: 3577 },
  { name: 'Nasarawa', capital: 'Lafia', zone: 'North Central', pop: 1869377, area: 27117 },
  { name: 'Niger', capital: 'Minna', zone: 'North Central', pop: 3954772, area: 76363 },
  { name: 'Ogun', capital: 'Abeokuta', zone: 'South West', pop: 3751140, area: 16762 },
  { name: 'Ondo', capital: 'Akure', zone: 'South West', pop: 3460877, area: 14606 },
  { name: 'Osun', capital: 'Osogbo', zone: 'South West', pop: 3416959, area: 9251 },
  { name: 'Oyo', capital: 'Ibadan', zone: 'South West', pop: 5580894, area: 28454 },
  { name: 'Plateau', capital: 'Jos', zone: 'North Central', pop: 3206531, area: 30913 },
  { name: 'Rivers', capital: 'Port Harcourt', zone: 'South South', pop: 5198716, area: 11077 },
  { name: 'Sokoto', capital: 'Sokoto', zone: 'North West', pop: 3696999, area: 25973 },
  { name: 'Taraba', capital: 'Jalingo', zone: 'North East', pop: 2294800, area: 54473 },
  { name: 'Yobe', capital: 'Damaturu', zone: 'North East', pop: 2321339, area: 45502 },
  { name: 'Zamfara', capital: 'Gusau', zone: 'North West', pop: 3278873, area: 39762 },
  { name: 'FCT – Abuja', capital: 'Abuja', zone: 'North Central', pop: 1406239, area: 7315 },
];

export const ZONES = ['All zones', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];

// Full source list for the sources page.
export const SOURCES = [
  { publisher: 'National Bureau of Statistics', items: 'GDP, GDP growth and sector shares; consumer price inflation; unemployment (Labour Force Survey); foreign trade in goods; poverty rate (Nigeria Living Standards Survey 2019).' },
  { publisher: 'World Bank, World Development Indicators', items: 'Population, GDP in US dollars, GDP per person, life expectancy, infant and under-5 mortality, physicians and hospital beds.' },
  { publisher: 'United Nations, World Population Prospects 2024', items: 'Population estimate for 2025, median age, fertility rate and age structure.' },
  { publisher: 'National Population Commission', items: 'State populations from the 2006 Population and Housing Census.' },
  { publisher: 'Debt Management Office', items: 'Total public debt at the end of Q1 2025.' },
  { publisher: 'UNESCO Institute for Statistics / Global Education Monitoring Report', items: 'Adult and youth literacy, primary enrolment and children out of school.' },
  { publisher: 'WHO / UN Maternal Mortality Estimation Inter-Agency Group', items: 'Maternal mortality ratio, 2020.' },
  { publisher: 'UNAIDS', items: 'People living with HIV, 2023.' },
  { publisher: 'UNDP Human Development Report', items: 'Mean years of schooling, 2022.' },
  { publisher: 'National Universities Commission', items: 'Number of universities, 2024.' },
];
