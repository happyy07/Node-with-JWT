const { Workout } = require("../models/workoutModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  console.log("happy=>", req.user);
  try {
    const data = await Workout.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    // If you pass a string to findById(), Mongoose automatically converts it to an ObjectId before querying the database.
    const data = await Workout.findById(id);

    if (!data) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createWorkout = async (req, res) => {
  console.log(req.body);
  const { title, reps, load } = req.body;

  try {
    const data = await Workout.create({ title, reps, load });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }
    const data = await Workout.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    res.status(200).json({ msg: `Workout with ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: "Invalid ID format" });
    }

    //The spread operator is used to extract all properties from req.body and pass them into a new object.
    const data = await Workout.updateOne({ _id: id }, { ...req.body });

    if (!data) {
      res.status(404).json({ msg: "Workout not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
