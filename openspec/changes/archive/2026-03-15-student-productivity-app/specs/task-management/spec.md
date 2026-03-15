## ADDED Requirements

### Requirement: Task lists and statuses

The system SHALL let users manage tasks, track priorities (Low, Medium, High), and categorize them.

#### Scenario: User completes a task

- **WHEN** user clicks the checkbox next to a task
- **THEN** the task is marked as completed and updated in the analytics

### Requirement: Deadlines

The system SHALL track task deadlines and display upcoming due tasks.

#### Scenario: User queries upcoming tasks

- **WHEN** user views the To-Do list dashboard
- **THEN** tasks due soon are highlighted or listed under "Today's Tasks"
