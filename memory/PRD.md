# Engage A.I. — Landing Page PRD

## Original Problem Statement
Create a landing page to share AI receptionist product.
- Hero banner with two buttons: "Call Demo Agent" and "Book a Call"
- Stats on missed calls (62% of small business calls go unanswered, $75B lost annually...)
- Features grid – books appointments, answers FAQs, transfers calls, captures leads
- Final CTA repeating the two buttons

## User Choices
- Brand: **Engage A.I.**
- Phone (Call Demo Agent): **+1 (302) 267-7749** → `tel:+13022677749`
- Booking (Book a Call): **https://cal.com/eacagencyco/engage-ai-demo**
- Target: Generic small business
- Design: Bold/modern dark theme with sharp red accent (#FF3333 on #050505)
- Scope: Tight — only the requested sections (no testimonials, pricing, or FAQ)

## Architecture
- Frontend-only React landing page (no backend, no DB)
- Single route `/` renders `LandingPage` component
- Tailwind CSS + custom CSS animations (fade-up, marquee, pulse, hover lift)
- Fonts: Outfit (display) + Manrope (body) — loaded from Google Fonts
- Icons: lucide-react

## User Personas
- **Small business owner** — visits page, hears the missed-call pain framing, calls demo line or books a 15-min walkthrough.

## What's Been Implemented (2026-05-19)
- Fixed glassmorphism header with brand mark + Book Demo CTA
- Hero: animated eyebrow chip, massive headline ("Never miss another customer call again."), subhead, dual CTAs (Call Demo Agent / Book a Call), live demo line, red radial glow + grid backdrop
- Trust marquee strip (Answers 24/7 / Books Appointments / Captures Leads / …)
- Stats section: 4 cards — 62%, $75B, 85%, 24/7 with framing copy
- Features grid: 4 cards — Books Appointments, Answers FAQs, Transfers Live Calls, Captures Leads + small benefit chips (Live in 7 days / Your brand voice / Works with existing number)
- Final CTA: "Stop losing revenue to missed calls." + duplicated dual CTAs + demo line
- Minimal footer
- Full data-testid coverage on every interactive + key informational element
- Mobile responsive (375px verified)
- All buttons verified to wire to the correct phone (tel:) and cal.com URL

## Backlog (Prioritized)
- **P1**: Lead capture form fallback (in case caller doesn't want to dial) — modal with name/email/phone storing to MongoDB
- **P1**: Analytics events on both CTAs (PostHog already present in index.html — just add `posthog.capture('cta_call' | 'cta_book')`)
- **P2**: Add short audio sample / waveform demo so visitors can hear the agent before calling
- **P2**: Testimonials and pricing sections
- **P2**: FAQ accordion
- **P3**: A/B test headline variants
