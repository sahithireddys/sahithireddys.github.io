# CLAUDE.md: Sahithi Reddy portfolio

You are continuing a portfolio build that started in a Claude chat session. Read this file, then `docs/DESIGN.md` and `docs/ROADMAP.md`, before changing anything.

## Working rules (from the owner)
- Sahithi decides design direction. **Do not make design decisions on her behalf.** When something is new or open (fonts, layout, a new section, a new visual), propose 2-4 concrete options and let her choose before building.
- **Never remove a feature she has not raised concerns about.**
- Text must be **solid** colour: no gradient or glowing text. (The only shimmer is the sheen sweep on the primary buttons.)
- She wants it visually appealing and creative, not just "techy": animate and add interaction wherever it fits. Avoid generic portfolio patterns.
- Keep the existing theme (docs/DESIGN.md) across every section.
- All facts about her come from `docs/resume.pdf` (text in `docs/resume.txt`), her GitHub (https://github.com/sahithireddys) and details she has pasted into chat. **Never invent metrics, employers, dates or design rationale.** The "why it is built this way" cards on the flagship projects come from the repo READMEs and her own notes (including how Redis is used).
- Copy she has chosen (do not change without asking): hero body line "I build backend systems, cloud pipelines and AI agents that you can trust at 3 a.m."; status line "Available to start immediately, and open to relocating"; Experience subline "Where the work went live."; Skills subline "The technologies behind every system I've shipped."; Contact headline "Let's build something that lasts."; the nav/section label for Contact is **Connect**.

## Stack
Next.js 14 (App Router, plain JavaScript, no TypeScript), React 18, React Three Fiber 8 + three 0.169, GSAP + ScrollTrigger. Plain global CSS in `app/globals.css` (CSS variables for the palette). No UI library.

Run: `npm install` then `npm run dev` (http://localhost:3000). Build with `npm run build`.

## Page structure (`app/page.js`)
`BlobStageClient`, `Interactions`, then `Hero`, `About`, `Experience`, `Projects`, `Skills`, `Publications`, `Contact`, in that order. Nav (in Hero.jsx): brand "Sahithi Reddy" (scrolls to top), About, Experience, Projects, Skills, Publications, Connect.

## Code map
- `lib/data.js`: **all content** (skills chips for the hero orbs, hero copy, links, about, experience, `work` projects, `skillGroups`, `papers`, `contact`). Edit copy here first.
- `lib/shaders.js`: chrome blob GLSL. `lib/store.js`: shared mutable store (mouse, labels) read by the R3F scene.
- `components/BlobStage.jsx` (+ `BlobStageClient.jsx`, the ssr:false wrapper): ONE fixed full-screen R3F canvas (`.blob-stage`, z-index 20, pointer-events none) holding the blob for the whole page. Each frame it reads `window.scrollY` and the live `getBoundingClientRect()` of anchor elements and computes the blob pose. Anchors, in order: hero pose (fixed, right) -> `.about-blob` -> `.bead` (Experience pipeline) -> `.proj-blob` (beside the Projects title) then a right-edge lane down the section -> `.skills-blob` (left) -> `.pub-blob` (right) -> `.contact-blob` (centre, behind the headline). Anchors are re-queried if disconnected (hot reload safe). Skill orbs, project satellites and their hover labels exist only in the hero. Helper `glide(anchor, section, k)` handles the later hops; anchors with width 0 (phones) make the blob keep its small lane.
- `components/Hero.jsx`: single 100vh screen: nav, availability status, role tag, big name, body line, two rows of buttons (Explore my work / LinkedIn, then Resume / GitHub), the small "Hover the orbs to explore" hint (`.orbhint`, hides after an orb label is hovered). Resume opens `/Sahithi_Reddy_Resume.pdf` (in `public/`) in a new tab; replace that file to update it.
- `components/About.jsx`: statement, career paragraphs, counters, strengths, education log (coursework always visible, "Coursework:" and "TA:" bold), location pill. Left column only holds the empty `.about-blob` anchor: never animate it with transforms.
- `components/Experience.jsx`: pipeline timeline; `.bead` rides the rail (ScrollTrigger). All cards are open by default and toggle independently; a rAF loop calls `ScrollTrigger.refresh()` for ~700ms after any toggle so nothing jumps. Location sits on its own second line under the dates.
- `components/Projects.jsx` (+ `Diagrams.jsx`): two open **flagship** cards (Payment Ledger, AI Agent) each with count-up stat tiles, an animated **architecture diagram** (inline SVG, packets travel along the arrows via SMIL `animateMotion`), and four "why it is built this way" cards (hovering one lights up the diagram boxes it explains; node ids are listed in `why[].nodes` in data.js). Then collapsible "More projects" rows (Hoosier Hub, Trello API CLI) with numbers only. `<div className="proj-blob"/>` in the header is the blob anchor.
- `components/Skills.jsx`: `skillGroups` as category cards (first one `.wide`), chips with hover glow; `.skills-blob` anchor on the left.
- `components/Publications.jsx`: two paper cards with real details and links; `.pub-blob` anchor on the right.
- `components/Contact.jsx`: "Connect" section: big blob behind the headline, underline-style form in a soft frosted box, one thin link strip (Email, LinkedIn, GitHub; no phone). Form posts to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree style) if set, otherwise opens the visitor's email app with the message filled in (mailto).
- `components/Interactions.jsx`: pointer tracking that sets `--mx/--my` for the `.glow` hover spotlight.
- `docs/reference/*.html`: early standalone demos. Reference only.

## Gotchas that have already bitten us
- CSS class names are global. Collisions so far: `.pin`, `.open`, and `.proj` (section) vs the hero label `.lbl.proj` (renamed `lbl-proj`). Prefix section-specific classes. Keep `.flag-copy li` bullet styles scoped so they do not leak.
- Content that must appear in front of the blob needs `position:relative; z-index:30`.
- The `.glow` hover lift (translateY(-5px)) uses an extra 8px invisible hit strip so the box does not slip out from under the cursor. Do not add tilt.
- Diagram SVG text does not wrap: sub-lines are hand-split in `Diagrams.jsx`. If you change wording, check nothing overflows its box (compare each text `getBBox()` to its rect).
- Screenshots of the page can come back blank or stale right after a scripted scroll; nudge with a wheel scroll or read geometry with JS instead.

## Facts and open questions
- Payment ledger numbers (3,600+ tx/min, 12.6ms p95, 0% failed, k6, 60 req/s for 2 min on one MacBook Air) match the repo README as of Sept 2026. The 3,600/min is the rate the test was set to, not a measured ceiling.
- Company name is **Isomerous**. Location text on the About pill is "Morganville, New Jersey, USA".
- Hoosier Hub and Trello CLI text is from her resume lines. The Trello "23 passing tests" tile comes from the repo README; confirm it is still right.
- Still to confirm with her: About and Experience wording approval; Formspree endpoint for the contact form; fonts (still a plain Helvetica system stack, not chosen by her).
- Deployment: not done yet (see docs/ROADMAP.md). Vercel is the recommended host.
