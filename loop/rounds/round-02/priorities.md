# Round 2 — Synthesized Priorities

## Conflicts resolved

- **Risk wants Consent panel later (≥50 credits)**, **Narrative Design wants consent awareness EARLIER (Gen 1)**. Resolution: do both. UX Flow adds a small Gen-1 awareness beat near trait-conflicts; the full Consent Implications panel + heritable-allocation badge gate on allocation threshold (≥50 credits).
- **Ethics wants consent acknowledgment before sliders unlock**, **Product wants sliders visible-but-disabled from start**. Resolution: visible from start (disabled state with "unlocks after first generation" copy); first non-zero allocation requires a one-time acknowledgment click.
- **Writing + Detection both flag the heritable-vs-somatic card length**; **Science flags overstatement re Article 13**. Resolution: Education does ONE rewrite addressing all three.
- **Plausibility flags two cite errors** (UNESCO Art. 5; non-maleficence as principle vs treaty). Resolution: Education + World Design coordinate the fix in CONSENT_EXPLAINER and CONSENT_IMPLICATIONS.

## FRONTEND BUILDER
1. (Visual MAJOR) Add warm-tinted left border on `.consent-panel` echoing the heritable-allocation badge; tighten gap between budget + consent panels.
2. (Visual POLISH) Warmer label color (`var(--accent-warm)`), lift row background, unify intro text size to 13px.
3. (UX POLISH) Consent-row labels: 12px + bottom border + inline-bold on mobile.
4. (Mobile MAJOR) Bump consent panel breakpoint 640px → 768px (or flex `minmax(100px, 18%)` for the label column).
5. (Mobile POLISH) Add `prefers-reduced-motion` block disabling consent-panel transitions/animations.

## SYSTEMS BUILDER
1. (Science MAJOR) The OCEAN-fixed σ already exists; the band visualization doesn't yet read as different. Either tag OCEAN sliders for differentiated rendering (let Frontend dash the band next round) OR add a small `range.uncertaintyClass = 'speculative'` flag on OCEAN range objects so downstream rendering can vary the band style.

## NARRATIVE BUILDER
1. (Writing MAJOR) Rewrite the CONSENT_IMPLICATIONS Reversibility row: "no procedural remedy available to them" → plainer ("has no way to undo or escape it").
2. (Detection MAJOR) Rewrite CONSENT_IMPLICATIONS Heritability row to ground the abstraction. e.g.: "Anyone born from a heritable edit inherits that choice. Their children inherit it too."
3. (Psychology MAJOR) Rewrite 1-2 conflict-tagged FUTURE_PATHS per tag to include a coping/rationalization beat. (E.g. "Plans meticulously to feel less anxious, then resents the plan for being too rigid.")
4. (Psychology POLISH) Tag the existing FUNNY_TITLES paradox entries (lines 618-623) with their matching conflict tags so they pair with conflict-aware future picks.

## EDUCATION BUILDER
1. (Detection + Writing MAJOR/POLISH) Trim the HISTORY_CARDS "Heritable vs. somatic edits" entry to match sibling brevity (~270 chars). Kill the legal-citation tail. Keep the consent-gap human consequence.
2. (Science POLISH) In that same card, fix the overstatement of Article 13: the Convention's clearest restriction targets *purpose*, not the somatic/heritable distinction directly. Revise the sentence.
3. (Plausibility POLISH) Drop "principle of non-maleficence" from CONSENT_EXPLAINER (category mismatch with a treaty cite). Tighten to: "Medical-ethics frameworks and the Council of Europe Oviedo Convention (Article 13)…"

## UX FLOW BUILDER
1. (UX MAJOR) Move KIDS_FUTURES_PREAMBLE injection — currently before h3, place AFTER h3.
2. (Product MAJOR) Show Enhancement Allocation panel from first load (Adult mode) in a disabled, visibly-locked state; gate INTERACTION (sliders/inputs) rather than visibility. Lock copy: "Enhancement packages unlock after your first generation."
3. (Risk MAJOR + Narrative Design MAJOR) Two-beat consent rhythm:
   - Gen 1, near trait-conflicts: small one-line "Every allocation above affects someone who cannot consent to it." (Use existing CONSENT_EXPLAINER's lead sentence or shorter excerpt.)
   - Full Consent Implications panel + heritable-allocation badge: gate behind allocation total ≥50 credits (in addition to existing generateCount ≥ 2). When sliders first cross 0, require a one-time micro-acknowledgment ("I understand this is heritable" tick) before larger allocations can take effect. Persist acknowledgment for the session.

## WORLD DESIGN BUILDER
1. (Sociology POLISH) Add a 4th row to CONSENT_IMPLICATIONS: "Access" — "These modifications arrive unevenly. Wealth predicts access; future populations inherit that imbalance."
2. (Plausibility MAJOR) Fix the UNESCO Art. 5 miscite. Either substitute Article 24 of UNESCO Universal Declaration on the Human Genome and Human Rights, or replace UNESCO entirely with reference to the 2015 UNESCO IBC Report on the Human Genome. Coordinate with Education.
3. (Ethics POLISH) Rename "Social Pressure Index" → "Modification Reversibility Tier" (or similar autonomy-forward label) tied to heritability class, not cosmetic spend alone.
4. (Narrative Design POLISH) Front-load CONSENT_EXPLAINER with the person, not the institution: open with the future child, then bring in the framework.

## Deferred (not landed Round 2 revision)

- **Sociology MAJOR** (phenotype-baseline defaults randomization): defer again — needs the same design review the Round 1 deferral identified.
- **Product POLISH** (move Environmental Influences post-Generate): defer — too invasive for one round; Round 3 can revisit if Round 2 polish lands cleanly.
- **Ethics MAJOR escalation** (full slider-gate before any allocation): the micro-acknowledgment under UX Flow #3 lands the lighter version; the full pre-allocation gate stays a candidate for Round 3 if reviewers still flag it.
