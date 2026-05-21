# Round 9 — Reviewer Critiques (26 issues)

All 13 reviewers returned. Notable cross-reviewer convergences:
- **Mild conflict tags silent** — Ethics MAJOR + Risk MAJOR + Narrative Design POLISH all flag the R9 Systems-added `*-mild` tags as detected but narratively silent (no FUTURE_PATHS content yet; R9 LOOP_REQUEST(narrative) is the open carryover).
- **"Salvages broken things"** — Ethics POLISH + Risk MITIGATION both flag the R9 Narrative replacement as romanticizing precarity / framing economic constraint as personality trait.
- **Wisdom-advice virtue framing** — Psychology MAJOR identifies "Might give surprisingly wise advice for their age" (AN-pleaser) as the same problem R8 fixed for "family peacemaker."

---

## 1. UX REVIEWER

**MAJOR:** The 3 Kids-arc panels now carry `aria-label` attributes that duplicate their visible h2 headings, creating redundant screen-reader announcements rather than using the cleaner `aria-labelledby` pattern. **Recommendation:** Drop the `aria-label` attributes and add `aria-labelledby` pointing to script-generated `id`s on each panel's heading (script.js renders the h2s and would need to inject the IDs). (index.html:559-561)

**POLISH:** `#consent-awareness-leadin` wrapper clears `innerHTML` on retirement but remains in the DOM, leaving an invisible 0-height container that costs nothing now but will surface as drift if the wrapper grows margin or padding later. **Recommendation:** Replace `leadin.innerHTML = ''` with `leadin.remove()` (or set `leadin.hidden = true; leadin.innerHTML = ''` together) in the retire callback. (script.js:4981, ~8198)

---

## 2. ETHICS REVIEWER

**MAJOR:** R9 Systems added 4 graduated mild-conflict tags (OC-mild / EN-mild / CO-mild / AN-mild) at `script.js:6985-7005` with no corresponding FUTURE_PATHS / KIDS_FUTURE_PATHS / ADULT_TRACES content; the picker reserves space for conflict-tagged futures (lines 7066-7072) but the mild bands silently fall back to default. **Recommendation:** Populate per-pool content tagged with the 4 mild variants (4-8 entries each across 5 languages where applicable) so detected mild trait tensions surface in narrative — close the R9 LOOP_REQUEST(narrative). (script.js:6985-7005, 7025-7031, 7066-7072)

**POLISH:** R9 Narrative's "Salvages broken things and gives them another life" at KIDS_ADULT_FUTURES[4] reframes economic necessity as aspirational personality trait, normalizing resource scarcity as character rather than acknowledging systemic inequality. **Recommendation:** Reframe to separate trait from condition — e.g., "Builds tools that solve problems for people around them" or "Loves solving puzzles and finding elegant reuse patterns." (script.js:4581)

---

## 3. SCIENCE REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES entries (script.js:4572-4599) contain English-only `headline`/`detail` strings while `ADULT_FUTURES` carries full i18n `{zh, ja, ko, tr}` translations; `renderFutures()` at ~`script.js:6848` accesses `tr.headline` which is undefined for all Kids-adult-futures entries, causing localized users to silently fall back to EN. **Recommendation:** Add `i18n: { zh, ja, ko, tr }` blocks to KIDS_ADULT_FUTURES entries (parallel to ADULT_FUTURES structure), or add an explicit `localList`-style fallback path in `renderFutures` if EN-only is intentional for this pool. (script.js:4572-4599, 6848)

**POLISH:** KIDS_ADULT_FUTURES entries carry `tags` arrays referenced in `generateAdultFutures()` at lines 6817-6836 (`bonus += (v - 5) * 0.18` where `v` comes from environment keyed by tag); if any KIDS_ADULT_FUTURES tag doesn't match an ENV_FIELDS key (family/education/economy/healthcare/social/internet/multilingual/urbanRural), the indexing produces undefined values that may poison scoring with NaN. **Recommendation:** Add a runtime validation pass (or a code comment + manual audit) confirming every KIDS_ADULT_FUTURES tag is a valid ENV_FIELDS key. (script.js:6817-6836)

---

## 4. WRITING REVIEWER

**MAJOR:** The R9 replacement of "Diversity isn't a glitch — it's the feature" with "Variation is where unexpected combinations come from" (script.js:1786) is passive and philosophically vague — "come from" doesn't ground the observation in anything concrete. **Recommendation:** Reframe to active/specific — "Different traits create unexpected advantages." Or drop the abstraction for something concrete and observed. (script.js:1786)

**POLISH:** "Strengths and weaknesses are the same thing in different rooms" (script.js:1788) is a residual false-symmetric construction ("are the same thing") that mirrors exactly the problem R9 set out to fix. **Recommendation:** Rewrite as directional observation — "What looks weak in one room becomes essential in another." (script.js:1788)

---

## 5. VISUAL DIRECTOR

**MAJOR:** `#consent-awareness-leadin` wrapper carries 12px vertical margin (style.css:3415); during the note's 0.45s fade-out the wrapper still occupies that margin slot, creating a momentary collapsed-but-visible layout gap before the wrapper is fully retired. **Recommendation:** Set `margin: 0` on the leadin wrapper (let the inner note own its margin via the chrome rule); the wrapper's disappearance feels seamless. (style.css:3415)

**POLISH:** The 2 split REGULATORY_CARDS regulatory-citation entries (R9 World Design) now sit adjacent without explicit visual breathing room — they cluster too tightly. **Recommendation:** Add a small `margin-bottom: 12px` (or equivalent gap) in the REGULATORY_CARDS rendering logic between adjacent entries to restore rhythm parity. (script.js — REGULATORY_CARDS rendering site)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** "Might give surprisingly wise advice for their age" (AN-pleaser tag, ~`script.js:3996`) frames developmental cost as virtue — same pattern R8 fixed for "family peacemaker." Premature emotional-maturity is a parentification marker, not a personality strength. **Recommendation:** Reframe to name the cost — e.g., "May have to be the emotional adult in the room earlier than they should." Translate to zh/ja/ko/tr. (script.js:3996)

**POLISH:** REFLECTION_TRACES entry "Holds two contradictory beliefs about themselves at all times" (script.js:2556) romanticizes identity incoherence without acknowledging psychological cost (fragmentation, paralysis). **Recommendation:** Either reframe with cost named ("Holds contradictory beliefs about themselves, sometimes painfully so") or replace with a trace that celebrates actual integration / resilience. (script.js:2556)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** KIDS_ADULT_FUTURES entries [4], [14], [20] assume expensive equipment ownership ("owns three kinds of magnifying glass," "photographs every interesting bird," "owns the friendliest telescope") that privileges wealthy kids — conflicts with the resource-aware framing being introduced elsewhere. **Recommendation:** Reframe equipment-dependent futures to emphasize skill/knowledge over ownership — e.g., "Knows the night sky so well they teach others" instead of "owns the friendliest telescope." (script.js:4577, 4587, 4593)

**POLISH:** KIDS_QUESTIONS_FOR_THEM[16] "What is a question you would ask a cloud?" assumes leisured, unstructured imagination time — unavailable to kids with caregiving or work responsibilities. **Recommendation:** Shift to "What animal or natural thing would you want to understand better?" — observable curiosity, accessible across contexts. (script.js:4434)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** Divergence-reroll and divergence-dismiss buttons sized 24×24px in style.css — below the 44×44px minimum touch target. **Recommendation:** Bump to ≥44×44px or expand hit area via padding/pseudo-element. (style.css:4106-4126)

**POLISH (a11y):** `#consent-awareness-leadin` carries a static `aria-label="Consent awareness notice"` while its inner content is the specific ethical statement; screen readers announce "Consent awareness notice" without reading the substantive copy unless explicitly traversed. **Recommendation:** Either drop the static `aria-label` (the inner copy will be read as part of the live region) or switch to `aria-labelledby` pointing at the note text id once it's inserted. (index.html:282, script.js:4974)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** RA-channel codes (RA-1 through RA-5) appear throughout user-visible Regional Access text and case-file metadata ("channel code RA-2," etc.) but are not disclosed in either REGULATORY_CARDS entry — R9 split into 2 cards but RA-N codes weren't covered. **Recommendation:** Add RA-N codes to the "On the classification shorthand" card as diegetic access-routing markers alongside Tier I-IV and CMP-N. (script.js:7305-7307, 7318, 8162)

**POLISH:** Rule-set identifier prefixes (GE-, EM-, RES-, APP-, ATH-) appear in user-visible regulatory warning text (~lines 3698-3716) without disclosure that these are simulation-internal rule markers, creating the impression of real regulatory notation. **Recommendation:** Add a closing line to "On the classification shorthand" card noting these prefixes are similarly diegetic rule identifiers used internally. (script.js:3698, 3704, 3710, 3716)

---

## 10. DETECTION AGENT

**MAJOR:** "A trait's value depends on who, when, and where." (script.js:1787) is a false-symmetric parallel triplet pattern — reads as generic philosophy without grounded specificity. **Recommendation:** Replace with concrete observation — "A strength with one person becomes a liability with another." Or remove. (script.js:1787)

**POLISH:** "Nature did not consult the optimization handbook." (script.js:1848) is fake-deep personification using abstract-noun synthesis — already flagged in R8, not yet addressed. **Recommendation:** Replace with observable statement — "Variation exists beyond any design template" — or remove the entry. (script.js:1848)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Adult mode at gen 1 displays full behavioral projection (personality stats, archetype, traces) but gates all analytical/systemic-context panels (Societal Outcomes, Sibling Cohort, Trait History) to gen ≥ 2 — the user is making first-decisions with no downstream-impact visibility. **Recommendation:** Unlock the Societal Outcomes Brief (smallest analytical panel) at gen ≥ 1 so cascade-effects are visible during initial allocation. (script.js:7227)

**POLISH:** Kids mode at gen 1 shows the affirming arc panels (Loves / Questions / Differences) immediately — "this child as a person" framing. Adult mode at gen 1 shows stats first — "this child as optimizable traits" framing. The priority inversion shapes how each mode reads ethically. **Recommendation:** Render at least one consequence-context strip alongside Adult-mode stats at gen 1 to soften the optimizable-traits-first frame. (script.js:7227)

---

## 12. RISK ANALYST

**MAJOR:** TRAIT_CONFLICT_RULES defines mild thresholds (OC-mild / EN-mild / CO-mild / AN-mild) at ~`script.js:6985-7006` but with zero corresponding content in FUTURE_PATHS / ADULT_TRACES, causing silent fallback for middle-band babies — system detects meaningful states but offers no special framing, reading as incomplete implementation or implicit dismissal of moderate complexity. **Recommendation:** Add tagged content entries to FUTURE_PATHS and ADULT_TRACES for all four mild tags (mirrors the LOOP_REQUEST(narrative) R9 Systems already filed). (script.js:6985-7006, 7025-7031, 7066-7079)

**MITIGATION:** Replace the "Salvages broken things and gives them another life" detail in the inventor pathway at `script.js:4581` with "Builds tools that solve problems for people around them" — removes the romanticization-of-precarity framing in a eugenics-adjacent simulator. (script.js:4581)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The 3 Kids-arc panels (Loves / Questions / Differences) lack reveal animations despite their emotional significance as the gentle counterpoint to conflict-heavy narrative — they appear instantly alongside memory-cards and consent flows that use staggered motion, breaking pacing rhythm and diminishing thesis impact. **Recommendation:** Apply staggered fade-in (0.15s/0.3s/0.45s) to `.kids-arc-panel` elements via a stage attribute, mirroring memory-cards reveal cadence at style.css:2149-2151. (style.css:5170-5256 / script.js:7351-7397)

**POLISH:** The new R9 graduated conflict tier system (tier-1 vs. tier-2 mild variants) distinguishes intensity through numeric ranges in TRAIT_CONFLICT_RULES, but the narrative manifestation isn't documented — unclear whether mild conflicts receive softer pool/language or just frequency reduction. **Recommendation:** Audit narrative pools to confirm tier-2 mild variants map to visibly gentler language than tier-1 equivalents — or add explicit pool-tone-modulation logic in `generateBabyFlavor()`. (script.js:6990-7010, 7012-7088)
