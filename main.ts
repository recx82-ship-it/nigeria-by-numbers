// Hand-in program for the Nigeria by Numbers entry (Node 22+, standard
// library only). It assembles /output from this repository: the site in
// app/, the screenshots in screenshots/, and dossier.json — the summary
// the judge reads — written by the kit's vendored library, which must stay
// byte-identical (vendor/makefun-frontend.ts).
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader, MAKEFUN_OUTPUT_DIR is unset and /output is used.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's own caps, from the kit's reference gate: keep the dossier
// text under its byte cap, at most four screenshots each under 256 KiB,
// and app/ under 993 entries and 16 MiB in total.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function listShots(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /\.(jpe?g|png)$/i.test(name))
    .map((name) => ({ name, bytes: statSync(join(dir, name)).size }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function handIn() {
  mkdirSync(outputDir, { recursive: true });

  const appDir = join(repoRoot, 'app');
  cpSync(appDir, join(outputDir, 'app'), { recursive: true });

  const shotsDir = join(repoRoot, 'screenshots');
  const shots = listShots(shotsDir);
  if (shots.length === 0) console.warn('warning: no screenshots in screenshots/ — the judge sees the site through them');
  if (shots.length > 4) throw new Error(`too many screenshots: ${shots.length} (max 4)`);
  mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
  for (const shot of shots) {
    cpSync(join(shotsDir, shot.name), join(outputDir, 'screenshots', shot.name));
  }

  const dossier = buildDossier(outputDir, DOSSIER_LIMITS);
  writeFileSync(join(outputDir, 'dossier.json'), dossier);

  const appBytes = readdirSync(appDir, { recursive: true })
    .map((f) => join(appDir, f))
    .filter((f) => statSync(f).isFile())
    .reduce((sum, f) => sum + statSync(f).size, 0);
  console.log(`handed in: ${shots.length} screenshots, app/ ${appBytes} bytes, dossier ${dossier.length} bytes`);
}

handIn();
