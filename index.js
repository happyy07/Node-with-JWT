require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend URL
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({ origin: frontendURL }));

// Middleware to parse incoming JSON request bodies.
app.use(express.json());

// Middleware function that runs on every request.
app.use((req, res, next) => {
  console.log(req.path, req.method);
  // Without next(), the request would never reach the route handlers.
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB.
mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME }) // Returns a Promise
  .then(() => {
    // Executes on successful connection or Executes a callback after the Promise resolves successfully.
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Executes on connection error
    console.error(error);
  });
