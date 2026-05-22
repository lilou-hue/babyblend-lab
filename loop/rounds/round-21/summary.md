# Round 21 — Summary (first of Batch 5, deferred-backlog)

Phase 1 (2 + 4 NO CHANGE) → Phase 2 (13 reviewers, 26 issues) → Phase 3 → Phase 4 (4 + 2 NO CHANGE). No Phase-4b conflicts.

## Phase 1 — what landed (2 + 4 NO CHANGE)

- **Frontend** — NO CHANGE. CSS scales gracefully with lower weights; no threshold-coupled rules.
- **Systems** (`39d9f68` → `c30af6d`) — TWO architectural moves: (1) **Removed `budgetUsed === 0` from projection gate** — gate now stays up for all of adultGen=1 regardless of allocation, only reveals on next Generate (Ethics MAJOR from R18). (2) **Rebalanced INHERITANCE_BURDEN_WEIGHTS**: emotional 1.0 → 0.4 (neuroticism ~40% per Polderman 2015); appearance 1.0 → 0.6 (facial morphology midpoint); sociability 0.4 unchanged (R19 Science MAJOR alternative). Documented LOOP_REQUEST(narrative) for placeholder copy + LOOP_REQUEST(systems) for `/90` divisor calibration concern. 47 lines.
- **Narrative** (`368df1d` → `f6fe4a8`) — Rephrased gate placeholder for new gate flow: "This projection waits until you generate again. Adjust above first if you want to shape it." (5 langs). 19 lines.
- **Education** — NO CHANGE.
- **UX Flow** — NO CHANGE (chose to wait for Narrative copy update before evaluating affordance need).
- **World Design** — NO CHANGE.

## Phase 2 — critiques (26 issues)

See `loop/rounds/round-21/critiques.md`. Four convergences:

1. **6-reviewer convergence on divisor recalibration** (UX POLISH + Science POLISH + Visual Director MAJOR + Plausibility MAJOR + Risk MAJOR + Ethics POLISH): `/90` divisor calibrated for old 1.0 weights; bar now compresses dynamic range — rescale to /54-70.
2. **4-reviewer convergence on Generate-button affordance gap** (UX MAJOR + Ethics MAJOR + Product MAJOR + Narrative Design MAJOR): placeholder names "generate again" but button has no signal.
3. **6-reviewer convergence on placeholder copy register** (Writing MAJOR/POLISH + Detection MAJOR/POLISH + Narrative Design MAJOR/POLISH): "generate again" jars vs Adult clinical voice; "Adjust above first" mildly imperative; Japanese imperative form "せよ"; Turkish "ayarla" repetition.
4. **2-reviewer convergence on heritability creep** (Sociology MAJOR + Psychology MAJOR): pressure-note copy now reads as "heritability = lock-in" inverting cascade narrative.

Plus Science MAJOR (appearance 0.6 vs upper-bound philosophy); Mobile MAJOR (aria-live re-announce on innerHTML); Visual Director POLISH (gradient stops bunching).

## Phase 4 — revisions (4 + 2 NO CHANGE)

- **Frontend rev** (`2a7ab19` → `eb16fd4`) — `.projection-bar-fill` gradient stops added (0%/50%/100%); `.btn-primary.is-pending-reveal` defined with cyan pulse keyframe `pendingRevealPulse` (1.8s); `@media (max-width:540px)` placeholder line-height bumped to 1.6. 26 lines.
- **Systems rev** (`04fcea0` → `6cd4f52`) — Divisor `/90` → `/70` (6-reviewer convergence); "upper bound" → "conservative mid-range estimate" in INHERITANCE_BURDEN_WEIGHTS comment (Science MAJOR); explicit heritability-creep guard naming weights as cascade-breadth scalars not heritability percentages (Sociology MAJOR). 34 lines.
- **Narrative rev** (`fdff700` → `833357a`) — Placeholder rewritten to "**This projection awaits the next generation. Adjustments above shape it; no shaping is also a choice.**" across 5 langs. Japanese drops archaic "せよ"; Turkish uses "biçimlendirmek" not "Şekillendirmek". Modest-tier `pressureNote` rewritten to decouple heritability from propagation across 5 langs. 47 lines.
- **Education** — NO CHANGE.
- **UX Flow rev** (`43f7367` → `ab0a088`) — Generate button `.is-pending-reveal` class toggle + dynamic aria-label "Click to reveal projection" (5 langs in LABEL_I18N) when gate active. Visible label intentionally untouched (too many touch points). 33 lines.
- **World Design** — NO CHANGE.

## Phase 4b conflict resolution

No conflicts. All 4 cherry-picked clean: Frontend (CSS-only) → UX Flow (LABEL_I18N additions) → Narrative (LABEL_I18N modification + pressureNote) → Systems (heritability comment + divisor, different file region).

## What was deferred (R22+)

- **Science MAJOR alternative — raise appearance to 0.75** — R21rev kept 0.6 + reframed as "conservative mid-range estimate."
- **Visual Director MAJOR alternative — divisor /54** — R21rev took /70 (middle of recommended range).
- **Psychology POLISH — widen weight band** (0.4/0.6 cluster) — held.
- **Mobile MAJOR — aria-live re-announce / `<dt>` → `<div>` restructure** — held for R22.
- **Risk MITIGATION — explicit "no optimal answer" framing line above allocation panel** — partly addressed by Narrative's "no shaping is also a choice"; further reinforcement deferred.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.

## What Round 22 should focus on

R22 = second of Batch 5. Theme: **Mobile + a11y.**

- **Frontend** — Likely NO CHANGE. Verify mobile placeholder + pending-reveal cue land cleanly. Possibly add small responsive polish if bar gradient stops need viewport-specific adjustments.
- **Systems** — **`<dt role="status">` → `<div>` restructure outside `<dl>`** (Mobile MAJOR held since R19) AND/OR **fix aria-live re-announce on innerHTML mutation** (R21 Mobile MAJOR). Choose one if both don't fit in budget — re-announce fix is smaller and addresses the actual a11y break. ~30-40 lines.
- **Narrative** — Likely NO CHANGE.
- **Education** — NO CHANGE likely.
- **UX Flow** — Verify pending-reveal affordance works in practice. Possibly add `.scrubber-ticker max-height` for long interruption entries (Mobile POLISH held). ~10-15 lines.
- **World Design** — NO CHANGE likely.

R23 will continue Batch 5 with life_shape coverage expansion to early/mid ADULT_TRAJECTORY buckets.
