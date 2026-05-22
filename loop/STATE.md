# Loop State

```
current_round: 22
rounds_remaining_in_batch: 4
status: ready
last_round_completed: 21
last_round_completed_at: 2026-05-22
batch_summary: loop/rounds/batch-4-summary.md
batch: 5
batch_theme: Clear the deferred backlog
```

## Next round focus (Round 22 — second of Batch 5, mobile + a11y)

R21 cleared the two biggest architectural deferrals (gate semantics + heritability rebalance) plus 6-reviewer convergent fixes. R22 tackles mobile + a11y items.

### Per-role guidance for Round 22

- **Frontend** — Likely NO CHANGE. Verify mobile placeholder + pending-reveal cue (cyan pulse keyframe) land cleanly. Possibly add responsive polish if needed.
- **Systems** — **Pick ONE of two a11y items (both can't fit cleanly in <80 lines):**
  - (A) **Fix aria-live re-announce on innerHTML mutation** (R21 Mobile MAJOR): `statsEl.innerHTML = physicalRows + personalityRows` recreates the `<dt role="status" aria-live="polite">`, breaking screen-reader live-region subscription. Fix: targeted DOM updates that preserve the aria-live element, only updating its text content. ~20-30 lines.
  - (B) **`<dt role="status">` → `<div>` restructure outside `<dl>`** (Mobile MAJOR held since R19): repositions the placeholder out of the `<dl>` (definition list) so the `role="status"` doesn't override semantic dt purpose. Requires HTML restructure + CSS grid rework. ~40-60 lines.
  
  **Recommended: (A)** — smaller, fixes the actual functional a11y break that R21 surfaced. (B) is a cleanup of an already-functional structure.
- **Narrative** — Likely NO CHANGE.
- **Education** — NO CHANGE likely.
- **UX Flow** — Verify R21 pending-reveal affordance works in practice. Possibly add **`.scrubber-ticker max-height`** for long interruption entries (Mobile POLISH held since R19). ~10-15 lines.
- **World Design** — NO CHANGE likely.

### Carryovers (still open after R22 expected)

- Mobile MAJOR `<dt>` → `<div>` restructure (if R22 picks option A, this stays held)
- UX MAJOR life_shape tagging early/mid (R23)
- Product POLISH stagger gen-2 thresholds (R24)
- Consent-awareness AFTER projection (R24)
- Narrative Design POLISH Inner Cohort/Lifetime Drift port (R25)
- Risk MITIGATION explicit "no optimal answer" reinforcement — partly closed by R21rev Narrative; further reinforcement may surface
- UX POLISH heritability JSDoc — held beyond Batch 5 (cosmetic)
- Kids-mode onboarding panel — held beyond Batch 5
- R12/R14 mid-pick stashes preserved
- Pre-R5 style.css 180-line WIP preserved

## Batch 5 overall arc

5 rounds, deferred-backlog. R21 done. R22-R25 remain. Halt at end of R25.

## History

### Round 21 (2026-05-22) — completed (Batch 5 Round 1, deferred-backlog)
- 2 Phase-1 + 4 NO CHANGE + 4 Phase-4 + 2 NO CHANGE. No Phase-4b conflicts. **Gate semantics changed**: removed `budgetUsed === 0` clause so gate stays up across all of adultGen=1. **Heritability rebalance**: emotional 1.0→0.4, appearance 1.0→0.6 (Polderman 2015-aligned). Divisor /90→/70 to restore bar dynamic range. Placeholder rewritten to "This projection awaits the next generation. Adjustments above shape it; no shaping is also a choice." (5 langs). Generate button `.is-pending-reveal` class + aria-label affordance. Heritability creep guard added; appearance "upper bound" framing softened to "conservative mid-range". Modest-tier pressureNote decoupled heritability from propagation. Gradient stops added to projection-bar-fill. Mobile placeholder line-height polish. See `loop/rounds/round-21/summary.md`.

### Batch 4 (2026-05-22) — completed
- 5 rounds (R16-R20), 50 commits. Two highest-leverage architectural goals shipped: pre-allocation projection gate + shape-aware life trajectory selection. See `loop/rounds/batch-4-summary.md`.

### Batch 3 (2026-05-21) — completed
- 5 rounds (R11-R15), 75 commits. See `loop/rounds/batch-3-summary.md`.

### Batch 2 (2026-05-21) — completed
- 5 rounds (R6-R10), 89 commits. See `loop/rounds/batch-2-summary.md`.

### Batch 1 (2026-05-20) — completed
- 5 rounds (R1-R5). See `loop/rounds/batch-1-summary.md`.
