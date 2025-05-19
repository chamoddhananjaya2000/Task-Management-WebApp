const express = require("express")
const passport = require("passport")
const router = express.Router()

// Google OAuth login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"}/login`,
    session: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL || "http://localhost:3000"}/dashboard`)
  },
)

// Get current user
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
      },
    })
  } else {
    res.json({
      isAuthenticated: false,
      user: null,
    })
  }
})

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" })
    }
    res.json({ success: true })
  })
})

module.exports = router
