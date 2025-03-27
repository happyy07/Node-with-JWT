const express = require("express");
const router = express.Router();
const WorkoutDocs = require("../models/workoutModel");

router.get("/:name", async (req, res) => {
  const { name } = req.params; // Extract 'name' from the URL

  try {
    const workout = await WorkoutDocs.findOne({ title: name }); // Query by name (title)
    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }
    res.status(200).json(workout); // Return the found workout
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Error handling
  }
});

module.exports = router;
