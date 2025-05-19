"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Gamage Recruiters
              <span className="block text-blue-600">Task Management System</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
              Streamline your intern task management with our comprehensive platform. Track progress, set deadlines, and
              generate reports with ease.
            </p>
            <div className="mt-8 flex justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v3.586l2.707 2.707a1 1 0 11-1.414 1.414l-3-3a1 1 0 01-.293-.707V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Task Management
              </div>
              <p className="text-sm text-gray-600">
                Create, edit, and delete tasks with ease. Assign tasks to interns and track their progress.
              </p>
            </div>

            <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Deadline Tracking
              </div>
              <p className="text-sm text-gray-600">
                Set deadlines for tasks and receive notifications when they are approaching.
              </p>
            </div>

            <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Progress Tracking
              </div>
              <p className="text-sm text-gray-600">
                Track the progress of tasks and generate PDF reports for performance analysis.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="group inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
