# Round 17 — Reviewer Critiques (26 issues)

13 reviewers. Strong convergences:
- **5 reviewers on the pre-allocation gate placeholder** (UX MAJOR + Writing MAJOR + Ethics POLISH + Narrative Design MAJOR + Product POLISH): imperative tone, dead air, semantic-DL misuse, no i18n, conflates allocation with "informed" view.
- **2 reviewers on life_shape coverage** (Science MAJOR + Psychology MAJOR): tags only on EN parallels; stability/caretaking pairing contradiction.
- **2 reviewers on cross-mode gate fragility** (Product MAJOR + scope note): `gen === 1` gate could expose gen-2+ features after mode-switch.

---

## 1. UX REVIEWER

**MAJOR:** Placeholder uses an empty `<dt>` anchor + centered `<dd>` inside the projection definition list — breaks semantic DL rhythm and may confuse screen readers on mobile where the grid layout collapses. **Recommendation:** Replace empty dt/dd with a `<div role="status">` block styled independently. (script.js:7615-7617)

**POLISH:** 12px italic on the placeholder lacks visual hierarchy as an action-inviting prompt — reads like another disclaimer rather than a CTA. **Recommendation:** Bump to ~13.5px + subtle accent border. (style.css:3333-3343)

---

## 2. ETHICS REVIEWER

**MAJOR:** `life_shape` taxonomy ships with 2 stability entries in the "later" bucket but only 1 each of bloom/precarity/caretaking — risks reifying "stability" as the normative default. **Recommendation:** Either tag more entries in non-stability shapes OR add UI framing that life shapes aren't optimization targets — they're observable patterns, regardless of allocation. (script.js:4444-4453)

**POLISH:** Gate placeholder "Move your first allocation to see this version's projection." frames *not* allocating as incomplete/uninformed — subtly normalizes allocation as a standard first step rather than an optional governance choice. **Recommendation:** Revise to acknowledge allocation is optional — e.g., "This projection updates once you move an allocation. Skipping is fine." (script.js:7617)

---

## 3. SCIENCE REVIEWER

**MAJOR:** `life_shape` tags are populated in EN ADULT_TRAJECTORY entries but absent from zh/ja/ko/tr parallel arrays — schema inconsistency. **Recommendation:** Either propagate `life_shape` to non-EN entries (structural metadata is language-independent — same tag string per parallel) OR document explicitly that the tag attaches only to the EN structural entry and selection uses index-correspondence to find translations. (script.js:4451-4465)

**POLISH:** Pre-allocation gate placeholder copy untranslated + no LABEL_I18N entry — non-EN users will see English fallback. **Recommendation:** Add EN string to LABEL_I18N with zh/ja/ko/tr translations (LOOP_REQUEST(narrative) flagged the carryover, just promote it to actual translations next round). (script.js:7617)

---

## 4. WRITING REVIEWER

**MAJOR:** "Move your first allocation" is imperative — clashes with the exploratory, conversational tone elsewhere in the app. **Recommendation:** Reframe as invitation: "Allocate to a category to see this version's projection" or "Once you allocate, this projection updates." (script.js:7617)

**POLISH:** "this version's projection" is technical/formal vs. the warmer onboarding voice elsewhere. **Recommendation:** "see how the projection changes" — simpler, more direct. (script.js:7617)

---

## 5. VISUAL DIRECTOR

**MAJOR:** Placeholder padding `8px 12px` is inconsistent with `.burden-disclaimer` family (`2px 0 2px 10px`) — overweights centered content, breaks the restrained-affordance visual language. **Recommendation:** Use `padding: 4px 10px` to match. (style.css:3336)

**POLISH:** Placeholder `margin: 4px 0` conflicts with parent `gap: 6px` — irregular 10px gap. **Recommendation:** Set `margin: 0`, defer to flex-gap. (style.css:3335)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Caretaking entry "identity reorganizes around who needs them" (4451) directly contradicts the 2 stability entries at lines 4444/4446 ("personality largely stable" / "settle into recognizable shape") — when randomly paired in the same render, two mutually exclusive personality theories appear together. **Recommendation:** Once R18 wires shape-aware selection, exclude stability + caretaking from co-occurring; OR add a `life_shape` cluster filter that prevents mutually-exclusive shapes from rendering side-by-side. (script.js:4444, 4446, 4451)

**POLISH:** Bloom entry "thing they are known for arrives after most peers" (4452) contradicts "affective range narrows" (4448) — incompatible theories of late-life personality plasticity. **Recommendation:** Revise 4448 to "Affective range shifts; sometimes narrows, sometimes deepens" — accommodates both theories. (script.js:4448, 4452)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** Line 9402 frames cosmetic-maintenance normalization as developmental milestone despite R6 World Design reframing it as structural pressure. Drift. **Recommendation:** Reframe cosmetic-maintenance as inequality outcome, not inevitable developmental fact. (script.js:9402)

**POLISH:** Lines 9391/9407 use passive individual framing ("stratify," "mismatch") for systemic inequality the codebase elsewhere correctly frames structurally (5018-5024). **Recommendation:** Match the explicit-structural-causation language used elsewhere. (script.js:9391, 9407)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** iPad-portrait projection rows have severely cramped columns due to `minmax(160px, 1fr) minmax(60px, 2fr)` grid not accounting for touch-target padding. **Recommendation:** Add iPad-specific grid adjustment or flex-wrap fallback. (style.css:2021-2023)

**POLISH (a11y):** Projection gated placeholder uses italic + `--ink-soft` — insufficient contrast for low-vision users. **Recommendation:** Use `--ink` with 0.7 opacity for better contrast ratio. (style.css:2005-2014)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Sociability weighted 1.0 in INHERITANCE_BURDEN_WEIGHTS — same weight as appearance/emotional heritability, contradicting behavioral-genetics consensus that Big Five extraversion shows ~40% heritability with high environmental plasticity. **Recommendation:** Reduce Sociability weight to 0.35-0.45 to align with empirical heritability estimates. (script.js:10644)

**POLISH:** Regulatory tier language ("Reference-centre only · 6mo review window · channel code RA-3") preserves fictional terminology despite extensive disclaimer card. **Recommendation:** Either fully commit to diegesis (drop redundant disclaimers) or replace with real-world institutional analogs. (script.js:10686)

---

## 10. DETECTION AGENT

**MAJOR:** Placeholder copy uses abstract noun ("projection") with imperative verb ("Move") — generic-procedural template. **Recommendation:** Replace with the specific consequence — "Allocate above and this profile updates to match." (script.js:7617)

**POLISH:** Flat procedural tone lacks the vivid identity-focused voice found in the closing affirmations. **Recommendation:** Match register — concrete, agentic, brief. (script.js:7617)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Mode-switching doesn't reset `generateCount`, so transitioning non-Adult → Adult at gen-1 lets subsequent Adult renders apply the projection gate after R18 flag flip — exposing gen-2+ features (Trait History, Divergence, Societal Brief) to users on their first Adult generation. **Recommendation:** Reset `generateCount` to 0 when entering Adult mode, OR track `adultGenerateCount` separately. (script.js:7601-7603)

**POLISH:** Gate condition `gen === 1 && budgetUsed === 0` lacks inline documentation of gen-1-only intent — future maintainers may not understand why gen-2+ auto-unlocks. **Recommendation:** Add inline comment explaining the threshold protects "first Adult baby pre-allocation" specifically. (script.js:7603)

---

## 12. RISK ANALYST

**MAJOR:** "Affective range often narrows somewhat with age" (4448), combined with R18's planned shape-aware selection, risks normalizing diminished emotional capacity as a life-trajectory outcome in a gendered-optimization context. **Recommendation:** Reframe to emphasize emotional depth + agency persisting: "Affective expression often shifts; emotional depth persists alongside changed priorities." (script.js:4448)

**MITIGATION:** Move the anti-normative LIFE_SHAPES framing disclaimer from code comments (4333-4342) into user-visible microcopy adjacent to trajectory selections, especially the caretaking entry. (script.js:4333-4349)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Placeholder copy is purely transactional CTA — creates dead air between ethical-awareness leadin and OCEAN reveal when R18 flag flips. Breaks emotional continuity. **Recommendation:** Sustain ethical framing in the placeholder — e.g., "This projection reflects choices yet to be made. Move a slider above to reveal them." (script.js:7617)

**POLISH:** ADULT_TRAJECTORY's mixed-trajectory entry "A working life takes shape..." intentionally untagged to span shapes, but R18 selection won't distinguish intentional-no-tag from incomplete-tagging. **Recommendation:** Add explicit `life_shape: 'mixed'` marker, OR use `life_shape: null` with a comment. (script.js:4445)
