# Round 10 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Notable cross-reviewer convergences:
- **R10 Kids-arc stagger animation** — Visual Director MAJOR + Narrative Design MAJOR + Product MAJOR + Risk MAJOR all flag the new stagger from different angles (duration mismatch, decelerating rhythm, rushed onboarding, heading-vs-disclaimer co-animation).
- **R10 Narrative replacements** — Detection MAJOR + Writing MAJOR both flag the R10 replacements ("A strength with one person…" / "Variation exists beyond any design template") as still template-patterned.
- **Equipment-ownership KIDS_ADULT_FUTURES** — Sociology MAJOR + Ethics POLISH both re-flag the [4]/[14]/[20] cluster (carryover from R8/R9).

---

## 1. UX REVIEWER

**MAJOR:** The Kids-arc panel `aria-labelledby` attributes reference h2 IDs that exist only after JavaScript renders the content; screen readers traversing on initial page load find unlabeled `<section>`s. **Recommendation:** Either ensure the h2 elements (with IDs) are present in the static `index.html` so screen readers find labels immediately, or move the aria-labelledby attribute assignment into the same render path that injects the headings, so the pair lands atomically. (index.html:559-561, script.js: renderKidsArc panel-construction site)

**POLISH:** The staggered 0.32s fade-in with 6px translateY may feel cramped on small mobile viewports (<640px) where the panels stack vertically and the cascading reveal competes with reading flow. **Recommendation:** Disable or shorten the stagger delays under `@media (max-width: 640px)` so the panels arrive in a single brief fade rather than a sequence. (style.css:5275-5280)

---

## 2. ETHICS REVIEWER

**MAJOR:** The Kids-arc panel animation (0.32s fade-in with 0–0.45s staggered delays) visually subordinates the disclaimer subtitle through small `.subtle` typography and same-tick animation as the heading — the "Maybe" futures dominate impression during reveal, while the "not predictions" disclaimer follows in the same soft fade. **Recommendation:** Either elevate the disclaimer typographically (size/contrast bump, drop `.subtle`) or render the disclaimer *before* the panel heading, so the ethical frame lands first and isn't visually dominated by the hopeful outcome lines. (style.css:5216-5221, script.js:7762-7788)

**POLISH:** KIDS_ADULT_FUTURES entries still normalize material ownership (magnifying glasses, telescope, dictionaries, decade-old fabric scraps) as professional-aspiration markers, excluding kids without accumulated private resources. **Recommendation:** Reframe to skill/practice/creativity rather than possession — e.g., "practices observation," "composes regularly," "experiments with materials." (script.js:4794, 4857, 4885 — the [4]/[14]/[20] cluster carryover)

---

## 3. SCIENCE REVIEWER

**MAJOR:** The sibling-cohort label at `script.js:7871` reads "Five equally-probable outcomes from identical parental inputs and allocation. The variance IS the projection's confidence interval, rendered as people." — this overstates what the model claims, since ~60% non-shared environmental variance is unmeasured by parental inputs alone (and OCEAN heritability sits at 30-40% in the current σ). **Recommendation:** Reframe to "Five plausible outcomes showing the uncertainty range of parental-input-based inheritance estimates — not behavioral probability." (script.js:7871)

**POLISH:** HISTORY_CARDS Polderman 2015 citation reads "meta-analyzed ~17,800 traits" — the paper meta-analyzed studies covering ~17,800 *phenotypes*, not 17,800 distinct traits. Imprecision matters for educators. **Recommendation:** Change to "meta-analyzed ~17,800 phenotypes across twin studies." (script.js:4091)

---

## 4. WRITING REVIEWER

**MAJOR:** R10 Narrative's replacement at `script.js:1859` "Variation exists beyond any design template" uses the em-dash-plus-abstract-noun template — generic philosophy, not grounded observation. **Recommendation:** Replace with concrete claim: "No template accounts for the friends you'll make" or simpler, "Nature did not consult a design handbook." (script.js:1859)

**POLISH:** "Difference is information, not error" in NATURAL_VARIATION_MESSAGES (`script.js:1858`) uses the same X-is-not-Y, X-is-Z formulaic structure R6-R9 removed elsewhere — platitude template. **Recommendation:** Reframe as specific observation — "Individual differences carry meaning, not noise." (script.js:1858)

---

## 5. VISUAL DIRECTOR

**MAJOR:** R10 Frontend's Kids-arc panel animation duration (0.32s) is significantly faster than the established reveal-motion language across the app (memoryCardIn 0.6s, parent-advanced-reveal 0.45s, fadeUp 0.5s), creating visual discord — the panels snap rather than gently land. **Recommendation:** Increase duration to 0.5s to match the fadeUp/parent-advanced-reveal family. (style.css:5276)

**POLISH:** Stagger intervals are uneven (0s → 0.3s, 0.3s → 0.45s — i.e., a 0.3s gap then a 0.15s gap), breaking rhythm vs. memory-cards (uniform 0.15s) and intro-events (uniform 0.1s). **Recommendation:** Use 0s / 0.2s / 0.4s for uniform 0.2s steps matching the gentle cascade intent. (style.css:5279-5280)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** REFLECTION_TRACES entry "Holds two contradictory beliefs about themselves at all times" (`script.js:2697`) romanticizes psychological incoherence without naming the cost — treats contradiction as natural state rather than lived tension. **Recommendation:** Reframe to acknowledge the work: "Holds contradictory beliefs about themselves — a tension they navigate rather than resolve." (script.js:2697)

**POLISH:** The R9-added 24 mild-tag entries (FUTURE_PATHS / KIDS_FUTURE_PATHS / ADULT_TRACES) may not consistently use softer-weight language cues vs. tier-1 entries — risking the mild-tag design intent if some entries read identically to full-strength signals. **Recommendation:** Audit the 24 mild entries for hedging ("may," "sometimes"), cost acknowledgment, or conditional framing; tighten any that read assertive/positive. (script.js — R9 mild-tag insertion ranges)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES entries [4], [14], [20] still encode material-ownership as aspirational markers ("Owns three kinds of magnifying glass," "Photographs every interesting bird," "Owns the friendliest telescope in town"), excluding kids without accumulated resources. R8/R9 carryover, R10 Narrative didn't pick this up. **Recommendation:** Reframe to skill/practice — e.g., "Knows the night sky so well they teach others" replacing "Owns the friendliest telescope." Translate replacements across all 5 langs. (script.js:4794, 4857, 4885)

**POLISH:** KIDS_QUESTIONS_FOR_THEM[16] "What is a question you would ask a cloud?" assumes leisure time and contemplative access to nature — skews toward affluent experience. **Recommendation:** Reframe as accessible curiosity — "What would you ask a cloud to help you with?" or substitute with "What animal would you want to learn more about?" (script.js:4627)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** `.kids-arc-panel` 28px horizontal padding on mobile (375px viewport = 327px usable width) causes content compression in the 2-column layout before the breakpoint kicks in. **Recommendation:** Reduce padding to 18px at `@media (max-width: 640px)` for better content fit on small screens. (style.css:5199)

**POLISH (a11y):** Kids-arc disclaimer paragraphs lack IDs and no `aria-describedby` on their parent sections — relationship between description text and section is unclear to assistive technology. **Recommendation:** Add unique IDs to each disclaimer paragraph (`kids-loves-desc`, etc.) and add `aria-describedby` on each section pointing to its disclaimer. (script.js:7762 — kids-arc panel construction)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** "IOC Aligned Federation framework" appears in the ATH-athleticism regulatory rule at `script.js:4016` as institutional shorthand for a sanctioning body — but is never disclosed as diegetic in R9's classification-shorthand card (which covered the prefixes but not the named frameworks). **Recommendation:** Extend the "On the classification shorthand." entry to name "IOC Aligned Federation" (and any other invented sanctioning frameworks) as diegetic constructs. (script.js:4016, 3891)

**POLISH:** The RES-resilience rule (`script.js:4004`) references insurance-industry concepts ("Insurer notification," "depression-care coverage," "carriers") as if they were real regulatory standards — not disclosed as diegetic. **Recommendation:** Add a parenthetical "(simulated insurer framework)" in the RES- rule text, or extend the disclosure card to flag insurance-context concepts as diegetic. (script.js:3891, 4004)

---

## 10. DETECTION AGENT

**MAJOR:** R10 Narrative's replacement "A strength with one person becomes a liability with another" (`script.js:1798`) uses parallel-clause false-symmetric template — sounds generated, replaces one template with another. **Recommendation:** Replace with concrete example: "Stubbornness saves you under fire; costs you in meetings." Or remove the line and let the surrounding entries stand. (script.js:1798)

**POLISH:** R10 Narrative's replacement "What looks weak in one room becomes essential in another" (`script.js:1799`) uses the same "looks X becomes Y" parallel structure — falls into the same false-symmetric pattern. **Recommendation:** Replace with directional observation rather than mirrored clauses: "A weakness in one room might be exactly what the next room needs." Or remove. (script.js:1799)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Kids-arc panels render with only 450ms total stagger across 3 panels on first Generate — rushed onboarding that undercuts the deliberate consent-rhythm pacing in Adult mode. **Recommendation:** Increase stagger delays (e.g., 0s / 0.6s / 1.0s) so each panel lands distinctly, giving users time to absorb each insight. (style.css:5273-5291, script.js:7747-7805)

**POLISH:** The consent-awareness leadin still sits *before* behavioral projection in HTML source order, even though R7 Product + Narrative Design flagged "Move consent-awareness AFTER projection" as a deferred carryover. **Recommendation:** Move `#consent-awareness-leadin` in the index.html source order to *after* `#baby-stats` — let the projection arrive first, then the ethical framing. (index.html:275-282)

---

## 12. RISK ANALYST

**MAJOR:** Kids-arc panel headings and disclaimer subtitles animate together in a single 0.32s fade-in — the heading appears fully opaque simultaneously with the disclaimer, which may elevate the heading's perceptual authority over the qualifying disclaimer, risking misinterpretation of "Maybe" outcomes as deterministic. **Recommendation:** Stagger the disclaimer subtitle animation to fade in 0.15–0.2s after the heading completes, creating visual hierarchy so the disclaimer reads as the primary framing layer. (style.css:5275-5284, script.js:7748-7805)

**MITIGATION:** Add a dedicated `::after` pseudo-element or separate animation class to `.kids-arc-disclaimer` with a 0.2s delay offset, ensuring the subtitle always appears after the heading is fully visible. (style.css:5275-5284)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The Kids-arc stagger delays (0s / 0.3s / 0.45s) create a decelerating rhythm — the gap between panels 1 and 2 is 0.3s, but between 2 and 3 is only 0.15s. This breaks the wonder-cadence intent (steady gentle reveal). **Recommendation:** Use uniform spacing — 0s / 0.3s / 0.6s — so each panel lands with the same rhythm, matching the affirmation register of the arc. (style.css:5279-5280)

**POLISH:** KIDS_ARC_DISCLAIMERS panels 2 and 3 share the "slider can't" framing ("Questions a slider can't answer…" / "Reminders of what no slider can capture") — repetition undermines the de-stacking R7 Education did. **Recommendation:** Reframe the "differences" disclaimer with affirmative language rather than another negation — e.g., "Reminders of what makes a real kid." (script.js — KIDS_ARC_DISCLAIMERS.differences entry)
