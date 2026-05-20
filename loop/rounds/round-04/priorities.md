# Round 4 — Synthesized Priorities

## Conflicts resolved

- **"Burden ≠ heritability" card** (Ethics + Writing + Detection + Risk converge): rewrite to explicitly disavow tier legitimation. The card should NOT read as ethics-approval; it should say all allocations remove consent equally and the weights model propagation, not justification. Narrative leads the rewrite; Systems strengthens the docstring; Education adds a UX-flow companion line above the burden bar.
- **Cognition weight 0.5 vs heritability ~0.4-0.45** (Science): if Systems rewrites the docstring strongly enough (as part of the Burden ≠ heritability rewrite), keep cognition 0.5; if not, drop to 0.45. Systems decides during their revision.
- **Class II/III + invented codes** (Plausibility): replace at least the most prominent invented designation (Class II/III) with HFEA Schedule 2/3 references. Don't try to fix every code in one round.
- **Resolution-trajectory templating** (Psychology + Narrative Design): Narrative rewrites 2 acceptance entries to show active inhabiting + adds 2-4 more variants spanning damage/maturation per tag.

## FRONTEND
1. (Visual MAJOR) Unify compliance-footnote border color — `.compliance-footnote` cool-blue → warm-accent matching siblings.
2. (Visual POLISH) Align case-file `.is-settling` duration to 0.45s + same ease curve as `parent-advanced-reveal`.
3. (Mobile MAJOR) `.env-disclosure-summary`: add `min-height: 44px`, mobile padding cushion (~10px at <720px).
4. (Mobile POLISH + UX) `:focus-visible` styling on env-disclosure summary mirroring parent-advanced pattern; iPad-portrait stacking fix.

## SYSTEMS
1. (Risk MAJOR + Science MAJOR) Strengthen the `INHERITANCE_BURDEN_WEIGHTS` docstring to explicitly disavow weights as ethics-approval. Make it impossible to read the weighting as "health is more acceptable". Sample addition:
   > "These weights are NOT a measure of ethical acceptability. Every heritable allocation removes the future subject's choice; the weight only measures how widely the loss propagates into the line. A 0.1-weighted allocation is not 'more justified' than a 1.0-weighted one — it is equally non-consensual."
   Either keep cognition 0.5 (if the disclaimer carries the load) OR drop to 0.45 (your call).

## NARRATIVE
1. (Ethics MAJOR + Writing MAJOR + Detection MAJOR + Risk MAJOR — converged) Rewrite "Burden ≠ heritability" REGULATORY_CARD. Drop "self-perpetuate down the line". Add explicit anti-justification framing. Target ~270-320 chars. Sample target:
   > "The Inheritance Burden Index measures how widely an allocation's effects propagate into descendants — not how heritable a trait is, and not whether the allocation is 'less wrong'. Every heritable choice removes consent equally. Low-weighted classes (like health) shift with environment; high-weighted classes (identity, affect) lock in across generations."
2. (Writing POLISH) Vary "allocation" repetition across REGULATORY_NOTE_RULES — substitute with enhancement/intervention/choice/package on ~3 of the 7+ instances.
3. (Psychology MAJOR + Narrative Design POLISH) Rewrite 2 acceptance-mode FUTURE_PATHS entries to show active inhabiting + ongoing cost (not surrender). Add 2-4 more variants spanning damage/maturation per conflict tag (target 12 total for 4 tags × 3 modes).
4. (Detection POLISH) Replace EN-tension entries that echo melancholic-litfic clichés with lived specificity ("Saves voicemails from people who have died" is the bar).

## EDUCATION
1. (Sociology MAJOR) Add zh/ja/ko/tr translations of the "Burden ≠ heritability" REGULATORY_CARDS entry. Use the rewritten English version (Narrative is rewriting in priority #1). Translations should preserve the anti-justification framing — that's the load-bearing concept.

## UX FLOW
1. (Narrative Design MAJOR) Delay consent panel reveal motion by 200ms after the awareness fade-out completes, so the cascade churn (0.9s of stacked motion) becomes sequential rather than overlapping.
2. (Product MAJOR) Address env-modifiers hidden-dependency: when env-disclosure is closed in Adult mode, surface a compact one-line env summary near the burden bar (e.g., "Environment: [3 short tokens summarizing the env config]"). Visible only when disclosure is closed.
3. (UX POLISH) Track previous `case-file` tier/codename; apply `.is-settling` class only when one actually changes.
4. (Risk POLISH) Add the 1-liner above the burden bar: "All allocations remove the future subject's choice equally; the weight measures how widely the loss propagates, not whether it occurs." Could be a `<p class="burden-disclaimer">` rendered before the bar. Leave `LOOP_REQUEST(narrative)` if you want narrative to refine the copy.

## WORLD DESIGN
1. (Plausibility MAJOR) Replace "Class II" and "Class III" designations in `REGULATORY_NOTE_RULES` (~`script.js:2668, 2674`) with HFEA 2008 Schedule 2 references. Also fix at least 1-2 other invented codes if low-friction (e.g., "intra-cohort variance threshold" could become an HFEA-style monitoring directive). Don't try to clean every code.

## Deferred
- **Sociology POLISH** (ADULT_TRAJECTORY_MILESTONES precarity variants) — Round 5 candidate if there's bandwidth
- **Ethics POLISH** (rename to "Identity Lock-In Index") — defer; rewording the card per Risk MAJOR + Narrative may obviate this
- **Product POLISH** (remove/move Diversify Defaults) — keep deferred; Round 4 priority 2 (env summary) is more urgent
