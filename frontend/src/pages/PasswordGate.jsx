import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import StarField from "../components/StarField";
import LightSwitch from "../components/LightSwitch";

const PasswordGate = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifySitePassword } = useAuth();
  const { theme } = useTheme();
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
    <div className={`password-gate ${theme} min-h-screen w-full relative overflow-hidden`} style={{ background: "#04030a" }}>
      {/* Deep night gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #1a0a36 0%, #0a0418 50%, #03020a 100%)",
        }}
      />

      {/* Neon falling stars */}
      <StarField shootingCount={22} dotCount={80} />

      {/* paper grain overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }} />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-6">
        <div className="sticky tilt-l max-w-md w-full p-10" style={{ background: "var(--sticky-bg)" }}>
          <span className="tape tape-tl" />
          <span className="tape tape-tr" />
          <h1 className="font-marker text-5xl md:text-6xl text-[var(--ink-color)] leading-none mb-6">
            shhh.
          </h1>
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
        </div>
      </div>
      <LightSwitch />
    </div>
  );
};

export default PasswordGate;
