## Why

The current website design requires an update to align with the new PAPER.OS Design System & Style Guide, which emphasizes an Editorial, Muted, and Sophisticated aesthetic. This update will unify the visual language across the application, improve user experience with a low-contrast, comfortable palette, and introduce highly requested light and dark mode functionalities.

## What Changes

- Apply the PAPER.OS Design System globally across all pages and components.
- Implement a dark mode and light mode toggle.
- Update typography to use the Inter font family with specific weights and tracking for editorial feel.
- Overhaul the color palette to use warm off-whites for light mode and warm charcoals for dark mode.
- Update UI elements (cards, buttons, inputs) with new generous border radius (`rounded-3xl` to `rounded-[3rem]`) and subtle borders instead of heavy shadows.
- Ensure specific components like sticky notes adhere to the new thematic color rules (Yellow, Pink, Blue, Green, Purple, Orange).

## Capabilities

### New Capabilities

- `theme-management`: Addition of light and dark mode toggling, state persistence, and system-preference detection.

### Modified Capabilities

- `dashboard-ui`: Integration of the theme switch toggle and holistic application of the new design system container aesthetics.
- `note-taking`: Requirements update to adhere strictly to the sticky notes color rules defined in the PAPER.OS design system.

## Impact

- **UI Components:** Widespread updates to all shared components in `app/components/ui/` (e.g., Card, Typography, Elements).
- **Global Styles:** Revisions to `globals.css` and potentially Tailwind configuration (`tailwind.config.ts`) to include new design tokens and font utilities.
- **State Management:** Implementation of theme state handling in `app/store/useStore.ts` or a new context provider.
- **Layouts & Pages:** Updates to `app/layout.tsx` and all page structures (`app/page.tsx`, `app/notes/page.tsx`, etc.) to consume the new design tokens.
