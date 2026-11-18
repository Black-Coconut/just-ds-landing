"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Dict } from "@/lib/content";

export default function Gallery({ t }: { t: Dict["gallery"] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = t.shots[active];

  // warm the cache so switching tabs is instant
  useEffect(() => {
    t.shots.forEach((s) => { const im = new Image(); im.src = s.src; });
  }, [t.shots]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + t.shots.length) % t.shots.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <div className="gallery-tabs" role="tablist" aria-label={t.aria}>
        {t.shots.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`tab-${s.key}`}
            aria-selected={i === active}
            aria-controls="gallery-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <figure className="gallery-figure" id="gallery-panel" role="tabpanel" aria-labelledby={`tab-${shot.key}`}>
        <div className="shot">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised 900px webp */}
          <img src={shot.src} width={900} height={598} loading="lazy" alt={shot.alt} />
        </div>
        <figcaption>{shot.caption}</figcaption>
      </figure>
    </>
  );
}
