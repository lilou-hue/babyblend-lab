# Round 13 — Priorities (synthesized from 26 critiques)

**Dominant theme: Kids-arc closing affirmation cluster needs comprehensive cleanup.** 7 reviewers (UX MAJOR + POLISH + Writing MAJOR + Detection MAJOR + Risk MAJOR + Ethics MAJOR + Narrative Design MAJOR) flagged the R13 closing-slot work from different angles. Three things need to happen together:

1. **Remove the hardcoded duplicate** at script.js:8652 (UX Flow's surface)
2. **Rewrite the placeholder affirmation** to be concrete + non-ranking-flattery + acknowledge cost (Narrative's surface — close the LOOP_REQUEST)
3. **Add CSS styling** for `.kids-arc-closing` so it lands as thematic punctuation (Frontend's surface)

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — UX MAJOR + Narrative Design MAJOR (converged, Kids-arc closing styling):**
Add `.kids-arc-closing` CSS rule — matches Narrative Design's suggestion: `margin-top: 16px; font-size: 15px; font-weight: 500; text-align: center; color: var(--ink-warm);`. Or match the kids-arc-disclaimer typography family — your call which atmosphere fits. ~6 lines.

**Secondary — VISUAL DIRECTOR MAJOR:**
Add `prefers-reduced-motion` guards to `treeBranchDrift` + `treeLeafPulse` (style.css:2205-2211) — R13 Frontend's atmospheric-loop pass missed these. Add them to the same block R13 already extended. ~3 lines.

**Tertiary — MOBILE MAJOR:**
`.details-toggle` (style.css:3754) sub-44px. Add mobile breakpoint `min-height: 44px; min-width: 44px;` matching R12's style/gender-btn pattern. ~5 lines.

**Quaternary — Visual Director POLISH:**
Add `prefers-reduced-motion` guard for `.slider-popover .popIn` animation (style.css:2700). ~3 lines.

Strict <80 lines. CSS only.

---

## SYSTEMS

**Primary — SCIENCE POLISH:**
Extend `auditFuturePoolTags` IIFE conflict-tag check to include the future pools (ADULT_FUTURES, KIDS_FUTURE_PATHS, etc.) — currently only trace pools are checked for tag drift. Mirror the existing trace-loop structure. ~10 lines.

**Secondary (if Primary fits) — PRODUCT POLISH:**
Seed `showHumanityReminder()` pool selection at script.js:8829 with deterministic `seededRand(state.codename + '|reminder')` instead of `Math.random()`. ~3 lines. Pure consistency fix.

**Alternative — NO CHANGE.** If both feel like inventing work, NO CHANGE is valid.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE (script.js flavor pools)

**Primary — Multi-reviewer convergence (Ethics MAJOR + Detection MAJOR + Narrative Design MAJOR + Writing MAJOR + Risk MAJOR + Psychology POLISH):**

Rewrite **KIDS_ARC_CLOSING_AFFIRMATION** at `script.js:5715`. Current placeholder "Different is the most interesting thing about a person" has:
- Template structure (Detection MAJOR)
- Aesthetic-ranking framing (Ethics MAJOR)
- No honest-cost (Psychology POLISH)
- Repackages distinctness-as-virtue in heritable-choice context (Risk MAJOR)
- Identical to hardcoded subtitle above (Narrative Design MAJOR — UX Flow will remove the duplicate)

**New copy goals:**
- Concrete, not aesthetic-superlative
- Names difference as observation, not ranking
- Acknowledges cost OR surprise OR irreducibility — not flattery
- One short sentence per language

**Suggested EN:** "You get to be all of it — the questions, the differences, the surprises." OR "They might surprise you, and the surprise is where the person lives." OR "Difference can be a gift and a weight, sometimes in the same week."

Translate into zh/ja/ko/tr matching the warm Kids register. ~10 lines.

**Secondary — SOCIOLOGY MAJOR + POLISH (carryovers, small):**
- `script.js:5447` "Speaks two languages by college" → "Speaks two languages." Remove credentialing assumption. 5 langs.
- `script.js:3747` ADULT_TRAJECTORY "Academic strengths and challenges emerging" → "Strengths and challenges emerging in learning." Remove institutional-assessment framing. 5 langs.

**Tertiary — WRITING POLISH (small, R13's own):**
Tighten ADULT_TRAJECTORY mid-stage at `script.js:3753` — "emerging interests and early attempts" reads soft + close-rhyme. Crisper observational phrasing — e.g., "interests pursued and initial attempts." 5 langs.

**Quaternary — DETECTION POLISH:**
REFLECTION_OBSERVATIONS line 1558 "The most interesting version of this child is probably the one you didn't plan for" — same template family. Replace or remove. 5 langs.

**Quinary — Ethics POLISH (deferred carryover from R13 Ethics — the R13 Narrative replacement still has class issue):**
Defer to R14 if budget tight.

Pick Primary + Secondary minimum. Address Tertiary/Quaternary if budget remains. Strict <80-line total diff.

---

## EDUCATION

**Primary — SCIENCE MAJOR:**
KIDS_OCEAN_TOOLTIP at `script.js:4466` "they're roughly half the story" needs population-level caveat to avoid implying "half of you is genes." **Suggested addition (one clause):** "(this is how much personality differences in populations are explained by genetics; not how much of any one kid)." Or shorter. EN-only per R11. ~2 lines.

Max <40 lines. `node --check script.js` MANDATORY.

---

## UX FLOW

**Primary — UX POLISH + Writing MAJOR + Risk MAJOR + MITIGATION (converged):**

Remove the hardcoded `.subtle` paragraph at `script.js:8652` ("Difference is the most interesting thing about a person"). It duplicates the localized KIDS_ARC_CLOSING_AFFIRMATION rendered immediately below and creates EN-only screenshot-misread risk. Pure subtraction — 1-2 lines.

**Secondary — Mobile POLISH (a11y) on the new closing slot:**
Add `role="doc-conclusion"` (or `aria-label`) to the `.kids-arc-closing` `<p>` element for semantic clarity. ~1 line.

Strict <40 lines.

---

## WORLD DESIGN

**Primary — PLAUSIBILITY MAJOR:**
Regulatory text at `script.js:8749-8752` cites specific invented IVD-Germ Lines Directive article numbers (Art. 4, 6, 7, 9) without inline diegetic markers. Prefix the article citations with `[draft]` or `[sim]` markers, OR extend the disclosure card to say "Specific article numbers (Art. 4, 6, 7, 9) are illustrative."

**Recommendation:** Extend the disclosure card — single-source disclosure is cleaner than peppering inline markers.

**Secondary — Plausibility POLISH:**
Turkish CONSENT_EXPLAINER at `script.js:4302` lacks parenthetical English-name reference for Oviedo Convention that other languages include. Add `Oviedo Sözleşmesi (European Convention on Human Rights and Biomedicine)` or similar. ~1 line.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## Cross-cutting deferrals (R14+)

- **R12 mid-pick stash** — user WIP, preserved.
- **Mild-tag content i18n** — R9 carryover, still 24 EN entries × 4 langs.
- **Ethics POLISH (R13)** — ADULT_TRAJECTORY mid stage "emerging interests and early attempts" still has class assumption (R13 Narrative's "fix" was incomplete).
- **Psychology MAJOR (R13)** — ADULT_TRAJECTORY linear progression refactor.
- **Move consent-awareness AFTER projection** — architectural, held.
- **"Inheritance Burden Index" rename** — held.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
