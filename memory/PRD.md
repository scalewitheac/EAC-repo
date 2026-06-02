# Creative Journal — PRD

## Original Problem Statement
A password-protected personal creative-journal site themed as a lined notebook with PicoChat (Nintendo DS chat) UI elements drawn in pencil on the page. Front page is a password gate that leads to a disclaimer page, then the main hub. Pages: Drawings (left fixed image, right scrollable sticky-note thumbs with #tag/date/title search, folded-corner page-turn), Writings (blog-style entries), Videos (sticky-note thumbnails, lightbox with CC/play/pause/speed/skip/loop), About (artist image + 150-word bio + 5 social slots with graphite-pencil placeholders), Contact (left page = approved message board, right page = submission form with sender-descriptor joke question). Persistent ribbon-bookmark to About. Right-click disabled on artwork. Sticky-note color follows the active theme. Password page has a "light switch" circle that cycles 4 color schemes (cream, pink, mint, lavender) which persist after entry.

## Architecture
- **Backend**: FastAPI + MongoDB (motor). JWT auth (single admin seeded from env). Emergent object storage for uploads. Routes under `/api`.
- **Frontend**: React + Tailwind. ThemeProvider (4 themes via CSS vars), AuthProvider (site-gate + admin auth). React Router for all pages. Sonner toaster. No shadcn (hand-drawn aesthetic).
- **Storage**: Emergent object storage (`EMERGENT_LLM_KEY`).

## Key Features Implemented (2026-02)
- Password-gated entry (`SITE_PASSWORD=pass`) → disclaimer with "I Understand" image button → hub
- 4-theme color cycle: theme-cream, theme-pink, theme-mint, theme-lavender (light-switch on password page + theme button in nav)
- Drawings gallery (2-page notebook spread, search by title/date/#tag, sticky-note thumbnails, page-corner next, right-click disabled)
- Writings page (blog-style)
- Videos page (lightbox player: play/pause, CC toggle, speed cycle, loop toggle, skip; supports uploaded video files AND external embeds — YouTube/Vimeo/TikTok)
- About page (artist photo + bio + 5 social slots with graphite-pencil placeholders for empty)
- Contact page (approved message board + submission form with sender-descriptor joke field)
- Admin login (JWT) + Admin panel (approve/delete messages; add/delete drawings/writings/videos; upload images & videos to object storage)
- Persistent ribbon-bookmark linking to /about across the site
- Right-click disabled globally on `<img>` and `<video>` elements

## Credentials
- Site password: `pass`
- Admin: `scalewitheac@gmail.com` / `pass`

## Backlog
- P1: real-life notebook desk photo (currently using Pexels stock — user may replace)
- P1: caption/CC file upload field for videos
- P1: email forwarding for new messages → `delinedmessagedrafts@gmail.com` (BLOCKED on email provider + API key, e.g. Resend)
- P1: Operators (admin user) management UI inside Admin Panel — backend endpoints already exist
- P2: drag-and-drop reordering in admin
- P2: bio is editable in admin (currently hardcoded)
- P2: social link slots are hardcoded — make admin-editable
- P2: split `backend/server.py` (~600 lines) into routers
- P2: light-switch on password page is set to be visible only before unlock — confirmed; theme persists via localStorage

## Recent Updates (2026-02)
- Global sans-serif font (Inter) applied across all hand/marker classes
- Disclaimer page rewritten to match user-provided text (Just take note… / a.k.a… / P.S. note); confirm-button image sized with `width:auto; height:auto; maxWidth:min(420px,90%)` to prevent warping
- Created `/pages/NotFound.jsx` — device-style 404 page: CRT shows "I AM ERROR", left-side vertical label reads "come back later when its right again"; wired into App.js catch-all route
- Videos page: "picochat tip" → "note to self"
- About page: content-warning text updated; all 5 social slots now render as inert "error" pills; section heading "elsewhere" → "other notebooks"
- Contact page: "sender descriptor" label/copy replaced with rotating random question (12 prompts, picked on mount); submit button → "Slip Onto The Desk"

## Next Action Items
- User to test password gate, theme cycle, admin upload of real artwork.
- User to provide real bio text (currently uses placeholder) and real social URLs.
- Add custom notebook-on-desk hero image once user provides one.
