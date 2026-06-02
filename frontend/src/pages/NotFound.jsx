import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as sfx from "../lib/sfx";

const NotFound = () => {
  const [shell] = useState(() => localStorage.getItem("device-shell") || "mauve");

  useEffect(() => {
    const t = setTimeout(() => { sfx.unlockAudio(); sfx.boot(); }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="retro-stage" data-testid="notfound-stage">
      {/* Side-of-device label */}
      <div
        aria-hidden="true"
        data-testid="notfound-side-label"
        style={{
          position: "absolute",
          left: "max(18px, 3vw)",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "left center",
          fontFamily: "'VT323', monospace",
          fontSize: "1.05rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          whiteSpace: "nowrap",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        ▸ come back later when its right again
      </div>

      <div className="device" data-shell={shell} data-testid="notfound-device-shell">
        <div className="device-header">
          <span><span className="power-led" />power on</span>
          <span>delined — v1.0</span>
        </div>

        <div className="screen-bezel">
          <div className="crt-screen" data-testid="notfound-crt-screen">
            <div className="crt-noise" />

            <div className="crt-statusbar">
              <span style={{ color: "#ff8a8a" }}>◉ error</span>
              <span>404</span>
            </div>

            <div className="crt-title" style={{ color: "#ff8a8a" }}>
              ▒ error<span className="crt-blink">_</span>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 4,
                textAlign: "center",
                padding: "48px 0 28px",
              }}
            >
              <div
                data-testid="notfound-screen-message"
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--crt-fg)",
                  textShadow: "0 0 14px var(--crt-glow)",
                  lineHeight: 1,
                }}
              >
                I am error
              </div>
              <div
                style={{
                  marginTop: 22,
                  color: "var(--crt-fg-dim)",
                  fontFamily: "'VT323', monospace",
                  fontSize: "1rem",
                  letterSpacing: "0.18em",
                }}
              >
                ░ broken link ░
              </div>
            </div>

            <div className="crt-footer">
              <span>↩ press A to return</span>
              <span>404</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="dpad" aria-hidden="true">
            <span className="up">▲</span>
            <span className="down">▼</span>
            <span className="left">◀</span>
            <span className="right">▶</span>
            <span className="center" aria-hidden="true" />
          </div>

          <div className="start-select">
            <Link
              to="/home"
              className="pill-btn"
              data-testid="notfound-home-link"
              onClick={() => sfx.click()}
            >
              select • return home
            </Link>
            <Link
              to="/home"
              className="pill-btn"
              data-testid="notfound-start-link"
              onClick={() => sfx.select()}
            >
              start ▸
            </Link>
          </div>

          <div className="ab-buttons" aria-hidden="false">
            <Link
              to="/home"
              className="ab-button"
              data-testid="notfound-a-link"
              title="return home"
              onClick={() => sfx.click()}
            >
              A
            </Link>
            <Link
              to="/home"
              className="ab-button"
              data-testid="notfound-b-link"
              title="return home"
              onClick={() => sfx.click()}
            >
              B
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
