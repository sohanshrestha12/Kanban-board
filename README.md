# Task-2 Kanban Board Project

## Features

- Create Columns: Users can add new columns to the Kanban board.
- Edit Column Name: Users can edit the names of columns.
- Delete Columns: Users can delete columns from the board.
- Create Tasks: Users can add tasks within columns.
- Edit Task Name: Users can edit the name of tasks.
- Delete Tasks: Users can delete tasks within columns.
- Drag-and-Drop (DND): Both columns and tasks are draggable and can be rearranged.
- Local Storage Persistence: The state of the board (columns and tasks) is saved in local storage, so data persists across page refreshes.

## Setup Instructions

1. Clone the repository to your local machine:
  - git clone https://github.com/sohanshrestha12/Kanban-board.git
2. Navigate to the project directory:
  - cd kanban
3. Install dependencies:
  - npm install
4. Run the development server:
  - npm run dev
  - The application will be available at http://localhost:3000.

## Technology Choices and Rationale

- **React**: Used for building the user interface. React's component-based architecture helps in managing the dynamic parts of the application such as tasks and columns.
- **TypeScript**: Ensures type safety, improving code quality and reducing potential errors during development.
- **@dnd-kit/core**: A lightweight and customizable library for implementing drag-and-drop functionality.
- **Tailwind CSS**: A utility-first CSS framework used for styling. It provides flexibility and ensures the UI is responsive and easily customizable.
- **Local Storage**: Used for persisting the Kanban board state so that users' data is not lost on page refresh.

## Known Limitations/Trade-offs

- **Column and Task Editing**: Currently, the column and task names can only be edited manually through the UI, without any advanced validation or checks.
- **Task Persistence**: Only the columns and tasks are persisted in local storage, but task descriptions and additional data (like due dates) are not yet implemented.

## Future Improvements

- **Mobile Responsiveness**: Improve the mobile user experience by making the board more responsive on small screens.
- **Backend Integration**: Add server-side persistence using a backend (Node.js, Express, MongoDB) to persist columns, tasks, and user data beyond local storage.
- **Task Prioritization**: Implement task prioritization (e.g., high, medium, low).
- **Authentication**: Add user authentication to allow users to save and manage boards across devices.

## Live Demo

- https://kanbanboard-task2.netlify.app/

## Time Spent on the Project

- Approximately **6-7 hours** were spent on implementing the functionality, testing, and refining the design.
