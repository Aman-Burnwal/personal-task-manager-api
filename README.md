# Personal Task Manager API

A Personal Task Manager API that allows users to manage their daily tasks with basic features like task creation, updates, deletion, and filtering based on priority, due dates, or completion status. Built with **Node.js**, **Express**, and **MySQL** using **Sequelize ORM**. Secure authentication is implemented with **JWT**.

---

## Features

- **User Authentication**
  - Register and login with JWT tokens.
  - Passwords hashed using bcrypt.
- **Task Management**
  - Create, read, update, and delete personal tasks.
  - Only authenticated users can manage their own tasks.
- **Filtering & Sorting**
  - Filter tasks by priority (`low`, `medium`, `high`), due date, or status (`pending`, `completed`).
  - Example: `GET /tasks?priority=high&status=pending`
- **Error Handling**
  - Consistent error responses through global middleware.
  - Example:
    ```json
    {
      "success": false,
      "message": "Task not found"
    }
    ```

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Encryption**: bcrypt
- **Environment Variables**: dotenv

---

## API Documentation

### Auth Routes

| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | Log in & get JWT token |

### Task Routes (Protected)

| Method | Endpoint       | Description                      |
|--------|---------------|----------------------------------|
| POST   | `/tasks`       | Create a new task                |
| GET    | `/tasks`       | Get all tasks for logged-in user |
| GET    | `/tasks/:id`   | Get a specific task by ID        |
| PUT    | `/tasks/:id`   | Update a task                    |
| DELETE | `/tasks/:id`   | Delete a task                    |

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://gitlab.com/banti4/personal-task-manager-api.git
cd personal-task-manager-api
```

### 2. Install Dependencies
```
npm install
```

### 3. Set up Environment Variables
```
DB_HOST = host
DB_USER = username
DB_PASSWORD = password
DB_NAME = database
DB_DIALECT= db_dialect
PORT = port
JWT_SECRET = your_secret_key
```


### 4. Start the Server
```
npm run dev
```
---

## Author
#### BANTI KUMAR
