"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import EditTaskPage from "./pages/EditTaskPage"
import ViewTaskPage from "./pages/ViewTaskPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/new"
        element={
          <ProtectedRoute>
            <NewTaskPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:id/edit"
        element={
          <ProtectedRoute>
            <EditTaskPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <ViewTaskPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
