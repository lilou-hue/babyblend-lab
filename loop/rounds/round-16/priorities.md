# Round 16 — Priorities (synthesized from 26 critiques)

Three convergences. Decisions:

1. **REFLECTION_ARC_CLOSING_AFFIRMATION rewrite** (6 reviewers) — Narrative rev addresses. New EN should be concrete + acknowledge constraint + drop "many/one" template.
2. **"Identity Lock-In Index" rename**: 4 reviewers want a different name (Ethics + Science + Product + Sociology — "Consent Propagation Index" or similar). **DECISION: hold the name** — R16 just shipped the rename; whiplash isn't worth it. Address the issues via: residual "burden tier" cleanup (Plausibility MAJOR), one-line tooltip/clarifier in the disclosure card. If reviewers reassert in R17, revisit.
3. **LIFE_SHAPES taxonomy** (3-4 reviewers) — add caretaking shape, add disclaimer comment about simulational vs empirical, address precarity-essentialism concern via docstring framing.

Strict <80-line diffs per builder.

---

## FRONTEND

**Primary — VISUAL DIRECTOR MAJOR:**
Change `.reflection-arc-closing` `line-height: 1.55` → `1.5` to match `.kids-arc-closing` rhythm. (style.css:5295)

**Secondary — VISUAL DIRECTOR POLISH:**
Remove redundant `font-family: var(--reflection-serif, inherit)` on `.reflection-arc-closing` (inherits from `body.mode-reflection .pause-panel`). (style.css:5299)

**Tertiary — MOBILE MAJOR:**
Add `@media (max-width: 768px)` reducing `.reflection-arc-closing` font-size to ~13px + margin-top to 12px. (style.css:5292)

**Quaternary — MOBILE POLISH (a11y):**
`.pause-cant-see li` 44px touch target via inline-flex + min-height in the mobile breakpoint. (style.css:1836)

Strict <60 lines. CSS only.

---

## SYSTEMS

**Primary — PSYCHOLOGY MAJOR (add caretaking life shape):**
Add `caretaking: { id: 'caretaking', label: 'identity-reorganized-via-care-obligation' }` to LIFE_SHAPES constant — closes the gap with the existing ADULT_TRAJECTORY copy describing caretaking-driven identity reorganization (line 4425). (script.js:4319-4324)

**Secondary — SCIENCE POLISH + ETHICS POLISH + SOCIOLOGY POLISH (docstring framing):**
Add a comment block above LIFE_SHAPES stating: "LIFE_SHAPES is a narrative taxonomy not grounded in developmental psychology literature. These categories are simulational metaphors for trajectory patterns — not empirical life-stage theory, not normative/deviant poles. 'Precarity' here describes a trajectory shape often produced by structural conditions, not an essential personality outcome." ~5-7 lines.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — 6-reviewer convergence on REFLECTION_ARC_CLOSING_AFFIRMATION (rewrite):**

Current EN at `script.js:6439`: "The version this generated is one of many. The one that arrives will be theirs."

Issues:
- AI-template: "The version this generated" + "many/one" parallel-symmetric structure (Writing MAJOR + Detection MAJOR)
- Too tidy: claims total self-determination, contradicts milestones describing constraint (Psychology POLISH + Narrative Design POLISH)
- Lacks agency: abstract padding vs Kids closing's actionable warmth (Product MAJOR)
- Screenshot-quotable: out-of-context misread risk (Risk MAJOR)

**Suggested replacement** (refine if you find better):
> "What emerges will be partly theirs, partly circumstance, entirely real."

This acknowledges constraint ("partly circumstance"), affirms agency ("partly theirs"), grounds in reality ("entirely real"), and breaks the false-binary template.

Translate to zh/ja/ko/tr matching Reflection register. ~10-12 lines (5 langs × 1 string ≈ 12 lines for the full dict update).

**Strongly prefer this as the only Narrative change.** Strict <30 lines if Primary alone, max <80 if you take secondary items.

**Secondary (only if Primary fits in <15 lines) — DETECTION POLISH:**
Replace REFLECTION_OBSERVATIONS line "Optimization assumes a destination. There isn't one." at `script.js:2121` — Reddit-core negation template. Suggested: "Optimization assumes there's an endpoint. This child's life has none." 5 langs.

`node --check script.js` MANDATORY.

---

## EDUCATION

**Likely NO CHANGE.** No direct critiques on Education surface. If you find one small addition supporting the architectural items, ship it; otherwise NO CHANGE.

Max <30 lines if you edit.

---

## UX FLOW

**Primary — NARRATIVE DESIGN MAJOR (Adult-mode closing parity):**

R14's Pause Panel in Adult mode renders inside a `<details>` collapsible ("Limitations & Ethics"). R16 UX Flow added the REFLECTION_ARC_CLOSING_AFFIRMATION slot in both Reflection and Adult render paths — but in Adult mode the closing is BURIED inside the collapsed `<details>`, defeating its purpose.

**Decision: remove the closing affirmation from Adult mode entirely.** Adult mode's narrative landing should be the existing Burden / Lock-In Index, not a poetic closing — the poetic register doesn't fit Adult mode's institutional voice anyway. Closing stays in Reflection mode only.

Approach: gate the closing slot's render to `isReflection()` only — drop the Adult-mode render path. ~5-10 lines (a conditional removal).

**Alternative:** Reposition the Adult closing OUTSIDE the `<details>` (after it closes) so it lands as a non-buried beat. ~10-15 lines.

**Recommendation: drop it from Adult mode.** Mode-arc parity isn't a goal in itself — register fit matters more.

**Secondary — Risk MAJOR + MITIGATION (screenshot-quote risk):**
If the closing stays in Adult mode, add a CSS class hook (`data-reflection-prompt="true"` or similar) marking it as reflection-prompt-not-conclusion so it can be visually styled differently from a `doc-conclusion`. If you drop from Adult mode entirely, this fix is moot.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

**Primary — PLAUSIBILITY MAJOR (residual "burden tier" cleanup):**

`script.js:10506` says "at this burden tier" — terminology mismatch post-rename. Replace with "lock-in tier" (or "pressure tier"). ~1 line × 5 langs if i18n'd.

**Secondary — PLAUSIBILITY POLISH:**
Update internal comment at `script.js:10462` from "Inheritance burden" → "Identity Lock-In pressure calculation." 1 line.

**Tertiary — clarifier on "Lock-In ≠ heritability" card:**
Multi-reviewer concern (Ethics + Science + Sociology + Product) about "lock-in" framing. **Don't rename.** But the "Lock-in ≠ heritability" REGULATORY_CARDS entry could pick up an additional sentence clarifying: "The Index measures how widely a heritable allocation's effects propagate across descendants — not how rigidly any individual trait is fixed." 5 langs. ~5 lines per lang × 5 = 25 lines.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## Cross-cutting deferrals (R17+)

- **"Identity Lock-In Index" name** — 4-reviewer concern. Held pending R17 reassertion. If reviewers flag again, consider rename to "Heritability Propagation Index" or "Consent Propagation Index" (multi-language, multi-surface).
- **REFLECTION_OBSERVATIONS Detection POLISH** — line 2121 still template if Narrative doesn't pick up Secondary.
- **LIFE_SHAPES population (R17)** — Narrative still needs to populate `life_shape` on ADULT_TRAJECTORY_MILESTONES entries; Systems should then wire selection.
- **R12/R14 mid-pick stashes** preserved.
