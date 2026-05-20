# Round 3 — Reviewer Critiques (26 issues from 13 reviewers)

## UX REVIEWER
**MAJOR — "Diversify Defaults" lacks mode-specific labels.** No `data-i18n`, no per-mode spans like neighboring buttons. → `index.html:319-322` + `script.js:6282-6283`
**POLISH — `.primary-action` no `flex-wrap`.** 4 buttons crush on tablet; padding 10px 16px too tight under 880px. → `style.css:547-551`

## ETHICS REVIEWER
**MAJOR — Inheritance Burden weights normalize regulatory friction over consent loss.** Identity-class allocations (cognition 0.7, emotional 1.0, etc.) frame ethics as procedural rather than substantive. Either rescale OR shift regulatory note language to substantive consent barriers, not access tiers. → `script.js:5976-5980` + `2394-2451` + `6046-6050`
**POLISH — Consent explainer hidden between micro-ack and Gen-2+50 reveal.** Users may exceed cautionary thresholds before seeing full justification. Surface a simplified "Reversibility: No / Subject absent: Yes" pair right after micro-ack. → `script.js:5865-5896` + `2934-2945`

## SCIENCE REVIEWER
**MAJOR — Cognition weighted 0.7 conflates "allocation cost" with "heritable lock-in".** Polderman 2015: personality ~40–50% heritable; cognition belongs near empathy/resilience (0.4 range), OR weights need an explicit docstring disclaimer that they model narrative identity-lock-in, not heritability percentages. → `script.js:5977-5980` + `6041-6044`
**POLISH — Speculative band signals uncertainty visually but doesn't explain WHY.** Gene-environment interaction unseen. Link Kids-mode OCEAN slider to existing "Heritability is not fixed in you" card or add a tooltip. → `script.js:2507-2517` + `2482-2484`

## WRITING REVIEWER
**MAJOR — "Inheritance compounds." stacks two metaphors.** "economic inequality written into biology, then carried forward" — internet-brain rhetoric. Ground it: "Enhancements available to wealthy families become inherited advantages, compounding across generations." → `script.js:2477`
**POLISH — Tier notes have monotone "descendants inherit" rhythm.** Vary the verb. e.g. "Minimal · little locked in advance" / "Modest · a few traits persist to children" / "Substantial · a defined profile passes forward" / "Saturated · the burden self-perpetuates." → `script.js:6044-6047`

## VISUAL DIRECTOR
**MAJOR — Burden-row 6px gap vs consent-panel -10px pull-up reads inconsistent.** Reverses momentum; burden row reads as last item *inside* budget box. Bump margin-top 6→12px + padding-top 8→10px on burden row; reduce consent -10→-6px. → `style.css:3809-3815`
**POLISH — Awareness fade-out (0.4s) + progress-hint reveal (0.45s) un-synced.** Harmonize both to 0.45s + add 40ms delay so hint enters *after* note clears; lift progress track 0.12→0.20 opacity, fill 0.55→0.70. → `style.css:3228-3265`

## PSYCHOLOGY REVIEWER
**MAJOR — Vibe picker now *gaslights* conflicts.** Picks "Plans meticulously, then improvises in the moment" (OC-tension) — that rationalizes coping AS coherence rather than naming friction. Either (a) select non-conflict vibes when conflicts exist (let futures carry it), or (b) rewrite tag-matched FUNNY_TITLES to surface explicit discomfort. → `script.js:4806-4817` + FUNNY_TITLES 618-623 etc.
**POLISH — Conflict-tagged FUTURE_PATHS show same loops in adulthood, no evolution.** Add resolution-trajectory beats: integration ("learned to alternate"), acceptance ("stopped trying to reconcile"), damage ("burned out twice"). → `script.js:765-772`

## SOCIOLOGY REVIEWER
**MAJOR — "Diversify Defaults" purely opt-in.** European baseline remains the displayed starting point for any user who doesn't click. Pair with a persistent visible frame: a short note in the parent form admitting "Defaults shown represent one ancestry; use Diversify Defaults to explore others." → `index.html:254` + `script.js:5555-5577` + `index.html:318-321`
**POLISH — Inheritance Burden label-expectation mismatch.** Appearance burden lacks tooltip explaining it stems from social-expectation compounding, not biological transmission alone. → `script.js:~2455-2477` + `index.html:287-291`

## MOBILE REVIEWER
**MAJOR — `.primary-action` 4-button overflow on iPad 768px.** No flex-wrap, 10px touch padding fails WCAG 2.5. Add `flex-wrap:wrap; gap:8px;`, tablet padding 12px 18px, or grid 2-col under 768px. → `style.css:547-551`
**POLISH — "Diversify Defaults" relies on `title` attribute (inaccessible on touch).** Add `aria-label` and `data-i18n` keys + mode-specific spans matching siblings. → `index.html:319-322` + `script.js:5565-5566`

## PLAUSIBILITY REVIEWER
**MAJOR — Burden weights *invert* institutional logic.** Cognition 0.7 < emotional 1.0 — but Oviedo Art. 13's purpose-test would classify cognitive optimization as *higher*-burden (furthest from medical necessity). Realign: cognition 0.9+, emotional/appearance 0.8. OR explicitly reframe as "parental-optimization intensity" not "institutional burden". → `script.js:5976-5980`
**POLISH — "Inheritance compounds." lacks mechanism.** Mendelian segregation doesn't preserve parental advantage across generations. Ground in real socioeconomic-heritability literature (wealth + education predict outcomes more than genes; inequality via access, not biology) — OR cite polygenic-score stratification studies. → `script.js:2477`

## DETECTION AGENT
**MAJOR — "Saturated · the burden propagates without remedy" is false-certainty doom-speak.** Reframe: "Saturated · heritable traits dominate the profile; changes become statistically unlikely." → `script.js:6049`
**POLISH — "don't fade with the generation that chose them" is policy-paper voice.** Change to "don't disappear; they accumulate across descendants." → `script.js:2477`

## PRODUCT REVIEWER
**MAJOR — 5 input layers (parents + env + OCEAN + enhancement + consent) before output.** Collapse Environmental Modifiers behind disclosure pre-Generate, full editor post-Generate as "Refine Projection". → `index.html:259-263` + render flow
**POLISH — "Diversify Defaults" button has no clear semantic role.** Either remove (rely on existing disclosure note + per-card randomize) OR move inside parent card as labeled "Diverse phenotypes" toggle. → `index.html:319-322`

## RISK ANALYST
**MAJOR — Weighted Burden Index creates harmful implicit hierarchy.** Health-class "minimal burden" vs identity "saturated" implies health optimization is *more justified*, despite identical non-consensual heritability. Reframe weights' rationale: "Health-class allocations weight low because their effects partially reverse across generations or respond to environmental buffering; identity/affect allocations weight high because they self-perpetuate." → `script.js:5963-6055` (comment block + weights)
**MITIGATION (polish) — "Diversify Defaults" tooltip should name the implicit power move.** "Reset to global phenotype range instead of Northern European default." → `index.html:320`

## NARRATIVE DESIGN REVIEWER
**MAJOR — Fractured consent payoff.** User hits 50-credit threshold in Gen 1 → only progress bar appears; full Consent Implications panel still gated at Gen 2. Drop the `generateCount >= 2` gate on the panel (50-credit threshold alone reveals it) OR revise progress hint to telegraph the Gen-2 requirement. → `script.js:2934` + `5910`
**POLISH — Awareness note lands *after* fascination has peaked.** Vibe title + futures + social pressures already seen. Surface the note earlier in the preview (before vibe title), OR hold the micro-ack gate until the user actively touches a slider. → `script.js:3688-3715` + `5825-5835`
