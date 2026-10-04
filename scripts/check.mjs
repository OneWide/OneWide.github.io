import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { profile, publications, awards, honors } from '../content/profile.mjs';

const root = new URL('../', import.meta.url);
const publicPapers = publications.filter(p => ['accepted', 'published'].includes(p.status));
assert.equal(new Set(publications.map(p => p.id)).size, publications.length, 'Publication IDs must be unique');
assert(awards.every(a => ['national', 'regional'].includes(a.level)), 'Every award has a supported level');
for(const lang of ['zh','en']) {
 const pageURL = new URL(lang === 'en' ? 'en/index.html' : 'index.html', root);
 const html = await readFile(pageURL, 'utf8');
 assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one primary heading');
 assert.equal((html.match(/class="publication"/g) || []).length, publicPapers.length);
 assert.equal((html.match(/class="award-row"/g) || []).length, awards.length);
 assert.equal((html.match(/class="honor-card"/g) || []).length, honors.length);
 assert(html.includes(profile.email));
 assert(!/href=["'](?:#|javascript:)["']/.test(html), 'No placeholder links');
 const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
 assert.equal(new Set(ids).size, ids.length, 'Unique element IDs');
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if(url.startsWith('#')) { assert(ids.includes(url.slice(1)), `Missing anchor ${url}`); continue; }
  if(/^(https?:|mailto:)/.test(url)) continue;
  const target = new URL(url, pageURL);
  if(target.pathname.endsWith('/')) target.pathname += 'index.html';
  await access(target);
 }
 for(const paper of publications.filter(p => !['accepted','published'].includes(p.status))) assert(!html.includes(paper.title));
}
await access(new URL('assets/social-card.png', root));
await access(new URL('.nojekyll', root));
console.log('Content, bilingual pages, assets, anchors, and publication visibility checks passed.');
