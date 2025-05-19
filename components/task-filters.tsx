"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function TaskFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "deadline")

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (query) params.set("query", query)
    if (status) params.set("status", status)
    if (sort) params.set("sort", sort)

    router.push(`/dashboard/tasks?${params.toString()}`)
  }

  const resetFilters = () => {
    setQuery("")
    setStatus("")
    setSort("deadline")
    router.push("/dashboard/tasks")
  }

  useEffect(() => {
    // Apply filters when component mounts to sync URL with state
    if (searchParams.toString()) {
      applyFilters()
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deadline">Deadline</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  )
}
