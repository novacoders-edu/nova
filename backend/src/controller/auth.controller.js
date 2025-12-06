const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, fullName, role } = req.body;
    const isUserExists = await usermodel.findOne({ email }, { userName });

    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      userName,
      email,
      password: hashedPassword,
      fullName,
      role
    });
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await usermodel
      .findOne({ $or: [{ email }, { userName }] })
      .select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ message: "User Login successfully", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  return res.status(200).json({
    message: "Current user fatched successfully",
    user: req.user,
  });
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error" });
  }
};
