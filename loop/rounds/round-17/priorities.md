# Round 17 — Priorities (synthesized from 26 critiques)

Three convergences:
1. **Placeholder copy needs rewrite + i18n** (5 reviewers) — Narrative + UX Flow tag-team
2. **life_shape coverage / stability-vs-caretaking contradiction** (Science + Psychology MAJOR) — Narrative + Systems
3. **Cross-mode generateCount risk** (Product MAJOR) — Systems / UX Flow

Strict <80-line diffs.

---

## FRONTEND

**Primary — VISUAL DIRECTOR MAJOR + POLISH:**
- `.projection-gated-placeholder` padding `8px 12px` → `4px 10px` (match `.burden-disclaimer` family)
- Margin `4px 0` → `0` (defer to flex-gap)
- Mobile (a11y) POLISH: bump opacity contrast for low-vision users

**Secondary — UX POLISH:**
- Bump placeholder font to ~13.5px for visual hierarchy as a CTA-prompt

Strict <40 lines. CSS only. `node --check ../../../script.js` (defensive).

---

## SYSTEMS

**Primary — PRODUCT MAJOR (cross-mode generateCount):**
The gate at script.js:7601-7603 fires on `inAdult && gen === 1 && budgetUsed === 0`. If user generates a baby in Reflection mode (gen=1) then switches to Adult, `gen === 1` is still true → gate fires inappropriately. After R18 flag flip, this would expose gen-2 reveal panels prematurely OR hide the projection on cross-mode-switch.

**Fix:** Add a guard that checks `lastGeneratedMode === 'adult'` (or track `adultGenerateCount` separately). The cleanest fix: track an Adult-specific generateCount that increments only when an Adult-mode baby is generated.

Alternative simpler fix: change the gate condition to `inAdult && budgetUsed === 0 && !state.lastGeneratedInAdult`. Whichever you can ship in <30 lines.

**Secondary — PLAUSIBILITY MAJOR (Sociability weight):**
INHERITANCE_BURDEN_WEIGHTS at script.js:10644 has Sociability=1.0 — same weight as appearance. Behavioral-genetics consensus is ~40% heritability for extraversion. **Recommendation:** Lower to 0.35-0.45. Document the source (e.g., Polderman 2015 sub-trait estimate).

Strict <40 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — 5-reviewer convergence on placeholder copy:**

Current placeholder at `script.js:7617`: "Move your first allocation to see this version's projection."

Issues across reviewers:
- Imperative tone (Writing MAJOR)
- Frames not-allocating as incomplete (Ethics POLISH)
- Generic-procedural template (Detection MAJOR)
- Dead air, no ethical continuity (Narrative Design MAJOR)
- Lacks identity-focused voice (Detection POLISH)
- Empty `<dt>` semantic issue (UX MAJOR — UX Flow's surface to fix)

**Suggested EN rewrite:** "This projection reflects choices yet to be made. Allocate above, and the profile updates to match."

Or simpler: "Allocate above. This projection updates as you choose."

Pick whichever lands cleaner. Translate to zh/ja/ko/tr. Replace the LOOP_REQUEST with completion note.

**Secondary — Psychology MAJOR (stability-caretaking contradiction):**

R17 Narrative tagged 2 stability entries (4444, 4446) and 1 caretaking (4451) in the "later" bucket. These represent mutually exclusive theories of late-life personality.

**Fix options:**
- (A) **Add `life_shape: 'mixed'` marker** to the umbrella entry at 4445 ("A working life takes shape...") so R18 selection treats it as the multi-shape default rather than untagged. (Closes Narrative Design POLISH too.)
- (B) **Revise the affective-narrowing line at 4448** to accommodate both theories: "Affective expression often shifts; sometimes narrows, sometimes deepens" — psychology POLISH + Risk MAJOR converge here.

Pick both if budget allows. ~10 lines.

**Tertiary — Risk MAJOR (affective-narrowing language):**
Reframe line 4448 per Risk MAJOR suggestion. Overlaps with Secondary's (B) option.

Strict <80 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

Likely NO CHANGE. If a small alignment opportunity surfaces (e.g., a HISTORY_CARDS reference to the LIFE_SHAPES anti-normative framing), pick it up. Otherwise NO CHANGE.

Max <30 lines.

---

## UX FLOW

**Primary — UX MAJOR (DL semantic break):**

Current placeholder render uses empty `<dt>` + `<dd>` inside the projection definition list. **Fix:** Replace with a `<div class="projection-gated-placeholder" role="status">` block OUTSIDE the `<dl>` (or render conditionally — when gated, the `<dl>` doesn't render at all and the placeholder takes its place).

~10-15 lines.

**Secondary — Risk MITIGATION (LIFE_SHAPES framing visibility):**

R17 Risk Analyst recommended moving anti-normative framing from code comments into visible microcopy. Add a one-line subtle note near the trajectory-render site noting "These are observable patterns, not optimization targets."

Or defer to R18 — it depends on R18 wiring LIFE_SHAPES selection. **Defer.**

Strict <40 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

**Primary — SOCIOLOGY MAJOR (cosmetic-maintenance framing):**

Line 9402 frames cosmetic-maintenance normalization as developmental milestone. R6 World Design reframed this in regulatory copy as structural pressure; the milestone copy drifted back. **Fix:** Match the structural-causation language used elsewhere — "Cosmetic-maintenance normalization persists, driven by institutional pressure on female-presenting bodies" (or similar — refine for natural prose).

5 langs if i18n'd. ~5-10 lines.

**Secondary — SOCIOLOGY POLISH:**
Lines 9391/9407 passive-individual framing → structural language. ~3-5 lines.

Strict <40 lines.

---

## Cross-cutting deferrals (R18+)

- **LIFE_SHAPES selection wiring** (Systems R18) — Now Narrative populated tags + Systems must implement shape-aware selection.
- **PROJECTION_GATE_ENABLED flag flip** (UX Flow R18) — Once cross-mode generateCount fix lands + copy is finalized, R18 can enable the gate.
- **"Move consent-awareness AFTER projection"** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
