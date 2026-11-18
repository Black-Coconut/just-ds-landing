import type { ReactNode } from "react";
import type { Dict } from "@/lib/content";
import { DOWNLOADS, PRO_DS_PRICE } from "@/lib/site";
import { KnobArt, KnobSprite } from "./Knob";
import HeroKnob from "./HeroKnob";
import Demo from "./Demo";
import Gallery from "./Gallery";
import LangHint from "./LangHint";
import JsonLd from "./JsonLd";

/** "**bold**" → <strong>bold</strong> */
function rich(s: string): ReactNode[] {
  return s.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

const WindowsIcon = () => (
  <svg className="os-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M3 5.5 10.5 4.4v7.1H3zm0 13 7.5 1.1v-7H3zm8.5 1.2L21 21v-8.5h-9.5zm0-15.4v7.2H21V3z" />
  </svg>
);
const MacIcon = () => (
  <svg className="os-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M4 5.5h16v10H4zM2 18.5h20" />
  </svg>
);

export default function Landing({ t }: { t: Dict }) {
  const year = new Date().getFullYear();
  const [koLabel, enLabel] = t.langSwitch.html;

  return (
    <>
      <JsonLd t={t} />
      <KnobSprite />
      <a className="sr-only" href="#main">{t.skip}</a>

      <header className="site-header">
        <div className="wrap">
          <a className="brand" href={t.path} aria-label="Just-DS home">
            <KnobArt rotate={-35} />
            <span className="brand-text">
              <span className="brand-maker">VOLTA</span>
              <span className="brand-name">Just-DS</span>
            </span>
          </a>
          <nav className="nav" aria-label={t.nav.aria}>
            <a href="#tongues">{t.nav.features}</a>
            <a href="#compare">{t.nav.compare}</a>
            <a href="#gallery">{t.nav.screens}</a>
            <a href="#faq">{t.nav.faq}</a>
          </nav>
          <div className="header-actions">
            <a className="lang-switch" href={t.langSwitch.href} hrefLang={t.langSwitch.hreflang} lang={t.langSwitch.hreflang}>
              {t.lang === "ko" ? <><b>{koLabel}</b> / {enLabel}</> : <>{koLabel} / <b>{enLabel}</b></>}
            </a>
            <a className="btn btn-gold btn-sm" href="#download">{t.headerCta}</a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                <span className="line">{t.hero.lines[0]}</span>
                <span className="line dim">{t.hero.lines[1]}</span>
                <span className="line">{t.hero.lines[2]} <span className="zero">$0</span></span>
              </h1>
              <p className="lede">{rich(t.hero.lede)}</p>
              <div className="price-row" aria-label={t.hero.priceAria}>
                <span className="price-old">{PRO_DS_PRICE}</span>
                <span className="price-arrow" aria-hidden="true">→</span>
                <span className="price-new">$0</span>
                <span className="price-note">{t.hero.priceNote}</span>
              </div>
              <div className="hero-ctas">
                <a className="btn btn-gold" href="#download">{t.hero.ctaPrimary}</a>
                <a className="btn" href="#compare">{t.hero.ctaSecondary}</a>
              </div>
              <ul className="hero-meta" aria-label={t.hero.metaAria}>
                {t.hero.meta.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>
            <div className="hero-visual">
              <div className="plugin-frame">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised 900px webp, LCP */}
                <img src={t.hero.img} width={900} height={598} fetchPriority="high" alt={t.hero.imgAlt} />
              </div>
              <HeroKnob />
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...t.ticker, ...t.ticker].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        {/* ---------- three tongues ---------- */}
        <section className="section" id="tongues" aria-labelledby="tongues-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.tongues.eyebrow}</p>
              <h2 id="tongues-title">{t.tongues.title}</h2>
              <p className="lede">{t.tongues.lede}</p>
            </div>
            <div className="tongues-grid">
              {t.tongues.cards.map((c) => (
                <article key={c.path} className="tongue-card panel" data-path={c.path}>
                  <span className={c.tagNew ? "tag new" : "tag"}>{c.tag}</span>
                  <KnobArt className="knob-icon" rotate={c.rotate} />
                  <h3>{c.title}</h3>
                  <p className="sub">{c.sub}</p>
                  <p>{c.body}</p>
                  <p className="spec">{rich(c.spec)}</p>
                </article>
              ))}
            </div>
            <Demo t={t.demo} />
          </div>
        </section>

        {/* ---------- comparison ---------- */}
        <section className="section section-alt" id="compare" aria-labelledby="compare-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.compare.eyebrow}</p>
              <h2 id="compare-title">{t.compare.title}</h2>
              <p className="lede">{t.compare.lede}</p>
            </div>
            <div className="compare-wrap panel">
              <table className="compare">
                <caption className="sr-only">{t.compare.caption}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t.compare.cols[0]}</th>
                    <th scope="col">{t.compare.cols[1]}</th>
                    <th scope="col" className="us">{t.compare.cols[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="price">
                    <th scope="row">{t.compare.priceLabel}</th>
                    <td className="them">{PRO_DS_PRICE}</td>
                    <td className="us">$0</td>
                  </tr>
                  {t.compare.rows.map((r) => (
                    <tr key={r.label} className={r.extra ? "extra" : undefined}>
                      <th scope="row" data-badge={r.extra ? t.compare.extraBadge : undefined}>{r.label}</th>
                      <td className={r.extra ? "no" : "yes"}>{r.them}</td>
                      <td className="us yes">{r.us}{r.note && <small>{r.note}</small>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="footnote">{t.compare.footnote}</p>
          </div>
        </section>

        {/* ---------- everything else ---------- */}
        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.features.eyebrow}</p>
              <h2 id="features-title">{t.features.title}</h2>
            </div>
            <div className="features">
              {t.features.items.map((f) => (
                <div className="feature" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- screens ---------- */}
        <section className="section pt-0" id="gallery" aria-labelledby="gallery-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.gallery.eyebrow}</p>
              <h2 id="gallery-title">{t.gallery.title}</h2>
              <p className="lede">{t.gallery.lede}</p>
            </div>
            <Gallery t={t.gallery} />
          </div>
        </section>

        {/* ---------- download ---------- */}
        <section className="section download" id="download" aria-labelledby="download-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.download.eyebrow}</p>
              <h2 id="download-title">{t.download.title}</h2>
              <p className="lede">{t.download.lede}</p>
            </div>
            <div className="dl-grid">
              {t.download.cards.map((c) => {
                const url = DOWNLOADS[c.platform];
                return (
                  <article className="dl-card panel" key={c.platform}>
                    <header>
                      {c.platform === "windows" ? <WindowsIcon /> : <MacIcon />}
                      <h3>{c.name}</h3>
                    </header>
                    <ul className="reqs">
                      {c.reqs.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                    <div className="path well">{c.path}</div>
                    {url ? (
                      <a className="btn btn-gold" href={url} download>{c.ready}</a>
                    ) : (
                      <>
                        <span className="btn btn-gold" aria-disabled="true">{t.download.soonLabel}</span>
                        <p className="soon">{t.download.soonNote}</p>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
            <p className="version-line">{rich(t.download.versionLine)}</p>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{t.faq.eyebrow}</p>
              <h2 id="faq-title">{t.faq.title}</h2>
            </div>
            <div className="faq">
              {t.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="answer"><p>{f.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- final ---------- */}
        <section className="final" aria-labelledby="final-title">
          <div className="wrap">
            <KnobArt className="big-knob" wag />
            <h2 id="final-title">{t.final.title}</h2>
            <p className="lede">{t.final.lede}</p>
            <a className="btn btn-gold" href="#download">{t.final.cta}</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <span>© {year} Volta · Just-DS</span>
            <nav className="footer-links" aria-label={t.footer.aria}>
              <a href="https://voltamix.studio">voltamix.studio</a>
              <a href={t.footer.otherLang.href} hrefLang={t.footer.otherLang.hreflang} lang={t.footer.otherLang.hreflang}>
                {t.footer.otherLang.label}
              </a>
            </nav>
          </div>
          <p className="legal">{t.footer.legal}</p>
        </div>
      </footer>

      <LangHint pageLang={t.lang} t={t.hint} />
    </>
  );
}
