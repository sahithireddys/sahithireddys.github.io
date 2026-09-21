# Roadmap

## Done
- Hero, About, Experience, Projects (with architecture diagrams), Skills, Publications, Connect: all built and wired to the blob's path.
- Nav with every section; Resume and GitHub buttons; availability status; orb hover hint.
- Content updated from her resume (Sept 2026), repo READMEs and her own notes.

## Before going live
1. Deploy (Vercel is the natural fit for Next.js: push to GitHub, import the repo, done). Then connect a custom domain.
2. Contact form: create a Formspree form and set `NEXT_PUBLIC_FORM_ENDPOINT` in the host's environment settings. Without it the form falls back to opening the visitor's email app.
3. SEO and sharing: page title/description in `app/layout.js` (currently "Sahithi Reddy · Software Engineer"), an Open Graph preview image, favicon.
4. Performance check on an ordinary laptop and a phone (blob geometry detail, dpr cap, mobile fallback). Check the architecture diagrams scroll sideways on narrow screens.
5. Accessibility pass: keyboard navigation, contrast (mauve role line on the light hero), reduced motion (packets are hidden; blob and GSAP entrances are only partly handled).
6. Content checks: approve About and Experience wording; confirm the Trello "23 passing tests" tile and the agent "human approves before production" card; keep the ledger README numbers in sync with the site.

## Recruiter-review follow-ups (from her Sept 2026 review)
- State the fintech/payments focus outright (for example a "what I'm looking for" line).
- Consider a short production-debugging story to back up "trust at 3 a.m.".
- Be ready to answer "what is the ledger's throughput ceiling?" (the 3,600/min is the configured test rate).
- Optional: case-study pages, live demos.

## Housekeeping
- Delete stale files on her Mac: `components/BlobScene.jsx`, `components/AboutBlob.jsx`, `~/Documents/portfolio_update.zip` (deleting needs her permission).
- Refresh the `portfolio.zip` handoff after deploy.
- Unused leftovers in code: `sxk/syk` and `p3` in BlobStage.jsx; the old `.pf-*` flow-step CSS in globals.css (the flow steps were replaced by diagrams).
