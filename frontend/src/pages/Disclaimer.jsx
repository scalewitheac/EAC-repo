import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Disclaimer = () => {
  const navigate = useNavigate();
  const { acceptDisclaimer } = useAuth();

  const handleEnter = () => {
    acceptDisclaimer();
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full py-12 px-4 relative" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-3xl bg-[var(--bg-color)] paper paper-margin relative overflow-hidden shadow-2xl">
        <div className="relative z-10 p-8 md:p-14">
          <h1 className="font-marker text-6xl md:text-7xl text-[var(--ink-color)] leading-none mb-2">
            Disclaimer
          </h1>
          <p className="font-hand text-[var(--ink-soft)] italic mb-6">*read below…</p>

          <div className="space-y-4 font-hand text-lg md:text-xl text-[var(--ink-color)] leading-relaxed">
            <p>
              This site is meant to be a personal creative art/writing/media sandbox and gallery
              for its owners. Nothing more, nothing less. It's essentially another random personal
              blog on this World Wide Web.
            </p>
            <p>
              As such — the content within can and WILL change based on the owners collective
              whims and focus regarding their interests. Their interests are constantly changing
              and will not be limited or restricted here by any means.
            </p>
            <p>
              And As such — while the owner cannot physically stop you from viewing this blog, it
              should be noted that this blog may hold things not suitable for younger/sensitive
              audiences.
            </p>
            <p className="font-bold">
              A.K.A: Warning: This blog is 18+. Viewer Discretion is Advised
            </p>
            <p>
              This blog isn't a <span className="line-through decoration-2">babysitter</span>.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="font-pixel uppercase tracking-widest text-[var(--ink-soft)] text-sm">
              click the friend below to enter
            </p>
            <button
              onClick={handleEnter}
              data-testid="disclaimer-accept-btn"
              className="block hover:scale-[1.03] active:scale-95 transition-transform duration-150"
              aria-label="I Understand — enter"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_creative-canvas-602/artifacts/d78e9qjc_Untitled%20design%20%282%29.png"
                alt="I Understand"
                className="w-72 md:w-96 select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
