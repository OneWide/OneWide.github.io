import { mkdir, writeFile } from 'node:fs/promises';
import { site, profile, publications, awards, honors } from '../content/profile.mjs';

const root = new URL('../', import.meta.url);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const accepted = publications.filter(paper => ['accepted', 'published'].includes(paper.status)).sort((first, second) => second.year - first.year);
const sortedAwards = [...awards].sort((first, second) => second.year - first.year);
const publicationYears = [...new Set(accepted.map(paper => paper.year))];
for (const paper of accepted) {
  for (const key of ['id', 'title', 'authors', 'venue', 'year']) if (!paper[key]) throw new Error(`Publication is missing ${key}`);
  if (!Array.isArray(paper.authors) || !paper.authors.length) throw new Error('Publication authors must be a nonempty array');
  if (paper.equalContribution && (!Array.isArray(paper.equalContribution) || paper.equalContribution.some(name => !paper.authors.includes(name)))) throw new Error('Equal-contribution names must appear in the author list');
  if (paper.overview && (!paper.overview.thumbnail?.startsWith('assets/publications/') || !paper.overview.full?.startsWith('assets/publications/') || !paper.overview.alt?.zh || !paper.overview.alt?.en || !(paper.overview.width > 0 && paper.overview.height > 0))) throw new Error('Publication overview requires local assets, dimensions, and bilingual alternative text');
  for (const key of ['paper', 'code', 'doi']) if (paper[key] && !/^https:\/\//.test(paper[key])) throw new Error(`${key} must be an HTTPS URL`);
}
const icons = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 6 9 7 9-7"/>',
  github: '<path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.9c.1-1-.3-1.8-.8-2.3 2.8-.3 5.8-1.4 5.8-6.3A4.9 4.9 0 0 0 18.7 6 4.5 4.5 0 0 0 18.6 2s-1.1-.3-3.6 1.4a12.1 12.1 0 0 0-6 0C6.5 1.7 5.4 2 5.4 2A4.5 4.5 0 0 0 5.3 6 4.9 4.9 0 0 0 4 9.5c0 4.9 3 6 5.8 6.3-.5.5-.9 1.3-.8 2.3V22"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20 13A8 8 0 0 1 11 4a8.5 8.5 0 1 0 9 9Z"/>'
};
const icon = name => `<svg class="icon icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const routes = [{ lang: 'en', directory: '' }, { lang: 'zh', directory: 'zh/' }, { lang: 'en', directory: 'en/' }];

for (const { lang, directory } of routes) {
  const english = lang === 'en';
  const translate = value => typeof value === 'object' ? value[lang] : value;
  const text = (chinese, englishText) => english ? englishText : chinese;
  const base = directory ? '../' : './';
  const canonical = `https://onewide.github.io/${english ? '' : 'zh/'}`;
  const description = text('王亿宽的学术主页：大语言模型安全、多智能体推理与多模态感知研究、论文及获奖经历。', 'Yikuan Wang’s research on LLM security, multi-agent reasoning, and multimodal perception. Publications, awards, and experience.');
  const certificate = (file, label, name) => file ? `<a class="certificate-link" href="${base}assets/certificates/${escapeHTML(file)}" data-certificate data-title="${escapeHTML(name)}" aria-label="${escapeHTML(`${name} · ${label}`)}">${escapeHTML(label)}${icon('arrow')}</a>` : '';
  const sectionHeading = (id, label, extra = '') => `<div class="section-heading"><h2 id="${id}-title">${label}</h2>${extra}</div>`;
  const prize = number => (english ? { 1: 'First Prize', 2: 'Second Prize', 3: 'Third Prize' } : { 1: '一等奖', 2: '二等奖', 3: '三等奖' })[number];
  const level = value => value === 'national' ? text('国家级', 'National') : text('省部级', 'Regional');
  const navigation = [['about', text('关于我', 'About')], ['publications', text('论文', 'Publications')], ['awards', text('奖项与荣誉', 'Awards')], ['experience', text('教育与经历', 'Experience')]];
  const renderPublication = paper => {
    const authors = paper.authors.map(name => {
      const label = Object.values(profile.name).includes(name) ? `<strong>${escapeHTML(name)}</strong>` : escapeHTML(name);
      return label + (paper.equalContribution?.includes(name) ? '<sup class="author-marker">*</sup>' : '');
    }).join(', ');
    const overview = paper.overview ? `<figure class="publication-overview"><a href="${base}${escapeHTML(paper.overview.full)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(text(`查看 ${paper.id.toUpperCase()} 完整框架图（新窗口）`, `Open ${paper.id.toUpperCase()} overview in a new tab`))}"><img src="${base}${escapeHTML(paper.overview.thumbnail)}" width="${paper.overview.width}" height="${paper.overview.height}" alt="${escapeHTML(translate(paper.overview.alt))}" loading="lazy" decoding="async"></a></figure>` : '';
    const links = [['paper', text('论文 PDF', 'Paper PDF')], ['doi', 'DOI'], ['code', text('代码', 'Code')]].filter(([key]) => paper[key]).map(([key, label]) => `<a href="${escapeHTML(paper[key])}" target="_blank" rel="noopener noreferrer">${label}${icon('arrow')}</a>`).join('');
    return `<article class="publication" id="paper-${escapeHTML(paper.id)}"${paper.overview ? ' data-with-overview' : ''}>
${overview}<div class="publication-content"><div class="publication-meta"><span class="venue-badge">${escapeHTML(paper.venue)} ${paper.year}</span><span class="paper-status">${paper.presentation ? escapeHTML(paper.presentation) + ' · ' : ''}${paper.status === 'accepted' ? text('已录用', 'Accepted') : text('已发表', 'Published')}</span></div>
<h4>${paper.paper ? `<a href="${escapeHTML(paper.paper)}" target="_blank" rel="noopener noreferrer">${escapeHTML(paper.title)}</a>` : escapeHTML(paper.title)}</h4><p class="authors">${authors}</p>
${paper.equalContribution?.length ? `<p class="contribution-note">* ${text('共同第一作者', 'Co-first author')}</p>` : ''}
${paper.summary ? `<p class="paper-summary">${escapeHTML(translate(paper.summary))}</p>` : ''}
<div class="paper-links">${links}${paper.bibtex ? `<details><summary>BibTeX</summary><pre>${escapeHTML(paper.bibtex)}</pre><button type="button" class="copy-bibtex">${text('复制引用', 'Copy citation')}</button></details>` : ''}</div></div></article>`;
  };
  const papers = publicationYears.map(year => `<div class="publication-year-group"><h3 class="pub-year">${year}</h3><div class="publication-list">${accepted.filter(paper => paper.year === year).map(renderPublication).join('')}</div></div>`).join('');
  const filters = `<div class="award-filters" role="group" aria-label="${text('筛选竞赛奖项', 'Filter competition awards')}">${[['all', text('全部', 'All')], ['national', text('国家级', 'National')], ['regional', text('省部级', 'Regional')]].map(([value, label]) => `<button type="button" data-filter="${value}" aria-pressed="${value === 'all'}">${label}<span>${value === 'all' ? awards.length : awards.filter(award => award.level === value).length}</span></button>`).join('')}</div>`;
  const html = `<!doctype html>
<html lang="${english ? 'en' : 'zh-CN'}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark">
<title>${escapeHTML(site.title)}</title><meta name="description" content="${escapeHTML(description)}"><meta name="theme-color" content="#256653">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="en" href="https://onewide.github.io/"><link rel="alternate" hreflang="zh-CN" href="https://onewide.github.io/zh/"><link rel="alternate" hreflang="x-default" href="https://onewide.github.io/">
<meta property="og:type" content="profile"><meta property="og:title" content="${escapeHTML(site.title)}"><meta property="og:description" content="${escapeHTML(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://onewide.github.io/assets/social-card.png"><meta property="og:locale" content="${english ? 'en_US' : 'zh_CN'}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}assets/favicon.ico" sizes="any"><link rel="icon" type="image/png" href="${base}assets/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
<script>try { const theme = localStorage.getItem('theme'); if (theme === 'dark' || theme === 'light') document.documentElement.dataset.theme = theme; } catch {}</script>
<link rel="stylesheet" href="${base}assets/site.css"><link rel="stylesheet" href="${base}assets/publications.css"><script src="${base}assets/site.js" defer></script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name.en, alternateName: profile.name.zh, url: 'https://onewide.github.io/', image: 'https://onewide.github.io/assets/portrait.webp', email: profile.email, affiliation: { '@type': 'CollegeOrUniversity', name: profile.university.en }, sameAs: [profile.github], knowsAbout: profile.interests.map(interest => interest.name.en) }).replaceAll('<', '\\u003c')}</script>
</head>
<body>
<a class="skip-link" href="#main">${text('跳转至主要内容', 'Skip to content')}</a>
<header class="site-header"><div class="container header-inner"><a class="wordmark" href="${english ? base : './'}"><img src="${base}assets/site-icon.webp" width="30" height="30" alt=""><span>Yikuan Wang</span></a><nav id="navigation" aria-label="${text('主要导航', 'Main navigation')}">${navigation.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav><div class="header-tools"><a class="language-link" href="${english ? base + 'zh/' : '../'}" lang="${english ? 'zh-CN' : 'en'}" hreflang="${english ? 'zh-CN' : 'en'}">${english ? '中文' : 'EN'}</a><button class="theme-toggle" type="button" aria-label="${text('切换深色主题', 'Switch to dark theme')}" aria-pressed="false">${icon('moon')}${icon('sun')}</button><button class="menu-toggle" type="button" aria-label="${text('展开导航', 'Toggle navigation')}" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button></div></div></header>
<main id="main" class="container main-content">
<section id="about" class="profile-card" aria-labelledby="hero-title"><div class="profile-copy"><div class="name-line"><h1 id="hero-title">${escapeHTML(translate(profile.name))}</h1><span lang="${english ? 'zh-CN' : 'en'}">${escapeHTML(english ? profile.name.zh : profile.name.en)}</span></div><p class="profile-role">${escapeHTML(translate(profile.role))}</p><p class="profile-affiliation">${escapeHTML(translate(profile.school))}, ${escapeHTML(translate(profile.university))}</p><p class="profile-intro">${escapeHTML(translate(profile.intro))}</p><div class="profile-links"><a href="mailto:${profile.email}">${icon('mail')}${profile.email}</a><button class="copy-email icon-button" type="button" data-email="${profile.email}" aria-label="${text('复制邮箱地址', 'Copy email address')}">${icon('copy')}</button><a href="${profile.github}" target="_blank" rel="noopener noreferrer">${icon('github')}GitHub${icon('arrow')}</a><span id="copy-status" class="copy-status" role="status" aria-live="polite"></span></div></div><div class="portrait-frame"><img src="${base}assets/portrait.webp" alt="${text('王亿宽的个人照片', 'Portrait of Yikuan Wang')}" width="800" height="1120" fetchpriority="high"></div></section>
<section id="publications" class="section" aria-labelledby="publications-title">${sectionHeading('publications', text('学术成果', 'Publications'))}${papers || `<p class="empty-state">${text('论文信息将在确认后更新。', 'Publication details will be added once confirmed.')}</p>`}</section>
<section id="research" class="section" aria-labelledby="research-title">${sectionHeading('research', text('研究方向', 'Research interests'))}<div class="research-grid">${profile.interests.map(interest => `<article class="research-card"><h3>${escapeHTML(translate(interest.name))}</h3><p>${escapeHTML(translate(interest.description))}</p><div class="topic-tags">${interest.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div></article>`).join('')}</div></section>
<section id="awards" class="section" aria-labelledby="awards-title">${sectionHeading('awards', text('竞赛奖项', 'Competition awards'), filters)}<p class="sr-only" id="filter-status" role="status" aria-live="polite"></p><div class="awards-list panel">${sortedAwards.map(award => `<article class="award-row" data-level="${award.level}"><span class="award-year">${award.year}</span><div class="award-name"><h3>${escapeHTML(translate(award.name))}</h3><p>${escapeHTML(translate(award.track))}</p></div><span class="prize-badge${award.level === 'national' ? ' national' : ''}"><strong>${prize(award.prize)}</strong><span>${level(award.level)}</span></span>${certificate(award.certificate, text('证书', 'Certificate'), `${translate(award.name)} · ${award.year} · ${level(award.level)} ${prize(award.prize)}`)}</article>`).join('')}</div></section>
<section id="honors" class="section" aria-labelledby="honors-title">${sectionHeading('honors', text('奖学金与荣誉', 'Scholarships & honors'))}<div class="honors-grid">${honors.map(honor => `<article class="honor-card"><span class="honor-year">${honor.year}</span><h3>${escapeHTML(translate(honor.title))}</h3><p>${escapeHTML(translate(honor.description))}</p>${honor.certificates ? `<div class="honor-links">${honor.certificates.map(item => certificate(item.file, item.label || text('证书', 'Certificate'), translate(honor.title))).join('')}</div>` : ''}</article>`).join('')}</div></section>
<section id="experience" class="section" aria-labelledby="experience-title">${sectionHeading('experience', text('教育与经历', 'Education & experience'))}<div class="experience-grid"><div class="education panel"><h3>${text('教育背景', 'Education')}</h3>${profile.education.map(education => `<article class="education-item"><p class="education-period">${escapeHTML(translate(education.period))}${education.current ? `<span class="current-label">${text('在读', 'Current')}</span>` : ''}</p><h4>${escapeHTML(translate(education.degree))}</h4><p class="education-school">${escapeHTML(translate(profile.university))} · ${escapeHTML(translate(profile.school))}</p><p class="education-detail">${escapeHTML(translate(education.detail))}</p></article>`).join('')}</div><div class="service-card panel"><h3>${text('学生工作', 'Service & leadership')}</h3><p class="service-period">${profile.service.period}</p><h4>${escapeHTML(translate(profile.service.title))}</h4><p class="service-organization">${escapeHTML(translate(profile.service.organization))}</p><p class="service-description">${escapeHTML(translate(profile.service.description))}</p>${certificate(profile.service.certificate, text('任职证明', 'Appointment certificate'), translate(profile.service.title))}</div></div></section>
</main>
<footer class="container site-footer"><p>© ${site.updated.slice(0, 4)} ${escapeHTML(profile.name.en)}<span>${text('更新于', 'Updated')} ${site.updated.slice(0, 7)}</span></p><a href="#about">${text('返回顶部', 'Back to top')} ↑</a></footer>
<dialog id="certificate-dialog" aria-labelledby="certificate-title"><div class="dialog-header"><h2 id="certificate-title"></h2><button type="button" class="dialog-close" aria-label="${text('关闭证书', 'Close certificate')}">${icon('close')}</button></div><div class="certificate-image-wrap"><img id="certificate-image" alt=""></div><div class="dialog-footer"><a id="certificate-original" target="_blank" rel="noopener noreferrer">${text('在新窗口查看', 'Open in new tab')}${icon('arrow')}</a><span>Esc ${text('关闭', 'to close')}</span></div></dialog>
</body>
</html>`;
  const destination = new URL(directory || './', root);
  await mkdir(destination, { recursive: true });
  await writeFile(new URL('index.html', destination), html);
}
await writeFile(new URL('robots.txt', root), 'User-agent: *\nAllow: /\nSitemap: https://onewide.github.io/sitemap.xml\n');
await writeFile(new URL('sitemap.xml', root), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://onewide.github.io/</loc></url><url><loc>https://onewide.github.io/zh/</loc></url></urlset>\n');
console.log(`Built English home, Chinese /zh/, and English /en/ compatibility page. ${accepted.length} publications, ${awards.length} awards.`);
