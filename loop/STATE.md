# Loop State

```
current_round: 21
rounds_remaining_in_batch: 5
status: ready
last_round_completed: 20
last_round_completed_at: 2026-05-22
batch_summary: loop/rounds/batch-4-summary.md
batch: 5
batch_theme: Clear the deferred backlog
```

## Batch 5 — "Clear the deferred backlog" (5 rounds, R21-R25)

After R16-R20 closed Batch 4's architectural arc, several deferred items remain. Batch 5 works through them. Each round picks 1-3 items from the backlog; reviewers iterate on the changes.

### Backlog mapping (suggested per-round focus, adjustable)

- **R21** — **Gate semantics + heritability rebalance.** Ethics MAJOR (remove `budgetUsed === 0` from gate condition); Science MAJOR alternative (lower emotional/appearance heritability weights closer to behavioral genetics consensus).
- **R22** — **Mobile + a11y.** Mobile MAJOR (`<dt role="status">` → `<div>` outside `<dl>` with grid rework); Mobile POLISH (`.scrubber-ticker max-height + overflow` for long interruption entries).
- **R23** — **Narrative coverage expansion.** UX MAJOR (extend life_shape tagging to early/mid ADULT_TRAJECTORY buckets — 3 buckets × 5 shapes × 5 langs).
- **R24** — **Product flow.** Product POLISH (stagger gen-2 panel-unlock thresholds — Societal Brief at gen 2, Divergence at gen 2, Sibling Cohort at gen 3, Trait History at gen 4); revisit "move consent-awareness AFTER projection" (held since R7).
- **R25** — **Finale closure.** Narrative Design POLISH (port Inner Cohort + Lifetime Drift to Adult mode OR a "Reflection View" toggle); polish + verification. Halt + write batch-5-summary.md.

Holds beyond Batch 5: **Kids-mode onboarding panel** (new mechanic, needs design); **UX POLISH heritability docstring → JSDoc** (cosmetic only).

## Next round focus (Round 21 — first of Batch 5, deferred-backlog)

R21 tackles two related architectural decisions that need broader buy-in:

### Per-role guidance for Round 21

- **Frontend** — NO CHANGE likely. Possible small CSS update if Systems' weight rebalance changes how the Identity Lock-In Index bar renders. Verify.
- **Systems** — **TWO architectural moves.**
  - **(1) Remove `budgetUsed === 0` from gate condition.** Currently gate fires on `inAdult && adultGen === 1 && budgetUsed === 0`. Ethics MAJOR (R18) argued the budgetUsed clause makes allocation feel like a prerequisite. Fix: gate fires only on `inAdult && adultGen === 1` regardless of allocation. Trace test the gen-1 → gen-2 flow afterward — gate should stay up until adultGen ≥ 2 OR a hard "Show projection" affordance is added (defer the affordance to R22 if needed). ~10-15 lines.
  - **(2) Lower emotional + appearance INHERITANCE_BURDEN_WEIGHTS** to align with behavioral genetics (R19 Science MAJOR alternative). Suggested: emotional 1.0 → 0.4 (matching neuroticism ~40% per Polderman 2015 — same logic as R17 sociability fix); appearance 1.0 → 0.6 (mid-point of facial morphology 50-75%). Update the inline heritability comment to reflect new values. ~15-20 lines including comment edits.
- **Narrative** — Likely NO CHANGE. If gate copy needs softening now that gate stays up longer, tweak. Otherwise hold.
- **Education** — Likely NO CHANGE.
- **UX Flow** — **Verify gate flow** after Systems flips the budgetUsed condition: gate now stays up until gen-2 regardless of allocation. Does that feel intentional? Consider whether a "Show projection now" link/button is needed (defer if too much for R21). ~5-15 lines OR NO CHANGE.
- **World Design** — Likely NO CHANGE.

### Carryovers (still open after R21 expected, into Batch 5 remainder)

- Mobile MAJOR `<dt>` → `<div>` (R22)
- Mobile POLISH `.scrubber-ticker max-height` (R22)
- UX MAJOR life_shape tagging early/mid (R23)
- Product POLISH stagger gen-2 thresholds (R24)
- Consent-awareness AFTER projection (R24)
- Narrative Design POLISH Inner Cohort/Lifetime Drift port (R25)
- UX POLISH heritability JSDoc — held beyond Batch 5 (cosmetic)
- Kids-mode onboarding panel — held beyond Batch 5
- R12/R14 mid-pick stashes preserved
- Pre-R5 style.css 180-line WIP preserved

## Batch 5 overall arc

5 rounds, deferred-backlog. R21-R25. Halt at end of R25.

## History

### Batch 4 (2026-05-22) — completed
- 5 rounds (R16-R20), 50 commits. Two highest-leverage architectural goals shipped: pre-allocation projection gate + shape-aware life trajectory selection. See `loop/rounds/batch-4-summary.md`.

### Batch 3 (2026-05-21) — completed
- 5 rounds (R11-R15), 75 commits. See `loop/rounds/batch-3-summary.md`.

### Batch 2 (2026-05-21) — completed
- 5 rounds (R6-R10), 89 commits. See `loop/rounds/batch-2-summary.md`.

### Batch 1 (2026-05-20) — completed
- 5 rounds (R1-R5). See `loop/rounds/batch-1-summary.md`.
