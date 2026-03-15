## ADDED Requirements

### Requirement: Note-taking interface

The system SHALL display a list of notes and an interface to create/edit notes.

#### Scenario: User creates a note

- **WHEN** user clicks "New Note" and submits a title and content
- **THEN** the note is saved and displayed in the notes list

### Requirement: Categorization tags

The system SHALL allow notes to be tagged (e.g., Assignment, Exam, Study).

#### Scenario: User assigns a tag to a note

- **WHEN** user selects a category tag when editing a note
- **THEN** the note gets displayed with the corresponding tag color (e.g. Blue `#3B82F6` for assignment)
