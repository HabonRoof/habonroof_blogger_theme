#!/usr/bin/env node
/**
 * Concatenate theme fragments in manifest order (newline-preserving).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST = path.resolve(process.argv[2] || path.join(ROOT, 'theme', 'manifest.json'));

function main() {
  const { fragments, output } = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const fragDir = path.join(ROOT, 'theme', 'fragments');
  let out = '';
  for (const name of fragments) {
    const p = path.join(fragDir, name);
    if (!fs.existsSync(p)) {
      console.error(`Missing fragment: ${p}`);
      process.exit(1);
    }
    out += fs.readFileSync(p, 'utf8');
  }
  const outPath = path.isAbsolute(output) ? output : path.join(ROOT, output);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out);
  console.log(`Wrote ${outPath} (${out.length} bytes)`);
}

main();
