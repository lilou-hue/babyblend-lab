# How a Round Runs

An orchestrator (Claude in the current session) executes one round end-to-end.
The codebase lives in `/home/lilou/babyblend-lab/` (repo on `main`, push to `origin`).

## Phases

### Phase 1 — Builder pass (parallel)
For each of the 6 builders in `AGENTS.md`, spawn an `Agent` with:
- `subagent_type: general-purpose`
- `isolation: worktree`
- Prompt: builder role spec + current goal (from `loop/STATE.md` "Next round focus")
- Constraint: edit only files in their owned surface; report back diff + 5-line rationale

Run all 6 in a single message (parallel tool calls).

### Phase 2 — Merge builder worktrees
For each builder worktree returned with changes:
1. `git -C <main repo> fetch <worktree path>` then merge their branch, OR
2. Sequentially apply their diffs onto `main` with `git cherry-pick`.

Resolve conflicts by preferring the builder whose ownership covers the conflicting region. Commit the merged state as `Round NN — builder pass`.

### Phase 3 — Reviewer pass (parallel, read-only)
For each of the 13 reviewers, spawn an `Agent` with:
- `subagent_type: Explore`
- Prompt: reviewer role spec + "Return EXACTLY two issues (MAJOR + POLISH) in the format defined in AGENTS.md."
- Constraint: read-only; no edits.

Run all 13 in a single message.

### Phase 4 — Synthesize
Orchestrator collects all 26 issues, writes them to `loop/rounds/round-NN/critiques.md`, then synthesizes a priority list to `loop/rounds/round-NN/priorities.md`:
- Resolve cross-reviewer conflicts (UX wants less text vs Education wants more — pick).
- Group issues by owning builder.
- Mark "skip" with reasoning for any issue you reject.

### Phase 5 — Revision pass (parallel)
Re-spawn the same 6 builders with the priorities relevant to their surface. Same worktree pattern.

### Phase 6 — Merge revisions
Same as Phase 2. Commit as `Round NN — revision pass`.

### Phase 7 — Finalize
- Write `loop/rounds/round-NN/summary.md` (3 paragraphs: what changed, what was rejected, what should round NN+1 focus on).
- Update `loop/STATE.md`: bump round number, set "Next round focus", append to history.
- Single `git push origin main`.

## Loop control

`loop/STATE.md` carries:
- `current_round`
- `rounds_remaining_in_batch` — when this hits 0, the loop HALTS and emits a session summary instead of self-pacing.
- `next_focus` — orchestrator updates this each round based on the synthesis.

## Conflict prevention

- Each builder edits files within their owned surface only. If a builder needs to touch foreign surface, they leave a `LOOP_REQUEST(<builder-name>): ...` comment and another builder picks it up next round.
- Reviewers never edit.
- No round may rewrite the entire project.
- Preserve the three-mode structure (Reflection, Kids, Adult) at all times.

## When NOT to commit

- Build is broken (`node --check script.js` fails) → revert that builder's changes, log it in summary.md.
- A round produces zero substantive changes → halt the batch and report.
