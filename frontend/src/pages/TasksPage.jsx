"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import api from "../utils/api"
import { formatDate } from "../utils/formatDate"
import { generatePDF } from "../utils/pdfGenerator"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [filters, setFilters] = useState({
    query: "",
    status: "",
    sort: "deadline",
  })
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await api.get("/api/tasks", { params: filters })
      setTasks(response.data)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    fetchTasks()
  }

  const resetFilters = () => {
    setFilters({
      query: "",
      status: "",
      sort: "deadline",
    })
    fetchTasks()
  }

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`)
      setTasks(tasks.filter((task) => task._id !== id))
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setTaskToDelete(null)
    }
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(filters)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <Link to="/tasks/new" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Task
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="query"
              placeholder="Search tasks..."
              value={filters.query}
              onChange={handleFilterChange}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-[180px]"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-[180px]"
          >
            <option value="deadline">Deadline</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>

          <div className="flex gap-2">
            <button onClick={applyFilters} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="rounded-lg border-2 border-blue-100 bg-white shadow-sm">
          <div className="flex justify-between p-4">
            <h2 className="text-xl font-semibold">Task List</h2>
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF || tasks.length === 0}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 inline h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {isGeneratingPDF ? "Generating..." : "Download PDF Report"}
            </button>
          </div>

          {loading ? (
            <div className="p-4">
              <div className="flex animate-pulse flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 rounded-md bg-gray-200" />
                ))}
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-blue-50 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by creating a new task</p>
              <Link to="/tasks/new">
                <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Add your first task
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Assigned To</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm text-gray-700">
                  {tasks.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{task.title}</td>
                      <td className="px-4 py-3">{task.assignedTo}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formatDate(task.deadline)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/tasks/${task._id}`}
                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                            title="View"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
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
                          </Link>
                          <Link
                            to={`/tasks/${task._id}/edit`}
                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => setTaskToDelete(task._id)}
                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium">Are you sure?</h3>
            <p className="mt-2 text-sm text-gray-500">
              This action cannot be undone. This will permanently delete the task.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setTaskToDelete(null)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(taskToDelete)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
