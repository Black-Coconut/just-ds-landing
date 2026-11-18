"use client";

import { useEffect, useRef } from "react";

/** Big gold knob that sticks its tongue out at the cursor. Idle wag on touch / reduced motion. */
export default function HeroKnob() {
  const host = useRef<HTMLDivElement>(null);
  const rot = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = host.current, g = rot.current;
    if (!el || !g) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let current = 0, target = 0, raf = 0;
    const tick = () => {
      const d = ((target - current + 540) % 360) - 180; // shortest way round
      current += d * 0.12;
      g.style.transform = `rotate(${current}deg)`;
      raf = Math.abs(d) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      target = (Math.atan2(dx, -dy) * 180) / Math.PI - 180;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-knob" ref={host} aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <g className="rot" ref={rot}>
          <use href="#knob-body" />
          <g className="wag">
            <use href="#knob-tongue" />
          </g>
        </g>
      </svg>
    </div>
  );
}
