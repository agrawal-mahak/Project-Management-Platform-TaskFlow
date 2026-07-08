# TaskFlow (Trello Clone)

TaskFlow is a full-stack, comprehensive Trello-style Kanban board application designed for seamless task management, team collaboration, and project tracking. It features a modern, responsive user interface and a robust backend to handle real-time data efficiently.

## 🚀 Key Features

* **Kanban Board Interface**: Visualize workflows with drag-and-drop capability using `@hello-pangea/dnd` for cards and lists.
* **Task Management**: Create, edit, and delete tasks. Detailed task modals powered by `react-hook-form` allow for rich information input including descriptions, priority levels, and assignments.
* **Role-Based Authentication**: Secure user login and registration with distinct roles (Admin, Manager, User) controlling access to various features.
* **Real-time State Updates**: Seamless synchronization between the frontend and the MongoDB backend ensures data consistency across CRUD operations.
* **Dynamic User Assignment**: Assign tasks to specific team members using live data populated from the backend.
* **Rich Dashboard & Analytics**: Visualize project progress with a summary page including performance graphs mapping task statuses (e.g., "In Progress", "In Test").
* **Multiple Project Views**: Switch between Board, Summary, Calendar, Timeline, Backlog, List, Code, Activities, and Timesheet tabs for different perspectives on your data.
* **Theming & Design**: Built with a sleek, dynamic aesthetic utilizing CSS variables for consistent theming and micro-animations for an engaging user experience.

## 🛠️ Technology Stack

**Frontend:**
* React (with TypeScript)
* React Router for navigation
* React Hook Form for robust form handling
* `@hello-pangea/dnd` for drag-and-drop functionality
* CSS for styling (Vanilla CSS with CSS variables for theming)
* Vite (Build Tool)

**Backend:**
* Node.js & Express
* MongoDB (with Mongoose)
* JWT for Authentication
* Morgan for request logging

## 📂 Project Structure

The repository is organized into a monolithic structure containing both the client and server code, allowing them to be run concurrently from the root directory.

```
Trello_clone/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # API service calls to the backend
│   │   ├── components/     # Reusable UI components (Navbar, Modals, etc.)
│   │   ├── context/        # React Context providers (if applicable)
│   │   ├── pages/          # Full page views (Board, Login, Team, Summary, etc.)
│   │   └── App.tsx         # Main application routing
│   └── package.json
├── server/                 # Express/Node.js Backend
│   ├── controllers/        # Request handling logic (auth, boards, tasks)
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express API routes
│   └── server.ts           # Entry point for the backend
└── package.json            # Root configuration for concurrently running both apps
```

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (running locally or a MongoDB Atlas connection string)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Trello_clone
   ```

2. **Install Root Dependencies:**
   This project uses `concurrently` at the root level to run both client and server.
   ```bash
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Configuration

Create a `.env` file in the `server` directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Create a `.env` file in the `client` directory (if required) for API URL configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

To run both the frontend and backend servers simultaneously, simply use the root script:

```bash
npm run dev
```

The frontend will typically be accessible at `http://localhost:5173` (if using Vite) and the backend API will run on `http://localhost:5000`.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, feel free to open an issue or submit a pull request.
