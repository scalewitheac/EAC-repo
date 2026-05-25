import React from "react";
import { Link } from "react-router-dom";
import { NotebookFrame } from "../components/notebook/NotebookShell";

// --- Hand-drawn icon stacks ---
const IconCard = ({ children }) => (
  <div className="relative w-14 h-16 md:w-16 md:h-20 flex-shrink-0" aria-hidden="true">
    <div
      className="absolute inset-0 bg-[var(--bg-color)] border-2 border-[var(--ink-color)]"
      style={{ transform: "translate(3px, 4px)" }}
    />
    <div className="absolute inset-0 bg-[var(--bg-color)] border-2 border-[var(--ink-color)] flex items-center justify-center text-[var(--ink-color)]">
      {children}
    </div>
  </div>
);

const BrushIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 5 L28 11 L15 24 L9 18 Z" />
    <path d="M9 18 L6 26 L3 29" />
    <path d="M6 26 L11 24" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4 H 20 L 26 10 V 28 H 7 Z" />
    <path d="M20 4 V 10 H 26" />
    <path d="M11 15 H 22" />
    <path d="M11 19 H 22" />
    <path d="M11 23 H 18" />
  </svg>
);
const CamIcon = () => (
  <svg viewBox="0 0 32 32" className="w-10 h-9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="19" height="14" rx="1.5" />
    <path d="M22 14 L29 9 V 23 L 22 18 Z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 32 32" className="w-10 h-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="26" height="18" rx="1.5" />
    <path d="M3 9 L 16 19 L 29 9" />
  </svg>
);

const ITEMS = [
  { to: "/drawings", title: "Drawings", caption: "doodles & multimedia", Icon: BrushIcon, tilt: "-1.6deg" },
  { to: "/writings", title: "Writings", caption: "musings & notices", Icon: DocIcon, tilt: "1.1deg" },
  { to: "/videos", title: "Videos", caption: "", Icon: CamIcon, tilt: "-1.1deg" },
  { to: "/contact", title: "Contact", caption: "leave a message", Icon: MailIcon, tilt: "1.4deg" },
];

const Hub = () => {
  const content = (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* PicoChat-style window frame */}
      <div className="pico-window">
        <div className="pico-titlebar">
          <span>▒ room — notebook ▒</span>
          <span>♥ menu</span>
        </div>

        {/* status strip */}
        <div className="px-4 py-2 border-b-2 border-[var(--ink-color)] bg-[var(--bg-deep)] flex items-center justify-between font-pixel text-sm uppercase tracking-widest text-[var(--ink-soft)]">
          <span>▸ select a channel</span>
          <span className="hidden sm:inline">⏷ 04 channels online</span>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {ITEMS.map(({ to, title, caption, Icon, tilt }) => (
              <Link
                key={to}
                to={to}
                data-testid={`hub-nav-${title.toLowerCase()}-link`}
                className="sticky-pad block group"
                style={{ "--tilt": tilt }}
              >
                <div className="flex items-center gap-5 px-6 py-7 md:px-8 md:py-8">
                  <IconCard><Icon /></IconCard>
                  <div className="flex-1">
                    <div className="font-marker text-3xl md:text-4xl text-[var(--ink-color)] leading-tight group-hover:underline">
                      {title}
                    </div>
                    {caption && (
                      <div className="font-pixel uppercase tracking-widest text-xs md:text-sm text-[var(--ink-soft)] mt-1">
                        ▸ {caption}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return <NotebookFrame single>{content}</NotebookFrame>;
};

export default Hub;
