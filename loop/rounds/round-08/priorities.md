# Round 8 — Priorities (synthesized from 26 critiques)

Top cross-reviewer convergences:
- **Leadin cross-fade timing** (Ethics MAJOR + Narrative Design MAJOR): fade fires AT first slider input, collapsing 3 beats. **Decision: address — extend fade duration OR gate fade to consentAck instead of first slider.**
- **Class-coded Kids futures** (Sociology MAJOR + Science MAJOR + Psychology MAJOR converge on KIDS_FUTURE_PATHS / KIDS_ADULT_FUTURES from different angles): pick the highest-leverage line and fix.
- **Diegetic shorthand disclosure** (Plausibility MAJOR + POLISH): extend R7's "On the regulatory citations" card to cover Tier I-IV + CMP-N codes.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — VISUAL DIRECTOR MAJOR (R8 regression):**
Fix the Firefox-only thumb misalignment. R8's `::-webkit-slider-thumb` got `margin-top: -19px` for centering on the track; the `::-moz-range-thumb` rule at `style.css:546-555` was missed. Firefox renders the thumb shifted up/down from the track. Add the same margin (or moz-appropriate equivalent — moz uses a different positioning model so verify before pasting). **(style.css:546-555)**

**Secondary — MOBILE MAJOR:**
`.intro-stat-source summary` <44px touch target. Add `min-height: 44px; min-width: 44px; padding: …` rule. **(style.css needs new rule; index.html:97-124 unchanged)**

**Tertiary (small a11y / UX gaps) — pick ONE if budget remains:**
- UX MAJOR: language selector label hidden but flex gap remains (style.css:244)
- UX POLISH: aria-labelledby targets non-existent ID (index.html:229) — fix by adding `id="lang-label"`
- MOBILE POLISH (a11y): aria-label on `#consent-awareness-leadin` + aria-labelledby on Kids-arc panels (index.html:282, 559-561)

**Deferred:**
- Visual Director POLISH (footer link --ink-soft → --ink): R8 just upgraded this from --ink-mute; another bump would be whiplash. Hold.

---

## SYSTEMS (script.js math, structural data)

**Primary — NARRATIVE DESIGN POLISH (Kids mode coherence):**
Decide whether to extend the conflict-tag filter to KIDS_FUTURE_PATHS (so Kids archetype + futures both avoid conflict tags) OR lift the vibe-pool filter at `script.js:6856` (so Kids archetype can name what futures already embrace). The latter is more honest to the variance-as-gift theme; the former is more thematically clean.

**Recommendation: lift the vibe-pool filter.** Kids mode's variance-as-gift framing means contradictions are an asset, not something to hide from the archetype. Removing the filter means a Kids-mode child whose futures show OC-tension can also have a vibe that names that tension. <80 lines, mostly subtraction.

**Deferred:**
- Graduated OC-mild conflict thresholds (Science POLISH, R6 deferred → still open)
- Binary threshold acknowledgment comment (Science POLISH) — small, but defer in favor of Primary

---

## NARRATIVE (script.js flavor pools)

**Primary — PSYCHOLOGY MAJOR (family peacemaker virtue framing):**
Reframe "Could be the family peacemaker" (tagged AN-pleaser) across all 5 languages at `script.js:3839, 3873, 3909, 3941`. The AN-pleaser tag exists to name a developmental cost; the caption currently reads as a virtue, undermining the tag's psychological function. Replace with: "May become the one who smooths family tensions — learning early that keeping the peace is their job." (or similar). Translate to zh/ja/ko/tr.

**Secondary — RISK MAJOR (KIDS_ARC_DISCLAIMERS translations):**
R8 Education lifted the 3 disclaimers into KIDS_ARC_DISCLAIMERS dict shape with `LOOP_REQUEST(narrative)` for zh/ja/ko/tr. Translate the 3 entries (loves / questions / differences) into all 4 non-EN languages matching the warm Kids register. Remove the LOOP_REQUEST. **(script.js:4492-4502)**

**Tertiary — DETECTION MAJOR (false-symmetric antithesis):**
Replace HUMANITY_REMINDERS entry "Diversity isn't a glitch — it's the feature" (script.js:1786) with grounded statement. Note: this is in HUMANITY_REMINDERS dict, so the EN line + zh/ja/ko/tr parallels all need updating.

**Quaternary — SOCIOLOGY MAJOR + Science MAJOR + smaller items:**
- "Tinkers in a sunny corner" → "Salvages broken things" or "Solves problems between two jobs" (script.js:4425)
- "Could become really good at storytelling" / "great teacher" → present-state language (script.js:3822, 3848)
- KIDS_QUESTIONS_FOR_THEM[2] "any pet" → "What animal would you want to learn more about?" (script.js:4264)
- DETECTION POLISH "Nature did not consult the optimization handbook" → cut or replace (script.js:1848)
- WRITING POLISH "feels things deeply — that's a strength" → drop negation-affirmed pattern (script.js:3843)

**Strict <80-line diff. Translation policy: translate any new/changed EN string to zh/ja/ko/tr if budget allows; otherwise LOOP_REQUEST.**

Pick Primary + Secondary (these are the highest-leverage). Address Tertiary/Quaternary only if budget remains.

---

## EDUCATION (HISTORY_CARDS, kids explainers)

**Primary — small subtraction or coherence pass.** No fresh MAJOR squarely on Education's surface this round (most fresh issues are Narrative or World Design).

Possible items:
- HISTORY_CARDS coherence: re-read every entry given how much Kids/Adult context has shifted across R6-R8. Is any card now redundant with a new disclaimer / regulatory disclosure?
- Re-examine the R7 OCEAN naming aside added to KIDS_OCEAN_TOOLTIP — is it landing? Does it create a coherence issue with the existing Kids-mode trait names?
- A minor citation tightening anywhere in HISTORY_CARDS.

Pick ONE small subtraction or coherence tweak. <40 lines. Pure subtraction preferred.

**If nothing meaningful surfaces, return NO CHANGE.**

---

## UX FLOW (rendering, gating)

**Primary — ETHICS MAJOR + NARRATIVE DESIGN MAJOR (converged):**
Fix the leadin cross-fade timing. Currently the fade fires *at* first slider input, collapsing 3 narrative beats into one rushed moment AND removing the ethical context exactly when allocation is happening.

**Two approaches — pick one:**
- (A) Extend the fade duration to ~2 seconds so the line lingers visibly through the first 1-2 slider movements before settling.
- (B) Gate the fade trigger to `state.consentAck` flipping true (the existing micro-ack button click), not first slider input. The leadin stays put through any number of pre-ack slider explorations and only fades when the user explicitly acknowledges.

**Recommendation: (B).** It honors the consent-rhythm architecture from Batch 1 and fixes the "fade-at-allocation" timing issue cleanly. (A) is a band-aid; (B) is structural.

Strict <80-line diff. `node --check script.js` MANDATORY.

**Deferred:**
- Product MAJOR (Kids-mode onboarding panel) — adds new mechanic, out of polish scope.

---

## WORLD DESIGN (Adult institutional copy)

**Primary — PLAUSIBILITY MAJOR + POLISH (combined):**
Extend R7's "On the regulatory citations." REGULATORY_CARDS entry to also disclose:
- Tier I-IV (Baseline / Moderate optimization / Elevated optimization / Boundary case) as simulation framework designations, not real regulatory classes
- CMP-N codes (CMP-2 cognition, CMP-4 affective) as diegetic classification markers

Single disclosure card update — pure addition. <40 lines.

**Secondary — WRITING MAJOR (consent-awareness leadin copy warmth):**
Replace "Ethically: the person this concerns is not in the room — and will inherit whichever balance you settle on" with warmer phrasing that names the child as a real person: "Ethically: the child this affects isn't here yet — and they'll live with the choices you make." `script.js:4807`. EN-only line — no i18n yet (per R7 World Design rev). Verify this still applies after R8 UX Flow / R8 stash-related changes.

**Tertiary — PRODUCT POLISH (Burden Index idle baseline):**
Detect idle budget state (`budget === 0`) and either display "No allocations made yet" instead of the "Minimal · few traits are pre-decided" baseline, OR hide the Index entirely until first allocation. **(script.js:8175-8186)**

Strict <80-line diff. Pick Primary + Secondary (both fit comfortably). Tertiary if budget remains.

---

## Cross-cutting deferrals (tracked for R9+)

- **Move consent-awareness AFTER projection** (Product + Narrative Design MAJOR from R7) — still held pending empirical feedback.
- **Graduated OC-mild conflict thresholds** (Science POLISH R8 / Psychology MAJOR R6) — multi-coordination work.
- **Life-shape milestone tagging refactor** — multi-round.
- **Kids-mode onboarding panel** (Product MAJOR R8) — adds new mechanic.
- **ADULT_TRAJECTORY_MILESTONES linear-language refactor** (Psychology POLISH R8) — restructure beyond polish scope.
- **Pre-R5 style.css 180-line WIP** — still re-stashed. User's call.
- **Cross-locale i18n fallback policy** (Ethics POLISH R8) — UX-architecture decision.
