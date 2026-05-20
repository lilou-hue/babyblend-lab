# Round 4 — Reviewer Critiques (26 issues)

## UX
**MAJOR — env-disclosure summary stacks awkwardly at iPad portrait 768px.** Add a `max-width: 768px` rule on `.env-disclosure-summary` adjusting flex / hiding the adult-mode hint. → `style.css` env-disclosure block
**POLISH — Case-file `.is-settling` motion plays every `renderCaseFile()` even when only minor values change.** Track last codename/tier; apply class only on real change. → `script.js` `renderCaseFile()`

## ETHICS
**MAJOR — Vibe picker concern (NOTE: partially obsolete — Systems INVERTED this exact behavior this same round, so this issue was already resolved).** Reviewer wasn't aware. Still worth a sanity-check that the inversion landed correctly. → `script.js:~4827`
**POLISH — "Inheritance Burden Index" label still suggests biological measurement.** Consider rename to "Identity Lock-In Index" + an inline hover docstring naming the autonomy framing. → `index.html` + label sites

## SCIENCE
**MAJOR — Cognition 0.5 still slightly above ~40-45% personality heritability.** Either drop to 0.45 OR strengthen the weights docstring that it's narrative modeling, not science. → `INHERITANCE_BURDEN_WEIGHTS`
**POLISH — Kids gets the OCEAN tooltip explaining gene-environment interaction; Adult does not.** Cross-reference the existing Burden ≠ heritability REGULATORY_CARD from Adult-mode OCEAN slider explainer. → `CONFIDENCE` / `buildExplainerHTML`

## WRITING
**MAJOR — "self-perpetuate down the line" reads as academic-abstraction jargon in Burden ≠ heritability card.** Plainer: "…because once passed forward they reshape the person's life and the next generation's options." → `REGULATORY_CARDS` Burden ≠ heritability entry
**POLISH — "allocation" repeats 7x across REGULATORY_NOTE_RULES.** Vary with enhancement/intervention/choice/package. → `REGULATORY_NOTE_RULES` (lines ~2647-2712)

## VISUAL DIRECTOR
**MAJOR — `.compliance-footnote` cool-blue border `rgba(140,180,220,0.25)` vs warm-accent footnotes `rgba(255,210,138,0.16)` fractures the "unified institutional voice" claim.** Pick one — likely warm-accent for triplet continuity. → `style.css` footnote selectors
**POLISH — Case-file 0.6s settle vs env-disclosure 0.45s reveal — motion vocabulary inconsistency.** Align case-file settle to 0.45s `ease`. → `.case-file.is-settling`

## PSYCHOLOGY
**MAJOR — Resolution-trajectory acceptance-mode entries collapse into surrender ("gives up explaining") rather than active inhabiting.** True acceptance keeps both sides conscious. Rewrite ~2 acceptance entries to show the ongoing cost. → `FUTURE_PATHS` conflict-resolution range (~`script.js:797-804`)
**POLISH — Integration-mode entries land too clean ("calls the second part rest without flinching").** Self-help completions, not lived friction. Add ongoing cost / occasional regression to 1-2 entries. → same range

## SOCIOLOGY
**MAJOR — Burden ≠ heritability REGULATORY_CARD is English-only.** Non-English Adult users miss the intellectual scaffolding. Translate to zh/ja/ko/tr. → `REGULATORY_CARDS` Burden ≠ heritability entry
**POLISH — ADULT_TRAJECTORY_MILESTONES universalize mid-career stability across all 4 languages.** No precarity / caregiving / forced-transition variants. (Defer if Round-5 better.) → `ADULT_TRAJECTORY_MILESTONES`

## MOBILE
**MAJOR — `.env-disclosure-summary` touch target ~24px violates WCAG 2.5.5 (44px min).** Add `min-height: 44px` + mobile padding cushion. → `style.css` `.env-disclosure-summary`
**POLISH — env-disclosure summary has no `:focus-visible` styling.** Mirrors pattern at `.parent-advanced-summary`. → same selector

## PLAUSIBILITY
**MAJOR — "Class II"/"Class III" + many invented codes (CMP-2, GE-3, IVD-Germ Lines Directive Art. 6, intra-cohort variance threshold, RA-2/3/4 channel codes) don't map to real germline policy.** Class II/III are medical-device-directive (MDR/IVDR) imports — not applicable to heritable edits. Replace with HFEA 2008 Schedule 2 (licensed use categories), reference real country germline bans (Germany, Austria), realistic clinic waitlists. → `REGULATORY_NOTE_RULES` + `renderRegionalAccess`
**POLISH — Same surface, jargon density disguises absence.** Compound the cleanup.

## DETECTION
**MAJOR — "self-perpetuate down the line" is vague-momentum AI-abstraction** (same as Writing MAJOR). → `REGULATORY_CARDS`
**POLISH — EN-tension resolution entries echo melancholic-litfic clichés ("tired in a way sleep doesn't fix").** Replace with lived specificity matching the bar set by "Saves voicemails from people who have died." → conflict-resolution FUTURE_PATHS

## PRODUCT
**MAJOR — Env Modifiers collapse signals non-essential, but env values FEED ADULT_TRACES selection.** Users misread traces as pure allocation effects. Surface a one-line env-summary near the burden bar even when env-disclosure is closed, OR add a brief "Set during setup" cue inside the trace cards. → env summary surface
**POLISH — Diversify Defaults button duplicates the in-form disclosure note's affordance.** Now that the note explicitly names "one ancestry baseline", the button is redundant chrome. Either remove + rely on note + per-card randomize, OR move inside parent card. → `index.html:319-322`

## RISK
**MAJOR — Burden ≠ heritability card inadvertently LEGITIMIZES the tier hierarchy by framing the index as rigorous.** Reads as: "health-class = lower burden = more justified." Worse: the card's "environmental buffering" claim contradicts the compliance footnotes that treat all classes equally. Rewrite the card to explicitly say weights are NOT ethics-approval and ALL allocations remove consent equally. → `REGULATORY_CARDS` Burden ≠ heritability
**MITIGATION (polish) — Add a 1-liner above the burden bar:** "All allocations remove the future subject's choice equally; the weight measures how widely the loss propagates, not whether it occurs." Pairs with the rewrite. → Frontend / UX Flow placement

## NARRATIVE DESIGN
**MAJOR — Consent rhythm cascade churn (0.9s of stacked motion) when consent panel reveals at 50 credits during mid-engagement.** Delay consent panel reveal by 200ms OR collapse it behind explicit "Implications" toggle. → `script.js` consent-panel reveal flow
**POLISH — Resolution-trajectory variants undercounted: 8 entries cover 4 tags × 2 modes max.** Missing 1-2 damage/maturation per tag. Add ~4 more entries spread across the gap. → `FUTURE_PATHS` conflict resolution range
