import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MENU = [
  { to: "/drawings", label: "Drawings", sub: "doodles & multimedia" },
  { to: "/writings", label: "Writings", sub: "musings & notices" },
  { to: "/videos",   label: "Videos",   sub: "shorts & timelapses" },
  { to: "/contact",  label: "Contact",  sub: "leave a message" },
];

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
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

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation for that nostalgic D-pad feel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setCursor((c) => (c + 1) % MENU.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setCursor((c) => (c - 1 + MENU.length) % MENU.length);
      } else if (e.key === "Enter") {
        navigate(MENU[cursor].to);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cursor, navigate]);

  return (
    <div className="retro-stage" data-testid="hub-device-stage">
      <div className="device" role="region" aria-label="retro handheld console">
        {/* Header strip */}
        <div className="device-header">
          <span><span className="power-led" />power on</span>
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
                    onMouseEnter={() => setCursor(i)}
                    onFocus={() => setCursor(i)}
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
          <div className="dpad" aria-hidden="true">
            <span className="up" />
            <span className="down" />
            <span className="left" />
            <span className="right" />
            <span className="center" />
          </div>

          <div className="start-select">
            <Link to="/about" className="pill-btn" data-testid="device-select-btn">select • about</Link>
            <button
              type="button"
              className="pill-btn"
              data-testid="device-start-btn"
              onClick={() => navigate(MENU[cursor].to)}
            >
              start ▸
            </button>
          </div>

          <div className="ab-buttons" aria-hidden="true">
            <Link to="/contact" className="ab-button" data-testid="device-a-btn" title="contact">A</Link>
            <Link to="/admin/login" className="ab-button" data-testid="device-b-btn" title="admin">B</Link>
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
