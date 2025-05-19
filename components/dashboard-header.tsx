"use client"

import { useSession } from "next-auth/react"

export function DashboardHeader() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user?.name || "Admin"}! Here's an overview of your tasks.</p>
    </div>
  )
}
