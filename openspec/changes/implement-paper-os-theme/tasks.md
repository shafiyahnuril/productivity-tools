## 1. Setup and Configuration

- [x] 1.1 Install `next-themes` (or standard context package) to manage theme switching.
- [x] 1.2 Update `tailwind.config.ts` to include PAPER.OS design system tokens (colors, font-family `Inter`, border radii sizes).
- [x] 1.3 Update `app/globals.css` to define CSS variables for light and dark modes based on `newDesignSystem.md` specifications.

## 2. Global Layout and State

- [x] 2.1 Integrate `ThemeProvider` in `app/layout.tsx` to handle dark/light mode toggling state system-wide.
- [x] 2.2 Create a visual Theme Switcher toggle widget in `app/components/Sidebar.tsx` and `app/components/BottomNavigation.tsx`.

## 3. Component Refactoring

- [x] 3.1 Refactor `app/components/ui/Card.tsx` to use new tokens (`bg-paper-card`, `dark:bg-dark-card`, no shadow, generous rounding).
- [x] 3.2 Refactor `app/components/ui/Typography.tsx` to apply new heading/body semantic classes and Inter font tracking behaviors.
- [x] 3.3 Refactor global actionable components (buttons, input elements in Elements.tsx) to match the new accent styling and remove outdated aesthetics.

## 4. Specific Feature Adjustments

- [x] 4.1 Update Note Taking interface (`app/notes/page.tsx`) and any relevant components to map specific note colors (Yellow, Pink, Blue, etc.) strictly to PAPER.OS light and dark sticky note rules.
- [x] 4.2 Review pages (`app/analytics/page.tsx`, `app/calendar/page.tsx`, `app/timer/page.tsx`, `app/todo/page.tsx`) to ensure no hardcoded legacy colors conflict with dark mode.
