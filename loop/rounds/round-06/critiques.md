# Round 6 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Issues recorded verbatim from each reviewer's response.

---

## 1. UX REVIEWER

**MAJOR:** Kids arc list items lack `:focus-visible` keyboard focus indicators, violating WCAG 2.4.7. **Recommendation:** Add a focus ring to `.kids-arc-panel li` (or equivalent) matching the accent ring used elsewhere. (style.css:5169)

**POLISH:** Kids arc list item borders use 20%-opacity colors creating insufficient visual separation and reducing perceived interactivity. **Recommendation:** Lift border opacity to 40–50% or use solid hairlines so the list reads as a list, not a watercolor wash. (style.css:5172, 5181, 5201, 5204)

---

## 2. ETHICS REVIEWER

**MAJOR:** Kids mode allows unrestricted slider movement to push traits toward extremes (e.g., maximum Curiosity, maximum Energy) without any consent warning, while simultaneously telling users "Difference is the most interesting thing about a person"—this normalizes trait design despite the app's ethical critique. **Recommendation:** Add a soft acknowledgment in Kids mode when sliders are moved away from midparent range (e.g., "You're imagining possibilities — no actual choices are being made here"), or gate slider movement to within the midparent confidence band in Kids mode. (script.js:4185, 5875)

**POLISH:** The Lifetime Drift panel says "The optimization targets you chose will look like different things at each" (Reflection mode), assuming conscious choice, but Kids-mode users may not realize slider movement constitutes "choosing optimization targets" since that language is absent from their mode. **Recommendation:** Use "The possibilities you imagined" instead of "The optimization targets you chose" in Lifetime Drift, or explicitly connect it to slider-setting language when Kids-mode users see this panel. (script.js:5826)

---

## 3. SCIENCE REVIEWER

**MAJOR:** Comment at line 3852 claims "~50% heritability" but PERSONALITY_SIGMA = 1.75 generates a ±3.5 confidence interval on a 1–10 scale, which corresponds to ~30-40% heritability, not 50%. **Recommendation:** Correct the comment to acknowledge the discrepancy (either increase PERSONALITY_SIGMA to 2.3–2.4 for true 50% heritability, or revise the comment to state the actual heritability represented by the current sigma). (script.js:3852)

**POLISH:** HISTORY_CARDS cites "Yengo et al., 2022 — ~12,000 independent variants identified" for height, but Yengo 2022 reports ~9,100 independent loci (signal regions), not ~12,000. **Recommendation:** Revise to "~9,100 independent signal regions" or cite the raw SNP count separately to avoid conflating SNP count with independent genetic contributions. (script.js:2967)

---

## 4. WRITING REVIEWER

**MAJOR:** Line 3232 in KIDS_ADULT_FUTURES contains "Smells faintly of old paper, in the best way" — a saccharine, AI-generated-sounding phrase that violates the grounded, specific tone of Kids copy and reads as Pinterest-caption energy. **Recommendation:** Replace with sensory specificity matching the Kids mode's concrete warmth—e.g., "Smells like dust and library glue" or cut the phrase entirely. (script.js:3232)

**POLISH:** Line 3259 in KIDS_HUMANITY_REMINDERS contains "Everyone has something amazing inside them"—a platitudinous, motivational-poster generalization that doesn't match the grounded specificity of surrounding Kids content and lacks the concrete, emotionally textured voice used throughout. **Recommendation:** Replace with a concrete, emotionally textured observation in line with KIDS_DIFFERENCES or KIDS_LOVES—e.g., "Everyone grows in ways nobody expects." (script.js:3259)

---

## 5. VISUAL DIRECTOR

**MAJOR:** Style and gender toggle buttons use cyan/purple gradients in their `.is-active` states, creating a color collision against the warm peachy palette of Kids mode. **Recommendation:** Add Kids-mode overrides for `.style-btn.is-active` and `.gender-btn.is-active` using warm accent colors (amber/pink) that match the Kids-mode atmospheric palette. (style.css:1212-1223)

**POLISH:** Kids-arc-panel sections are structured with the `kids-arc-panel` class but lack an explicit CSS `grid-template-columns` definition despite the commit message referencing "2-column grid layout." **Recommendation:** Add `.kids-arc-panel { grid-template-columns: 1fr 1fr; }` to ensure consistent spacing and prevent layout drift across Kids mode panels. (style.css or index.html:550-552)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Binary conflict thresholds (O>=8 AND C<=4 for OC-tension) treat extreme and marginal trait imbalances identically, preventing futures for personalities with sub-threshold contradictions. **Recommendation:** Expand TRAIT_CONFLICT_RULES to include graduated thresholds (OC-mild for O>=6 AND C<=5) so conflict-tagged paths match actual tension magnitude. (script.js:5492-5497)

**POLISH:** Adult trajectory milestones (lines 2691-2701) mix incompatible life-arc outcomes ("personality largely stable," "late bloom," "persistent precarity") in a single random pool, allowing selection to pair contradictory premises about the same lifecycle stage. **Recommendation:** Tag each milestone by life-shape variant (stability/interruption/bloom/precarity) and weight selection toward actual trait/environment state instead of uniform sampling. (script.js:2600-2757)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** The KIDS_ADULT_FUTURES pool presents 23 career possibilities as equiprobable without acknowledging gatekeeping by education cost, family capital, or inherited professional networks, yet ADULT_TRAJECTORY_MILESTONES explicitly names "Economic precarity persists into this decade for a non-trivial share of cohorts; stability is not evenly distributed," creating a double message where kids futures normalize privileged pathways as universal while adult lives acknowledge stratification. **Recommendation:** Add 3–4 futures modeling precarious, credential-less, or interrupted work paths (e.g., "Maybe someone who works several part-time jobs," "Maybe someone who changes careers because the first one didn't pay enough") to reflect economic variance already named in adult milestones. (script.js:3222-3246)

**POLISH:** The Appearance enhancement (tier 'Entry', cost 3, tradeoff "Appearance-based social attention above baseline") and clinical outcomes normalizing "Cosmetic-maintenance normalization through adolescence" and "Appearance-correlated compensation premiums" present beauty conformity as inevitable social consequence rather than interrogating cultural standards and enforcement mechanisms that define "improvement." **Recommendation:** Reframe the Appearance outcome rule to name the mechanism: "Cosmetic-maintenance becomes normalized as expected labor, primarily for female-presenting and non-white-coded individuals; cultural beauty standards shift, locking in cohort-specific optimization." (script.js:5661)

---

## 8. MOBILE REVIEWER (a11y second issue)

**MAJOR (mobile):** The parent randomize button (28×28px) falls below the 44px accessibility minimum at iPad widths where it remains the primary interaction for rerolling traits, creating difficulty in precise tapping and forcing compensatory scroll. **Recommendation:** Increase button dimensions to minimum 44×44px or expand clickable hit area via padding to meet WCAG 2.1 Level AA touch-target sizing. (style.css:368-369)

**POLISH (a11y):** The consent-explainer div is dynamically populated with consent rows but receives no focus-visible ring styling or keyboard-focus management, making it inaccessible to keyboard users who cannot visually track when the dynamic content becomes interactive. **Recommendation:** Add `:focus-visible` styling to `.consent-panel .consent-row` elements and implement `aria-live="polite"` region updates on the consent-explainer container to announce newly added consent information to screen readers. (index.html:331)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Oviedo Convention Art. 13 citation references a non-existent "Recital 6" — Oviedo uses Articles only; Recitals are exclusive to EU Directives and would not appear in a 1997 Council of Europe treaty. **Recommendation:** Remove "(Recital 6)" from line 2882 or replace with a real structural reference (e.g., "Article 13" without the recital apparatus). (script.js:2882)

**POLISH:** HFEA 2008 is cited with invented section codes (§3ZA, §4A) that do not exist in the actual 2008 Act, creating false legislative specificity that real biotech insiders would immediately identify as fabricated. **Recommendation:** Either drop the section-number specificity and cite Schedule 2 directly (which is real), or if subsections are needed, verify against actual HFEA 2008 statutory text before publication. (script.js:5969-5971)

---

## 10. DETECTION AGENT

**MAJOR:** "A simulator cannot anticipate a single real Tuesday afternoon" (line 1483) sounds like LLM wisdom — a granular mundane detail paired with abstract universal truth to create false profundity, without saying anything concrete. **Recommendation:** Replace with a concrete statement about what simulation actually misses (unpredictable relationships, genuine accidents, cumulative grief). (script.js:1483)

**POLISH:** "A garden, kept badly, loved deeply" (line 2375) uses the parallel negative/positive adjective template that reads like generated prose; the forced juxtaposition feels emotionally manipulative rather than authentic. **Recommendation:** Simplify to direct language: "A garden they kept badly but loved anyway" or similar — let the contradiction breathe without the symmetrical structure. (script.js:2375)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Adult mode shows a full behavioral projection (personality stats, archetype, trait conflicts) on first generation before the Consent Implications panel unlocks (gated at ≥50 credits) and before the consent-awareness note appears (hidden in collapsed trait-conflicts), causing ethical framing to arrive after psychological lock-in. **Recommendation:** Move the consent-awareness note outside trait-conflicts (visible by default at gen≥1) or suppress personality stats from baby-preview until consent context is accessible. (script.js:4285-4293, 4382-4385, 3566)

**POLISH:** In Adult mode, the Cohort Placement and Inheritance Burden Index projections sit idle at "untouched baseline" state while baby trait sliders are immediately interactive, creating a false retention hook where slider tweaks feel meaningful but have zero effect on actual decision architecture (allocation-driven projections), deceiving users that they're shaping outcomes during preview-only mode. **Recommendation:** Either suppress Burden Index visualization until first non-zero allocation, or add a one-line explainer clarifying that slider tweaks preview outcomes but allocation drives adult projections. (script.js:6143-6202, index.html:296-317)

---

## 12. RISK ANALYST

**MAJOR:** The three new kids-mode panels ("Things they might love," "Questions you could ask them," "What might make them them") are deterministically seeded from trait-slider values, creating the illusion they are genetic outcomes of optimization rather than reminders that real children are irreducibly unpredictable — risking accidental promotion of the eugenic determinism the app critiques. **Recommendation:** Add an explicit subtitle under the three panel headers (e.g., "Not predictions from genes. Examples of all that cannot be sliders.") to clarify these are counterarguments to optimization logic, not outcomes of it. (script.js:5844, 5859, 5875)

**MITIGATION:** Move the disclaimer language ("inspired by, not predictive of") that exists for adult-mode psychology sliders into the kids-mode panels themselves, so each panel opens with an explicit inoculation against reading them as derived from genetic inputs. (script.js:53, 6081 — adapt existing language)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Kids-mode arc panels' affirmation tone ("A specific kind of rock they keep finding") creates tonal dissonance after trait-conflicts render with diagnostic framing ("A careful, sometimes worried kid"), undermining the arc's variance-as-gift resolution by reintroducing structural analysis at the narrative peak. **Recommendation:** In Kids mode, suppress trait-conflicts rendering entirely and let the arc panels stand as the sole thematic conclusion, or reframe trait-conflicts language to mirror the arc's affirmation (e.g., "What might feel tricky, and what helps"). (script.js:4386, 4368)

**POLISH:** The reflection-prompt in Kids mode (line 4413) uses generic restatement questions ("What makes people unique?") that anticipate the arc's own thesis rather than extending it, creating narrative redundancy that deflates the arc's specificity with philosophical abstraction. **Recommendation:** Remove the reflection-prompt in Kids mode entirely, allowing the arc panels to serve as both answer and thematic resolution, or reposition it as a prelude before the arc rather than between trait-conflicts and the panels. (script.js:4413, 3248)
