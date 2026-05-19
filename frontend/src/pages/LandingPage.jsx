import React from "react";
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  CalendarRange,
  HelpCircle,
  PhoneForwarded,
  UserPlus,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const PHONE = "+13022677749";
const PHONE_DISPLAY = "+1 (302) 267-7749";
const BOOK_URL = "https://cal.com/eacagencyco/engage-ai-demo";

const PrimaryButton = ({ href, children, testid, external = false }) => (
  <a
    data-testid={testid}
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="btn-primary inline-flex items-center justify-center gap-2 bg-[#FF3333] text-white font-semibold px-7 py-4 rounded-xl text-sm sm:text-base tracking-tight"
  >
    {children}
  </a>
);

const SecondaryButton = ({ href, children, testid, external = false }) => (
  <a
    data-testid={testid}
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="btn-secondary inline-flex items-center justify-center gap-2 bg-transparent text-white font-semibold px-7 py-4 rounded-xl text-sm sm:text-base tracking-tight border border-white/20"
  >
    {children}
  </a>
);

const Header = () => (
  <header
    data-testid="site-header"
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10"
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
      <a
        href="#top"
        data-testid="brand-logo"
        className="flex items-center gap-2.5 group"
      >
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className="absolute inset-0 rounded-full bg-[#FF3333] pulse-dot" />
          <span className="absolute inset-0 rounded-full bg-[#FF3333]" />
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          Engage<span className="text-[#FF3333]">.</span>AI
        </span>
      </a>
      <a
        data-testid="header-book-btn"
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary hidden sm:inline-flex items-center gap-2 border border-white/15 px-4 py-2 rounded-lg text-sm font-medium"
      >
        Book Demo
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        data-testid="header-book-btn-mobile"
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden text-sm font-medium text-[#FF3333]"
      >
        Book →
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section
    id="top"
    data-testid="hero-section"
    className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36 noise"
  >
    {/* Grid background */}
    <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
    {/* Red glow */}
    <div
      className="hero-glow"
      style={{ top: "-200px", left: "50%", transform: "translateX(-50%)" }}
      aria-hidden="true"
    />

    <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center">
      {/* Eyebrow */}
      <div
        data-testid="hero-eyebrow"
        className="fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-xs sm:text-sm text-white/80 mb-8"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#FF3333]" />
        <span className="font-medium">AI Receptionist for Small Business</span>
        <span className="text-white/30">•</span>
        <span className="text-white/60">Available 24/7</span>
      </div>

      {/* Headline */}
      <h1
        data-testid="hero-headline"
        className="fade-up font-display font-bold tracking-tighter text-white text-4xl sm:text-5xl lg:text-7xl leading-[0.95]"
        style={{ animationDelay: "80ms" }}
      >
        Never miss another <br className="hidden sm:block" />
        customer call <span className="text-[#FF3333]">again.</span>
      </h1>

      {/* Subhead */}
      <p
        data-testid="hero-sub"
        className="fade-up mt-7 max-w-2xl mx-auto text-base sm:text-lg text-white/65 leading-relaxed"
        style={{ animationDelay: "160ms" }}
      >
        Engage A.I. answers every call, books appointments, qualifies leads, and
        transfers the calls that matter — all in your brand voice, around the
        clock.
      </p>

      {/* CTAs */}
      <div
        className="fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        style={{ animationDelay: "240ms" }}
      >
        <PrimaryButton
          testid="hero-call-demo-btn"
          href={`tel:${PHONE}`}
        >
          <Phone className="h-4 w-4" />
          Call Demo Agent
        </PrimaryButton>
        <SecondaryButton
          testid="hero-book-call-btn"
          href={BOOK_URL}
          external
        >
          <CalendarCheck className="h-4 w-4" />
          Book a Call
        </SecondaryButton>
      </div>

      {/* Phone hint */}
      <div
        data-testid="hero-phone-hint"
        className="fade-up mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/45"
        style={{ animationDelay: "320ms" }}
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
        Live demo line: <span className="text-white/75 font-medium">{PHONE_DISPLAY}</span>
      </div>
    </div>

    {/* Bottom trust marquee */}
    <div className="relative mt-24 border-y border-white/10 bg-black/40 overflow-hidden">
      <div className="marquee-track py-5 text-white/40 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6 shrink-0">
            <span>Answers 24/7</span>
            <span className="text-white/15">/</span>
            <span>Books Appointments</span>
            <span className="text-white/15">/</span>
            <span>Captures Leads</span>
            <span className="text-white/15">/</span>
            <span>Transfers Live Calls</span>
            <span className="text-white/15">/</span>
            <span>Speaks Your Brand</span>
            <span className="text-white/15">/</span>
            <span>No More Voicemail</span>
            <span className="text-white/15">/</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StatCard = ({ value, label, testid, accent = true }) => (
  <div
    data-testid={testid}
    className="relative p-8 sm:p-10 border border-white/10 rounded-2xl bg-[#0A0A0A]"
  >
    <div
      className={`font-display font-bold tracking-tighter text-5xl sm:text-6xl lg:text-7xl ${
        accent ? "text-[#FF3333]" : "text-white"
      }`}
    >
      {value}
    </div>
    <p className="mt-4 text-white/65 text-sm sm:text-base leading-relaxed">
      {label}
    </p>
  </div>
);

const Stats = () => (
  <section
    data-testid="stats-section"
    className="relative py-24 sm:py-32 border-t border-white/10"
  >
    <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

    <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
      <div className="max-w-2xl">
        <div className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#FF3333] font-semibold mb-5">
          The hidden cost
        </div>
        <h2
          data-testid="stats-headline"
          className="font-display font-bold tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02]"
        >
          Every missed call is a missed customer.
        </h2>
        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-xl">
          Small businesses are bleeding revenue from a phone that nobody picks
          up. Here's what it actually costs you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard
          testid="stat-1"
          value="62%"
          label="of small business calls go unanswered — most callers never leave a voicemail and never call back."
        />
        <StatCard
          testid="stat-2"
          value="$75B"
          label="in revenue is lost to missed calls every year across U.S. small businesses."
        />
        <StatCard
          testid="stat-3"
          value="85%"
          label="of customers whose calls aren't answered won't call a second time — they call a competitor."
          accent={false}
        />
        <StatCard
          testid="stat-4"
          value="24/7"
          label="is when your customers are actually calling. After-hours, weekends, lunch breaks — your AI is always on."
          accent={false}
        />
      </div>
    </div>
  </section>
);

const FEATURES = [
  {
    icon: CalendarRange,
    title: "Books Appointments",
    desc: "Syncs with your calendar in real time. Schedules, reschedules, and confirms — no double-bookings, no friction.",
    testid: "feature-appointments",
  },
  {
    icon: HelpCircle,
    title: "Answers FAQs",
    desc: "Trained on your hours, pricing, services, and policies. Handles 80% of routine questions without ever bothering you.",
    testid: "feature-faqs",
  },
  {
    icon: PhoneForwarded,
    title: "Transfers Live Calls",
    desc: "Recognizes urgent or qualified callers and warm-transfers them to the right person — with full context.",
    testid: "feature-transfers",
  },
  {
    icon: UserPlus,
    title: "Captures Leads",
    desc: "Collects name, number, intent, and follow-up info. Delivers structured leads straight to your inbox or CRM.",
    testid: "feature-leads",
  },
];

const Features = () => (
  <section
    data-testid="features-section"
    className="relative py-24 sm:py-32 border-t border-white/10"
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="max-w-2xl">
        <div className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#FF3333] font-semibold mb-5">
          What it does
        </div>
        <h2
          data-testid="features-headline"
          className="font-display font-bold tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02]"
        >
          A full-time receptionist that never sleeps.
        </h2>
        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-xl">
          Engage A.I. handles the entire front desk — from first ring to booked
          appointment — so your team can focus on the work that matters.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              data-testid={f.testid}
              className="feature-card relative p-8 sm:p-10 border border-white/10 rounded-2xl bg-[#0A0A0A] group"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF3333]/10 border border-[#FF3333]/30 mb-6">
                <Icon className="h-5 w-5 text-[#FF3333]" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-white/60 leading-relaxed text-sm sm:text-base">
                {f.desc}
              </p>
              <ArrowRight className="absolute top-8 right-8 h-5 w-5 text-white/20 group-hover:text-[#FF3333] group-hover:translate-x-1 transition-all duration-300" />
            </div>
          );
        })}
      </div>

      {/* Sub-row of small benefit chips */}
      <div className="mt-10 flex flex-wrap gap-3">
        {[
          { icon: Clock, label: "Live in 7 days" },
          { icon: ShieldCheck, label: "Your brand voice" },
          { icon: Phone, label: "Works with your existing number" },
        ].map(({ icon: I, label }) => (
          <div
            key={label}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-white/70 text-xs sm:text-sm"
          >
            <I className="h-3.5 w-3.5 text-[#FF3333]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section
    data-testid="final-cta-section"
    className="relative py-28 sm:py-40 border-t border-white/10 overflow-hidden"
  >
    <div
      className="hero-glow"
      style={{ bottom: "-300px", left: "50%", transform: "translateX(-50%)", opacity: 0.7 }}
      aria-hidden="true"
    />
    <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

    <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
      <h2
        data-testid="final-cta-headline"
        className="font-display font-bold tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02]"
      >
        Stop losing revenue to <span className="text-[#FF3333]">missed calls.</span>
      </h2>
      <p className="mt-6 text-white/65 text-base sm:text-lg max-w-xl mx-auto">
        Hear it for yourself. Call our live demo agent right now, or book a
        15-minute walkthrough with our team.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <PrimaryButton
          testid="final-call-demo-btn"
          href={`tel:${PHONE}`}
        >
          <Phone className="h-4 w-4" />
          Call Demo Agent
        </PrimaryButton>
        <SecondaryButton
          testid="final-book-call-btn"
          href={BOOK_URL}
          external
        >
          <CalendarCheck className="h-4 w-4" />
          Book a Call
        </SecondaryButton>
      </div>

      <div
        data-testid="final-phone-hint"
        className="mt-6 text-xs sm:text-sm text-white/45"
      >
        Demo line: <span className="text-white/75 font-medium">{PHONE_DISPLAY}</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer
    data-testid="site-footer"
    className="border-t border-white/10 py-10 bg-black"
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-2 w-2 rounded-full bg-[#FF3333]" />
        <span className="font-display text-sm font-semibold tracking-tight">
          Engage<span className="text-[#FF3333]">.</span>AI
        </span>
      </div>
      <div className="text-xs text-white/40">
        © {new Date().getFullYear()} Engage A.I. — Your AI receptionist that never sleeps.
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="bg-[#050505] text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
