## MODIFIED Requirements

### Requirement: Timer functionality

The system SHALL provide a Pomodoro focus timer with Play, Pause, and Reset controls. On mobile screens, the timer SHALL display as a horizontal flex card.

#### Scenario: User views the timer on mobile

- **WHEN** user views the Focus Timer component on a small screen
- **THEN** it displays horizontally with the timer text on the left and control buttons on the right

#### Scenario: User starts a focus session

- **WHEN** user clicks "Play"
- **THEN** the timer begins counting down from the selected time (e.g., 25:00)
