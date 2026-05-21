# Batch 4 — Final Summary ("Architectural deferrals")

**5 rounds (R16-R20). 50 commits. 2026-05-22.**

Theme: address items deferred across Batches 1-3 that needed architectural moves rather than copy/polish.

## Deltas

| Metric | Count |
|---|---|
| Commits | 50 |
| Files touched (code) | 5 (script.js, style.css, index.html, about.html, about-i18n.js) |
| Files touched (loop docs) | 14 |
| Code lines | +1,191 / −122 (net +1,069) |
| Total lines (code + docs) | +2,467 / −162 |
| Per-file: script.js | +659 / refactor-heavy |
| Per-file: style.css | +250 (disclosure family + framings) |
| Per-file: about.html | +156 (i18n carry-overs that landed during Batch 4) |
| Per-file: about-i18n.js | +240 (new file — separated about-page i18n) |

## Key themes addressed

### 1. **Pre-allocation projection gate** — fully shipped (R16→R18)
The user's first Adult-mode generation now defers OCEAN/projection display until the first allocation. Implementation arc:
- **R16** scaffolded LIFE_SHAPES schema for non-linear adult trajectories + REFLECTION_ARC_CLOSING_AFFIRMATION.
- **R17** added cross-mode `generateCount` guard (Systems), feature flag `PROJECTION_GATE_ENABLED`, gate copy with i18n (5 langs), DL semantic structure.
- **R18** **flipped the flag on**; aligned 4 gen-2 reveal panels (renderSocietalBrief, renderDivergence, renderSiblingCohort, renderTraitHistory) to `adultGenerateCount` instead of global `generateCount`; framed placeholder visually; persisted `adultGenerateCount` in save/restore.
- **R19** finalized placeholder visual treatment (cyan border, 11px font, --ink-mute) as part of the unified disclosure family.

### 2. **Shape-aware life trajectory selection** — fully shipped (R16→R20)
Each codename now gets a deterministic life "shape" (stability / interruption / bloom / precarity / caretaking / mixed) via `seededRand(codename + '|life-shape')`. `pickAgeTicker` filters the milestone pool to entries matching that shape OR untagged OR 'mixed', with a fail-open fallback.
- **R16** Systems defined the LIFE_SHAPES schema; R16rev added caretaking + structural-condition framing comment.
- **R17** Narrative populated 5 EN ADULT_TRAJECTORY entries with `life_shape` tags (2 stability / 1 bloom / 1 precarity / 1 caretaking); R17rev added 'mixed' marker.
- **R18** Systems wired the selection logic (28 lines); Narrative added EN interruption entry; HISTORY_CARDS entry "Life shapes are patterns, not fates" (Elder 1998, Settersten 2003).
- **R19** Narrative translated interruption across zh/ja/ko/tr; extended cross-lang `{ text, life_shape }` tagging to bloom + precarity; major rewrite of interruption entry per 6-reviewer convergence ("reshapes priorities…not always 'recovered'…some change reshapes the trajectory permanently").
- **R20** closed the last cross-lang asymmetry by wrapping caretaking entries in zh/ja/ko/tr.

**End state**: all 5 tagged life_shapes (stability×2, mixed, caretaking, interruption, bloom, precarity) span all 5 languages.

### 3. **Identity Lock-In Index rename** — shipped (R16)
"Inheritance Burden Index" → "Identity Lock-In Index" across full 5-lang rename. R16rev World Design cleaned residual "burden tier" terminology; R17 cleaned 2 more residual comments; R19 Systems rewrote the heritability comment block to reframe weight=1.0 as "LOCK-IN WEIGHT" (not "breadth"), with structural drivers explicit (institutional context, beauty standards, labor-market parenting stress, algorithmic amplification, cosmetic-maintenance normalization) and gender asymmetry surfaced.

### 4. **Save/restore round-trip integrity** — shipped (R18+R19)
- R18 added `adultGenerateCount` + `lastGeneratedInAdult` persistence.
- R19 added `state.age` persistence.
- R19 also fixed language-switch ticker re-render (lang change now calls `renderAgingScrubber()` if a baby is generated).

### 5. **Disclosure microcopy family** — unified (R16→R19)
Three disclosure-microcopy rules (.trajectory-disclaimer, .burden-disclaimer, .projection-gated-placeholder) now share identical cyan rgba(126,224,255,0.20) border-left, 10px padding-left, 11px font-size, 1.5 line-height, var(--ink-mute) color. Burden-disclaimer flipped from warm-amber to cyan to match its cyan-bordered container.

### 6. **Trajectory-disclaimer microcopy** — shipped (R18+R19)
New `<p class="trajectory-disclaimer">` beneath `#scrubber-ticker`, Adult-mode only. Copy migrated R18→R19 from clinical register to narrative voice: **"These patterns are one story among many — not what will happen."** (5 langs, with corrected Turkish plural).

### 7. **Behavioral genetics correction** — shipped (R17)
Sociability heritability weight 1.0 → 0.4 with Polderman 2015 citation (R17 Plausibility MAJOR). R19 added documentation explaining why emotional + appearance still carry 1.0 (lock-in weight, not heritability %), with structural drivers and gender-asymmetry note.

### 8. **Reflection arc closing affirmation** — shipped (R16)
REFLECTION_ARC_CLOSING_AFFIRMATION introduced (R16) and revised (R16rev → R17rev) to its final form: **"What emerges will be partly theirs, partly circumstance, entirely real."** Reflection-mode only — Adult mode register-fit dropped the closer in R16rev.

## Phase-4b conflicts resolved

Three Phase-4b conflicts across the batch, all resolved by combining reviewer-driven structural fixes with reviewer-driven copy fixes:

- **R17** at `script.js:7650` — UX Flow's DL semantic fix (single `<dt role="status">`) + Narrative's new gate copy.
- **R18** at `<dt>` element — UX Flow's `aria-live="polite"` + Narrative's "provisional" rewrite.
- **R19** at trajectory-disclaimer LABEL_I18N — UX Flow's full 5-lang new copy with corrected Turkish plural + Narrative's other edits cherry-picked clean afterward.

## Process patterns established

- **Phase 1 only with strong settling signal** (5+ NO CHANGE majority) is valid for finales — R5 (Batch 1), R15 (Batch 3), R20 (Batch 4) all closed this way.
- **`LOOP_REQUEST(role)` convention** for handing off multi-round refactors persisted: mild-tag i18n (R9→R14→R15); LIFE_SHAPES schema (R16→R17→R18); interruption-shape (R18→R19).
- **Cross-language metadata symmetry** is now a tracked dimension: R17 Science MAJOR's "tags only in EN" concern was fully closed in R20.

## What's still open (Batch 5+ candidates)

- **Ethics MAJOR — remove `budgetUsed === 0` from gate condition**: held. The R17 design ties gate-release to first-allocation as the disclosure trigger; reversing this needs broader design discussion.
- **Science MAJOR alternative — lower emotional/appearance weights to match heritability**: R19 took the clarify-framing path; full weight rebalance is a bigger discussion.
- **UX MAJOR — extend life_shape tagging to early/mid ADULT_TRAJECTORY buckets**: substantial cross-cultural narrative work (3 buckets × 5 shapes × 5 langs). Filter is currently a no-op for ages 0-29.
- **Mobile MAJOR — full `<dt role="status">` → `<div>` restructure outside `<dl>`**: needs CSS grid rework.
- **Mobile POLISH — `.scrubber-ticker max-height + overflow`** for long interruption entries.
- **UX POLISH — move heritability docstring to dedicated JSDoc block**: cosmetic refactor.
- **Product POLISH — stagger gen-2 panel-unlock thresholds** (e.g., Sibling Cohort at gen 3, Trait History at gen 4) for progressive discovery.
- **Narrative Design POLISH — port Inner Cohort + Lifetime Drift to Adult mode**: needs design decision.
- **Move consent-awareness AFTER projection** (held since R7).
- **Kids-mode onboarding panel** (held).
- **R12/R14 mid-pick stashes** preserved.
- **Pre-R5 style.css 180-line WIP** preserved.

## Closing note

Batch 4's mandate ("address items deferred across Batches 1-3 that needed architectural moves") was substantially met. The two highest-leverage architectural goals — **pre-allocation projection gate** and **shape-aware life trajectory selection** — both shipped successfully with extensive reviewer-driven refinement across 5 rounds, ending with a strong settling signal at R20.
