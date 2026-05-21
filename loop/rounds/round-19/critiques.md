# Round 19 — Reviewer Critiques (26 issues)

13 reviewers. Strong convergences:
- **2-reviewer convergence on disclosure-family visual drift** (Visual Director MAJOR + UX MAJOR): cyan trajectory + cyan projection-gated vs warm-amber burden inside cyan-bordered container; font-size + padding + color-token mismatches.
- **4-reviewer convergence on heritability comment** (Plausibility MAJOR + Ethics MAJOR + Science MAJOR + Sociology MAJOR): "lock-in breadth" rebrand contradicts the actual math (cost × units × weight, single-gen scalar) and doesn't surface structural drivers of cascades.
- **6-reviewer concerns on interruption entry** (Writing MAJOR + Psychology MAJOR + Risk MITIGATION + Sociology POLISH + Narrative Design MAJOR + Ethics POLISH): medicalized; conflates distinct disruption types; presupposes linear recovery; reads fatalistic for permanent loss; arc-structure mismatches other shapes.

---

## 1. UX REVIEWER

**MAJOR:** `.trajectory-disclaimer` uses cyan border (`rgba(126, 224, 255, 0.18)`) while `.burden-disclaimer` uses warm orange/amber (`rgba(255, 210, 138, 0.16)`). This introduces a second accent color family to the disclosure microcopy slots, breaking visual coherence. The `.projection-gated-placeholder` also uses cyan, creating asymmetry: two slots signal with cool cyan (trajectory + gate), one with warm amber (burden). **Recommendation:** Standardize `.burden-disclaimer` to cyan to unify the entire disclosure family under one accent signal. (style.css:3291)

**POLISH:** The heritability-weight documentation (lines 10820–10831 in script.js) spans 12 lines immediately before `const INHERITANCE_BURDEN_WEIGHTS`, consuming 31% of the constant's visual footprint. The block reads as adjacent specification but belongs in a separate JSDoc comment or collapsible reference. **Recommendation:** Move the R19 clarification into a dedicated `/** @docstring */` comment, or relocate to an inline reference that doesn't bloat the define-point. (script.js:10820)

---

## 2. ETHICS REVIEWER

**MAJOR:** Reframing emotional/appearance weight=1.0 as "lock-in breadth" (lines 10820-10831) shifts essentialism from genetic to cultural but does not resolve the Plausibility concern. The comment argues that emotional identity cascades via "parenting style + cultural template" and appearance via "intergenerational appearance pressure" — both described as social/cultural mechanisms. However, assigning these mechanisms weight=1.0 (total non-consensual lock-in) within the simulation still implies they are equally deterministic as genetic factors. The framing risks replacing genetic essentialism with cultural essentialism. **Recommendation:** Clarify that "lock-in breadth" measures *how the simulation models cascading expectation*, not *how strongly those cascades lock children into fixed identities*. Add: "This weight reflects the breadth of intergenerational identity pressure in the game's world, not evidence that emotional/appearance identity is actually deterministic across generations. Real outcomes depend on peer influence, institutional change, and individual agency." (script.js:10820-10831)

**POLISH:** The new interruption-shape milestone entry medicalizes life disruption with "illness, loss, or external disruption" consistent across all 5 languages. This medicalizes structural interruptions (caregiving, job loss, migration, educational deferral) by pairing them with disease/illness. Adjacent caregiving entry frames structural obligation without medical framing. **Recommendation:** Reframe to emphasize structural rather than health dimensions: "A major interruption—job loss, caregiving burden, or unexpected upheaval—pauses forward motion; identity and goals reorient as life restabilizes." (script.js:4473, 4486, 4499, 4512, 4525)

---

## 3. SCIENCE REVIEWER

**MAJOR:** The R19 distinction between "lock-in breadth" and heritability is terminological rebranding rather than conceptual separation. Polderman 2015 puts neuroticism at ~40% heritable; if 60% is environmental, that environmental component already includes parenting style and cultural template (the "cascading" mechanisms cited). Retaining weight 1.0 while invoking these mechanisms re-weights outcome-lock to ~100%, contradicting the heritability baseline. **Recommendation:** Either (a) lower emotional/appearance weights proportionally to neuroticism (~0.4) and facial morphology (~0.6) to be consistent, or (b) explicitly state the weight models *identity-concept lock* separately from *genetic inheritance* with a quantified justification for why identity-cascade breadth = 1.0. (script.js:10820-10831)

**POLISH:** The interruption entry text groups "illness, loss, or external disruption" as synonymous life-interruption causes, but epidemiology treats these as distinct: morbidity (illness), bereavement (loss), and structural shock (external disruption) follow different trajectories and recovery patterns. **Recommendation:** Separate into two or three finer interruption categories, or revise the single entry to acknowledge they are distinct mechanisms reacting to the same outcome (identity reorganization) rather than equivalent causes. (script.js:4473, 4486, 4499, 4512, 4525)

---

## 4. WRITING REVIEWER

**MAJOR:** The gate placeholder ("This projection is provisional...") and trajectory disclaimer ("These are one set of patterns...") operate in UI/system voice — clinical, procedural, framing the simulation structure itself. The interruption life-shape entry operates in narrative voice — observational, human-centered, describing lived patterns. These three pieces coexist in the adult-mode interaction flow but speak with different register, creating tonal whiplash. **Recommendation:** Migrate the gate and disclaimer to more human-centered phrasing while staying grounded in lived experience rather than simulation architecture. E.g., "This shifts as you make choices" (direct, active) and "These patterns are one story among many — not what will happen" (human, not predictive). (script.js:1191, 8840)

**POLISH:** Turkish interruption entry shifts to harshly clinical register. "Dış kaynaklı sarsıntı dönemi" (shock period) and "hizalanır" (are mechanically aligned) read more procedurally cold than EN "A period of...disruption" + "reorient as it lifts." Compare Turkish caretaking entry's relational warmth ("kime ihtiyaç duyulduğu" = who needs them). **Recommendation:** Replace "sarsıntı" with gentler term ("kriz" = crisis, or "zorluk" = hardship), and "hizalanır" with "yeniden biçimlenir" (reshape/reform) to match EN's empathetic observation tone. (script.js:4525)

---

## 5. VISUAL DIRECTOR

**MAJOR:** Burden-disclaimer uses warm-amber border `rgba(255, 210, 138, 0.16)` while projection-gated-placeholder and trajectory-disclaimer use cyan `rgba(126, 224, 255, 0.18/0.22)`. Since burden-disclaimer sits inside `.budget-projections` (which has cyan borders), the warm accent contradicts the container's visual language. **Recommendation:** Change burden-disclaimer border to cyan rgba(126, 224, 255, 0.16) to match the family. (style.css:3291)

**POLISH:** Padding-left values diverge (trajectory: 8px, burden: 10px, projection: 10px) and font-size/line-height are inconsistent (trajectory: 11.5px/1.45, burden: 11px/1.5, projection: 11px/1.5). Color tokens create false hierarchy: trajectory uses `--ink-soft` + opacity 0.78, burden uses `--ink-mute` (no opacity), projection uses `--ink` + opacity 0.7. **Recommendation:** Standardize to font-size 11px, line-height 1.5, padding-left 10px, color var(--ink-mute), and consistent opacity handling across all three. (style.css:1109–1116, 3285–3291, 3366–3373)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** "identity and goals reorient as it lifts" presupposes linear recovery — a person emerges from disruption with clarified identity/goals. But empirically, recovery trajectories are complex: some people don't recover, some recover altered (not merely paused-then-resumed), some experience permanent shift in goal hierarchy without emotional "reorientation." This conflicts with life-course sociology which emphasizes how historical disruptions reshape cohorts unevenly. **Recommendation:** Revise EN entry (and cascade to all 5 langs) from "identity and goals reorient as it lifts" to "identity and goals often shift or reorient when it lifts; the trajectory may resume, alter, or reset." (script.js:4473 EN; 4486 ZH; 4499 JA; 4512 KO; 4525 TR)

**POLISH:** The trio (illness / loss / external disruption) is narrow as examples but defensibly narrow — it covers acute *sudden* interruptions. However, the entry's neighbor (caretaking) already addresses *persistent role interruption*, creating overlap. The interruption entry should narrow or clarify: add "acute" or "sudden" to emphasize temporality (distinguishing from the persistent caretaking arc). **Recommendation:** Revise to: "A period of acute illness, sudden loss, or unexpected external disruption pauses forward motion..." cascading across all 5 languages. (script.js:4473 + 4486/4499/4512/4525)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** "Intergenerational appearance pressure" and "emotional-style transmission via parenting + cultural template" remain agent-centric descriptors rather than surfacing the structural dimension that creates pressure/template. The R19 comment describes the *mechanism* of transmission but doesn't connect these cascades to the *institutional structures* (gendered beauty standards, labor-market-dependent parenting stress, healthcare fragmentation) that generate and sustain appearance pressure and cultural emotional templates. **Recommendation:** Expand the R19 comment to explicitly name one structural mechanism for each cascade: e.g., "emotional-style transmission cascades via parenting style + cultural template *shaped by economic precarity, work expectations, and therapeutic models available in that cohort*; appearance-based identity cascades via intergenerational appearance pressure *sustained by gendered beauty standards, algorithmic amplification, and cosmetic-maintenance normalization*." (script.js:10820-10831)

**POLISH:** The interruption entry reads as individually-contingent ("pauses forward motion") rather than connecting external shocks (recession, healthcare collapse, caregiving crisis) to the structural preconditions that make them interruptive for some cohorts but not others. The EN entry uses phenomenologically neutral language (passive voice, no social anchors). Compare to the precarity entry which explicitly names structural distribution ("not evenly distributed"). **Recommendation:** Revise to name structural conditions: "External disruption — illness, job loss, or family crisis — pauses forward motion. The extent of setback depends on structural access: robust healthcare, family support, and job protection ease reorientation; their absence deepens the interruption." (script.js:4473 + parallel translations)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** The `trajectory-disclaimer` padding (2px 0 2px 8px) combined with border-left (2px) creates a 10px total left inset. Within the 320px max-width `.aging-scrubber` (with 12px 14px padding already applied), this leaves only ~282px of usable text width. The new interruption entry (~115 characters) will wrap excessively on 320-360px viewports, potentially triggering horizontal overflow. **Recommendation:** Reduce `padding-left` from 8px to 4px on `.trajectory-disclaimer`, or apply the inset spacing at the `.aging-scrubber` container level instead to avoid nested padding accumulation. (style.css:1110)

**POLISH:** The trajectory-disclaimer border-left color `rgba(126, 224, 255, 0.18)` has insufficient opacity to provide clear visual affordance on narrow mobile viewports in typical viewing conditions. Additionally, the longer interruption entry text causes the `.scrubber-ticker` to expand inconsistently when that shape is selected, creating layout instability. **Recommendation:** Increase border-left opacity to `rgba(126, 224, 255, 0.32)` for improved mobile contrast, and add `max-height` with overflow handling on `.scrubber-ticker` to normalize trajectory entry rendering. (style.css:1116 and script.js:8811)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** The comment's "lock-in breadth" framing claims weights measure how traits self-perpetuate across generations via parenting and cultural pressure, but the actual calculation is just `cost × allocated_units × weight`, a simple scalar amplification with no generational propagation model. The "breadth" metaphor doesn't align with the math. **Recommendation:** Revise line 10821 to remove "breadth" language and clarify that the weight scales the Index contribution proportionally. Change "LOCK-IN BREADTH (how strongly the trait's *identity* self-perpetuates across generations)" to "LOCK-IN WEIGHT (a proportional scalar reflecting how strongly identity expectations propagate across the simulated three-generation lineage, scaled 0–1 for index contribution)". (script.js:10821)

**POLISH:** The user-facing language ("the weight measures how widely the loss propagates") never clarifies that this is operationalized as a cost multiplier in a single-generation index bar. The developer-side "cascade breadth" reframing is lost. **Recommendation:** Add a clarifying parenthetical to `budget.burden.disclaimer`: "...the weight measures how widely the loss propagates (reflected proportionally in the Index bar), not whether it occurs." (script.js:82 or 10831)

---

## 10. DETECTION AGENT

**MAJOR:** Turkish trajectory-disclaimer uses singular "yalnızca biri" (only one) instead of plural form for "set of patterns" — changes meaning from "one collection among many" to "only one of" which reverses the intended nuance. **Recommendation:** Change to "Bunlar bu kişinin karşılaşabileceği olası örüntüler — bir tahmin değil." (script.js:1187)

**POLISH:** Japanese gate-placeholder uses formal written construction "本投影は暫定的なものである" with "ものである" which sounds stiff and dated for a modern interface — reads like formal documentation rather than direct user communication. **Recommendation:** Simplify to "本投影は暫定的です。選択によって変わります。" (script.js:1191-1193)

---

## 11. PRODUCT REVIEWER

**MAJOR:** When a user loads a saved timeline, the `age` state field is not restored, causing the aging scrubber to reset to default position (17), losing the user's viewing context. Combined with R18's `adultGenerateCount` persistence, the scrubber position is the missing piece of save/restore round-trip integrity. **Recommendation:** Add `age: entry.age ?? 17` to `loadTimeline()` state restoration and persist `age: state.age` in `saveCurrentTimeline()`. (script.js:10371-10443 restore region; 10346 save region)

**POLISH:** The aging scrubber's ticker text doesn't update when a user switches languages mid-session with a generated baby. The ticker calls `pickAgeTicker(age)` which selects localized strings, but `renderAgingScrubber()` is not invoked in the language change handler, leaving stale text visible after switch. **Recommendation:** Add `if (state.codename && state.age !== undefined) renderAgingScrubber();` after line 11210 in the language change handler. (script.js:11153-11234)

---

## 12. RISK ANALYST

**MAJOR:** "Intergenerational appearance pressure: the locked phenotype becomes the family's visual baseline" risks reading as gender-specific burden allocation without explicit mitigation. In lived experience, this burden disproportionately affects girls/women who inherit maternal appearance standards. The comment frames appearance symmetrically (phenotype → baseline) but the narrative risk sits in how users map this to actual family dynamics. **Recommendation:** Add one sentence to the comment acknowledging the gendered reading: "Note: appearance-pressure cascades asymmetrically by gender in real families; this model weight treats all traits neutrally to avoid baking gender-specific burden into the calculation itself." (script.js:10820–10831)

**MITIGATION:** The interruption entry's hopeful frame "reorient as it lifts" risks reading as fatalistic/pathologizing for users who experienced irreversible loss (death, permanent disability, unrecovered grief). The microcopy's passive structure doesn't distinguish between temporary interruption and permanent life-course rupture. **Recommendation:** Revise to separate temporary from permanent impacts: "A period of disruption — illness, loss, or external shock — may pause forward motion; where recovery is possible, identity and goals reorient. Some losses reshape life permanently without 'lifting.'" (script.js:4473 + parallel translations)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The interruption entry describes a two-phase temporal transition ("pauses forward motion; identity and goals reorient as it lifts") while other life shapes describe states or single-phase processes. Interruption is the only shape narrating recovery/reorientation *during* the later-life period, whereas stability/bloom/precarity narrate what the life looks like during that period. This creates an arc-structure mismatch. **Recommendation:** Reframe the interruption entry to describe the *state after interruption*, not the interruption-to-recovery transition itself — e.g., "A disruption in this decade reshapes priorities; what emerges after is different from what was planned." (script.js:4473)

**POLISH:** The bloom and precarity entries are tagged with `life_shape` field in English (lines 4474-4475) but remain as plain strings in zh/ja/ko/tr (4487-4488, 4500-4501, 4513-4514, 4526-4527). This creates asymmetric metadata across languages — interruption is now tagged in all 5 langs (R19 win), but bloom/precarity tags are still EN-only. **Recommendation:** Wrap the bloom and precarity entries in all non-English languages with `{ text: '...', life_shape: 'bloom' }` and `{ text: '...', life_shape: 'precarity' }` objects to match the English pattern and extend R19's coverage to the rest of the later bucket. (script.js:4487, 4488, 4500, 4501, 4513, 4514, 4526, 4527)
