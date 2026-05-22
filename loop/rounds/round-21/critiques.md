# Round 21 — Reviewer Critiques (26 issues)

13 reviewers. Strong convergences:
- **6-reviewer convergence on divisor recalibration** (UX POLISH + Science POLISH + Visual Director MAJOR + Plausibility MAJOR + Risk MAJOR + Ethics POLISH): `/90` divisor calibrated for old 1.0 weights; with rebalance the bar reads ~40% shorter for same allocation OR saturates too early depending on framing. Suggested rescale: 90 → 54-70.
- **4-reviewer convergence on Generate-button affordance gap** (UX MAJOR + Ethics MAJOR + Product MAJOR + Narrative Design MAJOR): placeholder copy names the "generate again" mechanism but the button has no visual signal; users may allocate and see no feedback.
- **6-reviewer convergence on placeholder copy register** (Writing MAJOR/POLISH + Detection MAJOR/POLISH + Narrative Design MAJOR/POLISH): "generate again" jars vs Adult-mode clinical voice; "Adjust above first" mildly imperative; Japanese imperative form; Turkish verb repetition.
- **2-reviewer convergence on heritability creep in pressure-note copy** (Sociology MAJOR + Psychology MAJOR): pressure-note now reads as "heritability = lock-in" inverting cascade narrative.

---

## 1. UX REVIEWER

**MAJOR:** Gate flow lacks completion affordance. Copy says "Adjust above first if you want to shape it," framing allocation as shaping-before-reveal, but users won't see visual feedback after moving sliders (placeholder persists until next Generate). Risk: users adjust, see no change, assume their tweaks were lost or wasted, and abandon feature. **Recommendation:** Add a subtle highlight or pulse to the Generate button after the first allocation in gated state (adultGen === 1 && budgetUsed > 0), or surface a micro-label like "Ready to generate with your adjustments" beside the button. (index.html:390 / script.js:7701)

**POLISH:** Lock-In Index bar under-calibrated post-rebalance. Weights dropped (emotional 1.0→0.4, appearance 1.0→0.6) but divisor /90 unchanged, so max pressure now saturates lower for typical allocations. Same spend reads visually lighter, weakening the ethical weight of the allocation panel. **Recommendation:** Recalibrate the /90 divisor down to ~54 (proportional reduction: 90 × (0.4+0.6)/(1.0+1.0)) to restore the bar's dynamic range, OR defer to R22 post-measurement as noted in LOOP_REQUEST. (script.js:10867-10872, 10951)

---

## 2. ETHICS REVIEWER

**MAJOR:** The placeholder "waits until you generate again" names the gate mechanism but the "Generate Projection" button offers no affordance distinguishing the second invocation from the first—no label change, no visual cue, no aria-label variation. A user reading the placeholder knows *what* to do but not *that they can do it* without attempting the button again. **Recommendation:** Add a dynamic aria-label or tooltip to the adult-mode button that changes post-first-generate (e.g., aria-label becomes "Generate Projection Again" or "Reveal your projection" after adultGenerateCount=1), or add a brief subtitle under the placeholder (e.g., "Click Generate Projection again to reveal it") to make the gate mechanism actionable. (script.js:7701, 178)

**POLISH:** The rebalanced weights (emotional 0.4, appearance 0.6) are well-anchored to heritability but the `/90` divisor unchanged from the 1.0-weight era means the Lock-In pressure bar reads ~40% visually shorter for equivalent allocations, risking the false inference that identity lock-in is lower overall. **Recommendation:** Either (1) add an explicit caveat in the pressure-note copy clarifying that the bar's recalibrated height doesn't imply reduced lock-in—just rebalanced weights—or (2) preemptively drop the `/90` divisor to ~60 this round to maintain visual parity. (script.js:10867-10872, 10951)

---

## 3. SCIENCE REVIEWER

**MAJOR:** Appearance weight (0.6) contradicts stated calibration philosophy. Code claims "calibrate weights to empirical heritability range as UPPER BOUND" and calls 0.6 "midpoint of facial-morphology ~50-75%", but 0.6 = 60% sits at the *middle* of the range, not the upper bound (0.75). Emotional (0.4) and sociability (0.4) match stated heritabilities exactly. Either appearance should be 0.75 to match the stated philosophy, or the justification must acknowledge it's a "conservative mid-range estimate" not an upper bound. **Recommendation:** Revise to either (a) defend 0.6 as "mid-range conservative" rather than conflating with "upper bound" logic, or (b) raise appearance to 0.75 to align with upper-bound philosophy. (script.js:10857–10861)

**POLISH:** Divisor `/90` in pressure calculation now miscalibrated relative to new weights. Max theoretical burdenCost drops from ~23.6 (old weights) to ~18.2 (new weights) — a 1.30x compression. For identical user allocations, pressure now reads 6.7 percentage points lower, making "Substantial" tier (0.45–0.75) harder to reach without code justification. **Recommendation:** Change line 10951 from `burdenCost / 90` to `burdenCost / 70` to maintain proportional pressure readout after weight rebalance. (script.js:10951)

---

## 4. WRITING REVIEWER

**MAJOR:** The phrase "you generate again" introduces app-mechanical language that jars against the reflective, sociological voice of trajectory-disclaimer ("What emerges after") and closing-affirmation ("What emerges will be..."). "Generate" reads as developer/interface terminology, not the natural, observational tone established elsewhere. **Recommendation:** Reframe the mechanism without "generate." Try "This projection waits until you click Generate again" (grounds it in UI without the verb standing alone) OR "This projection is provisional until you revisit the form. Adjust above first if you want to shape it." (script.js:1199)

**POLISH:** The verb "Adjust" in "Adjust above first if you want to shape it" carries subtle prescription that slightly undercuts the inviting conditional ("if you want to"). The register feels one notch sharper than the warm clinical tone of closing-affirmation. **Recommendation:** Soften the imperative: "You can adjust above first if you want to shape it" OR "Consider adjusting above if you'd like to shape it." (script.js:1199)

---

## 5. VISUAL DIRECTOR

**MAJOR:** The `/90` divisor in pressure calculation (line 10951) was calibrated when emotional and appearance weights were both 1.0. With R21's rebalance, the bar now compresses its dynamic range into a much narrower visual space. At 10-20% bar fills, the visual difference between "light allocation" and "moderate allocation" becomes imperceptible, causing the Identity Lock-In Index to lose communicative clarity. The gradient also lacks explicit color-stop boundaries pegged to the new pressure thresholds. **Recommendation:** Recalibrate the pressure divisor from `/90` to `/60` or `/70`. Also add explicit color-stop definitions to the gradient in `.projection-bar-fill` (e.g., `0% cyan, 40% purple, 100% pink`). (script.js:10951, style.css:3340)

**POLISH:** The gradient in `.projection-bar-fill` uses three unnamed color stops without explicit position anchors, which causes the purple and pink to bunch toward the right end of the bar fill at small widths. **Recommendation:** Add explicit percentage stops: `linear-gradient(90deg, rgba(126, 224, 255, 0.55) 0%, rgba(200, 155, 255, 0.55) 50%, rgba(255, 155, 210, 0.7) 100%)` so the purple zone becomes visible even at 10-20% bar widths. (style.css:3340)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Pressure-note copy frames heritability in ways that invert the lock-in cascade narrative. Users read "genetic basis...likely heritable" as equivalent to "40–60% fixed," but the simulation's theory is that lock-in propagates via parenting + visual baseline + structural amplification, *not* the heritability % itself. **Recommendation:** Rewrite pressureNote at "Modest" tier to explicitly decouple heritability from propagation: *"Modest · traits at this allocation weight propagate through family identity-templates and environmental cascades; the 40–60% genetic basis suggests plasticity remains high; what locks in is parenting pattern + appearance-benchmark, not trait fixity itself."* (script.js:10965)

**POLISH:** Five traits (emotional 0.4, appearance 0.6, sociability 0.4, empathy 0.4, creativity 0.4) now cluster in the 0.4–0.6 band, reading as a uniform "personality bundle" rather than showing the intended differentiation. **Recommendation:** Slightly widen the band—either raise empathy/creativity to 0.5 (signaling "moderate but distinct") or lower appearance to 0.55 (tighter separation of appearance-phenotype cascades from emotional-behavior cascades). (script.js:10890–10892)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** The rebalance of emotional (1.0 → 0.4) and appearance (1.0 → 0.6) to "match empirical heritability" risks "heritability creep": by anchoring weights to Polderman's twin-study percentages, the narrative now reads as if "0.4 is what the science justifies" — when in fact, that percentage *only* measures biological variation in a specific (predominantly white, Western, middle-class) sample population. The cascade machinery is acknowledged but it comes *after* the heritability number, not before. **Recommendation:** Add one sentence to the Lock-In disclosure clarifying that the weights are *not* empirical percentages, and that "0.4 weight on emotional traits" reflects cascade breadth, *not* the 40% figure from Polderman. (script.js:10852–10893)

**POLISH:** The placeholder text frames the user as the *generative force*: "generate again" puts agency on the user's button-press. But the institutional design subtly reframes the projection as "what will happen if you click Generate, regardless of your choices." This obscures the institutional logic (regulatory and institutional timelines). **Recommendation:** Reword to "The projection below will update when you generate again — adjust above first if you want to shape the inputs." This names the deferral as temporal/technical, not agential. (script.js:7701)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** When language is switched via the lang-select dropdown, the `<dt role="status" aria-live="polite">` element is recreated via full innerHTML replacement. This DOM mutation breaks the screen reader's tracking of the aria-live region, causing the placeholder text to not be re-announced to assistive technology users even though the content changes. **Recommendation:** Replace the innerHTML mutation with targeted DOM updates that preserve the aria-live `<dt>` element and only update its text content, ensuring screen readers maintain their live region subscription. (script.js:7704)

**POLISH:** The English placeholder copy is 11px italic text in a `<dt>` element. On mobile viewports below 540px, the longer text may wrap aggressively and create orphaned words or excessive line breaks. **Recommendation:** Add a mobile media query at max-width 540px to slightly increase line-height or adjust padding for better text containment on narrow viewports. (style.css:3363-3383)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Lock-In Index bar may clamp at 100% fill before max-allocation scenarios reach their semantic ceiling. The pressure formula `pressure = Math.min(1, burdenCost / 90)` was set when emotional + appearance + sociability were each 1.0; new max is ~60% of old max. If divisor not proportionally reduced (from 90 to ~54), every identical allocation registers as 60% the pressure it did before, violating design intent. **Recommendation:** Scale the divisor from 90 to approximately 54 (proportional to the weight rebalance ratio), so theoretical max pressure maps to ~0.88 bar fill and preserves gradient spacing across all four tiers. (script.js:10951)

**POLISH:** The divisor `/90` now mismaps relative historical allocations to the new weight range. An allocation that previously registered as 0.50 pressure will now register as 0.30 pressure, causing backward-incompatible shift in how the same choices read narratively. **Recommendation:** Add a comment at line 10950 clarifying why the divisor was not updated (or, if it should be, update it to 54 and note the calibration bump in the changelog). (script.js:10950)

---

## 10. DETECTION AGENT

**MAJOR:** Japanese translation uses archaic imperative "せよ" instead of conversational suggestion—reads as commanding rather than guiding. Makes the tone feel formalized/template-like. **Recommendation:** Replace "形を与えたい場合は、まず上で調整せよ" with "形を整えたければ、まず上を調整してください" to match the English's suggestive tone. (script.js placeholder i18n object)

**POLISH:** Turkish repeats "ayarla/ayarlamak" in close succession and uses "Şekillendirmek" (abstract philosophical "shaping") rather than the more natural UI verb "biçimlendirmek". **Recommendation:** Revise to "Bu projeksiyon yeniden üretene kadar bekler. Şeklini biçimlendirmek istiyorsan önce yukarıdaki ayarları kontrol et." (script.js placeholder i18n object)

---

## 11. PRODUCT REVIEWER

**MAJOR:** No visual signal on the Generate button that clicking it again will unlock the projection — placeholder text names the mechanism but button affordance is silent. **Recommendation:** Add a subtle visual indicator to the Generate button when the gate is active: badge (e.g., "Next"), button-text variant ("Generate Projection → Reveal"), or discrete pulse animation highlighting the button to draw attention to the required next action. (script.js:7676, index.html:390)

**POLISH:** The gate removal eliminates the moment-of-anticipation tied to allocation. Users now shape sliders in a void with no immediate feedback; reveal only comes on next Generate, severing the reward loop. **Recommendation:** Restore a micro-ritual: either (a) make the placeholder text fade in/out briefly when sliders move to signal "I can shape this," or (b) add a soft glow or state-change animation to the Generate button itself when sliders are adjusted at adultGen=1. (script.js:7657-7667, style.css:3363-3383)

---

## 12. RISK ANALYST

**MAJOR:** At ~75 credits (37.5% of BUDGET_TOTAL), the Identity Lock-In pressure bar may reach visual saturation (100%) due to rebalanced weights interaction with old divisor. Users perceive the bar as "full" while holding 125 credits in reserve, potentially inverting the ethical signal. The bar should indicate proportional burden, not artificial saturation. **Recommendation:** In R22, after verifying pressure calibration, lower the `/90` divisor to `/60` or `/55` so that visual saturation aligns with near-complete budget commitment. This keeps the bar responsive across the full allocation range and prevents premature "already maxed" perception. (script.js:10951)

**MITIGATION:** "Adjust above first if you want to shape it" explicitly frames the purpose of sliders as **iteration and optimization** — user explores allocations, observes projected outcomes, and circles back to refine. This mirrors the optimization workflow the project deliberately rejects. **Recommendation:** Add a framing line that de-emphasizes optimization iteration. Suggested: "Allocations shape the projected outcome. You may adjust once, or not at all — there is no optimal answer." This maintains the "quiet invitation" tone while blocking the iteration loop. (script.js:1199)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The placeholder copy uses instructional/imperative tone ("Adjust above first if you want...") that clashes with Adult mode's clinical, passive register. This disrupts voice consistency and undermines the "allocation as authorship" framing—it reads like a checklist item, not a projection state. **Recommendation:** Reframe as a disciplinary observation: "The projection awaits the next generation cycle. Current allocation parameters stage inputs; refresh to synthesize." (script.js:1199, 7701)

**POLISH:** The gate's suspended state lacks narrative momentum—it doesn't signal suspense or anticipation. The phrase "waits until you generate again" is temporally passive. **Recommendation:** Emphasize the looming reveal moment: "Parameters locked pending next generation. The behavioral synthesis awaits refresh." (script.js:1199, 7701)
