# Round 22 — Reviewer Critiques (26 issues)

13 reviewers. Critical finding: **the R22 Systems aria-live preservation is broken** — line 7729 `statsEl.innerHTML = ...` runs BEFORE the placeholder-reuse logic at 7732+, destroying the element every render. The "reuse existing" branch at 7734 never fires; the code always falls through to recreate. Plausibility MAJOR caught this.

Other convergences:
- **3-reviewer convergence on aria-live announcement fatigue** (Ethics MAJOR + Psychology MAJOR + Risk MAJOR): repeated slider input renders may re-announce; language switches re-announce same semantic content in different language.
- **5-reviewer convergence on scrubber-ticker scrolling concerns** (UX POLISH + Visual Director MAJOR + Sociology MAJOR + Mobile MAJOR + Narrative Design POLISH): bare unstyled scrollbar; missing aria-label for scrollability; padding-right wastes space in CJK; 9em too short for interruption entry.
- **2-reviewer convergence on reduced-motion fallback** (UX MAJOR + Ethics POLISH): static glow mimics hover state; outline ring too subtle.

---

## 1. UX REVIEWER

**MAJOR:** The prefers-reduced-motion fallback is visually indistinguishable from the :hover state. Both render as `box-shadow: 0 0 32px rgba(126,224,255,0.6)` — the only differentiator is a 2px outline ring at 0.35 opacity, which is too subtle to signal "pending" status when a user with vestibular sensitivity hovers the button. **Recommendation:** Increase the outline ring thickness to 3-4px and/or raise the ring opacity to 0.5-0.6 so the outline ring is visually prominent even during hover state. (style.css:647)

**POLISH:** The scrubber-ticker max-height of 9em creates an awkwardly compact scroll area for the interruption shape entry (~280 chars, expands to 5-7 lines). At 12.5px font with 1.5 line-height, 9em provides ~6-line capacity, forcing scrolling that feels cramped relative to the natural text flow elsewhere on the page. **Recommendation:** Increase max-height to 12-14em to allow the interruption entry to display with 1-2 lines of breathing room before triggering scroll. (style.css:1125)

---

## 2. ETHICS REVIEWER

**MAJOR:** The aria-live placeholder is announced on slider drags because `updateBabyPreview()` fires on every input event. Even with the conditional `textContent` check at line 7736, in some screen reader implementations setting textContent can re-trigger live-region announcements, creating announcement fatigue for users actively adjusting sliders. **Recommendation:** Add `aria-atomic="false" aria-relevant="text"` to the placeholder element to limit announcements to actual text changes, or debounce textContent assignment so it only occurs when projection-gate state toggles. (script.js:7736)

**POLISH:** The static box-shadow state in the prefers-reduced-motion rule mimics the pulse's "peak" brightness without rhythm, so sighted users with vestibular sensitivity may not perceive it as an active "call-to-action" signal—it reads as a static highlight rather than "waiting for your next click." **Recommendation:** Add a subtle outline or border style to provide a distinct visual affordance without animation. (style.css:645-648)

---

## 3. SCIENCE REVIEWER

**MAJOR:** The code asserts a medical/neurological link ("Users with vestibular sensitivity") without citing the scientific basis for why prefers-reduced-motion benefits vestibular dysfunction. WCAG 2.1 establishes prefers-reduced-motion without framing it specifically to vestibular conditions. If claiming vestibular sensitivity specifically benefits, this deserves W3C or medical source reference. **Recommendation:** Either cite WCAG 2.1 section 2.3.3 (Animation from Interactions) or remove the vestibular-specific framing and simply state "respects prefers-reduced-motion accessibility preference." (style.css:642)

**POLISH:** The R22 reduced-motion guard comment is inconsistent with the codebase pattern — all 14 other prefers-reduced-motion guards lack explanatory comments. The R22 block stands out with explanation. **Recommendation:** For consistency, either strip the comment entirely or add brief a11y notes to 2-3 existing reduced-motion blocks to establish a pattern. (style.css:640-643)

---

## 4. WRITING REVIEWER

**MAJOR:** Plural pronoun misalignment in Chinese REFLECTION_ARC closing affirmation. The string uses plural "他们自己" (themselves) to refer to singular "那个人" (that person), breaking grammatical agreement and conflicting with the app's established singular-future-subject register. **Recommendation:** Change "他们自己" to "他/她自己" or "那个人自己" to maintain singular consistency across all five translations. (script.js:6547 — verify exact line)

**POLISH:** Korean trajectory disclaimer ends with wrong punctuation mark. The Korean text uses a full-width Chinese/Japanese period `。` instead of Korean punctuation, creating typographical inconsistency across the 5-language translation set. **Recommendation:** Replace the `。` with proper Korean period or matching punctuation. (script.js:1188)

---

## 5. VISUAL DIRECTOR

**MAJOR:** The `.scrubber-ticker` container has `padding-right: 4px` to reserve space for the scrollbar, but `.scrubber-ticker::-webkit-scrollbar` styling is missing. The browser's default scrollbar appears unstyled and visually disconnects from the ticker container's cyan border aesthetic, creating jarring contrast. **Recommendation:** Add `.scrubber-ticker::-webkit-scrollbar { width: 6px; }` and `.scrubber-ticker::-webkit-scrollbar-thumb { background: rgba(126, 224, 255, 0.18); border-radius: 999px; }` to match the `.decision-list` scrollbar pattern. (style.css:1112-1129, 5256-5260)

**POLISH:** In `prefers-reduced-motion: reduce` mode, `.avatar-glow` animation is removed but the radial-gradient background persists as a static cyan disc, reading as "flat" compared to the motion version. **Recommendation:** Add `opacity: 0.5;` or `opacity: 0.4;` to `.avatar-glow` within the `prefers-reduced-motion` media block to visually soften. (style.css:3812-3819)

---

## 6. PSYCHOLOGY REVIEWER

**MAJOR:** Language switching triggers re-announcement of the aria-live placeholder despite identical semantic content, causing announcement fatigue for users who switch languages frequently. The textContent change notification fires even when the translated text serves the same gate-explanation purpose. **Recommendation:** Cache the last announced language per placeholder element; only update aria-live content when the message's semantic purpose changes, not merely its language. Use a temporary `aria-live="off"` during the language-update render. (script.js:7731-7736)

**POLISH:** The scrollable scrubber-ticker container creates implicit cognitive pressure to read all trajectory text by signaling "there is more content below." **Recommendation:** Pair the scrollable container with subtle ARIA labeling (`aria-label="trajectory milestones, scrollable"`) and consider adding a visual cue (e.g., a fade-to-transparent bottom edge) that reframes scrolling as optional detail-reading. (style.css:1125-1128)

---

## 7. SOCIOLOGY REVIEWER

**MAJOR:** Scrollable scrubber-ticker lacks semantic signaling to assistive technology users. The `.scrubber-ticker` element (now caps at 9em with `overflow-y: auto`) is rendered with no `aria-label`, `role="region"`, or other markers indicating it contains scrollable content. Mobile users with narrow viewports discover the scrollbar incidentally; SR users get no signal. **Recommendation:** Add `role="region" aria-label="Milestone description – scrollable"` (or similar) to the `.scrubber-ticker` element. (index.html scrubber-ticker line; style.css:1118–1128)

**POLISH:** The `prefers-reduced-motion` guard for `.btn-primary.is-pending-reveal` replaces animation with a static glow/outline but doesn't consider cognitive or attention-related disabilities. For users with ADHD or attention difficulties, the static glow may be less noticeable than the rhythmic pulse. **Recommendation:** Add a gentle opacity-only pulse for `prefers-reduced-motion: reduce` (e.g., 0.95↔1.0 at 3-4s interval) to retain cognitive affordance without vestibular triggers. (style.css:644–649)

---

## 8. MOBILE / A11Y REVIEWER

**MAJOR:** The `.scrubber-ticker` max-height: 9em + padding-right: 4px causes unnecessary scrollbar-space reservation on CJK languages (zh/ja/ko), where the interruption entry (74-123 chars) renders in only 2-4 lines versus EN/TR (237-254 chars) at 5-6 lines. The 4px padding-right wastes horizontal space for CJK users where overflow never occurs. **Recommendation:** Apply padding-right conditionally based on content overflow (CSS scrollbar-gutter: stable, or JS measure) so CJK languages don't reserve unused space. (style.css:1124-1128)

**POLISH:** The aria-live placeholder ID `projection-gate-placeholder` doesn't follow the codebase pattern where dynamically-inserted element IDs are prefixed with semantic scopes. **Recommendation:** Rename to `baby-stats-projection-gate-placeholder` to match the DOM scope pattern established in prior rounds and improve debuggability. (script.js:7730)

---

## 9. PLAUSIBILITY REVIEWER

**MAJOR:** The R22 Systems aria-live preservation logic is **non-functional**. Line 7729 (`statsEl.innerHTML = physicalRows + personalityRows`) executes BEFORE the placeholder preservation logic at line 7732+. This destroys any existing placeholder element. When line 7734 checks `if (placeholderEl && placeholderEl.parentNode === statsEl)`, the element was just destroyed by innerHTML, so the condition NEVER fires the "reuse" branch. The code always falls through to the else branch at 7737, creating a fresh element every render. **The aria-live subscription is broken on every render — exactly what the fix was supposed to solve.** **Recommendation:** Either (a) move the placeholder OUT of statsEl entirely (sibling element managed independently of innerHTML), OR (b) detach the placeholder before innerHTML and reattach after. The simplest fix: extract `personalityRows` to exclude the placeholder, render innerHTML, then ALWAYS check by ID — but the element must outlive the innerHTML wipe, which means it can't live inside statsEl. (script.js:7728-7750)

**POLISH:** `statsEl` is fetched once via `$('#baby-stats')` and assumed truthy. If init order or DOM state changes, lines 7728-7750 throw uncaught TypeError on null. **Recommendation:** Add `if (!statsEl) return;` guard before the render block, or use optional chaining. (script.js:7650, 7728)

---

## 10. DETECTION AGENT

**MAJOR:** Informal/colloquial language in R22 Systems comment: "surgically manage" is developer jargon. **Recommendation:** Replace "surgically manage a persistent <dt>" with "carefully preserve and update a persistent <dt> element." (script.js:7722)

**POLISH:** Imprecise word choice in CSS comment: "surround stays still" is colloquial; "surround" is not standard UI terminology. **Recommendation:** Change "so the surround stays still" to "so the panel layout stays stable." (style.css:1123)

---

## 11. PRODUCT REVIEWER

**MAJOR:** The scrubber-ticker max-height + overflow-y constrains trajectory milestones to fixed height. Users who don't recognize the container is scrollable won't discover longer entries like "interruption" — content discovery gap. The overscroll-behavior: contain suppresses native scroll affordances. **Recommendation:** Add a visual indicator such as a bottom pseudo-element gradient fade on .scrubber-ticker, or increase padding-right from 4px to 12px to ensure the scrollbar thumb is always visible. (style.css:1125-1128)

**POLISH:** save/restore functions persist many state fields but omit `appMode` and `language`. When users load a saved baby, their viewing mode and language reset, inconsistent with R21's fix to persist `age`. **Recommendation:** Add `appMode: state.appMode` and `language: state.language` to saveCurrentTimeline() with fallbacks in loadTimeline() (`?? 'adult'`, `?? 'en'`). (script.js:10413-10454, 10462-10535)

---

## 12. RISK ANALYST

**MAJOR:** aria-live="polite" placeholder announces redundantly on repeated slider adjustments. updateBabyPreview() fires on every input event during sliding. If the element stays in DOM during gate-active state, multiple renders may cause TalkBack/VoiceOver to re-announce the placeholder on each render cycle, undermining the "awaiting next generation" single-shot intent. **Recommendation:** Track whether the placeholder was announced this session (e.g., `data-announced="true"`) and avoid re-appending/re-mutating textContent if it's already in active DOM. (script.js:7746)

**MITIGATION:** The scrubber's scrollbar creates a visual "more content" cue that could signal users should read all trajectory milestones. Most are ~60–120 chars and fit without scroll; only "interruption" overflows. **Recommendation:** Add aria-label or role="status" + hidden aria-live region to .scrubber-ticker that announces "showing current milestone; scroll to view alternative paths" on focus/load so screen reader users understand the overflow is structural, not mandatory. (style.css:1125)

---

## 13. NARRATIVE DESIGN REVIEWER

**MAJOR:** The aria-live placeholder is rendered with `.ocean-sep` styling (10.5px, uppercase, 1.5px letter-spacing), which compresses the narrative weight for screen-reader users. The uppercase transformation and dense letter-spacing create visual hierarchy that's lost in audio; sighted users perceive a subtle, spacious separator; SR users get rapid-fire, clipped-sounding text. For a moment designed around "waiting" and "openness of choice," the announcement lands compressed rather than contemplative. **Recommendation:** Remove `.ocean-sep` class from the placeholder element on line 7742, or create a narrative-specific style rule that applies normal (non-uppercase, normal letter-spacing) typography to `.projection-gated-placeholder` inside `.baby-stats` to preserve the visual separator while restoring audio pacing. (script.js:7742, style.css:3399-3419)

**POLISH:** The scrubber-ticker scrollbar physically fragments long entries like "interruption" across scroll-viewport boundaries. The narrative closure ("some change reshapes the trajectory permanently") gets broken into scroll frames rather than standing as a unified thought. **Recommendation:** Increase max-height from 9em to 12em to accommodate most entries without scrolling. (style.css:1125)
