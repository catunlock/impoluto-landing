// Builds the static site into dist/: one page per language from src/i18n/*.js, plus the
// files in public/, the stylesheet, the script, sitemap.xml and robots.txt. No dependencies:
// `node build.mjs` is the whole build.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import site from './site.config.js';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

const langFiles = readdirSync(join(root, 'src/i18n')).filter((f) => f.endsWith('.js')).sort();
const langs = [];
for (const f of langFiles) langs.push((await import(pathToFileURL(join(root, 'src/i18n', f)).href)).default);
const defaultLang = langs.find((l) => l.path === '/');
if (!defaultLang) throw new Error('One language must be served at "/"');

// Cache-busting: the stylesheet and script get a short content hash in their URL.
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);
const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
const js = readFileSync(join(root, 'src/main.js'), 'utf8');
const cssFile = `assets/styles.${hash(css)}.css`;
const jsFile = `assets/main.${hash(js)}.js`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Where the site is served. On GitHub Pages without a custom domain it lives under a path
// (https://catunlock.github.io/impoluto-landing), so the workflow passes SITE_URL and BASE_PATH.
const siteUrl = (process.env.SITE_URL || site.siteUrl).replace(/\/$/, '');
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const abs = (p) => siteUrl + p;
// Root-relative URLs ("/img/…", "/es/") get the base path in front.
const withBase = (s) => (base ? s.replace(/(\s(?:src|href)=")\//g, `$1${base}/`).replace(/url\('\//g, `url('${base}/`) : s);

const icons = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  list: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  device: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};
const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

const sparkle = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z"/></svg>`;

// Screenshot sizes (the files in public/img are 2x).
const IMG = {
  'map-desktop': [1600, 1000],
  'furniture-3d': [1600, 1000],
  'plan-editor': [1600, 1000],
  'map-phone': [780, 1688],
  'today-phone': [780, 1688],
  'fair-phone': [780, 1688],
};
const img = (name, alt, { eager = false, cls = '' } = {}) => {
  const [w, h] = IMG[name];
  return `<img class="${cls}" src="/img/${name}.webp" width="${w / 2}" height="${h / 2}" alt="${esc(alt)}" ${
    eager ? 'fetchpriority="high"' : 'loading="lazy"'
  } decoding="async">`;
};
const phone = (name, alt, opts) => `<div class="phone">${img(name, alt, opts)}</div>`;
const browser = (name, alt, opts) =>
  `<div class="browser"><div class="browser-bar" aria-hidden="true"><span></span><span></span><span></span><div class="browser-url">impoluto.app</div></div>${img(name, alt, opts)}</div>`;

function render(t) {
  const others = langs.filter((l) => l !== t);
  const alternates = [
    ...langs.map((l) => `<link rel="alternate" hreflang="${l.lang}" href="${abs(l.path)}">`),
    `<link rel="alternate" hreflang="x-default" href="${abs(defaultLang.path)}">`,
  ].join('\n    ');
  const suggest = others[0];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.storeTitle,
    alternateName: site.name,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, Android, iOS',
    description: t.meta.description,
    url: abs(t.path),
    image: abs('/og.png'),
    inLanguage: t.lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  return `<!doctype html>
<html lang="${t.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(t.meta.title)}</title>
    <meta name="description" content="${esc(t.meta.description)}">
    <link rel="canonical" href="${abs(t.path)}">
    ${alternates}
    <meta name="color-scheme" content="light dark">
    <meta name="theme-color" content="#fbfbfc" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#0d1119" media="(prefers-color-scheme: dark)">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${site.name}">
    <meta property="og:title" content="${esc(t.meta.title)}">
    <meta property="og:description" content="${esc(t.meta.description)}">
    <meta property="og:url" content="${abs(t.path)}">
    <meta property="og:image" content="${abs('/og.png')}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(t.meta.ogAlt)}">
    <meta property="og:locale" content="${t.locale}">
    ${others.map((l) => `<meta property="og:locale:alternate" content="${l.locale}">`).join('\n    ')}
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/img/map-desktop.webp" as="image" type="image/webp" media="(min-width: 720px)">
    <link rel="stylesheet" href="/${cssFile}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script src="/${jsFile}" defer></script>
  </head>
  <body>
    <a class="skip" href="#main">${t.skip}</a>

    <div class="lang-suggest" data-lang-suggest="${suggest.lang}" hidden>
      <div class="wrap">
        <span lang="${suggest.lang}">${t.langSuggest.text}</span>
        <a lang="${suggest.lang}" href="${suggest.path}" data-lang-choice="${suggest.lang}">${t.langSuggest.link}</a>
        <button type="button" class="lang-suggest-close" data-lang-dismiss aria-label="${esc(t.langSuggest.close)}">${icon('close')}</button>
      </div>
    </div>

    <header class="top">
      <div class="wrap top-inner">
        <a class="brand" href="${t.path}" aria-label="${site.name}">
          <img src="/img/mark.png" width="32" height="32" alt="">
          <span>${site.name}</span>
        </a>
        <nav class="top-nav" aria-label="${esc(t.nav.menu)}">
          <a href="#how">${t.nav.how}</a>
          <a href="#features">${t.nav.features}</a>
          <a href="#faq">${t.nav.faq}</a>
        </nav>
        <div class="top-actions">
          ${others
            .map((l) => `<a class="lang-link" href="${l.path}" hreflang="${l.lang}" lang="${l.lang}" data-lang-choice="${l.lang}">${l.lang.toUpperCase()}</a>`)
            .join('')}
          <a class="btn btn-small" href="${site.appUrl}">${t.nav.cta}</a>
        </div>
      </div>
    </header>

    <main id="main">
      <section class="hero">
        <div class="hero-sky" aria-hidden="true">
          <div class="sun"></div>
          ${sparkle('spark spark-1')}${sparkle('spark spark-2')}${sparkle('spark spark-3')}
        </div>
        <div class="wrap hero-copy">
          <p class="eyebrow">${t.hero.eyebrow}</p>
          <h1>${t.hero.title}</h1>
          <p class="lead">${t.hero.lead}</p>
          <div class="hero-ctas">
            <a class="btn btn-large" href="${site.appUrl}">${t.hero.cta}${icon('arrow', 'icon btn-arrow')}</a>
            <a class="btn-ghost" href="#how">${t.hero.secondary}</a>
          </div>
          <p class="hero-note">${t.hero.ctaNote} · ${t.hero.platforms}</p>
        </div>
        <div class="wrap hero-shots">
          ${browser('map-desktop', t.hero.shotDesktop, { eager: true })}
          ${phone('today-phone', t.hero.shotPhone, { eager: true })}
        </div>
      </section>

      <section class="facts" aria-label="${site.name}">
        <div class="wrap facts-grid">
          ${t.facts.map((f) => `<div class="fact"><strong>${f.n}</strong><span>${f.t}</span></div>`).join('')}
        </div>
      </section>

      <section class="section" id="how">
        <div class="wrap">
          <p class="kicker">${t.how.kicker}</p>
          <h2>${t.how.title}</h2>
          <ol class="steps">
            ${t.how.steps
              .map((s, i) => `<li class="step"><span class="step-n" aria-hidden="true">${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></li>`)
              .join('\n            ')}
          </ol>
        </div>
      </section>

      <section class="section section-soft" id="features">
        <div class="wrap">
          <p class="kicker">${t.features.kicker}</p>
          <h2>${t.features.title}</h2>
          <div class="rows">
            ${t.features.rows
              .map(
                (r, i) => `<article class="row ${i % 2 ? 'row-flip' : ''} row-${r.kind}">
              <div class="row-copy">
                <h3>${r.t}</h3>
                <p>${r.d}</p>
                <ul class="checks">${r.points.map((p) => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
              </div>
              <div class="row-media">${r.kind === 'phone' ? phone(r.img, r.alt) : browser(r.img, r.alt)}</div>
            </article>`,
              )
              .join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <h2 class="h2-center">${t.more.title}</h2>
          <div class="cards">
            ${t.more.items.map((c) => `<div class="card">${icon(c.icon, 'icon card-icon')}<h3>${c.t}</h3><p>${c.d}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="wrap">
          <p class="kicker">${t.roadmap.kicker}</p>
          <h2>${t.roadmap.title}</h2>
          <div class="cards cards-soon">
            ${t.roadmap.items.map((c) => `<div class="card card-soon">${icon(c.icon, 'icon card-icon')}<h3>${c.t}</h3><p>${c.d}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="wrap wrap-narrow">
          <p class="kicker">${t.faq.kicker}</p>
          <h2>${t.faq.title}</h2>
          <div class="faq">
            ${t.faq.items.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n            ')}
          </div>
        </div>
      </section>

      <section class="final">
        <div class="wrap">
          <div class="final-card">
            ${sparkle('spark final-spark-1')}${sparkle('spark final-spark-2')}
            <img src="/img/mark.png" width="64" height="64" alt="" loading="lazy">
            <h2>${t.final.title}</h2>
            <p>${t.final.lead}</p>
            <a class="btn btn-large btn-white" href="${site.appUrl}">${t.final.cta}${icon('arrow', 'icon btn-arrow')}</a>
            <p class="final-note">${t.hero.ctaNote}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot">
      <div class="wrap foot-inner">
        <div class="foot-brand">
          <a class="brand" href="${t.path}"><img src="/img/mark.png" width="28" height="28" alt=""><span>${site.name}</span></a>
          <p>${t.footer.tagline}</p>
        </div>
        <nav class="foot-langs" aria-label="${esc(t.footer.language)}">
          ${langs
            .map((l) =>
              l === t
                ? `<span aria-current="page">${l.label}</span>`
                : `<a href="${l.path}" hreflang="${l.lang}" lang="${l.lang}" data-lang-choice="${l.lang}">${l.label}</a>`,
            )
            .join('')}
        </nav>
        <p class="foot-copy">© ${new Date().getFullYear()} ${t.footer.rights}</p>
      </div>
    </footer>
  </body>
</html>
`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
cpSync(join(root, 'public'), out, { recursive: true });
writeFileSync(join(out, cssFile), withBase(css));
writeFileSync(join(out, jsFile), js);

for (const t of langs) {
  const dir = join(out, t.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), withBase(render(t)));
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langs
  .map(
    (t) => `  <url>
    <loc>${abs(t.path)}</loc>
    <lastmod>${today}</lastmod>
${langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${abs(l.path)}"/>`).join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

console.log(`Built ${langs.map((l) => l.path).join(', ')} into dist/ for ${siteUrl}`);
