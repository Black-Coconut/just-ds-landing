"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import type { Dict, PathKey } from "@/lib/content";

/* Real before/after audio. The same vocal was rendered through the Just-DS VST3 with the settings
   saved in the test Ableton set; all five clips are sample-aligned, so switching keeps the position. */

type TrackKey = "original" | PathKey | "all";
type Span = { start: number; end: number };
const TRACKS: TrackKey[] = ["original", "sib", "click", "breath", "all"];
const COLORS: Record<TrackKey, string> = { original: "#8d9097", sib: "#a6dc2a", click: "#ff5d8f", breath: "#ffa91f", all: "#ffc21a" };
const SRC = (k: TrackKey) => `/assets/audio/compare-${k}.m4a`;
const DSRC = (k: DeltaKey) => `/assets/audio/delta-${k}.m4a`;
const MIN_LOOP = 0.25; // s

/* DELTA: what each path removed (original − processed, subtracted before encoding), heard through a
   band-pass the visitor sets. Ranges and starting bands are the plugin's detection-band parameters. */
type DeltaKey = PathKey | "all";
const DELTAS: DeltaKey[] = ["sib", "click", "breath", "all"];
type Band = { lo: number; hi: number };
const BAND_RANGE: Record<DeltaKey, Band> = {
  sib: { lo: 1000, hi: 20000 },
  click: { lo: 500, hi: 20000 },
  breath: { lo: 50, hi: 10000 },
  all: { lo: 20, hi: 20000 },
};
const BAND_DEFAULT: Record<DeltaKey, Band> = {
  sib: { lo: 4000, hi: 10000 },
  click: { lo: 3000, hi: 11000 },
  breath: { lo: 300, hi: 2500 },
  all: { lo: 20, hi: 20000 },
};
const MIN_RATIO = 1.25; // narrowest band (hi / lo)
const BW_Q = [0.5412, 1.3066]; // two cascaded biquads = 4th-order Butterworth (24 dB/oct)
const fmtHz = (f: number) => (f < 1000 ? `${Math.round(f)}` : f < 10000 ? `${(f / 1000).toFixed(1)}k` : `${Math.round(f / 1000)}k`);
const EDGE_PX = 8; // grab distance for the loop handles

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
type Engine = {
  ctx: AudioContext;
  buffers: Record<TrackKey, AudioBuffer>;
  gains: Record<TrackKey, GainNode>;
  dBuffers: Record<DeltaKey, AudioBuffer>;
  dGains: Record<DeltaKey, GainNode>;
  hp: BiquadFilterNode[];
  lp: BiquadFilterNode[];
  sources: AudioBufferSourceNode[];
};
type Drag = { mode: "new" | "move" | "start" | "end"; x0: number; t0: number; orig: Span | null; moved: boolean };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const fmtFine = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;

export default function Listen({ t }: { t: Dict["listen"] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine | null>(null);
  const loading = useRef<Promise<Engine> | null>(null);
  // offset = position (s) at ctx time startedAt; loop = the loop the running sources were started with
  const clock = useRef<{ startedAt: number; offset: number; loop: Span | null }>({ startedAt: 0, offset: 0, loop: null });
  const raf = useRef(0);
  const drag = useRef<Drag | null>(null);
  const live = useRef<Span | null>(null); // region while dragging

  const [peaks, setPeaks] = useState<Peaks | null>(null);
  const [track, setTrack] = useState<TrackKey>("sib");
  const [lastProcessed, setLastProcessed] = useState<TrackKey>("sib");
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState(0);
  // cycle region (drawn on the ruler or set by a moment), whether it is on, and the visible window
  const [region, setRegion] = useState<Span | null>(null);
  const [cycle, setCycle] = useState(false);
  const [zoom, setZoom] = useState<Span | null>(null);
  // DELTA monitor and the band it is heard through (one band per path, like the plugin)
  const [delta, setDelta] = useState(false);
  const [bands, setBands] = useState<Record<DeltaKey, Band>>(BAND_DEFAULT);
  const bandDrag = useRef<"lo" | "hi" | null>(null);

  const loop = cycle && region ? region : null; // what the audio actually loops
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const trackRef = useRef(track);
  trackRef.current = track;
  const deltaRef = useRef(delta);
  deltaRef.current = delta;
  const bandRef = useRef(bands);
  bandRef.current = bands;
  const dKey: DeltaKey | null = track === "original" ? null : track;

  const duration = peaks?.duration ?? 45.7;
  const v0 = zoom?.start ?? 0;
  const v1 = zoom?.end ?? duration;

  useEffect(() => {
    fetch("/assets/audio/compare-peaks.json").then((r) => r.json()).then(setPeaks).catch(() => {});
  }, []);

  const ensureEngine = useCallback(async () => {
    if (engine.current) return engine.current;
    loading.current ??= (async () => {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const decode = async (url: string) => {
        const data = await (await fetch(url)).arrayBuffer();
        return new Promise<AudioBuffer>((res, rej) => ctx.decodeAudioData(data, res, rej));
      };
      const [decoded, dDecoded] = await Promise.all([Promise.all(TRACKS.map((k) => decode(SRC(k)))), Promise.all(DELTAS.map((k) => decode(DSRC(k))))]);
      const buffers = Object.fromEntries(TRACKS.map((k, i) => [k, decoded[i]])) as Engine["buffers"];
      const dBuffers = Object.fromEntries(DELTAS.map((k, i) => [k, dDecoded[i]])) as Engine["dBuffers"];
      const level = (on: boolean) => { const g = ctx.createGain(); g.gain.value = on ? 1 : 0; return g; };
      const tk = trackRef.current, dOn = deltaRef.current && tk !== "original";
      const gains = Object.fromEntries(
        TRACKS.map((k) => { const g = level(k === tk && !dOn); g.connect(ctx.destination); return [k, g]; }),
      ) as Engine["gains"];
      // delta sources -> their gains -> HP x2 -> LP x2 -> out
      const hp = BW_Q.map(() => ctx.createBiquadFilter());
      const lp = BW_Q.map(() => ctx.createBiquadFilter());
      hp.forEach((f, i) => { f.type = "highpass"; f.Q.value = BW_Q[i]; });
      lp.forEach((f, i) => { f.type = "lowpass"; f.Q.value = BW_Q[i]; });
      hp[0].connect(hp[1]); hp[1].connect(lp[0]); lp[0].connect(lp[1]); lp[1].connect(ctx.destination);
      const b = tk === "original" ? BAND_DEFAULT.all : bandRef.current[tk];
      hp.forEach((f) => (f.frequency.value = b.lo));
      lp.forEach((f) => (f.frequency.value = b.hi));
      const dGains = Object.fromEntries(
        DELTAS.map((k) => { const g = level(dOn && k === tk); g.connect(hp[0]); return [k, g]; }),
      ) as Engine["dGains"];
      engine.current = { ctx, buffers, gains, dBuffers, dGains, hp, lp, sources: [] };
      return engine.current;
    })();
    return loading.current;
  }, []);

  const position = useCallback(() => {
    const e = engine.current;
    if (!e || !playing) return clock.current.offset;
    let p = clock.current.offset + (e.ctx.currentTime - clock.current.startedAt);
    const l = clock.current.loop;
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

  /** Start all five sources together. With a loop, a start past its end jumps to its start (like a DAW cycle). */
  const startAt = useCallback((e: Engine, from: number, l: Span | null) => {
    stopSources();
    const at = l && from > l.end ? l.start : from;
    const when = e.ctx.currentTime + 0.03;
    const src = (buf: AudioBuffer, out: AudioNode) => {
      const s = e.ctx.createBufferSource();
      s.buffer = buf;
      if (l) { s.loop = true; s.loopStart = l.start; s.loopEnd = l.end; }
      s.connect(out);
      s.start(when, at);
      return s;
    };
    e.sources = [...TRACKS.map((k) => src(e.buffers[k], e.gains[k])), ...DELTAS.map((k) => src(e.dBuffers[k], e.dGains[k]))];
    e.sources[0].onended = () => { setPlaying(false); clock.current.offset = 0; setPos(0); };
    clock.current = { startedAt: when, offset: at, loop: l };
    return at;
  }, []);

  const play = useCallback(async (from?: number, l = loopRef.current) => {
    setBusy(true);
    try {
      const e = await ensureEngine();
      if (e.ctx.state === "suspended") await e.ctx.resume();
      // with a loop on, Play always starts from the loop start (like a DAW cycle); otherwise resume
      let at = from ?? (l ? l.start : clock.current.offset);
      if (at >= duration - 0.05) at = 0;
      setPos(startAt(e, at, l));
      setPlaying(true);
    } finally {
      setBusy(false);
    }
  }, [ensureEngine, startAt, duration]);

  const pause = useCallback(() => {
    clock.current.offset = position();
    setPos(clock.current.offset);
    stopSources();
    setPlaying(false);
  }, [position]);

  /** Re-cue playback (if running) after the position or the loop changed. */
  const cue = useCallback((to: number, l: Span | null) => {
    let at = Math.max(0, Math.min(duration - 0.05, to));
    if (playing && engine.current) at = startAt(engine.current, at, l);
    else if (l && at > l.end) at = l.start;
    clock.current.offset = at;
    clock.current.loop = l;
    setPos(at);
  }, [duration, playing, startAt]);

  /** Point the band-pass at this path's band (smoothly while dragging). */
  const tuneBand = useCallback((b: Band, glide = 0.015) => {
    const e = engine.current;
    if (!e) return;
    const now = e.ctx.currentTime;
    e.hp.forEach((f) => f.frequency.setTargetAtTime(b.lo, now, glide));
    e.lp.forEach((f) => f.frequency.setTargetAtTime(b.hi, now, glide));
  }, []);

  /** 20 ms crossfade to the chosen track, or to its DELTA when the monitor is on. */
  const route = useCallback((k: TrackKey, dOn: boolean) => {
    const e = engine.current;
    if (!e) return;
    const now = e.ctx.currentTime;
    const ramp = (g: AudioParam, v: number) => { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(v, now + 0.02); };
    const d = dOn && k !== "original";
    for (const key of TRACKS) ramp(e.gains[key].gain, key === k && !d ? 1 : 0);
    for (const key of DELTAS) ramp(e.dGains[key].gain, d && key === k ? 1 : 0);
    if (k !== "original") tuneBand(bandRef.current[k], 0.005);
  }, [tuneBand]);

  const choose = useCallback((k: TrackKey) => {
    setTrack(k);
    if (k !== "original") setLastProcessed(k);
    route(k, deltaRef.current);
  }, [route]);

  const toggleDelta = () => {
    const on = !(delta && dKey); // on Original the button shows off, so a click always turns it on
    setDelta(on);
    let k = track;
    if (on && k === "original") { k = lastProcessed; setTrack(k); }
    route(k, on);
  };

  /* ---------- band bar: log-frequency axis, two handles ---------- */
  const range = dKey ? BAND_RANGE[dKey] : BAND_RANGE.all;
  const band = dKey ? bands[dKey] : BAND_DEFAULT.all;
  const fx = (f: number) => Math.log(f / range.lo) / Math.log(range.hi / range.lo); // 0..1
  const xf = (x: number) => range.lo * Math.pow(range.hi / range.lo, Math.max(0, Math.min(1, x)));

  const setBand = (side: "lo" | "hi", f: number) => {
    if (!dKey) return;
    const cur = bandRef.current[dKey];
    const next = side === "lo"
      ? { lo: Math.max(range.lo, Math.min(f, cur.hi / MIN_RATIO)), hi: cur.hi }
      : { lo: cur.lo, hi: Math.min(range.hi, Math.max(f, cur.lo * MIN_RATIO)) };
    bandRef.current = { ...bandRef.current, [dKey]: next };
    setBands(bandRef.current);
    tuneBand(next);
  };

  const onBandDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !dKey) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const side = Math.abs(x - fx(band.lo)) <= Math.abs(x - fx(band.hi)) ? "lo" : "hi";
    bandDrag.current = side;
    e.currentTarget.setPointerCapture(e.pointerId);
    setBand(side, xf(x));
  };
  const onBandMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!bandDrag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setBand(bandDrag.current, xf((e.clientX - r.left) / r.width));
  };
  const onBandKey = (side: "lo" | "hi") => (e: KeyboardEvent<HTMLSpanElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    setBand(side, xf(fx(band[side]) + step / 40));
  };
  const resetBand = () => {
    if (!dKey) return;
    bandRef.current = { ...bandRef.current, [dKey]: BAND_DEFAULT[dKey] };
    setBands(bandRef.current);
    tuneBand(BAND_DEFAULT[dKey]);
  };
  const isDefaultBand = !dKey || (band.lo === BAND_DEFAULT[dKey].lo && band.hi === BAND_DEFAULT[dKey].hi);
  // decade grid for the bar
  const grid = [50, 100, 200, 500, 1000, 2000, 5000, 10000].filter((f) => f > range.lo && f < range.hi);

  const playMoment = (m: (typeof MOMENTS)[number]) => {
    const l = { start: m.start, end: m.end };
    setRegion(l);
    setCycle(true);
    setZoom({ start: Math.max(0, m.start - 0.4), end: Math.min(duration, m.end + 0.4) });
    choose(m.path);
    if (playing && engine.current) { startAt(engine.current, m.start, l); setPos(m.start); }
    else { clock.current.offset = m.start; setPos(m.start); void play(m.start, l); }
  };

  const toggleCycle = () => {
    if (!region) return;
    const on = !cycle;
    setCycle(on);
    cue(position(), on ? region : null);
  };

  const clearRegion = () => {
    setRegion(null);
    setCycle(false);
    cue(position(), null);
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
    const X = (s: number) => ((s - v0) / (v1 - v0)) * w;
    const lane = 34, mid = lane + (h - lane) / 2, half = (h - lane) / 2 - 8;

    // listening moments for the selected path (all of them on Original / All three)
    if (!zoom) {
      for (const m of MOMENTS) {
        if (!(track === m.path || track === "original" || track === "all")) continue;
        ctx.fillStyle = COLORS[m.path];
        ctx.globalAlpha = 0.09;
        ctx.fillRect(X(m.start), 0, X(m.end) - X(m.start), h);
        ctx.globalAlpha = 1;
      }
    }
    // cycle region
    if (region) {
      ctx.fillStyle = cycle ? "rgba(255,194,26,0.10)" : "rgba(255,255,255,0.05)";
      ctx.fillRect(X(region.start), 0, X(region.end) - X(region.start), h);
      ctx.fillStyle = cycle ? "rgba(255,194,26,0.55)" : "rgba(255,255,255,0.2)";
      ctx.fillRect(Math.round(X(region.start)), 0, 1, h);
      ctx.fillRect(Math.round(X(region.end)) - 1, 0, 1, h);
    }

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (const y of [lane, mid]) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); ctx.stroke(); }

    if (peaks) {
      const orig = peaks.peaks.original, proc = peaks.peaks[track], hop = peaks.hop;
      const step = v1 - v0 < 8 ? 3 : 2; // px per bar
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
  }, [peaks, track, pos, v0, v1, zoom, region, cycle]);

  useEffect(() => {
    draw();
    const cv = canvas.current;
    if (!cv || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(cv);
    return () => ro.disconnect();
  }, [draw]);

  const timeAt = (clientX: number, el: Element) => {
    const r = el.getBoundingClientRect();
    return Math.max(0, Math.min(duration, v0 + ((clientX - r.left) / r.width) * (v1 - v0)));
  };

  const onCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => cue(timeAt(e.clientX, e.currentTarget), loop);

  const onKey = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); cue(position() + 2, loop); }
    if (e.key === "ArrowLeft") { e.preventDefault(); cue(position() - 2, loop); }
  };

  /* ---------- cycle ruler: drag to draw a loop, drag its body to move it, its edges to resize; click toggles ---------- */
  const onRulerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const tt = timeAt(e.clientX, el);
    const px = (s: number) => r.left + ((s - v0) / (v1 - v0)) * r.width;
    let mode: Drag["mode"] = "new";
    if (region) {
      if (Math.abs(e.clientX - px(region.start)) <= EDGE_PX) mode = "start";
      else if (Math.abs(e.clientX - px(region.end)) <= EDGE_PX) mode = "end";
      else if (tt > region.start && tt < region.end) mode = "move";
    }
    el.setPointerCapture(e.pointerId);
    drag.current = { mode, x0: e.clientX, t0: tt, orig: region, moved: false };
  };

  const onRulerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = e.currentTarget;
    if (!d) {
      // cursor hint
      const r = el.getBoundingClientRect(), px = (s: number) => r.left + ((s - v0) / (v1 - v0)) * r.width;
      el.style.cursor = region && (Math.abs(e.clientX - px(region.start)) <= EDGE_PX || Math.abs(e.clientX - px(region.end)) <= EDGE_PX)
        ? "ew-resize" : region && timeAt(e.clientX, el) > region.start && timeAt(e.clientX, el) < region.end ? "grab" : "crosshair";
      return;
    }
    if (!d.moved && Math.abs(e.clientX - d.x0) < 4) return;
    d.moved = true;
    const tt = timeAt(e.clientX, el);
    let next: Span;
    if (d.mode === "new") next = { start: Math.min(d.t0, tt), end: Math.max(d.t0, tt) };
    else if (d.mode === "move" && d.orig) {
      const len = d.orig.end - d.orig.start;
      const s = Math.max(0, Math.min(duration - len, d.orig.start + (tt - d.t0)));
      next = { start: s, end: s + len };
    } else if (d.mode === "start" && d.orig) next = { start: Math.min(tt, d.orig.end - MIN_LOOP), end: d.orig.end };
    else if (d.mode === "end" && d.orig) next = { start: d.orig.start, end: Math.max(tt, d.orig.start + MIN_LOOP) };
    else return;
    live.current = next;
    setRegion(next);
    if (d.mode === "new") setCycle(true);
  };

  const onRulerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    if (!d.moved) {
      // a plain click on the region toggles the cycle; on empty ruler it just moves the playhead
      if (d.mode === "move" || d.mode === "start" || d.mode === "end") toggleCycle();
      else cue(d.t0, loop);
      return;
    }
    // commit the drawn/moved region to playback
    const r = live.current;
    live.current = null;
    if (!r || r.end - r.start < MIN_LOOP) { setRegion(d.orig); return; }
    const on = d.mode === "new" ? true : cycle;
    cue(d.mode === "new" || d.mode === "move" ? r.start : position(), on ? r : null);
  };

  const flip = () => choose(track === "original" ? lastProcessed : "original");

  // ruler ticks
  const viewLen = v1 - v0;
  const tickStep = viewLen > 30 ? 5 : viewLen > 12 ? 2 : viewLen > 5 ? 1 : 0.5;
  const ticks: number[] = [];
  for (let s = Math.ceil(v0 / tickStep) * tickStep; s <= v1 + 1e-6; s += tickStep) ticks.push(+s.toFixed(2));
  const pct = (s: number) => `${((s - v0) / viewLen) * 100}%`;

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

      <div className="listen-stage well">
        <div
          className="listen-ruler"
          aria-label={t.rulerAria}
          onPointerDown={onRulerDown}
          onPointerMove={onRulerMove}
          onPointerUp={onRulerUp}
          onPointerCancel={() => (drag.current = null)}
          onDoubleClick={() => region && clearRegion()}
        >
          {ticks.map((s) => (
            <span key={s} className="tick" style={{ left: pct(s) }}>
              {(s - v0) / viewLen < 0.93 && <span className="tick-label">{tickStep < 1 ? s.toFixed(1) : fmt(s)}</span>}
            </span>
          ))}
          {region && (
            <span className="cycle" data-on={cycle} style={{ left: pct(region.start), width: `${((region.end - region.start) / viewLen) * 100}%` }}>
              <span className="cycle-handle" data-side="start" />
              <span className="cycle-handle" data-side="end" />
            </span>
          )}
          {!region && <span className="ruler-hint">{t.rulerHint}</span>}
        </div>
        <div className="listen-canvas-wrap">
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
        <button
          type="button"
          className="listen-cycle"
          onClick={toggleCycle}
          disabled={!region}
          aria-pressed={!!loop}
          title={region ? `${fmtFine(region.start)} ~ ${fmtFine(region.end)}` : t.rulerHint}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 3l3 3-3 3M20 6H8a4 4 0 0 0-4 4v1M7 21l-3-3 3-3M4 18h12a4 4 0 0 0 4-4v-1" />
          </svg>
          <span>{t.cycle}</span>
          {region && <span className="cycle-range">{fmtFine(region.start)} ~ {fmtFine(region.end)}</span>}
        </button>
        <button type="button" className="listen-ab" onClick={flip} aria-label={t.abAria} aria-pressed={track === "original"}>
          <span className="ab-a" data-on={track === "original"}>A</span>
          <span className="ab-b" data-on={track !== "original"}>B</span>
          <span className="ab-label">{t.ab}</span>
        </button>
        <span className="listen-links">
          {region && <button type="button" className="listen-link" onClick={clearRegion}>{t.cycleClear}</button>}
          {zoom && <button type="button" className="listen-link" onClick={() => setZoom(null)}>{t.zoomOut}</button>}
        </span>
      </div>

      <div className="listen-delta" data-path={dKey ?? "none"} data-on={delta && !!dKey}>
        <div className="listen-delta-head">
          <button type="button" className="listen-delta-btn" onClick={toggleDelta} aria-pressed={delta && !!dKey} aria-label={t.deltaAria}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="5" height="7" rx="1.5" /><rect x="16" y="14" width="5" height="7" rx="1.5" /></svg>
            <span>DELTA</span>
          </button>
          <span className="listen-delta-label">{dKey ? t.bandLabel[dKey] : t.bandLabel.all}</span>
          <span className="listen-delta-hz">{fmtHz(band.lo)} - {fmtHz(band.hi)} Hz</span>
        </div>
        <div
          className="band-bar"
          aria-label={t.bandAria}
          data-disabled={!dKey}
          onPointerDown={onBandDown}
          onPointerMove={onBandMove}
          onPointerUp={() => (bandDrag.current = null)}
          onPointerCancel={() => (bandDrag.current = null)}
          onDoubleClick={resetBand}
        >
          {grid.map((f) => <span key={f} className="band-grid" style={{ left: `${fx(f) * 100}%` }} />)}
          <span className="band-fill" style={{ left: `${fx(band.lo) * 100}%`, width: `${(fx(band.hi) - fx(band.lo)) * 100}%` }} />
          {(["lo", "hi"] as const).map((side) => (
            <span
              key={side}
              className="band-handle"
              data-side={side}
              role="slider"
              tabIndex={dKey ? 0 : -1}
              aria-label={side === "lo" ? t.bandLow : t.bandHigh}
              aria-valuemin={Math.round(range.lo)}
              aria-valuemax={Math.round(range.hi)}
              aria-valuenow={Math.round(band[side])}
              aria-valuetext={`${fmtHz(band[side])} Hz`}
              style={{ left: `${fx(band[side]) * 100}%` }}
              onKeyDown={onBandKey(side)}
            />
          ))}
        </div>
        <p className="listen-delta-note">
          {dKey ? t.deltaHint : t.deltaPick}
          {dKey && !isDefaultBand && <> <button type="button" className="listen-link" onClick={resetBand}>{t.bandReset}</button></>}
        </p>
      </div>

      <div className="listen-moments">
        <span className="listen-moments-title">{t.momentsTitle}</span>
        <ul>
          {MOMENTS.map((m) => {
            num = { ...num, [m.path]: num[m.path] + 1 };
            const active = !!loop && loop.start === m.start && loop.end === m.end;
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
