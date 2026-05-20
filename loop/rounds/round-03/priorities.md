# Round 3 — Synthesized Priorities

## Conflicts resolved

- **Inheritance Burden weights** (Ethics, Science, Plausibility, Risk converge but differ). Resolved: dual fix — Systems lowers cognition (~0.45–0.5) AND adds a docstring disclaimer that the weights model "non-consensual lock-in," not heritability percentages. World Design updates the user-facing notes to acknowledge category-equivalence in non-consent and remove false-certainty doom-speak.
- **"Diversify Defaults" button** (UX, Mobile, Product, Risk, Sociology all flagged). Resolved: keep the button this round (removing it loses the only structural mitigation), but improve it — add `aria-label`, `data-i18n` mode spans, retitle to name the implicit baseline ("Reset appearance defaults to global phenotype range, not Northern European baseline"). The "move inside parent card" idea is deferred (Round 4 candidate).
- **Consent payoff fragmentation** (Narrative Design + Ethics): Resolved — UX Flow drops the `generateCount >= 2` gate on the Consent Implications panel so the 50-credit threshold alone reveals it.

## FRONTEND BUILDER
1. (Visual MAJOR) Burden-row spacing fix: margin-top 6→12px + padding-top 8→10px; consent-panel -10→-6px.
2. (Visual POLISH) Sync awareness fade-out + progress-hint reveal at 0.45s; add 40ms delay; lift progress track opacity 0.12→0.20, fill 0.55→0.70.
3. (Mobile MAJOR + Mobile POLISH) `.primary-action`: add `flex-wrap: wrap; gap: 8px;` and a `@media (max-width: 768px)` block boosting padding to `12px 18px`. Also implement `:focus-visible` styling on "Diversify Defaults" if missing.

## SYSTEMS BUILDER
1. (Science MAJOR + Ethics MAJOR + Plausibility MAJOR + Risk MAJOR) Rescale `INHERITANCE_BURDEN_WEIGHTS`:
   - cognition 0.7 → 0.5 (matches empathy/resilience cluster)
   - keep emotional/appearance/sociability at 1.0
   - keep athletic 0.6
   - keep creativity/empathy 0.4
   - keep resilience 0.2, health 0.1
   AND add a docstring above the constant: weights represent narrative non-consensual lock-in (reversibility × identity-impact × propagation), NOT heritability percentages. Reference Polderman 2015 in the comment for personality heritability.

## NARRATIVE BUILDER
1. (Detection MAJOR) Rewrite Inheritance Burden tier-4 ("Saturated · the burden propagates without remedy"). Replace with grounded: "Saturated · heritable traits dominate the profile; changes become statistically unlikely." OR similar without false-certainty doom-speak.
2. (Writing MAJOR) Rewrite "Inheritance compounds." HISTORY_CARDS body. Drop "economic inequality written into biology, then carried forward." Ground in access-compounding mechanism rather than biology-determinism. Example: "Enhancements available to wealthy families become inherited advantages. The next generation inherits both the edit and the access — inequality compounds through who can choose, not who can pass on."
3. (Writing POLISH) Vary tier-note rhythm. Drop monotone "descendants inherit / descendants" stack. Aim for parallel-but-varied verbs.
4. (Psychology MAJOR — option a OR b) Either: (a) modify the vibe picker to AVOID conflict-tagged FUNNY_TITLES when conflicts are active (let the conflict FUTURE_PATHS carry the friction); OR (b) rewrite the ~6 paradox FUNNY_TITLES (en/zh/ja/ko/tr) to explicitly surface DISCOMFORT, not integrated personality. Pick (a) if simpler; (b) if you have bandwidth. (If picking (a), this is actually a Systems change — leave a `LOOP_REQUEST(systems): invert the conflict-tag preference in the vibe picker — avoid tag-matches, don't prefer them` and let Systems do it.)
5. (Risk MAJOR — language layer) Soften the pressure-note framing language so health-class doesn't read as "less ethically bad". The reframing belongs partly here (notes) and partly in World Design (regulatory text).

## EDUCATION BUILDER
1. (Science POLISH) Add a brief Kids-mode tooltip on OCEAN speculative-band sliders explaining WHY they're speculative: gene-environment interaction means peers/chance/lived experience matter more than identical twin biology. Link to / cross-reference the existing "Heritability is not fixed in you" HISTORY_CARD. Keep it short — one line.

## UX FLOW BUILDER
1. (Narrative Design MAJOR) Drop the `generateCount >= 2` gate on Consent Implications panel reveal. The 50-credit allocation threshold alone reveals it. Keep the `generateCount >= 2` gate on the OTHER analytical Adult panels.
2. (UX MAJOR + Mobile POLISH + Risk POLISH) "Diversify Defaults" improvements:
   - Add `aria-label="Reset parent appearance defaults to a globally diverse phenotype range"`.
   - Add `data-i18n` attribute + mode-specific text spans matching its neighbors.
   - Update its `title` (and on-screen text where applicable) to: "Reset to global phenotype range instead of Northern European default." (Or similar — name the implicit baseline.)
3. (Sociology MAJOR — persistent frame) Extend the parents-defaults-note to make the baseline explicit. The current note says "Defaults shown are one starting point". Extend to: "Defaults shown represent one ancestry baseline. Use Ancestry or Diversify Defaults to explore others." Verify it's visible above the parent cards.
4. (Ethics POLISH, optional) After the micro-acknowledgment, surface a tiny inline "Reversibility: No · Subject absent: Yes" pair next to the budget bar — visible at all allocation states above 0, BEFORE the full Consent panel reveals. Two short text spans, no expandable widget needed.

## WORLD DESIGN BUILDER
1. (Risk MAJOR + Ethics MAJOR — text layer) Rewrite the comment above `INHERITANCE_BURDEN_WEIGHTS` and the regulatory pressure-note framing to acknowledge category-equivalence in non-consent:
   - Weights' comment: "Health-class allocations weight low because their effects partially reverse across generations or respond to environmental buffering; identity/affect allocations weight high because they self-perpetuate. All heritable allocations remove choice from a future subject — the weights model how much, not whether."
   - Regulatory notes language: don't imply procedural manageability for high-weight categories; the institutional voice should sound *aware* of the consent gap, not pretend its compliance fixes it.
2. (Plausibility POLISH if bandwidth) Add a small "Inheritance compounds via access" institutional footnote near the Cost / Access section pointing at the access-inequality mechanism (vs the biology-determinism reading).

## Deferred (not landed Round 3 revision)

- **Psychology POLISH** (resolution-trajectory beats in conflict FUTURE_PATHS): defer — narratively interesting but requires careful new content; Round 4 candidate.
- **Product MAJOR** (collapse Env Modifiers behind disclosure pre-Generate, move full editor post-Generate): defer — too invasive for one round; Round 4 candidate.
- **Sociology POLISH** (Inheritance Burden tooltip on social-expectation compounding): defer — landed via the docstring + comment changes; revisit if reviewers still flag.
- **Product POLISH** (remove or move "Diversify Defaults"): defer — improve it this round, decide its location in Round 4.
