## ADDED Requirements

### Requirement: Theme persistence and detection

The system SHALL detect the user's system theme preference on first load and SHALL persist manual theme overrides via local storage.

#### Scenario: User visits for the first time

- **WHEN** user loads the application
- **THEN** the theme defaults to their OS preference

#### Scenario: User toggles theme

- **WHEN** user manually toggles the theme
- **THEN** the selection is saved and applied on subsequent visits
