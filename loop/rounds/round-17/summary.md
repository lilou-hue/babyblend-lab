# Round 17 — Summary (second of Batch 4, architectural)

Phase 1 (5 + 1 NO CHANGE) → Phase 2 (13 reviewers, 26 issues) → Phase 3 → Phase 4 (5 + 1 NO CHANGE). One Phase-4b conflict (UX Flow DL structure vs. Narrative copy rewrite) resolved by combining structure + new copy.

## Phase 1 — what landed (5 + 1 NO CHANGE)

- **Frontend** (`9dc1650` → `b5869ed`) — Pre-scaffolded `.projection-gated-placeholder` CSS for UX Flow's incoming gate. 22 lines.
- **Systems** (`9c47ebc` → `9ab8e1f`) — Defensive `.text` unwrap in pickAgeTicker + extended audit for object-shape life_shape entries + pinned object-shape contract in docstring. 22 lines.
- **Narrative** (`4c4fef2` → `d308c56`) — Populated `life_shape` tags on 5 of 23 ADULT_TRAJECTORY entries (later bucket only — early/mid are pre-adult): 2 stability / 1 bloom / 1 precarity / 1 caretaking. Updated LOOP_REQUEST with completion note. 10 lines.
- **Education** — NO CHANGE.
- **UX Flow** (`39d1d94` → `df701d8`) — Pre-allocation projection gate scaffolded behind `PROJECTION_GATE_ENABLED` feature flag (currently FALSE — runtime byte-identical). Gate condition: `inAdult && gen === 1 && budgetUsed === 0`. 26 lines.
- **World Design** (`d811d82` → `5ad1d24`) — Cleaned 2 residual "burden" internal comments → "lock-in." 2 lines.

## Phase 2 — critiques (26 issues)

See `loop/rounds/round-17/critiques.md`. Three convergences:

1. **5-reviewer convergence** on the pre-allocation gate placeholder copy (UX MAJOR + Writing MAJOR + Ethics POLISH + Narrative Design MAJOR + Detection MAJOR): imperative tone, dead air, empty `<dt>` semantic, no i18n.
2. **2-reviewer concern** on cross-mode generateCount fragility (Product MAJOR + Risk-adjacent): `gen === 1` gate could expose gen-2+ features after mode-switch.
3. **Psychology MAJOR** stability-caretaking pairing contradiction in the "later" bucket.

Plausibility MAJOR also flagged Sociability heritability weight (1.0 vs. behavioral genetics consensus ~40%).

## Phase 4 — revisions (5 + 1 NO CHANGE)

- **Frontend rev** (`8a99654` → `6a5ec32`) — Padding 8px 12px → 4px 10px (match `.burden-disclaimer` family); margin 4px 0 → 0; color `--ink-soft` → `--ink` @ 0.7 opacity (mobile contrast); font-size 12px → 13.5px (clearer CTA hierarchy). 9 lines.
- **Systems rev** (`a875e3b` → `97dfd59`) — `state.adultGenerateCount` + `state.lastGeneratedInAdult` tracking; gate keys on `adultGen === 1` instead of `gen === 1` (Product MAJOR). Sociability heritability weight 1.0 → 0.4 with Polderman 2015 citation (Plausibility MAJOR). 30 lines.
- **Narrative rev** (`a46c906` → `ca44467`) — Rewrote gate placeholder: "This projection reflects choices yet to be made. Allocate above, and the profile updates to match." + zh/ja/ko/tr in LABEL_I18N (5-reviewer convergence). Added `life_shape: 'mixed'` marker on umbrella ADULT_TRAJECTORY entry (Psychology MAJOR + Narrative Design POLISH). Revised affective-narrowing line at 4448 to accommodate both narrowing and depth (Risk MAJOR). 28 lines.
- **Education** — NO CHANGE. HISTORY_CARDS / KIDS_OCEAN_TOOLTIP already coheres with LIFE_SHAPES anti-normative framing.
- **UX Flow rev** (`067d8ce` → `054d863`) — DL semantic fix: replaced empty `<dt>` + `<dd>` with single `<dt role="status">` carrying the placeholder copy (UX MAJOR). 8 lines.
- **World Design rev** (`86696c0` → `0bdff8c`) — Cosmetic-maintenance framing restored to structural-pressure language at script.js:9402 (Sociology MAJOR); 9391 + 9407 updated to name structural mechanisms instead of passive individual framing. 3 lines.

## Phase 4b conflict resolution

Cherry-picking Narrative rev (`a46c906`) collided with UX Flow rev (`054d863`) — both rewrote the gate placeholder element. UX Flow's structural decision (`<dt role="status">`) + Narrative's copy ("This projection reflects choices yet to be made…") combined into the final form (`ca44467`).

## What was deferred (R18+)

- **LIFE_SHAPES selection wiring** (Systems R18) — Tags populated + 'mixed' marker added; now Systems can wire shape-aware selection.
- **PROJECTION_GATE_ENABLED flag flip** (UX Flow R18) — adultGenerateCount + structural cleanup + i18n'd copy all in place. R18 can flip.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.

## What Round 18 should focus on

R18 = second-to-last of Batch 4. Two architectural items can land:

- **Systems** — **Wire LIFE_SHAPES selection** in the milestone picker. Tagged entries should be selectable by shape; untagged + 'mixed' fall to default pool. Optional: extend the cluster filter to prevent stability + caretaking from co-occurring in the same render.
- **UX Flow** — **Flip `PROJECTION_GATE_ENABLED` flag to true.** All prerequisites are now in place: cross-mode guard (Systems R17rev), DL structure (UX Flow R17rev), copy + i18n (Narrative R17rev), CSS (Frontend R16 + R17). Test gen-1 → gen-2 flow end-to-end.
- **Frontend / Narrative / Education / World Design** — NO CHANGE likely. Verification round.
