# Self-Pacing Loop Prompt

This is the exact prompt fired on each `/loop` iteration. It runs ONE complete round.

```
Run the next BabyBlend Lab multi-agent round.

1. `cd /home/lilou/babyblend-lab && git fetch && git pull --rebase origin main`.
2. Read `loop/STATE.md`. Extract `current_round` (N) and `rounds_remaining_in_batch` (R).
3. **If R == 0, HALT.** Write a final batch summary to `loop/rounds/batch-N-summary.md`
   collecting deltas across all rounds in this batch (file counts, line counts, key
   themes addressed, themes still open). Commit + push it. Do NOT call ScheduleWakeup.
4. Otherwise, run round N end-to-end per `loop/RUN.md`:
   a. Phase 1 — spawn 6 builders in parallel via `Agent(subagent_type:general-purpose)`,
      each in their own `.claude/worktrees/r{N}-{role}` worktree on branch
      `loop/r{N}/{role}`. Build prompts from AGENTS.md role specs + STATE.md "Next round
      focus". Strict <80-line diffs, ownership-locked. Wait for all to finish.
   b. Cherry-pick all 6 branches onto main in conflict-minimizing order (style-only
      first, then small script.js diffs ordered by line range). Stash any uncommitted WIP
      first; pop after. `node --check script.js` must pass after each pick. Commit
      one per cherry-pick.
   c. Phase 2 — spawn all 13 reviewers in parallel via `Agent(subagent_type:Explore)`.
      Each returns exactly 2 issues. Write all 26 verbatim to
      `loop/rounds/round-{N}/critiques.md`.
   d. Phase 3 — synthesize into `loop/rounds/round-{N}/priorities.md`: group by owning
      builder, resolve cross-reviewer conflicts, explicitly log any deferred items.
      Commit critiques + priorities + push.
   e. Phase 4 — spawn 6 revision builders in parallel via worktrees on branches
      `loop/r{N}rev/{role}`. Same constraints.
   f. Cherry-pick all 6 revisions onto main, same conflict-minimizing approach.
   g. Write `loop/rounds/round-{N}/summary.md`: what landed Phase 1, what landed Phase 4,
      what was deferred, what Round N+1 should focus on.
   h. Update `loop/STATE.md`: set current_round = N+1, decrement
      rounds_remaining_in_batch, append a history entry, rewrite "Next round focus"
      from the summary's "What Round N+1 should focus on" section.
   i. Remove worktrees, delete merged local branches.
   j. Commit summary + state + push.
5. After the round completes successfully, call `ScheduleWakeup` with
   `delaySeconds: 60` and `reason: "Next BabyBlend loop round (R-1 remaining)"` AND
   the same `prompt` text you received, so the loop self-paces into the next round.
   If `rounds_remaining_in_batch` is now 0 after the decrement, DO NOT call
   ScheduleWakeup — the next invocation (if any) will hit the halt branch.

If anything fails (cherry-pick conflict you can't resolve, `node --check` fails after
merge, builder agent times out, etc.), STOP immediately, write what went wrong to
`loop/rounds/round-{N}/INCIDENT.md`, push, and DO NOT call ScheduleWakeup. Surface
the incident in your final reply.
```

## To resume a halted loop

If the loop stops for any reason (incident, manual halt), restart it by:
1. Reading `loop/STATE.md` and any `INCIDENT.md` in the latest round
2. Fixing the underlying issue
3. Re-invoking `/loop` with the same prompt
