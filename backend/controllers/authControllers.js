const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const new_user = new User({
      email: email,
      password: hashed_password,
    });
    await new_user.save();
    res.status(200).send({ message: "Signup successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const correct_password = await bcrypt.compare(password, user.password);
    if (correct_password) {
      const jwt_token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // Set the token as an HTTP-only cookie
      res.cookie("token", jwt_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                maxAge: 3600000, // 1 hour
                sameSite: "Strict", // or 'Lax', depending on your needs
            });
      return res.status(200).send({ message: "Login Successful" });
    } else {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {

    try {
        const token = req.cookies.token;
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0
    });
    res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error during logout' });
    }
}

module.exports = { signup, login, logout };
