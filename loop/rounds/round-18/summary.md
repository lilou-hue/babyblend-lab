# Round 18 — Summary (third of Batch 4, architectural)

Phase 1 (3 + 3 NO CHANGE) → Phase 2 (13 reviewers, 26 issues) → Phase 3 → Phase 4 (5 + 1 NO CHANGE). One Phase-4b conflict (UX Flow rev `aria-live` + Narrative rev copy change at the same `<dt>`) — combined cleanly.

## Phase 1 — what landed (3 + 3 NO CHANGE)

- **Frontend** (`d7503ab` → `b994cb0`) — Span `.projection-gated-placeholder` across `.baby-stats` 2-col grid (`grid-column: 1 / -1`). 9 lines.
- **Systems** (`9a6aad8` → `1b9d5d8`) — Wire LIFE_SHAPES selection in `pickAgeTicker`: codename-seeded shape via `seededRand(codename + '|life-shape')` + filtered pool (matching shape OR untagged OR 'mixed') + fail-open fallback. 28 lines.
- **Narrative** — NO CHANGE (R17 already covered the architectural prep).
- **Education** — NO CHANGE.
- **UX Flow** (`9e86e55` → `9d38d76`) — **Flipped `PROJECTION_GATE_ENABLED` to true.** Also aligned 4 gen-2 reveal panels (renderSocietalBrief, renderDivergence, renderSiblingCohort, renderTraitHistory) to `adultGenerateCount` instead of global `generateCount` (cross-mode coherence fix). 15 lines.
- **World Design** — NO CHANGE.

## Phase 2 — critiques (26 issues)

See `loop/rounds/round-18/critiques.md`. Two dominant convergences:

1. **7-reviewer convergence on codename-deterministic life_shape destiny risk** (Ethics POLISH + Science MAJOR + Psychology MAJOR + Sociology MAJOR + Plausibility MAJOR + Risk MAJOR + Narrative Design MAJOR) — per-codename `seededRand` lock-in reads as innate determination, framing disclaimer is code-only.
2. **4-reviewer convergence on gate copy framing** (Ethics MAJOR + Writing POLISH + Detection MAJOR + Risk MITIGATION) — "Allocate above" reads imperative; gate's `budgetUsed === 0` precondition creates performative necessity.

Plus Product MAJOR on `adultGenerateCount` not persisted in save/restore; Mobile MAJOR on `<dt role="status">` semantic clash; Visual Director MAJOR on placeholder visual weight.

## Phase 4 — revisions (5 + 1 NO CHANGE)

- **Frontend rev** (`9228db9` → `f42da6b`) — Visual frame: 2px cyan left border (rgba 126,224,255 @ 0.22), font 13.5px → 11px to match `.burden-disclaimer` family. Cool accent distinguishes from warm-amber disclaimer. 12 lines.
- **Systems rev** (`2e1fbb6` → `888955a`) — Persist `adultGenerateCount` + `lastGeneratedInAdult` in `saveCurrentTimeline` + restore in `loadTimeline` with safe fallbacks (Product MAJOR). Documented silent fall-through for shapes with 0 entries (interruption). Documented filter no-op in early/mid buckets. 28 lines.
- **Narrative rev** (`6aa2512` → `3c6dc00`) — Gate copy rewritten: "This projection reflects choices yet to be made. Allocate above…" → "**This projection is provisional. It will shift as you make choices above.**" (clinical/contingent register for Adult mode, drops imperative). Translated EN/zh/ja/ko/tr. Added EN `interruption`-tagged ADULT_TRAJECTORY entry: "A period of illness, loss, or external disruption pauses forward motion; identity and goals reorient as it lifts." Translations deferred per R17 Science MAJOR note. 16 lines.
- **Education rev** (`3281987` → `2c92ee9`) — Added HISTORY_CARDS entry "Life shapes are patterns, not fates" citing Elder 1998 (life-course theory) + Settersten 2003 (linked lives / cohort effects). EN+zh+ja+ko+tr. Complements UX Flow's in-Adult disclosure with pedagogical depth. 7 lines.
- **UX Flow rev** (`72b3ebb` → `293b58f`) — Trajectory disclosure microcopy: new `<p class="trajectory-disclaimer">` beneath `#scrubber-ticker`, Adult-mode only, copy "These are one set of patterns this person might encounter — not a forecast." (5 langs). Mobile MAJOR a11y polish: explicit `aria-live="polite"` on the gate `<dt role="status">`. Full `<div>` restructure deferred to R19. 45 lines (index.html + script.js + style.css).
- **World Design** — NO CHANGE. Structural-causation language already correct across all relevant sites.

## Phase 4b conflict resolution

Cherry-picking Narrative rev (`6aa2512`) collided with UX Flow rev (`293b58f`) at the gate `<dt>` element — UX Flow added `aria-live="polite"` to the existing `<dt role="status">`, Narrative changed the localLabel copy from "This projection reflects choices yet to be made…" to "This projection is provisional…". Combined: kept UX Flow's a11y attributes + Narrative's new copy. Final form:

```js
<dt class="ocean-sep projection-gated-placeholder" role="status" aria-live="polite">
  ${localLabel('This projection is provisional. It will shift as you make choices above.')}
</dt>
```

## What was deferred (R19+)

- **Ethics MAJOR — remove `budgetUsed === 0` from gate condition** — held. The R17 design ties gate-release to first-allocation as the disclosure trigger; reversing this needs broader design discussion.
- **UX MAJOR — extend life_shape tagging to early/mid ADULT_TRAJECTORY buckets** — held. Substantial cross-cultural work (3 buckets × 5 shapes × 5 langs). Today the filter is a no-op for ages 0-29.
- **Mobile MAJOR — full restructure: `<dt role="status">` → `<div role="status">` outside `<dl>`** — held. Requires CSS grid rework; minimal `aria-live` polish shipped instead.
- **Product POLISH — stagger gen-2 panel-unlock thresholds (3, 4 etc.)** — held. The simultaneous reveal may be desirable as a "moment" rather than a flaw.
- **Narrative Design POLISH — port Inner Cohort + Lifetime Drift panels to Adult mode** — held. Substantial cross-mode panel surgery; needs design decision.
- **Plausibility POLISH — document emotional/appearance heritability weight rationale** — held; small, can land R19.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.

## What Round 19 should focus on

R19 = fourth of Batch 4 (R=1 after this round). Mostly a verification/polish round; major architectural levers have all been pulled (R16 LIFE_SHAPES schema, R17 gate scaffolding, R18 gate flip + selection wire).

- **Frontend** — NO CHANGE likely. Verify the cyan-framed placeholder visually balances with the surrounding `.burden-disclaimer` family on real device.
- **Systems** — **Document emotional/appearance heritability weights** (Plausibility POLISH, ~10 lines). Optional: extend save/load to cover any other state fields that drift on round-trip.
- **Narrative** — **Translate the new interruption-shape ADULT_TRAJECTORY entry** across zh/ja/ko/tr (deferred from R18). ~15-25 lines.
- **Education** — NO CHANGE likely.
- **UX Flow** — **Verify the trajectory-disclaimer microcopy reads correctly under all modes** (Adult render vs. Kids/Reflection hide). Optional: add disclaimer to the projection panel as well so the gate placeholder copy doesn't carry the entire "non-deterministic" framing burden. ~10-20 lines.
- **World Design** — NO CHANGE likely.

R20 will be the Batch 4 finale — likely held for verification + minor polish only.
