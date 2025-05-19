"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Layout from "../components/Layout"
import api from "../utils/api"
import { formatDate } from "../utils/formatDate"

export default function ViewTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`)
        setTask(response.data)
      } catch (error) {
        console.error("Error fetching task:", error)
        navigate("/tasks")
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id, navigate])

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

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Task Details</h1>
          <Link
            to={`/tasks/${id}/edit`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Task
          </Link>
        </div>

        <div className="rounded-lg border-2 border-blue-100 bg-white shadow-sm">
          <div className="border-b p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{task.title}</h2>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="mt-2 whitespace-pre-line text-gray-700">{task.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{task.assignedTo}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{formatDate(task.deadline)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{formatDate(task.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p className="font-medium">{formatDate(task.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-6">
            <Link to="/tasks" className="w-full">
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
                Back to Tasks
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
