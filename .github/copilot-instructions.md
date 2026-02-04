# Copilot Instructions (Mandatory)

These rules MUST be followed for all code changes in this repository.

## Core Principles
- Keep code clean, readable, and maintainable.
- Keep the code DRY (Do Not Repeat Yourself).
- Prefer explicit, predictable logic over clever implementations.

## Functions (Strict Rule)
- Use regular function declarations ONLY.
- Do NOT use arrow functions.
- Do NOT convert existing regular functions into arrow functions.
- Use descriptive, consistent function names.

## Reusability
- Extract repeated or similar logic into reusable components or utilities.
- Create separate component files when reuse improves clarity or reduces duplication.
- Reusable components must accept props to render dynamic data.
- Do NOT duplicate JSX or logic across files.

## React Best Practices
- Use functional state updates when new state depends on previous state.
- Use React.memo for components that do not need to re-render on every parent render.
- Clean up subscriptions, timers, and event listeners in useEffect cleanup functions.
- Handle loading and error states for all async operations.

## UI & UX Rules
- Add `cursor-pointer` to all clickable or interactive elements.
- Prefer skeleton loaders over spinners for loading states.
- Preserve existing layout, spacing, and indentation unless explicitly instructed.

## Constraints
- Do NOT introduce new dependencies unless explicitly requested.
- Do NOT refactor unrelated code.
- Do NOT change existing behavior or data flow.
- Do NOT add comments explaining changes or AI-related notes.

## Output
- Output updated code only.
