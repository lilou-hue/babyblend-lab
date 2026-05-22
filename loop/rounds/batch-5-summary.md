# Batch 5 — Final Summary ("Clear the deferred backlog")

**5 rounds (R21-R25). 30 commits. 2026-05-22.**

Theme: address deferred items from Batches 1-4 — gate semantics, heritability rebalance, mobile/a11y, life_shape coverage, product flow.

## Deltas

| Metric | Count |
|---|---|
| Commits | 30 |
| Files touched (code) | 3 (script.js, style.css, index.html) |
| Code lines | +341 / −49 (net +292) |
| Per-file: script.js | +316 (mix of architectural + reverts) |
| Per-file: style.css | +72 (mobile/a11y polish) |
| Per-file: index.html | +2 (consent-leadin reorder + revert net unchanged) |
| Total (code + docs) | +1,670 / −87 |

## Key themes addressed

### 1. **Gate semantics + heritability rebalance** — fully shipped (R21)

The two highest-leverage architectural deferrals from Batch 4 closed in R21:

- **Removed `budgetUsed === 0` from projection gate** (Ethics MAJOR from R18). Gate now stays up across all of `adultGen === 1`; only next Generate reveals the projection. The placeholder copy was rewritten to match the new flow: "**This projection awaits the next generation. Adjustments above shape it; no shaping is also a choice.**" (5 langs, R21rev Narrative).
- **Rebalanced INHERITANCE_BURDEN_WEIGHTS** (R19 Science MAJOR alternative): emotional 1.0 → 0.4 (Polderman 2015 neuroticism heritability), appearance 1.0 → 0.6 (facial morphology midpoint). Sociability 0.4 unchanged. Divisor `/90` → `/70` to restore bar dynamic range after the weight rebalance.
- **Generate-button pending-reveal affordance** (4-reviewer convergence on the new gate flow): `.is-pending-reveal` class toggle + aria-label "Click to reveal projection" (5 langs) when gate active. Frontend defined cyan pulse keyframe with `prefers-reduced-motion` guard.
- **Heritability comment rewrite**: "LOCK-IN WEIGHT (not breadth)", structural drivers acknowledged (institutional context, beauty standards, labor-market parenting stress, algorithmic amplification, cosmetic-maintenance normalization), gender asymmetry surfaced.
- **Modest-tier pressureNote decoupled heritability from propagation** (5 langs).

### 2. **Mobile + a11y critical bug catch + fix** — shipped (R22)

- **R22 Phase-1 Systems aria-live preservation was non-functional** — Plausibility MAJOR caught that `statsEl.innerHTML = ...` wiped the placeholder element BEFORE the "reuse" logic ran. Element was destroyed every render → aria-live subscription broken.
- **R22 Phase-4 fix**: detach-before-wipe + reattach pattern. Element identity (and aria-live subscription) now survives the innerHTML wipe.
- Dropped `.ocean-sep` class on placeholder (Narrative Design MAJOR: uppercase + letter-spacing was compressing SR audio).
- Added `aria-atomic="false" aria-relevant="text"` to mitigate slider-drag announcement fatigue.
- Persisted `appMode` + `language` in save/restore (Product POLISH).
- **Frontend disclosure-family polish**: scrollbar styling for `.scrubber-ticker`, ring 3px/0.55 distinguishable from `:hover`, max-height 12em for interruption entry, `.avatar-glow` opacity 0.5 in reduced-motion.
- **UX Flow**: `role="region"` + `aria-label="Milestone description, scrollable"` on `#scrubber-ticker` (Sociology MAJOR + Risk MITIGATION).
- **Narrative**: Chinese REFLECTION_ARC pronoun fix (`他们自己` → `他/她` — singular agreement), Korean trajectory disclaimer period fix (`。` → `.`).

### 3. **life_shape coverage expansion** — explored + reverted (R23)

R23 Phase-1 Narrative attempted to tag 3 early/mid ADULT_TRAJECTORY entries (rhythm-stabilizing infancy, high school identity, early career signals) as `life_shape: 'stability'` across 5 langs. **Phase-2 review converged 8-reviewer-strong:** tagging childhood entries with adult life_shapes:
- (a) Reifies temperament-as-destiny (Ethics + Science + Psychology + Risk MAJOR — contradicts the LIFE_SHAPES framing that these are simulational metaphors, not developmental predictors).
- (b) Created asymmetric coverage where only stability codenames see coherent infancy narratives; other 4 shapes hit silent filter fallback (UX + Sociology + Product + Narrative Design MAJOR).

**R23 Phase-4 reverted** the entire tagging attempt. Restored the R17 principle: early/mid buckets are pre-adult and shape-neutral; filter at 0-29 is a documented no-op by design; shape-aware coherence emerges at age 30+. **Systems added a boot audit warning** for asymmetric shape coverage to prevent future regressions.

### 4. **Product flow** — explored + reverted (R24)

R24 Phase-1 shipped two changes; both flagged by majority reviewers and reverted in Phase-4:

- **Systems staggered gen-2 panel-unlock** (Sibling Cohort `< 3`, Trait History `< 4`). 6-reviewer convergence (UX + Ethics + Psychology + Sociology + Product + Risk + Narrative Design MAJOR): staggering creates gamification/engagement-loop where users "grind generations to unlock the ethical critique" — contradicts R21 Risk MITIGATION on optimization workflows.
- **UX Flow moved consent-awareness leadin** from BEFORE `#budget-panel` to BETWEEN budget-panel and consent-panel. 8-reviewer convergence (UX POLISH + Ethics POLISH + Psychology POLISH + Sociology MAJOR + Mobile MAJOR + Plausibility MITIGATION + Risk MITIGATION + Narrative Design MAJOR): the reorder broke informed-consent ordering (ethics now arrives AFTER user starts allocating).

**R24 Phase-4 reverted both.** All 4 gen-2 panels restored to `< 2` threshold. Consent-awareness leadin restored to R7 placement (BEFORE budget-panel). Plus **Plausibility MAJOR closed**: `consentAck` now persisted in save/load + mode-switch reset.

### 5. **Finale** — strong settling signal (R25)

5 NO CHANGE + 1 single-line Systems comment fix (`state.consentAck` was marked "session-level" but R24rev added save/load persistence + mode-switch reset). Lightest finale touch yet. R5/R15/R20 finale precedent applied.

## Phase-4b conflicts resolved

Zero Phase-4b conflicts across the entire batch. Six of nine commits across R21-R24 revisions cherry-picked clean without intervention. Pattern note: with deliberately constrained ownership-locked builders + revert-friendly Phase 4, conflict frequency stays near zero.

## Process patterns established / reinforced

- **"Phase 1 ships honest attempt → reviewers stress-test → Phase 4 corrects when principle outweighs partial fix."** R22 (aria-live bug fix), R23 (life_shape revert), R24 (stagger + consent reorder reverts) all followed this arc. The carryover list now has explicit "explored and rejected" annotations rather than just "held" for several items, which is actionable knowledge.
- **Multi-reviewer convergence as decision criterion**: when 6-8 reviewers across diverse perspectives flag the same concern with consistent severity, the right move is revert. R23 (8 reviewers), R24 (6 + 8 reviewers).
- **Phase 1 only with strong settling signal** validated for batch finales: R5, R15, R20, R25 all closed Phase-1-only with NO CHANGE majority + 1 small closure. Pattern is durable.
- **Save/restore round-trip integrity** as recurring concern: R18 added `adultGenerateCount`, R19 added `age`, R22 added `appMode + language`, R24 added `consentAck` + mode-switch reset. Cumulative restoration of session-state symmetry.

## What's still open (Batch 6+ candidates)

**Closed by Batch 5 investigation (no longer held):**
- ✓ **R7 "consent AFTER projection"** — R24 closed: R7 placement (consent BEFORE projection) is correct for informed-consent ordering.
- ✓ **UX MAJOR life_shape coverage at 0-29** — R23 closed: requires NEW shape-divergent entries with structural-conditions framing, not retagging universal development.
- ✓ **R18 "simultaneous reveal feels abrupt"** — R24 closed: the cure (stagger) failed; held with rationale.

**Still held:**
- **Mobile MAJOR `<dt role="status">` → `<div>` restructure** — held since R19. Needs CSS grid rework.
- **Mobile MAJOR scrollbar-gutter for CJK** — held.
- **Mobile POLISH placeholder ID rename** — held.
- **Visual Director MAJOR cross-lang structural-consistency audit** — held.
- **Science MAJOR vestibular citation** — held.
- **Risk MAJOR full aria-live debounce** — held (partial mitigation in R22).
- **Narrative Design POLISH Inner Cohort/Lifetime Drift port to Adult mode** — substantial; needs design decision.
- **UX POLISH heritability JSDoc** — cosmetic refactor.
- **Kids-mode onboarding panel** — new mechanic, needs design.
- **R12/R14 mid-pick stashes** preserved.
- **Pre-R5 style.css 180-line WIP** preserved.

## Closing note

Batch 5's mandate was "clear the deferred backlog." Across R21-R25, the batch:

- **Shipped** two heavy architectural items (gate semantics + heritability rebalance) with full reviewer-driven refinement.
- **Caught and fixed** a critical aria-live bug introduced mid-batch.
- **Explored and rejected** three deferrals (life_shape early/mid coverage, panel stagger, consent reorder), each with documented multi-reviewer rationale that now lives in the codebase as commemoration comments.
- **Closed save/restore round-trip integrity** with consentAck + mode-switch reset, completing the cumulative session-state symmetry work from Batches 4-5.

The batch's net effect: substantial architectural progress AND a more honestly documented carryover list. Items that were "held" because no one had time are now distinct from items that were "explored and rejected with rationale" — actionable knowledge for future batches.

Halt branch fires after this round. Next `/loop` invocation requires a new batch kickoff.
