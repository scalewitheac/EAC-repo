import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resolveMediaUrl } from "../components/ProtectedImage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const FALLBACK_BTN =
  "https://customer-assets.emergentagent.com/job_creative-canvas-602/artifacts/43b6fv8r_Untitled%20design%20%281%29.png";

const Disclaimer = () => {
  const navigate = useNavigate();
  const { acceptDisclaimer } = useAuth();
  const [btnImg, setBtnImg] = useState(FALLBACK_BTN);

  useEffect(() => {
    let alive = true;
    axios.get(`${API}/settings/images`).then((r) => {
      if (alive && r.data?.disclaimer_button_path) setBtnImg(r.data.disclaimer_button_path);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const handleEnter = () => {
    acceptDisclaimer();
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full py-12 px-4 relative" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-3xl bg-[var(--bg-color)] paper paper-margin relative overflow-hidden shadow-2xl">
        <div className="relative z-10 p-8 md:p-14">
          <h1 className="font-marker text-6xl md:text-7xl text-[var(--ink-color)] leading-none mb-8 italic">
            Disclaimer
          </h1>

          <div className="space-y-4 font-hand text-lg md:text-xl text-[var(--ink-color)] leading-relaxed">
            <p>
              That this site is simply meant to be a personal creative art/writing/media sandbox
              and overall gallery for its owner.
            </p>
            <p>
              Consider it another random personal blog on this World Wide Web — with its true
              meanings and worth being defined only by the one who owns it and likewise decided to
              share it.
            </p>
            <p>
              As such — the content within can and WILL change based on the owner's collective
              whims and focus regarding their interests. Life changes — so does a persons
              attention and focus on occasion. Whatever you see here isn't meant to be restricted
              by your own views and interpretations. Or anyone else's.
            </p>
            <p>
              So while the owner cannot physically stop you from viewing this blog, nor can they
              force how you think or tell you what to do after you browse the contents within —
              try to remember that this blog may hold things not suitable for you…or an audience
              that is younger or more sensitive.
            </p>
            <p className="italic">a.k.a…</p>
            <p className="font-bold text-center">
              Warning: This blog is 18+. Viewer Discretion is Advised
            </p>
            <p className="font-bold text-center">
              This blog, isn't a babysitter.
            </p>
            <p className="italic text-[var(--ink-soft)] text-base md:text-lg mt-6">
              P.S. — If and when you see any spelling or grammar errors, pretend this is an actual
              notebook. And remember human error is a thing that applies here. Along with sleep
              deprivation. Thanks.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleEnter}
              data-testid="disclaimer-accept-btn"
              aria-label="I Understand — enter the menu"
              className="block hover:scale-[1.03] active:scale-95 transition-transform duration-150"
            >
              <img
                src={resolveMediaUrl(btnImg)}
                alt="I Understand — enter the menu"
                style={{ height: "auto", width: "auto", maxWidth: "min(420px, 90%)", display: "block" }}
                className="select-none mx-auto"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                data-testid="disclaimer-souvenir-img"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
