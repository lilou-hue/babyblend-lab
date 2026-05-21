# Round 11 — Priorities (synthesized from 26 critiques)

Top convergences:
- **KIDS_ADULT_FUTURES equipment-ownership** (Ethics MAJOR + Psychology MAJOR + Sociology MAJOR) — 3 reviewers converged on the persistent carryover. R11 Narrative must address.
- **R11 Narrative's new line** (UX MAJOR + Writing MAJOR) — UX flags length/wrap; Writing flags template + "one"-cluster repetition.
- **Diegetic shorthand expansion** (Plausibility MAJOR + POLISH) — World Design.
- **Mobile touch targets** (Mobile MAJOR + POLISH) — Frontend.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — VISUAL DIRECTOR MAJOR:**
Add `.priority-row` to the existing `@media (prefers-reduced-motion: reduce)` block at `style.css:3535` to disable its 0.12s state-change transition. Pure addition.

**Secondary — MOBILE MAJOR:**
Bump consent-acknowledgment button to 44×44 minimum on mobile breakpoint. `style.css:3463` — add `min-height: 44px; min-width: 44px;` and `padding: 10px 16px;` inside `@media (max-width: 640px)`.

**Tertiary — MOBILE POLISH + Visual Director POLISH:**
- Intro skip link 44×44 on mobile (`style.css:4599`)
- Remove orphaned blank line at `style.css:3529` (artifact from R11's reduced-motion-block removal)

**Quaternary — PRODUCT POLISH (route consideration):**
Environmental Influences `<details>` expand-by-default. `index.html:264`. Structural HTML edit, Frontend's surface. **But note:** opening it by default changes default density on first paint — coordinate with UX Flow. If UX Flow doesn't object, ship; otherwise defer.

Strict <80 lines.

---

## SYSTEMS (script.js math)

**No primary** — most R11 reviewer-flagged Systems-adjacent items routed elsewhere:
- Science MAJOR (sibling-cohort overclaim at 8975-8976) → World Design's institutional copy surface
- Product MAJOR (humanity-reminder cadence) → UX Flow's scheduling surface

**Possible discretionary item:**
Add the schema validator from Risk MITIGATION — a small dev-mode warn for `-mild` tagged entries lacking `i18n.{lang}` slot. ~15-20 lines extending R9's existing audit IIFE.

**Otherwise NO CHANGE.** Don't invent work.

`node --check script.js` MANDATORY if you edit.

---

## NARRATIVE (script.js flavor pools)

**Primary — ETHICS MAJOR + PSYCHOLOGY MAJOR + SOCIOLOGY MAJOR (CONVERGED — 3 reviewers):**

KIDS_ADULT_FUTURES entries [4]/[14]/[20] equipment-ownership reframe. Find with `grep -n "magnifying glass\|friendliest telescope\|Photographs every interesting bird\|art on their walls\|instruments hanging on a wall" script.js`. Replace possession-coded details with skill/practice framing in all 5 languages. **Suggested replacements:**
- [4] scientist — "Owns three kinds of magnifying glass" → "Notices the small differences everyone else walks past" or "Knows the names of every plant in the lot near home"
- [14] musician — "Has at least two instruments hanging on a wall" → "Borrows instruments from anyone who'll lend, plays whatever lands in their hands"
- [20] astronomer — "Owns the friendliest telescope in town" → "Knows the night sky so well they teach others"

Heavy: ~3 entries × 5 langs × ~2 strings each = ~30 string edits. Probably 50-65 lines diff.

**Secondary (if Primary fits in <50 lines) — DETECTION MAJOR (R10 carryover):**
HUMANITY_REMINDERS line 1799 "A weakness in one room might be exactly what the next room needs" — false-symmetric template. Replace with directional language across 5 langs. ~8-10 lines.

**Tertiary — WRITING MAJOR (R11's own new line still templated):**
REFLECTION_TRACES line 2697 needs second-pass concretizing. Replace "Says one thing about themselves at work, the opposite to a stranger on a train" with "Tells work they're careful with rules, tells a train stranger they break them for good reasons" OR a different non-symmetric concrete example. 5 langs.

**Quaternary (lower priority):**
- DETECTION POLISH: NATURAL_VARIATION_MESSAGES line 1858 "Difference is information, not error" — platitude template (R10 carryover)
- WRITING POLISH: "one" repetition cluster in REFLECTION_TRACES — vary 3-4 instances
- ETHICS POLISH + SOCIOLOGY POLISH: KIDS_QUESTIONS_FOR_THEM[16] "ask a cloud"

Strict <80-line total diff. Ship Primary if it fits alone (likely). Pick Secondary or Tertiary only if budget remains.

`node --check script.js` MANDATORY.

---

## EDUCATION

**Primary — PSYCHOLOGY POLISH:**
OCEAN slider hints expand to show trait-context interdependence. Find the Kids OCEAN hint strings (likely `KIDS_OCEAN_TOOLTIP` or per-trait `KIDS_EXPLAINERS`). Add one parenthetical-or-clause-per-trait showing tension/cost — e.g., Curiosity: "Loves asking questions (sometimes gets in trouble for asking too much)."

Either:
- (A) Add the tension to all 5 OCEAN traits in EN + translate
- (B) Add it just to 1-2 highest-leverage traits (Curiosity / Kindness)

(B) is the lighter move. Pick that if you're at all unsure about scope.

Max <40 lines. **`node --check script.js` MANDATORY.**

**Alternative — NO CHANGE.** 4th consecutive Education NO CHANGE is fine; the pedagogical surface is genuinely stable.

---

## UX FLOW (rendering, gating, scheduling)

**Primary — NARRATIVE DESIGN POLISH (panel reorder):**

Reorder Adult-mode gen ≥ 2 panel rendering: Trait History → Sibling Cohort → Societal Brief. The variance panel breaks the optimization-critique cluster. `script.js:6393-6394`. Should be a one-call-order swap.

**Secondary — PRODUCT MAJOR (humanity-reminder cadence):**

Change `showHumanityReminder()` firing to every generation (not every 3rd) and bump auto-hide from 5.5s → 8s. `script.js:8281`. Look at the existing call sites and the cadence gating.

**Tertiary — NARRATIVE DESIGN MAJOR (Pause Panel reflection question synthesis):**

Anchor the Pause Panel reflection question to one of the preceding-panel contexts (work/family/alone/other) or life stage (7/17/35/70). `script.js:6569-6586`. **Higher complexity** — adds dependency between Pause Panel and prior panel state. Consider deferring if Primary + Secondary fill the budget.

Strict <80 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN (Adult institutional copy)

**Primary — SCIENCE MAJOR (sibling-cohort overclaim, routed):**

`script.js:8974-8976` — "pressure will travel with the line" / "statistically unlikely that a new mutation wouldn't be locked in across the family tree" overstates deterministic transmission. Reframe to probabilistic / environment-mediated. **Suggested replacement:** "The genetic basis for this pressure is likely to be inherited; individual expression remains contingent on environment and development."

Verify the exact string first (line numbers may have shifted). 5 langs if i18n'd.

**Secondary — PLAUSIBILITY MAJOR (licensed clinics / reference centres disclosure):**

Extend "On the classification shorthand." REGULATORY_CARDS entry to name "licensed clinic," "reference centre," and "designated reference centres" as simulation-internal institutional markers (analogous to RA-channel codes). Single-sentence addition. 5 langs.

**Tertiary — PLAUSIBILITY POLISH (HFEA-equivalent):**

Either define "HFEA-equivalent" in the same card OR replace with a clearly-diegetic alternative like "accreditation-tier-equivalent." Find with `grep -n "HFEA-equivalent" script.js`. 5 langs if i18n.

Strict <80-line diff. Pick Primary + Secondary; Tertiary if budget remains.

`node --check script.js` MANDATORY.

---

## Cross-cutting deferrals (held for R12+)

- **R11 Narrative line wrap in TR/KO** (UX MAJOR) — wait until R11 Narrative rev settles to see if the replacement still has the length issue.
- **Risk MAJOR: 24 mild-tag entries translation (zh/ja/ko/tr)** — heavy (~60+ lines); held for translator pass.
- **Narrative Design MAJOR (Pause Panel synthesis)** — if UX Flow defers it.
- **"Inheritance Burden Index" rename** — still held.
- **Move consent-awareness AFTER projection** — still held.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
