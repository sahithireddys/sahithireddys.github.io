# Design decisions (chosen by Sahithi)

## Concept
"Option D": a 3D chrome liquid-metal **blob** that reacts to the cursor and travels down the whole page as one continuous object. Chosen over: living constellation, iridescent aurora, pipeline journey, and other 3D objects.

## Palette (from her reference image, `docs/reference/palette-reference.png`)
| Token | Hex | Role |
|---|---|---|
| --teal | #A8D4DC | hero sky top, highlights, accents and glows |
| --peri | #959BB9 | hero gradient bottom, secondary accent |
| --mauve | #73617B | About and Publications backgrounds, role line |
| --cocoa | #46292B | body text on light sections, hover glows |
| --black | #000000 | headlines, buttons, near-black sections |

Extras: the Contact section uses a very slightly violet near-black (#0d0b11). The availability dot is green (#2f9e6e), which is not a theme colour. The blob adds pastel pinks and lilacs in its iridescent sheen.

Mood: chrome, pastel, iridescent, soft futuristic. **Text is always solid** (no gradient or glowing text). The only shimmer is the sheen sweep across the black primary buttons ("Explore my work", "GitHub").

## Hover system (`.glow`)
Boxes lift 5px and show a soft cursor spotlight (`--mx/--my` set by Interactions.jsx). Sizes are tuned per section: small and neutral in About, smaller still on Projects "more" rows, teal on the dark sections. No tilt.

## Hero (one screen)
- Nav: brand "Sahithi Reddy" (home) + About, Experience, Projects, Skills, Publications, Connect. Collapses to a floating glass pill after 80px of scroll.
- Copy, top to bottom: availability status (green pulsing dot, plain text on the background), role line in mauve, big name "Sahithi Reddy", body line, buttons row 1 (Explore my work, LinkedIn), row 2 (Resume, GitHub). Copy block is inset 11vw from the left.
- Blob on the right (a little larger than originally) with 8 orbiting skill orbs and 3 project satellites; hovering an orb shows a detail. A small quiet hint ("Hover the orbs to explore") sits below the blob and fades once an orb is hovered.

## The blob's journey
One fixed canvas. Pose is a pure function of scroll position and live anchor rects, so it is reversible and never desyncs from layout: hero (right) -> About (left, smaller, no satellites) -> Experience bead -> beside the Projects title, then down a right-edge lane -> Skills (left, medium) -> Publications (right, medium) -> Connect (centre, behind the headline, smaller).

## Sections
- **About** (mauve, white text, frosted cards): statement (solid white, no scroll word-fade), career paragraphs, counters, strengths, education log with coursework always visible ("Coursework:" and "TA:" bold), location pill (Morganville, New Jersey, USA + Open to relocation).
- **Experience** (near-black, mauve glow): pipeline timeline, four roles (IU, Isomerous, TCS, ADP), alternating sides on desktop. Each card leads with an animated metric; all cards open by default and toggle independently. Subline: "Where the work went live."
- **Projects** (hero-blue background, cocoa text): two open flagship cards (no "flagship" badges) with count-up stat tiles, an animated architecture diagram and four "why it is built this way" cards; two collapsible rows below (Hoosier Hub, Trello API CLI) with numbers only. Blob sits beside the title then drifts down the right edge in the background.
- **Skills** (near-black): category cards with chips, trimmed to skills she can be interviewed on; teal/periwinkle titles, no counts; blob on the left in the empty space. Subline: "The technologies behind every system I've shipped."
- **Publications** (mauve): two large paper cards (IEEE 2023 spam filtering; E3S Web of Conferences 2023 cryptography on cloud); blob on the right, medium.
- **Connect** (neutral-violet near-black): headline "Let's build something that lasts." with the availability paragraph (open to full-time software and backend roles, F-1 OPT with STEM extension eligibility through 2029, open to relocation) under it; underline-style form in a soft frosted box; one thin link strip (Email, LinkedIn "Connect", GitHub "View source"); no phone number. Short section.

## Architecture diagrams (Projects)
Inline SVG in the site's glass style: pale rounded boxes, cocoa arrows, black packets travelling along the arrows (hidden under reduced motion), dashed lines for supporting paths. Payment Ledger: API, Postgres + outbox, publisher, Kafka, ledger and notification consumers, Redis (idempotency keys 24h, balance cache 30s TTL) drawn off the money path. AI Agent: discovery agent, capability artifact (draft), human review, replay engine, three outcomes, legacy UI via Playwright, guardrails, evidence logs.

## Not decided yet (ask her)
Fonts; hosting/domain choice; whether to add case-study pages or a blog; active-section highlighting in the nav; whether to drop the body line under the name.
