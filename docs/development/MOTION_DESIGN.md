# Animation & Transition Guidelines

This document explains the logic and intended usage for the tokens defined in `animation-tokens.json`.

## 1. Categories & Rationale

1. **Micro (0–100 ms)**
   - **Use for:** Instant feedback (ripples, icon color shifts).
   - **Feel:** Instantaneous; avoids drawing undue attention.

2. **Small (100–200 ms)**
   - **Use for:** Hover/focus states, small popovers or tooltips.
   - **Feel:** Quick but perceptible, guiding the eye without lag.

3. **Medium (200–300 ms)**
   - **Use for:** Menu open/close, tab switches, inline content reveals.
   - **Feel:** Smooth spatial shifts; helps users follow state changes.

4. **Macro (300–500 ms)**
   - **Use for:** Modals, dialogs, full-screen transitions, complex motions.
   - **Feel:** Conveys larger context; avoids feeling too abrupt.

## 2. Easing Curves

- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)`  
- **Sharp:**    `cubic-bezier(0.4, 0, 1, 1)`  
- **Complex:**  `cubic-bezier(0.25, 0.1, 0.25, 1)`

## 3. Material Motion Web

- **Hover ripple:**   100 ms, sharp easing  
- **Enter screen:**   225 ms, standard easing  
- **Exit screen:**    195 ms, standard easing  
- **Complex motion:** 375 ms, complex easing  

## 4. Spring Physics

For natural, physics-based motions (draggables, fling gestures):

```js
const springConfig = {
  stiffness:    120,  // tension
  dampingRatio: 0.5,  // bounce control
  mass:         1     // weight
};