#!/usr/bin/env node
/**
 * One-time helper: slice theme-habonroof.xml into theme/fragments by 1-based line ranges.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sliceLinesRaw } from './lib/theme-line-slice.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
/** Use reference export so theme-habonroof.xml can be rebuild output */
const SRC = path.join(ROOT, 'theme', 'theme-habonroof.reference.xml');
const OUT_DIR = path.join(ROOT, 'theme', 'fragments');

const slices = [
  ['00-document-head-start.xml', 1, 38],
  ['09-skin-if-prefix.xml', 39, 41],
  ['10-skin-cdata-open.xml', 42, 42],
  ['11-skin-variables-groups.xml', 43, 222],
  ['12-skin-main.css', 223, 6142],
  ['13-skin-close.xml', 6143, 6144],
  ['20-layout-mode-template-skin.xml', 6145, 6402],
  ['29-head-globals-and-defaultmarkups-open.xml', 6403, 6421],
  ['31-defaultmarkup-common.xml', 6422, 6629],
  ['32-defaultmarkup-header.xml', 6630, 6665],
  ['33-defaultmarkup-linklist.xml', 6666, 6674],
  ['34-defaultmarkup-textlist.xml', 6675, 6683],
  ['35-defaultmarkup-html.xml', 6684, 6697],
  ['36-defaultmarkup-text.xml', 6698, 6715],
  ['37-defaultmarkup-blog.xml', 6716, 7495],
  ['38-defaultmarkup-popularposts.xml', 7496, 7657],
  ['39-defaultmarkup-featuredpost.xml', 7658, 7811],
  ['40-defaultmarkup-contactform.xml', 7812, 7831],
  ['41-defaultmarkup-label.xml', 7832, 7869],
  ['42-defaultmarkup-followbyemail.xml', 7870, 7897],
  ['43-defaultmarkup-image.xml', 7898, 7928],
  ['44-defaultmarkup-blogarchive.xml', 7929, 7952],
  ['45-defaultmarkup-blogsearch.xml', 7953, 7974],
  ['46-defaultmarkup-profile.xml', 7975, 7999],
  ['47-after-defaultmarkups-head-close.xml', 8000, 8013],
  ['50-body-shell-start.xml', 8014, 8056],
  ['51-body-header.xml', 8057, 8449],
  ['52-body-main-stream.xml', 8450, 9550],
  ['53-body-sidebar.xml', 9551, 10258],
  ['54-body-footer.xml', 10259, 10588],
  ['55-body-hidden-widgets.xml', 10589, 10614],
  ['60-jquery-and-vendor-script-open.xml', 10615, 10620],
  ['61-vendor-plugins.raw.js', 10621, 10642],
  ['62-vendor-script-close.xml', 10643, 10644],
  ['63-theme-init-script-open.xml', 10645, 10647],
  ['64-theme-init.js', 10648, 11725],
  ['65-theme-init-script-close.xml', 11726, 11727],
  ['70-body-chrome-close.xml', 11728, 11750],
];

function main() {
  const raw = fs.readFileSync(SRC, 'utf8');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, a, b] of slices) {
    const text = sliceLinesRaw(raw, a, b);
    fs.writeFileSync(path.join(OUT_DIR, name), text, 'utf8');
  }
  console.log(`Wrote ${slices.length} fragments to ${OUT_DIR}`);
}

main();
