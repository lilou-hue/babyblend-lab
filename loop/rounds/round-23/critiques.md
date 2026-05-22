# Round 23 — Reviewer Critiques (26 issues)

13 reviewers. **Dominant convergence (8 reviewers): the conservative scope created an asymmetry problem worse than the no-op it tried to fix.**

- **8-reviewer convergence on asymmetric coverage** (UX MAJOR + Ethics POLISH + Sociology MAJOR + Psychology POLISH + Product MAJOR + Risk MAJOR + Narrative Design MAJOR + Plausibility MAJOR): tagging only stability creates a hierarchy where stability codenames see coherent childhood narratives while precarity/caretaking/interruption/bloom hit silent fallback. Several reviewers recommend either (A) add tags for non-stability shapes, (B) revert and untag, or (C) disable filter at 0-29.

- **4-reviewer convergence on developmental-psych concern** (Ethics MAJOR + Science MAJOR + Psychology MAJOR + Risk MAJOR): linking infancy rhythm / adolescent identity to adult life shape via tag reifies temperament-as-destiny — contradicts R17 principle that "early/mid stay untagged because shape divergence hasn't emerged" and the project's anti-determinism stance.

- **2-reviewer concern on silent fallback visibility** (Plausibility MAJOR + Plausibility POLISH): code silently falls back to unfiltered pool when a shape has 0 entries; no boot audit reports coverage gaps.

---

## 1. UX REVIEWER

**MAJOR:** Filtering for non-stability shapes in ages 0-29 returns empty, forcing fallback to untagged pool where all shapes see identical generic text, breaking narrative coherence for 4 of 5 life shapes at early/mid ages. **Recommendation:** Either (a) add bloom/precarity/caretaking/interruption entries to early/mid ADULT_TRAJECTORY_MILESTONES in R24, or (b) disable shape filtering entirely at 0-29 and document that coherence begins at age 30 only. (script.js:8910-8918)

**POLISH:** Loop request comment understates severity by saying entries "Cannot be tagged from current pool" without noting this leaves 80% of shapes without narrative coherence at ages 0-29. **Recommendation:** Revise comment to explicitly flag that R24 must add shape-divergent entries to early/mid or accept that narrative shape-matching only works at age 30+. (script.js:4403-4407)

---

## 2. ETHICS REVIEWER

**MAJOR:** Tagging infancy rhythm-stabilization (age 0-4) as `stability` creates a deterministic narrative linking infant physiological patterns to adult life-course outcomes. The phrase "sleep and feeding rhythms stabilizing" describes universal developmental processes that occur in all healthy infants—not a harbinger of settled adult trajectories. This risks reifying the myth that early behavioral patterns "signal" or "predict" later life shape, undermining the FRAMING statement which explicitly disclaims predictive destiny. **Recommendation:** Remove the `life_shape: 'stability'` tag from the early infancy entry. Defer all early-bucket tagging until R24 adds structurally divergent entries (economic stress, early caregiving load, illness/upheaval) that genuinely diverge by life-shape. (script.js:4435-4474)

**POLISH:** The asymmetric coverage—only `stability` appears in early/mid buckets (3 entries per language), while precarity, caretaking, interruption, and bloom remain at 0—accidentally establishes stability as the "default-traceable" trajectory visible across all life stages. **Recommendation:** Add a comment guard that explicitly names this asymmetry as a data-collection bias requiring equal coverage in R24. (script.js:4404-4408)

---

## 3. SCIENCE REVIEWER

**MAJOR:** The R23 tagging of "rhythm-stabilizing infancy" as `life_shape: 'stability'` commits an **anachronistic category error**. Infant temperament regularity is a normal developmental milestone, not a predictor of adult life-shape trajectories. Temperament-regulation studies (Thomas-Chess, Rothbart) show early rhythmicity is malleable and not predictive of adult "stability" outcomes. The LIFE_SHAPES taxonomy explicitly disclaims grounding in developmental psychology, yet R23 applies it backward to infancy as if rhythm-stability foreshadows adult settlement patterns. This violates the R16 commitment that early/mid buckets are "pre-adult developmental milestones" that "intentionally stay untagged." **Recommendation:** Remove `life_shape: 'stability'` from the infancy rhythm-stabilizing entry; document in LOOP_REQUEST(R24) that adding shape-tags to early development requires developmental-psychology evidence, not narrative analogy. (script.js:4435-4474)

**POLISH:** High-school identity consolidation and early-career signals are tagged as `life_shape: 'stability'` based on language ("solidifying," "clarify") without evidence that adolescent identity commitments predict adult settlement. Developmental psychology (Marcia, Erikson) treats these as provisional and frequently revised. **Recommendation:** Either (a) remove `life_shape: 'stability'` from the mid entries, OR (b) add complementary `life_shape` tags for identity-revision in the mid bucket to reflect actual developmental variability. (script.js:4481-4489)

---

## 4. WRITING REVIEWER

**MAJOR:** Entry 3 (early career signals) frames trajectory-opening (initial attempts appearing), not stability-settling. Stability should mark when the shape has settled, not when signals are first emerging. This contradicts the established "stability = recognizable settled shape" pattern from the later bucket. **Recommendation:** Retag Entry 3 as shape-neutral (untagged string) to match other exploratory mid-bucket entries, OR rephrase to "Career identity stabilizing into recognizable focus." (script.js:4489, 4498, 4507, 4516, 4525)

**POLISH:** Entry 1 (rhythm-stabilizing infancy) uses "stabilizing" as process description, not outcome marking. The phrasing is indistinguishable from universal developmental milestones. **Recommendation:** Rephrase to emphasize outcome stability OR untag entirely. (script.js:4438, 4446, 4454, 4462, 4470)

---

## 5. VISUAL DIRECTOR (audit)

**MAJOR:** Audit validates object entries but doesn't enforce structural consistency across languages — a translator could accidentally mix string/object at the same index across en/zh/ja/ko/tr without being caught, breaking shape-aware filtering for one language silently. **Recommendation:** Add a cross-language consistency check in the audit that compares the `typeof` of each array element across all 5 languages at matching indices. (script.js:6427-6441)

**POLISH:** Audit now validates more early/mid object entries; `console.warn` for malformed entries fires unconditionally on every boot. **Recommendation:** Add a guard so the warning only logs if `malformed.length > 0`. (script.js:6445-6446)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Temperament-as-destiny inference: the entry "Temperament profile observable; sleep and feeding rhythms stabilizing" tagged with `life_shape: 'stability'` and filtered by pickAgeTicker based on the codename's assigned adult shape, creates a deterministic linkage between observable infant regulatory patterns and adult trajectory stability. The comment language ("rhythm-stabilizing infancy matches the stable-routine marker") treats infancy rhythm as causal precursor to stability rather than as universal developmental milestone. **Recommendation:** Decouple rhythm stabilization from stability-shape tagging; tag as 'mixed' (shape-neutral) or leave untagged. (script.js:4438, 4435-4437, 8910-8918)

**POLISH:** Asymmetric childhood-developmental coverage reinforces stability as the normative shape. Only the stability shape receives early+mid entries with explicit life_shape tags. **Recommendation:** Add at minimum one early or mid entry per non-stability shape to ensure developmental diversity is visible at all life stages. (script.js:4404-4408)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** R23 tagging treats "attachment patterns forming," "verbal acquisition," and "motor coordination" as truly universal-developmental markers when they are structurally stratified from birth. Sociological research documents that attachment security, language exposure, and fine-motor opportunity differ radically by class, housing stability, parental work precarity, and access to healthcare—yet the early bucket leaves all of these untagged, implicitly normalizing a developmental baseline that actually presupposes stable resources. **Recommendation:** Add a marker comment in the early bucket acknowledging that untagged entries describe an idealized developmental trajectory; when R24 adds precarity/caretaking entries, reshape how these "universal" processes are understood. (script.js:4410-4420)

**POLISH:** "Universal-developmental" semantics need clarification — a child in a household with economic stress may have visibly dysregulated sleep and feeding rhythms, making the "rhythms stabilizing" entry factually inaccurate for them. **Recommendation:** Add a comment clarifying that "universal-developmental" means "not bound to a specific adult trajectory shape" rather than "true of all children." (script.js:4398-4408)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** CJK text reflow in `.scrubber-ticker` due to insufficient `padding-right: 4px` for scrollbar space reservation. **Recommendation:** Increase to 12px or use `scrollbar-gutter: stable` (CSS 2024) to reserve gutter space regardless of scrollbar visibility. (style.css:1129)

**POLISH:** Codename placeholder ID `codename.placeholder` may lack localization coverage in some language packs. **Recommendation:** Either ensure all language translation files include translations or generate the codename dynamically. (index.html:465)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Silent fallback to mixed-shape pool when shape coverage is asymmetric. If a codename hashes to a shape with zero entries in that bucket, the filter wipes the pool and silently reverts to the original mixed-shape pool. This breaks narrative consistency—a "precarity" codename may display "stability" milestones without any warning. **Recommendation:** Track fallback events and log to console.warn when a shape has zero entries in any bucket. Add a guard so narrative inconsistency is visible during testing. (script.js:8917)

**POLISH:** Boot audit validates shape names but doesn't detect coverage gaps. **Recommendation:** Extend boot audit to track coverage by shape-bucket pairs and warn if any non-mixed shape has zero entries in early/mid: "Shapes missing early/mid coverage: [precarity, interruption, bloom, caretaking]". (script.js:6442-6447)

---

## 10. DETECTION AGENT

**MAJOR:** LOOP_REQUEST phrasing uses meta-instruction language ("cannot be tagged from the current pool — needs addition") that reads like an AI planning template. The parenthetical list of entries is prescriptive engineering-speak. **Recommendation:** Reframe as narrative-focused: "To cover precarity/caretaking/interruption/bloom in early/mid development would require entries around household economic stress, early caregiving roles, childhood upheaval, or late-bloomer markers." (script.js:4401-4408)

**POLISH:** Inline comment at lines 4397-4400 duplicates reasoning already present in the const-level docstring. **Recommendation:** Remove the inline comment entirely and rely on the docstring's consolidated explanation. (script.js:4397-4400)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Silent filter fallback creates false asymmetry — stability codenames get partial early/mid coverage (16-33%) while interruption/bloom/precarity/caretaking get 0% at ages 0-29, triggering invisible fallback to generic pool. UX perceives "stability is coherent; others are generic." **Recommendation:** Either (a) ship zero tags in early/mid until all 5 shapes have coverage to maintain parity, or (b) disable the filter fallback for shapes with <50% coverage to make the gap explicit. (script.js:8917)

**POLISH:** Partial coverage (25% of early/mid pool tagged) creates product decision debt — users now expect all shapes covered. **Recommendation:** Add a console warning or UI note at state initialization if a codename's shape has <30% coverage in its current age bucket. (script.js:8910-8918)

---

## 12. RISK ANALYST

**MAJOR:** Tagging rhythm-stabilizing infancy as shape-correlating risks reifying "stable early patterns → stable adult outcome" as the default narrative arc, implicitly pathologizing deviant infancies (irregular sleep, feeding difficulty, colic, early disruption) as requiring external explanation rather than as ordinary variation. The framing comment states "other early entries are universal-developmental" but the tag placement itself says: stability is the shape-bearing milestone. **Recommendation:** Either (a) in R24 add untagged "caretaking" or "interruption" markers to early bucket, OR (b) add a FRAMING amendment explicitly stating: "Tagged 'stability' entries are narrative choices for demonstration; the untagged entries describing typical development are not implicitly stability-aligned." (script.js:4435-4437)

**MITIGATION:** Asymmetric shape coverage creates silent coverage illusion (codenames with other shapes fall back to untagged universal-developmental pool; UX readers infer "this shape doesn't have early-life markers"). **Recommendation:** Add a SCOPE NOTE to pickAgeTicker that explicitly states untagged entries in early/mid are NOT stability-biased defaults — they are neutral until other shapes receive tagged entries. (script.js:8903-8909)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The "rhythm-stabilizing infancy → identity solidifying → early career signals" arc creates narrative asymmetry—only stability shape is traceable across ages 0-29; the other 4 shapes have zero early/mid entries and trigger silent filter fall-through, breaking shape coherence for at-risk/divergent trajectories. **Recommendation:** R24 must add at least one entry per non-stability shape to early/mid OR R23 should be reverted to preserve the R17 principle that early/mid are pre-adult and shape-neutral. (script.js:4405-4408, 8903-8909)

**POLISH:** The conservative scope (3 tags only) abandons narrative coherence at a structural juncture. The 3 stability tags inadvertently created a "stability tax" where other shapes must now compete for inheritance via unfiltered fallback. **Recommendation:** Reframe R24 not as "add new entries" but as "expand the 3 R23 seeds to cover all 5 shapes," treating early/mid tagging as a discrete narrative design phase. (script.js:4399-4408)
