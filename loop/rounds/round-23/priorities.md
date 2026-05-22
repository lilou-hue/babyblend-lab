# Round 23 — Priorities (synthesized from 26 critiques)

**DOMINANT CONVERGENCE (8 reviewers): R23 is asymmetric. Either fix the asymmetry by adding non-stability tags, OR revert.**

The R23 Narrative Phase-1 commit tagged 3 early/mid entries as `life_shape: 'stability'` and left other shapes at 0 in those buckets. Reviewers converged that this creates worse problems than the no-op it tried to fix:

- **Determinism reification** (Ethics MAJOR + Science MAJOR + Psychology MAJOR + Risk MAJOR): infancy rhythm-stabilization is a universal developmental process, not a predictor of adult life shape. Tagging it imports adult-trajectory semantics into pre-adult development.
- **Asymmetric hierarchy** (Sociology MAJOR + Product MAJOR + Narrative Design MAJOR + UX MAJOR): stability codenames see coherent infancy narratives; other shapes hit silent fallback. UX reads as "stability is the default-traceable trajectory."
- **Silent fallback invisible** (Plausibility MAJOR + Product POLISH): code silently falls back when a shape has 0 entries; no boot audit warning.

**Decision: Pick (B) — REVERT R23 Narrative's stability tags. Restore R17 principle.**

Rationale: option (A) — adding non-stability tags — requires NEW entries (per R23 brief's explicit "don't add new entries" constraint, and per multiple reviewers noting current pool has no genuine precarity/caretaking/interruption/bloom early-childhood correlates). Adding new entries is substantial cross-cultural narrative design work that exceeds a single round's budget and risks force-fitting shapes onto universal development. Option (C) — disable filter at 0-29 — preserves the current behavior but makes the filter a documented no-op rather than a silent one; equivalent to revert + comment.

The cleanest path: **revert the 3 stability tags, document why (8-reviewer convergence + developmental-psych concern), preserve the R17 framing principle.** Filter remains no-op at 0-29 by design; document this explicitly.

If a future batch wants shape-aware coverage at 0-29, that's a substantial narrative-design phase that needs proper scoping (new entries per shape, sociological framing, structural-conditions language to avoid temperament-as-destiny implications).

Strict <80-line diffs per builder.

---

## FRONTEND

NO CHANGE.

---

## SYSTEMS

**Primary — Plausibility POLISH (audit coverage gap warning):**

The audit IIFE currently validates that tagged entries point at valid shapes, but doesn't detect coverage gaps (e.g., "0 entries for `precarity` in early bucket"). Extend the audit to surface coverage asymmetry at boot.

Find via:
```
grep -n "ADULT_TRAJECTORY_MILESTONES.*forEach\|audit.*life_shape" script.js | head -10
```

Add: per shape × bucket, count tagged entries. Warn if any non-mixed shape has 0 entries in early/mid (which will trigger silent fallback). Suppress warning when ALL shapes have 0 in a bucket (that's the intentional shape-neutral case).

After Narrative reverts the 3 stability tags, the audit should report ALL shapes at 0 in early/mid → no warning (the intentional case).

~10-15 lines.

**Secondary — Plausibility MAJOR (visible fallback warning):**

Add an `else` branch to `pickAgeTicker` filter that warns (dev-mode only) when fallback fires. Or skip if Primary above covers the case at boot-time.

**Recommended: skip Secondary** — Primary covers it more cleanly. ~0 lines.

Strict <30 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**PRIMARY — REVERT R23 Phase-1 stability tags (8-reviewer convergence).**

The 3 stability tags from `702c9b7` violate developmental-psych principles (temperament-as-destiny) AND create asymmetric coverage. Revert all 3 entries across all 5 languages back to plain strings.

Find via:
```
grep -n "life_shape: 'stability'" script.js | head -20
```

For each of the 3 entries × 5 langs:
- Unwrap from `{ text: '...', life_shape: 'stability' }` back to the plain string.

Also remove the LOOP_REQUEST(narrative, R24) comment block since the path forward is "add new shape-divergent entries" not "tag existing universal entries." Replace with a brief comment: "R23 explored tagging early/mid entries with adult life_shapes; reverted after 8-reviewer convergence that tagging childhood with adult trajectory shapes reifies temperament-as-destiny and creates asymmetric coverage. If shape-aware coverage is desired at 0-29 in a future batch, the path forward is NEW shape-divergent entries (e.g., household economic stress for precarity), not retagging universal development."

~25-30 lines (reverting + comment rewrite).

**Secondary — pickAgeTicker SCOPE NOTE update:**

Update the UX SCOPE NOTE comment to reflect: filter is a documented no-op for ages 0-29 (early/mid buckets are intentionally shape-neutral). Remove R23's "stability codenames see partial coverage" phrasing. ~5 lines.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

NO CHANGE.

---

## UX FLOW

**Optional — Mobile MAJOR (CJK scrollbar padding):**

If you want to address the held Mobile MAJOR on `.scrubber-ticker` padding-right 4px → 12px or `scrollbar-gutter: stable`, take it. Otherwise NO CHANGE — this is Frontend's CSS territory, defer to a future Frontend rev.

**Recommended: NO CHANGE** — out of scope for R23.

## WORLD DESIGN

NO CHANGE.

---

## Cross-cutting deferrals (R24+)

- **UX MAJOR life_shape coverage expansion** — held back to indefinite future. Path forward requires new shape-divergent entries, substantial cross-cultural design work.
- **Mobile MAJOR scrollbar-gutter or padding fix for CJK** — held.
- **Detection POLISH inline comment redundancy** — embedded in Narrative's revert work.
- **Visual Director MAJOR audit cross-lang consistency check** — Systems could pick up but unlikely high-impact; held.
- **Mobile POLISH placeholder ID rename** — held.
- **Product POLISH stagger gen-2 thresholds** — R24.
- **Consent-awareness AFTER projection** — R24.
- **Narrative Design POLISH Inner Cohort/Lifetime Drift port** — R25.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
