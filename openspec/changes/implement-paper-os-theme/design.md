## Context

The current application lacks a cohesive design language. We're migrating the application to the new PAPER.OS Design System, which dictates a warm, low-contrast, editorial style. It also introduces light mode ("Warm Paper") and dark mode ("Muted Charcoal"). The styling is to replace shadows generally with rounded borders and rely heavily on precise typography (Inter).

## Goals / Non-Goals

**Goals:**

- Implement the comprehensive PAPER.OS design system.
- Include a global dark/light mode toggle.
- Modify standard UI components (like notes) to meet specific token values for each mode.
- Use CSS or Tailwind configurations to implement semantic color tokens as described in newDesignSystem.md.

**Non-Goals:**

- Redesigning the core data structures of Notes, Tasks, or Calendar.
- Refactoring the underlying state shapes unless required for the theme toggle.

## Decisions

- **Tailwind Configuration over pure CSS variables:** We will map the design system colors and tokens (`paper-bg`, `dark-bg`, etc.) to Tailwind's theme configuration. By utilizing Tailwind's `darkMode: 'class'` mode, we can apply specific classes (e.g., `dark:bg-dark-bg`) or just use CSS variables to abstract them (e.g., `bg-background` which changes per theme). Given the design system requires both `brand` specific names and semantic changes, using CSS variables defined in `@layer base` mapped to semantic tailwind generic classes like `bg-primary`, `bg-card` makes switching effortless, but the design tokens are strictly named. We will add custom colors to `tailwind.config.ts`.
- **Theme toggle context:** We will add a simple React Context (`ThemeProvider`) combined with local storage to persist the user's theme selection, toggling the `dark` class on the root HTML element.
- **Micro-labels and Editorial Typography:** We will configure the Inter font and define custom utility classes (or just use Tailwind's `tracking-tighter` and `text-[10px] uppercase font-bold tracking-widest`) for the micro-labels to handle the editorial feel efficiently.

## Risks / Trade-offs

- **Risk:** Existing components using hardcoded hex colors or utility classes like `bg-white` might not respond to the dark mode switch.
  **Mitigation:** Audit and refactor `app/components/ui/` and page-level files to replace explicit colors with semantic tokens.
- **Risk:** Sticky note colors are independent of global tokens.
  **Mitigation:** Sticky notes will have their own dedicated mapping in Tailwind config or specific mappings inside the Note component.
