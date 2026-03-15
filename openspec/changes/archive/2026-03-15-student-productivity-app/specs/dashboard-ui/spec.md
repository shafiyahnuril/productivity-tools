## ADDED Requirements

### Requirement: Global layout

The system SHALL provide a global layout consisting of a side navigation bar and a main content area.

#### Scenario: User views the app layout

- **WHEN** user loads the application
- **THEN** they see the sidebar on the left and the active module in the main area on the right

### Requirement: Theming

The system SHALL support Dark and Light themes per the `designSystem.md`.

#### Scenario: User interacts with layout

- **WHEN** user toggles between dark to light
- **THEN** the app's CSS variables switch to the light mode palette automatically
