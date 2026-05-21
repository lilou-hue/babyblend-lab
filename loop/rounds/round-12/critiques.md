# Round 12 — Reviewer Critiques (26 issues)

All 13 reviewers returned. **Strong cross-reviewer convergence on PAUSE_PROMPTS_BY_CONTEXT** — the R12 UX Flow addition was flagged by 5 reviewers from different angles:
- UX MAJOR + Product MAJOR: non-EN users fall back to generic pool (the LOOP_REQUEST(narrative) isn't a graceful degradation, it's a regression for localized users)
- Detection MAJOR + Risk MAJOR: specific prompt at `script.js:1512` carries generic-philosophy templates AND screenshot-misread risk
- Psychology MAJOR: beloved-context prompts romanticize love as softening
- Narrative Design MAJOR: prompts reference "slider values" rather than synthesizing the Inner Cohort behavioral insights they're meant to follow
- Sociology MAJOR: "work" context prompts assume white-collar

---

## 1. UX REVIEWER

**MAJOR:** Multilingual users in Reflection mode see untranslated English Pause Panel questions despite language selection — `PAUSE_PROMPTS_BY_CONTEXT` only has `en` entries, and `localList(PAUSE_PROMPTS_BY_CONTEXT[ctxKey])` falls back to EN for zh/ja/ko/tr users, silently degrading R12's signature feature. **Recommendation:** Translate the 12 EN placeholders into zh/ja/ko/tr before R12 ships (close the LOOP_REQUEST(narrative)), OR add an explicit fallback indicator if shipping incomplete. (script.js:1484-1514)

**POLISH:** Expanded Kids OCEAN parentheticals (Energy/Focus/Confidence at lines 4369-4371) lack max-width constraint in `.slider-popover`, risking text-wrapping overflow on 320px mobile viewports. **Recommendation:** Add `max-width: 240px; word-wrap: break-word;` to `.slider-popover`. (script.js:4369-4371, style.css `.slider-popover`)

---

## 2. ETHICS REVIEWER

**MAJOR:** Kids mode's "curiosity" OCEAN parenthetical "gets in trouble for asking too much" frames adult-imposed punishment as natural consequence of the trait, normalizing the response rather than naming it as environment-mediated. Other traits use neutral cost language ("costs them quiet," "harder hour"). **Recommendation:** Rephrase to distinguish trait from environmental response — e.g., "sometimes curious questions get more questions back than answers — that's a reaction to the trait, not the trait itself." (script.js:4367)

**POLISH:** `.pause-panel` CSS uses redundant border rules — `border: 1px solid ...` at line 1777 followed immediately by `border-left: 3px solid ...` at 1783; partial override creates maintenance confusion. **Recommendation:** Consolidate or use explicit `border-top/bottom/right` to clarify intent. (style.css:1777-1783)

---

## 3. SCIENCE REVIEWER

**MAJOR:** Kids OCEAN parenthetical for Focus ("sometimes a kid stays so deep in one thing they miss what's happening around them — same trait, different cost") conflates hyperfocus (an attention pattern associated with neurodivergence) with conscientiousness/focus (a Big Five trait) — these are separate constructs. **Recommendation:** Reframe Focus parenthetical to "sometimes a kid gets so absorbed in one thing they lose track of time — that's focus working, not a cost" to separate trait from attention-profile. (script.js:4370)

**POLISH:** User-pushed env-slider rules (`1e533f8` lines ~8144-8145) frame environmental exposure as direct mechanism ("Identity formation increasingly mediated by algorithmic feedback," "Code-switching capacity develops early; identity flexibility above baseline") when evidence is correlational — overstates causal directionality. **Recommendation:** Reframe to context-modifier language — e.g., "Algorithmic-feedback exposure may shape identity formation pathways; outcomes remain contingent on individual response." (script.js:8144-8145)

---

## 4. WRITING REVIEWER

**MAJOR:** Kids OCEAN tension parentheticals (lines 4368-4405) repeat a one-parenthetical-per-trait pattern with the same reassurance structure ("— both are X" / "— and that's okay"), creating templated flattening across the 5 traits. **Recommendation:** Vary reassurance structures — let some stand alone, use different affirmations like "it's all you" or simple period for others. (script.js:4368-4405)

**POLISH:** `KIDS_OCEAN_TOOLTIP` ends with a clinical taxonomy dump ("openness, agreeableness, extraversion, conscientiousness, and emotional stability — the same ideas, with grown-up names"), breaking Kids mode's warm tone. **Recommendation:** Soften the introduction to the trait names, or move the full list into a less-prominent secondary tooltip. (script.js:4355)

---

## 5. VISUAL DIRECTOR

**MAJOR:** `.intro-event` retains `opacity: 0` as starting state (style.css:4760) — commit `211029a` "kill opacity-0 starting states on intro" addressed `.intro-section` but missed child elements; events remain invisible if animations stall. **Recommendation:** Remove `opacity: 0` and `transform: translateY(8px)` from base `.intro-event`; let animation-forwards handle the reveal. (style.css:4760-4761)

**POLISH:** `.consent-ack-prompt .consent-ack-btn` uses non-standard `padding: 6px 12px` (style.css:3463) vs. standard `.btn` (10px 16px) — desktop hierarchy inconsistency, while mobile override forces 44px. **Recommendation:** Align desktop padding to 10px 16px or add explicit `min-height: 44px` on desktop. (style.css:3463)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** The Confidence Kids OCEAN parenthetical lacks honest-cost framing like the other 4 traits — "Some days a kid believes in what they can do, other days they don't — both are part of the same trait growing in" uses developmental-positivity, not cost. Single-dimensional virtue framing. **Recommendation:** Add a real downside — e.g., "Sometimes the belief slides into not seeing how it lands for others." (script.js:4371)

**POLISH:** PAUSE_PROMPTS_BY_CONTEXT "beloved" context prompts romanticize love as softening/dissolving traits ("Loved by the right person, which of these numbers stops mattering?") — but psychological truth is that being loved makes us MORE ourselves, not less. **Recommendation:** Probe what relational pressure reveals — "With someone they love, which of these traits shows up differently than the sliders suggest?" (script.js:1508-1514)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** PAUSE_PROMPTS_BY_CONTEXT "work" context (script.js:1489-1491) assumes white-collar workplace with colleague relationships, excluding gig workers, self-employed, informal economy, and unemployed. **Recommendation:** Revise "colleague version" to "work self"; add variants that work for non-traditional work arrangements. (script.js:1490)

**POLISH:** ADULT_TRAJECTORY_MILESTONES "mid" stage line ("chosen courses and side pursuits") at ~script.js:3692 normalizes middle-class educational access — many children have constrained pathways. **Recommendation:** Replace with neutral "emerging interests and early attempts" that doesn't presuppose course selection or extracurricular capacity. (script.js:3692)

---

## 8. MOBILE REVIEWER (a11y second)

**MAJOR (mobile):** `.style-btn` and `.gender-btn` elements have `padding: 6px 14px` (~12px height) at style.css:1210-1236, creating sub-44px touch targets on mobile — violates WCAG 2.5.5. **Recommendation:** Add `@media (max-width: 640px)` override with `min-height: 44px; min-width: 44px;` matching R11 intro-skip pattern. (style.css:1210-1236)

**POLISH (a11y):** `.style-btn` and `.gender-btn` lack `:focus-visible` styling despite being critical app-mode toggle controls. **Recommendation:** Apply the same `:focus-visible: 2px solid var(--accent)` treatment used elsewhere in the codebase. (style.css:1210-1236)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** User's env-slider rules in `1e533f8` introduce behavioral-prediction constructs ("appearance feedback amplified by algorithmic distribution," "identity-fatigue risk," "care-runs-hot profile") as if empirical social-science categories — not disclosed in REGULATORY_CARDS. **Recommendation:** Extend the "On the classification shorthand" disclosure (or add a parallel "On the modeled outcome constructs" card) to name these as simulation-internal speculative constructs analogous to the tier/channel/prefix system. (script.js:8115-8153, 4007)

**POLISH:** Societal Outcomes Brief modal uses "Modeled" language but doesn't clarify that specific outcome framings ("care-runs-hot," "identity-fatigue") are simulation-coined psychological constructs. **Recommendation:** Add a one-line header clarification — "These outcomes are modeled within the simulation using speculative social-psychological frameworks." (script.js:8214)

---

## 10. DETECTION AGENT

**MAJOR:** PAUSE_PROMPTS_BY_CONTEXT "Loved by the right person, which of these numbers stops mattering?" (script.js:1512) combines two generic-philosophy templates: "the right person" (Reddit-tier universalism) AND "stops mattering" (false-deep abstraction where something concrete is made to vanish). **Recommendation:** Ground in concrete relational shift — "With someone they love, which of these traits shows up differently than the sliders suggest?" (script.js:1512)

**POLISH:** PAUSE_PROMPTS_BY_CONTEXT "When they go home, which of these traits stops being theirs?" (script.js:1496) follows the template "context erases selfhood" — generic-feeling identity collapse without specificity. **Recommendation:** Replace with concrete behavioral question — "When they go home, which of these traits gets overridden by family dynamics?" (script.js:1496)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Context-anchored Pause Panel questions fall back to generic pool for non-English users because PAUSE_PROMPTS_BY_CONTEXT only has English entries — the entire R12 feature is invisible to localized users. **Recommendation:** Translate all 12 EN placeholders into zh/ja/ko/tr (close the LOOP_REQUEST(narrative)) before next round; or implement a graceful fallback that at least shows context-appropriate generic questions. (script.js:1484-1514)

**POLISH:** R11 humanity-reminder cadence (every generation, 8s hold) with only 10 messages in the EN pool causes visible repetition within typical user sessions — may swing from helpful to annoying. **Recommendation:** Either grow the message pool to ~20-25, or revert to every-3rd-generation cadence. (script.js:8714-8718)

---

## 12. RISK ANALYST

**MAJOR:** PAUSE_PROMPTS_BY_CONTEXT "Loved by the right person, which of these numbers stops mattering?" (script.js:1512) frames trait optimization as justified-by-romantic-love — when screenshot-quoted in isolation it could read as endorsing child-optimization-for-desirability ("optimize so they'll meet the right person"). **Recommendation:** Rephrase to emphasize love's unconditional nature — "With someone they love, which of these numbers were never the point?" or similar. (script.js:1512)

**MITIGATION:** Kids OCEAN curiosity parenthetical "gets in trouble for asking too much" (script.js:4367) could be isolated from its "same trait, different room" context in a screenshot and misread as discouraging curiosity. **Recommendation:** Front-load affirmation — "Curiosity is a strength — though sometimes a curious kid asks more than adults expect. Same trait, different room." (script.js:4367)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The new PAUSE_PROMPTS_BY_CONTEXT prompts ask users to reconsider trait values ("Which slider values...") rather than synthesizing the behavioral insights the Inner Cohort grid just showed — breaks the emotional arc's intended synthesis. **Recommendation:** Reframe prompts to reference specific behavioral contradictions shown in Inner Cohort — e.g., "You just saw them at work — which version will someone on a train never meet?" (script.js:1486-1515)

**POLISH:** Kids Differences panel renders "Might be..." aspirational statements but lacks a thematic closing callback to variance-as-identity, leaving the 3-panel sequence (Loves / Questions / Differences) without a clear emotional landing. **Recommendation:** Add a single closing affirmation after the Differences items framing difference as identity foundation, not deviation. (script.js:8375-8395, 5581-5603)
