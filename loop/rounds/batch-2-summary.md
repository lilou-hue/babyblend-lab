# Batch 2 — Final Summary (5 rounds, R6-R10, 2026-05-21)

Batch 2 of the BabyBlend Lab multi-agent loop is complete. 5 rounds, polish-only theme. 89 commits on `main` across the batch (orchestrator + concurrent user i18n work).

## What the batch shipped

### Adult-mode consent rhythm (the load-bearing architectural change)

The consent-awareness one-liner ("The person this concerns is not in the room — and will inherit whichever balance you settle on") moved through three coordinated changes across the batch:

- **R7 UX Flow** — hoisted it out of the default-collapsed `#trait-conflicts` block into a new `#consent-awareness-leadin` slot positioned directly above the Enhancement Allocation header (closes the R6-flagged Product MAJOR: ethical framing was arriving *after* the behavioral projection).
- **R7 World Design** — added "Ethically:" prefix to anchor the line against out-of-context screenshot readings.
- **R7 Frontend** — added subtle panel chrome (rgba, amber border, 8px radius) so the lead-in reads as a visual peer of what follows.
- **R8 UX Flow** — found and fixed a leak: `showConsentAckPrompt()` was defined but never called, so the leadin's `.is-leaving` cross-fade never actually fired. Wired the fade trigger.
- **R8 UX Flow rev** — gated the fade to `state.consentAck` flipping true via the explicit micro-ack button click (not first slider input — which would have collapsed 3 narrative beats into a rushed single moment per Ethics + Narrative Design MAJOR).
- **R8 World Design** — rewrote the leadin copy from "inherit whichever balance" (cold/administrative) to "the child this affects isn't here yet — and they'll live with the choices you make" (names the subject as a person).
- **R8 World Design rev** — Burden Index idle baseline ("Minimal · few traits are pre-decided") → "No allocations yet · the Index updates once you commit credits" — fixes the semantic confusion of implying ethical weight at zero allocation.
- **R9 UX Flow rev** — factored cleanup into a `clearLeadin` helper (intent now explicit: wrapper persists, content clears).

End state: leadin appears with Adult mode + gen ≥ 1, "Ethically:" prefix anchors the framing, panel chrome gives it presence, fade only fires on explicit acknowledgment, no leaks.

### Kids mode register coherence

The 3 Kids-arc panels (`dedf39f` — wonder / curiosity / variance-as-gift, landed at start of Batch 2 via user commit) were progressively reframed to avoid normalizing optimization:

- **R6 Education** — 3 disclaimer subtitles ("Not predictions from genes — examples / questions / reminders") under each panel header.
- **R6 UX Flow** — Kids-mode trait-conflicts block suppressed entirely (the diagnostic register clashed with the affirmation arc); Kids slider-extreme acknowledgment placeholder added (warm in-place line when slider moves >1.0 from midparent); Kids-mode reflection prompt removed (was redundant with the new arc).
- **R7 Education** — de-stacked the 3 disclaimer prefix repetition ("Not predictions from genes…" only on panel 1; panels 2 + 3 got panel-specific tails).
- **R8 Education** — lifted the 3 disclaimers from inline EN-only HTML into a language-keyed `KIDS_ARC_DISCLAIMERS` dict.
- **R8 Narrative rev** — translated KIDS_ARC_DISCLAIMERS into zh/ja/ko/tr.
- **R9 UX Flow rev** — added `id="kids-{loves,questions,differences}-title"` to the h2s + `panel.dataset.stage` for animation hooks.
- **R10 Frontend** — implemented the staggered reveal animation (initially 0.32s with 0/0.3/0.45s delays, reduced-motion guard).
- **R10 Frontend rev** — corrected the stagger after 4 reviewers flagged it: 0.5s duration matching app's `fadeUp` / `parent-advanced-reveal` motion language; uniform 0/0.3/0.6s "wonder cadence" intervals; elevated disclaimer typography (14.5px, `var(--ink)`, weight 500) so it reads as peer of heading not footnote.
- **R10 UX Flow rev** — moved `aria-labelledby` from static `index.html` into the JS render path so screen readers find labels atomically with the h2 elements (the static attribute had referenced IDs that didn't exist until renderKidsArc ran).
- **R8 Systems rev** — lifted the Kids-mode vibe-pool conflict-tag filter (previously the Kids archetype hid conflict tags while the futures embraced them — internally incoherent). Now archetype + futures both surface contradictions.

### Conflict-tag architecture (gradual extension)

- **R7 Systems** — added conflict tags to 2 KIDS_FUTURE_PATHS entries (OC-tension + AN-pleaser).
- **R8 Systems** — extended to 2 more entries (CO-rigidity + AN-pleaser variant).
- **R8 Narrative** — added EN-tension + CO-rigidity tagged Kids futures, achieving full 4-tag coverage in Kids mode.
- **R9 Systems** — added the graduated tier (`OC-mild` / `EN-mild` / `CO-mild` / `AN-mild`) with sub-extreme bands (e.g., O ∈ [6,7] AND C ∈ [5,6]) strictly disjoint from tier-1.
- **R9 Narrative rev** — populated 24 EN entries (8 per tag × 3 pools: FUTURE_PATHS / KIDS_FUTURE_PATHS / ADULT_TRACES) so the new mild thresholds fire with content.
- **R10 Systems** — documented the disjointness + selection-rate parity rationale near the conflict-aware path code.

Open: mild-tag content translation (LOOP_REQUEST(translator) per pool — zh/ja/ko/tr).

### Institutional plausibility / regulatory disclosure

- **R6 Education** — anchored Oviedo Convention citation (1997 Council of Europe biomedicine treaty, 29 ratifying states); scoped "where the legal line falls" with "in much of Europe."
- **R6 World Design** — dropped the redundant "/ Class II" from case-file cohort row ("class" was carrying two unrelated institutional meanings).
- **R7 World Design rev** — stripped invented "Recital 6" from Oviedo cite (Conventions don't have Recitals — that's EU Directive structure); replaced invented "HFEA 2008 §3ZA / §4A" sub-section codes with the real "HFEA 2008 Schedule 2" anchor; added inline JS comment marking CMP codes as diegetic.
- **R8 World Design** — routed `renderRegionalAccess` USD literals through `BUDGET_TIER_THRESHOLDS` constant (single-source-of-truth); added `RA_CHANNEL_DIVISOR`.
- **R8 World Design rev** — created the "On the regulatory citations." REGULATORY_CARDS entry disclosing Oviedo + HFEA as real, IVD-Germ Lines Directive as fictional projection.
- **R9 World Design** — split the now-kitchen-sink entry into 2 cards: one for instrument reality, one for classification shorthand (Tier I-IV + CMP-N as diegetic).
- **R9 World Design rev** — extended the classification card with RA-N channel codes + GE-/EM-/RES-/APP-/ATH- rule-set prefixes as diegetic.
- **R10 World Design rev** — added IOC Aligned Federation framework + insurance-industry terminology ("Insurer notification," "carriers," "depression-care coverage") as diegetic constructs.

End state: every invented institutional shorthand visible to users is now disclosed somewhere in REGULATORY_CARDS.

### Narrative / copy cleanup

- **R6 Narrative rev** — replaced "A simulator cannot anticipate a single real Tuesday afternoon" (AI-wisdom template) with concrete misses (friend who moves at 15, surgery at 30, parent care at 50); replaced "Smells faintly of old paper, in the best way" (Pinterest energy) with grounded library detail; desymmetrized "A garden, kept badly, loved deeply"; added 3 precarious-work futures to KIDS_ADULT_FUTURES.
- **R7 Narrative rev** — killed "Kindness can be taught and grow over time — it's a habit, not just a trait" (the converged Writing MAJOR + Detection MAJOR line); shifted 2 KIDS_RANDOM_EVENTS from deterministic ("It is destiny") to probabilistic; universalized KIDS_QUESTIONS_FOR_THEM entry 0 and entries 6, 15.
- **R8 Narrative rev** — reframed "Could be the family peacemaker" (AN-pleaser virtue framing) as "May become the one who smooths family tensions — learning early that keeping the peace is their job" across 5 languages; replaced "Salvages broken things and gives them another life" with "Builds tools that solve problems for people around them" in the inventor entry.
- **R9 Narrative** — replaced "Diversity isn't a glitch — it's the feature" (false-symmetric template); shifted KIDS_FUTURE_PATHS "Could become really good at storytelling" / "great teacher" outcome-determinism to present-state observation; converted "Tinkers in a sunny corner" workspace assumption to skill framing.
- **R10 Narrative rev** — re-fixed R10's own R10-Phase-1 replacements (Detection MAJOR + Writing MAJOR converged on the new lines still containing template patterns): final settled lines include "Stubbornness saves you under fire; costs you in meetings" + "Nature did not consult a design handbook."

### Accessibility

- **R6 Frontend** — `:focus-visible` extended to 7 stranded interactive controls (intro-skip, intro-enter, intro-stat-source summaries, history-toggle, details-toggle, chaos-pill, footer-link).
- **R6 Frontend rev** — Kids-mode warm-palette toggle override; kids-arc list border opacity bump.
- **R7 Frontend rev** — `.history-chevron` added to existing prefers-reduced-motion guard; `#consent-awareness-leadin` chrome.
- **R8 Frontend** — range slider thumb 18→44px touch target via transparent border + background-clip trick (visible thumb stays small); footer link contrast upgraded `--ink-mute` (5.4:1) → `--ink-soft` (~8:1) for WCAG AA.
- **R8 Frontend rev** — Firefox-only `::-moz-range-thumb` `box-sizing: border-box` fix; `.intro-stat-source summary` 44×44 touch target.
- **R9 Frontend** — `aria-label` on `#consent-awareness-leadin` + Kids-arc panels.
- **R9 Frontend rev** — `margin: 0` on leadin wrapper so retirement leaves no gap; divergence-reroll/dismiss 24×24 → 44×44 hit area.
- **R10 UX Flow rev** — moved `aria-labelledby` into JS render path (atomic with h2 ID injection) + added `aria-describedby` pointing at disclaimer paragraphs.

### Educational accuracy

- **R6 Education rev** — anchored Oviedo Convention with real treaty details.
- **R6 Systems rev** — corrected OCEAN heritability comment (σ=1.75 implies ~30-40%, not ~50% — cited Vukasović & Bratko 2015 + Polderman 2015).
- **R7 Education rev** — sharpened Yengo 2022 citation precision (12,111 SNPs / ~7,200 regions / ~40% height variation); KIDS_OCEAN_TOOLTIP one-sentence aside revealing the OCEAN→kid-words mapping.
- **R8 Education rev** — dropped redundant HISTORY_CARDS "Access is the harder question." entry (strictly subsumed by next entry).
- **R8 Education rev** — added "in predominantly European-ancestry populations; portability to other ancestries is lower" qualifier to Yengo 2022 citation.
- **R10 Education rev** — Polderman 2015 precision: "~17,800 traits" → "~17,800 phenotypes across twin studies" (5 langs).
- **R10 Systems rev** — sibling-cohort label retracted variance-equals-confidence-interval overclaim ("Five plausible outcomes showing the uncertainty range of parental-input-based inheritance estimates — not behavioral probability").

### i18n (user-driven, concurrent with orchestrator)

The user pushed ~17 i18n commits during Batch 2, lifting most narrative + institutional pools from EN-only to language-keyed dicts ({en, zh, ja, ko, tr}):
- FUTURE_PATHS (55 × 5), KIDS_FUTURE_PATHS (30 × 5)
- NEWS_HEADLINES (20 × 5), KIDS_NEWS_HEADLINES (20 × 5)
- KIDS_HOBBIES (31 × 5)
- RANDOM_EVENTS + KIDS_RANDOM_EVENTS (18 + 23 × 5)
- TRAIT_CONFLICTS + TRAIT_CONFLICTS_CLINICAL + KIDS_TRAIT_CONFLICTS (10 each × 5)
- ADULT_FUTURES + ADULT_FUTURES_CLINICAL + KIDS_ADULT_FUTURES (26 + 20 + 26 × 5)
- HUMANITY_REMINDERS, CLINICAL_REMINDERS, NATURAL_VARIATION_MESSAGES, KIDS_HUMANITY_REMINDERS (4 pools × 5 — committed and finalized R6)
- KIDS_EXPLAINERS, KIDS_OCEAN_TOOLTIP, KIDS_FUTURES_PREAMBLE, CONSENT_EXPLAINER, CONSENT_IMPLICATIONS
- REGULATORY_NOTE_RULES (10 entries × 5), REGULATORY_CARDS (8 × 5), HISTORY_CARDS (9 × 5)
- `localList`, `pickPool`, `renderFutures`, `computeTraitConflicts` consumer wiring for the dict-shape pools

Two of the user's mid-round i18n commits collided with orchestrator cherry-picks (R7 HUMANITY_REMINDERS; R9 KIDS_ADULT_FUTURES; R10 HISTORY_CARDS) — all resolved by keeping the user's i18n shape and re-applying the orchestrator's intended copy fix across all 5 languages.

## Commit count + diff

- **89 commits** on `main` between `558bad5` (R6 kickoff) and `8c21e24` (R10 halt-prep).
- **+4,554 / −597** lines across the batch. Most growth is in `script.js` (~+3,298 net — overwhelmingly user i18n translations).
- Files touched: `script.js`, `style.css`, `index.html`, 10 `loop/rounds/round-N/{critiques,priorities,summary}.md` files, `loop/STATE.md`.

## Incidents

- **R7 — stash incident.** Orchestrator stash of user's R7 script.js WIP appeared to vanish mid-round (user finished and committed the work independently as `3b5406d` "i18n: RANDOM_EVENTS + KIDS_RANDOM_EVENTS"); stash-pop reached a 5-round-old "parent-appearance CSS WIP" which was re-stashed under its original name. No data loss.
- **R7 — cherry-pick conflict.** UX Flow timing fix vs. World Design "Ethically:" copy prefix at the leadin. Resolved by combining both intents.
- **R9 — cherry-pick conflict.** R9 Narrative rev based on pre-i18n KIDS_ADULT_FUTURES collided with user's mid-round full-i18n landing. Resolved by keeping the i18n shape and re-applying R9's "Builds tools that solve problems for people around them" fix across all 5 languages.
- **R10 — cherry-pick conflict (skip-and-reapply).** R10 Education rev based on pre-i18n HISTORY_CARDS collided with user's mid-round full-i18n landing. Cherry-pick became empty after taking HEAD; the Polderman precision fix was re-applied as a fresh commit (`0088e48`) across all 5 languages.

## What Batch 2 did NOT solve (carried forward)

Architecture / new mechanics (out of polish scope):
- Move consent-awareness AFTER projection (Product + Narrative Design MAJOR since R7 — directly contradicts what R7 actually shipped; held pending empirical evidence).
- Pre-allocation slider gate.
- "Inheritance Burden Index" → "Identity Lock-In Index" rename.
- Life-shape milestone tagging refactor (multi-round Systems + Narrative collab).
- Kids-mode onboarding panel (adds new mechanic).
- ADULT_TRAJECTORY_MILESTONES linear-progression language refactor.

Polish carryovers:
- Mild-tag content translator (zh/ja/ko/tr for 24 R9 EN entries).
- KIDS_ADULT_FUTURES equipment-ownership cluster (entries [4]/[14]/[20]) — Sociology MAJOR R8/R9/R10.
- REFLECTION_TRACES "Holds two contradictory beliefs about themselves at all times" cost-naming (Psychology MAJOR R10).
- KIDS_QUESTIONS_FOR_THEM[16] "ask a cloud" leisure assumption (Sociology POLISH R10).
- "Difference is information, not error" platitude template (Writing POLISH R10).
- Cross-locale i18n fallback policy (UX architecture).
- Pre-R5 style.css 180-line WIP (re-stashed across R7-R10).
- Two end-of-R10 stashes preserved: R10 mid-round renderRegulatoryNotes i18n WIP (likely superseded by user commits), R10 KIDS_EXPLAINERS i18n WIP (superseded by `ce4fc38`).

## What the loop produced beyond the spec

- 5 per-round directories under `loop/rounds/` with `critiques.md` + `priorities.md` + `summary.md` for each.
- A persistent self-pacing pattern: each `ScheduleWakeup` fires the next round automatically, with the orchestrator's main task being conflict resolution + synthesis + stewardship.
- Resilient cherry-pick conflict-resolution pattern: keep user's i18n dict shape, re-apply orchestrator's intended copy fix across all 5 languages.
- One developer-mode runtime audit IIFE (R9 Systems rev) that walks all future pools and warns on KIDS_ADULT_FUTURES tags that don't match ENV_FIELDS keys.

## Halting

`rounds_remaining_in_batch: 0`. No ScheduleWakeup. This summary is the final artifact of Batch 2.

To run Batch 3:
1. Set `rounds_remaining_in_batch` to a positive integer in `loop/STATE.md`.
2. Set `status: ready`.
3. Set `current_round: 11`.
4. Set `batch: 3`.
5. Write a new "Next round focus" section.
6. Invoke `/loop` with the prompt from `loop/LOOP_PROMPT.md`.
