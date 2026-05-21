# Round 11 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Notable convergences:
- **KIDS_ADULT_FUTURES equipment-ownership** (Ethics MAJOR + Psychology MAJOR + Sociology MAJOR) — 3 reviewers converged on the carryover from R8/R9/R10. Highest-leverage Narrative item.
- **R11 Narrative's own new line** (UX MAJOR + Writing MAJOR) — UX flags length / line-wrap; Writing flags lingering false-symmetric template + over-repetition of "one" across REFLECTION_TRACES.
- **Diegetic shorthand expansion** (Plausibility MAJOR + POLISH) — yet more undisclosed institutional terms.
- **Mobile touch targets** (Mobile MAJOR + POLISH) — small a11y items still surfacing.

---

## 1. UX REVIEWER

**MAJOR:** R11 Narrative's new REFLECTION_TRACES line in TR (84 chars) and KO (~90 chars) wraps to 3 lines in the 2×2 trace-card grid, creating visual imbalance against shorter sibling traces. **Recommendation:** Shorten TR + KO variants by ~15 chars, OR add a per-pool max-character soft cap during translation. (script.js:2697 + zh/ja/ko/tr parallel lines)

**POLISH:** R11 Systems' comment "Reserve 1 of 3 future picks (~33%)" — the parenthetical percentage is imprecise (1/3 = 33.33% repeating, "~33%" reads as approximation when the math is exact). **Recommendation:** Change to "Reserve 1 of 3 future picks" — drop the parenthetical; the fraction is self-evident. (script.js — `CONFLICT_RESERVED_PATHS` site)

---

## 2. ETHICS REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES entries [4]/[14]/[20] embed material-resource access ("Friends always have art on their walls" / "Has at least two instruments hanging on a wall" / kitchen-equipped baking) as identity-aspiration prerequisite — a child from a precarious-housing background reads these as "becoming yourself requires wealth." Distinct from the institutional-bias work Batch 2 closed: this is class assumption woven into what *self-becoming* means for kids. **Recommendation:** Decouple identity from possession — e.g., "Friends ask them to draw on cards and notes" (art doesn't require wall ownership); "Borrows instruments from anyone who'll lend" (musician doesn't require instrument ownership). (script.js — KIDS_ADULT_FUTURES entries [4]/[14]/[20])

**POLISH:** KIDS_QUESTIONS_FOR_THEM[16] "What is a question you would ask a cloud?" assumes outdoor leisure time + space — the question is asking about a resource (free time, safe outdoor space) not a trait. **Recommendation:** Replace with curiosity that's class-neutral: "What's something you'd want to know if you could ask anything?" (script.js — KIDS_QUESTIONS_FOR_THEM[16])

---

## 3. SCIENCE REVIEWER

**MAJOR:** Adult-mode regulatory text around `script.js:8975-8976` claims "statistically unlikely that a new mutation wouldn't be locked in across the family tree" + "pressure will travel with the line" — overstates deterministic inheritance, contradicts the app's own principle ("cohort-level outcomes do not predict individual trajectories"). **Recommendation:** Reframe to acknowledge probability over certainty — "the inherited variants will influence probability distributions across generations, though individual expression remains contingent on environment and development." (script.js:8975-8976)

**POLISH:** Line 8974's "pressure will travel with the line" implies inevitable transmission, mediating-by-environment language elsewhere in the app makes this phrasing inconsistent. **Recommendation:** Rephrase to "the genetic basis for this pressure is likely to be inherited" — preserves the institutional dryness without the determinism overclaim. (script.js:8974)

---

## 4. WRITING REVIEWER

**MAJOR:** The new R11 REFLECTION_TRACES line at `script.js:2697` "Says one thing about themselves at work, the opposite to a stranger on a train" still follows false-symmetric template structure ("X at A, opposite-of-X at B"), breaking with the warm-embodied tone of surrounding entries (which use specific sensory anchors like "Becomes friends with the corner-shop owner without quite meaning to"). **Recommendation:** Ground the contradiction in specific behavioral detail without the mirrored clauses — e.g., "Tells work they're careful with rules, tells a train stranger they break them for good reasons." (script.js:2697 + 5 langs)

**POLISH:** The word "one" repeats 13 times across 30 lines of REFLECTION_TRACES (clustered: "Cries reliably at one specific kind…" / "Says one thing…" / "Avoids one specific street…" / "Carries…one particular sweater…"), creating templated flattening. **Recommendation:** Vary construction — replace 3-4 instances by removing the "one/specific/particular" modifier or substituting concrete alternatives. (script.js:2685-2715)

---

## 5. VISUAL DIRECTOR

**MAJOR:** `.priority-row` carries a 0.12s transition on state changes (border-color, background) but lacks a `prefers-reduced-motion` guard — accessibility motion gap. **Recommendation:** Add `.priority-row` to the existing `@media (prefers-reduced-motion: reduce)` block to disable its transition. (style.css:3535)

**POLISH:** Orphaned blank line at `style.css:3529` (previously followed a reduced-motion media query R11 Frontend removed), creating subtle spacing inconsistency in stylesheet rhythm. **Recommendation:** Remove the orphaned blank line to restore formatting consistency. (style.css:3529)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES entries still normalize material ownership (magnifying glasses, telescope) as professional-aspiration markers — R10 Sociology/Ethics carryover that R11 Phase 1 didn't pick up. **Recommendation:** Reframe to skill/observation — e.g., "Knows the night sky so well they teach others" replacing "Owns the friendliest telescope in town." (script.js — KIDS_ADULT_FUTURES [4]/[14]/[20])

**POLISH:** OCEAN slider hints (Curiosity, Kindness, Energy, Focus, Confidence in KIDS_OCEAN_TOOLTIP or KIDS_EXPLAINERS) present personality traits as single-dimensional virtues, flattening the trait-context interdependence that REFLECTION_TRACES concretizes. **Recommendation:** Expand hints to show trait-context tension — e.g., Curiosity: "Loves asking questions (sometimes gets in trouble for asking too much)." (script.js — Kids OCEAN slider hints ~4266-4270)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** Equipment-ownership KIDS_ADULT_FUTURES entries [4]/[14]/[20] — the persistent R8/R9/R10 carryover. "Owns three kinds of magnifying glass" / "Owns the friendliest telescope" / "Photographs every interesting bird" privilege wealthy kids who own accumulated equipment. **Recommendation:** Replace possession with practice — "Knows the night sky so well they teach others," "Watches birds patiently from anywhere they happen to be." (script.js — KIDS_ADULT_FUTURES [4]/[14]/[20])

**POLISH:** KIDS_QUESTIONS_FOR_THEM[16] "ask a cloud" — leisure-access assumption (carryover from R10). **Recommendation:** Replace with class-neutral curiosity prompt — "What's something you'd want to know if you could ask anyone?" (script.js — KIDS_QUESTIONS_FOR_THEM[16])

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** Consent acknowledgment button has padding 6px 12px at `style.css:3463`, falling below 44×44px touch target on mobile devices — no mobile media query override. **Recommendation:** Add a mobile breakpoint to bump padding to 10px 16px or set min-height/min-width: 44px for WCAG 2.5.5 compliance. (style.css:3463)

**POLISH (a11y):** Intro skip link has padding 6px 12px at `style.css:4599`, similarly sub-44px on mobile. **Recommendation:** Apply mobile-breakpoint padding bump or explicit min-width/min-height: 44px. (style.css:4599)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** "Licensed clinic," "reference centre," and "designated reference centres" appear throughout the Regional Access tier system (`script.js:8061-8065, 4005-4007`) as institutional gating concepts but are NOT explicitly listed in the "On the classification shorthand" disclosure card. **Recommendation:** Extend the disclosure to name these as simulation-internal institutional markers analogous to the RA-channel codes. (script.js:8061-8065, 4005-4007)

**POLISH:** The term "HFEA-equivalent" appears in Regional Access copy as a regulatory qualifier (`script.js:8061, 8072, 8063`) but is never defined or disclosed — creates ambiguity about its ontological status (real concept? fictional placeholder?). **Recommendation:** Either define HFEA-equivalent in the classification shorthand card, OR replace with a clearly diegetic term like "accreditation-tier-equivalent." (script.js:8061, 8072, 8063)

---

## 10. DETECTION AGENT

**MAJOR:** HUMANITY_REMINDERS line 1799 "A weakness in one room might be exactly what the next room needs" — parallel false-symmetric template ("X in A might be opposite-of-X in B"). The R10 Narrative carryover that's still in place. **Recommendation:** Replace with directional / specific observation — "A weakness in one context might be exactly what another context needs" or substitute concrete behavioral example. (script.js:1799)

**POLISH:** NATURAL_VARIATION_MESSAGES line 1858 "Difference is information, not error" — "X is not Y, it is Z" formulaic structure (R10 Writing POLISH carryover, still in place). **Recommendation:** Reframe as specific observation — "Individual differences carry meaning, not noise" or "Each variation tells you something real." (script.js:1858)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Humanity reminder fires only every 3rd generation OR on Reflection mode switch, with 5.5s auto-hide — creating long disengagement gaps in a simulator framed around ethical reflection. **Recommendation:** Fire after every generation and extend display to 8s, OR trigger contextually on timeline saves (tying emotional reflection to persistence). (script.js:8281 — `showHumanityReminder` cadence)

**POLISH:** Environmental Influences uses a collapsed `<details>` disclosure (`index.html:264-272`), making the core mechanic invisible on first load — many users may generate multiple babies without discovering env modifiers exist. **Recommendation:** Expand the `<details>` by default on first load (or always on desktop), with a brief one-line explanatory label. (index.html:264)

---

## 12. RISK ANALYST

**MAJOR:** Mild-tag entries (R9-added) in FUTURE_PATHS, REFLECTION_TRACES, KIDS_FUTURE_PATHS, ADULT_TRACES remain EN-only with translator LOOP_REQUEST unfulfilled — non-EN locale users get tier-1 conflict messaging only, missing the calibrated mild-tier framing the architecture provides. **Recommendation:** Translate the 24 R9 mild-tag entries (8 per pool × 3 pools) into zh/ja/ko/tr (Narrative). (script.js — mild-tag entries across pools)

**MITIGATION:** Add a small dev-mode runtime check that warns if a pool entry tagged with `-mild` lacks `i18n.{lang}` slot for the active language, surfacing untranslated content before it ships visibly. (script.js — alongside R9 Systems' existing audit IIFE)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Pause Panel reflection question (seeded only by codename, not thematically anchored) fails to synthesize the Inner Cohort + Lifetime Drift insights that immediately precede it — the Adult-mode reflection arc wanders rather than resolves. **Recommendation:** Anchor the reflection question to one of the contexts (work/family/alone/other) or one life stage (7/17/35/70) from the preceding panels, forcing integration of the arc's insight. (script.js:6569-6586)

**POLISH:** Societal Brief + Trait History both critique optimization through societal/cultural lens in immediate sequence, making the gen ≥ 2 reveal feel thematically redundant — Sibling Cohort (variance distribution, structurally distinct) should separate them. **Recommendation:** Reorder rendering: Trait History → Sibling Cohort → Societal Brief — let the variance panel break the optimization-critique cluster. (script.js:6393-6394)
