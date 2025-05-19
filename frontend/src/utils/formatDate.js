export function formatDate(date) {
  if (!date) return "N/A"

  const d = new Date(date)
  if (isNaN(d.getTime())) return "Invalid Date"

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
