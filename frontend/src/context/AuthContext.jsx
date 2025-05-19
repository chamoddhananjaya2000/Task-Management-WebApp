"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/auth/user")
        setIsAuthenticated(response.data.isAuthenticated)
        setUser(response.data.user)
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Login with Google (redirects to Google OAuth)
  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  // Logout
  const logout = async () => {
    try {
      await api.get("/auth/logout")
      setIsAuthenticated(false)
      setUser(null)
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    loginWithGoogle,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
