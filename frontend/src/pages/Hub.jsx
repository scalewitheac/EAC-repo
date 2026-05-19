import React from "react";
import { Link } from "react-router-dom";
import { NotebookFrame } from "../components/notebook/NotebookShell";

const Hub = () => {
  const leftPage = (
    <div className="relative">
      <h1 className="font-marker text-6xl md:text-7xl text-[var(--ink-color)] leading-none mb-4 tilt-l2">
        hi, hello.
      </h1>
      <p className="font-hand text-xl md:text-2xl text-[var(--ink-color)] leading-relaxed sketch-underline inline-block">
        welcome to my notebook.
      </p>

      <div className="mt-10 font-hand text-lg text-[var(--ink-soft)] space-y-3">
        <p>this is a small corner of the internet.</p>
        <p>drawings, writings, videos — whatever spills out.</p>
        <p className="italic">it changes when i change.</p>
      </div>

      <div className="absolute bottom-6 left-6 font-pixel text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        page 01
      </div>
    </div>
  );

  const navItems = [
    { to: "/drawings", label: "doodles", note: "art / multimedia", t: "tilt-l" },
    { to: "/writings", label: "writings", note: "newsletters / notices", t: "tilt-r" },
    { to: "/videos", label: "videos", note: "shorts / timelapses", t: "tilt-l2" },
    { to: "/about", label: "about", note: "who is this for", t: "tilt-r" },
    { to: "/contact", label: "contact", note: "leave a note", t: "tilt-l" },
  ];

  const rightPage = (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-marker text-4xl text-[var(--ink-color)]">today's menu</h2>
        <span className="font-pixel uppercase tracking-widest text-[var(--ink-soft)]">→ table of contents</span>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {navItems.map((n, idx) => (
          <Link
            key={n.to}
            to={n.to}
            data-testid={`hub-nav-${n.label}-link`}
            className={`group block sticky ${idx % 2 === 0 ? "" : "sticky-alt"} ${n.t}`}
          >
            <span className="tape" />
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-marker text-3xl md:text-4xl text-[var(--ink-color)] group-hover:underline decoration-wavy">
                {n.label}
              </span>
              <span className="font-pixel uppercase tracking-widest text-xs md:text-sm text-[var(--ink-soft)]">
                {n.note}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 font-hand text-[var(--ink-soft)] text-sm">
        ↳ doodled by hand, mostly during class.
      </div>
    </div>
  );

  return <NotebookFrame leftPage={leftPage} rightPage={rightPage} />;
};

export default Hub;
