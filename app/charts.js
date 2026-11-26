// Small SVG chart builders. No library, no network: each function takes
// plain data and returns an SVG string the page drops into the document.
// All numbers are formatted here so the views stay declarative.

const GREEN = '#0b6b3a';
const GREEN_LIGHT = '#2fa866';
const GREEN_PALE = '#cdeeda';
const GOLD = '#c9a227';
const INK = '#10231a';
const MUTED = '#5c6f64';
const GRID = '#dfe7de';
const RED = '#b3352b';

export function fmt(n) {
  return Number(n).toLocaleString('en-GB');
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Vertical bar chart with value labels. data: [{label, value}].
export function barChart(data, { width = 640, height = 260, format = (v) => fmt(v), color = GREEN, baseline = 0 } = {}) {
  const padL = 52;
  const padB = 30;
  const padT = 26;
  const padR = 10;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(baseline, ...data.map((d) => d.value));
  const span = max - min || 1;
  const y = (v) => padT + innerH - ((v - min) / span) * innerH;
  const slot = innerW / data.length;
  const barW = Math.min(46, slot * 0.62);
  const bars = data
    .map((d, i) => {
      const x = padL + i * slot + (slot - barW) / 2;
      const top = y(Math.max(d.value, baseline));
      const bottom = y(Math.min(d.value, baseline));
      return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${color}"/>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(format(d.value))}</text>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(d.label)}</text>`;
    })
    .join('');
  const gridLines = [0.25, 0.5, 0.75, 1]
    .map((f) => {
      const v = min + span * f;
      const gy = y(v);
      return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>` +
        `<text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="${MUTED}">${esc(format(Math.round(v)))}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Bar chart">${gridLines}${bars}<line x1="${padL}" y1="${y(baseline).toFixed(1)}" x2="${width - padR}" y2="${y(baseline).toFixed(1)}" stroke="${INK}" stroke-width="1"/></svg>`;
}

// Line chart with dots and value labels. data: [{label, value}].
export function lineChart(data, { width = 640, height = 260, format = (v) => String(v), color = GREEN, zeroLine = true } = {}) {
  const padL = 52;
  const padB = 30;
  const padT = 26;
  const padR = 16;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.max(...data.map((d) => d.value), 0.1);
  const min = Math.min(0, ...data.map((d) => d.value));
  const span = max - min || 1;
  const x = (i) => padL + (i / (data.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / span) * innerH;
  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const gridLines = [0.25, 0.5, 0.75, 1]
    .map((f) => {
      const v = min + span * f;
      const gy = y(v);
      return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>` +
        `<text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="${MUTED}">${esc(format(Math.round(v * 10) / 10))}</text>`;
    })
    .join('');
  const dots = data
    .map((d, i) => {
      const neg = d.value < 0;
      return `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" fill="${neg ? RED : color}" stroke="#fff" stroke-width="1.5"/>` +
        `<text x="${x(i).toFixed(1)}" y="${(neg ? y(d.value) + 20 : y(d.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${neg ? RED : INK}">${esc(format(d.value))}</text>` +
        `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(d.label)}</text>`;
    })
    .join('');
  const zero = zeroLine && min < 0
    ? `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${width - padR}" y2="${y(0).toFixed(1)}" stroke="${INK}" stroke-width="1"/>`
    : '';
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Line chart">${gridLines}${zero}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Donut chart with a centre label and a legend list. data: [{label, value}].
export function donutChart(data, { size = 260, centerTop = '', centerBottom = '' } = {}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = [GREEN, GOLD, '#3d8f6f', '#7fb069', '#e07a5f', '#8a6d3b', '#4d908e', '#b5c9ad'];
  let angle = -Math.PI / 2;
  const slices = data
    .map((d, i) => {
      const frac = d.value / total;
      const a0 = angle;
      const a1 = angle + frac * Math.PI * 2;
      angle = a1;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    })
    .join('');
  const legend = data
    .map((d, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(d.label)} <strong>${d.value}%</strong></li>`)
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(centerTop)}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(centerBottom)}</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars with labels and values. data: [{label, value, note}].
export function hbarChart(data, { width = 640, barH = 22, gap = 14, format = (v) => `${v}%`, color = GREEN } = {}) {
  const labelW = 190;
  const valueW = 56;
  const height = data.length * (barH + gap) + 8;
  const max = Math.max(...data.map((d) => d.value), 1);
  const rows = data
    .map((d, i) => {
      const y = 8 + i * (barH + gap);
      const w = ((width - labelW - valueW - 16) * d.value) / max;
      return `<text x="0" y="${y + 15}" font-size="12" fill="${INK}">${esc(d.label)}</text>` +
        `<rect x="${labelW}" y="${y}" width="${Math.max(2, w).toFixed(1)}" height="${barH}" rx="4" fill="${color}"/>` +
        `<text x="${labelW + w + 8}" y="${y + 15}" font-size="12" font-weight="700" fill="${INK}">${esc(format(d.value))}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Horizontal bar chart">${rows}</svg>`;
}

// Simple horizontal percentage bars for the age structure.
export function ageBars(data) {
  const rows = data
    .map((d) => {
      const pct = d.share;
      return `<div class="age-row"><span class="age-label">${esc(d.group)}</span><span class="age-track"><span class="age-fill" style="width:${pct}%"></span></span><strong class="age-value">${pct}%</strong><span class="age-note">${esc(d.note)}</span></div>`;
    })
    .join('');
  return `<div class="age-bars">${rows}</div>`;
}
