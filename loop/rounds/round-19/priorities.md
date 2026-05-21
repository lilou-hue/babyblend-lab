# Round 19 — Priorities (synthesized from 26 critiques)

Three dominant convergences this round:

1. **Disclosure-family visual drift** (Visual Director MAJOR + UX MAJOR): burden-disclaimer warm-amber inside cyan container; padding/font drift across 3 family members.
2. **Heritability comment problems** (Plausibility MAJOR + Ethics MAJOR + Science MAJOR + Sociology MAJOR): "lock-in breadth" rebrand doesn't match the math; doesn't surface structural drivers.
3. **Interruption entry coherence** (Writing MAJOR + Psychology MAJOR + Risk MITIGATION + Sociology POLISH + Narrative Design MAJOR + Ethics POLISH): linear-recovery presupposition + medicalized framing + register mismatch + arc-shape asymmetry.

Plus single MAJORs: Product save/restore `age` field; Mobile padding overflow; Detection Turkish translation error; Narrative Design POLISH cross-lang tag asymmetry (bloom/precarity).

Strict <80-line diffs per builder.

---

## FRONTEND

**Primary — VISUAL DIRECTOR MAJOR + UX MAJOR convergence:**

Disclosure family currently has 3 inconsistent treatments. Pick ONE unified style:
- Color: cyan border across all 3 (change `.burden-disclaimer` from warm amber → cyan to match the other two — it sits inside a cyan-bordered container anyway)
- Padding-left: 10px across all 3 (trajectory currently 8px)
- Font-size: 11px line-height: 1.5 across all 3 (trajectory currently 11.5px / 1.45)
- Color token: pick one (`--ink-mute` recommended for consistency)

This is "harmonize the disclosure family" — should reduce, not add, CSS surface.

**Secondary — MOBILE MAJOR (trajectory-disclaimer mobile overflow):**

The 8px → 4px padding-left fix from Mobile MAJOR overlaps with the unification fix above. If you standardize all 3 to 10px padding-left, that resolves the inconsistency but may worsen mobile overflow. Use `.aging-scrubber` container padding compensation rather than reducing the disclaimer padding-left specifically. ~5 lines.

Strict <40 lines. CSS only.

---

## SYSTEMS

**Primary — PLAUSIBILITY MAJOR + ETHICS MAJOR + SCIENCE MAJOR convergence on heritability comment:**

Three reviewers converged: the "lock-in breadth" framing doesn't match the actual math (cost × units × weight, single-generation scalar). The comment should either (a) lower weights to match heritability, or (b) be precise about what "lock-in breadth" measures.

**Recommended fix (option B, lighter touch):** Rewrite the comment to be honest about the mechanism:
- Remove "BREADTH" framing (Plausibility MAJOR)
- Replace with: "LOCK-IN WEIGHT — a proportional scalar reflecting how heavily this trait contributes to the simulation's three-generation identity-lock Index, NOT a heritability percentage."
- Add Sociology MAJOR's structural drivers (one sentence): "Real-world cascades depend on institutional context — gendered beauty standards, labor-market parenting stress, healthcare access — not on biology alone."
- Add Risk MAJOR's gender note: "This model weights all traits neutrally to avoid baking gender-specific burden into the calculation itself; in lived experience appearance-pressure cascades asymmetrically by gender."

~15-25 lines.

**Secondary — PRODUCT MAJOR (`age` field in save/restore):**

R18 added `adultGenerateCount` to save/restore. `age` is the next missing piece — when a user loads a saved timeline, the scrubber resets to default. Fix:
- Add `age: state.age` to `saveCurrentTimeline()` snapshot
- Add `state.age = entry.age ?? 17` (or whatever the default is) in `loadTimeline()`

~5-8 lines.

**Tertiary — PRODUCT POLISH (re-render on lang switch):**

Language change handler should call `renderAgingScrubber()` if a baby is generated. ~3 lines. Easy win.

Strict <50 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — 6-reviewer convergence on interruption entry:**

Multiple concerns:
- **Psychology MAJOR + Risk MITIGATION**: "reorient as it lifts" presupposes linear recovery; "lifts" pathologizes permanent loss.
- **Writing MAJOR**: register mismatch with gate/disclaimer (UI/system voice vs narrative voice).
- **Sociology POLISH**: doesn't connect to structural conditions.
- **Narrative Design MAJOR**: two-phase arc mismatches other single-phase shapes.
- **Ethics POLISH**: medicalized framing.

**Pick ONE rewrite that lands all five concerns:**

> "A disruption in this decade — illness, job loss, caregiving crisis, or other shock — reshapes priorities. What emerges after is different from what was planned, and not always 'recovered'; some change reshapes the trajectory permanently."

This:
- Describes the state, not the transition (Narrative Design MAJOR)
- Avoids "reorient as it lifts" linear-recovery (Psychology MAJOR)
- Acknowledges permanent change (Risk MITIGATION)
- Removes "illness, loss" trio (now "disruption — illness, job loss, caregiving crisis, or other shock") — names structural shocks alongside health (Sociology POLISH, Ethics POLISH)
- Stays narrative-voice (Writing MAJOR — note this means gate/disclaimer should also be narrative-voice, but that's UX Flow's concern)

Translate to zh/ja/ko/tr. Update all 5 entries.

**Secondary — Detection MAJOR (Turkish trajectory-disclaimer translation error):**

Turkish "yalnızca biri" (only one) is singular and reverses the intended meaning ("one set among many" → "only one of"). **Fix:** "Bunlar bu kişinin karşılaşabileceği olası örüntüler — bir tahmin değil." Update only the Turkish entry of the trajectory-disclaimer.

**Tertiary — Narrative Design POLISH (cross-lang tag asymmetry):**

R18/R19 tagged bloom/precarity/caretaking only in EN. Now interruption is in 5 langs (R19 win); bloom/precarity are still EN-only. Wrap zh/ja/ko/tr bloom + precarity entries with `{ text: '...', life_shape: 'bloom'|'precarity' }` objects to match EN pattern. This was the R17 Science MAJOR concern surfacing again. ~8-10 lines of wrapping.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

NO CHANGE likely. R18 added "Life shapes are patterns, not fates" card; R19 doesn't open new educational surface.

Max <30 lines.

---

## UX FLOW

**Primary — WRITING MAJOR (register coherence):**

Gate placeholder + trajectory-disclaimer both speak UI/system voice. Writing MAJOR wants both moved to more human-centered phrasing.

**Recommended (pick one site, don't change both this round):** Trajectory-disclaimer migration to slightly warmer language:
- Current: "These are one set of patterns this person might encounter — not a forecast."
- Suggested: "These patterns are one story among many — not what will happen."

Update LABEL_I18N across 5 langs (including the Turkish fix from Narrative). Don't touch the gate copy this round (R18 already replaced it; another iteration risks whiplash).

~15-20 lines.

**Defer — Mobile POLISH (`.scrubber-ticker max-height`):** Held; needs design decision.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

NO CHANGE likely. Structural framing already correct.

Max <30 lines.

---

## Cross-cutting deferrals (R20)

- **Science MAJOR alternative (lower weights to match heritability)** — deferred. R19 takes the lighter "clarify framing" path; full weight rebalance is a larger discussion.
- **Mobile POLISH — `.scrubber-ticker max-height + overflow`** — deferred.
- **UX POLISH — move heritability docstring to dedicated JSDoc block** — deferred (small but optional).
- **Ethics MAJOR — remove `budgetUsed === 0` from gate condition** — held since R18.
- **UX MAJOR — extend life_shape tagging to early/mid ADULT_TRAJECTORY buckets** — held.
- **Mobile MAJOR — full `<dt role="status">` → `<div>` restructure** — held.
- **Product POLISH — stagger gen-2 panel-unlock thresholds** — held.
- **Narrative Design POLISH — port Inner Cohort + Lifetime Drift to Adult mode** — held.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
