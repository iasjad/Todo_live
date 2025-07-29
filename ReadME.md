# Live Collaborative To-Do List

A full-stack, real-time, collaborative to-do list application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Features live updates via WebSockets, role-based user authentication, and a fully responsive design.

**Live Demo:** [https://todo-live.vercel.app/](https://todo-live.vercel.app/)

---

## Features

- Real-time collaboration with live updates using Socket.IO.
- User registration and authentication with JWT.
- Role-based access control:
  - **Admins** can edit or delete any task.
  - **Users** can only edit or delete tasks they created.
- Create, update, and delete tasks on a shared list.
- Manage task status (Pending, In Progress, Completed).
- Polished and responsive UI for all devices.

---

## API Endpoints

All endpoints (except for login/register) are protected and require a Bearer token in the `Authorization` header.

### Authentication

| Method | Endpoint           | Description                               | Auth Required |
| ------ | ------------------ | ----------------------------------------- | ------------- |
| POST   | /api/auth/register | Registers a new user with the user role   | No            |
| POST   | /api/auth/login    | Logs in an existing user, returns a token | No            |
| GET    | /api/auth/me       | Gets the details of the logged-in user    | Yes           |

**Request Body Example** (`/login` or `/register`):

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Success Response Example** (`/login` or `/register`):

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tasks (CRUD)

| Method | Endpoint       | Description                           | Auth Required |
| ------ | -------------- | ------------------------------------- | ------------- |
| GET    | /api/tasks     | Fetches all tasks for the shared list | Yes           |
| POST   | /api/tasks     | Creates a new task                    | Yes           |
| PUT    | /api/tasks/:id | Updates an existing task's status     | Yes           |
| DELETE | /api/tasks/:id | Deletes a task from the list          | Yes           |

**Request Body for `POST /api/tasks`:**

```json
{
  "text": "Complete the project README file"
}
```

**Request Body for `PUT /api/tasks/:id`:**

```json
{
  "status": "completed"
}
```

---

## Local Setup and Run Instructions

### Prerequisites

- Node.js (v18 or newer)
- npm
- A MongoDB Atlas account for the database connection string

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

Create a `.env` file in the `/backend` folder and add the following:

```
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=a_strong_secret_key_for_development
JWT_EXPIRE=30d
PORT=5001
```

Start the backend server:

```bash
# Start the server (runs on http://localhost:5001)
npm start
```

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to the frontend directory
cd collaborative-todo

# Install dependencies
npm install
```

Create a `.env` file in the `/collaborative-todo` folder and add:

```
VITE_API_URL=http://localhost:5001
```

Start the React development server:

```bash
# Start the React development server
npm start
```

Your application should now be running and accessible at [http://localhost:5173](http://localhost:5173).
