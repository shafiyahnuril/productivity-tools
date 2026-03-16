## 1. Global Setup & Navigation

- [x] 1.1 Create `BottomNavigation` component with 5 links (Dashboard, Notes, Focus, Calendar, Profile).
- [x] 1.2 Update main layout (`app/layout.tsx`) to conditionally render `Sidebar` on `md` and `BottomNavigation` on smaller screens.
- [x] 1.3 Implement mobile GSAP slide animation for page transitions triggered from the `BottomNavigation`.
- [x] 1.4 Refactor Header/Top Bar to display Search and Filter as individual buttons with high elevation on mobile view.

## 2. Dashboard UI Updates

- [x] 2.1 Update Main Content area to be a continuous vertical stack on mobile (`app/page.tsx`).
- [x] 2.2 Add Floating Action Button (FAB) for adding new items positioned at the bottom right with a popping animation on load.
- [x] 2.3 Implement vertical list stagger GSAP animation for dashboard cards on mobile layout.

## 3. Component Updates

- [x] 3.1 Update Focus Timer component to display as a horizontal flex layout with time on the left and controls on the right on mobile screens.
- [x] 3.2 Update Task List ("Today's Tasks") on the dashboard to show a maximum of 3 items on mobile with a "..." more option.
- [x] 3.3 Implement `framer-motion` or manual pointer events for swipe-to-action functionality on tasks.
- [x] 3.4 Update Calendar/Events to implement swipe-to-action functionally alongside the tasks.
- [x] 3.5 Refactor Notes and Stats summary cards to display in a 2x2 grid layout on mobile screens.

## 4. Pages Responsiveness and Fine-tuning

- [x] 4.1 Refactor Notes page (`app/notes/page.tsx`) to support responsive vertical stacking.
- [x] 4.2 Refactor Calendar page (`app/calendar/page.tsx`) to support responsive vertical stacking.
- [x] 4.3 Refactor Focus Timer page (`app/timer/page.tsx`) to support responsive vertical stacking.
- [x] 4.4 Refactor Analytics/Stats page (`app/analytics/page.tsx`) to support responsive vertical stacking.
- [x] 4.5 Refactor To-Do/Task page (`app/todo/page.tsx`) to support responsive vertical stacking.
- [x] 4.6 Thoroughly test layout using standard CSS breakpoints and ensure touch targets are minimum 44x44px.
