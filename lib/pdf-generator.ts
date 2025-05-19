import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatDate } from "@/lib/utils"

type Task = {
  _id: string
  title: string
  description: string
  deadline: string
  assignedTo: string
  status: string
}

export async function generatePDF(tasks: Task[]) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("Gamage Recruiters - Task Report", 14, 22)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

  // Add task count
  doc.text(`Total Tasks: ${tasks.length}`, 14, 36)

  // Status counts
  const pendingCount = tasks.filter((task) => task.status.toLowerCase() === "pending").length
  const inProgressCount = tasks.filter((task) => task.status.toLowerCase() === "in progress").length
  const doneCount = tasks.filter((task) => task.status.toLowerCase() === "done").length

  doc.text(`Pending: ${pendingCount} | In Progress: ${inProgressCount} | Done: ${doneCount}`, 14, 42)

  // Create table data
  const tableData = tasks.map((task) => [
    task.title,
    task.assignedTo,
    formatDate(task.deadline),
    task.status,
    task.description.substring(0, 30) + (task.description.length > 30 ? "..." : ""),
  ])

  // Add table
  autoTable(doc, {
    head: [["Title", "Assigned To", "Deadline", "Status", "Description"]],
    body: tableData,
    startY: 50,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [59, 130, 246] },
    alternateRowStyles: { fillColor: [240, 247, 255] },
    margin: { top: 50 },
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(
      "Gamage Recruiters - Task Management System",
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    )
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10)
  }

  // Save the PDF
  doc.save("task-report.pdf")
}
