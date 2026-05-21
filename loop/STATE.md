# Loop State

```
current_round: 16
rounds_remaining_in_batch: 5
status: ready
last_round_completed: 15
last_round_completed_at: 2026-05-21
batch_summary: loop/rounds/batch-3-summary.md
batch: 4
```

## Next round focus (Round 16 — first of Batch 4, ARCHITECTURAL deferrals)

Batch 4's theme: **work down the architectural deferrals.** Batches 1-3 consistently pushed these items forward because they're bigger swings — multi-file changes, mechanic additions, surface restructures, multi-round refactors. Batch 4 has 5 rounds to address them.

**Stewardship principle:** unlike Batches 2-3 (polish), Batch 4 explicitly accepts higher-risk merges + new mechanics. Strict <80-line diffs still apply — break larger refactors into per-round chunks (e.g., Systems adds tag schema in R16, Narrative populates tags in R17).

### Architectural deferrals available (sequencing is builder's call)

Roughly ordered by independence + risk:

1. **REFLECTION_ARC_CLOSING_AFFIRMATION slot** (small, R14 POLISH carryover, mirrors R13's Kids-arc closing pattern) — UX Flow + Narrative
2. **"Inheritance Burden Index" → "Identity Lock-In Index" rename** (medium — 5 langs × N occurrences, mostly find-and-replace) — World Design
3. **Life-shape milestone tagging refactor** (multi-round — Systems adds tag field on ADULT_TRAJECTORY_MILESTONES entries, Narrative tags + matches selection) — Systems + Narrative collab
4. **Pre-allocation slider gate** (medium-large — UX Flow scheduling work, gates trait-projection display until first allocation in Adult mode) — UX Flow
5. **ADULT_TRAJECTORY linear-progression refactor** (medium-large — non-linear/recursive entries replacing the implied early→mid→late hierarchy) — Narrative + Systems
6. **Move consent-awareness AFTER projection** (medium — explicit R7 reversal; reviewers split, so document the empirical reason for the change) — UX Flow
7. **Kids-mode onboarding panel** (medium-large — adds new mechanic; first-Generate Kids users currently dropped into sliders) — UX Flow + Education

### Per-role guidance for Round 16

R16 is the kickoff — start small, build momentum, leave bigger items for later rounds.

- **Frontend** — Likely NO CHANGE unless an architectural item needs a CSS hook scaffolded for a future round. Pure subtraction preferred.
- **Systems** — **Pick one of:** (i) add `life_shape` tag field schema to ADULT_TRAJECTORY_MILESTONES entries (no behavior change; Narrative populates next round), OR (ii) NO CHANGE.
- **Narrative** — **REFLECTION_ARC_CLOSING_AFFIRMATION**: define the constant in the same shape as KIDS_ARC_CLOSING_AFFIRMATION (1 entry × 5 langs). Don't worry about the rendering site — UX Flow will hook it in parallel.
- **Education** — Likely NO CHANGE. If you find a small pedagogical addition that supports Batch 4's architectural work (e.g., a glossary tooltip for an upcoming Burden Index rename or onboarding scaffolding), make it.
- **UX Flow** — **REFLECTION_ARC_CLOSING_AFFIRMATION slot**: add the rendering scaffolding (mirror R13's Kids-arc closing slot pattern). `<p class="reflection-arc-closing">` rendered after the Pause Panel observations. Wire to `localList(REFLECTION_ARC_CLOSING_AFFIRMATION)`.
- **World Design** — **Inheritance Burden Index → Identity Lock-In Index rename (or a first chunk of it)**: grep for "Inheritance Burden Index" / "Burden Index" across script.js, replace with "Identity Lock-In Index" in all 5 languages. Audit user-visible strings only; preserve internal variable names (script.js identifiers like `INHERITANCE_BURDEN_WEIGHTS` stay) to avoid breaking math/Systems surface. If too large for one round, ship 2-3 surfaces (Burden disclaimer / Burden Index display / regulatory cards) and carry the rest to R17.

### Batch 4 overall arc

5 rounds, architecturally focused. Higher-risk merges expected. Halt at end of Round 20 with a batch-4 summary.

If a round's primary task can't fit under 80 lines, ship a partial + LOOP_REQUEST(role) for the rest — same pattern that worked for mild-tag i18n across R9 → R14 → R15.

## Carryovers from Batches 1-3

All architectural items listed above; small remaining polish:
- Adult headline examples credentialed cluster (Sociology POLISH R14)
- Cross-locale i18n fallback policy (Ethics POLISH R8)
- R12 mid-pick stash (user WIP, preserved)
- R14 mid-pick stash + R10 mid-pick stash 2 (preserved)
- Pre-R5 style.css 180-line WIP (re-stashed)

## History

### Batch 3 (2026-05-21) — completed
- 5 rounds (R11-R15), 75 commits, +3302/-552. Open-ended theme. See `loop/rounds/batch-3-summary.md`.
- Key wins: PAUSE_PROMPTS_BY_CONTEXT overhaul, KIDS_ARC_CLOSING_AFFIRMATION (7-reviewer convergence), R9 mild-tag i18n closed across all 3 pools, Pause Panel now in Adult mode, Polderman citation, IVD-illustrative + HFEA-licensed disclosure.

### Batch 2 (2026-05-21) — completed
- 5 rounds (R6-R10), 89 commits. Polish + a11y theme. See `loop/rounds/batch-2-summary.md`.

### Batch 1 (2026-05-20) — completed
- 5 rounds (R1-R5). See `loop/rounds/batch-1-summary.md`.
