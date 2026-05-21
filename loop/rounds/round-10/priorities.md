# Round 10 — Priorities (synthesized from 26 critiques)

**Final round of Batch 2.** Focus on closing what R6-R9 opened. Strong cross-reviewer convergence:
- **Kids-arc stagger animation** (Visual Director MAJOR + Narrative Design MAJOR + Product MAJOR + Risk MAJOR) — 4 reviewers from different angles. Frontend must adjust.
- **R10 Narrative replacements still templated** (Detection MAJOR + Writing MAJOR) — the R10 Phase-1 fixes need re-fixing.
- **Equipment-ownership KIDS_ADULT_FUTURES** (Sociology MAJOR + Ethics POLISH) — open carryover; R10 Narrative deferred it; now flagged again.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — Kids-arc stagger animation correction (4 reviewers convergent):**

Combined fixes:
- **Duration**: 0.32s → 0.5s (matches fadeUp / parent-advanced-reveal motion language). [Visual Director MAJOR]
- **Stagger intervals**: 0s / 0.3s / 0.45s → 0s / 0.3s / 0.6s (uniform 0.3s steps — Narrative Design MAJOR) OR 0s / 0.2s / 0.4s (uniform 0.2s steps — Visual Director POLISH). Pick the slower cadence (0.3s steps) per Narrative Design MAJOR's "wonder cadence" framing.
- **Heading vs. disclaimer animation**: stagger the `.kids-arc-disclaimer` 0.15-0.2s AFTER its heading so disclaimer doesn't co-emerge with the optimistic outcomes (Risk MAJOR + MITIGATION). Or alternative: elevate disclaimer typography (drop `.subtle`, bump font-size, darker color) per Ethics MAJOR.

**Recommendation: ship the stagger fixes + bump disclaimer typography.** Both address overlapping reviewer concerns. The R7 Education deliberate de-stacking decision suggests the disclaimer prominence is the right lever to pull.

**Secondary — MOBILE MAJOR:**
Reduce `.kids-arc-panel` horizontal padding from 28px to 18px at `@media (max-width: 640px)`. (style.css:5199)

**Tertiary — UX POLISH (mobile-specific stagger):**
Optionally disable or shorten stagger delays under <640px so vertically-stacked panels don't compete with reading.

Strict <80 lines. Pure CSS work (no HTML edits needed for these items).

---

## SYSTEMS (script.js math, copy ownership ambiguity here)

**Primary — SCIENCE MAJOR (sibling cohort overstatement):**

Reframe the sibling-cohort label at `script.js:7871` from "Five equally-probable outcomes from identical parental inputs and allocation. The variance IS the projection's confidence interval, rendered as people." → "Five plausible outcomes showing the uncertainty range of parental-input-based inheritance estimates — not behavioral probability."

**Note on ownership:** This is technically copy (rendered to user), but it sits inline with the simulation/render logic. Owning surface ambiguity — Systems can take it as a label tied to the model's confidence-claim, OR route to World Design as institutional/explanatory copy. Pick whichever has remaining budget; if both pick it up, World Design wins (it's their natural surface).

**If skipped (e.g., World Design takes the cohort label):** NO CHANGE for Systems. Don't invent work.

Strict <40 lines. `node --check script.js` MANDATORY if you edit.

---

## NARRATIVE (script.js flavor pools) — **pick 2-3 closing items**

**Primary — DETECTION MAJOR (R10's own replacement still templated):**

R10 Phase 1 Narrative replaced "A trait's value depends on who, when, and where" with "A strength with one person becomes a liability with another" — but that's still a false-symmetric template. Replace at `script.js:1798` with a concrete example or remove the line:
- Concrete: "Stubbornness saves you under fire; costs you in meetings."
- Removal: just delete the line, let neighbors carry the weight.

5 langs. ~10-12 lines.

**Secondary — WRITING MAJOR (R10's other own replacement):**

Replace "Variation exists beyond any design template" at `script.js:1859` with concrete claim. Suggestions: "Nature did not consult a design handbook" (preserves R7 carryover spirit), or "No template accounts for the friends you'll make." 5 langs. ~8-10 lines.

**Tertiary — DETECTION POLISH ("What looks weak in one room…" still template):**

Replace at `script.js:1799` OR remove. Suggested replacement: "A weakness in one room might be exactly what the next room needs." 5 langs. ~8-10 lines.

**Quaternary — SOCIOLOGY MAJOR (equipment-ownership cluster — heaviest, may not fit):**

Reframe KIDS_ADULT_FUTURES entries [4], [14], [20] across 5 languages. KIDS_ADULT_FUTURES now has full i18n, so each entry = ~6 string changes × 3 entries = 18 string edits. Likely 40-60 lines on its own. **Only if Primary/Secondary/Tertiary fit comfortably under 30 lines combined.**

**Quinary — DETECTION + WRITING POLISH carryovers (defer if budget tight):**
- "Difference is information, not error" (script.js:1858) — platitude template
- KIDS_QUESTIONS_FOR_THEM[16] "ask a cloud" (Sociology POLISH)
- REFLECTION_TRACES "Holds two contradictory beliefs about themselves at all times" (script.js:2697) — Psychology MAJOR

**Translation policy:** translate all changes; if total exceeds 80 lines, ship Primary+Secondary+Tertiary and defer the rest.

---

## EDUCATION

**Primary — SCIENCE POLISH:**

Polderman 2015 citation precision — "~17,800 traits" → "~17,800 phenotypes across twin studies." Pure precision fix. (script.js:4091, plus any zh/ja/ko/tr parallel if i18n'd)

If the citation isn't translated (EN-only), the diff is ~1 line.

**Likely NO CHANGE if Polderman text doesn't actually need precision adjustment.** Re-verify before editing — R8 already touched Yengo, R6 anchored Oviedo. Polderman may already be precise enough.

---

## UX FLOW

**Primary — UX MAJOR (aria-labelledby timing):**

Currently `index.html:559-561` has `aria-labelledby="kids-loves-title"` (etc.) on the panel sections, but the h2 elements with those IDs are injected by `renderKidsArc()` at runtime — screen readers traversing on initial load find unlabeled sections.

Two approaches:
- (A) Add static h2 stubs with IDs to `index.html` (even with placeholder text), let renderKidsArc update the text. Atomic from the static markup's perspective.
- (B) Move the `aria-labelledby` attribute assignment into the JS render path so it's set when the h2 is injected.

**Recommendation: (B).** Less HTML churn, cleaner separation.

Strict <40 lines. `node --check script.js` MANDATORY.

**Secondary (if Primary fits): MOBILE POLISH (a11y):**
Add unique IDs to each Kids-arc disclaimer paragraph + `aria-describedby` on each section pointing to its disclaimer.

---

## WORLD DESIGN

**Primary — PLAUSIBILITY MAJOR (IOC Aligned Federation):**

Extend "On the classification shorthand." REGULATORY_CARDS entry to name "IOC Aligned Federation framework" (appears in ATH-athleticism rule at script.js:4016) as a diegetic sanctioning body — not a real Olympic-affiliated entity. Single-sentence addition.

**Secondary — PLAUSIBILITY POLISH (insurance industry concepts):**

Same disclosure entry: add a phrase covering the RES-resilience rule's insurance-industry concepts ("Insurer notification," "depression-care coverage," "carriers") as diegetic simulation framework, not real industry standards. ~1-2 lines.

Verify the card doesn't regress into kitchen-sink territory. If both additions would push the card past ~5 sentences, ship Primary only.

Strict <40 lines.

---

## Cross-cutting deferrals (R10 is the final round — these carry past Batch 2)

- **Move consent-awareness AFTER projection** — Product MAJOR R7, still flagged R10. Architectural change, beyond polish.
- **Pre-allocation slider gate** — held since Batch 1.
- **"Inheritance Burden Index" → "Identity Lock-In Index" rename** — held.
- **Life-shape milestone tagging refactor** — multi-round, beyond polish.
- **Kids-mode onboarding panel** — adds new mechanic.
- **ADULT_TRAJECTORY_MILESTONES linear-language refactor** — beyond polish.
- **Mild-tag content i18n** — R9 LOOP_REQUEST(translator) still open for zh/ja/ko/tr across 24 EN entries.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
- **Cross-locale i18n fallback policy** — UX-architecture.
- **Sibling-cohort label** (if Systems doesn't take it) — Science MAJOR R10.
- **Psychology MAJOR (R10)** "Holds two contradictory beliefs" — if Narrative doesn't fit it.
- **Equipment-ownership KIDS_ADULT_FUTURES cluster** — if Narrative doesn't fit it.
- **Sibling cohort + linear ADULT_TRAJECTORY_MILESTONES** — Psychology POLISH.

These items are now permanent carryovers — Batch 2 was scoped to 5 polish rounds and the loop will halt after R10. The batch-2-summary.md will collect them as "open after Batch 2."
