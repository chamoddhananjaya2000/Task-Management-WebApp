"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import api from "../utils/api"

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
    status: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`)
        const task = response.data

        // Format the date for the date input (YYYY-MM-DD)
        const formattedDeadline = new Date(task.deadline).toISOString().split("T")[0]

        setFormData({
          title: task.title,
          description: task.description,
          deadline: formattedDeadline,
          assignedTo: task.assignedTo,
          status: task.status,
        })
      } catch (error) {
        console.error("Error fetching task:", error)
        navigate("/tasks")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTask()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required"
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = "Assignee name is required"
    } else if (formData.assignedTo.trim().length < 3) {
      newErrors.assignedTo = "Assignee name must be at least 3 characters"
    }

    if (!formData.status) {
      newErrors.status = "Status is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await api.put(`/api/tasks/${id}`, formData)
      navigate(`/tasks/${id}`)
    } catch (error) {
      console.error("Error updating task:", error)
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`)
      } else {
        alert("An error occurred while updating the task")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Task</h1>
          <p className="text-gray-500">Update task details</p>
        </div>

        <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.title ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              <p className="mt-1 text-sm text-gray-500">A clear and concise title for the task.</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`mt-1 block w-full rounded-md border ${
                  errors.description ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              <p className="mt-1 text-sm text-gray-500">Provide a detailed description of what needs to be done.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.deadline ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
                <p className="mt-1 text-sm text-gray-500">The date by which the task should be completed.</p>
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.assignedTo ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.assignedTo && <p className="mt-1 text-sm text-red-600">{errors.assignedTo}</p>}
                <p className="mt-1 text-sm text-gray-500">The name of the intern assigned to this task.</p>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.status ? "border-red-300" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
              <p className="mt-1 text-sm text-gray-500">The current status of the task.</p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 inline h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Task"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/tasks/${id}`)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
