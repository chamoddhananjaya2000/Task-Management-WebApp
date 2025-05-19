const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const passport = require("passport")
const session = require("express-session")
const { Strategy: GoogleStrategy } = require("passport-google-oauth20")
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")
const { authMiddleware } = require("./middlewares/auth")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || "http://localhost:5000"}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in database
        let user = await mongoose.model("User").findOne({ googleId: profile.id })

        // If not, create a new user
        if (!user) {
          user = await mongoose.model("User").create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongoose.model("User").findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/auth", authRoutes)
app.use("/api/tasks", authMiddleware, taskRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
