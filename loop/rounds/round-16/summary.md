# Round 16 — Summary (first of Batch 4, architectural deferrals)

Phase 1 (5 + 1 NO CHANGE) → Phase 2 (13 reviewers, 26 issues) → Phase 3 (synthesis) → Phase 4 (5 + 1 NO CHANGE). Two coordinated architectural items shipped (Burden Index rename + REFLECTION closing slot + LIFE_SHAPES schema scaffold); Phase 4 polished all of them after 6-reviewer convergence on the new closing copy.

## Phase 1 — what landed (5 + 1 NO CHANGE)

- **Frontend** (`409506e` → `774cd6e`) — Pre-added `.reflection-arc-closing` CSS scaffolding mirroring `.kids-arc-closing` (R13 reference). 17 lines.
- **Systems** (`039b286` → `05639f8`) — **LIFE_SHAPES schema** (stability / interruption / bloom / precarity) above ADULT_TRAJECTORY_MILESTONES + LOOP_REQUEST(narrative) handoff + audit IIFE extension. No behavior change (schema lands inert). 47 lines.
- **Narrative** (`12174a6` → `46aab2f`) — Defined `REFLECTION_ARC_CLOSING_AFFIRMATION` constant with 5-language array. 14 lines.
- **Education** — NO CHANGE. No Burden Index references in HISTORY_CARDS / Kids surfaces.
- **UX Flow** (`f51c1de` → `c75c14b`) — Added REFLECTION_ARC_CLOSING_AFFIRMATION render slot in both Reflection and Adult render paths (with `role="doc-conclusion"`). 18 lines.
- **World Design** (`bde0a09` → `2d8ab7a`) — **"Inheritance Burden Index" → "Identity Lock-In Index" full rename** across 5 languages (the architectural carryover since Batch 1). budget.proj.burden label, "Burden ≠ heritability" → "Lock-in ≠ heritability" REGULATORY_CARDS title+body, index.html hardcoded fallback, adult-budget docstring. Internal identifiers preserved (INHERITANCE_BURDEN_WEIGHTS, CSS classes, i18n keys, var names). 17/-17 = 34 lines.

## Phase 2 — critiques (26 issues from 13 reviewers)

See `loop/rounds/round-16/critiques.md`. Three strong convergences:

1. **6-reviewer convergence on REFLECTION_ARC_CLOSING_AFFIRMATION** — Writing MAJOR ("AI template"), Detection MAJOR ("many/one symmetric template"), Psychology POLISH ("too tidy"), Product MAJOR ("lacks agency"), Risk MAJOR ("screenshot-quotable"), Narrative Design MAJOR ("Adult-mode buried in `<details>`"). Strongest convergence of R16.

2. **5-reviewer concern on "Identity Lock-In Index" name** — Ethics + Science + Sociology + Product wanted a different name (Consent Propagation Index, Heritability Propagation Index). Plausibility MAJOR flagged residual "burden tier" leftovers. **Synthesis decision: hold the name** (R16 just shipped the rename; whiplash isn't worth it); address via residual cleanup + clarifier in the disclosure card.

3. **3-4 reviewer concerns on LIFE_SHAPES** — Psychology MAJOR (caretaking shape missing), Science POLISH (no developmental-psych grounding), Ethics POLISH (normative/deviant value hierarchy), Sociology POLISH (essentializing precarity).

## Phase 4 — revisions (5 commits + 1 NO CHANGE)

- **Frontend rev** (`49b039d` → `9ed3091`) — `.reflection-arc-closing` line-height 1.55→1.5 (Visual Director MAJOR); removed redundant font-family; mobile breakpoint @768px → 13px font + 12px margin; `.pause-cant-see li` 44px touch target in mobile breakpoint. 27 lines.
- **Systems rev** (`687cafb` → `71e5ad7`) — Added `caretaking` LIFE_SHAPE entry (Psychology MAJOR) + 10-line framing docstring above LIFE_SHAPES (converges Science + Ethics + Sociology polish — "narrative taxonomy, not literature; precarity is structurally produced, not essential"). 13 lines.
- **Narrative rev** (`8c18bee` → `c3c0dd2`) — **REFLECTION_ARC_CLOSING_AFFIRMATION rewritten** across 5 langs: "What emerges will be partly theirs, partly circumstance, entirely real." Three-clause structure dissolves the many/one template, drops AI-template opener, acknowledges constraint alongside agency, resists screenshot-misread. Plus: REFLECTION_OBSERVATIONS line 2121 "Optimization assumes a destination. There isn't one." → "Optimization assumes there's an endpoint. This child's life has none." (5 langs, Detection POLISH). 16 lines.
- **Education** — NO CHANGE. No HISTORY_CARDS references to old name.
- **UX Flow rev** (`a95a36a` → `7d45b36`) — **Dropped the closing affirmation from Adult mode** (Narrative Design MAJOR — closing was buried inside `<details>`). Register fit (poetic vs institutional) matters more than mode-arc parity. Closing now Reflection-only. 7 lines.
- **World Design rev** (`c01864c` → `f14b165`) — Replaced user-visible "at this burden tier" → "lock-in tier"; updated 2 internal comments; extended "Lock-in ≠ heritability." REGULATORY_CARDS entry with clarifier sentence ("Index measures how widely a heritable allocation's effects propagate across descendants — not how rigidly any individual trait is fixed") across 5 langs. 11 lines.

## What was deferred (R17+)

- **"Identity Lock-In Index" alternative name** — 4-reviewer concern. Held; if reviewers reassert in R17, revisit (candidates: Heritability Propagation Index, Consent Propagation Index).
- **LIFE_SHAPES population on ADULT_TRAJECTORY_MILESTONES** — Narrative R17 (Systems' R16 LOOP_REQUEST handoff). Tag individual milestone entries with `life_shape` field; Systems then wires selection.
- **Pre-allocation slider gate** (architectural).
- **ADULT_TRAJECTORY linear-progression refactor** (multi-round; partially scaffolded by LIFE_SHAPES).
- **Move consent-awareness AFTER projection** (R7 architectural).
- **Kids-mode onboarding panel** (new mechanic).
- **R12/R14 mid-pick stashes** preserved.

## What Round 17 should focus on

Batch 4 architectural continuation:

- **Frontend** — Likely NO CHANGE. Verification pass.
- **Systems** — Wait for Narrative to populate `life_shape` tags, then wire selection. NO CHANGE this round.
- **Narrative** — **Populate `life_shape` on ADULT_TRAJECTORY_MILESTONES entries** (close Systems' R16 LOOP_REQUEST). Tag relevant entries with stability / interruption / bloom / precarity / caretaking. Likely 20-30 entries × tag = ~30-50 line diff.
- **Education** — NO CHANGE likely.
- **UX Flow** — **Pre-allocation slider gate**: scope the architectural change — when does trait projection display, given allocations affect projections? Add gating that defers projection until first allocation in Adult mode. Higher-risk merge.
- **World Design** — Likely NO CHANGE. Or pick up another small institutional polish item.
