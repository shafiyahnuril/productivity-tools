## MODIFIED Requirements

### Requirement: Note-taking interface

The system SHALL display a list of notes and an interface to create/edit notes. On mobile screens, the note previews and statistics widgets SHALL be presented in a 2x2 grid layout.

#### Scenario: User creates a note

- **WHEN** user clicks "New Note" and submits a title and content
- **THEN** the note is saved and displayed in the notes list

#### Scenario: User views notes overview on mobile

- **WHEN** user loads the Notes layout on a mobile screen
- **THEN** the recent note previews and metric cards are rendered in a 2-column by 2-row grid to save vertical real estate
