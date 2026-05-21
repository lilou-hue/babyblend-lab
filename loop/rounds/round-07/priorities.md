# Round 7 — Priorities (synthesized from 26 critiques)

**Notable cross-reviewer convergence:**
- **Consent-awareness placement (4 reviewers).** UX wants the visibility timing fixed; Visual Director wants CSS styling so it has presence; Risk wants an "Ethically:" prefix; **Product + Narrative Design want it moved AFTER the projection** (reversing what R7 UX Flow just did). This is whiplash if applied. Decision: keep the R7 placement (before Enhancement Allocation), add the CSS presence + the "Ethically:" prefix; explicitly defer the move-after-projection request. The 4 reviewers don't agree on direction — splitting the difference would erase R7's work without empirical evidence either way.
- **"Kindness is a habit, not just a trait" (2 reviewers).** Writing MAJOR + Detection MAJOR converged on `script.js:3453`. Strong signal — fix.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — VISUAL DIRECTOR MAJOR:**
Add `#consent-awareness-leadin` CSS rule. Currently the inner italic note (12px) is visually dominated by the backdrop-blurred budget panel. Give the leadin presence: subtle background, padding, rounded border, matching the `.consent-ack-prompt` aesthetic so the message reads as the ethical bridge it's supposed to be. **(style.css — missing rule near 3407)**

**Secondary (if Primary fits in <40 lines) — VISUAL DIRECTOR POLISH:**
Add `.history-chevron` to the existing prefers-reduced-motion guard block (`.history-content` is already in it). **(style.css:2993)**

**Deferred:**
- MOBILE MAJOR (range slider thumb 18→44px): real a11y win but would be a noticeable visual change to a long-stable component. Defer to R8 unless reviewer reasserts it as the most urgent thing.
- MOBILE POLISH (footer link contrast): defer, paired with the mobile MAJOR.

---

## SYSTEMS (script.js math, constants)

**Primary — PSYCHOLOGY MAJOR:**
Tag KIDS_FUTURE_PATHS entries with the same `tag` field used in FUTURE_PATHS, so conflict-aware future selection works symmetrically across modes. Currently Kids mode shows only conflict-free futures, which is an architectural gap. If a tag doesn't have any matching Kids-mode futures, leave them untagged. **NEW tags require LOOP_REQUEST(narrative)** for matching paths in subsequent rounds. **Strict <80 lines.**

Alternative if Primary is too big: pick one drift-hunt opportunity (a magic number, a duplicated literal). Pure subtraction preferred.

**Deferred:**
- Graduated OC-mild conflict thresholds (R6 deferred, still open).

---

## NARRATIVE (script.js flavor pools)

**Primary — WRITING MAJOR + DETECTION MAJOR (converged on the same line):**
Replace `script.js:3453` "Kindness can be taught and grow over time — it's a habit, not just a trait" with a concrete, non-template version. Detection's suggestion: "Kindness shows up differently depending on the situation and person — some kids are kind in big groups, others one-on-one." Or simpler. Translate into zh/ja/ko/tr if the string is i18n'd; otherwise leave a LOOP_REQUEST.

**Secondary — SCIENCE MAJOR:**
Revise KIDS_RANDOM_EVENTS deterministic language to conditional/probabilistic at `script.js:3642, 3646, 3654, 3679`. "It is destiny" → "A strong possibility"; "forever" → "for a long time"; etc. Pick 2-3 of the worst offenders, not all 4.

**Tertiary — SOCIOLOGY MAJOR + POLISH:**
- Replace one KIDS_QUESTIONS_FOR_THEM entry that assumes private room / art materials / privacy with a question that works for kids in shared/crowded spaces. **(script.js:3813-3830)** Just one.
- Reframe KIDS_REFLECTION_PROMPTS line 3941 "If you could give every kid in the world one thing" → "What do you think every kid needs?" **(script.js:3941)**

**Quaternary — DETECTION POLISH + WRITING POLISH + PSYCHOLOGY POLISH:**
Inclusivity-speak ("Lots of beautiful colors are possible", "Every shade is healthy and beautiful") → factual observation at `script.js:3445, 3448`. "That's what makes it exciting" at `script.js:3461`. Precarious-futures agentic language at `script.js:3931-3933`.

Pick the highest-leverage subset. Primary + Secondary should fit comfortably under 80 lines. Tertiary + Quaternary only if budget remains.

**Translation policy:** Translate any new EN strings to zh/ja/ko/tr IF total diff stays under 80 lines. Otherwise LOOP_REQUEST.

---

## EDUCATION (HISTORY_CARDS, kids explainers, tooltips)

**Primary — SCIENCE POLISH:**
Add "(in predominantly European-ancestry populations)" qualifier to the Yengo 2022 height citation at `script.js:3420`. One phrase — population-specificity is real and matters for the educational accuracy of the card.

**Secondary — ETHICS POLISH:**
Add a Kids-mode contextual explainer (one tooltip or inline note) revealing that the friendly trait names (curiosity, kindness, energy, focus, confidence) map to the OCEAN dimensions used in research. Don't preach — frame as "the words researchers use are different." **(script.js:3434-3438)**

**Deferred:**
- Plausibility issues (IVD-Germ Lines Directive fictional framing, CMP code glossary) — route to World Design.

---

## UX FLOW (onboarding, transitions, rendering)

**Primary — UX MAJOR:**
Fix the consent-awareness leadin visibility timing. Currently the `renderBaby` path may unhide the leadin AFTER Enhancement Allocation already rendered. Wire visibility into the budget-panel render path (or use an explicit show/hide sequence tied to `applyBudgetPanelGate`). **(script.js:4273-4285)**

**Deferred (cross-reviewer conflict):**
- Product MAJOR (move consent-awareness AFTER projection) — directly reverses R7's R6-Product-MAJOR fix. No empirical evidence in either direction. Hold position.
- Narrative Design MAJOR — same deferral.
- Ethics MAJOR (parental authority vs. child's future consent rights) — copy-level fix, route to World Design (the line is in their copy domain). Skip from UX Flow.

---

## WORLD DESIGN (Adult institutional copy)

**Primary — PLAUSIBILITY MAJOR:**
Mark the EU IVD-Germ Lines Directive as speculative throughout. Either add "(draft proposal)" or "(hypothetical)" qualifiers wherever it appears, OR add one REGULATORY_CARDS entry that clearly states the IVD-Germline Directive is a near-future projection, not an enacted instrument. **(script.js:6740-6745 and wherever else it appears)**

**Secondary — RISK MAJOR (prefix anchor):**
Prefix the consent-awareness one-liner with "Ethically: " (or "From the subject's standpoint: ") so screenshot-out-of-context readings can't invert the intent. **(script.js:4281)** Coordinate with Narrative: if the line is i18n'd in a flavor pool, route through; otherwise this is a single-string change.

**Tertiary — PLAUSIBILITY POLISH:**
Add a one-line comment above the CMP-using REGULATORY_NOTE_RULES (`script.js:3326`) explaining that CMP codes are diegetic classification markers, not real biotech regulatory shorthand. Inline JS comment, not user-visible copy.

---

## Cross-cutting deferrals (tracked for R8+)

- Move consent-awareness AFTER projection (Product + Narrative Design MAJOR) — reverses R7, requires user empirical feedback before deciding.
- Range slider thumb 18→44 (Mobile MAJOR) — a11y win but visual cost; pair with footer link contrast next round.
- Impact Preview at gen ≥ 1 (Product POLISH) — adds new mechanic, out of polish scope.
- Graduated OC-mild conflict thresholds (Psychology MAJOR, R6 deferred) — still open.
- Life-shape milestone tagging refactor — still multi-round.
- Consolidate 3 Kids-arc disclaimers (UX POLISH + Narrative Design POLISH) — R7 already de-stacked the prefix repetition; reviewers split on whether to consolidate further. Hold position.
