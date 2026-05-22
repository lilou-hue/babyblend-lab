# Round 22 — Priorities (synthesized from 26 critiques)

**HIGHEST PRIORITY: Plausibility MAJOR caught that the R22 Systems aria-live preservation is non-functional.** `statsEl.innerHTML = ...` at line 7729 destroys the placeholder BEFORE the "reuse" logic runs. The intended fix doesn't work. Systems rev MUST address this.

Other convergences:
1. **3-reviewer convergence on aria-live announcement fatigue** (Ethics MAJOR + Psychology MAJOR + Risk MAJOR): even if preservation worked, repeated slider renders + language switches may cause SR re-announcements.
2. **5-reviewer convergence on scrubber-ticker scrolling concerns** (UX POLISH + Visual Director MAJOR + Sociology MAJOR + Mobile MAJOR + Narrative Design POLISH): unstyled scrollbar; missing aria-label; CJK wastes padding; 9em too short.
3. **2-reviewer convergence on reduced-motion fallback** (UX MAJOR + Ethics POLISH): static glow mimics hover.

Plus single MAJORs: Detection MAJOR (Chinese pronoun mismatch); Narrative Design MAJOR (.ocean-sep uppercase compresses SR audio); Product POLISH (appMode + language not persisted).

Strict <80-line diffs.

---

## FRONTEND

**Primary — Visual Director MAJOR (scrollbar styling) + Sociology POLISH (gentle opacity pulse for reduced-motion):**

1. Add `.scrubber-ticker::-webkit-scrollbar { width: 6px; }` + `.scrubber-ticker::-webkit-scrollbar-thumb` styling matching `.decision-list` pattern. ~5 lines.
2. **UX MAJOR fix**: bump `.btn-primary.is-pending-reveal` reduced-motion outline ring to 3-4px / 0.5+ opacity so it's distinguishable from :hover. ~3 lines.
3. **Narrative Design POLISH / Plausibility POLISH**: increase `.scrubber-ticker` max-height 9em → 12em so interruption entry fits without aggressive scroll. ~1 line.

**Secondary — Visual Director POLISH (avatar-glow opacity 0.5 in reduced-motion):**
~3 lines.

Strict <30 lines. CSS only.

---

## SYSTEMS

**PRIMARY — Plausibility MAJOR (fix the broken aria-live preservation):**

The current code at lines 7728-7750:
```js
statsEl.innerHTML = physicalRows + personalityRows;  // ← destroys placeholder
let placeholderEl = document.getElementById(placeholderId);
if (projectionGated) {
  if (placeholderEl && placeholderEl.parentNode === statsEl) { ... }  // never fires
```

`innerHTML` wipes the placeholder BEFORE the reuse logic runs. The element is recreated every render → aria-live subscription broken. Same bug R21 surfaced, still present.

**Fix: detach + reattach pattern.**

```js
// Before innerHTML, detach the placeholder if it exists (preserves its identity).
const existing = document.getElementById(placeholderId);
if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

statsEl.classList.toggle('projection-gated', projectionGated);
statsEl.innerHTML = physicalRows + personalityRows;

if (projectionGated) {
  // Reuse existing element (preserves live-region subscription) or create.
  const el = existing || document.createElement('dt');
  if (!existing) {
    el.id = placeholderId;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
  }
  // Remove .ocean-sep — uppercase + letter-spacing compresses SR announcement (Narrative Design MAJOR).
  el.className = 'projection-gated-placeholder';
  if (el.textContent !== placeholderCopy) el.textContent = placeholderCopy;
  statsEl.appendChild(el);  // re-attaches the preserved element
}
```

This way: existing element is detached BEFORE innerHTML wipes it, then reattached. Element identity (and aria-live subscription) survives.

**Secondary — Narrative Design MAJOR (drop .ocean-sep class):**
Embed this into the primary fix above — when setting `className`, use only `projection-gated-placeholder` (not `ocean-sep`). Frontend needs to verify the visual separator still works without `.ocean-sep`. **Coordinate via LOOP_REQUEST(frontend): verify `.projection-gated-placeholder` alone gives sufficient visual separation now that `.ocean-sep` is removed; if not, define a separator inside `.projection-gated-placeholder`.** ~1 line in Systems; possibly 5 lines CSS in Frontend.

**Tertiary — Ethics MAJOR + Psychology MAJOR + Risk MAJOR (announcement fatigue):**
Add `aria-atomic="false"` and `aria-relevant="text"` to the placeholder element. These limit announcements to actual text changes. ~2 lines.

For language switches: harder. The proper fix would be `aria-live="off"` during the lang-change render then re-enable, but that's complex. **Defer the language-switch case** with a `LOOP_REQUEST(systems): debounce announcement on language change` for R23.

**Quaternary — Product POLISH (appMode + language in save/restore):**
Add to saveCurrentTimeline + loadTimeline: `appMode: state.appMode` / `language: state.language` with fallbacks `?? 'adult'`, `?? 'en'`. ~6 lines.

**Quinternary — Plausibility POLISH (null check):**
Add `if (!statsEl) return;` early guard. ~1 line.

**Detection MAJOR (comment language fix):**
Rewrite "surgically manage" → "carefully preserve and update". ~1 line.

Strict <80 lines. `node --check script.js` MANDATORY.

---

## NARRATIVE

**Primary — Writing MAJOR (Chinese REFLECTION_ARC pronoun):**

Find the REFLECTION_ARC closing affirmation Chinese translation. The current string uses "他们自己" (plural themselves) referring to a singular subject. Fix to "他/她自己" or rephrase to avoid the pronoun issue entirely.

Find via:
```
grep -n "他们自己\|那个人,一部分" script.js
```

Verify the exact line. ~2 lines.

**Secondary — Writing POLISH (Korean trajectory disclaimer punctuation):**

The Korean trajectory disclaimer ends with `。` (Chinese/Japanese period) instead of Korean period (typically `.` or the same period since Korean uses Western punctuation). Find via:
```
grep -n "일어날 일이 아니다" script.js
```

Replace `。` with `.` (Korean uses Western period in modern contexts). ~1 line.

Strict <30 lines. `node --check script.js` MANDATORY.

---

## EDUCATION

NO CHANGE.

---

## UX FLOW

**Primary — Sociology MAJOR + Risk MITIGATION + Psychology POLISH (scrubber-ticker aria-label):**

Add `aria-label` or `role="region"` to the `.scrubber-ticker` element so SR users know the content is scrollable.

Find via:
```
grep -n "scrubber-ticker\|scrubber-text" index.html script.js | head -10
```

Approach:
- If it's a static HTML element, add `aria-label="Milestone description, scrollable"` in 5 langs (LABEL_I18N entry + JS sets it on render).
- Skip if the existing aria already adequately covers it (sometimes scroll-affordance isn't worth adding to AT).

~10-15 lines including i18n.

**Secondary — Product MAJOR (overflow content discovery):**
Optional: add a bottom-fade pseudo-element on `.scrubber-ticker::after` to visually signal "more content below." Frontend territory if you don't want to touch CSS. Skip if Frontend covers it.

Strict <30 lines. `node --check script.js` MANDATORY.

---

## WORLD DESIGN

NO CHANGE.

---

## Cross-cutting deferrals (R23+)

- **Mobile MAJOR — `scrollbar-gutter: stable` or conditional padding** for CJK: held, smaller polish in R23.
- **Mobile POLISH — rename placeholder ID to `baby-stats-projection-gate-placeholder`**: cosmetic, held.
- **Detection POLISH — strip "surround stays still" CSS comment**: cosmetic, can land R23 if it bothers.
- **Science MAJOR — vestibular sensitivity citation**: optional polish; remove vestibular framing OR add WCAG cite. R23.
- **Risk MAJOR aria-live announcement fatigue on slider drag** — partial mitigation via aria-atomic this round; full debounce held.
- **Mobile MAJOR full `<dt>` → `<div>` restructure**: held since R19.
- **R23 theme**: UX MAJOR — life_shape coverage expansion to early/mid ADULT_TRAJECTORY buckets.
- **Move consent-awareness AFTER projection** — held since R7.
- **Kids-mode onboarding panel** — held.
- **R12/R14 mid-pick stashes** preserved.
