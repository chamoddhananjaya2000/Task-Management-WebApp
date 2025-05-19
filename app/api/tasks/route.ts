import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query") || ""
    const status = searchParams.get("status") || ""
    const sort = searchParams.get("sort") || "deadline"

    const { db } = await connectToDatabase()

    const filter: any = {}

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { assignedTo: { $regex: query, $options: "i" } },
      ]
    }

    if (status) {
      filter.status = status
    }

    const sortOption: any = {}
    if (sort === "deadline") {
      sortOption.deadline = 1
    } else if (sort === "title") {
      sortOption.title = 1
    } else if (sort === "status") {
      sortOption.status = 1
    }

    const tasks = await db.collection("tasks").find(filter).sort(sortOption).toArray()

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, deadline, assignedTo, status } = body

    if (!title || !description || !deadline || !assignedTo || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const task = {
      title,
      description,
      deadline: new Date(deadline),
      assignedTo,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("tasks").insertOne(task)

    return NextResponse.json({ ...task, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
