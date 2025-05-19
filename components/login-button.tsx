"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { ChromeIcon as Google } from "lucide-react"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogin} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
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
  )
}
