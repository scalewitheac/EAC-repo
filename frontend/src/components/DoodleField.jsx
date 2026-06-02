import React from "react";

/* ------------------------------------------------------------------
   Hand-drawn SVG doodles. All use currentColor + stroke so a single
   color tint controls the look. Kept lightweight (no fills mostly).
------------------------------------------------------------------ */
const D = {
  star: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L24 16 L36 17 L27 25 L30 36 L20 30 L10 36 L13 25 L4 17 L16 16 Z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 34 C 6 22, 4 12, 12 8 C 17 5, 20 10, 20 12 C 20 10, 23 5, 28 8 C 36 12, 34 22, 20 34 Z" />
    </svg>
  ),
  spiral: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M20 20 m -2 0 a 2 2 0 1 0 4 0 a 4 4 0 1 0 -8 0 a 6 6 0 1 0 12 0 a 8 8 0 1 0 -16 0 a 10 10 0 1 0 20 0" />
    </svg>
  ),
  smiley: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="14" />
      <circle cx="15" cy="17" r="0.8" fill="currentColor" />
      <circle cx="25" cy="17" r="0.8" fill="currentColor" />
      <path d="M13 24 q 7 6, 14 0" />
    </svg>
  ),
  musicNote: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28 V8 L30 6 V22" />
      <ellipse cx="13" cy="29" rx="4" ry="3" />
      <ellipse cx="27" cy="23" rx="4" ry="3" />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="3" />
      <ellipse cx="20" cy="10" rx="4" ry="6" />
      <ellipse cx="20" cy="30" rx="4" ry="6" />
      <ellipse cx="10" cy="20" rx="6" ry="4" />
      <ellipse cx="30" cy="20" rx="6" ry="4" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4 L10 22 L20 22 L16 36 L30 16 L20 16 Z" />
    </svg>
  ),
  cat: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22 L8 12 L14 18" />
      <path d="M32 22 L32 12 L26 18" />
      <circle cx="20" cy="24" r="10" />
      <path d="M16 23 q 1 -1 2 0" />
      <path d="M22 23 q 1 -1 2 0" />
      <path d="M19 27 q 1 1.5 2 0" />
      <path d="M10 26 l-5 1 M10 28 l-5 2 M30 26 l5 1 M30 28 l5 2" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 50 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 24 q -6 0 -6 -6 q 0 -6 7 -6 q 1 -8 9 -8 q 7 0 9 7 q 8 -1 9 7 q 6 0 6 6 q 0 6 -6 6 Z" />
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14 H30 V28 q 0 6 -8 6 H16 q -8 0 -8 -6 Z" />
      <path d="M30 18 q 6 0 6 5 q 0 5 -6 5" />
      <path d="M14 8 q 1 -3 0 -5 M20 8 q 1 -3 0 -5 M26 8 q 1 -3 0 -5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 q 12 -16 28 -8 q 6 3 12 -2" />
      <path d="M40 12 L46 8 L46 14" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 q 18 -16 36 0 q -18 16 -36 0 Z" />
      <circle cx="20" cy="12" r="4" />
      <circle cx="20" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2 L17 13 L28 15 L17 17 L15 28 L13 17 L2 15 L13 13 Z" />
    </svg>
  ),
  squiggle: (
    <svg viewBox="0 0 60 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 7 q 5 -8 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="6" />
      <path d="M20 4 V10 M20 30 V36 M4 20 H10 M30 20 H36 M8 8 L12 12 M28 28 L32 32 M32 8 L28 12 M12 28 L8 32" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 50 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 11 L8 5 L42 5 L48 11 L42 17 L8 17 Z" />
      <path d="M38 5 V17 M2 11 L8 8 M2 11 L8 14" />
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 30 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3 L28 25 L2 25 Z" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4 a 12 12 0 1 0 4 22 a 9 9 0 0 1 -4 -22 Z" />
    </svg>
  ),
};

/* Each entry: kind, top%, left%, size px, rotation deg, tint, bobDelay s */
const DOODLES = [
  { k: "star",      top: "6%",  left: "8%",  size: 34, rot: -14, tint: "amber", delay: 0 },
  { k: "squiggle",  top: "10%", left: "44%", size: 90, rot: -6,  tint: "ink",   delay: 1.4 },
  { k: "heart",     top: "14%", left: "82%", size: 28, rot: 18,  tint: "rose",  delay: 0.6 },
  { k: "musicNote", top: "20%", left: "20%", size: 40, rot: 12,  tint: "blue",  delay: 2.1 },
  { k: "sparkle",   top: "22%", left: "70%", size: 24, rot: -22, tint: "rose",  delay: 0.9 },
  { k: "cloud",     top: "30%", left: "5%",  size: 64, rot: -4,  tint: "blue",  delay: 1.2 },
  { k: "arrow",     top: "38%", left: "84%", size: 70, rot: -14, tint: "ink",   delay: 2.4 },
  { k: "flower",    top: "48%", left: "9%",  size: 40, rot: 8,   tint: "rose",  delay: 0.3 },
  { k: "eye",       top: "52%", left: "90%", size: 44, rot: -8,  tint: "ink",   delay: 1.9 },
  { k: "bolt",      top: "62%", left: "16%", size: 36, rot: 24,  tint: "amber", delay: 1.0 },
  { k: "cat",       top: "70%", left: "85%", size: 46, rot: 4,   tint: "ink",   delay: 0.7 },
  { k: "spiral",    top: "74%", left: "44%", size: 40, rot: -10, tint: "blue",  delay: 2.6 },
  { k: "coffee",    top: "78%", left: "5%",  size: 38, rot: -16, tint: "amber", delay: 1.6 },
  { k: "smiley",    top: "82%", left: "70%", size: 36, rot: -6,  tint: "amber", delay: 0.2 },
  { k: "moon",      top: "84%", left: "30%", size: 28, rot: 12,  tint: "blue",  delay: 2.0 },
  { k: "pencil",    top: "88%", left: "55%", size: 56, rot: 6,   tint: "ink",   delay: 1.3 },
  { k: "triangle",  top: "44%", left: "2%",  size: 24, rot: 18,  tint: "ink",   delay: 0.5 },
  { k: "sun",       top: "4%",  left: "70%", size: 36, rot: 0,   tint: "amber", delay: 2.2 },
  { k: "star",      top: "60%", left: "5%",  size: 22, rot: 18,  tint: "rose",  delay: 1.8 },
  { k: "sparkle",   top: "72%", left: "30%", size: 18, rot: 30,  tint: "amber", delay: 0.4 },
];

/* Floating handwritten words sprinkled around */
const WORDS = [
  { text: "draft",     top: "8%",  left: "30%", rot: -8,  size: 22, tint: "rose" },
  { text: "remember…", top: "16%", left: "60%", rot: 5,   size: 24, tint: "ink"  },
  { text: "doodle",    top: "32%", left: "70%", rot: -10, size: 26, tint: "blue" },
  { text: "play ▸",    top: "50%", left: "3%",  rot: -4,  size: 22, tint: "ink"  },
  { text: "ideas?",    top: "58%", left: "80%", rot: 8,   size: 26, tint: "rose" },
  { text: "hello",     top: "76%", left: "62%", rot: -6,  size: 24, tint: "blue" },
  { text: "scribble",  top: "90%", left: "12%", rot: 4,   size: 22, tint: "ink"  },
];

const DoodleField = () => (
  <div className="doodle-field" aria-hidden="true" data-testid="doodle-field">
    {DOODLES.map((d, i) => (
      <div
        key={`d-${i}`}
        className={`doodle tint-${d.tint}`}
        style={{
          top: d.top,
          left: d.left,
          width: d.size,
          height: d.size,
          "--r": `${d.rot}deg`,
          transform: `rotate(${d.rot}deg)`,
          animationDelay: `${d.delay}s`,
        }}
      >
        {D[d.k]}
      </div>
    ))}
    {WORDS.map((w, i) => (
      <span
        key={`w-${i}`}
        className={`doodle-word tint-${w.tint}`}
        style={{
          top: w.top,
          left: w.left,
          fontSize: w.size,
          transform: `rotate(${w.rot}deg)`,
        }}
      >
        {w.text}
      </span>
    ))}
  </div>
);

export default DoodleField;
