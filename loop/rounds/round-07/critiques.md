# Round 7 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Cross-reviewer convergence: 4 reviewers (UX, Product, Risk, Narrative Design) flagged the new R7 consent-awareness placement from different angles; 2 reviewers (Writing, Detection) converged on the same AI-tell line at `script.js:3453`.

---

## 1. UX REVIEWER

**MAJOR:** The consent-awareness lead-in visibility logic (`renderBaby` at script.js:4273-4285) only fires on state changes, risking async timing misalignment where the element unhides *after* the Enhancement Allocation header already rendered, violating the stated intent to precede projection. **Recommendation:** Wire the lead-in visibility into the budget-panel render path or use an explicit show/hide sequence tied to the panel's rendering tick. (index.html:282 / script.js:4273-4285)

**POLISH:** The three kids-arc disclaimers (lines 6613, 6629, 6645) retain varied prefixes ("Not predictions from genes…", "Questions a slider can't answer…", "Reminders of what no slider…") that now read as three separate concepts rather than a coherent arc, undercutting the thematic unity de-stacking was meant to restore. **Recommendation:** Align the three disclaimers under a single conceptual frame (e.g., all starting "Things sliders can't capture:") to restore arc coherence. (script.js:6613, 6629, 6645)

---

## 2. ETHICS REVIEWER

**MAJOR:** The consent-awareness messaging centers on the user's autonomy to choose traits without addressing the *target person's* future right to consent to or modify these inherited choices, leaving the framing as a description of parental choice authority rather than a critique of unilateral inheritance. **Recommendation:** Restructure the consent-awareness framing to explicitly distinguish parental choice authority from the child's future consent rights — name that the child will inherit these traits but cannot challenge them ex-ante. (index.html:282, script.js:4267-4281)

**POLISH:** Kids mode uses friendly trait names (curiosity, kindness, energy, focus, confidence) that map silently to the clinical OCEAN personality dimensions without ever disclosing the translation or the behavioral-prediction framework underneath. **Recommendation:** Add a Kids-mode contextual explainer that reveals the trait-mapping relationship and frames trait exploration as "learning how people are different" rather than building a profile. (script.js:3434-3438, index.html:559-561)

---

## 3. SCIENCE REVIEWER

**MAJOR:** KIDS_RANDOM_EVENTS contains deterministic future language ("It is destiny," "forever," "Will photograph clouds and name every one") that overpromises certainty about behavioral outcomes, conflicting with the educational message that children's futures are shaped by unpredictable lived experience. **Recommendation:** Revise deterministic statements to conditional or probabilistic phrasing ("It is destiny" → "A strong possibility," "forever" → "for now"). (script.js:3642, 3646, 3654, 3679)

**POLISH:** The Yengo et al. 2022 citation (R6-sharpened to "12,111 independent SNPs / ~7,200 genomic regions / ~40% of height variation") lacks a transparent statement that the 40% variance-explained figure applies to a specific ancestry cohort and may not generalize globally. **Recommendation:** Add one clarifying phrase like "in predominantly European-ancestry populations" to acknowledge population-specificity of the height genetics estimate. (script.js:3420)

---

## 4. WRITING REVIEWER

**MAJOR:** "Kindness can be taught and grow over time — it's a habit, not just a trait" uses the "X is not Y, it's Z" parallel-structure template and reads as AI-advice-column language. **Recommendation:** Reframe as direct statement without the negation frame — e.g., "Kindness grows through practice — something kids learn over time." (script.js:3453)

**POLISH:** "Lots of beautiful colors are possible" and "Every shade is healthy and beautiful" (lines 3445, 3448) drift toward sentimental inclusivity-speak rather than the warmer, more concrete tone Kids mode should maintain. **Recommendation:** Shift to factual observation: "Many different eye colors run in families" and "Skin tone comes from both parents' genes — there are lots of different shades." (script.js:3445, 3448)

---

## 5. VISUAL DIRECTOR

**MAJOR:** The `#consent-awareness-leadin` container has no CSS styling at all, leaving the inner 12px italic note with only a 2px left border visually dominated by the massive backdrop-blurred budget panel that follows, diluting the message about heritable lock-in. **Recommendation:** Add `#consent-awareness-leadin` rule with subtle background, padding, and rounded border (matching the `.consent-ack-prompt` aesthetic) so the message has adequate visual presence before the major section. (style.css — missing rule near line 3407)

**POLISH:** `.history-chevron` has `transition: transform 0.2s` but no corresponding `prefers-reduced-motion` guard, while its sibling `.history-content` IS guarded — accessibility inconsistency. **Recommendation:** Add `.history-chevron` to the prefers-reduced-motion block covering `.history-content` to suppress the rotate transform. (style.css:2993)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** KIDS_FUTURE_PATHS lacks conflict tags, breaking the architectural intent (established in Batch 1) to surface personality friction in Kids mode — Kids mode currently shows only conflict-free futures. **Recommendation:** Tag the relevant KIDS_FUTURE_PATHS entries with the same `tag` field used in `FUTURE_PATHS` so conflict-aware selection works symmetrically across modes. (script.js — KIDS_FUTURE_PATHS region)

**POLISH:** The 3 new R6 precarious-work futures in KIDS_ADULT_FUTURES ("pieces together three part-time jobs," "first job didn't pay enough, so they tried again," "took years off to care for a parent") use agentic, choice-coded language that misrepresents the psychology of sustained economic stress. **Recommendation:** Rephrase one of the three in less agentic terms — e.g., "Maybe someone whose first job didn't pay enough" rather than "tried again" framing. (script.js:3931-3933)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** KIDS_QUESTIONS_FOR_THEM (lines 3813-3830) presumes middle-class stability throughout — private room, art materials, nature access, privacy — excluding kids in poverty, crowded housing, or institutional care. **Recommendation:** Add 2-3 questions that work for kids without private space, abundant resources, or unmonitored autonomy. (script.js:3813-3830)

**POLISH:** KIDS_REFLECTION_PROMPTS line 3941 ("If you could give every kid in the world one thing, what would it be?") assumes choice-abundance framing without acknowledging that some kids need basics (food, safety, shelter). **Recommendation:** Reframe to "What do you think every kid needs?" — preserves the curiosity prompt while removing the abundance assumption. (script.js:3941)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** Range slider thumbs are sized at 18×18px, falling below the 44px minimum touch target recommendation and creating difficult interactions on mobile devices. **Recommendation:** Increase range slider thumb dimensions to ≥44×44px, or implement a larger hit-area overlay via padding/pseudo-element so the visible thumb stays small but the touch target is compliant. (style.css:529, 538)

**POLISH (a11y):** Footer/site-footer links lack explicit color overrides against their backgrounds; in some panel contexts they may not meet WCAG AA 4.5:1 contrast. **Recommendation:** Add explicit color definitions to `.site-footer .footer-link` and verify each rendered context against contrast ratio requirements. (style.css:622-626)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** The "EU IVD-Germ Lines Directive" is a fictional regulation presented with specific Articles (4, 7, 9) as though it's a real EU instrument, creating misleading institutional plausibility for a reader who might assume it exists. **Recommendation:** Either clearly mark it as speculative throughout ("EU proposal for…", "draft IVD-Germline Directive (hypothetical)") or add a regulatory-card footnote that the directive is diegetic world-building. (script.js:6740-6745)

**POLISH:** Classification codes "CMP-2" (cognitive optimization) and "CMP-4" (affective-band editing) appear in REGULATORY_NOTE_RULES with no introductory glossary, reading as established regulatory shorthand when they're invented. **Recommendation:** Add a one-line comment above the CMP-using regulatory rules explaining that CMP codes are diegetic classification markers used only within this simulator's fictional regulatory framework. (script.js:3326)

---

## 10. DETECTION AGENT

**MAJOR:** "Kindness can be taught and grow over time — it's a habit, not just a trait." (line 3453) is the "X is not just Y, it's Z" template with motivational language ("can be taught and grow") — classic AI tell, universalizing platitude with em-dash flourish. **Recommendation:** Replace with concrete observation — "Kindness shows up differently depending on the situation and person — some kids are kind in big groups, others one-on-one." (script.js:3453)

**POLISH:** "These are just stories of *possible* lives. Your real one might be completely different — and that's what makes it exciting." (line 3461) uses the Reddit-core "that's what makes it X" closure pattern. **Recommendation:** Cut the synthesis: "These are just stories of *possible* lives. Your real one will be shaped by choices, people, and moments no simulator can predict." (script.js:3461)

---

## 11. PRODUCT REVIEWER

**MAJOR:** The consent-awareness note appears at gen ≥ 1 *before* the behavioral projection renders (baby stats, archetype, traces), making the ethical warning abstract and disconnected from what users can actually optimize, reducing its impact on informed decision-making. **Recommendation:** Move the leadin to render immediately after baby-panel content completes (within `.baby-panel-footer` or equivalent), so users first see what they're optimizing, then confront the ethical consequence. (index.html:282, script.js:4281)

**POLISH:** Societal Outcomes, Sibling Cohort, and Trait History panels gate at gen ≥ 2, forcing first-time users to optimize in a consequence-free vacuum and discover downstream impact retroactively on Gen 2. **Recommendation:** Unlock a small collapsed "Impact Preview" at gen ≥ 1 surfacing 2–3 SOCIETAL_RULES outcomes alongside the burden index, so first-decision cascade effects are visible. (script.js:6480, 6697, 6759)

---

## 12. RISK ANALYST

**MAJOR:** The consent-awareness note "The person this concerns is not in the room — and will inherit whichever balance you settle on" reads as endorsement of parental unilateral control when screenshotted outside its UI context, inverting the ethical intent. **Recommendation:** Prefix the note with "Ethically: " (or "From the subject's standpoint: ") to anchor it as a problem statement rather than a normalizing premise. (script.js:4281)

**MITIGATION:** Add a brief precarious-futures content note in the futures-panel intro paragraph (alongside the existing "illustrative, not predictive" language) stating that economic challenges shown are examples of adaptive variance, not predictive outcomes. (index.html — `.futures-panel > p.subtle`)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The consent-awareness lead-in introduces abstract ethical framing *before* the behavioral projection, breaking the dramatic arc by making users contemplate ethics before meeting the projected person — emotional stakes should precede ethical framing. **Recommendation:** Render the behavioral projection first (archetype + stats), then introduce the consent-awareness note as the bridge into Enhancement Allocation. (script.js:4281)

**POLISH:** The three Kids arc panels each open with a negative disclaimer ("not predictions," "can't answer," "can't capture"), creating disclaimer fatigue across three consecutive sections that undermines the affirmation register. **Recommendation:** Consolidate the three disclaimers into a single preface above all three panels, or defer them into a single footer line, so the arc leads with affirmation. (script.js:6600-6650)
