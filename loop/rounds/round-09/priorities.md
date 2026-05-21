# Round 9 — Priorities (synthesized from 26 critiques)

Notable convergences:
- **Mild conflict tags silent** (Ethics MAJOR + Risk MAJOR + Narrative Design POLISH): the R9 Systems LOOP_REQUEST(narrative) is now the highest-leverage open item — without matching content, the new graduated thresholds are decorative.
- **"Salvages broken things"** (Ethics POLISH + Risk MITIGATION): two reviewers agree this R9 fix needs a re-fix. Risk's "Builds tools that solve problems for people around them" is the cleanest replacement.
- **Wisdom-advice virtue framing** (Psychology MAJOR): same problem R8 fixed for peacemaker — easy parallel fix.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — VISUAL DIRECTOR MAJOR:**
Set `margin: 0` on `#consent-awareness-leadin` wrapper (style.css:3415) so the wrapper's retirement doesn't leave a visible margin gap during fade. The inner `.consent-awareness-note` already owns its margin via the chrome rule — verify and adjust. Pure subtraction.

**Secondary — MOBILE MAJOR:**
Bump divergence-reroll and divergence-dismiss buttons from 24×24 to ≥44×44 (style.css:4106-4126). Expand hit-area via padding/pseudo-element to keep visible size if needed.

**Tertiary — UX MAJOR (route to UX Flow OR Frontend):**
Kids-arc panel `aria-label` → `aria-labelledby`. The h2 IDs are needed first (JS rendering responsibility, UX Flow's surface). Coordinate: UX Flow adds the IDs in `renderKidsArc()`, Frontend updates `index.html:559-561` to reference them. Skip if UX Flow doesn't get to it.

Strict <80 lines.

**Deferred:**
- Visual Director POLISH (REGULATORY_CARDS adjacent-entry margin): defer; tiny CSS tweak; not load-bearing for R10.

---

## SYSTEMS (script.js math)

**Primary — SCIENCE POLISH:**
Add runtime validation (or a code comment + audit) confirming every KIDS_ADULT_FUTURES `tags` entry is a valid ENV_FIELDS key. Currently undefined values may poison the bonus calculation in `generateAdultFutures()` (lines 6817-6836). Smallest version: add a one-liner `Object.keys(ENV_FIELDS_value)` check + warn. **Strict <40 lines.**

**Secondary (if Primary fits): tone-modulation hint on mild tags** —
Add an inline comment near the mild conflict rules clarifying whether the mild bands should weight content selection differently from tier-1 (Narrative Design POLISH). This is a documentation tweak, not a logic change.

**Deferred:**
- Soften binary thresholds (carryover R8 Science POLISH): held; the R9 mild bands now sit just outside tier-1 cutoffs, achieving similar effect.

---

## NARRATIVE (script.js flavor pools) — **highest workload of the round**

**Primary — ETHICS MAJOR + RISK MAJOR (converged, must address):**
Close the R9 LOOP_REQUEST(narrative). Add tagged content to FUTURE_PATHS, KIDS_FUTURE_PATHS, and ADULT_TRACES for the 4 mild tags:
- `OC-mild` (openness/conscientiousness sub-threshold)
- `EN-mild` (extraversion/neuroticism sub-threshold)
- `CO-mild` (conscientiousness/openness sub-threshold)
- `AN-mild` (agreeableness/neuroticism sub-threshold)

**Minimum viable:** 2 entries per tag per pool — 8 new EN strings per pool × 3 pools = 24 EN strings. Translate to zh/ja/ko/tr ONLY if total diff stays under 80 lines. Otherwise add LOOP_REQUEST per language. The picker code already routes through the tag system; just need content.

**Secondary — PSYCHOLOGY MAJOR (parallels R8 peacemaker fix):**
Reframe "Might give surprisingly wise advice for their age" (AN-pleaser) at ~`script.js:3996` with cost-honest language: "May have to be the emotional adult in the room earlier than they should." 5 languages.

**Tertiary — RISK MITIGATION + ETHICS POLISH (converged):**
Replace "Salvages broken things and gives them another life" at KIDS_ADULT_FUTURES[4] (`script.js:4581`) with "Builds tools that solve problems for people around them." Removes economic-constraint-as-trait framing.

**Quaternary (carryover backlog — defer if budget tight):**
- DETECTION MAJOR: "A trait's value depends on who, when, and where" → "A strength with one person becomes a liability with another." (`script.js:1787`)
- DETECTION POLISH (carryover from R8): "Nature did not consult the optimization handbook" → cut or replace. (`script.js:1848`)
- WRITING MAJOR: "Variation is where unexpected combinations come from" (R9 replacement) → "Different traits create unexpected advantages" or grounded equivalent. (`script.js:1786`)
- WRITING POLISH: "Strengths and weaknesses are the same thing in different rooms" → directional. (`script.js:1788`)
- SOCIOLOGY MAJOR: Equipment-ownership KIDS_ADULT_FUTURES entries [4], [14], [20] (`script.js:4577, 4587, 4593`)
- PSYCHOLOGY POLISH: REFLECTION_TRACES "Holds two contradictory beliefs about themselves" (`script.js:2556`)
- SOCIOLOGY POLISH: "ask a cloud" question (`script.js:4434`)

**Strict <80-line total diff.** Pick Primary + Secondary + Tertiary as the floor; address Quaternary only if real budget remains. Honest case: Primary alone (24 EN strings + reasonable per-pool variety) may consume most of the 80 lines.

---

## EDUCATION (HISTORY_CARDS, tooltips)

**Primary — SCIENCE MAJOR (route consideration):**
KIDS_ADULT_FUTURES lacks i18n translations — but this is structurally Narrative's surface (the pool, the headlines). Education won't take this. If Narrative doesn't have budget for it, R10 carries.

**Primary (Education-appropriate):** Pick ONE small subtraction or coherence pass — examples:
- An ENV_CONTEXT_BANDS line that's drifted (re-read each band for consistency)
- A glossary tooltip that's been orphaned
- A HISTORY_CARDS entry whose framing has shifted as nearby copy changed

**Strongly prefer NO CHANGE** if nothing obvious surfaces. R10 is the final round — don't invent work. Pure subtraction over addition.

---

## UX FLOW (rendering, gating, scheduling)

**Primary — UX POLISH:**
Replace `leadin.innerHTML = ''` with `leadin.remove()` (or set `leadin.hidden = true` together) in the retire callback at ~`script.js:4981` and ~`8198`. Fully clear the DOM node — avoids the invisible-wrapper trap. **(script.js:4981, ~8198)**

**Secondary — UX MAJOR coordination:**
Add `id` to each Kids-arc panel's h2 in `renderKidsArc()` at ~`script.js:7351-7397` so Frontend can reference them via `aria-labelledby`. Pure addition, no behavioral change.

**Tertiary — NARRATIVE DESIGN MAJOR (Kids-arc reveal animations):**
Add a small `staggered` data attribute or CSS class to each Kids-arc panel in `renderKidsArc()` so Frontend's CSS can stagger the reveal. Either:
- (A) Add `style="--stage: 1"` (or 2, 3) inline as each panel renders, paired with CSS animation; OR
- (B) Add a class like `kids-arc-panel--stage-N` to each panel.

JS does the structure; CSS would do the actual animation. If Frontend doesn't have budget for the CSS, leave a LOOP_REQUEST(frontend).

Strict <80 lines.

**Deferred:**
- PRODUCT MAJOR (gen-1 analytical panel unlock) — adds new mechanic, out of polish scope.
- PRODUCT POLISH (Adult-mode consequence-context strip at gen 1) — same.

---

## WORLD DESIGN (Adult institutional copy)

**Primary — PLAUSIBILITY MAJOR + POLISH (combined disclosure extension):**
Extend the "On the classification shorthand." REGULATORY_CARDS entry (R9-split) to also disclose:
- **RA-N channel codes** (RA-1 through RA-5) as diegetic access-routing markers
- **Rule-set prefixes** (GE-, EM-, RES-, APP-, ATH-) as simulation-internal identifiers

Single card extension, pure addition. ~30 lines. **(script.js — "On the classification shorthand." entry)**

**Secondary (if Primary fits): coherence check on the now-extended card.**
Re-read for kitchen-sink syndrome (R8 → R9 split was the original fix; don't re-cluster). If the card is now too dense, hold and defer.

**Strict <80-line diff.** Strong preference for additions to the existing entry over creating a third card.

---

## Cross-cutting deferrals (R10 final round, then halt)

- **Move consent-awareness AFTER projection** — held since R7.
- **Pre-allocation slider gate** — still held.
- **"Inheritance Burden Index" → "Identity Lock-In Index" rename** — still held.
- **Life-shape milestone tagging refactor** — multi-round.
- **Kids-mode onboarding panel** (Product MAJOR R8) — adds new mechanic.
- **ADULT_TRAJECTORY_MILESTONES linear-language refactor** (Psychology POLISH R8) — beyond polish.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
- **Cross-locale i18n fallback policy** — UX-architecture.
- **Narrative Quaternary backlog** — likely carried to R10.
