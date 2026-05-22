# Round 21 — Priorities (synthesized from 26 critiques)

Three dominant convergences:

1. **Divisor recalibration** (6 reviewers — UX POLISH + Science POLISH + Visual Director MAJOR + Plausibility MAJOR + Risk MAJOR + Ethics POLISH): rescale `/90` divisor proportional to the weight rebalance so the bar's dynamic range is preserved.
2. **Generate-button affordance gap** (4 reviewers — UX MAJOR + Ethics MAJOR + Product MAJOR + Narrative Design MAJOR): placeholder names "generate again" but button has no signal; add a small visual cue.
3. **Placeholder copy register** (6 reviewers — Writing MAJOR/POLISH + Detection MAJOR/POLISH + Narrative Design MAJOR/POLISH): "generate again" jars vs Adult clinical voice; "Adjust above first" mildly imperative; Japanese imperative form; Turkish verb repetition.

Plus heritability creep (Sociology MAJOR); pressure-note copy framing (Psychology MAJOR); appearance weight calibration philosophy (Science MAJOR); mobile a11y aria-live re-announce on innerHTML (Mobile MAJOR).

Strict <80-line diffs per builder.

---

## FRONTEND

**Primary — VISUAL DIRECTOR POLISH:**

Add explicit percentage stops to `.projection-bar-fill` gradient so the purple zone is visible at small widths:
```css
linear-gradient(90deg, rgba(126,224,255,0.55) 0%, rgba(200,155,255,0.55) 50%, rgba(255,155,210,0.7) 100%)
```

**Secondary — PRODUCT POLISH (post-allocation Generate button cue):**

If UX Flow doesn't ship the Generate-button affordance, Frontend can add a CSS-only cue: when `.btn-generate-projection` is in `data-pending-reveal="true"` (set by JS in Systems/UX Flow), add a subtle box-shadow pulse or accent border. ~10 lines. **Coordinate via LOOP_REQUEST** rather than building speculatively.

**Tertiary — MOBILE POLISH:**

Add `@media (max-width: 540px)` rule for `.projection-gated-placeholder` to bump line-height to 1.6 or adjust padding for narrower viewport text wrapping. ~5 lines.

Strict <30 lines. CSS only.

---

## SYSTEMS

**Primary — 6-reviewer convergence on divisor recalibration:**

Math: max emotional weight 1.0→0.4, appearance 1.0→0.6. Max possible burdenCost dropped by factor of ~0.6-0.77 depending on which sub-traits are accounted for.

**Pick: `/90` → `/70`.** This is a moderate rescale that preserves most of the dynamic range without over-correcting (going to /54 risks the opposite problem — bar fills too fast). 70 is also defensible as "approximate proportional rescale" rather than chasing exact math.

Update the inline LOOP_REQUEST(systems) comment from R21 to a CLOSED note: "R21rev: rescaled to /70 to restore bar dynamic range proportional to weight rebalance."

**Secondary — SCIENCE MAJOR (appearance weight philosophy):**

Two options:
- (A) **Keep appearance at 0.6** and revise the "upper bound" framing in the comment to "conservative mid-range estimate."
- (B) **Raise appearance to 0.75** to actually match the upper-bound philosophy.

**Recommended: (A)** — 0.6 sits at a defensible midpoint of facial-morphology heritability and keeps the lock-in framing conservative. Rewriting the comment is ~3-5 lines.

**Tertiary — SOCIOLOGY MAJOR (heritability creep):**

Add a sentence to the inline weight-comment block clarifying that the weights are NOT empirical heritability percentages — they're cascade-breadth scalars now calibrated to sit *at or below* the empirical heritability range (so the bar never claims more lock-in than biology + cascade combined could justify). ~3-5 lines.

**Quaternary — PSYCHOLOGY MAJOR (pressure-note copy):**

The `pressureNote` strings for tier "Modest" / "Substantial" need a rewrite to decouple heritability from propagation. Suggested for Modest tier: *"Modest · traits at this weight propagate through family identity-templates and structural cascades; 40-60% biological variation suggests plasticity remains high — what locks in is parenting + appearance baseline, not trait fixity."*

Update EN + zh + ja + ko + tr. **Wait — this might be Narrative's surface.** Defer to Narrative if their priorities cover it. Otherwise Systems can take it.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — 6-reviewer convergence on placeholder copy register:**

Current: "This projection waits until you generate again. Adjust above first if you want to shape it."

**New (final form, addressing all 6 reviewer concerns):**

"**This projection awaits the next generation. Adjustments above shape it; no shaping is also a choice.**"

- "Awaits the next generation" — matches Adult clinical register (Writing + Narrative Design MAJOR), passive voice (Sociology POLISH), no app-mechanical "generate again" (Writing MAJOR + Detection)
- "Adjustments above shape it" — softer than "Adjust above first" (Writing POLISH)
- "No shaping is also a choice" — defuses iteration-optimization framing (Risk MITIGATION)

Update EN + zh + ja + ko + tr. Japanese: AVOID archaic imperative forms (Detection MAJOR). Turkish: avoid "ayarla" repetition + "Şekillendirmek" abstraction (Detection POLISH).

**Secondary — PSYCHOLOGY MAJOR (pressureNote heritability decoupling):**

If you have budget, rewrite the "Modest" tier pressureNote copy as suggested above. EN + 4 langs. ~10-15 lines.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

Likely NO CHANGE.

Max <30 lines.

---

## UX FLOW

**Primary — 4-reviewer convergence on Generate-button affordance:**

The cleanest implementation: when the gate is active (adultGen===1 + gate enabled), modify the Generate button's accessible label and add a small visual cue (e.g., text variant "Generate Projection — Reveal", or a subtle highlight via a CSS class added at render time).

**Pick the lighter intervention:**
- (A) **aria-label change only**: `<button aria-label="Click to reveal the projection">`. Screen-reader users get the hint; sighted users rely on placeholder copy. ~5 lines.
- (B) **Visible label suffix**: add "→ Reveal" or similar to the button text when in gated state. ~10 lines.
- (C) **CSS class for visual highlight**: add `is-pending-reveal` class when gate is active; Frontend (or this round) defines the CSS rule. ~15 lines.

**Recommended: (B) + (C)** — visible label change + subtle CSS highlight. ~20-25 lines total. Coordinate with Frontend's "Secondary" item via LOOP_REQUEST.

Update across 5 langs for the label suffix.

Strict <50 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

NO CHANGE.

---

## Cross-cutting deferrals (R22+)

- **Science MAJOR alternative — raise appearance to 0.75** (R22 only if R21rev framing fix doesn't resolve).
- **Mobile MAJOR — aria-live re-announce / `<dt role="status">` full restructure** — held since R19; defer to R22 along with the broader `<dt>` → `<div>` work.
- **Visual Director MAJOR alternative — divisor to /60 or /54** if /70 still reads under-calibrated.
- **Psychology POLISH — widen weight band** (0.4/0.6 cluster) — held.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
