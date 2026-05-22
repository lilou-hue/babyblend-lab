# Round 22 — Summary (second of Batch 5, mobile + a11y)

Phase 1 (3 + 3 NO CHANGE) → Phase 2 (13 reviewers, 26 issues) → Phase 3 → Phase 4 (4 + 2 NO CHANGE). No Phase-4b conflicts. **Plausibility MAJOR caught a critical bug in Phase 1's Systems fix — Phase 4 corrected it.**

## Phase 1 — what landed (3 + 3 NO CHANGE)

- **Frontend** (`ef92249` → `3494e50`) — `prefers-reduced-motion` guard for `.btn-primary.is-pending-reveal` pulse keyframe. 10 lines.
- **Systems** (`74f720e` → `02b6ebc`) — **Intended** to preserve aria-live placeholder across innerHTML renders. **BROKEN** — see Phase 2 critique below.
- **Narrative** — NO CHANGE.
- **Education** — NO CHANGE.
- **UX Flow** (`11f8115` → `a4d0da3`) — `.scrubber-ticker` max-height 9em + overflow-y auto for mobile layout stability with long interruption entries. 11 lines.
- **World Design** — NO CHANGE.

## Phase 2 — critiques (26 issues)

**CRITICAL FINDING — Plausibility MAJOR caught that R22 Systems' aria-live fix was non-functional.** Line 7729 `statsEl.innerHTML = ...` ran BEFORE the placeholder-reuse logic at 7732+. The element was destroyed every render → "reuse" branch never fired → fix didn't work.

Other convergences:
1. **3-reviewer convergence on announcement fatigue** (Ethics MAJOR + Psychology MAJOR + Risk MAJOR): even with preservation, slider drags + language switches may cause repeated SR announcements.
2. **5-reviewer convergence on scrubber-ticker** (UX POLISH + Visual Director MAJOR + Sociology MAJOR + Mobile MAJOR + Narrative Design POLISH): unstyled scrollbar; no aria-label; CJK padding waste; 9em too short for interruption.
3. **2-reviewer convergence on reduced-motion fallback** (UX MAJOR + Ethics POLISH): static glow indistinguishable from :hover.

Plus Detection MAJOR (Chinese pronoun mismatch `他们自己` with singular `那个人`); Narrative Design MAJOR (`.ocean-sep` uppercase compresses SR announcement); Product POLISH (appMode + language not persisted in save/restore).

See `loop/rounds/round-22/critiques.md`.

## Phase 4 — revisions (4 + 2 NO CHANGE)

- **Frontend rev** (`18e8d52` → `a63b7c0`) — `.scrubber-ticker` scrollbar styling matching `.decision-list` pattern (Visual Director MAJOR); outline ring 2px/0.35 → 3px/0.55 to distinguish from :hover (UX MAJOR); max-height 9em → 12em (Narrative Design POLISH); `.avatar-glow` opacity 0.5 in reduced-motion (Visual Director POLISH); proactive `.projection-gated-placeholder` top-border + margin to compensate for the `.ocean-sep` class drop. 29 lines.
- **Systems rev** (`001d243` → `47f0146`) — **Fixed the broken aria-live preservation** with detach-before-wipe + reattach pattern: detach existing placeholder BEFORE innerHTML, then reattach the same element reference after. Live-region subscription survives. Also dropped `.ocean-sep` class from placeholder (Narrative Design MAJOR); added `aria-atomic="false" aria-relevant="text"` (Ethics MAJOR); added `appMode` + `language` to save/restore (Product POLISH); added `if (!statsEl) return;` null guard (Plausibility POLISH); fixed comment language "surgically manage" → "carefully preserve and update" (Detection MAJOR). 58 lines.
- **Narrative rev** (`f8714c8` → `2d2292a`) — Chinese REFLECTION_ARC pronoun: `他们自己` → `他/她` (gender-inclusive singular matching EN "theirs" applied to a single baby). Korean trajectory disclaimer: `。` → `.` (Korean uses Western period). 4 lines (2 changes).
- **Education** — NO CHANGE.
- **UX Flow rev** (`5e3eb44` → `870adcf`) — `role="region"` + `aria-label="Milestone description, scrollable"` on `#scrubber-ticker` (Sociology MAJOR + Risk MITIGATION). Re-applies aria-label per render via `localLabel` so it follows language. LABEL_I18N entries in 5 langs. 18 lines.
- **World Design** — NO CHANGE.

## Phase 4b conflict resolution

No conflicts. All 4 cherry-picked clean: Frontend (CSS-only) → UX Flow (index.html + small script.js) → Narrative (2-char fixes) → Systems (large surgical replacement, contained region).

## What was deferred (R23+)

- **Mobile MAJOR alternative — `scrollbar-gutter: stable` or conditional padding for CJK** — held; smaller polish.
- **Mobile POLISH — rename placeholder ID to `baby-stats-projection-gate-placeholder`** — cosmetic, held.
- **Detection POLISH — strip "surround stays still" CSS comment** — cosmetic, held.
- **Science MAJOR — vestibular sensitivity citation** — optional polish, held.
- **Risk MAJOR — full debounce of aria-live announcements** — partially mitigated by `aria-atomic="false"`; full debounce held.
- **Mobile MAJOR full `<dt>` → `<div>` restructure** — held since R19.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.

## What Round 23 should focus on

R23 = third of Batch 5. Theme: **Narrative coverage expansion (life_shape early/mid buckets).**

- **Frontend** — NO CHANGE likely.
- **Systems** — Likely NO CHANGE. Possibly extend audit IIFE to verify shape-tagged entries in early/mid buckets if Narrative adds them.
- **Narrative** — **PRIMARY: extend `life_shape` tagging to early/mid ADULT_TRAJECTORY buckets** (UX MAJOR held since R18). Currently the filter is a no-op for ages 0-29 because all entries in those buckets are untagged strings. Tag early/mid entries with `life_shape` per shape to enable shape-aware coherence across the full lifespan, OR alternatively wrap them as `{ text, life_shape }` objects to allow filtering. Substantial work: 3 buckets × 5 shapes × 5 langs.
- **Education** — NO CHANGE likely.
- **UX Flow** — NO CHANGE likely.
- **World Design** — NO CHANGE likely.

R24 will continue Batch 5 with product flow (panel stagger + consent ordering).
