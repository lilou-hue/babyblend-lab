# Round 8 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Notable cross-reviewer convergences:
- **Leadin cross-fade timing** — Ethics MAJOR + Narrative Design MAJOR both flag that the leadin's fade-out fires *at* first slider input, collapsing 3 narrative beats and pulling the ethical context offscreen at the moment of allocation.
- **Class-coded Kids futures** — Sociology MAJOR, Psychology MAJOR, Science MAJOR all hit KIDS_FUTURE_PATHS / KIDS_ADULT_FUTURES from different angles (class assumptions, virtue-framing of developmental cost, outcome-determinism).
- **Diegetic shorthand disclosure** — Plausibility MAJOR + POLISH both flag insufficient disclosure of Tier I-IV + CMP-N codes despite R7's "On the regulatory citations" card.

---

## 1. UX REVIEWER

**MAJOR:** The language selector's label is hidden on mobile (`display: none` at max-width 540px) but the empty slot remains in the flex layout, creating invisible wasted whitespace in the header. **Recommendation:** Use `display: contents` or remove the label from the flex container on mobile via `gap: 0` plus targeted overrides. (style.css:244)

**POLISH:** The `aria-labelledby` attribute on the language select references an ID that doesn't exist (the `<label>` has no `id` attribute), breaking screen-reader association. **Recommendation:** Add `id="lang-label"` to the corresponding label element to fix the aria-labelledby reference. (index.html:229)

---

## 2. ETHICS REVIEWER

**MAJOR:** The consent-awareness leadin initiates its 0.45s fade-out at the same moment the user moves their first allocation slider — the ethical framing exits the visual field exactly when the user is making their first allocation, defeating the stated two-beat hand-off intent. **Recommendation:** Either extend the fade duration to 2+ seconds OR link the fade to the Consent Implications panel threshold (≥50 credits) rather than first slider touch, so the ethical framing remains visible during initial allocation. (script.js:4816-4828, style.css:3444)

**POLISH:** KIDS_TRAIT_CONFLICTS / KIDS_FUTURE_PATHS i18n only populates zh/ja/ko/tr; non-supported locales (es/fr/pt/etc.) silently fall back to EN, treating them as second-class. **Recommendation:** Either populate additional locale keys OR add a visible "EN-only fallback" notice when an unsupported language is active. (script.js:4303-4360+)

---

## 3. SCIENCE REVIEWER

**MAJOR:** KIDS_FUTURE_PATHS entries "Could become really good at storytelling" and "Could become a great teacher one day" assert specific skill/career-outcome destinies that genetic prediction cannot supply — ~50% heritability and the unknown gene-environment interaction make outcome-predictions overreach. **Recommendation:** Reframe to present-state language ("loves telling stories", "wants to help others") rather than projecting into adult career/skill outcomes. (script.js:3822, 3848)

**POLISH:** TRAIT_CONFLICT_RULES use hard binary thresholds (≥8, ≤4) on a continuous 1–10 scale, creating false precision where a baby at openness=7.9 / conscientiousness=4.1 receives no conflict tagging while 8.0/4.0 does. **Recommendation:** Add a code comment acknowledging the cutoff is pragmatic-not-precise, or soften thresholds (≥7.5) to reduce edge-case artifacts. (script.js:6816-6819)

---

## 4. WRITING REVIEWER

**MAJOR:** "Ethically: the person this concerns is not in the room — and will inherit whichever balance you settle on" uses cold, clinical phrasing ("inherit whichever balance") mismatched to the human stakes — reads as administrative rather than ethical. **Recommendation:** Replace with language emphasizing the child as a real person — "Ethically: the child this affects isn't here yet — and they'll live with the choices you make." (script.js:4807)

**POLISH:** "Probably feels things deeply — that's a strength" (script.js:3843) uses the AI-pattern negation-affirmed template ("X, but that's actually Y"), creating a slightly patronizing undertone. **Recommendation:** Reframe directly as observation: "Probably feels things deeply and notices small changes others miss." (script.js:3843)

---

## 5. VISUAL DIRECTOR

**MAJOR:** The R8 range-thumb hit-area fix added `margin-top: -19px` to `::-webkit-slider-thumb` (line 543) but the corresponding `::-moz-range-thumb` rule (lines 546-555) lacks the same margin, causing the thumb to misalign vertically in Firefox. **Recommendation:** Add `margin-top: -19px;` (or the moz-equivalent transform) to the moz-range-thumb rule for cross-browser centering parity. (style.css:546-555)

**POLISH:** Footer links now use `--ink-soft` which is brighter than `--ink-mute` body text but still blends with surrounding muted footer prose, reducing discoverability without hover. **Recommendation:** Use `var(--ink)` for default footer-link state or add a subtle underline to differentiate links from prose. (style.css:5159)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** "Could be the family peacemaker" tagged AN-pleaser (script.js:3839, 3873, 3909, 3941) frames childhood emotional mediating as virtue when developmental psychology treats it as a cost marker — emotional parentification correlates with adult burnout and self-sacrifice. **Recommendation:** Reframe with honest cost language — e.g., "May become the one who smooths family tensions — learning early that keeping the peace is their job." (script.js:3839, 3873, 3909, 3941)

**POLISH:** ADULT_TRAJECTORY_MILESTONES use linear progression language ("settling," "stabilizing," "begins to") that contradicts the content's own warnings about late blooms, mid-stride rebuilds, and persistent precarity. **Recommendation:** Prefix the staged milestones with "Commonly observed" or restructure by theme rather than age-stage to weaken the inevitability signal. (script.js:3270-3400)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES[4] "Maybe an inventor of small clever gadgets" with "Tinkers in a sunny corner" makes a workspace assumption (uninterrupted creative space, sunlight, materials) that glosses over class differences in who gets creative space. **Recommendation:** Replace detail with shared-resource framing — "Solves problems during breaks between two jobs" — or shift to "Salvages broken things" to honor repair culture across income bands. (script.js:4425)

**POLISH:** KIDS_QUESTIONS_FOR_THEM[2] "If you could have any pet that does not exist, what would it be?" assumes pet-ownership normality and leisure-imagination for kids facing food/housing precarity. **Recommendation:** Reframe as "What animal would you want to learn more about?" — shifts from possession to curiosity, income-neutral. (script.js:4264)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** The `<summary>` elements inside `.intro-stat-source` `<details>` disclosures (4 elements) lack explicit minimum dimensions, leaving sub-44px touch targets on mobile/iPad where native disclosure styling is minimal. **Recommendation:** Add `min-height: 44px; min-width: 44px;` and appropriate padding to `.intro-stat-source summary`. (index.html:97-124, style.css needs new rule)

**POLISH (a11y):** The `#consent-awareness-leadin` div uses `aria-live="polite"` but lacks an `aria-label` identifying its purpose; the Kids-arc panels (loves / questions / differences) have no `aria-labelledby` pointing to their headings. **Recommendation:** Add `aria-label="Consent awareness notice"` to the leadin div and wrap each Kids-arc panel as a labeled section with `aria-labelledby` pointing to its heading. (index.html:282, 559-561)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Tier I-IV labels (Baseline / Moderate optimization / Elevated optimization / Boundary case) render in the dossier-style case-file metadata as official-looking regulatory tiers without any user-facing disclosure that these are fictional simulation constructs — R7's "On the regulatory citations" card covered Oviedo/HFEA/IVD but not Tier ladders. **Recommendation:** Extend the existing REGULATORY_CARDS disclosure entry to name Tier I-IV explicitly as simulation framework designations, not real regulatory classes. (script.js:5824-5857)

**POLISH:** CMP-N codes (CMP-2 cognition, CMP-4 affective) appear in user-visible regulatory text as official-sounding category identifiers; R7 added an inline JS comment marking them diegetic but no user-facing disclosure exists. **Recommendation:** Add CMP-N codes to the same "On the regulatory citations" REGULATORY_CARDS entry so the disclosure is single-source and visible. (script.js:7308-7309)

---

## 10. DETECTION AGENT

**MAJOR:** "Diversity isn't a glitch — it's the feature" in HUMANITY_REMINDERS (script.js:1786) uses the false-symmetric antithesis template ("X isn't Y — it's Z") — generic Reddit-core philosophy delivered with em-dash flourish. **Recommendation:** Replace with grounded statement — "Variation is where unexpected combinations come from." or similar that drops the negation frame. (script.js:1786)

**POLISH:** "Nature did not consult the optimization handbook" (script.js:1848) is fake-deep personification using abstract-noun synthesis to sound clever without saying anything observable. **Recommendation:** Replace with "Variation exists outside any design intent" or remove the entry. (script.js:1848)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Kids mode drops first-time users directly into slider manipulation with only a generic playful-text intro, providing no dedicated onboarding panel that frames the interaction as "imagining possibilities" rather than "building a child." **Recommendation:** Insert a Kids-specific onboarding panel or pre-slider nudge contextualizing slider interaction as imaginative exploration of personality traits. (index.html:376, script.js:5520)

**POLISH:** The Burden Index displays "Minimal · few traits are pre-decided — but the choice is still made for them" at idle baseline (budget=0), implying ethical weight even when no allocation has been made yet. **Recommendation:** Detect idle budget state and display "No allocations made yet" or hide the index entirely until first allocation. (script.js:8175-8186)

---

## 12. RISK ANALYST

**MAJOR:** KIDS_ARC_DISCLAIMERS was lifted into a language-keyed dict in R8 (Education) but only EN entries were populated; the `LOOP_REQUEST(narrative)` for zh/ja/ko/tr means non-EN locales fall back to English-only disclaimers — exactly the i18n gap the lift was supposed to close. **Recommendation:** Add zh/ja/ko/tr translations to KIDS_ARC_DISCLAIMERS entries so localized users actually receive the determinism disclaimers in their language. (script.js:4492-4502)

**MITIGATION:** Translate the 3 disclaimer entries (loves / questions / differences) into zh/ja/ko/tr matching the warm Kids register used elsewhere, then remove the LOOP_REQUEST(narrative) comment. (script.js:4492)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The consent-awareness leadin initiates its cross-fade at the same moment the user allocates budget, compressing 3 narrative beats (note fade 450ms + 200ms gap + panel reveal 450ms) into a single interaction that feels rushed; the double-trigger architecture (`showConsentAckPrompt` AND `applyBudgetPanelGate` both initiating the fade) crowds the emotional beat without breathing room. **Recommendation:** Decouple the leadin fade from budget allocation by gating its appearance to *after* the user has acknowledged consent (show only when `state.consentAck` flips), moving the ethical framing earlier in the flow. (script.js:4799, 4824, 7999)

**POLISH:** Kids mode filters out conflict-tagged vibes from the personality archetype (line 6856) but reserves ~33% of futures for conflict-tagged content (line 6881), creating emotional incoherence — the archetype avoids naming the contradiction the futures explore. **Recommendation:** Either extend the conflict-tag exclusion to the futures pool OR lift the vibe-pool filter so the archetype can name what the futures already embrace, making Kids mode's emotional logic internally consistent. (script.js:6856, 6881)
