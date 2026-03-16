## Context

The current student productivity app is designed for desktop screens. With the need for mobile accessibility, we need to adapt the layout to be responsive across all devices, particularly phones and tablets. Based on `designSystem-MobileResponsive.md`, this involves migrating from a sidebar-based layout to a bottom navigation bar, transitioning components to strictly horizontal or 2x2 grid views, and utilizing a vertical stack for the main layout.

## Goals / Non-Goals

**Goals:**

- Make the entire web application responsive (Dashboard, Notes, Timer, Calendar, Analytics, Task).
- Implement the Mobile Layout Pattern (Vertical Stack, 1 Column with 16-20px margins).
- Implement the Floating Bottom Navigation Bar for touch interaction and navigate between pages.
- Adapt the Focus Timer to a horizontal layout.
- Adapt Notes to a 2x2 grid format on small screens.
- Implement mobile-friendly GSAP animations (e.g. FAB Pop & Bounce, Bottom Nav Indicator Slide, Vertical List Stagger).
- Support touch gestures such as Swipe-to-Action for Tasks and Events.

**Non-Goals:**

- Radically redesigning the desktop interface (desktop layout should remain unchanged).
- Changing business logic or state flow (the functionality should remain identical).
- Building entirely new features not outlined in the responsive adaptations.

## Decisions

- **Media Queries Configuration**: We will utilize Tailwind CSS (or standard CSS media queries if Tailwind isn't available) utilizing the `md:` and `lg:` breakpoints to toggle between mobile-centric design (default) and desktop design (`md:` / `lg:` block).
- **Navigation Strategy**: A new `BottomNavigation` component will be created. We will conditionally render the `Sidebar` on `md` screens and the `BottomNavigation` on smaller screens in the main `Layout.tsx` or equivalent wrapper.
- **GSAP Animation Separation**: Create a hook or utilize GSAP's `matchMedia` to apply mobile-specific animations (such as sliding horizontal page transitions) specifically targeting touch devices or small viewports.
- **Touch Gesture Library**: We will consider integrating an existing accessible touch-gesture library (e.g., `react-use-gesture` or `framer-motion`'s drag events) to implement robust swipe-to-delete behaviors. If not, raw pointer events will be used.

## Risks / Trade-offs

- [Risk] Complicated conditional rendering leading to layout shifts or duplicated DOM elements.
  → Mitigation: Rely mainly on CSS media queries (`hidden md:flex`) for toggling navigation components rather than React state when possible to ensure fast initial layouts.
- [Risk] Touch swipe events conflicting with native browser scrolling/refresh mechanisms.
  → Mitigation: Carefully bind touch events to horizontal axes exclusively, and utilize `touch-action: pan-y` CSS to ensure vertical scrolling is not inhibited.
- [Risk] GSAP animations reducing battery performance on mobile devices.
  → Mitigation: Keep animations "snappy" and brief.
