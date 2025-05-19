"use client"

import { useAuth } from "../context/AuthContext"
import Layout from "../components/Layout"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>

        <div className="rounded-lg border-2 border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
            {user?.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-24 w-24 rounded-full" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-600">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
              <p className="text-gray-500">{user?.email || "No email available"}</p>
              <p className="mt-2 text-sm text-gray-500">Authenticated via Google OAuth</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium">Account Actions</h3>
            <div className="mt-4">
              <button onClick={logout} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 inline h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v1H5a1 1 0 100 2h4v1a1 1 0 102 0V9.414l3 3V16H5V8h4V7a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
