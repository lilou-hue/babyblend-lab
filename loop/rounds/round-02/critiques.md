# Round 2 — Reviewer Critiques (26 issues from 13 reviewers)

## UX REVIEWER
**MAJOR — KIDS_FUTURES_PREAMBLE injected before h3 (inverts hierarchy).** Place after the heading instead. → `script.js:~3587`
**POLISH — Consent-row labels (11px monospace) don't align with 13px body text; mobile stacks without separators.** 12px + bottom border + inline+bold on mobile. → `style.css:3198-3210`

## ETHICS REVIEWER
**MAJOR — Consent panel is informational only; allocation sliders remain unrestricted.** Either add a required acknowledgment before unlocking sliders, or restrict the framing to Reflection mode. → `index.html:302-306` + consent panel section
**POLISH — "Social Pressure Index" frames autonomy cost as neutral optimization metric.** Relabel to autonomy-forward language ("Modification Reversibility Tier: None") tied to heritability class. → `script.js:5810-5825`

## SCIENCE REVIEWER
**MAJOR — OCEAN slider band visually identical to physical polygenic, despite Systems already making σ fixed for OCEAN.** Visually differentiate (dashed band, or "speculative range" caption) so the inheritance-architecture difference reads. → `script.js:~3361-3365`
**POLISH — Heritable-vs-somatic HISTORY_CARDS overstates Article 13.** Oviedo Art. 13's clearest restriction targets *purpose* (preventive/diagnostic/therapeutic); somatic/heritable distinction is implicit. Revise. → `script.js:2493` (HISTORY_CARDS heritable-vs-somatic entry)

## WRITING REVIEWER
**MAJOR — "no procedural remedy available to them" reads as legal jargon.** Replace with plain language: "has no way to undo or escape." → `CONSENT_IMPLICATIONS` Reversibility row
**POLISH — Heritable-vs-somatic card is 2.5× sibling length, reads encyclopedic.** Trim to tight paragraph, drop legal-citation tail, keep human consequence. → `HISTORY_CARDS` Heritable-vs-somatic entry

## VISUAL DIRECTOR
**MAJOR — Budget + consent panels lack visual grouping (22px gap, identical styling).** Tighten gap, add warm-tinted left border (`border-left: 3px solid rgba(255,210,138,0.4)`) on `.consent-panel` echoing the badge color. → `style.css:3014-3213`
**POLISH — Consent-row labels feel too clinical (accent-cyan monospace); intro text smaller than budget intro.** Use `var(--accent-warm)` on labels, lift row background to `rgba(14,18,40,0.6)`, unify intro to 13px. → `style.css:3198-3213`

## PSYCHOLOGY REVIEWER
**MAJOR — Conflict-tagged FUTURE_PATHS read as symptoms, not lived experience.** Real people minimize/rationalize ("I'm just thorough"); add a coping/rationalization beat in 1-2 entries per conflict tag. → `script.js:765-772`
**POLISH — FUNNY_TITLES paradoxes go un-tagged, so they duplicate conflict-path picks instead of compounding.** Tag the paradoxes (lines 618-623) with matching conflict tags so they surface as pair. → `script.js:618-623`

## SOCIOLOGY REVIEWER
**MAJOR — Appearance defaults (blonde + blue + fair + straight) still encode European phenotype baseline.** Either randomize defaults across ANCESTRY_LADDER or extend the disclosure note to name what the defaults represent. → `script.js:~2776-2782` + `index.html:254`
**POLISH — CONSENT_IMPLICATIONS missing access/wealth dimension.** Add a 4th "Access" row: modifications arrive unevenly; wealth predicts access; future populations inherit the imbalance. → `script.js:CONSENT_IMPLICATIONS`

## MOBILE REVIEWER
**MAJOR — Consent panel breakpoint 640px is wrong for iPad portrait (768px) — 2-col cramped layout persists.** Bump to 768px or flex the 130px label column with `minmax(100px, 18%)`. → `style.css:3211-3212`
**POLISH — Consent-panel selectors lack `prefers-reduced-motion` guards.** Add block disabling transitions/animations, mirror the parent-advanced pattern. → `style.css:3197-3213`

## PLAUSIBILITY REVIEWER
**MAJOR — "UNESCO Universal Declaration… Art. 5" miscites.** Article 5 is about consent for research/diagnosis affecting individuals; heritable concerns sit in Article 24 (or cite the 2015 IBC Report on the Human Genome). Fix the cite or split: "Oviedo Art. 13 (heritable prohibition) + UNESCO Art. 24 (germline-dignity)". → `script.js:2478` CONSENT_IMPLICATIONS Standard-of-care
**POLISH — "Principle of non-maleficence" cited alongside Oviedo Convention is category mismatch.** Either name its institutional home (Belmont Report, GMC/NICE) or drop it in favor of clarity. → `script.js:CONSENT_EXPLAINER`

## DETECTION AGENT
**MAJOR — CONSENT_IMPLICATIONS Heritability row reads as AI abstraction.** "Germline modifications propagate to descendants. The consent gap extends across generations: subsequent persons inherit allocations selected in this session." Ground it: "Anyone born from a heritable edit inherits that choice. Their children inherit it too." → `script.js:CONSENT_IMPLICATIONS` Heritability row
**POLISH — Heritable-vs-somatic HISTORY_CARDS card is 678 chars vs ~270 sibling average, reads textbook.** Trim, kill legal-citation tail. (Overlaps with Writing POLISH.) → `script.js:HISTORY_CARDS` heritable-vs-somatic entry

## PRODUCT REVIEWER
**MAJOR — Adult-mode signature feature (Enhancement Allocation) hidden until 2nd Generate.** First-time users miss the core feature. Show panel disabled-but-visible from start with "unlocks after your first generation" copy. Gate interaction, not visibility. → `script.js:2911-2920` `applyBudgetPanelGate`
**POLISH — Environmental Influences adds a 3rd input section before any output.** Move post-Generate as "Refine environment" or collapse heavily. → `index.html:259-263` (env-panel)

## RISK ANALYST
**MAJOR — Consent badge "Consent affected: heritable" sits next to Beta tag — *normalizes* the decision as routine compliance UX.** Treat it like an inline tag and you've turned an ethical rupture into a chrome detail. Gate the full Consent Implications panel until allocation crosses a threshold (≥50 credits) so it surfaces at meaningful intensity, not click-1. → `script.js:2911-2920` + `index.html:267`
**MITIGATION (polish) — Pair the gated reveal with a one-time micro-acknowledgment** (radio or "I understand this is heritable" click) before sliders unlock past 0. Removes the "feature has compliance implications" reading. → `script.js:2911-2920`

## NARRATIVE DESIGN REVIEWER
**MAJOR — Consent panel arrives at the same moment as Enhancement Allocation; unease should already be building from Gen 1.** Inject a small consent-awareness beat near the trait-conflicts chips at Gen 1 ("Each allocation affects someone who can't consent to it"). Then Consent panel reads as *clarification*, not *intrusion*. → futures block above/inside trait-conflicts
**POLISH — Tonal whiplash between humane futures language ("Cheerfully disorganized") and institutional consent text.** Front-load the *person* not the *institution* in CONSENT_EXPLAINER. → `script.js:CONSENT_EXPLAINER`
