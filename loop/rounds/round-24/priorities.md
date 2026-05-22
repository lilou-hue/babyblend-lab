# Round 24 — Priorities (synthesized from 26 critiques)

**Both R24 Phase 1 changes are recommended for revert.** Two parallel convergences:

1. **6-reviewer convergence: stagger creates engagement-loop** (UX/Ethics/Psychology/Sociology/Product/Risk MAJOR + Narrative Design MAJOR). Trait History gen 4 = "grind 4 generations to unlock the ethical critique" — contradicts R21 Risk philosophy that the project rejects optimization loops. Same pattern as Sibling Cohort gen 3.

2. **8-reviewer convergence: consent-reorder reversed informed-consent ordering** (UX POLISH + Ethics POLISH + Psychology POLISH + Sociology MAJOR + Mobile MAJOR + Plausibility MITIGATION + Risk MITIGATION + Narrative Design MAJOR). The R24 DOM reorder positioned the leadin AFTER budget-panel, so ethics now arrives AFTER user starts allocating — backwards from informed-consent principle.

Plus Plausibility MAJOR — consentAck not persisted across save/load creates exploit (load gen 4 → reset → grind without ack).

The principled response: **revert both Phase 1 changes**, restore the previous design, and document why. R23 had a similar "phase-1 ships an honest attempt → reviewers expose problems → phase-4 corrects" pattern. R24 same.

Strict <80-line diffs per builder.

---

## FRONTEND

NO CHANGE.

(Visual Director POLISH on adjacent-sibling selector becomes moot once UX Flow reverts the reorder.)

---

## SYSTEMS

**PRIMARY — Revert R24 Systems stagger (6-reviewer convergence):**

Restore all 4 gen-2 panels to `< 2` threshold uniformly:
- Sibling Cohort: `< 3` → `< 2` (revert)
- Trait History: `< 4` → `< 2` (revert)
- Societal Brief: `< 2` (unchanged)
- Divergence: `< 2` (unchanged)

Find via:
```
grep -n "adultGenerateCount.*<.*[234]\|R24 stagger" script.js
```

Update the inline R24 stagger comments to commemorate the reverted attempt:
```
// R24 explored staggered reveals (Sibling Cohort < 3, Trait History < 4) per
// R18 Product POLISH, reverted in R24rev after 6-reviewer convergence that:
// (a) gating critical ethical content behind repeated generation creates a
// gamification loop the project deliberately rejects (R21 Risk MITIGATION
// precedent); (b) users generating once or twice would never see Sibling
// Cohort/Trait History — losing the distribution + historical-drift critique
// that contextualizes individual projection. All 4 gen-2 reveals now fire
// uniformly at adultGenerateCount >= 2. Progressive discovery, if desired,
// should be implemented via information density or DOM order, not thresholds.
```

**Secondary — Plausibility MAJOR (consentAck save/load symmetry):**

The exploit path: `adultGenerateCount` persists across save/load but `consentAck` does not. Fix by adding `consentAck` to the saved snapshot.

Find via:
```
grep -n "saveCurrentTimeline\|loadTimeline\|consentAck" script.js | head -20
```

Add `consentAck: state.consentAck` to save snapshot + `state.consentAck = entry.consentAck ?? false` in restore. ~4 lines.

**Tertiary — Plausibility MAJOR alternative (mode-switch reset):**

Optional: also reset `state.consentAck = false` when mode switches away from adult, to handle the in-session edge case. ~2 lines.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

NO CHANGE.

(Writing MAJOR — "the bridge below it" comment fix — becomes part of the UX Flow revert, since the comment is in the consent-reorder block UX Flow will remove.)

---

## EDUCATION

NO CHANGE.

---

## UX FLOW

**PRIMARY — Revert R24 UX Flow consent-awareness reorder (8-reviewer convergence):**

Restore the leadin to its pre-R24 position (BEFORE budget-panel in DOM order), reversing commit `2aa2eee`.

Find via:
```
grep -n "consent-awareness-leadin\|R24 consent.*reorder" index.html script.js style.css
```

**Steps:**

1. **index.html**: Move `#consent-awareness-leadin` back to BEFORE `#budget-panel` in DOM order.
2. **script.js**: Update `applyBudgetPanelGate` so the leadin toggle ordering matches DOM (leadin first, then budget). Restore the pre-R24 comment block describing R7 design rationale.
3. **style.css**: Restore the original adjacent-sibling selector (or remove the `+` selector if it was R24-specific).
4. Remove the "the bridge below it" / "between them" comment about positioning (resolved by revert).

**Document the revert** with a brief commemoration: "R24 explored moving consent-awareness AFTER projection per held-since-R7 deferral; reverted after 8-reviewer convergence that the reorder broke informed-consent ordering (ethics arrives AFTER user starts allocating, not before). R7 placement stands: ethics framing precedes the allocation interface so it functions as informed-consent preamble, not post-hoc justification."

~30-50 lines (revert + comment work).

Strict <60 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

NO CHANGE.

---

## Cross-cutting deferrals (R25+)

- **R18 Product POLISH (panel simultaneous reveal "feels abrupt")** — held indefinitely. The cure (stagger) created MAJORs. If the simultaneous reveal is genuinely a problem, the fix is information-density or DOM-order, not gate thresholds. Open for future batches.
- **R7 deferral "consent AFTER projection"** — held indefinitely. Investigation in R24 revealed the held-deferral was premised on a partial reading of the design. R7 placement (consent BEFORE projection) is correct for informed-consent ordering.
- **Mobile MAJOR — scrollbar-gutter / `<dt>` → `<div>` restructure** — held.
- **Visual Director POLISH `:not([hidden])` selector** — moot after revert.
- **Detection POLISH "progressive discovery" jargon** — moot after revert.
- **Narrative Design POLISH Inner Cohort/Lifetime Drift port to Adult mode** — R25.
- **R12/R14 mid-pick stashes** preserved.
- **Pre-R5 style.css 180-line WIP** preserved.
