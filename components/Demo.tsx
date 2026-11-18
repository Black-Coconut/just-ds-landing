"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Dict, PathKey } from "@/lib/content";
import { valueToRotation } from "./Knob";

const COLORS: Record<PathKey, string> = { sib: "#a6dc2a", click: "#ff5d8f", breath: "#ffa91f" };
// visual depth of each path at 100 (plugin maxima: 15 dB / 6 dB / 12 dB)
const DEPTH: Record<PathKey, number> = { sib: 0.82, click: 0.5, breath: 0.75 };
const PATHS: PathKey[] = ["sib", "click", "breath"];
const ARC = "M34.95 165.05 A92 92 0 1 1 165.05 165.05";

type Col = { path: PathKey | null; a: number; silent: boolean };

/** A deterministic "vocal take": v vowel, s sibilance, t click, h breath, _ silence. */
function buildTake(): Col[] {
  let seed = 7;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const script: [string, number][] = [
    ["_", 6], ["h", 26], ["_", 5], ["v", 34], ["s", 20], ["v", 22], ["_", 6], ["t", 3], ["v", 38], ["s", 16], ["_", 10],
    ["h", 22], ["_", 4], ["v", 30], ["t", 3], ["v", 28], ["s", 24], ["_", 8], ["t", 3], ["v", 24], ["s", 14], ["v", 20], ["_", 6],
  ];
  const map: Record<string, PathKey | null> = { s: "sib", t: "click", h: "breath", v: null, _: null };
  const cols: Col[] = [];
  for (const [type, len] of script) {
    for (let i = 0; i < len; i++) {
      const p = len > 1 ? i / (len - 1) : 0.5;
      const edge = Math.min(1, Math.min(i + 1, len - i) / 4);
      let a = 0.02 + rnd() * 0.02;
      if (type === "v") a = (0.5 + 0.12 * Math.sin(p * Math.PI * 1.5 + len) + rnd() * 0.05) * edge;
      if (type === "s") a = (0.8 + rnd() * 0.18) * Math.min(1, Math.min(i + 1, len - i) / 3);
      if (type === "t") a = [0.75, 1.0, 0.6][i] ?? 0.6;
      if (type === "h") a = (0.24 + rnd() * 0.12) * Math.sin(p * Math.PI);
      cols.push({ path: map[type], a, silent: type === "_" });
    }
  }
  return cols;
}

export default function Demo({ t }: { t: Dict["demo"] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const take = useRef<Col[]>(null);
  const [amounts, setAmounts] = useState<Record<PathKey, number>>({ sib: 50, click: 50, breath: 50 });

  const draw = useCallback(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    take.current ??= buildTake();
    const cols = take.current;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const top = 30, mid = top + (h - top) / 2, half = (h - top) / 2 - 8;
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (const y of [mid - half / 2, mid, mid + half / 2]) {
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke();
    }

    const n = cols.length, bw = w / n, gap = bw > 3 ? 1 : 0;
    const gains = cols.map((c) => (c.path ? 1 - (amounts[c.path] / 100) * DEPTH[c.path] : 1));
    cols.forEach((c, i) => {
      const x = i * bw, hOrig = c.a * half, hProc = hOrig * gains[i];
      ctx.fillStyle = "#8d9097";
      ctx.fillRect(x, mid - hProc, bw - gap, hProc * 2);
      if (c.path && hOrig - hProc > 0.5) {
        ctx.fillStyle = COLORS[c.path];
        ctx.globalAlpha = 0.9;
        ctx.fillRect(x, mid - hOrig, bw - gap, hOrig - hProc);
        ctx.fillRect(x, mid + hProc, bw - gap, hOrig - hProc);
        ctx.globalAlpha = 1;
      }
    });
    // gain-reduction curves along the top, one per path
    for (const p of ["breath", "click", "sib"] as PathKey[]) {
      ctx.beginPath();
      ctx.strokeStyle = COLORS[p];
      ctx.lineWidth = 2;
      let prev = 0;
      cols.forEach((c, i) => {
        const target = c.path === p ? 1 - gains[i] : 0;
        prev += (target - prev) * (target > prev ? 0.6 : 0.25);
        const y = 8 + prev * 26;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * bw + bw / 2, y);
      });
      ctx.stroke();
    }
  }, [amounts]);

  useEffect(() => {
    draw();
    const cv = canvas.current;
    if (!cv || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(cv);
    return () => ro.disconnect();
  }, [draw]);

  const set = (p: PathKey, v: number) =>
    setAmounts((a) => ({ ...a, [p]: Math.max(0, Math.min(100, Math.round(v))) }));

  return (
    <div className="demo panel" aria-labelledby="demo-title">
      <div className="demo-head">
        <span className="demo-title" id="demo-title">{t.title}</span>
        <p className="demo-note">{t.note}</p>
      </div>
      <div className="demo-legend" aria-hidden="true">
        <span className="legend-chip" data-path="sib">SIB</span>
        <span className="legend-chip" data-path="click">Click</span>
        <span className="legend-chip" data-path="breath">Breath</span>
      </div>
      <div className="demo-canvas-wrap well">
        <canvas ref={canvas} role="img" aria-label={t.canvasLabel} />
      </div>
      <div className="demo-knobs">
        {PATHS.map((p) => (
          <MiniKnob key={p} path={p} value={amounts[p]} label={t.knobs[p].label} aria={t.knobs[p].aria} onChange={(v) => set(p, v)} />
        ))}
      </div>
    </div>
  );
}

function MiniKnob({ path, value, label, aria, onChange }: { path: PathKey; value: number; label: string; aria: string; onChange: (v: number) => void }) {
  const drag = useRef<{ y: number; v: number } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.focus({ preventScroll: true });
    drag.current = { y: e.clientY, v: value };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    onChange(drag.current.v + (drag.current.y - e.clientY) * 0.6);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5, PageUp: 20, PageDown: -20 } as Record<string, number>)[e.key];
    if (step) { e.preventDefault(); onChange(value + step); }
    if (e.key === "Home") { e.preventDefault(); onChange(0); }
    if (e.key === "End") { e.preventDefault(); onChange(100); }
  };

  return (
    <div className="mini-knob" data-path={path}>
      <div
        className="dial"
        role="slider"
        tabIndex={0}
        aria-label={aria}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (drag.current = null)}
        onKeyDown={onKeyDown}
        onDoubleClick={() => onChange(50)}
      >
        <svg viewBox="-6 -6 212 212" aria-hidden="true">
          <path className="arc arc-bg" pathLength={100} d={ARC} />
          <path className="arc arc-fg" pathLength={100} d={ARC} strokeDasharray={`${value} 100`} />
          <g className="rot" style={{ transform: `rotate(${valueToRotation(value)}deg)` }}>
            <use href="#knob-body" />
            <use href="#knob-tongue" />
          </g>
        </svg>
      </div>
      <span className="label">{label}</span>
      <span className="val">{value}</span>
    </div>
  );
}
