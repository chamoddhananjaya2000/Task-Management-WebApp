"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Eye } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"

type Task = {
  _id: string
  title: string
  description: string
  deadline: string
  assignedTo: string
  status: string
}

export function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks")
        const data = await response.json()
        // Get only the 5 most recent tasks
        setTasks(data.slice(0, 5))
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getStatusColor = (status: string) => {
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
    <Card className="border-2 border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tasks</CardTitle>
        <Link href="/dashboard/tasks">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex animate-pulse flex-col gap-2">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            <p>No tasks found. Create your first task!</p>
            <Link href="/dashboard/tasks/new">
              <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Add Task</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="flex flex-col gap-1 rounded-lg border p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
                <p className="line-clamp-1 text-sm text-gray-500">{task.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{formatDate(task.deadline)}</span>
                  </div>
                  <Link href={`/dashboard/tasks/${task._id}/view`}>
                    <Button size="sm" variant="ghost">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
