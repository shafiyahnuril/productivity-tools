## MODIFIED Requirements

### Requirement: Task lists and statuses

The system SHALL let users manage tasks, track priorities (Low, Medium, High), and categorize them. On mobile devices, the "Today's Tasks" widget SHALL display a maximum of 3 top tasks along with a "more" option. Users SHALL be able to swipe tasks sideways to trigger quick actions.

#### Scenario: User completes a task

- **WHEN** user clicks the checkbox next to a task
- **THEN** the task is marked as completed and updated in the analytics

#### Scenario: User views tasks on mobile device

- **WHEN** user views the tasks list on a small screen
- **THEN** only the top 3 tasks are shown by default to conserve space

#### Scenario: User swiping task on mobile

- **WHEN** user horizontally swipes a task item to the left
- **THEN** quick action buttons (such as Edit or Delete) are revealed under the task element
