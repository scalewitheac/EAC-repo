// Tiny synth-tone SFX layer using the Web Audio API. No audio files.
// Browsers block audio until a user gesture — we resume the context on the
// first interaction. Calls before that will fail silently.

let ctx = null;
let muted = false;

const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    } catch {
      return null;
    }
  }
  return ctx;
};

export const unlockAudio = () => {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume().catch(() => {});
};

export const setMuted = (m) => { muted = !!m; };
export const isMuted = () => muted;

const tone = (freq, duration = 0.08, type = "square", gainPeak = 0.06) => {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  try {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(gainPeak, c.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration + 0.02);
  } catch (e) {
    // Audio nodes can fail when the page is hidden or context is suspended.
    // Logged at warn level so the page does not crash but the failure is visible.
    if (typeof console !== "undefined") console.warn("sfx tone failed:", e);
  }
};

export const blip = () => tone(880, 0.05, "square", 0.05);
export const click = () => tone(440, 0.07, "square", 0.06);
export const select = () => {
  tone(660, 0.06, "square", 0.06);
  setTimeout(() => tone(990, 0.08, "square", 0.05), 60);
};
export const boot = () => {
  // Arpeggio: C5, E5, G5, C6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => setTimeout(() => tone(f, 0.16, "triangle", 0.06), i * 110));
};
