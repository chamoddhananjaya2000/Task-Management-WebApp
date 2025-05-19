"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { ChromeIcon as Google } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Google login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Google className="h-4 w-4" />
            <span>Sign in with Google</span>
          </div>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Secure Authentication</span>
        </div>
      </div>

      <Card className="p-4 text-center text-sm text-gray-500 bg-gray-50">
        <p>This application uses Google OAuth 2.0 for secure authentication.</p>
        <p className="mt-1">Only authorized Gamage Recruiters staff can access the system.</p>
      </Card>
    </div>
  )
}
