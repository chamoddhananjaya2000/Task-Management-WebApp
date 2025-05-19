import { TaskForm } from "@/components/task-form"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function NewTaskPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Task</h1>
        <p className="text-gray-500">Create a new task for an intern</p>
      </div>
      <TaskForm />
    </div>
  )
}
