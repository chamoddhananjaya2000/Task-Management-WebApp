"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { generatePDF } from "@/lib/pdf-generator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Task = {
  _id: string
  title: string
  description: string
  deadline: string
  assignedTo: string
  status: string
}

export function TaskList({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const router = useRouter()

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

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id))
        router.refresh()
      } else {
        console.error("Failed to delete task")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setTaskToDelete(null)
    }
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(tasks)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <>
      <Card className="border-2 border-blue-100">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-semibold">Task List</h2>
          <Button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF || tasks.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? "Generating..." : "Download PDF Report"}
          </Button>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-blue-50 p-3">
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
            <p className="mt-2 text-sm text-gray-500">Get started by creating a new task</p>
            <Link href="/dashboard/tasks/new">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Add your first task</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3 text-gray-500" />
                        {formatDate(task.deadline)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/tasks/${task._id}/view`}>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/dashboard/tasks/${task._id}`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => setTaskToDelete(task._id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => taskToDelete && handleDeleteTask(taskToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Import this at the top of the file
import { ListTodo } from "lucide-react"
