import { TaskList } from "@/components/task-list"
import { TaskFilters } from "@/components/task-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getTasks } from "@/lib/tasks"

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { query?: string; status?: string; sort?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const { query, status, sort } = searchParams
  const rawTasks = await getTasks({ query, status, sort })

  // ✅ Convert MongoDB documents to plain objects and ensure all Task fields are present
  const tasks = rawTasks.map(task => ({
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    deadline: task.deadline ? task.deadline.toISOString?.() : null,
    assignedTo: task.assignedTo,
    status: task.status,
    createdAt: task.createdAt?.toISOString?.(),
    updatedAt: task.updatedAt?.toISOString?.(),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Link href="/dashboard/tasks/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </Link>
      </div>
      <TaskFilters />
      <TaskList tasks={tasks} />
    </div>
  )
}
