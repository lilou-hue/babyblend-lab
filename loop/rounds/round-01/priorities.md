# Round 1 — Synthesized Priorities (post-critique)

Grouped by owning builder. Each item: SOURCE reviewer → terse action.
Builders should pick the items in their list, fit them into <80 lines, and skip what doesn't fit (flagging skips in their report).

## Conflicts resolved by orchestrator

- **Detail vs simplicity** (Product wants OCEAN collapsed; Science/Education want more nuance). Resolved: collapse OCEAN behind disclosure (UX Flow), keep nuance in the cards/tooltips (Education).
- **Sociology + Ethics + Risk** all flag stratification framing. Resolved: World Design rewrites Regional Access without income percentiles; Ethics regulatory notice fires on first non-zero budget allocation.
- **Visual Director wants emphasis on 2019 dot, UX wants reveal faster.** Both compatible — tighten stagger AND add 2019 emphasis.
- **Risk's "default ancestry to mixed in Kids"** is deferred to Round 2 — needs UX consideration of whether it'd erase mixed-race kids' visibility. Not landed this round.
- **Ethics's full "Consent Implications" replacement of Budget panel** is too sweeping for one round; we land the regulatory-notice mitigation instead.

---

## FRONTEND BUILDER
1. (Visual Director MAJOR) Add 2019 He Jiankui sentencing dot emphasis: distinct styling for `.intro-event:nth-child(5)::before`, deeper accent, slower pulse (~6.4s).
2. (UX MAJOR) Add mobile breakpoint for `.regional-list li`: `@media (max-width:720px) { font-size:12.5px; line-height:1.6 }`. Position after the `.regional-list` rule.
3. (Mobile MAJOR) iPad portrait padding fix: `@media (max-width:768px) { .intro-section { padding:56px 20px } }`.
4. (Mobile POLISH) `:focus-visible` rings on `.btn`, `.app-mode-btn`, `.style-btn`, `.gender-btn`: `outline: 2px solid var(--accent); outline-offset: 2px;`.
5. (UX POLISH) Tighten timeline stagger from 0.2s increments to 0.1s, total span ≤0.95s.
6. (Visual POLISH) Add subtle closure beat on final timeline dot (re-glow at delay 2.4s).

## SYSTEMS BUILDER
1. (Science MAJOR) The Falconer σ-scaling enhancement (this round's earlier polygenic σ change) currently applies uniformly to phenotypic AND personality (Big Five) sliders. Constrain it: scale σ with parental disparity for height/athletic/face/skin/hair/eye, but NOT for OCEAN traits. For OCEAN, either keep σ fixed OR explicitly label these as "speculative range" not "confidence band" in the slider def.

## NARRATIVE BUILDER
1. (Writing MAJOR) Rewrite `ADULT_TRAJECTORY_MILESTONES` to drop surveillance jargon ("Subject enrolled in standard early-developmental tracking program", "Voluntary opt-out window has now closed"). Replace with grounded behavioral-trajectory language. ~8-12 lines.
2. (Detection MAJOR) Replace cliché in `HUMANITY_REMINDERS` line 1211: drop "Genes load the gun; environment pulls the trigger; choice writes the story". Substitute grounded line.
3. (Writing POLISH) `ADULT_TRACES` — vary verb openers (currently monotone "Keeps/Knows/Saves/Has").
4. (Detection POLISH) Replace "Variation is the soil future strengths grow from" in `NATURAL_VARIATION_MESSAGES` (~1223).
5. (Psychology POLISH) Add ~4-6 paradox/contradiction entries to `FUNNY_TITLES.en` (e.g., "Worries constantly about things they can't change", "Stays late at parties they didn't want to attend"). Subset, not replacement.
6. (Risk MAJOR) Add a "just stories" preamble to Kids-mode futures rendering OR inject preamble line into KIDS_ADULT_FUTURES pool entries. (If preamble is structural rather than copy, flag `LOOP_REQUEST(ux-flow)`.)

## EDUCATION BUILDER
1. (Science POLISH) Add a one-line caveat to the heritability HISTORY_CARDS card: "This simulator applies a simplified additive-polygenic model — real personality genetics involve gene-by-environment interactions this can't show."

## UX FLOW BUILDER
1. (Product MAJOR) Collapse parent OCEAN traits behind an "Advanced traits" disclosure in each parent card. ~7 visible appearance fields by default; OCEAN sliders revealed on toggle. Heavy lift; keep diff tight.
2. (Narrative Design MAJOR) Gate `renderDivergence()` behind `state.generateCount >= 2` (matches the gating pattern that's already on the analytical Adult panels).
3. (Product POLISH) Hide `#budget-panel` until `state.generateCount >= 2` so its analytical feedback exists when it appears.

## WORLD DESIGN BUILDER
1. (Plausibility MAJOR) Replace "Directive 2039/14" + Schedule I/II/III with real-world references: Oviedo Convention Article 13, UK HFEA 2008, EU IVD-Germ Lines drafts. Keep the dry compliance tone.
2. (Sociology + Ethics MAJOR) Rewrite Regional Access without income percentiles ("60th percentile", "~5% households", "~1% households"). Use access-friction framing: waiting periods, jurisdictional channel codes, eligibility conditions tied to clinical channels — not class-quantified language.
3. (Ethics MAJOR-as-mitigation) Add a regulatory notice that fires when the first non-zero enhancement budget is allocated: dry, single-line, framed as compliance text (e.g., "Notice: enhancement allocations establish heritable advantage. Unenhanced cohorts may experience structural disadvantage."). Hook into the budget update logic.
4. (Plausibility POLISH) Re-anchor the 200-credit cost model on real IVF+PGD pricing OR mark the Cost / Access section as "Speculative future pricing — current IVF+PGD: $15-25K/cycle baseline".
5. (Narrative Design POLISH) Soften case-file labels: rename "Subject ID" → "Simulation Codename", "Classification Tier" → "Optimization Intensity".

---

## Explicitly NOT landed this round (rationale logged)

- Sociology POLISH "diversify parent defaults": defer; randomizing defaults could erase non-blonde/non-mixed visibility differently than expected.
- Risk POLISH "default ancestry to 'mixed' in Kids mode": defer; needs design review of whether "mixed" as a forced default solves or worsens the colorism risk.
- Ethics MAJOR full "Consent Implications" rebuild of Budget panel: defer to a later round; landing the regulatory-notice mitigation only this round.
- Plausibility POLISH cost re-anchoring is OPTIONAL alongside the "Speculative pricing" label fallback.
