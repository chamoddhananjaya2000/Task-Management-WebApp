import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Clock, ListTodo } from "lucide-react"
import Link from "next/link"
import { LoginButton } from "@/components/login-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Gamage Recruiters
              <span className="block text-blue-600">Task Management System</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
              Streamline your intern task management with our comprehensive platform. Track progress, set deadlines, and
              generate reports with ease.
            </p>
            <div className="mt-8 flex justify-center">
              <LoginButton />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-blue-600" />
                  Task Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Create, edit, and delete tasks with ease. Assign tasks to interns and track their progress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Deadline Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Set deadlines for tasks and receive notifications when they are approaching.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Progress Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Track the progress of tasks and generate PDF reports for performance analysis.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Link href="/login">
              <Button className="group bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
