import { TaskForm } from "@/components/task-form"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getTask } from "@/lib/tasks"

export default async function EditTaskPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const task = await getTask(params.id)

  if (!task) {
    redirect("/dashboard/tasks")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Task</h1>
        <p className="text-gray-500">Update task details</p>
      </div>
      <TaskForm task={task} />
    </div>
  )
}
