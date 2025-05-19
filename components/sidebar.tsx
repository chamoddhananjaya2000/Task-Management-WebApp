"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, ListTodo, LogOut, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Tasks",
      icon: ListTodo,
      href: "/dashboard/tasks",
      active: pathname.includes("/dashboard/tasks"),
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
  ]

  const onNavigate = (href: string) => {
    setOpen(false)
  }

  return (
    <>
      <aside className="hidden h-full w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <ListTodo className="h-6 w-6 text-blue-600" />
            <span>Gamage Tasks</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-600 ${
                  route.active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-500 hover:text-red-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
              onClick={() => onNavigate("/dashboard")}
            >
              <ListTodo className="h-6 w-6 text-blue-600" />
              <span>Gamage Tasks</span>
            </Link>
          </div>
          <nav className="grid gap-1 px-2 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => onNavigate(route.href)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-blue-600 ${
                  route.active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="mt-4 w-full justify-start text-gray-500 hover:text-red-600"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
