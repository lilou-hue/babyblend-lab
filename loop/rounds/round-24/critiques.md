# Round 24 — Reviewer Critiques (26 issues)

13 reviewers. **Both R24 Phase 1 changes flagged by majority reviewers as creating problems worse than they solved.** Two parallel convergences:

- **6-reviewer convergence on stagger creating gamification/engagement-loop** (UX MAJOR + Ethics MAJOR + Psychology MAJOR + Sociology MAJOR + Product MAJOR + Risk MAJOR): Sibling Cohort at gen 3 + Trait History at gen 4 reward repeated generation — exactly the optimization workflow the project deliberately rejects (R21 Risk MITIGATION precedent). Several recommend reverting to gen 2 across the board.

- **8-reviewer convergence on consent-reorder reversal** (UX POLISH + Ethics POLISH + Psychology POLISH + Sociology MAJOR + Mobile MAJOR + Plausibility MITIGATION + Risk MITIGATION + Narrative Design MAJOR): the leadin reorder broke informed-consent ordering — ethics now arrives AFTER user has already started allocating. Reviewers recommend either revert to R7 placement OR add a pre-budget consent breadcrumb.

- **Plausibility MAJOR**: `consentAck` doesn't persist across save/load — save/load bypasses the consent micro-gate.

---

## 1. UX REVIEWER

**MAJOR:** Sibling Cohort gen 3 unlock feels arbitrary because the stagger gate is silent. Users see Societal Brief (gen 2), then don't see Sibling Cohort until they generate again, with no UI signal explaining the relationship. The intended narrative ("cohort makes sense after societal context") is invisible. **Recommendation:** Add a dismissible hint banner that surfaces when Sibling Cohort first unlocks (gen 3) OR collapse the stagger so Sibling Cohort fires at gen 2 alongside Societal Brief + Divergence. (script.js:9992-9996)

**POLISH:** Consent-awareness leadin between budget-panel and consent-panel now reads as a preamble to Consent Implications rather than a response to the projection, repeating the ethical frame already in the full panel. **Recommendation:** Either (1) move leadin *after* Consent Implications panel, or (2) revise Consent Implications intro copy to avoid restating the child-absence/choice-propagation frame. (index.html:349-361, script.js:6915, style.css:3555-3567)

---

## 2. ETHICS REVIEWER

**MAJOR:** The staggered reveal pattern for Trait History (requiring 4 generations before visibility) creates a subtle engagement-loop reward system that conflicts with the panel's critical function. By gating critical ethical content behind repeated interaction targets, the system subtly conditions users to keep generating to "earn" ethical reflection — inverting the consent-awareness goal. **Recommendation:** Move Trait History unlock to `adultGenerateCount >= 2` (same as Societal Brief/Divergence), or introduce it with an explicit disclaimer that it is not earned content but foundational context. (script.js:10065, 10061-10064)

**POLISH:** The consent-awareness leadin repositioned AFTER #budget-panel (R24) now appears after the user has already moved allocation sliders, converting the ethical framing from informed-consent preamble to post-hoc justification. **Recommendation:** Restore the consent-awareness leadin to precede the Enhancement Allocation panel in DOM order (before #budget-panel), so the ethical framing is visible before users begin slider interaction. (index.html:349-361, script.js:6894-6940, style.css:3656)

---

## 3. SCIENCE REVIEWER

**MAJOR:** The Trait History stagger creates a behavioral-genetics messaging inversion. Sequence inheritance → historical drift is sound, but R24's stagger reverses it: by moving Trait History to gen 4, users see Sibling Cohort at gen 3 (inheritance variance framing) without the Trait History context that reframes inheritance as culturally unstable. A user generating 1→2→3 reads sibling variance as biological fact before learning "but these traits drift culturally." **Recommendation:** Either (a) move Trait History back to gen 2 alongside Sibling Cohort, or (b) add a disclaimer in the Sibling Cohort subtitle noting "see Trait History for how 'desirability' itself drifts." (script.js:10015, 10065)

**POLISH:** The consent-awareness repositioning has lineage framing impact — the old R7 order presented ethical framing as **precedent to choice**; the new R24 order presents it as **response to seeing the projection**. For lineage tree visualization context, the reorder means users encounter Enhancement Allocation → Consent Awareness → Consent Implications without the tree context of "where does this child sit in a family line?" **Recommendation:** Consider whether Trait History's gen 4 placement should actually be gen 2 alongside Sibling Cohort, with lineage-context immediately following before Consent Implications are psychologically "closed." (index.html:581, script.js:10065, 9094)

---

## 4. WRITING REVIEWER

**MAJOR:** The comment "the ethical framing as the bridge below it" (script.js:6940) uses directional language ("below") that contradicts the redesigned DOM flow where the leadin now sits between the projection and Consent Implications. **Recommendation:** Change "the bridge below it" to "the bridge between them" or remove directional language entirely. (script.js:6940)

**POLISH:** The phrase "progressive discovery" (script.js:9992) adopts AI/UX-design jargon inconsistent with the project's direct human voice. **Recommendation:** Replace with "discovery remains meaningful" or "the user still feels earned discovery" to match the conversational tone of surrounding comments. (script.js:9992)

---

## 5. VISUAL DIRECTOR

**MAJOR:** Leadin positioned between panels lacks top margin, reading as continuation rather than independent response bridge; visually compressed against budget-panel despite design intent for it to be a "bridge" with breathing room. **Recommendation:** Add `margin-top: 12px;` to `#consent-awareness-leadin` to establish visual separation from budget-panel. (style.css:3573)

**POLISH:** Adjacent-sibling selector `-6px margin` on consent-panel applies even when leadin is hidden, creating spacing inconsistency. **Recommendation:** Use `:not([hidden])` selector: `#consent-awareness-leadin:not([hidden]) + .consent-panel { margin-top: -6px; }`. (style.css:3656)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Staggered Trait History unlock at gen 4 creates a sunk-cost engagement trap — users must commit to 4 separate generations specifically to access "deeper information." This directly inverts the project's core consent resistance: instead of a friction mechanism that discourages heritable choices, it becomes a gamification ladder that rewards repeated optimization cycles. **Recommendation:** Unlock Trait History at gen 2 (with Societal Brief) or reframe the gate as an *optional* reflective layer triggered by a user-initiated action ("Explore trait drift across centuries") rather than a generational threshold. (script.js:10061-10065)

**POLISH:** The consent-awareness leadin announcement order (toggle precedes budget-panel unhide) doesn't match visual sequencing — screen readers encounter the ethical note after the projection aria-live, but sighted users see it between numbers and Consent Implications. **Recommendation:** Move the leadin toggle to *after* the budget-panel gate in applyBudgetPanelGate to synchronize announcement and visual order. (script.js:6905-6947)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** Staggered Sibling Cohort unlock (gen 3) risks users who generate once or twice never encountering the panel that demonstrates genetic variation as demographic distribution. Sibling Cohort is the only panel explicitly showing variance as distribution. **Recommendation:** Move Sibling Cohort back to gen 2 (wave 1) alongside Societal Brief + Divergence, or add a note in gen 2 panels explicitly saying "see X more outcomes by generating again." (script.js:9996, 9737-9738)

**POLISH:** Consent-awareness leadin DOM reorder makes the ethical frame appear *after* budget manipulation rather than *before* it. This shifts institutional communication from "ethics frames your decision" to "you decided, here's what it's called institutionally." **Recommendation:** Restore R7 placement (leadin before budget) or add a brief pre-budget note saying "this affects someone not in the room" to preserve upstream ethical framing. (index.html:349-361, script.js:6894-6940)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** Multiple `aria-live="polite"` regions in budget-panel context create uncontrolled announcement priority when consent-awareness-leadin appears. Screen readers may announce budget-projections live update OR leadin notice unpredictably, breaking sequential narrative flow critical on mobile viewports. **Recommendation:** Mark consent-awareness-leadin's wrapper with `role="region" aria-label="Ethical framing"` and apply `aria-relevant="additions text"`. Ensure applyBudgetPanelGate() delays leadin visibility flip until after budget-projections settle (add 50ms setTimeout). (index.html:361, script.js:6919)

**POLISH:** The consent-awareness-leadin `<div>` with aria-live="polite" wraps a `<p class="consent-awareness-note">` child, creating nested text announcement structure. **Recommendation:** Restructure consent-awareness-leadin from `<div>` to `<section role="doc-tip" aria-label="Ethical consideration">`. (index.html:361)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** `state.consentAck` persists as `true` across mode switches AND save/load is asymmetric. Edge case: user generates 3x in adult, acks consent, switches to reflection, then back to adult — the leadin is permanently suppressed. Additionally `consentAck` is NOT persisted across save/load while `adultGenerateCount` IS, creating exploit: load a save at gen 4 → Trait History visible → reset baby → grind generations without re-acknowledging. **Recommendation:** Either (a) reset `state.consentAck = false` when mode switches away from adult, OR (b) persist `consentAck` in saved snapshot to keep state symmetric. (script.js:6760, 10513, 11312-11314)

**POLISH:** Stale `.consent-awareness-note.is-leaving` node state from prior session can interfere with consent panel reveal animation if user rapidly mode-switches during the 500ms fade window. **Recommendation:** Clear `.is-leaving` notes synchronously when switching modes via `document.querySelectorAll('.consent-awareness-note.is-leaving').forEach(n => n.remove())`. (script.js:6920, 6928, 10803, 10865, 10871)

---

## 10. DETECTION AGENT

**MAJOR:** Inconsistent R24 stagger comment formatting — Societal Brief (line 9737) and Divergence (line 9781) comments omit the "(Product POLISH from R18)" attribution and longer rationale that Sibling Cohort/Trait History comments include. **Recommendation:** Align Societal Brief and Divergence comments to match the attributive pattern, or strip the longer rationale from all 4. (script.js:9737, 9781)

**POLISH:** The consent-reorder block comment uses natural human voice describing implementation, but the STATE.md deferral flagged this as still-pending investigation while the comment announces it as completed. **Recommendation:** Adjust comment to indicate this is the new state (just shipped in R24). (script.js:6894-6904)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Stagger creates engagement-reward loop contradicting R21 Risk philosophy. Gates at adultGenerateCount ≥ 2, ≥ 3, ≥ 4 incentivize users to repeatedly generate to unlock Sibling Cohort and Trait History — mirroring the optimization workflow the project deliberately rejects. The feature framing as "progressive discovery" masks a gamification loop. **Recommendation:** Remove the stagger. Return all 4 panels to gen ≥ 2, then add transparency about why earlier panels appear first in *DOM order* without resorting to thresholds. If progressive discovery is desired, implement via *information density* not gate thresholds. (script.js:9988, 10057)

**POLISH:** Consent-awareness leadin's visibility flip precedes visual projection arrival, undercutting R24's stated intent. The DOM orders leadin *after* #budget-panel but applyBudgetPanelGate sets `leadin.hidden = false` BEFORE the panel unhides. **Recommendation:** Reorder applyBudgetPanelGate to unhide panel first, then leadin, OR defer leadin content via `requestAnimationFrame`. (script.js:6891-6946, index.html:349-361)

---

## 12. RISK ANALYST

**MAJOR:** Reveal grinding via save/load cycle. `adultGenerateCount` persists across save/load but `consentAck` does not (never persisted, always resets). A user at gen 4+ can save, then load that save in a new session — Trait History is immediately visible because `adultGenerateCount` is restored. They can then reset baby and re-generate without re-acknowledging the consent micro-prompt. **Recommendation:** Either (a) persist `consentAck` alongside `adultGenerateCount` in the save bundle, or (b) reset `adultGenerateCount` to 0 when a new session loads a timeline without that session's consent acknowledgments. (script.js:10513, 6760)

**MITIGATION:** Consent Awareness Arrives After Budget Visibility — Reversing Informed Consent Sequence. The consent-awareness leadin is set to `hidden=false` AFTER the budget panel is unhidden. Users see the budget interface with unlocked sliders, start adjusting, then the awareness note appears — informed consent requires awareness *before* the decision, not after. **Recommendation:** Reorder the DOM to place `consent-awareness-leadin` *before* `#budget-panel`, or guard budget-panel unlock to require explicit `consentAck` before sliders become interactive. (index.html:276, script.js:6907)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Stagger creates engagement-reward loop contradicting R21 Risk philosophy. Trait History gen 4 worst offender. The feature framing as "progressive discovery" masks a gamification loop: users perceive generational progression as unlocking new analytical capabilities, not as exploring outcomes they already have the right to see. **Recommendation:** Remove or invert the stagger. Return all 4 panels to gen ≥ 2; address progressive-discovery concerns via information density or DOM order rather than gate thresholds that reward repeated interaction. (script.js:9988, 10057)

**POLISH:** Consent-awareness leadin lacks animation-delay on entrance to support sequential reading as an ethical bridge. **Recommendation:** Add `animation-delay: 0.45s` to `#consent-awareness-leadin .consent-awareness-note` entrance animation to follow budget-panel settle motion. (style.css:3590, script.js:6919)
