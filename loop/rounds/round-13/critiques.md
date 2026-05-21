# Round 13 — Reviewer Critiques (26 issues)

All 13 reviewers returned. **Strongest convergence of Batch 3 so far** — 7 reviewers flagged the R13 KIDS_ARC_CLOSING_AFFIRMATION + hardcoded line 8652 from different angles:
- UX MAJOR: no CSS styling, renders unstyled
- UX POLISH: hardcoded line 8652 duplicates the localized closing — redundant
- Writing POLISH: weak rhythm in the placeholder
- Detection MAJOR: "X is the most interesting Y about Z" template
- Risk MAJOR + MITIGATION: hardcoded EN at 8652 risks screenshot misread (optimize-for-distinctiveness)
- Ethics MAJOR: framing difference as aesthetic asset in heritable-choice context risks repackaging eugenics
- Narrative Design MAJOR: identical text deadens impact + needs CSS styling
- Sociology POLISH: hardcoded line still class-asymmetric

---

## 1. UX REVIEWER

**MAJOR:** `.kids-arc-closing` element has zero CSS styling at `style.css` — renders with default paragraph margins, visually inconsistent with the kids-arc design system. **Recommendation:** Add `.kids-arc-closing` rule with matching typography (13.5px, line-height 1.5, `--ink-soft` color, `margin-top: 14px`). (script.js:8655, style.css missing)

**POLISH:** Differences panel header at `script.js:8652` contains a hardcoded `.subtle` paragraph "Difference is the most interesting thing about a person" that duplicates the localized KIDS_ARC_CLOSING_AFFIRMATION rendered right below it. **Recommendation:** Remove the hardcoded line; let the closing affirmation land as the sole framing. (script.js:8652)

---

## 2. ETHICS REVIEWER

**MAJOR:** KIDS_ARC_CLOSING_AFFIRMATION ("Different is the most interesting thing about a person") frames difference as an aesthetic asset ("most interesting") rather than acknowledging that in a heritable-choice context, *whose* difference is valued depends on parental intent and market forces — risks repackaging eugenicist enhancement pressure as positivity. **Recommendation:** Reframe to name unpredictability without aesthetic ranking — e.g., "They might surprise you, and that surprise is where the person lives." (script.js:5715)

**POLISH:** ADULT_TRAJECTORY_MILESTONES.mid "emerging interests and early attempts" still assumes leisure, metacognition, and permission to fail — shifts the class marker from schooling infrastructure to psychological capacity rather than removing it. **Recommendation:** Reframe to outcome-neutral observation — e.g., "Social and self-awareness beginning to organize around specific people, activities, or ideas." (script.js:3753)

---

## 3. SCIENCE REVIEWER

**MAJOR:** KIDS_OCEAN_TOOLTIP states "they're roughly half the story" regarding genetic influence on personality without caveating that this is population-level variance decomposition (not "half of you is genes"). **Recommendation:** Add parenthetical — "(this is how much personality differences in populations are explained by genetics; not how much of any one kid)." (script.js:4466)

**POLISH:** The `auditFuturePoolTags` IIFE validates KIDS_ADULT_FUTURES for ENV_FIELDS tags but the conflict-tag audit only checks trace pools (line 5584) — KIDS_ADULT_FUTURES could carry trait-conflict drift undetected. **Recommendation:** Extend the conflict-tag audit loop to include future pools alongside trace pools. (script.js:5584)

---

## 4. WRITING REVIEWER

**MAJOR:** Kids arc renders near-identical affirmations — `script.js:8652` hardcoded "Difference is the most interesting thing about a person" AND `script.js:5715` localized "Different is the most interesting thing about a person" — redundant emphasis within the same panel. **Recommendation:** Remove the hardcoded line; keep only the structured KIDS_ARC_CLOSING_AFFIRMATION. (script.js:8652, 5715)

**POLISH:** New mid-stage milestone "Early career signals appearing through emerging interests and early attempts" (script.js:3753) carries weak rhythm with "emerging" and "early" in close proximity — and softer than adjacent clinical entries. **Recommendation:** Reframe to crisper observational language consistent with neighbors — e.g., "Early career trajectories discernible through interests pursued and initial attempts." (script.js:3753)

---

## 5. VISUAL DIRECTOR

**MAJOR:** Reflection-mode future-tree animations (`treeBranchDrift` + `treeLeafPulse` at style.css:2205-2211) lack `prefers-reduced-motion` guards — accessibility motion gap. **Recommendation:** Add `@media (prefers-reduced-motion: reduce)` block disabling those keyframe animations. (style.css:2205-2211)

**POLISH:** The slider-popover opening animation (`popIn` at style.css:2700) lacks a `prefers-reduced-motion` guard — inconsistent accessibility coverage with R13's other animation guards. **Recommendation:** Add `prefers-reduced-motion` guard for `.slider-popover` after its keyframe. (style.css:2700)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** ADULT_TRAJECTORY_MILESTONES "mid" stage presents childhood-to-adolescence as inevitable linear progression (schooling → peers → identity → high school → independence → romance → career) when development is non-linear, recursive, contradictory. **Recommendation:** Rewrite the "mid" stage entries to include common regressions, simultaneous contradictions, and non-sequential growth. (script.js:3746-3753)

**POLISH:** Kids-arc closing affirmation (5715) frames "interesting" as universal-good without acknowledging that being different is also harder sometimes. **Recommendation:** Reframe with honest-cost — "Difference can be a gift and a weight, sometimes in the same week." (script.js:5715)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES "Speaks two languages by college" (script.js:5447) normalizes college attendance as the implicit prerequisite for recognizing multilingual ability — class-coded credentialing assumption. **Recommendation:** Remove the "by college" qualifier — "Speaks two languages." stands independent of institutional credentialing. (script.js:5447)

**POLISH:** ADULT_TRAJECTORY "early" stage "Academic strengths and challenges emerging" (script.js:3747) privileges institutional assessment frameworks as primary developmental lens. **Recommendation:** Replace with "Strengths and challenges emerging in learning" to center individual development rather than institutional evaluation. (script.js:3747)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** `.details-toggle` button has `padding: 6px 14px` + `font-size: 11.5px` → ~23px height, below 44px WCAG 2.5.5 touch target. No mobile override. **Recommendation:** Add `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center;` matching the R12 style/gender-btn pattern. (style.css:3754)

**POLISH (a11y):** The new `.kids-arc-closing` paragraph has no role or aria-label indicating its function as the closing affirmation of the Kids arc — screen readers hear it as ordinary body text. **Recommendation:** Add `role="doc-conclusion"` or `aria-label="Closing affirmation"` for semantic clarity. (script.js:8655)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Regulatory text at `script.js:8749-8752` cites specific invented article numbers (Art. 4, 6, 7, 9) from the fictional "EU IVD-Germ Lines Directive" as bare regulatory provisions without inline diegetic markers — while the disclosure card says the directive is fictional, the article numbers themselves still look like real law. **Recommendation:** Prefix the fictional articles with `[draft]` or `[sim]` markers, OR extend the disclosure card to explicitly say article numbers are illustrative. (script.js:8749-8752)

**POLISH:** The Turkish translation of CONSENT_EXPLAINER omits a parenthetical English-name reference for the Oviedo Convention ("Avrupa Konseyi Oviedo Sözleşmesi") that other language versions include — institutional nomenclature precision asymmetry. **Recommendation:** Add a parenthetical English name reference matching the precision of other languages. (script.js:4302)

---

## 10. DETECTION AGENT

**MAJOR:** KIDS_ARC_CLOSING_AFFIRMATION (script.js:5715) "Different is the most interesting thing about a person" uses the "X is the most [adjective] Y about Z" template with universal flattery — motivational-poster fake-deep, not grounded observation. **Recommendation:** Replace with concrete behavioral specificity (drop the superlative ranking + universal claim). (script.js:5715)

**POLISH:** REFLECTION_OBSERVATIONS line 1558 "The most interesting version of this child is probably the one you didn't plan for" repeats the "most interesting" template + false-symmetry of "the one you didn't plan for." **Recommendation:** Reframe to observable behavioral difference rather than comparative "most" ranking — or remove. (script.js:1558)

---

## 11. PRODUCT REVIEWER

**MAJOR:** R13 added KIDS_ARC_CLOSING_AFFIRMATION but the Differences-panel render flow puts a hardcoded subtitle + the localized closing affirmation side-by-side (script.js:8652 + 8655) — engagement hook is redundant rather than resolving. **Recommendation:** Pick one — either remove the hardcoded subtitle (better for i18n) or remove the closing affirmation slot. (script.js:8652, 8655)

**POLISH:** `showHumanityReminder()` uses `Math.random()` on script.js:8829 for pool selection — non-deterministic. Inconsistent with codebase's seeded-RNG pattern used elsewhere (pickReflectionPrompt, pickN). **Recommendation:** Seed the reminder selection deterministically (e.g., `seededRand(state.codename + '|reminder')`) for reproducible UX. (script.js:8829)

---

## 12. RISK ANALYST

**MAJOR:** Hardcoded line 8652 ("Difference is the most interesting thing about a person") is EN-only without surrounding context — when screenshot-quoted in isolation it could read as endorsing optimization-for-distinctiveness ("make your child more interesting by making them different"). **Recommendation:** Either remove the line entirely (keep only the localized closing slot), OR prefix it with framing like R7's "Ethically:" pattern to anchor it as reflective observation. (script.js:8652)

**MITIGATION:** Add a "Note:" or "Remember:" prefix to the hardcoded line at 8652 to disambiguate as framing rather than directive — prevents out-of-context screenshot misread. (script.js:8652)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** KIDS_ARC_CLOSING_AFFIRMATION renders the same affirmation as the hardcoded subtitle above it — identical message stacked, deadening emotional impact instead of resolving the arc. **Recommendation:** Rewrite KIDS_ARC_CLOSING_AFFIRMATION to provide a distinct thematic landing — e.g., "You get to be all of that — the questions, the differences, the surprises." (script.js:5715)

**POLISH:** The `.kids-arc-closing` element lacks CSS styling — it visually blends with body content rather than reading as a distinct thematic punctuation. **Recommendation:** Add `.kids-arc-closing { margin-top: 16px; font-size: 15px; font-weight: 500; text-align: center; color: var(--ink-warm); }`. (style.css after :5251)
