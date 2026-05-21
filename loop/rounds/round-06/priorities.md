# Round 6 — Priorities (synthesized from 26 critiques)

Phase 4 revision builders should each address the items below. Strict <80-line diffs, ownership-locked. Where multiple items target the same builder, pick the highest-leverage one first; address the second only if budget remains.

---

## FRONTEND (style.css, structural HTML)

**Primary — UX MAJOR + VISUAL DIRECTOR MAJOR (combined a11y + Kids-palette pass):**
- Add `:focus-visible` to `.kids-arc-panel li` matching the accent ring used elsewhere. **(style.css:5169)** [UX MAJOR]
- Override `.style-btn.is-active` and `.gender-btn.is-active` in Kids mode (`body.app-kids` scope) to use warm amber/pink accent rather than cyan/purple gradient. **(style.css:1212-1223)** [VISUAL DIRECTOR MAJOR]
- Bump `.kids-arc-panel li` border opacity from 20% to ~45% so the list reads as a list. **(style.css:5172, 5181, 5201, 5204)** [UX POLISH]

**Secondary (if budget) — MOBILE MAJOR:**
- Parent randomize button 28×28 → 44×44 (or expand hit area via padding). **(style.css:368-369)**

**Deferred to R7 (out of scope for one 80-line diff):**
- Visual Director POLISH (`kids-arc-panel { grid-template-columns: 1fr 1fr }`) — likely already implicit in flex/auto-fit; verify before adding rule.
- Mobile POLISH `aria-live` + focus-visible on `.consent-panel .consent-row` — needs coordination with UX Flow's consent-awareness placement work below; defer to R7 once that lands.

---

## SYSTEMS (script.js math, constants, invariants)

**Primary — SCIENCE MAJOR:**
- Re-derive the heritability comment at script.js:3852. PERSONALITY_SIGMA=1.75 produces ±3.5 on a 1–10 scale, which is closer to ~30–40% heritability than the comment's claimed "~50%". Either (a) update the comment to state the actual implied heritability and cite the source, or (b) raise PERSONALITY_SIGMA toward 2.3–2.4 to match the comment (but this propagates — check `DISPARITY_VARIANCE_K` interactions). Prefer (a). **(script.js:3852)**

**Secondary (if budget) — PSYCHOLOGY MAJOR:**
- Add a graduated `OC-mild` (and equivalents for other tags) to TRAIT_CONFLICT_RULES so sub-threshold tensions surface scaled futures rather than nothing. **(script.js:5492-5497)**

**Deferred:**
- Psychology POLISH (tag every ADULT_TRAJECTORY_MILESTONE by life-shape and weight selection) is a multi-round refactor; defer to a future round.

---

## NARRATIVE (script.js flavor pools)

**Primary — DETECTION MAJOR + WRITING MAJOR (the two AI-sounding lines):**
- Replace "A simulator cannot anticipate a single real Tuesday afternoon." with a concrete statement about what simulation actually misses (e.g., the way a particular relationship will fail, the accident no one rehearses). **(script.js:1483)** [DETECTION MAJOR]
- Replace "Smells faintly of old paper, in the best way" with grounded sensory specificity ("Smells like dust and library glue" or similar), or cut entirely. **(script.js:3232)** [WRITING MAJOR]

**Secondary (if budget) — DETECTION POLISH + WRITING POLISH:**
- Desymmetrize "A garden, kept badly, loved deeply." → "A garden they kept badly but loved anyway." **(script.js:2375)**
- Replace "Everyone has something amazing inside them" with concrete texture matching KIDS_DIFFERENCES. **(script.js:3259)**

**Tertiary — SOCIOLOGY MAJOR:**
- Add 3–4 precarious-work futures to KIDS_ADULT_FUTURES (someone who works several part-time jobs; someone whose first career didn't pay enough; someone who took years out to care for a parent). **(script.js:3222-3246)**

Three buckets; pick the top one and ship. Translate any new EN strings into zh/ja/ko/tr only if the diff stays <80 lines total (otherwise leave `LOOP_REQUEST(translator)` comments).

**Deferred:**
- Sociology POLISH (Appearance enhancement mechanism naming) — that's Adult-mode regulatory copy, route to World Design.

---

## EDUCATION (HISTORY_CARDS, kids explainers, tooltips)

**Primary — RISK MAJOR + MITIGATION:**
- Add a single sub-header line under each of the 3 new Kids-mode arc panels (Things they might love / Questions you could ask them / What might make them them) framing them as "Not predictions from genes. Reminders of all that won't fit in a slider." or similar inoculation against deterministic reading. **(script.js:5844, 5859, 5875)**

**Secondary — SCIENCE POLISH:**
- Update the Yengo 2022 citation in HISTORY_CARDS from "~12,000 independent variants" to "~9,100 independent signal regions" (or cite the raw SNP count separately). **(script.js:2967)**

**Tertiary — ETHICS POLISH:**
- In Lifetime Drift, replace "The optimization targets you chose" with "The possibilities you imagined" when running in Kids mode (mode-switched copy). **(script.js:5826)** *Note: if this lives in shared narrative copy, leave for Narrative — route based on file structure.*

**Deferred:**
- Plausibility issues (Oviedo Recital 6, HFEA section codes) — that's institutional/regulatory text, route to World Design.

---

## UX FLOW (onboarding, transitions, reveals, gating)

**Primary — NARRATIVE DESIGN MAJOR:**
- In Kids mode (`body.app-kids`), suppress the trait-conflicts render entirely so the 3 arc panels stand as the sole thematic conclusion. The diagnostic framing ("A careful, sometimes worried kid") clashes with the affirmation register of the arc. **(script.js:4386, 4368)**

**Secondary — ETHICS MAJOR:**
- When a Kids-mode slider is moved >1.0 unit away from the midparent value, render a single soft acknowledgment line near the slider ("You're imagining possibilities — no actual choices are being made here") rather than a modal or gate. Pure-text, no animation. **(script.js:4185, 5875)**

**Tertiary (if budget) — NARRATIVE DESIGN POLISH:**
- Remove the Kids-mode reflection-prompt or reposition it as a prelude before the arc. **(script.js:4413, 3248)**

**Deferred:**
- Product MAJOR (consent-awareness placement / personality-stats gating) — significant restructure; needs its own round.
- Product POLISH (Burden Index idle baseline) — defer with the Product MAJOR; address as a paired pass next round.

---

## WORLD DESIGN (Adult institutional copy)

**Primary — PLAUSIBILITY MAJOR:**
- Remove "(Recital 6)" from the Oviedo Art. 13 citation. Conventions don't have Recitals. **(script.js:2882)**

**Secondary — PLAUSIBILITY POLISH:**
- Replace invented "§3ZA" and "§4A" with real HFEA structural references (cite Schedule 2 directly, which is real). **(script.js:5969-5971)**

**Tertiary — SOCIOLOGY POLISH:**
- Reframe the Appearance enhancement outcome rule to name the mechanism rather than presenting beauty conformity as inevitable. **(script.js:5661)**

---

## Cross-cutting deferrals (tracked for R7+)

- Life-shape milestone tagging refactor (Psychology POLISH) — Systems/Narrative collab, multi-round.
- Consent-awareness panel placement restructure (Product MAJOR + POLISH) — UX Flow round of its own.
- `aria-live` + focus-visible on `.consent-panel .consent-row` rows — Frontend, after the UX Flow restructure lands.
- Translator pass on any new EN strings added in R6 revisions — assign to Narrative R7.
