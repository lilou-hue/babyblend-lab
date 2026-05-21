# Round 12 — Priorities (synthesized from 26 critiques)

**Dominant theme: PAUSE_PROMPTS_BY_CONTEXT needs immediate revision.** 5 reviewers (UX + Product + Detection + Risk + Narrative Design + Psychology + Sociology) flagged the R12 UX Flow addition from different angles. R12 Narrative rev must address most of it.

Strict <80-line diffs per builder.

---

## FRONTEND (style.css, structural HTML)

**Primary — VISUAL DIRECTOR MAJOR:**
Remove `opacity: 0` + `transform: translateY(8px)` from base `.intro-event` rule at style.css:4760-4761. Commit `211029a` fixed `.intro-section` but missed child events; pure subtraction matching that earlier intent.

**Secondary — MOBILE MAJOR:**
`.style-btn` + `.gender-btn` (style.css:1210-1236) sub-44px on mobile. Add `@media (max-width: 640px)` override with `min-height: 44px; min-width: 44px;`. Matches R11 intro-skip pattern.

**Tertiary — MOBILE POLISH (a11y) + Visual Director POLISH:**
- Add `:focus-visible` styling to `.style-btn` + `.gender-btn` matching existing accent-ring pattern
- Align `.consent-ack-btn` desktop padding to `10px 16px` (style.css:3463) for consistency with `.btn`

**Quaternary — UX POLISH:**
Add `max-width: 240px; word-wrap: break-word;` to `.slider-popover` so the new Kids OCEAN parentheticals don't overflow on 320px viewports.

**Quinary — Ethics POLISH (small):**
Consolidate `.pause-panel` border rules at style.css:1777-1783 (the partial-override pattern). Pure clarity tweak.

Strict <80 lines.

---

## SYSTEMS (script.js math)

**No primary.** Most R12 reviewer items routed elsewhere. NO CHANGE valid.

If you want to ship something small: pick a drift hunt or document an invariant. Don't invent work.

Max <40 lines if you edit. `node --check script.js` MANDATORY.

---

## NARRATIVE (script.js flavor pools) — **highest workload, multi-converged**

**Primary (combined — addresses 5 reviewers): PAUSE_PROMPTS_BY_CONTEXT translation + revision**

This is the most-flagged item of R12. Do all of these together since they touch the same 12 strings:

1. **Translate** the 12 EN placeholders into zh/ja/ko/tr (close UX Flow's R12 LOOP_REQUEST(narrative); addresses UX MAJOR + Product MAJOR).

2. **Rewrite** the offending prompt at `script.js:1512` "Loved by the right person, which of these numbers stops mattering?" (Detection MAJOR + Risk MAJOR — generic philosophy template + screenshot-quote risk). Suggested:
   - "With someone they love, which of these traits shows up differently than the sliders suggest?" OR
   - "With someone they love, which of these numbers were never the point?"

3. **Rewrite** the prompt at `script.js:1496` "When they go home, which of these traits stops being theirs?" (Detection POLISH — context-erases-selfhood template). Suggested: "When they go home, which of these traits gets overridden by family dynamics?"

4. **Reframe the prompt-set's pivot** — currently prompts reference slider values ("which slider values..."); should anchor to behavioral contradictions from Inner Cohort (Narrative Design MAJOR). Where possible, refer to "the version" or "which one" of the contexts the user just saw.

5. **Sociology MAJOR (work context)** — Adjust the 3 "work" context prompts at script.js:1489-1491 to not assume white-collar workplace. "Colleague version" → "work self"; less peer-relational assumption.

6. **Psychology POLISH (beloved context)** — Reframe beloved prompts so love reveals MORE of self, not less ("Loved by someone, which of these traits do you see most clearly?").

Aim for the full rewrite. Each context has 3 prompts × 5 langs = 15 strings × 4 contexts = 60 strings. **This is the round's biggest single workload.** May spill past 80 lines if all 5 langs are written; if so, ship en + 2-3 langs and leave LOOP_REQUEST for remaining.

**Secondary (only if Primary fits):** Vary Kids OCEAN tension parenthetical patterns (Writing MAJOR R12) — let some traits stand alone, vary affirmation structures across the 5 traits.

Strict <80-line diff (might need to push close to limit). `node --check script.js` MANDATORY.

---

## EDUCATION

**Primary — ETHICS MAJOR + SCIENCE MAJOR + RISK MITIGATION (combined):**

Two Kids OCEAN parenthetical fixes:

1. **Curiosity** (script.js:4367) "gets in trouble for asking too much" — normalizes adult-imposed punishment as natural consequence. **Front-load affirmation** (per Risk MITIGATION) and **distinguish trait from environmental response** (per Ethics MAJOR). Suggested: "Curiosity is a strength — though sometimes curious questions get more questions back than answers. Same trait, different room."

2. **Focus** (script.js:4370) "sometimes a kid stays so deep in one thing they miss what's happening around them" — conflates hyperfocus with the Big Five Focus/Conscientiousness trait (Science MAJOR). Suggested: "sometimes a kid gets so absorbed in one thing they lose track of time — that's focus working, not a cost."

3. **Confidence** (Psychology MAJOR R12) — Confidence lacks honest-cost framing the other 4 traits have. Add one. Suggested: "Sometimes the belief slides into not seeing how it lands for others."

KIDS_EXPLAINERS is EN-only per R11. ~6-9 line-pair edits.

Strict <40 lines. `node --check script.js` MANDATORY.

---

## UX FLOW

**Primary — PLAUSIBILITY MAJOR (route consideration):**
The user's env-slider rules in `1e533f8` introduced behavioral-prediction constructs ("appearance feedback amplified by algorithmic distribution," "identity-fatigue risk," "care-runs-hot profile") in Societal Outcomes Brief copy without disclosure. **This is institutional/regulatory copy — World Design's surface.** Route to World Design. UX Flow does NOT take this.

**Secondary — PRODUCT POLISH (humanity reminder cadence):**

R11 changed cadence to every generation with 8s hold. R12 Product flags 10-message pool repeats too fast. Two options:
- (A) Revert cadence to every 2nd generation (compromise between R8's every-3rd and R11's every-1st)
- (B) Grow the message pool to ~20-25 entries — that's Narrative's surface, not UX Flow

**Recommendation: (A)**. Pure scheduler edit. ~3 lines.

**Tertiary — NARRATIVE DESIGN POLISH (Kids Differences thematic landing):**

Add a single closing affirmation after the 3 Kids-arc Differences items framing difference-as-identity-foundation. ~5-10 lines but adds new copy (Narrative surface) — leave LOOP_REQUEST(narrative) for the actual prose; UX Flow adds the slot.

Strict <60 lines.

---

## WORLD DESIGN

**Primary — PLAUSIBILITY MAJOR (routed from UX Flow):**

Extend the "On the classification shorthand" REGULATORY_CARDS entry with disclosure of the speculative outcome constructs from `1e533f8`: "appearance feedback amplified by algorithmic distribution," "identity-fatigue risk," "care-runs-hot profile" + any other coined social-psychology terms. ~1-2 sentences across 5 langs.

**Secondary — PLAUSIBILITY POLISH:**
Add a one-line clarification to the Societal Outcomes Brief header (script.js:8214) — "These outcomes are modeled within the simulation using speculative social-psychological frameworks."

Strict <60 lines.

---

## Cross-cutting deferrals (held for R13+)

- **R12 mid-pick stash** — user WIP on script.js (still in stash@{0} from cherry-pick).
- **Mild-tag content translation** — R9 carryover; 24 EN entries still need zh/ja/ko/tr.
- **Sociology POLISH** — ADULT_TRAJECTORY_MILESTONES "mid" stage course-choice assumption.
- **Move consent-awareness AFTER projection** — architectural carryover from R7.
- **"Inheritance Burden Index" rename** — still held.
- **Pre-R5 style.css 180-line WIP** — re-stashed.
