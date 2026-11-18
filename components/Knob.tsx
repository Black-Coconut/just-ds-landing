/* The tongue knob, drawn once as SVG symbols and reused everywhere with <use>.
   The art has its tongue pointing straight down (180° from 12 o'clock). */

const RIM =
  "M100.0 18.0 105.1 19.3 109.8 22.8 113.9 27.2 117.7 31.1 121.6 33.4 126.2 33.9 131.6 32.9 137.5 31.8 143.3 31.7 148.2 33.7 151.5 37.7 153.3 43.2 154.1 49.2 154.8 54.6 156.6 58.9 160.1 61.9 165.0 64.3 170.4 66.9 175.2 70.2 178.0 74.7 178.3 79.9 176.5 85.4 173.6 90.7 171.0 95.5 170.0 100.0 171.0 104.5 173.6 109.3 176.5 114.6 178.3 120.1 178.0 125.3 175.2 129.8 170.4 133.1 165.0 135.7 160.1 138.1 156.6 141.1 154.8 145.4 154.1 150.8 153.3 156.8 151.5 162.3 148.2 166.3 143.3 168.3 137.5 168.2 131.6 167.1 126.2 166.1 121.6 166.6 117.7 168.9 113.9 172.8 109.8 177.2 105.1 180.7 100.0 182.0 94.9 180.7 90.2 177.2 86.1 172.8 82.3 168.9 78.4 166.6 73.8 166.1 68.4 167.1 62.5 168.2 56.7 168.3 51.8 166.3 48.5 162.3 46.7 156.8 45.9 150.8 45.2 145.4 43.4 141.1 39.9 138.1 35.0 135.7 29.6 133.1 24.8 129.8 22.0 125.3 21.7 120.1 23.5 114.6 26.4 109.3 29.0 104.5 30.0 100.0 29.0 95.5 26.4 90.7 23.5 85.4 21.7 79.9 22.0 74.7 24.8 70.2 29.6 66.9 35.0 64.3 39.9 61.9 43.4 58.9 45.2 54.6 45.9 49.2 46.7 43.2 48.5 37.7 51.8 33.7 56.7 31.7 62.5 31.8 68.4 32.9 73.8 33.9 78.4 33.4 82.3 31.1 86.1 27.2 90.2 22.8 94.9 19.3Z";

/** Render once per page (inside <body>). Not display:none — gradients inside hidden SVGs don't paint. */
export function KnobSprite() {
  return (
    <svg className="svg-sprite" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe680" />
          <stop offset=".55" stopColor="#ffc21a" />
          <stop offset="1" stopColor="#d48a00" />
        </linearGradient>
        <radialGradient id="g-face" cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset=".45" stopColor="#ffd23a" />
          <stop offset="1" stopColor="#e9a000" />
        </radialGradient>
        <linearGradient id="g-tongue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8aa6" />
          <stop offset="1" stopColor="#d62c5c" />
        </linearGradient>
        <symbol id="knob-body" viewBox="0 0 200 200">
          <path fill="url(#g-rim)" stroke="#8f5c00" strokeWidth="2" d={RIM} />
          <circle cx="100" cy="100" r="58" fill="url(#g-face)" stroke="#c78500" strokeWidth="1.5" />
          <ellipse cx="86" cy="76" rx="30" ry="17" fill="#fff" opacity=".22" />
          <ellipse cx="100" cy="133" rx="18" ry="7.5" fill="#2b0a10" />
          <path d="M82 131 Q100 124 118 131" fill="none" stroke="#a86b00" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="knob-tongue" viewBox="0 0 200 200">
          <path fill="url(#g-tongue)" stroke="#8f1736" strokeWidth="1.6" d="M86 133 C84 156 85 184 100 186 C115 184 116 156 114 133 Z" />
          <path d="M100 141 V170" stroke="#a3214a" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="107.5" cy="165" rx="2.6" ry="8" fill="#fff" opacity=".38" />
        </symbol>
      </defs>
    </svg>
  );
}

/** A static knob, tongue rotated `rotate` degrees from straight down. */
export function KnobArt({ rotate = 0, wag = false, className }: { rotate?: number; wag?: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g transform={rotate ? `rotate(${rotate} 100 100)` : undefined}>
        <use href="#knob-body" />
        {wag ? (
          <g className="wag">
            <use href="#knob-tongue" />
          </g>
        ) : (
          <use href="#knob-tongue" />
        )}
      </g>
    </svg>
  );
}

/** Value 0..100 → rotation of the art so the tongue points -135°..+135° like the plugin. */
export const valueToRotation = (v: number) => -135 + 2.7 * v - 180;
