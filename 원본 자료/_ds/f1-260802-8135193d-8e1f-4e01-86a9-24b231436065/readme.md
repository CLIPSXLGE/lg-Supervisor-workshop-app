# APEX GP — Race Design System

A motorsport broadcast-graphics design system. **APEX GP** is an original, unaffiliated racing
brand created for this project: the look is drawn from the visual *language* of modern Formula 1
broadcast and social graphics — carbon-black fields, skewed livery bars, enormous condensed
numerals, tyre-compound colour coding — without reproducing any real series' or team's marks.

> **Brief given:** `F1레이스_260802` — "F1 레이싱 컨셉으로 해줘" (make it an F1 racing concept).

## Sources given

| Source | What it is | Where it lives now |
|---|---|---|
| `esamanru Bold / Medium / Light .ttf` | Korean+Latin core typeface, 3 weights | `assets/fonts/` |
| 9 reference JPGs | Mood/reference screenshots of real F1 broadcast graphics, posters, a web concept and a tablet-app concept | `assets/reference/` |

No codebase, Figma file, deck or logo was provided. There is therefore **no brand logo** in this
system: wherever a mark would go, the wordmark `APEX GP` is set in the display face
(Saira Condensed 900, skewed −9°). Do not draw one.

**The reference JPGs are mood only.** They contain third-party logos, driver likenesses and
copyrighted photography. They must never be shipped inside a deliverable, and their team marks
must never be redrawn. They exist so a designer can check the *visual grammar*.

---

## CONTENT FUNDAMENTALS

**Voice.** Terse, declarative, broadcast. Copy is a caption over a moving image, not a paragraph.
The system speaks in **facts and numbers**; the drama comes from typography, not adjectives.

- **Casing.** Titles and labels are **UPPERCASE** (`DRIVER STANDINGS`, `FASTEST LAP`,
  `LONGEST STINT`, `NEXT ROUND`). Sentence case is reserved for the one or two lines of
  supporting body copy under a title.
- **Length.** Titles: 1–3 words. Eyebrows: 1–4 words. Body: max two lines, ~20 words.
- **Person.** No "I". "You" only in product UI for the viewer's own things — `MY RACES`,
  `MY FEED`. Editorial copy is impersonal third person: "A historic 10th Constructors'
  Championship was sealed under the lights in Singapore."
- **Numbers are the headline.** A position, a points total, a lap time or a lap count is the
  largest thing on the surface. Never spell a number out; never round a lap time
  (`1:20.305`, not `~1:20`).
- **Timing format.** Lap `M:SS.mmm` (`1:34.742`), gap `+S.mmm` (`+0.284`), interval to leader
  `+MM:SS.mmm`, session clock `HH:MM:SS`. Always tabular figures.
- **Korean.** Korean copy is set in esamanru and follows the same terseness:
  `드라이버 순위`, `가장 빠른 랩`, `다음 라운드`. Korean does not get letter-spacing;
  Latin uppercase labels do (`.16em`).
- **Emoji: never.** Country flags appear as flag *graphics* supplied by the user, never as emoji.
- **Punctuation.** No exclamation marks. No ellipses. Hyphen-free compounds where possible
  (`PIT LANE`, `GRID SLOT`).

Examples that are on-voice: `LINE UP 2025` · `POS 1 — CARLOS SÁINZ #55` · `FASTEST LAP`
`HARD C2` · `PAIXÃO, SOM E FÚRIA` (a three-word tagline, all caps, italic).
Off-voice: "Check out the amazing results from this weekend's thrilling race! 🏁"

---

## VISUAL FOUNDATIONS

### Colour
Near-black is the page, not a theme. `--bg-page: #06070A` carbon; cards a half-step up
(`#111318`). **One saturated accent at a time**: race red `#E10600` for the brand, or a *livery*
colour when a card represents a team/entity (teal, orange, blue, azure, yellow, green, magenta,
violet, silver). Colour identifies an entity — it is never decoration. Tyre compounds are a fixed,
non-negotiable code: soft red, medium yellow, hard white, intermediate green, wet blue. Timing has
its own fixed code: purple = session best, green = personal best, yellow = slower.
Max two hues per surface plus carbon and white.

### Type
Three families. `--font-display` (Saira Condensed, 700–900, UPPERCASE) for every title.
`--font-numeric` (Saira Semi Condensed, 800–900, tabular) for every figure — often skewed −9°.
`--font-core` (esamanru) for body, UI labels and all Korean. Display type is set **tight**
(line-height .86–1.0) and often at 72–112px; body never exceeds 17px. The scale is deliberately
bimodal: huge or small, nothing in between.

### The skew
The signature motif is a **−9° parallelogram**: standings bars, position chips, tyre badges,
livery stripes, the wordmark. Cut with `clip-path` or `transform: skewX(var(--italic-skew))`,
with the child text counter-skewed back to upright when it must stay readable. Rows of bars
overlap at the skew so the grid reads as speed.

### Backgrounds
Full-bleed dark photography with a bottom or left **scrim** (`--scrim-bottom`) for text
protection — never a capsule behind text over an image. Where there is no photo, carbon plus one
of three near-invisible textures: 45° carbon weave, 32px technical grid, or 100° speed lines
(all in `--texture-*`). Podium/hero blocks use a single diagonal accent gradient
(`--grad-accent`, 100°). **No blue-purple gradients, ever.**

### Cards, borders, radii
Hardware, not software: `--radius-2` (4px) on cards and controls, `--radius-1` on chips,
**0px on bars, stripes and data rows**. Cards are a flat surface tint with a 1px hairline
(`rgba(255,255,255,.08)`) — no soft drop shadow at rest; elevation comes from the surface step.
Shadows appear only on things that truly float (dialog `--shadow-3`, menu `--shadow-2`) and on the
accent CTA (`--shadow-accent`). A left-edge accent stripe on a card is allowed **only** when it
encodes a team/tyre colour, and it is a hard 4px block, not a rounded border.

### Elevation, transparency, blur
Glass is used sparingly and only for overlays that sit on live content: sticky headers and the
timing HUD use `background: var(--scrim-glass); backdrop-filter: var(--blur-glass)`. Nothing else
is translucent.

### Motion
Fast in, controlled out. `--dur-2` (150ms) for control states, `--dur-3` (240ms) for panels,
`--ease-out` = `cubic-bezier(.16,1,.3,1)` — off the line quickly, settles without bounce. There
are **no bounces and no spring overshoots**. Entrances slide 12–24px along the skew axis while
fading. Live data (a changing lap time, a position swap) flashes its cell with the timing colour
for 700ms, then decays. Respect `prefers-reduced-motion` — all durations collapse to 0.

### Interaction states
- **Hover:** surface steps one level lighter (`--surface-card-hover`), or accent lightens to
  `--red-400`. Never opacity-fade a whole element.
- **Press:** colour darkens to `--accent-press` **and** `transform: translateY(1px)` — no scale.
- **Focus:** 2px carbon gap + 2px red ring (`--focus-ring`). Always visible, never removed.
- **Disabled:** 40% opacity, no colour change, `cursor: not-allowed`.
- **Selected:** filled accent, or a 2px bottom accent rule for tabs.

### Layout
12-column, `--max-content: 1280px`, 24px gutters (48px ≥1280). Data screens are full-bleed with
a fixed header and a fixed left rail. Vertical rhythm on the 4px space scale; 24px is the default
gap between blocks, 40–56px between sections. Bars in a standings list are **flush — 2px apart,
no rounding** — so the list reads as a bar chart.

### Imagery
Cool, high-contrast, dark. Driver/car cut-outs on a flat livery-colour field are the house
treatment; photography is desaturated except for the livery colour, with a hard vignette. Slight
grain is acceptable; warm filters, soft focus and lens flare are not.

---

## ICONOGRAPHY

No icon set was supplied. **Substitution flagged:** the system uses
[**Lucide**](https://lucide.dev) from CDN (`https://unpkg.com/lucide@latest`) — 2px stroke,
`stroke-linecap: round`, 24px grid — because its stroke weight is closest to the thin technical
marks in the reference graphics. Sizes: 16 / 20 / 24px, always `currentColor`, never filled.

- **No emoji, ever**, and no Unicode pictographs as icons.
- Motorsport marks that Lucide lacks (chequered flag, tyre compound ring, DRS, pit board, sector
  arrows) are drawn as **type + geometry from the system itself** — e.g. the tyre compound badge is
  a `C2`/`C3` label in a coloured ring, the chequered flag is a 4px CSS checkerboard, sector deltas
  are skewed blocks. This keeps them consistent and avoids hand-rolling detailed SVGs.
- Country flags and team marks must be **supplied as image assets by the user** — the system
  renders them into a fixed 20×14 slot and will show an empty slot until real files exist.

---

## Index

| Path | What |
|---|---|
| `styles.css` | Global entry — `@import` list only. Link this one file. |
| `tokens/` | `fonts` · `colors` · `typography` · `spacing` · `effects` · `motion` · `base` |
| `assets/fonts/` | esamanru Light / Medium / Bold |
| `assets/reference/` | Mood references (third-party content — do not ship) |
| `guidelines/` | Foundation specimen cards (Design System tab) |
| `components/core/` | Button, IconButton, Badge, Tag, Card, Tabs, Dialog, Toast, Tooltip |
| `components/forms/` | Input, Select, Checkbox, Radio, Switch |
| `components/race/` | StandingRow, PositionPodium, StatTile, TyreCompound, LapTime, SectorBar |
| `ui_kits/race_center/` | Desktop race-centre web app (4 screens) |
| `ui_kits/companion_app/` | Mobile companion app (4 screens) |
| `SKILL.md` | Agent-Skills entry point |

### Intentional additions
No source defined a component inventory, so the standard primitive set was authored. The
`components/race/` group is an addition — the reference material is entirely timing/standings
graphics, and those six primitives are the vocabulary every one of those graphics repeats.

### Open substitutions to resolve
1. **Display typeface** — Saira Condensed stands in for the wide-condensed racing face in the
   references. Supply the real file and swap `tokens/fonts.css`.
2. **Icons** — Lucide stands in for an unsupplied set.
3. **Logo** — none supplied; wordmark only.
4. **Flags / team marks / photography** — none supplied; slots render empty.
