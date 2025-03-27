const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema({
  userName: {
    type: String, // Corrected type to String
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export both models
const Workout = mongoose.model("Workout", workoutSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Workout, User };
