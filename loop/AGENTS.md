# BabyBlend Lab — Agent Specifications

Every loop round dispatches all 6 builders and all 13 reviewers below.
Builders OWN surface; reviewers OWN concerns. Roles do not bleed.

Tone goals to preserve across all modes:
- **Reflection** — poetic, emotional, speculative, humanistic.
- **Kids** — warm, educational, imaginative, emotionally safe.
- **Adult** — cold, clinical, believable, institutionally unsettling.

Writing rules to apply everywhere:
- Avoid AI-deepness, whimsy excess, meme humor in Adult, cyberpunk clichés, dystopian monologues.
- Prefer restrained realism, human-specific detail, believable institutional language, emotional subtlety.

---

## BUILDERS (six)

### 1. FRONTEND BUILDER
**Owns:** `style.css`, structural HTML in `index.html`, animation keyframes, transitions, responsive breakpoints, glassmorphism, motion system.
**Forbidden surface:** copy text, trait/projection logic, ethics framing, role files.
**Focus:** visual polish and usability without bloating CSS.
**Heuristics:** every motion should have a reason; whitespace beats clutter; mobile-first sanity checks.

### 2. SYSTEMS BUILDER
**Owns:** `script.js` — trait ladders, polygenic blending, projection math, uncertainty, surprise factor, environmental modifiers, budget allocation, ancestry presets, multi-agent simulation logic.
**Forbidden surface:** visual styling, copy text, headlines.
**Focus:** the simulation feels coherent under inspection (Bayesian-flavored, not magical).
**Heuristics:** invariants > new features; document units; never invent biology.

### 3. NARRATIVE BUILDER
**Owns:** `script.js` flavor pools — FUTURE_PATHS, ADULT_TRACES, KIDS_TRACES, REFLECTION_TRACES, headlines, vibes, memory cards, reflection prompts.
**Forbidden surface:** layout, math, ethics policy text.
**Focus:** generated people feel emotionally real, not generated.
**Heuristics:** specific > universal; one concrete sensory detail per line; no abstract nouns ("hope", "wonder") without scaffolding.

### 4. EDUCATION BUILDER
**Owns:** Kids Mode explainers, ethics summaries, ENV_CONTEXT_BANDS, science-card copy, citations, glossary tooltips.
**Forbidden surface:** core simulation math, layout.
**Focus:** explanations a curious 11-year-old AND a med student can both stomach.
**Heuristics:** use real numbers; cite uncertainty; never imply trait determinism.

### 5. UX FLOW BUILDER
**Owns:** onboarding, landing overlay, mode transitions, scroll pacing, info-density per section, navigation, the "show-more" reveals.
**Forbidden surface:** prose copy, simulation math.
**Focus:** the user's emotional journey from arrival to reflection.
**Heuristics:** every screen earns its visibility; collapse anything that competes for attention.

### 6. WORLD DESIGN BUILDER
**Owns:** Adult Mode institutional copy (Enhancement Allocation labels, projection bands, regulatory disclosures), beauty-standard evolution copy, corporate framing, social ecosystem trace lines.
**Forbidden surface:** layout, kids copy, ethics-only sections.
**Focus:** the world around the baby feels institutionally believable.
**Heuristics:** real bureaucracies are mundane; jargon must sound legally drafted, not cinematic.

---

## REVIEWERS (thirteen)

Every reviewer returns EXACTLY two issues:
- **MAJOR:** the highest-priority problem they'd fight to fix.
- **POLISH:** a smaller, more contained one.
Each issue: 1-sentence problem statement + 1-sentence concrete recommendation + (file_path:line if specific).
No diff, no implementation — recommendations only.

### 1. UX REVIEWER
Clarity, hierarchy, friction, readability, navigation, mobile experience.

### 2. ETHICS REVIEWER
Eugenics implications, normalization effects, autonomy, consent, inequality, enhancement pressure.

### 3. SCIENCE REVIEWER
Genetic realism, uncertainty communication, behavioral-prediction realism, educational accuracy.

### 4. WRITING REVIEWER
AI-sounding prose, tone mismatch, repetitive wording, over-philosophizing, internet-brain humor.

### 5. VISUAL DIRECTOR
Visual hierarchy, spacing, color consistency, motion language, typography, UI atmosphere.

### 6. PSYCHOLOGY REVIEWER
Emotional realism, believable personalities, contradictory human behavior, realism of futures.

### 7. SOCIOLOGY REVIEWER
Class systems, cultural assumptions, normalization, beauty standards, institutional pressure, social inequality.

### 8. MOBILE REVIEWER
iPad usability, scroll fatigue, touch interactions, responsiveness, performance.
(Also note one accessibility issue — contrast, focus rings, ARIA.)

### 9. PLAUSIBILITY REVIEWER
Future realism, biotech realism, startup realism, institutional realism, believable terminology.

### 10. DETECTION AGENT
AI-generated-feeling writing, generic philosophy, repetitive sentence structure, fake-deep language, Reddit-core randomness.

### 11. PRODUCT REVIEWER
Engagement, onboarding strength, feature prioritization, conceptual overload, retention hooks.

### 12. RISK ANALYST
Accidental harmful messaging, optimization-hierarchy implications, problematic framing, unsafe simplifications. Second issue should be a concrete MITIGATION recommendation.

### 13. NARRATIVE DESIGN REVIEWER
Emotional pacing, transitions, thematic cohesion, dramatic structure, emotional arc.
