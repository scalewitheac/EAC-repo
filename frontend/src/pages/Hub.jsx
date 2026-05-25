import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as sfx from "../lib/sfx";

const MENU = [
  { to: "/drawings", label: "Drawings", sub: "doodles & multimedia" },
  { to: "/writings", label: "Writings", sub: "musings & notices" },
  { to: "/videos",   label: "Videos",   sub: "shorts & timelapses" },
  { to: "/contact",  label: "Contact",  sub: "leave a message" },
];

const SHELL_COLORS = [
  { id: "mauve",     name: "mauve" },
  { id: "magenta",   name: "magenta" },
  { id: "cyan",      name: "cyan" },
  { id: "turquoise", name: "turquoise" },
  { id: "navy",      name: "navy" },
  { id: "olive",     name: "olive" },
];

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

const Hub = () => {
  const navigate = useNavigate();
  const clock = useClock();
  const [cursor, setCursor] = useState(0);
  const [booting, setBooting] = useState(true);
  const [shell, setShell] = useState(() => localStorage.getItem("device-shell") || "mauve");
  const [muted, setMutedState] = useState(() => localStorage.getItem("device-muted") === "1");

  // Persist & apply
  useEffect(() => { localStorage.setItem("device-shell", shell); }, [shell]);
  useEffect(() => {
    sfx.setMuted(muted);
    localStorage.setItem("device-muted", muted ? "1" : "0");
  }, [muted]);

  // Boot sequence — power-on tone fires after the screen-on animation completes
  useEffect(() => {
    const t1 = setTimeout(() => {
      sfx.unlockAudio();
      sfx.boot();
    }, 320);
    const t2 = setTimeout(() => setBooting(false), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Unlock audio on first user interaction (browsers gate WebAudio)
  useEffect(() => {
    const onFirst = () => { sfx.unlockAudio(); window.removeEventListener("pointerdown", onFirst); window.removeEventListener("keydown", onFirst); };
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => { window.removeEventListener("pointerdown", onFirst); window.removeEventListener("keydown", onFirst); };
  }, []);

  const moveCursor = (delta) => {
    setCursor((c) => {
      const next = (c + delta + MENU.length) % MENU.length;
      sfx.blip();
      return next;
    });
  };
  // For a 2x2 grid: up/down jumps 2, left/right jumps 1
  const dpadUp    = () => moveCursor(-2);
  const dpadDown  = () => moveCursor(2);
  const dpadLeft  = () => moveCursor(-1);
  const dpadRight = () => moveCursor(1);
  const enter = () => { sfx.select(); navigate(MENU[cursor].to); };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown")  { e.preventDefault(); dpadDown(); }
      else if (e.key === "ArrowUp")    { e.preventDefault(); dpadUp(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); dpadRight(); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); dpadLeft(); }
      else if (e.key === "Enter")      { e.preventDefault(); enter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [cursor]);

  return (
    <div className="retro-stage" data-testid="hub-device-stage">
      <div className="device" data-shell={shell} data-testid="device-shell" role="region" aria-label="retro handheld console">
        {/* Header strip */}
        <div className="device-header">
          <span><span className="power-led" />power on</span>
          <button
            type="button"
            onClick={() => setMutedState((m) => !m)}
            className="sound-toggle"
            style={{ position: "static", border: "1px solid currentColor", background: "transparent" }}
            data-testid="device-sound-toggle"
            aria-label="toggle sound"
            title={muted ? "sound off" : "sound on"}
          >
            ♪ {muted ? "off" : "on"}
          </button>
          <span>daymond.note — v1.0</span>
        </div>

        {/* Screen */}
        <div className="screen-bezel">
          <div className="crt-screen" data-testid="crt-screen">
            <div className="crt-noise" />

            <div className="crt-statusbar">
              <span>◉ logged in</span>
              <span>{clock}</span>
            </div>

            <div className="crt-title">
              ▒ notebook<span className="crt-blink">_</span>
            </div>

            {booting ? (
              <div style={{ position: "relative", zIndex: 4, textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "1.1rem", letterSpacing: "0.18em" }}>booting…</div>
                <div style={{ marginTop: 14, color: "var(--crt-fg-dim)" }}>
                  loading channels ░░░░░░░░░░
                </div>
              </div>
            ) : (
              <div className="crt-grid">
                {MENU.map((m, i) => (
                  <Link
                    key={m.to}
                    to={m.to}
                    data-testid={`hub-nav-${m.label.toLowerCase()}-link`}
                    className="crt-card"
                    onMouseEnter={() => { if (cursor !== i) sfx.blip(); setCursor(i); }}
                    onFocus={() => setCursor(i)}
                    onClick={() => sfx.select()}
                    style={cursor === i ? {
                      background: "rgba(247, 214, 120, 0.14)",
                      boxShadow: "0 0 0 1px var(--crt-fg) inset, 0 0 16px var(--crt-glow)",
                    } : undefined}
                  >
                    <div className="label">
                      {cursor === i ? "▸ " : "  "}{m.label}
                    </div>
                    <div className="sub">{m.sub}</div>
                    <span className="arrow">▶</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="crt-footer">
              <span>↕ select</span>
              <span>↵ enter</span>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="controls">
          <div className="dpad" aria-label="d-pad">
            <button type="button" className="up"    onClick={dpadUp}    data-testid="dpad-up"    aria-label="up">▲</button>
            <button type="button" className="down"  onClick={dpadDown}  data-testid="dpad-down"  aria-label="down">▼</button>
            <button type="button" className="left"  onClick={dpadLeft}  data-testid="dpad-left"  aria-label="left">◀</button>
            <button type="button" className="right" onClick={dpadRight} data-testid="dpad-right" aria-label="right">▶</button>
            <span className="center" aria-hidden="true" />
          </div>

          <div className="start-select">
            <Link to="/about" className="pill-btn" data-testid="device-select-btn" onClick={() => sfx.click()}>select • about</Link>
            <button type="button" className="pill-btn" data-testid="device-start-btn" onClick={enter}>
              start ▸
            </button>
          </div>

          <div>
            <div className="ab-buttons" aria-hidden="false">
              <Link to="/contact"     className="ab-button" data-testid="device-a-btn" title="contact"      onClick={() => sfx.click()}>A</Link>
              <Link to="/admin/login" className="ab-button" data-testid="device-b-btn" title="admin login"  onClick={() => sfx.click()}>B</Link>
            </div>

            {/* Color strips */}
            <div className="color-strips" role="radiogroup" aria-label="device color">
              {SHELL_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-pressed={shell === c.id}
                  aria-label={c.name}
                  title={c.name}
                  className={`color-strip color-strip-${c.id}`}
                  data-testid={`device-color-${c.id}`}
                  onClick={() => { setShell(c.id); sfx.click(); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Speaker grill */}
        <div className="speaker-grill" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
};

export default Hub;
