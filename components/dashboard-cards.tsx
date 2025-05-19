"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ListTodo } from "lucide-react"
import { useEffect, useState } from "react"

type TaskStats = {
  total: number
  pending: number
  inProgress: number
  completed: number
}

export function DashboardCards() {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/tasks")
        const tasks = await response.json()

        const taskStats = {
          total: tasks.length,
          pending: tasks.filter((task: any) => task.status.toLowerCase() === "pending").length,
          inProgress: tasks.filter((task: any) => task.status.toLowerCase() === "in progress").length,
          completed: tasks.filter((task: any) => task.status.toLowerCase() === "done").length,
        }

        setStats(taskStats)
      } catch (error) {
        console.error("Failed to fetch task stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-2 border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.total}
          </div>
          <p className="text-xs text-gray-500">All assigned tasks</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-yellow-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.pending}
          </div>
          <p className="text-xs text-gray-500">Tasks not yet started</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-green-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-gray-200" /> : stats.completed}
          </div>
          <p className="text-xs text-gray-500">Successfully completed tasks</p>
        </CardContent>
      </Card>
    </div>
  )
}
