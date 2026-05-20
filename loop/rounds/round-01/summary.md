# Round 1 — Summary

## What changed

**Phase 1 (builder pass, 6 parallel worktrees, all merged):**
- *Frontend* — staggered intro-history reveal + warm pulse on the 2018 He Jiankui dot (`3a12dde`)
- *Systems* — polygenic σ scales with parental disparity (Falconer-flavored segregational variance) so slider bands react to how far apart the parents are (`95ab32f`)
- *Narrative* — replaced 10 aphoristic `FUNNY_TITLES.en` entries with grounded specifics; left a `LOOP_REQUEST(translator)` for zh/ja/ko/tr (`86b061a`)
- *Education* — cited Polderman et al. 2015 for Big Five heritability + added a "heritability is not 'fixed in you'" companion `HISTORY_CARDS` entry (`b052283`)
- *UX Flow* — gated three Adult-mode analytical panels (Societal Outcomes, Sibling Cohort, Trait Popularity) behind `generateCount >= 2` so first Generate is just the baby (`152aedb`)
- *World Design* — Regional Access rewritten as compliance disclosure: Schedule II refs, RA-1…RA-5 channel codes, Tier-B clinics, quarterly-revision footnote (`2dc1b65`)

**Phase 2 (13 reviewers in parallel, read-only):** 26 issues returned. See `critiques.md`.

**Phase 3 (synthesis):** 26 → 5 deferred + 21 prioritized actions distributed to the 6 builders. See `priorities.md`.

**Phase 4 (revision pass, 6 parallel worktrees, all merged):**
- *Frontend* — landed all 6 priorities: deep-red 2019 sentencing dot with 6.4s pulse, mobile breakpoint for `.regional-list`, iPad portrait padding fix, `:focus-visible` rings across button variants, tightened timeline stagger (0.95s span), closure re-glow on the final dot. `prefers-reduced-motion` extended for new animations. (`a64dca9`)
- *Education* — added the "this simulator applies a simplified additive-polygenic model" caveat to the heritability card (`7cc4137`)
- *Systems* — constrained the Falconer disparity-scaling to phenotypic polygenic sliders only; OCEAN sliders now use fixed σ. (`9e79beb`)
- *Narrative* — landed all 6 priorities: `ADULT_TRAJECTORY_MILESTONES` rewritten in observational clinical voice (drops surveillance jargon), HUMANITY_REMINDERS "load the gun" cliché replaced with a heritability stat, `ADULT_TRACES` openers de-monotoned, NATURAL_VARIATION_MESSAGES "soil" metaphor replaced with "Difference is information, not error", 6 paradox entries appended per-language to `FUNNY_TITLES`, `KIDS_FUTURES_PREAMBLE` constant + `LOOP_REQUEST(ux-flow)` for the Kids-mode "just stories" wrapper. (`3db65f4`)
- *World Design* — landed all 5 priorities: real instruments throughout Regional Access (Oviedo Article 13, HFEA 2008 §3ZA, draft EU IVD-Germ Lines Directive Art. 7), income-percentile language removed, first-allocation regulatory notice added to `REGULATORY_NOTE_RULES`, case-file labels softened ("Simulation Codename" / "Optimization Intensity"), speculative-pricing anchor inlined. (`42f0699`)
- *UX Flow* — landed all 3 priorities: `renderDivergence` gated behind `generateCount >= 2`, `#budget-panel` gated by `applyBudgetPanelGate()` hooked into the mode + generate paths, OCEAN sliders collapsed behind a `<details>` per parent card with lightweight CSS reveal animation. (`5703d7d`)

## What was deferred (logged for round 2+)

- **Sociology POLISH** — diversifying parent default profiles. Defer: randomization could erase phenotype visibility in unintended ways; needs design review.
- **Risk POLISH** — defaulting ancestry to "mixed" in Kids mode. Defer: same reasoning; needs UX review of whether forced default helps or harms.
- **Ethics MAJOR (full Consent rebuild)** — replacing the Budget panel with a "Consent Implications" panel. Deferred in favor of landing the regulatory-notice mitigation only this round; the full rebuild is too sweeping for one round.
- **Open `LOOP_REQUEST`s** carried forward to Round 2:
  - `LOOP_REQUEST(translator)` on the paradox tail of FUNNY_TITLES in zh/ja/ko/tr
  - `LOOP_REQUEST(narrative)` to refine the OCEAN-disclosure toggle label "Advanced traits"
  - `LOOP_REQUEST(ux-flow)` to inject `KIDS_FUTURES_PREAMBLE` above the Kids-mode futures block

## What Round 2 should focus on

1. **Resolve the deferred ancestry-default question.** Either decide the answer (UX-flow + Risk together) or stage an A/B that the user can choose between.
2. **Close the open `LOOP_REQUEST`s** (translator finishes the paradox tails; narrative provides a real label for the OCEAN disclosure; ux-flow injects the kids-futures preamble).
3. **The Ethics consent rebuild.** Now that the regulatory-notice mitigation exists, the broader question is whether the Enhancement Allocation panel should *frame itself* as a consent decision (the child's autonomy not just the parent's optimization). World Design + Ethics should co-design.
4. **Psychology's "trait conflict" weighting.** This round only added paradox FUNNY_TITLES; the futures selection logic still biases on the single topTag. Systems + Narrative should jointly add conflict-aware future selection.
5. **Visual coherence pass on the new disclosure UI** — the OCEAN `<details>` got a placeholder reveal; Frontend should integrate it with the existing motion language.
