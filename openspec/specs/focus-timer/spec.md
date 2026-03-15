## ADDED Requirements

### Requirement: Timer functionality

The system SHALL provide a Pomodoro focus timer with Play, Pause, and Reset controls.

#### Scenario: User starts a focus session

- **WHEN** user clicks "Play"
- **THEN** the timer begins counting down from the selected time (e.g., 25:00)

### Requirement: Session log

The system SHALL log completed focus sessions.

#### Scenario: Timer reaches zero

- **WHEN** the timer hits 00:00
- **THEN** the session duration and details are appended to the Session Log list
