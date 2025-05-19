import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Edit, User } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getTask } from "@/lib/tasks"
import { formatDate } from "@/lib/utils"

export default async function ViewTaskPage({
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Task Details</h1>
        <Link href={`/dashboard/tasks/${params.id}`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Task
          </Button>
        </Link>
      </div>

      <Card className="border-2 border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <p className="mt-2 whitespace-pre-line text-gray-700">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Assigned To</p>
                <p className="font-medium">{task.assignedTo}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{formatDate(task.deadline)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{formatDate(task.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">{formatDate(task.updatedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/tasks" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Tasks
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
