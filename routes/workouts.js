const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const authenticateToken = require("../controllers/authentication");

router.get("/", authenticateToken, getAllWorkouts);

router.post("/", authenticateToken, createWorkout);

router.get("/:id", authenticateToken, getWorkoutById);

router.delete("/:id", authenticateToken, deleteWorkout);

router.patch("/:id", authenticateToken, updateWorkout);

module.exports = router;
