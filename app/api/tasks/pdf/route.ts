import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { formatDate } from "@/lib/utils"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || ""

    const { db } = await connectToDatabase()

    const filter: any = {}
    if (status) {
      filter.status = status
    }

    const tasks = await db.collection("tasks").find(filter).sort({ deadline: 1 }).toArray()

    // Format tasks for PDF
    const formattedTasks = tasks.map((task: any) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      deadline: formatDate(task.deadline),
      assignedTo: task.assignedTo,
      status: task.status,
    }))

    return NextResponse.json(formattedTasks)
  } catch (error) {
    console.error("Error generating PDF data:", error)
    return NextResponse.json({ error: "Failed to generate PDF data" }, { status: 500 })
  }
}
