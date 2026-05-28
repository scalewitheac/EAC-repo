import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LightSwitch from "../components/LightSwitch";
import * as sfx from "../lib/sfx";

const BOOT_LINES = [
  "delined os v1.0  ..............  ok",
  "© memory check  ................  ok",
  "© rom integrity  ...............  ok",
  "© palette load  ................  ok",
  "© cartridge: notebook//draft.7  .  found",
  "© night shaders  ...............  ok",
  "© initializing interface  ......  ready",
];

const PasswordGate = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bootIndex, setBootIndex] = useState(0); // how many boot lines have appeared
  const { verifySitePassword } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    sfx.unlockAudio();
    sfx.boot();
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setBootIndex(i);
      if (i < BOOT_LINES.length) sfx.blip();
      if (i >= BOOT_LINES.length) {
        clearInterval(id);
        setTimeout(() => inputRef.current?.focus(), 200);
      }
    }, 240);
    return () => clearInterval(id);
  }, []);

  const bootDone = bootIndex >= BOOT_LINES.length;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifySitePassword(password);
      sfx.select();
      setSuccess(true);
      setTimeout(() => navigate("/disclaimer"), 700);
    } catch {
      setError("access denied — key invalid");
      sfx.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`password-gate ${theme} min-h-screen w-full relative overflow-hidden`}
      style={{ background: "#04030a" }}
    >
      {/* CRT scanlines + vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      {/* Subtle static noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-6">
        <div
          className="w-full max-w-2xl rounded-md p-6 md:p-10"
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            border: "1px solid var(--line-color)",
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.6), 0 0 22px var(--shadow), 0 0 60px var(--shadow)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between font-pixel uppercase tracking-widest mb-6"
            style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}
          >
            <span style={{ color: "var(--line-color)" }}>
              ▣ delined os
            </span>
            <span>boot sequence</span>
          </div>

          {/* Boot log */}
          <div
            className="font-pixel text-sm md:text-base leading-relaxed"
            style={{
              color: "var(--ink-color)",
              minHeight: 200,
              textShadow: "var(--neon-text)",
            }}
          >
            {BOOT_LINES.slice(0, bootIndex).map((line, idx) => (
              <div key={idx} style={{ opacity: 0.9 }}>
                <span style={{ color: "var(--line-color)" }}>›</span> {line}
              </div>
            ))}
            {!bootDone && (
              <div style={{ color: "var(--line-color)" }}>
                <span style={{ color: "var(--line-color)" }}>›</span> ...
                <span className="crt-blink">▮</span>
              </div>
            )}
            {bootDone && !success && (
              <>
                <div style={{ marginTop: 14, color: "var(--line-color)" }}>
                  ────────────────────────────────────────
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={{ color: "var(--line-color)" }}>››</span>{" "}
                  insert key to continue<span className="crt-blink">_</span>
                </div>
              </>
            )}
            {success && (
              <div style={{ marginTop: 18, color: "#9aff9a", textShadow: "0 0 6px #9aff9a" }}>
                ›› access granted — loading…
              </div>
            )}
          </div>

          {/* Password input */}
          {bootDone && !success && (
            <form onSubmit={submit} className="mt-6 space-y-4" data-testid="boot-form">
              <input
                ref={inputRef}
                type="password"
                className="pico-input font-pixel text-lg"
                placeholder="● ● ● ●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="site-password-input"
                style={{ letterSpacing: "0.3em" }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="pico-btn"
                  data-testid="site-password-submit-btn"
                >
                  {loading ? "▮▮▮" : "press start ▸"}
                </button>
                <span
                  className="font-pixel uppercase tracking-widest text-xs"
                  style={{ color: "var(--ink-soft)" }}
                >
                  enter as drifter
                </span>
                {error && (
                  <span
                    className="font-pixel uppercase tracking-widest text-xs"
                    style={{ color: "#ff7a7a", textShadow: "0 0 6px #ff7a7a" }}
                    data-testid="site-password-error"
                  >
                    ✕ {error}
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Footer hint */}
          <div
            className="mt-8 flex items-center justify-between font-pixel uppercase tracking-widest"
            style={{ color: "var(--ink-soft)", fontSize: "0.75rem" }}
          >
            <span>hold ◐ to recolor the boot</span>
            <span>v1.0 ░░ © delined</span>
          </div>
        </div>
      </div>

      <LightSwitch />
    </div>
  );
};

export default PasswordGate;
