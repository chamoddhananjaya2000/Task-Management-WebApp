"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Layout from "../components/Layout"
import api from "../utils/api"
import { formatDate } from "../utils/formatDate"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/tasks")
        const tasks = response.data

        // Calculate stats
        const taskStats = {
          total: tasks.length,
          pending: tasks.filter((task) => task.status.toLowerCase() === "pending").length,
          inProgress: tasks.filter((task) => task.status.toLowerCase() === "in progress").length,
          completed: tasks.filter((task) => task.status.toLowerCase() === "done").length,
        }

        setStats(taskStats)

        // Get recent tasks (5 most recent)
        setRecentTasks(tasks.slice(0, 5))
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "done":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || "Admin"}! Here's an overview of your tasks.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium">Total Tasks</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.total}
            </div>
            <p className="text-xs text-gray-500">All assigned tasks</p>
          </div>

          <div className="rounded-lg border-2 border-yellow-100 bg-white p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium">Pending Tasks</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.pending}
            </div>
            <p className="text-xs text-gray-500">Tasks not yet started</p>
          </div>

          <div className="rounded-lg border-2 border-green-100 bg-white p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium">Completed Tasks</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold">
              {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.completed}
            </div>
            <p className="text-xs text-gray-500">Successfully completed tasks</p>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="rounded-lg border-2 border-blue-100 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <Link to="/tasks" className="rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
              View All
            </Link>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex animate-pulse flex-col gap-2">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : recentTasks.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <p>No tasks found. Create your first task!</p>
                <Link
                  to="/tasks/new"
                  className="mt-2 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add Task
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task._id} className="flex flex-col gap-1 rounded-lg border p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">{task.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{formatDate(task.deadline)}</span>
                      </div>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 inline h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
