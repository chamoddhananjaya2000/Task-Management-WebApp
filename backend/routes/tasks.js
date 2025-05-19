const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")

// Get all tasks with optional filtering
router.get("/", taskController.getTasks)

// Get a single task by ID
router.get("/:id", taskController.getTaskById)

// Create a new task
router.post("/", taskController.createTask)

// Update a task
router.put("/:id", taskController.updateTask)

// Delete a task
router.delete("/:id", taskController.deleteTask)

// Generate PDF data
router.get("/pdf/generate", taskController.getPdfData)

module.exports = router
