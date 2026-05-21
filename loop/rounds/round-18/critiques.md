# Round 18 — Reviewer Critiques (26 issues)

13 reviewers. Strong convergences:
- **7 reviewers on codename-deterministic life_shape risk** (Ethics POLISH + Science MAJOR + Psychology MAJOR + Sociology MAJOR + Plausibility MAJOR + Risk MAJOR + Narrative Design MAJOR): per-codename seededRand lock-in reads as destiny/innateness; framing comment is code-only and the disclaimer isn't surfaced in UI.
- **4 reviewers on gate copy framing** (Ethics MAJOR + Writing MAJOR + Detection MAJOR + Risk MAJOR): "Allocate above" reads imperative; gate's `budgetUsed === 0` precondition creates performative necessity contradicting R17rev's "invitation, not prerequisite" goal.
- **2 reviewers on shape coverage asymmetry** (Science POLISH + Psychology POLISH): `interruption` has 0 entries; `stability` overrepresented vs. other shapes in later bucket.

---

## 1. UX REVIEWER

**MAJOR:** Life_shape selection is ineffective in early/mid age buckets (0-29 years) because ADULT_TRAJECTORY_MILESTONES entries in those buckets contain only untagged strings, not objects with life_shape properties. The filtering in pickAgeTicker() (lines 8736-8740) will always return the original unfiltered pool for ages 0-29, making the feature silently non-functional at those ages even though pickCodenameLifeShape() correctly assigns a shape. Users testing the aging scrubber won't see visible milestone changes by codename until age 30+. **Recommendation:** Tag early/mid bucket entries in ADULT_TRAJECTORY_MILESTONES with life_shape properties to match the "later" bucket pattern, or document the feature as "later-life-only" and suppress age scrubber visibility before age 30 in adult mode. (script.js:4364-4451, 8736-8740)

**POLISH:** pickCodenameLifeShape() performs Object.keys(LIFE_SHAPES).filter() on every call, and it's invoked on every age scrubber input event in pickAgeTicker(). For improved performance, the shapes array should be computed once at module initialization rather than on every ticker pick. **Recommendation:** Move `const LIFE_SHAPES_KEYS = Object.keys(LIFE_SHAPES).filter(k => k !== 'mixed');` to a module-level constant computed after LIFE_SHAPES definition, then use LIFE_SHAPES_KEYS in pickCodenameLifeShape(). (script.js:8707-8718)

---

## 2. ETHICS REVIEWER

**MAJOR:** The projection gate's condition (`budgetUsed === 0`) creates performative necessity for allocation despite linguistic framing. The gate suppresses the behavioral projection panel until the user makes an allocation, then immediately reveals it. This inverts the stated R17rev goal ("making allocation feel like a quiet invitation rather than a required first step") because the gate structure itself demonstrates that allocation is the necessary precondition for seeing the projection. The gate should either (a) fire on render without requiring allocation, or (b) its placeholder should not mention allocation as a prerequisite. **Recommendation:** Remove `budgetUsed === 0` from the gate condition (line 7632) so the gate fires only on `inAdult && adultGen === 1` regardless of allocation state. Keep the placeholder text to reinforce projection-as-hypothesis, not as output-pending-action. (script.js:7632)

**POLISH:** Deterministic codename-to-life_shape assignment (via seeded RNG at line 8716) creates a fixed narrative destiny despite framing disclaimers. Each baby's codename generates a single life_shape that filters all subsequent adult milestones, producing a coherent but predetermined arc. This contradicts the project's foundational "genes aren't destiny" message and the LIFE_SHAPES framing comment's explicit disavowal of determinism. **Recommendation:** Either (a) randomize the life_shape selection at render time so the same codename can show different narrative shapes across sessions (trade: loses "coherent arc" consistency), or (b) add a comment clarifying that while the mapping is deterministic, the user is not seeing their baby's "real" future but one among many possible narratives — and explicitly note that re-rendering in different modes/ages will surface other shapes from the untagged/mixed pool. (script.js:8712-8718 and the framing comment at 4343-4352)

---

## 3. SCIENCE REVIEWER

**MAJOR:** Codename-deterministic shape assignment risks implying genetic/innate determination of life trajectory, contradicting the documented framing that LIFE_SHAPES are narrative metaphors driven by structural conditions, not essentialist outcomes. The seededRand(codename + '|life-shape') mechanism locks each baby into one shape from boot, creating a persistent narrative that "this codename has stability/precarity/etc." as an inherent characteristic. This undermines the critical distinction in the FRAMING block (script.js:4343-4352) that precarity and caretaking are trajectory *shapes often produced by structural conditions*, not personality-determined outcomes. For end users, a deterministic shape-per-codename may read as "your baby was genetically/inherently destined for this trajectory from the start," inverting the design intent. **Recommendation:** Add a narrative disclaimer inline in pickAgeTicker() or renderAgingScrubber() explaining that milestone selection is filtered for coherence across renders, not because any life trajectory is predetermined, and explicitly surface the contingency of shape assignment. (script.js:8720-8761)

**POLISH:** The `interruption` shape is defined in LIFE_SHAPES but has zero tagged entries in ADULT_TRAJECTORY_MILESTONES, creating an asymmetry: 5 of 6 shapes have narrative representation. When a codename is seeded to `interruption`, the filter in pickAgeTicker() will not find any matching entries and will silently fall back to the unfiltered pool, breaking the coherence promise. This is safe (fallback avoids crashes) but silent: the user receives no signal that interruption-shaped milestones don't exist yet. **Recommendation:** Either (1) add one representative interruption entry to the `later` bucket (e.g., "A period of illness, loss, or external disruption pauses forward motion; identity and goals are reoriented once the disruption eases." with life_shape: 'interruption'), or (2) filter out 'interruption' from pickCodenameLifeShape() to prevent assignment of an unsupported shape, with a console warning explaining the deferral. (script.js:8712-8718)

---

## 4. WRITING REVIEWER

**MAJOR:** Shape-aware milestone selection creates narrative discontinuity across lifespan. When a codename is assigned a specific life_shape (e.g., "stability" or "precarity"), the milestone text lacks coherence during early (< 13) and mid (13-29) age stages because those buckets contain only generic untagged strings. Shape-filtering only applies to the later bucket (30+), forcing the same codename to experience mismatched narrative identity across developmental stages. This breaks the core R18 promise of "one coherent set per codename." **Recommendation:** Extend shape-aware tagging to ADULT_TRAJECTORY_MILESTONES early and mid buckets (lines 4364-4452). Tag or restructure Early and Mid milestone entries with { text, life_shape } objects matching the Later bucket pattern, then update pickAgeTicker() to filter by life_shape in all buckets, not just lines 8734-8742. (script.js:4364-4514 and 8720-8761)

**POLISH:** The placeholder copy "This projection reflects choices yet to be made. Allocate above, and the profile updates to match." uses active imperative framing ("Allocate above") that conflicts with the documented cold/clinical/contingency tone intended for Adult mode. The construction reads directive rather than descriptive, weakening the clinical register. The verb "Allocate" places agency on the user in a way that feels more imperative than the goal state comment suggests. **Recommendation:** Reframe to passive/observational voice: "Behavioral projection emerges from choices above. The profile will update to reflect allocations." Or maintain contingency: "This projection will reflect choices you make. Update allocations above to regenerate." (script.js:1185-1189)

---

## 5. VISUAL DIRECTOR

**MAJOR:** The placeholder is styled as a `<dt>` but spans the full grid width (matching `.burden-disclaimer`), breaking the expected `auto 1fr` rhythm. Unlike `.burden-disclaimer` which has a 2px left border + warm amber accent to frame it as a distinct affordance, the placeholder has zero visual framing — just centered italic text. At 13.5px (vs burden-disclaimer's 11px), it's larger but less visually anchored, creating visual confusion about whether it's a data row or a notice. The placeholder's opacity (0.7) and color (ink vs ink-mute) make it feel like partially-present data rather than a held-back UI prompt. **Recommendation:** Add a 2px left border with warm accent (or cyan for Adult mode consistency) and reduce padding-left to 10px to signal "affordance, not data." (style.css:3355-3357)

**POLISH:** Font size mismatch — placeholder at 13.5px is larger than both `.burden-disclaimer` (11px) and `.ocean-sep` (10.5px). When the gate is live (first render, no allocation yet), this oversized centered italic text dominates the panel, creating visual weight inversion: the placeholder feels more important than the dt/dd stats rows it's replacing. **Recommendation:** Reduce font-size from 13.5px to 11px to match `.burden-disclaimer` family and create rhythmic harmony with `.ocean-sep`. (style.css:3341)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Deterministic seeding locks each baby into one immutable life_shape across all panel renders, creating a fixed "personality archetype" that contradicts developmental psychology principles of plasticity, agency, and emergent self-formation. This reduces the baby to a predetermined category rather than a simulated being whose trajectory could vary contextually. **Recommendation:** Remove the shape-based filtering (lines 8734-8742) and allow pickAgeTicker to draw from the full pool, or implement shape as a *variable* influenced by prior choices/outcomes rather than codename-deterministic. (script.js:8734-8742)

**POLISH:** The 'later' bucket shows severe shape coverage gaps: 'interruption' has 0 explicit entries (falls back to 4 untagged defaults), while 'stability' has 2. This overrepresents stable settlement and underrepresents recovery/disruption narratives, biasing adult trajectories toward settled outcomes. 'Interruption' deserves parity with 'stability' to honor non-linear recovery patterns. **Recommendation:** Add 1-2 'interruption'-tagged milestones to the 'later' bucket (e.g., "Career restart after family upheaval; identity rebuilds around new priorities") to restore narrative balance across all 5 shapes. (script.js:4453-4464)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** Hidden deterministic shape-locking individualizes structural outcomes. Each codename receives a deterministically assigned life_shape (via seeded RNG at line 8716: `seededRand(codename + '|life-shape')`). This silently filters the adult milestone pool (line 8739-8740) to show only narratives matching that shape. However, the UI never displays which shape was assigned to the baby, and the milestone text itself reads as individual agency ("they bloom late," "identity reorganizes," "economic precarity persists") rather than structural determination. The framing comment (4343-4352) correctly identifies precarity and caretaking as "produced by structural conditions," yet the locked per-codename assignment — invisible to the user — makes the filtered narrative appear as personal destiny rather than illustrative of how structural conditions produce different trajectory shapes across the population. **Recommendation:** Either (1) explicitly display which life_shape this baby received and why (surface the structural determinism), or (2) randomize shape selection per-render in adult mode so the same codename can explore multiple trajectory shapes across generations, making visible that the *shape itself is not individual but structural*. (script.js:8712-8741, 8734)

**POLISH:** Milestone entries tagged `life_shape: 'mixed'` aren't actually treated as defaults — they're explicitly filtered at line 8739. The single entry "A working life takes shape…" carries `life_shape: 'mixed'` but still passes all filters. The R17rev note (4339-4341) claims mixed "is treated as the multi-shape default" but the code semantics are ambiguous: `if (!e.life_shape || e.life_shape === 'mixed')` treats untagged and explicitly-mixed entries identically, yet they mean different things (untagged = pre-structural narrative; mixed = plural-structure-aware narrative). **Recommendation:** Add a comment clarifying the semantics, or refactor to distinguish explicitly: entries without `life_shape` field = universal (untagged); `life_shape: 'mixed'` = deliberately plural (show the structural branching). (script.js:8736-8740)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** `<dt role="status">` creates semantic override confusion; `<dt>` elements in definition lists should only contain definition terms, not status messages. The ARIA role contradicts the element's structural purpose and can cause screen readers to misannounce context or skip expected definition-list semantics. **Recommendation:** Replace `<dt role="status">` with a semantically neutral `<div role="status" aria-live="polite">` or `<p role="status" aria-live="polite">` that is styled to match visual presence. This preserves the definition-list contract for actual stat terms while using correct semantic markup for the status announcement. (script.js:7642)

**POLISH:** The `role="status"` lacks explicit `aria-live="polite"` attribute, relying on implicit live-region default behavior. iOS VoiceOver and Android TalkBack may not announce the placeholder on first panel render — users must manually focus or re-explore. Adding explicit `aria-live="polite"` ensures consistent announcement across all screen readers on initial load. **Recommendation:** Add `aria-live="polite"` to the placeholder element. (script.js:7642)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** Per-codename deterministic life shape assignment via seededRand contradicts biological reality — adult trajectories are stochastic, shaped by environment and chance, not destiny-encoded in a name. The framing language (line 4343) correctly marks LIFE_SHAPES as "simulational metaphors," but the implementation encodes them as deterministic traits tied to codename identity, creating a subtle misrepresentation that determinism equals biological inevitability. **Recommendation:** Either (a) randomize life shape selection per render to reflect genuine stochasticity, or (b) add UI disclosure stating "This person's life shape is *one possible narrative path*, not a biological forecast; environment and choice reshape these arcs." (script.js:8712-8718)

**POLISH:** Emotional and appearance weights (1.0) lack justification against behavioral genetics consensus. Neuroticism heritability (~40% per Polderman et al. cited at line 10745) matches extraversion, yet emotional=1.0 while sociability=0.4. Appearance's actual heritability varies by trait (height ~80% vs. facial symmetry ~50-75%), not blanket 1.0. **Recommendation:** Add explanatory note: "Emotional and appearance weights (1.0) reflect *lock-in breadth* (identity self-perpetuation), not heritability percentages; neuroticism is ~40% heritable but emotional identity cascades across generations differently than pure trait inheritance." (script.js:10753)

---

## 10. DETECTION AGENT

**MAJOR:** "Allocate above" is jargony and abstract — tech-speak that clashes with the warm, relational voice of closing affirmations ("They might surprise you", "What emerges will be partly theirs"). The verb doesn't acknowledge the human choice at play; it reads technical. **Recommendation:** Replace "Allocate above, and the profile updates to match" with language that echoes the closing affirmations' warmth: "Add your choices above, and the picture comes into focus." Or: "Shape it above, and the person emerges." (script.js:1185)

**POLISH:** "This projection reflects choices yet to be made" buries agency in passive, abstract language. "Reflects" and "yet to be made" are distanced from the user. The template-adjacent rhythm mirrors the flagged eugenics-as-positivity pattern. **Recommendation:** Front agency and immediacy: "This picture waits for your choices" or "These profiles shift as your choices settle." Matches the active voice of "What emerges will be partly theirs" by making the user's role visible. (script.js:1185)

---

## 11. PRODUCT REVIEWER

**MAJOR:** Lost state on save/restore breaks disclosure workflow — user saves a timeline after first Adult generate, loads it back, and sees Societal Brief/Divergence/Sibling Cohort/Trait History vanish because `adultGenerateCount` is not persisted. `saveCurrentTimeline()` does NOT save adultGenerateCount and `loadTimeline()` does NOT restore it. The 4 reveal panels gate on `adultGenerateCount < 2`, so a loaded timeline at gen 1 re-hides everything the user already saw. **Recommendation:** Add `adultGenerateCount: state.adultGenerateCount` to the saved snapshot in `saveCurrentTimeline()` (line 10288) and restore it in `loadTimeline()` (after line 10356). (script.js:10267-10373)

**POLISH:** Simultaneous panel reveal on second Adult generate feels abrupt — all 4 analytical panels (Societal Brief, Divergence, Sibling Cohort, Trait History) hide when `adultGenerateCount < 2`, so they all appear at once on the second generate. Consider staggering the gate threshold to create a sense of progressive discovery rather than a sudden feature unlock. **Recommendation:** Adjust gate conditions in `renderSiblingCohort()` (line 9779) and `renderTraitHistory()` (line 9846) to use higher thresholds (e.g., `>= 3` and `>= 4` respectively). (script.js:9779, 9846)

---

## 12. RISK ANALYST

**MAJOR:** Codename-deterministic life_shape assignment creates immutable life trajectory framing despite narrative-taxonomy disclaimers existing only in code comments. The pickCodenameLifeShape function (seeded by codename alone) assigns one non-'mixed' shape (stability, interruption, bloom, precarity, or caretaking) that cannot be changed after codename creation. This shape then filters all ADULT_TRAJECTORY_MILESTONES visibility in pickAgeTicker, reinforcing perception that the shape is predetermined/innate rather than contingent narrative. Vulnerable users reading "identity-reorganized-via-care-obligation" or "persistent-precarity" as assigned shapes may interpret these as clinical predictions or essential identity traits rather than story metaphors. **Recommendation:** Add non-dismissible UI disclosure in Adult mode when a shape-filtered milestone is rendered, stating "This trajectory reflects one possible path among many — allocation choices, life events, and environment shape the actual outcome." Alternatively, decouple shape selection from codename determinism. (script.js:8712-8718, 8728-8742, 4343-4352)

**MITIGATION:** Gate copy imperatives ("Allocate above") combined with mode-asymmetric contingency affirmation creates instructional framing risk. Adult mode users see the gate placeholder "Allocate above, and the profile updates to match." but never see REFLECTION_ARC_CLOSING_AFFIRMATION ("What emerges will be partly theirs, partly circumstance, entirely real."). The second-person imperative may read as instructional/prescriptive despite code comments noting it was rewritten as an "invitation." **Recommendation:** (1) Revise gate copy to remove imperative: "This projection is provisional — it will shift as you make choices." (2) Extend REFLECTION_ARC_CLOSING_AFFIRMATION or equivalent contingency statement to Adult mode. (script.js:1185, 7618-7650, 6482-6488)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** Narrative silence around codename-deterministic life shape lock-in at the gate. When users first allocate budget at adultGen=1, the placeholder copy reads "This projection reflects choices yet to be made. Allocate above, and the profile updates to match." This frames the moment as genuinely contingent — the user's allocation *will shape* the trajectory. However, the codename's life shape is already deterministically locked before allocation, meaning the trajectory's fundamental shape (stability, interruption, bloom, precarity, or caretaking) has been predetermined. The gate provides no narrative bridge explaining the relationship between allocation-malleable OCEAN and shape-locked trajectory. **Recommendation:** Add a narrative bridge in the gate placeholder or post-reveal copy clarifying what allocation reshapes (OCEAN, projection) versus what is structural-pattern (trajectory shape). Avoid claiming "your choices shape everything" when shape is locked. (script.js:1185, also consider adding post-reveal text at line 7650)

**POLISH:** Narrative reflection arc lost when adult mode lacks Inner Cohort and Lifetime Drift panels (currently reflection-mode only). Adult users never see how the OCEAN traits and life shape shape behavior across relational and temporal contexts, so the trajectory feels incomplete — a siloed adult snapshot rather than a life arc. **Recommendation:** Port the Inner Cohort and Lifetime Drift panels into adult mode as post-trajectory summary rows, or add a "Reflection View" toggle. (script.js:7624 + renderInnerCohort at 9592)
