# Round 18 — Priorities (synthesized from 26 critiques)

Two dominant convergences this round:

1. **Codename-deterministic life_shape reads as destiny** (7 reviewers: Ethics POLISH + Science MAJOR + Psychology MAJOR + Sociology MAJOR + Plausibility MAJOR + Risk MAJOR + Narrative Design MAJOR) — need UI-visible disclosure that the locked shape is one possible narrative path, not innate determination.
2. **Gate copy "Allocate above" reads imperative + budgetUsed=0 condition creates performative necessity** (4 reviewers: Ethics MAJOR + Writing POLISH + Detection MAJOR + Risk MITIGATION) — soften imperative; consider removing budgetUsed gate.

Strict <80-line diffs per builder.

---

## FRONTEND

**Primary — VISUAL DIRECTOR MAJOR:**
Placeholder needs a visual frame to signal "affordance, not data." Add 2px left border + reduce padding-left to 10px. Match `.burden-disclaimer` pattern.

**Secondary — VISUAL DIRECTOR POLISH:**
Reduce placeholder font from 13.5px → 11px to match `.burden-disclaimer` family. R17 deliberately bumped to 13.5px for CTA hierarchy, but now that it's the default first-render state, the visual weight inverts (placeholder dominates real data). Drop to 11px.

**Tertiary — MOBILE POLISH (carry from Phase 1):**
Verify the placeholder's role="status" still works visually with the new framing.

Strict <40 lines. CSS only.

---

## SYSTEMS

**Primary — PRODUCT MAJOR (adultGenerateCount persistence):**
`saveCurrentTimeline()` doesn't save adultGenerateCount; `loadTimeline()` doesn't restore. Loaded timelines re-hide gen-2 reveals. **Fix:** Add adultGenerateCount + lastGeneratedInAdult to saved snapshot at script.js:10288 + restore at line 10356.

**Secondary — SCIENCE / RISK / PSYCHOLOGY convergence on shape determinism:**
The 7-reviewer convergence has two failure modes Systems can address:

- (A) **Add a fall-through for unsupported shapes:** `interruption` shape has 0 entries → silently falls back to unfiltered pool. Either filter `interruption` out of pickCodenameLifeShape OR document the fall-through behavior in code (signal that fall-through is intentional pending more tags).
- (B) **UX MAJOR side note:** Early/mid age buckets (0-29) have only untagged strings — the filter is a no-op there. Document this in pickAgeTicker code (filter applies only to "later" bucket today).

Don't ship the "randomize shape per-render" recommendation (Psychology MAJOR / Plausibility MAJOR) — that would defeat the whole R18 coherence goal. The Risk/Science/Sociology convergence wants UI-visible disclosure, not implementation overhaul. Defer that to UX Flow + Narrative.

Strict <50 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — DETECTION MAJOR + WRITING POLISH + RISK MITIGATION + ETHICS POLISH convergence on gate copy:**

Current EN: "This projection reflects choices yet to be made. Allocate above, and the profile updates to match."

Issues:
- "Allocate above" reads imperative/jargony (Detection MAJOR, Writing POLISH)
- Frames allocation as prerequisite (Ethics MAJOR — implementation, but copy reinforces)
- Lacks warmth of closing affirmations (Detection MAJOR)
- No contingency framing for Adult mode (Risk MITIGATION)

**Suggested rewrite (pick one):**
- "This picture waits for your choices. As you move sliders above, the profile shifts to match." (Detection-recommended warmth)
- "This projection is provisional. It will shift as you make choices above." (Risk-recommended contingency)
- "What emerges depends partly on what you choose. Move sliders above to see the projection shift." (Risk-flavored echo of REFLECTION_ARC_CLOSING_AFFIRMATION's "partly theirs, partly circumstance")

Translate to zh/ja/ko/tr in LABEL_I18N. Replace existing entry; don't add a new key.

**Secondary — PSYCHOLOGY POLISH + SCIENCE POLISH (add interruption-shape entry):**

`interruption` shape has 0 ADULT_TRAJECTORY entries → silent fall-through. Add 1 entry to the "later" bucket like: "A period of illness, loss, or external disruption pauses forward motion; identity and goals reorient when it lifts." with `life_shape: 'interruption'`. Translate across 5 langs.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

Likely NO CHANGE. If you want to add a HISTORY_CARDS entry or KIDS_EXPLAINERS note about life-shape-as-structural-pattern-not-individual-fate (the 7-reviewer convergence theme), do so — but only if it adds genuine educational signal. Otherwise NO CHANGE.

Max <30 lines.

---

## UX FLOW

**Primary — RISK MAJOR + SCIENCE MAJOR + SOCIOLOGY MAJOR convergence on shape-disclosure UI:**

The 7-reviewer convergence asks for UI-visible disclosure that the locked shape is *not destiny*. The Risk Analyst recommends a non-dismissible disclosure in Adult mode. Cleanest implementation: append one small italic line to the rendered Adult mode trajectory section, e.g., "These are one set of patterns this person might encounter — not a forecast." Position it visually adjacent to where pickAgeTicker output renders.

~15-25 lines. i18n in LABEL_I18N (5 langs).

**Secondary — ETHICS MAJOR (gate condition):**

Ethics MAJOR wants `budgetUsed === 0` removed from the gate, so gate fires only on `inAdult && adultGen === 1` regardless of allocation. **DEFER.** This would change the gate semantics significantly — it would no longer release on first allocation, which is the whole point of "first allocation triggers projection." The R17 design treats first allocation as the disclosure trigger; removing budgetUsed reverses that. The performative-necessity concern is real but probably needs a copy-only fix (Narrative's primary above) rather than a semantic change. Hold for R19.

**Tertiary — MOBILE MAJOR (`<dt role="status">` semantic clash):**

Mobile MAJOR flagged the `<dt role="status">` semantic confusion. Switch to `<div role="status" aria-live="polite">` outside the `<dl>` (or restructure rendering so the placeholder isn't inside the DL at all). ~5-10 lines.

Strict <60 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

Likely NO CHANGE. Sociology MAJOR's structural-vs-individual framing concern is being addressed by UX Flow's disclosure microcopy. If the existing structural-causation language elsewhere in script.js has drift that touches Sociology's concerns, fix it. Otherwise NO CHANGE.

Max <30 lines.

---

## Cross-cutting deferrals (R19+)

- **Ethics MAJOR — remove `budgetUsed === 0` from gate condition** — deferred to R19. Need to think through whether gate fires on render-only or first-allocation. The R17 design ties gate to first-allocation; reversing this needs broader discussion.
- **UX MAJOR — extend life_shape tagging to early/mid buckets** — deferred. Substantial cross-cultural narrative work (3 buckets × 5 shapes × 5 langs). Hold for next batch.
- **Product POLISH — stagger panel-unlock thresholds (3, 4 etc.)** — deferred. Currently all 4 gen-2 reveals fire at adultGenerateCount >= 2; product wants staggered. Hold; the simultaneous reveal might actually be desirable as a "moment" rather than a flaw.
- **Narrative Design POLISH — port Inner Cohort + Lifetime Drift to Adult mode** — deferred. Substantial cross-mode panel surgery; needs design decision before code.
- **Plausibility POLISH — document emotional/appearance heritability weights** — deferred to R19 (small, can land then).
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
