// Small dependency-free SVG charts. Each function takes plain data and
// returns an SVG string; nothing here touches the network.

const GREEN = '#0b6e3f';
const GOLD = '#c9a227';
const BLUE = '#1d4e89';
const INK = '#1c2b21';
const MUTED = '#5d6b60';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Vertical bars with a value label above each bar and the category below.
export function barChart(rows, opts = {}) {
  const width = opts.width ?? 560;
  const height = opts.height ?? 260;
  const top = 34;
  const bottom = 30;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const plotH = height - top - bottom;
  const slot = width / rows.length;
  const barW = Math.min(46, slot * 0.58);
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.label ?? 'bar chart')}"><title>${esc(opts.label ?? 'bar chart')}</title>`;
  out += `<line x1="0" y1="${height - bottom}" x2="${width}" y2="${height - bottom}" stroke="#d8d2bd" stroke-width="1"/>`;
  rows.forEach((row, i) => {
    const h = Math.max(2, (row.value / max) * plotH);
    const x = slot * i + (slot - barW) / 2;
    const y = height - bottom - h;
    const fill = row.colour ?? GREEN;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${fill}"/>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(row.label)}</text>`;
    out += `<text x="${(slot * i + slot / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(row.axis)}</text>`;
  });
  out += '</svg>';
  return out;
}

// Horizontal bars, longest first, with the value at the end of each bar.
export function hbarChart(rows, opts = {}) {
  const width = opts.width ?? 560;
  const rowH = 34;
  const height = rows.length * rowH + 14;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const labelW = 190;
  const valueW = 64;
  const plotW = width - labelW - valueW;
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.label ?? 'horizontal bar chart')}"><title>${esc(opts.label ?? 'horizontal bar chart')}</title>`;
  rows.forEach((row, i) => {
    const y = 7 + i * rowH;
    const w = Math.max(3, (row.value / max) * plotW);
    out += `<text x="0" y="${y + 15}" font-size="13" fill="${INK}">${esc(row.axis)}</text>`;
    out += `<rect x="${labelW}" y="${y}" width="${w.toFixed(1)}" height="20" rx="3" fill="${row.colour ?? GREEN}"/>`;
    out += `<text x="${(labelW + w + 8).toFixed(1)}" y="${y + 15}" font-size="12" font-weight="700" fill="${INK}">${esc(row.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

// A line over years, with a dot and value at each point. The zero line is
// drawn when the series crosses it, so negative years stay honest.
export function lineChart(rows, opts = {}) {
  const width = opts.width ?? 560;
  const height = opts.height ?? 260;
  const top = 30;
  const bottom = 30;
  const left = 46;
  const right = 14;
  const lo = Math.min(0, ...rows.map((r) => r.value));
  const hi = Math.max(0, ...rows.map((r) => r.value));
  const span = hi - lo || 1;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const xAt = (i) => left + (plotW * i) / (rows.length - 1);
  const yAt = (v) => top + plotH * (1 - (v - lo) / span);
  const zeroY = yAt(0);
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.label ?? 'line chart')}"><title>${esc(opts.label ?? 'line chart')}</title>`;
  out += `<line x1="${left}" y1="${zeroY.toFixed(1)}" x2="${width - right}" y2="${zeroY.toFixed(1)}" stroke="#b9b29a" stroke-width="1"/>`;
  out += `<line x1="${left}" y1="${top}" x2="${left}" y2="${height - bottom}" stroke="#d8d2bd" stroke-width="1"/>`;
  const points = rows.map((r, i) => `${xAt(i).toFixed(1)},${yAt(r.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  rows.forEach((row, i) => {
    const x = xAt(i);
    const y = yAt(row.value);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>`;
    out += `<text x="${x.toFixed(1)}" y="${(y - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(row.label)}</text>`;
    out += `<text x="${x.toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(row.axis)}</text>`;
  });
  out += '</svg>';
  return out;
}

// A donut: wedges plus a legend underneath, each share labelled.
export function donutChart(parts, opts = {}) {
  const size = opts.size ?? 220;
  const cx = size / 2;
  const cy = size / 2;
  const outer = size / 2 - 8;
  const inner = outer * 0.58;
  const total = parts.reduce((s, p) => s + p.share, 0) || 1;
  let angle = -Math.PI / 2;
  let out = `<svg viewBox="0 0 ${size} ${size + parts.length * 26 + 8}" role="img" aria-label="${esc(opts.label ?? 'donut chart')}"><title>${esc(opts.label ?? 'donut chart')}</title>`;
  parts.forEach((part) => {
    const frac = part.share / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + outer * Math.cos(a0);
    const y0 = cy + outer * Math.sin(a0);
    const x1 = cx + outer * Math.cos(a1);
    const y1 = cy + outer * Math.sin(a1);
    const x2 = cx + inner * Math.cos(a1);
    const y2 = cy + inner * Math.sin(a1);
    const x3 = cx + inner * Math.cos(a0);
    const y3 = cy + inner * Math.sin(a0);
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${outer} ${outer} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${part.colour}"/>`;
  });
  const mid = parts[0].share;
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="24" font-weight="800" fill="${INK}">${mid}%</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(parts[0].name)}</text>`;
  parts.forEach((part, i) => {
    const y = size + 16 + i * 26;
    out += `<rect x="6" y="${y - 11}" width="12" height="12" rx="3" fill="${part.colour}"/>`;
    out += `<text x="26" y="${y}" font-size="13" fill="${INK}">${esc(part.name)} — ${part.share}%</text>`;
  });
  out += '</svg>';
  return out;
}

export const CHART_COLOURS = { green: GREEN, gold: GOLD, blue: BLUE };
