const Task = require("../models/Task")

// Get all tasks with optional filtering
exports.getTasks = async (req, res) => {
  try {
    const { query, status, sort } = req.query

    // Build filter object
    const filter = {}

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { assignedTo: { $regex: query, $options: "i" } },
      ]
    }

    if (status && status !== "all") {
      filter.status = status
    }

    // Build sort object
    const sortOption = {}
    if (sort === "deadline") {
      sortOption.deadline = 1
    } else if (sort === "title") {
      sortOption.title = 1
    } else if (sort === "status") {
      sortOption.status = 1
    } else {
      sortOption.createdAt = -1 // Default sort by creation date (newest first)
    }

    // Find tasks
    const tasks = await Task.find(filter).sort(sortOption).populate("createdBy", "name email")

    res.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
}

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("createdBy", "name email")

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    res.status(500).json({ error: "Failed to fetch task" })
  }
}

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body

    // Validate required fields
    if (!title || !description || !deadline || !assignedTo || !status) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Create new task
    const task = new Task({
      title,
      description,
      deadline: new Date(deadline),
      assignedTo,
      status,
      createdBy: req.user._id,
    })

    await task.save()

    res.status(201).json(task)
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ error: "Failed to create task" })
  }
}

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body

    // Validate required fields
    if (!title || !description || !deadline || !assignedTo || !status) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Find and update task
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        deadline: new Date(deadline),
        assignedTo,
        status,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    )

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ error: "Failed to update task" })
  }
}

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ error: "Failed to delete task" })
  }
}

// Get data for PDF generation
exports.getPdfData = async (req, res) => {
  try {
    const { status } = req.query

    // Build filter object
    const filter = {}
    if (status && status !== "all") {
      filter.status = status
    }

    // Find tasks
    const tasks = await Task.find(filter).sort({ deadline: 1 }).populate("createdBy", "name email")

    // Format tasks for PDF
    const formattedTasks = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      deadline: task.deadline.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      assignedTo: task.assignedTo,
      status: task.status,
      createdBy: task.createdBy.name,
    }))

    res.json(formattedTasks)
  } catch (error) {
    console.error("Error generating PDF data:", error)
    res.status(500).json({ error: "Failed to generate PDF data" })
  }
}
