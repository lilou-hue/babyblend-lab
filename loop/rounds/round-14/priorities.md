# Round 14 — Priorities (synthesized from 26 critiques)

**Dominant theme:** AN-mild translations need a second-pass concretizing — 4 reviewers (Ethics + Writing + Detection + Risk MAJOR/MITIGATION + Psychology MAJOR) flagged from different angles. Plus: iPad-portrait 44px gap, Pause Panel narrative inconsistency, HFEA-licensed disclosure.

Strict <80-line diffs per builder.

---

## FRONTEND

**Primary — MOBILE MAJOR (iPad-portrait gap):**
R12's `min-height: 44px` for `.style-btn`/`.gender-btn` applies only at `max-width: 640px` — iPad-portrait viewports (641-768px) still sub-44px. **Recommendation:** Either extend to `max-width: 768px` OR add a second breakpoint for the 641-768px range. (style.css:5346-5350)

**Secondary — UX MAJOR:**
Add `@media (max-width: 540px)` for `.traces-grid` single-column on mobile (long R14 narrative entries wrap excessively). (style.css:2065)

**Tertiary — MOBILE POLISH (a11y):**
Bump `.intro-skip` focus border opacity from 0.18 to ~0.6 for WCAG-AA contrast. (style.css:4634)

**Quaternary — UX POLISH:**
Bump trace card padding to `11px 14px` + `line-height: 1.6` in Adult mode for clause separation. (style.css:2098-2099)

Strict <60 lines.

---

## SYSTEMS

**Primary — NARRATIVE DESIGN MAJOR (seed Pause Panel observations):**
Replace `pickN(REFLECTION_OBSERVATIONS, 2)` at `script.js:7189` with a seeded variant — matches R13's seeded-reminder pattern. Either:
- (A) Add a `seededPickN(arr, n, seedKey)` helper and use it here
- (B) Inline the seeded approach for this single call

Either path. ~5-15 lines.

**Alternative — NO CHANGE.** If the scope creeps, defer.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE — **highest-workload role of the round**

**Primary — 4-reviewer convergence on AN-mild translations:**

R14 translations propagated AI-tell templates ("— both are real/okay") + "statistically expected" philosophy + diminutive softening across 5 langs. Two surfaces need a second pass:

**1. KIDS_FUTURE_PATHS AN-mild EN at `script.js:4582`** "Might say 'I don't mind' when they actually do mind, just a little."
- Issues: "just a little" diminutive (Psychology MAJOR + Ethics POLISH), "— both are" template downstream (Detection MAJOR), no cost framing (Ethics MAJOR + Risk MAJOR)
- **Suggested EN:** "Might say 'I don't mind' when they actually do mind. Sometimes the practice becomes the pattern."
- Then retranslate to zh/ja/ko/tr — drop "— both are" template and diminutives ("那么一点点" etc.) in all 4 langs.

**2. ADULT_TRACES AN-mild EN at `script.js:2729`** "Defers to the group preference more often than statistically expected; raises the alternative once, briefly, after the fact."
- Issues: "statistically expected" reads AI-philosophical (Writing MAJOR), clinical-distant register (Psychology POLISH), Chinese "自己消化" poetic-metaphor mismatch (Writing POLISH)
- **Suggested EN:** "Goes along with the group's pick more often than they'd choose to; mentions their own option briefly, after."
- Retranslate to zh/ja/ko/tr — drop "statistically expected" / Chinese "自己消化" in favor of factual clinical phrasing.

**Total scope:** 2 EN rewrites + 8 translations = ~20-25 strings. Should fit comfortably under 80 lines.

**Secondary (if Primary fits in <50 lines) — SOCIOLOGY MAJOR:**
Reorder `script.js:3862` ADULT_TRAJECTORY working-life-takes-shape sequence to frontload precarious paths: "a path that had to be rebuilt mid-stride, a string of held-together jobs, or a settled career." 5 langs. ~6-8 lines.

Strict <80-line diff. `node --check script.js` MANDATORY.

---

## EDUCATION

**Primary — SCIENCE MAJOR:**
Heritability claim at `script.js:1966` needs inline citation + confound caveat. **Suggested:** "Personality traits show roughly 40-50% heritability in twin studies (Polderman et al. 2015); confound-corrected meta-analyses suggest 36-40% (Vukasović & Bratko 2015). Most variation traces to lived experience."

EN-only per the existing HUMANITY_REMINDERS pattern (it's mid-paragraph in a longer message). Verify it's in your surface — if it's narrative copy not pedagogical, route to Narrative.

**Secondary (small) — SCIENCE POLISH:**
Add a comment header above ADULT_TRACES (~script.js:2673) noting "trait-flavored common patterns, not predictions for any individual." Pure code comment, EN-only.

Max <30 lines. `node --check script.js` MANDATORY.

---

## UX FLOW

**Primary — PRODUCT MAJOR (Pause Panel in Adult mode):**
Render the Pause Panel as a collapsible "Limitations & Ethics" section in Adult mode (currently hidden). The same panel content; just add the conditional render path + a default-collapsed `<details>` wrapper for Adult mode.

Approach:
- `grep -n "renderPausePanel\|pause-panel\|isAdult\|isReflection" script.js | head -15`
- Add Adult-mode render call gated behind an Adult-only check
- The Pause Panel container in HTML needs to render in Adult mode, default-collapsed

Strict <60 lines. **`node --check script.js` MANDATORY.**

**Secondary — PRODUCT POLISH:**
Env-disclosure `<details>` defaults open in Reflection/Kids per `applyEnvDisclosureMode()`; in Adult mode it defaults closed. Open by default in Adult mode too. ~3-5 lines.

---

## WORLD DESIGN

**Primary — PLAUSIBILITY MAJOR:**
Extend "On the classification shorthand." REGULATORY_CARDS entry (5 langs) to also disclose "HFEA-licensed" compound forms as diegetic (currently only "HFEA-equivalent" is disclosed). ~3-5 lines per language × 5 langs = ~10-15 lines.

**Secondary — PLAUSIBILITY POLISH:**
Add `(European Convention on Human Rights and Biomedicine; Madde 13)` to Turkish HISTORY_CARD "Heritable vs. somatic edits" Oviedo reference at `script.js:4468` to match CONSENT_EXPLAINER precedent. ~1 line.

Strict <40 lines.

---

## Cross-cutting deferrals (R15+)

- **REFLECTION_ARC_CLOSING_AFFIRMATION** slot (Narrative Design POLISH R14) — symmetric to Kids-arc closing; defer to R15 if UX Flow's Pause-Panel-in-Adult work is heavier.
- **FUTURE_PATHS mild-tag i18n** — final pool of 3 (R14 closed ADULT_TRACES + KIDS_FUTURE_PATHS). R15 carryover.
- **Move consent-awareness AFTER projection** — architectural, held.
- **"Inheritance Burden Index" rename** — held.
- **ADULT_TRAJECTORY linear-progression refactor** — multi-round.
- **R12 mid-pick stash** — preserved.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
