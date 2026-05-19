import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import StarField from "../components/StarField";

const PasswordGate = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifySitePassword } = useAuth();
  const { cycleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifySitePassword(password);
      navigate("/disclaimer");
    } catch (err) {
      setError("hm. that's not it.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "#06030d" }}>
      {/* Deep night gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, #2a0e4d 0%, #0a0418 45%, #04030c 100%)",
        }}
      />
      {/* Notebook desk photo, dimmed underneath the stars */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5185078/pexels-photo-5185078.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          filter: "saturate(0.6) brightness(0.32) contrast(1.05) hue-rotate(-10deg)",
          mixBlendMode: "luminosity",
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(8, 4, 18, 0.45)" }} />

      {/* Neon falling stars */}
      <StarField shootingCount={16} dotCount={70} />

      {/* paper grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }} />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-6">
        <div className="sticky tilt-l max-w-md w-full p-10" style={{ background: "var(--sticky-bg)" }}>
          <span className="tape tape-tl" />
          <span className="tape tape-tr" />
          <h1 className="font-marker text-5xl md:text-6xl text-[var(--ink-color)] leading-none mb-2">
            shhh.
          </h1>
          <p className="font-hand text-[var(--ink-soft)] text-lg mb-6">
            this notebook is private. <br /> say the password.
          </p>
          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              className="pico-input font-hand text-xl"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="site-password-input"
              autoFocus
            />
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="pico-btn" data-testid="site-password-submit-btn">
                {loading ? "..." : "enter"}
              </button>
              {error && (
                <span className="font-hand text-[var(--margin-color)]" data-testid="site-password-error">
                  {error}
                </span>
              )}
            </div>
          </form>
          <p className="font-pixel text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-6">
            do not read past this page without permission.
          </p>
        </div>
      </div>

      {/* Light switch / theme cycle (only on password page) */}
      <button
        onClick={cycleTheme}
        className="light-switch"
        data-testid="theme-light-switch"
        title={`current: ${theme.replace("theme-", "")}`}
      >
        ⏻
      </button>
    </div>
  );
};

export default PasswordGate;
