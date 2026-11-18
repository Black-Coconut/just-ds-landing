import type { ReactNode } from "react";
import type { Dict } from "@/lib/content";
import { DOWNLOADS } from "@/lib/site";
import { KnobArt, KnobSprite } from "./Knob";
import HeroKnob from "./HeroKnob";
import Demo from "./Demo";
import LangHint from "./LangHint";
import LangSwitch, { LangLink } from "./LangSwitch";
import JsonLd from "./JsonLd";
import DownloadButton from "./DownloadButton";

/** "**bold**" → <strong>bold</strong> */
function rich(s: string): ReactNode[] {
  return s.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Keep product names on one line ("Pro-" / "DS" breaks look broken). */
function keepNames(s: string): ReactNode[] {
  return s.split(/(Pro-DS|Just-DS)/g).map((part, i) => (i % 2 ? <span className="nowrap" key={i}>{part}</span> : part));
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

function SectionHead({ id, eyebrow, title, lede }: { id: string; eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

export default function Landing({ t }: { t: Dict }) {
  const year = new Date().getFullYear();

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
              <span className="brand-name">Just-DS</span>
              <span className="brand-maker">by VOLTA</span>
            </span>
          </a>
          <nav className="nav" aria-label={t.nav.aria}>
            <a href="#features">{t.nav.features}</a>
            <a href="#compare">{t.nav.compare}</a>
            <a href="#download">{t.nav.download}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a className="nav-shop" href="#download" aria-label={t.nav.shopAria}><s>{t.nav.shop}</s></a>
          </nav>
          <div className="header-actions">
            <LangSwitch current={t.lang} aria={t.langToggle.aria} />
            <a className="btn btn-gold btn-sm" href="#download">{t.headerCta}</a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------- hero: "Pro • DS / Intelligent and transparent", but free ---------- */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-copy">
              {/* the visible H1 carries the main query ("free de-esser · plosive & breath remover") and the name */}
              <h1 className="hero-h1">
                <span className="eyebrow">{t.hero.eyebrow}</span>
                <span className="sr-only"> — </span>
                {/* text reads "Just-DS"; CSS draws the hyphen as a gold " • " */}
                <span className="hero-title">Just<span className="dash">-</span>DS</span>
              </h1>
              <p className="hero-by">by <a href="https://voltamix.studio">VOLTA</a></p>
              <p className="hero-tagline">{t.hero.tagline}</p>
              <p className="hero-claim">
                <span className="line">{keepNames(t.hero.claim[0])}</span>
                <span className="line dim">{keepNames(t.hero.claim[1])}</span>
                <span className="line">{t.hero.claim[2]} <span className="zero">$0</span></span>
              </p>
              <div className="price-row" aria-label={t.hero.priceAria}>
                <span className="price-new">$0</span>
                <span className="price-note">{t.hero.priceNote}</span>
              </div>
              <div className="hero-ctas">
                <a className="btn btn-gold" href="#download">{t.hero.ctaPrimary}</a>
                <a className="btn btn-trial" href="#download">
                  <s>{t.hero.ctaTrialOld}</s> {t.hero.ctaTrialNew}
                </a>
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
              <span className="sale-badge" aria-hidden="true">{t.hero.badge}</span>
              <HeroKnob />
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...t.ticker, ...t.ticker].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        {/* ---------- intro + pull quote ---------- */}
        <section className="section" id="intro" aria-labelledby="intro-title">
          <div className="wrap intro-grid">
            <div>
              <h2 id="intro-title">{t.intro.title}</h2>
              {t.intro.body.map((p, i) => <p className="lede" key={i}>{rich(p)}</p>)}
            </div>
            <figure className="quote-card panel">
              <blockquote>“{keepNames(t.intro.quote)}”</blockquote>
              <figcaption>
                <KnobArt rotate={-100} className="quote-avatar" />
                <span>— {t.intro.quoteBy}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- accurate detection ×3 + try it yourself ---------- */}
        <section className="section section-alt" id="features" aria-labelledby="detection-title">
          <div className="wrap">
            <SectionHead id="detection-title" eyebrow={t.detection.eyebrow} title={t.detection.title} lede={t.detection.lede} />
            <div className="tongues-grid">
              {t.detection.cards.map((c) => (
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

        {/* ---------- how it works: answer-first facts and Q&A (search snippets and AI answers quote this) ---------- */}
        <section className="section" id="how-it-works" aria-labelledby="guide-title">
          <div className="wrap">
            <SectionHead id="guide-title" eyebrow={t.guide.eyebrow} title={t.guide.title} lede={t.guide.lede} />
            <div className="guide-grid">
              <div className="facts panel">
                <h3>{t.guide.factsTitle}</h3>
                <dl>
                  {t.guide.facts.map((f) => (
                    <div key={f.k}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="guide-qa">
                {t.guide.items.map((it) => (
                  <article key={it.q}>
                    <h3>{it.q}</h3>
                    <p>{keepNames(it.a)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- "Everything you need" / "goodies" blocks ---------- */}
        {t.blocks.map((b, i) => (
          <section key={b.id} className="section feature-section" id={b.id} aria-labelledby={`${b.id}-title`}>
            <div className={i % 2 ? "wrap feature-row reverse" : "wrap feature-row"}>
              <div className="row-copy">
                <p className="eyebrow">{b.eyebrow}</p>
                <h2 id={`${b.id}-title`}>{b.title}</h2>
                <p className="lede">{b.body}</p>
                <ul className="row-bullets">
                  {b.bullets.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <figure className="row-media">
                <div className="shot">
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised 900px webp */}
                  <img src={b.img} width={900} height={598} loading="lazy" alt={b.alt} />
                </div>
                <figcaption>{b.caption}</figcaption>
              </figure>
            </div>
          </section>
        ))}

        {/* ---------- comparison ---------- */}
        <section className="section section-alt" id="compare" aria-labelledby="compare-title">
          <div className="wrap">
            <SectionHead id="compare-title" eyebrow={t.compare.eyebrow} title={t.compare.title} lede={t.compare.lede} />
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

        {/* ---------- key features (numbered, like the original) ---------- */}
        <section className="section section-alt" id="key-features" aria-labelledby="kf-title">
          <div className="wrap">
            <SectionHead id="kf-title" eyebrow={t.keyFeatures.eyebrow} title={t.keyFeatures.title} />
            <ol className="kf-list">
              {t.keyFeatures.items.map((x) => <li key={x}>{x}</li>)}
            </ol>
          </div>
        </section>

        {/* ---------- download + information ---------- */}
        <section className="section download" id="download" aria-labelledby="download-title">
          <div className="wrap">
            <SectionHead id="download-title" eyebrow={t.download.eyebrow} title={t.download.title} lede={t.download.lede} />
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
                      <DownloadButton href={url} platform={c.platform} lang={t.lang}>{c.ready}</DownloadButton>
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

            <h2 className="info-title" id="info-title">{t.info.title}</h2>
            <div className="features info-grid" aria-labelledby="info-title">
              {t.info.blocks.map((b) => (
                <div className="feature" key={b.title}>
                  <h3>{b.title}</h3>
                  {b.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- "included in" bundles ---------- */}
        <section className="section bundles-section" aria-labelledby="bundles-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="bundles-title">{t.bundles.title}</h2>
              <p className="lede">{t.bundles.body}</p>
            </div>
            <ul className="bundles">
              {t.bundles.tiles.map((b, i) => (
                <li key={b.name} className={i === t.bundles.tiles.length - 1 ? "bundle panel ours" : "bundle panel"}>
                  <span className="bundle-name">{b.name}</span>
                  <span className="bundle-price">{b.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="section section-alt" id="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <SectionHead id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
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
            <span>Just-DS by Volta · © {year}</span>
            <nav className="footer-links" aria-label={t.footer.aria}>
              <a href="https://voltamix.studio">voltamix.studio</a>
              <LangLink lang={t.footer.otherLang.hreflang} current={t.lang}>{t.footer.otherLang.label}</LangLink>
            </nav>
          </div>
          <p className="legal">{t.footer.legal}</p>
        </div>
      </footer>

      <LangHint pageLang={t.lang} t={t.hint} />
    </>
  );
}
