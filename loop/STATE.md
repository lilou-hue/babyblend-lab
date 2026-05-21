# Loop State

```
current_round: 6
rounds_remaining_in_batch: 5
status: ready
last_round_completed: 5
last_round_completed_at: 2026-05-20
batch_summary: loop/rounds/batch-1-summary.md
batch: 2
```

## Next round focus (Round 6 — first of Batch 2)

**Theme: Polish + accessibility pass.** Batch 1 shipped a lot of new mechanics
(consent architecture, conflict tagging, regulatory references, narrative
rewrites). Batch 2 is for tightening what's already there — no new systems.
Builders should hunt for drift, inconsistency, and rough edges accumulated
across 5 rounds; reviewers should pressure-test against a fresh reading of
the live app.

### Per-role priorities for Round 6

- **Frontend** — a11y audit pass: every interactive element needs visible
  focus state + accessible name; check colour-contrast on the warm palette
  (especially `.burden-disclaimer`, regulatory footnotes, speculative-band
  dashed strokes); verify reduced-motion guards everywhere transitions
  fire; ARIA on the consent reveal + case-file motion. Pure subtraction
  preferred — find one thing that's drifted and fix it.
- **Systems** — drift hunt: search for magic numbers that should reference
  constants, repeated literal copies of regulatory text, dead branches in
  conflict-tag logic, sigma values that escaped the R5 hoist. Single-source
  any duplication you find. Strict <80-line diff.
- **Narrative** — copy QA: read every visible string in all 5 languages,
  flag inconsistencies in voice (warmth vs. institutional dryness), check
  the new ADULT_TRAJECTORY_MILESTONES.later EN variants don't clash tonally
  with the rest of the array. Also: translate the 3 R5-added life-shape
  variants (caregiving interruption / late bloom / persistent precarity)
  into zh/ja/ko/tr — this is the open carryover. Translator role.
- **Education** — re-read every HISTORY_CARDS entry as if you've never seen
  the app: do any cards rely on context that isn't visible nearby? Fix
  one. Check tooltip prose for didactic vs. preachy register.
- **UX Flow** — full path-through audit in Kids and Adult mode. Where does
  the flow stutter? Where does an element appear without anticipation?
  Where does the user have to back-track? Fix one stutter.
- **World Design** — consistency sweep on institutional vocabulary
  (Codename / Optimization / Allocation / Burden / Tier). Are any terms
  used in two senses? Any euphemisms creeping back in? Tighten one.

### Carryovers from Batch 1 (open before Round 6)

- **Translator** — zh/ja/ko/tr for the 3 new ADULT_TRAJECTORY_MILESTONES.later
  EN life-shape variants. Assigned to Narrative this round.
- **Pre-allocation slider gate** — deferred across R3/R4. Not in Round 6
  scope (Batch 2 is polish, not new mechanics) unless a reviewer surfaces
  it as the highest-priority a11y/clarity win.
- **"Inheritance Burden Index" → "Identity Lock-In Index" rename** —
  deferred; docstring + Burden ≠ heritability card carried the load. Same
  treatment as above: only revisit if a reviewer makes the case.

## Batch 2 overall arc

5 rounds, polish-only. No new architecture. Each round should leave the app
visibly more coherent without adding surface area. Halt at Round 10 with a
batch-2 summary.

## History

### Round 5 (2026-05-20) — completed (Phase-1 only, by design)
- 6 builder commits. All cherry-picked cleanly. See `loop/rounds/round-05/summary.md`.

### Round 4 (2026-05-20) — completed (with rate-limit incident)
- 6 Phase-1 commits + 5 Phase-4 commits. Narrative + Education committed manually from worktrees after their agents hit 429s. See `loop/rounds/round-04/summary.md`.

### Round 3 (2026-05-20) — completed
See `loop/rounds/round-03/summary.md`.

### Round 2 (2026-05-20) — completed
See `loop/rounds/round-02/summary.md`.

### Round 1 (2026-05-20) — completed
See `loop/rounds/round-01/summary.md`.
