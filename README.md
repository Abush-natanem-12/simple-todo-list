Todo List Application

This is a React-based Todo List application that allows users to add, manage, filter, and track their tasks efficiently. The app has a user-friendly interface with features to delete, complete, and view detailed task information.

Features

Add Tasks: Users can create tasks with details such as task type, due date, and a custom message.

View Tasks: Tasks are displayed in a preview section with options for filtering and managing tasks.

Task Details: Detailed information about a selected task can be viewed, including its type, date, and message.

Mark as Completed: Tasks can be marked as completed with a simple checkbox.

Delete Tasks: Tasks can be removed individually or all at once.

Filter Tasks: Tasks can be filtered by categories such as Work, Personal, Education, Birthday, and Wishlist.

Task Statistics: View statistics on total tasks, completed tasks, and deleted tasks with a completion rate percentage.

Clear All Tasks: Reset the application by clearing all tasks and statistics.

Application Structure

The application consists of three main sections:

Left Section:

Contains a hero section with the app title and description.

Includes a form for adding new tasks.

Right Section:

Displays the task filter, task preview, and task details.

Bottom Section:

Provides task statistics and a button to clear all tasks.

Components Overview

App

The root component managing state and layout. It includes the following state variables:

taskList: Stores the list of tasks.

detail: Stores the details of the currently selected task.

filterType: Tracks the current filter applied.

filter: Holds the filtered list of tasks.

openedTask: ID of the currently opened task.

deleted and completed: Track the number of deleted and completed tasks.

Left

Contains:

Hero: Displays the app title and description.

Form: A form for adding new tasks.

Right

Contains:

TaskFilter: Buttons to filter tasks by category.

TaskPreview: Displays the list of tasks with options to delete, complete, or view details.

TaskDetail: Shows detailed information about a selected task.

Bottom

Contains:

Status: Displays statistics about tasks and a button to clear all tasks.

How to Use

Add a Task:

Fill out the form with task details (name, type, date, and message) and click "Add Task."

View Tasks:

Tasks will appear in the preview section.

Use the filter buttons to view tasks by category.

Manage Tasks:

Mark a task as complete by checking the checkbox.

Delete a task by clicking the delete button.

View Details:

Click the "Detail" button on a task to view its full details.

Track Statistics:

Check the bottom section for statistics on tasks.

Clear All Tasks:

Use the "Clear All" button to reset the application.

State Management

Task Addition: The handleTaskLists function adds a new task to the list.

Task Deletion: The handleDeleteTasks function removes a task from the list.

Task Completion: The handleCompleteTasks function marks a task as completed.

Task Filtering: The handleFilter function filters tasks by the selected category.

Task Details: The handleDetails function toggles the details view of a selected task.

Clear All Tasks: The handleClearAll function resets the application.

Styling

The application is styled using the App.css file. Customize the styles in App.css to match your design preferences.

Installation

Clone the repository:

git clone https://github.com/your-username/todo-list-app.git

Navigate to the project directory:

cd todo-list-app

Install dependencies:

npm install

Start the development server:

npm start

Future Improvements

Add user authentication for personalized task management.

Implement drag-and-drop functionality for task reordering.

Integrate persistent storage (e.g., local storage or a database).

Enhance the UI with animations and responsive design.

License

This project is licensed under the MIT License.
