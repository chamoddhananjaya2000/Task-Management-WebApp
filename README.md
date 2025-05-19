# Task Management System

A full-stack Task Management System for Gamage Recruiters to manage intern tasks.

## Features

- **Authentication**: Google OAuth 2.0 for secure login
- **Task Management**: Create, read, update, and delete tasks
- **PDF Reports**: Generate PDF reports of tasks
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js with Google OAuth 2.0
- **PDF Generation**: jsPDF

## Project Structure

\`\`\`
task-management-system/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
\`\`\`

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Google Developer Console project with OAuth credentials

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
   \`\`\`

2. Install backend dependencies:
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. Install frontend dependencies:
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

4. Create a `.env` file in the backend directory with the following variables:
   \`\`\`
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:5000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   \`\`\`

5. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Start the frontend development server:
   \`\`\`bash
   cd ../frontend
   npm run dev
   \`\`\`

7. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Sign in with your Google account
2. Navigate to the Tasks page to view, add, edit, or delete tasks
3. Use the filter and sort options to organize tasks
4. Generate PDF reports of tasks with the "Download PDF Report" button

## License

This project is licensed under the MIT License - see the LICENSE file for details.
