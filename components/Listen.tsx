"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { Dict, PathKey } from "@/lib/content";

/* Real before/after audio. The same vocal was rendered through the Just-DS VST3 with the settings
   saved in the test Ableton set; all five clips are sample-aligned, so switching keeps the position. */

type TrackKey = "original" | PathKey | "all";
const TRACKS: TrackKey[] = ["original", "sib", "click", "breath", "all"];
const COLORS: Record<TrackKey, string> = { original: "#8d9097", sib: "#a6dc2a", click: "#ff5d8f", breath: "#ffa91f", all: "#ffc21a" };
const SRC = (k: TrackKey) => `/assets/audio/compare-${k}.m4a`;

// where each path works hardest in this take (found by comparing the renders band by band)
const MOMENTS: { path: PathKey; start: number; end: number }[] = [
  { path: "sib", start: 1.8, end: 4.3 },
  { path: "sib", start: 13.1, end: 15.6 },
  { path: "click", start: 7.9, end: 10.3 },
  { path: "click", start: 21.9, end: 24.4 },
  { path: "breath", start: 10.0, end: 12.4 },
  { path: "breath", start: 40.4, end: 42.9 },
];

type Peaks = { duration: number; hop: number; peaks: Record<TrackKey, number[]>; gr: Record<Exclude<TrackKey, "original">, number[]> };
type Engine = { ctx: AudioContext; buffers: Record<TrackKey, AudioBuffer>; gains: Record<TrackKey, GainNode>; sources: AudioBufferSourceNode[] };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function Listen({ t }: { t: Dict["listen"] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine | null>(null);
  const loading = useRef<Promise<Engine> | null>(null);
  const clock = useRef({ startedAt: 0, offset: 0 }); // offset = position (s) at ctx time startedAt
  const raf = useRef(0);

  const [peaks, setPeaks] = useState<Peaks | null>(null);
  const [track, setTrack] = useState<TrackKey>("sib");
  const [lastProcessed, setLastProcessed] = useState<TrackKey>("sib");
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState(0);
  const [loop, setLoop] = useState<{ start: number; end: number } | null>(null);
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const trackRef = useRef(track);
  trackRef.current = track;

  const duration = peaks?.duration ?? 45.7;

  useEffect(() => {
    fetch("/assets/audio/compare-peaks.json").then((r) => r.json()).then(setPeaks).catch(() => {});
  }, []);

  const ensureEngine = useCallback(async () => {
    if (engine.current) return engine.current;
    loading.current ??= (async () => {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const decoded = await Promise.all(
        TRACKS.map(async (k) => {
          const data = await (await fetch(SRC(k))).arrayBuffer();
          return new Promise<AudioBuffer>((res, rej) => ctx.decodeAudioData(data, res, rej));
        }),
      );
      const buffers = Object.fromEntries(TRACKS.map((k, i) => [k, decoded[i]])) as Engine["buffers"];
      const gains = Object.fromEntries(
        TRACKS.map((k) => {
          const g = ctx.createGain();
          g.gain.value = k === trackRef.current ? 1 : 0;
          g.connect(ctx.destination);
          return [k, g];
        }),
      ) as Engine["gains"];
      engine.current = { ctx, buffers, gains, sources: [] };
      return engine.current;
    })();
    return loading.current;
  }, []);

  const position = useCallback(() => {
    const e = engine.current;
    if (!e || !playing) return clock.current.offset;
    let p = clock.current.offset + (e.ctx.currentTime - clock.current.startedAt);
    const l = loopRef.current;
    if (l && p >= l.start) p = l.start + ((p - l.start) % (l.end - l.start));
    return p;
  }, [playing]);

  const stopSources = () => {
    const e = engine.current;
    if (!e) return;
    for (const s of e.sources) {
      s.onended = null;
      try { s.stop(); } catch { /* already stopped */ }
      s.disconnect();
    }
    e.sources = [];
  };

  const startAt = useCallback((e: Engine, at: number, l: { start: number; end: number } | null) => {
    stopSources();
    const when = e.ctx.currentTime + 0.03;
    e.sources = TRACKS.map((k) => {
      const s = e.ctx.createBufferSource();
      s.buffer = e.buffers[k];
      if (l) { s.loop = true; s.loopStart = l.start; s.loopEnd = l.end; }
      s.connect(e.gains[k]);
      s.start(when, at);
      return s;
    });
    e.sources[0].onended = () => { setPlaying(false); clock.current.offset = 0; setPos(0); };
    clock.current = { startedAt: when, offset: at };
  }, []);

  const play = useCallback(async (from?: number, l = loopRef.current) => {
    setBusy(true);
    try {
      const e = await ensureEngine();
      if (e.ctx.state === "suspended") await e.ctx.resume();
      let at = from ?? clock.current.offset;
      if (at >= duration - 0.05) at = 0;
      startAt(e, at, l);
      setPlaying(true);
    } finally {
      setBusy(false);
    }
  }, [ensureEngine, startAt, duration]);

  const pause = useCallback(() => {
    clock.current.offset = position();
    stopSources();
    setPlaying(false);
  }, [position]);

  const seek = useCallback((to: number, l = loopRef.current) => {
    const at = Math.max(0, Math.min(duration - 0.05, to));
    clock.current.offset = at;
    setPos(at);
    if (playing && engine.current) startAt(engine.current, at, l);
  }, [duration, playing, startAt]);

  const choose = useCallback((k: TrackKey) => {
    setTrack(k);
    if (k !== "original") setLastProcessed(k);
    const e = engine.current;
    if (!e) return;
    const now = e.ctx.currentTime;
    for (const key of TRACKS) {
      const g = e.gains[key].gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(key === k ? 1 : 0, now + 0.02);
    }
  }, []);

  const playMoment = (m: (typeof MOMENTS)[number]) => {
    const l = { start: m.start, end: m.end };
    setLoop(l);
    choose(m.path);
    if (playing && engine.current) { startAt(engine.current, m.start, l); setPos(m.start); }
    else { clock.current.offset = m.start; setPos(m.start); void play(m.start, l); }
  };

  const clearLoop = () => {
    const at = position();
    setLoop(null);
    if (playing && engine.current) startAt(engine.current, at, null);
  };

  // playhead
  useEffect(() => {
    if (!playing) return;
    const tick = () => { setPos(position()); raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, position]);

  useEffect(() => () => { stopSources(); void engine.current?.ctx.close(); }, []);

  const draw = useCallback(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // whole take, or zoomed in on the moment being looped so the difference is visible
    const v0 = loop ? Math.max(0, loop.start - 0.4) : 0;
    const v1 = loop ? Math.min(duration, loop.end + 0.4) : duration;
    const X = (s: number) => ((s - v0) / (v1 - v0)) * w;
    const lane = 34, mid = lane + (h - lane) / 2, half = (h - lane) / 2 - 8;

    for (const m of MOMENTS) {
      const on = track === m.path || track === "original" || track === "all";
      if (!on || m.end < v0 || m.start > v1 || (loop && loop.start !== m.start)) continue;
      ctx.fillStyle = COLORS[m.path];
      ctx.globalAlpha = loop ? 0.06 : 0.09;
      ctx.fillRect(X(m.start), 0, X(m.end) - X(m.start), h);
      ctx.globalAlpha = 1;
    }

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (const y of [lane, mid]) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke(); }

    if (peaks) {
      const orig = peaks.peaks.original, proc = peaks.peaks[track], hop = peaks.hop;
      const step = loop ? 3 : 2; // px per bar
      const bars = Math.floor(w / step);
      const span = (v1 - v0) / bars;
      const gr = track === "original" ? null : peaks.gr?.[track] ?? null;
      let prev = 0;
      ctx.beginPath();
      for (let i = 0; i < bars; i++) {
        const f0 = Math.floor((v0 + i * span) / hop), f1 = Math.max(f0 + 1, Math.floor((v0 + (i + 1) * span) / hop));
        let po = 0, pp = 0, g = 0;
        for (let f = f0; f < f1 && f < orig.length; f++) {
          po = Math.max(po, orig[f]); pp = Math.max(pp, proc[f]);
          if (gr) g = Math.max(g, gr[f]);
        }
        const x = i * step, ho = (po / 1000) * half, hp = (pp / 1000) * half;
        ctx.fillStyle = "#8d9097";
        ctx.fillRect(x, mid - hp, step - 1, hp * 2);
        if (gr && ho - hp > 0.3) {
          ctx.fillStyle = COLORS[track];
          ctx.fillRect(x, mid - ho, step - 1, ho - hp);
          ctx.fillRect(x, mid + hp, step - 1, ho - hp);
        }
        // reduction lane: 0 dB at the top line, 12 dB at the bottom of the lane
        prev += (g / 10 - prev) * (g / 10 > prev ? 1 : 0.5);
        const y = 6 + Math.min(1, prev / 12) * (lane - 10);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x + step / 2, y);
      }
      if (gr) { ctx.strokeStyle = COLORS[track]; ctx.lineWidth = 2; ctx.stroke(); }
    }

    if (pos >= v0 && pos <= v1) {
      ctx.fillStyle = "#ecedef";
      ctx.fillRect(Math.round(X(pos)) - 1, 0, 2, h);
    }
  }, [peaks, track, pos, duration, loop]);

  useEffect(() => {
    draw();
    const cv = canvas.current;
    if (!cv || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(cv);
    return () => ro.disconnect();
  }, [draw]);

  const onCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const l = loopRef.current;
    const v0 = l ? Math.max(0, l.start - 0.4) : 0, v1 = l ? Math.min(duration, l.end + 0.4) : duration;
    const to = v0 + ((e.clientX - r.left) / r.width) * (v1 - v0);
    if (l && (to < l.start || to > l.end)) { setLoop(null); seek(to, null); }
    else seek(to);
  };

  const onKey = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); seek(position() + 2); }
    if (e.key === "ArrowLeft") { e.preventDefault(); seek(position() - 2); }
  };

  const flip = () => choose(track === "original" ? lastProcessed : "original");

  let num: Record<PathKey, number> = { sib: 0, click: 0, breath: 0 };

  return (
    <div className="listen panel" aria-labelledby="listen-title">
      <div className="demo-head">
        <span className="demo-title" id="listen-title">{t.title}</span>
        <p className="demo-note">{t.note}</p>
      </div>

      <div className="listen-tracks" role="radiogroup" aria-label={t.title}>
        {TRACKS.map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={track === k}
            className="listen-track"
            data-track={k}
            onClick={() => choose(k)}
          >
            {t.tracks[k]}
          </button>
        ))}
      </div>

      <div className="listen-canvas-wrap well">
        <canvas
          ref={canvas}
          role="slider"
          tabIndex={0}
          aria-label={t.canvasLabel}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={fmt(pos)}
          onClick={onCanvasClick}
          onKeyDown={onKey}
        />
      </div>

      <div className="listen-transport">
        <button type="button" className="listen-play" onClick={() => (playing ? pause() : void play())} disabled={busy} aria-label={playing ? t.pause : t.play}>
          {busy ? <span className="spin" aria-hidden="true" /> : playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
          )}
        </button>
        <span className="listen-time">{busy ? t.loading : `${fmt(pos)} / ${fmt(duration)}`}</span>
        <button type="button" className="listen-ab" onClick={flip} aria-label={t.abAria} aria-pressed={track === "original"}>
          <span className="ab-a" data-on={track === "original"}>A</span>
          <span className="ab-b" data-on={track !== "original"}>B</span>
          <span className="ab-label">{t.ab}</span>
        </button>
        {loop && (
          <button type="button" className="listen-loopoff" onClick={clearLoop}>
            {t.loopOff}
          </button>
        )}
      </div>

      <div className="listen-moments">
        <span className="listen-moments-title">{t.momentsTitle}</span>
        <ul>
          {MOMENTS.map((m) => {
            num = { ...num, [m.path]: num[m.path] + 1 };
            const active = loop?.start === m.start;
            return (
              <li key={m.start}>
                <button type="button" className="moment" data-path={m.path} aria-pressed={active} onClick={() => playMoment(m)}>
                  <span className="moment-tag">{t.tracks[m.path]} {num[m.path]}</span>
                  <span className="moment-time">{fmt(m.start)}</span>
                  <span className="moment-hint">{t.hints[m.path]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
