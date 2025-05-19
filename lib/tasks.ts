import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function getTasks({
  query = "",
  status = "",
  sort = "deadline",
}: {
  query?: string
  status?: string
  sort?: string
}) {
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

  return tasks
}

export async function getTask(id: string) {
  const { db } = await connectToDatabase()

  try {
    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) })

    return task
  } catch (error) {
    console.error("Error fetching task:", error)
    return null
  }
}
