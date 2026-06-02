import React from "react";
import { NotebookFrame } from "../components/notebook/NotebookShell";
import ProtectedImage from "../components/ProtectedImage";

const SOCIALS = [
  { label: "instagram", url: "" },
  { label: "twitter", url: "" },
  { label: "tiktok", url: "" },
  { label: "youtube", url: "" },
  { label: "tumblr", url: "" },
];

const About = () => {
  const leftPage = (
    <div className="relative h-full">
      <h2 className="font-marker text-4xl text-[var(--ink-color)] mb-3 tilt-l2">about</h2>
      <div className="relative bg-[var(--bg-color)] p-3 inline-block tilt-l shadow-lg" style={{ boxShadow: "3px 6px 14px var(--shadow)" }}>
        <span className="tape tape-tl" />
        <span className="tape tape-tr" />
        <ProtectedImage
          src="https://images.pexels.com/photos/29861519/pexels-photo-29861519.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="artist"
          className="w-72 h-80 object-cover"
        />
      </div>

      <div className="mt-6 sticky tilt-r2 inline-block p-3">
        <span className="tape" />
        <div className="font-pixel uppercase text-xs tracking-widest text-[var(--ink-soft)]">content warning</div>
        <p className="font-hand text-[var(--ink-color)] text-base mt-1 max-w-sm">
          Asking questions while someone is drawing may be distracting. Especially if the questions are consistent, repetitive, and are more critical than inquisitive.
        </p>
      </div>
    </div>
  );

  const rightPage = (
    <div className="relative h-full">
      <div className="font-pixel uppercase text-xs tracking-widest text-[var(--ink-soft)]">whoami</div>
      <h3 className="font-marker text-4xl text-[var(--ink-color)] mb-4">a strange diary keeper</h3>

      <div className="font-hand text-lg text-[var(--ink-color)] leading-relaxed space-y-3">
        <p>
          hi. i draw, write, and film small things. this site is a collected mess of those things —
          a sandbox more than a gallery.
        </p>
        <p>
          most entries are made in margins, on receipts, between classes, after sleep. i'd rather
          show the doodle than the polished version.
        </p>
        <p>
          if you'd like to leave a note, the contact page has a message board. messages are read
          before being shown.
        </p>
        <p className="italic text-[var(--ink-soft)]">— The author</p>
      </div>

      <div className="mt-8">
        <div className="font-pixel uppercase text-xs tracking-widest text-[var(--ink-soft)] mb-2">other notebooks</div>
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s, idx) => (
            <span
              key={s.label}
              data-testid={`social-${s.label}-link`}
              className={`pico-btn ${idx % 2 === 0 ? "tilt-l" : "tilt-r"} pointer-events-none relative`}
              title="error"
            >
              <span className="relative">
                <span className="graphite-eraser absolute -inset-1 rounded-sm" aria-hidden />
                <span className="relative opacity-60">error</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return <NotebookFrame leftPage={leftPage} rightPage={rightPage} />;
};

export default About;
