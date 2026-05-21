# Round 14 — Reviewer Critiques (26 issues)

All 13 reviewers returned. **Strongest convergence:** 4 reviewers (Ethics + Writing + Detection + Risk) flagged the R14 AN-mild translations from different angles — "— both are" template propagated, "statistically expected" reads AI-philosophical, soft-suppression-as-virtue framing, Chinese diminutive softening minimizes the trait cost. R14 Narrative rev needs to clean up its own translations.

---

## 1. UX REVIEWER

**MAJOR:** Trace cards use a fixed 2-column grid with no mobile breakpoint — long narrative entries added in `926bc0c` ("Maintains a list of unfinished projects; revisits about half of them once a year") wrap excessively on mobile. **Recommendation:** Add `@media (max-width: 540px)` to stack `.traces-grid` to single column, matching `.memory-cards` pattern. (style.css:2065)

**POLISH:** Adult-mode trace cards render semicolon-separated clauses in `ui-monospace 11.5px` with minimal `9px 11px` padding, visually compressing the clause pair. **Recommendation:** Bump trace-card padding to `11px 14px` and `line-height: 1.6` in Adult mode for clause separation. (style.css:2098-2099)

---

## 2. ETHICS REVIEWER

**MAJOR:** R14-added AN-mild entries in KIDS_FUTURE_PATHS (line 4582 + translations 4624/4666/4708/4750) normalize childhood preference suppression as an affirmed personality trait within a warm "both are okay" register — obscures the autonomy concern (people-pleasing as developmental cost, R8 peacemaker fix family). **Recommendation:** Reframe to name the developmental risk — e.g., "may learn to say 'I don't mind' when they actually do — recognizing their own preferences is part of how autonomy grows." Translate accordingly. (script.js:4582 + 5 langs)

**POLISH:** Chinese AN-mild diminutive "那么一点点" ("just a tiny bit") softens preference-suppression below the EN intensity level — minimizes cost beyond what the original conveys. **Recommendation:** Align Chinese intensity with EN — drop the diminutive softening so the language conveys the same psychological cost. (script.js:4624)

---

## 3. SCIENCE REVIEWER

**MAJOR:** `script.js:1966` "Personality traits show roughly 40-50% heritability; most variation traces to lived experience" lacks citation + caveat about twin-study shared-environment confounds. **Recommendation:** Add inline citation — "twin-study estimates, Polderman et al. 2015" — and parenthetical noting Vukasović & Bratko 2015 meta-analysis suggests 36-40% with confound correction. (script.js:1966)

**POLISH:** ADULT_TRACES entries (script.js:2673-2680) present specific behavioral scenarios tagged to traits (OC-mild, EN-mild) without a "common patterns, not predictions" disclaimer at the pool head — the site disclaims elsewhere (line 53) but trace-level entries lack inline framing. **Recommendation:** Add a comment header to ADULT_TRACES stating "Trait-flavored common patterns, not predictions for any individual." (script.js:2673)

---

## 4. WRITING REVIEWER

**MAJOR:** R14-added AN-mild translations across zh/ja/ko/tr (lines 2729, 2779, 2829, 2879) use "statistically expected" phrasing that reads as AI-brain over-philosophizing rather than warm/concrete observation — the EN original uses the same template ("more often than statistically expected"). **Recommendation:** Replace statistical framing with grounded behavior in EN, then retranslate — e.g., "Goes along with the group's pick more often than they'd choose to; mentions their own option briefly after." Update all 5 langs. (script.js:2729, 2779, 2829, 2879)

**POLISH:** Chinese AN-mild second entry "自己消化,不再提起" (self-digest) uses poetic metaphor that contradicts the clinical Adult-mode register. **Recommendation:** Replace with factual phrasing — e.g., "几天后自己理解了,不再说起" (came to understand it themselves later, no longer mentioned). (script.js:2730)

---

## 5. VISUAL DIRECTOR

**MAJOR:** No clear MAJOR surfaced — surface settling. **Recommendation:** Hold for R15 verification.

**POLISH:** No clear POLISH surfaced — visual rhythm stable across R11-R13 work. **Recommendation:** Hold.

(Visual Director effectively NO CHANGE on R14 review surface — interpret as soft-confirmation that the visual surface is settled.)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** R14 AN-mild translations in KIDS_FUTURE_PATHS partially preserve psychological cost in zh/ja/ko/tr but the EN original at line 4582 itself uses "Might say 'I don't mind' when they actually do mind, just a little" — the "just a little" softens the trait's actual psychological weight. **Recommendation:** Drop "just a little" diminutive — "Might say 'I don't mind' when they actually do mind. Sometimes the practice becomes the pattern." Update 5 langs. (script.js:4582 + parallels)

**POLISH:** ADULT_TRACES AN-mild EN at script.js:2729 phrases preference suppression in clinical-distant register ("Defers to the group preference") that adult readers may parse as virtuous flexibility rather than cost. **Recommendation:** Edge the EN slightly toward cost-naming — "Defers to the group preference more often than they intend to; raises their alternative once, briefly, after the fact." (script.js:2729)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** `script.js:3862` ADULT_TRAJECTORY "A working life takes shape — whether as a settled career, a string of held-together jobs, or a path that had to be rebuilt mid-stride" — credential-track linearity listed first signals it as default. **Recommendation:** Reorder to frontload precarious/non-linear ("a path that had to be rebuilt, a string of held-together jobs, or a settled career") so all three trajectories read as equally valid. (script.js:3862)

**POLISH:** Adult headline examples (script.js:2483-2546) cluster credentialed roles (physician, software engineer, architect, therapist) — class-coded compared to FUTURE_PATHS pluralism. **Recommendation:** Add 2-3 non-credentialed work modes (tradesperson, gig worker, care-economy professional) to balance the cluster. (script.js:2483-2546)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** R12's `min-height: 44px` fixes for `.style-btn` and `.gender-btn` apply only at `max-width: 640px` — iPad-portrait viewports (641-768px) still have sub-44px touch targets. **Recommendation:** Extend the mobile breakpoint to `max-width: 768px` (or add a second breakpoint covering the iPad-portrait range). (style.css:5346-5350)

**POLISH (a11y):** `.intro-skip` uses focus border `rgba(126, 224, 255, 0.18)` — extremely low-contrast against dark background, fails WCAG focus-visible. **Recommendation:** Bump opacity to ~0.6 or use solid focus outline. (style.css:4634)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** `script.js:8880` introduces "HFEA-licensed reference centres" — HFEA is a real UK regulator, so the compound blurs the real/simulated boundary (could imply actual regulatory licensing). The R13 classification-shorthand card disclosed "HFEA-equivalent" but not "HFEA-licensed". **Recommendation:** Extend the disclosure card to explicitly include "HFEA-licensed" + compound forms as diegetic. (script.js:4135-4140, 8880)

**POLISH:** Turkish HISTORY_CARD "Heritable vs. somatic edits" at `script.js:4468` lacks the English-name parenthetical for the Oviedo Convention that Turkish CONSENT_EXPLAINER (script.js:4369) now includes (added R13). Inconsistency across surfaces. **Recommendation:** Add `(European Convention on Human Rights and Biomedicine; Madde 13)` to match the CONSENT_EXPLAINER precedent. (script.js:4468)

---

## 10. DETECTION AGENT

**MAJOR:** R14 translations propagated the EN "— both are real" / "— both are okay" template across 64+ lines (script.js:4582 + zh/ja/ko/tr parallels at 4624-4626 / 4666-4668 / 4708-4710 / 4750-4752). Template-AI tell preserved at scale. **Recommendation:** Rephrase the EN originals to remove the "— both are" construction, then retranslate — replace with concrete behavioral observation. (script.js:4582)

**POLISH:** Line 4628 (Chinese) and equivalents in ja/ko/tr translate a false-symmetric "new-things ↔ familiar-comfort" structure from the EN original — AI-generated balanced-opposites for false depth. **Recommendation:** Simplify to either "loves trying new things" OR "prefers familiar comfort" rather than forcing the symmetry. (script.js:4628)

---

## 11. PRODUCT REVIEWER

**MAJOR:** The Pause Panel (ethical constraints + "cannot measure" limitations) is hidden from Adult mode users — exactly the users most likely to make optimization decisions without seeing the model's stated limits. **Recommendation:** Render the Pause Panel in Adult mode as a collapsible "Limitations & Ethics" section so guardrails sit alongside trait projections. (script.js:7221-7238, style.css:3751-3754)

**POLISH:** Env-disclosure `<details>` defaults to closed in Adult mode despite environmental modifiers directly shaping the projection — implicit rather than explicit. **Recommendation:** Default-open env-disclosure in Adult mode (matching Reflection/Kids) so environmental context sits alongside trait sliders. (script.js:6068-6087)

---

## 12. RISK ANALYST

**MAJOR:** R14 AN-mild translations in KIDS_FUTURE_PATHS (zh/ja/ko/tr at lines 4624/4666/4708/4750) preserve preference-suppression as an affirmed trait without the ethical context that this is a developmental trade-off — could be screenshot-quoted to normalize people-pleasing in children. **Recommendation:** Add explicit cost-framing in the EN entry + propagate to all 5 langs (close the loop with the R14 Narrative rev). (script.js:4582 + parallels)

**MITIGATION:** Have the R14 Narrative rev pass the rewritten EN through the existing audit IIFE pattern (or a manual check) confirming the cost-framing actually lands in all 5 langs before considering the i18n closed. (script.js — `auditFuturePoolTags` IIFE region)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Reflection-mode Pause Panel uses `pickN(REFLECTION_OBSERVATIONS, 2)` at `script.js:7189` for non-deterministic observation selection — breaks the narrative cohesion that R13's seeded-reminder pattern established. Same codename returns different observations across sessions. **Recommendation:** Seed observation selection with `seededRand(state.codename + '|pause-obs')` matching R13's seeded-reminder pattern. (script.js:7189)

**POLISH:** Reflection-mode Pause Panel ends with 2 random observations + transitions directly into behavioral analysis, lacking the thematic closing affirmation that R13's Kids-arc closing slot provided. Asymmetric narrative resolution. **Recommendation:** Add a `REFLECTION_ARC_CLOSING_AFFIRMATION` slot after the observations matching the Kids-arc closing pattern. (script.js:7197)
