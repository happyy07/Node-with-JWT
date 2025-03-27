require("dotenv").config();
const { User } = require("../models/workoutModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ userName, password: hashPassword });
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ msg: "Invalid username" });
    }

    // if order change in compare it gives error
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginUser };
