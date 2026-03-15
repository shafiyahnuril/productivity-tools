## ADDED Requirements

### Requirement: Calendar view

The system SHALL display a calendar with days of the week, allowing users to view scheduled events.

#### Scenario: User checks today's schedule

- **WHEN** user navigates to the Calendar module
- **THEN** they see an agenda showing events for the current day

### Requirement: Event scheduling integration

The system SHALL display tasks and study sessions mapped to specific times on the calendar.

#### Scenario: Task with deadline is created

- **WHEN** a task or session is scheduled for March 16 at 2 PM
- **THEN** the calendar shows a block on March 16 at 14:00
