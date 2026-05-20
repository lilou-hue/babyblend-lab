# Round 1 — Reviewer Critiques (26 issues from 13 reviewers)

## UX REVIEWER
**MAJOR — Regional Access lacks mobile breakpoint.** 11.5px list items + 1.45 line-height truncate under 720px. Add `@media (max-width:720px)` rule: font-size 12.5px, line-height 1.6 for `.regional-list li`. → `style.css:3866-3879`
**POLISH — Intro timeline stagger too slow.** 0.35s→1.55s spans 1.2s+; reduce to 0.1s increments (0.35s→0.95s total) or drop delay from text content. → `style.css:4239-4245`

## ETHICS REVIEWER
**MAJOR — Budget UI normalizes child-as-product.** "200 credits" across Cognition/Appearance/etc. erases child's autonomy. Add a regulatory notice on first non-zero allocation: "Enhancement choices establish heritable advantage. Unenhanced children may experience systemic disadvantage. This is structural." → `script.js` REGULATORY_NOTE_RULES (~2045-2100)
**POLISH — Inequality copy frames as social consequence, not eugenics risk.** "Visibility of enhancement profile may stratify against non-modified peers" treats it as side-effect. Add structural framing in regulatory text. → `script.js:4348`

## SCIENCE REVIEWER
**MAJOR — Falconer σ scaling shouldn't apply to Big Five.** σ_eff² = σ_base² + k·disparity² is appropriate for additive polygenic *physical* traits, not personality. Either constrain disparity-scaling to phenotypic traits only, OR replace personality confidence-band with "speculative range" label. → `script.js:2587-2615` polygenic branch
**POLISH — HISTORY_CARDS doesn't flag the model's own limitation.** "Heritability is not 'fixed in you'" explains the concept but doesn't say "this sim applies a simplified additive model — actual personality genetics involve gene-by-environment interactions this can't show." → `script.js:~2111`

## WRITING REVIEWER
**MAJOR — ADULT_TRAJECTORY_MILESTONES uses surveillance jargon.** "Subject enrolled in standard early-developmental tracking program," "Voluntary opt-out window has now closed" sounds like state surveillance, not behavioral projection. Rewrite to grounded language: "Enters formal schooling; academic strengths emerging," "High school identity solidifying; adult interests clarifying." → `script.js:~1920-1945`
**POLISH — ADULT_TRACES has monotone openers.** "Keeps / Knows / Saves / Has" stack flattens specificity. Vary verb forms. → `script.js:~1369-1410`

## VISUAL DIRECTOR
**MAJOR — 2019 He Jiankui sentencing dot has no emphasis.** 2018 edit has warm pulse; 2019 consequence uses default cyan. Hierarchy inversion. Apply distinct styling to `.intro-event:nth-child(5)::before` — deeper accent, slower pulse (6.4s). → `style.css` after 4272
**POLISH — Timeline lands flat at end.** No closure beat after final event. Add re-glow on final dot at animation-delay 2.4s, or box-shadow scale-up. → `style.css:4239-4245`

## PSYCHOLOGY REVIEWER
**MAJOR — Futures biased to single dominant trait.** topTag selection produces overly coherent paths (e.g., high openness + high neuroticism still gets "exploratory" futures, not paralyzed ones). Weight by trait *conflicts* instead, or sample partially from a second pool. → `script.js:4250-4263`
**POLISH — FUNNY_TITLES uniformly aspirational.** Missing internal-paradox texture. Tag a subset with contradiction (e.g., "Worries constantly about things they can't change") so vibe selection can align with neuroticism/conflict profile. → `script.js:597-687` + `script.js:4247`

## SOCIOLOGY REVIEWER
**MAJOR — Regional Access encodes income-percentile stratification.** "60th percentile", "~5% of households", "~1% of households" normalizes engineered class hierarchy. Reframe as access-friction without quantifying income cohorts. → `script.js:4607-4611`
**POLISH — Defaults encode Western/hetero-nuclear/OCEAN family model.** Two-parent, blonde+blue Parent A, OCEAN sliders. Surface a brief setup note acknowledging this models one arrangement among many. → `script.js:2401-2417, 35-42`

## MOBILE REVIEWER
**MAJOR — iPad portrait scroll fatigue.** Intro sections have 80px top/bottom padding; only reduces at 600px breakpoint, so iPad 768px scrolls through padding. Add `@media (max-width:768px) { .intro-section { padding: 56px 20px; } }`. → `style.css:4095-4101` + before 4444
**POLISH — No `:focus-visible` on buttons.** `.btn`, `.app-mode-btn`, `.style-btn`, `.gender-btn` lack focus rings → WCAG 2.1 AA fail. Add `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` to each. → `style.css:495, 1078, 1494`

## PLAUSIBILITY REVIEWER
**MAJOR — "Directive 2039/14" + Schedule I/II/III are invented frameworks.** No real-world EU/UK heritable-genome-editing analogue. Replace with: Oviedo Convention Article 13, UK HFEA 2008, or draft EU IVD-Germ Lines references. → `script.js:4607-4613`
**POLISH — 200-credit ($50K-$200K) cost model undershoots real IVF+PGD pricing.** Actual: $15-25K/cycle, multiple cycles; concierge $40-80K total. Either re-anchor on real billing OR explicitly mark as speculative future-pricing. → `script.js:2029-2039, 5290`

## DETECTION AGENT
**MAJOR — Cliché in HUMANITY_REMINDERS.** "Genes load the gun; environment pulls the trigger; choice writes the story" is pseudo-profound stacked metaphor. Replace with grounded science: "Personality traits show ~40–50% heritability; most variation traces to lived experience." → `script.js:1211`
**POLISH — Forced agrarian metaphor in NATURAL_VARIATION_MESSAGES.** "Variation is the soil future strengths grow from" — Pinterest tone. Use direct: "Population trait variation is where future adaptations emerge." → `script.js:1223`

## PRODUCT REVIEWER
**MAJOR — 32-input parent form overwhelms onboarding.** 16 fields × 2 parents (5 OCEAN sliders each) before first Generate. Collapse OCEAN behind an "Advanced traits" disclosure; reduce visible defaults to ~7 core appearance fields. → `index.html:252-294` + `script.js:2400-2418`
**POLISH — Budget panel offers false control.** Visible after 1st Generate but its analytical feedback panels (societal-brief, sibling-cohort, trait-history) are gated until 2nd Generate. Either hide budget-panel until generateCount≥2 OR collapse to a toggle. → `index.html:265-294`, gating at 4407-4627

## RISK ANALYST
**MAJOR — Kids mode futures sound predictive.** "Maybe a teacher who really listens" reads as forecast. Inject template prefix: "These are just stories of *possible* lives — your real one might be completely different, and that's what makes it exciting." → `script.js:2285-2309` + display logic ~3400
**MITIGATION (polish) — Default ancestry to "mixed" in Kids mode** so race-coded phenotype combos don't read as biological destiny. → `script.js:533-585` + PARENT_FIELDS ~2402

## NARRATIVE DESIGN REVIEWER
**MAJOR — Divergence banner fires on 1st Generate.** ~25% chance of meta-analytical critique appearing before fascination has room. Gate `renderDivergence()` behind `state.generateCount >= 2`. → `script.js:4810` call + `script.js:4442` render guard
**POLISH — Case-file medical register clashes with landing's "speculative" framing.** "Subject ID", "Classification Tier" evokes real medical authority while landing says "not real advice". Rename to "Simulation Codename" / "Optimization Intensity". → `script.js:~3268-3300` renderCaseFile()
