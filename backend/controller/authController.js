const Users = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, country, phone, password } = req.body;

    if (!name || !email || !country || !phone || !password) {
      return res
        .status(400)
        .json({ message: "name,email,country,phone,password are required" });
    }

    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "already have an account" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      country,
      phone,
      password: hashpassword,
    });

    await user.save();

    return res.status(201).json({ message: "Account created successfully" });
  } catch (e) {
    return res.status(500).json({ message: "failed to signup", e: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const userExists = await Users.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    const hashpassword = await bcrypt.compare(password, userExists.password);
    if (!hashpassword) {
      return res.status(401).json({ message: "incorrect password" });
    }

    const token = jwt.sign(
      { id: userExists._id, email: userExists.email },
      "secretKey123",
      { expiresIn: "1hr" }
    );

    return res
      .status(200)
      .json({
        message: "login successful",
        token: token,
        id: userExists._id,
        name: userExists.name,
      });
  } catch (e) {
    return res.status(500).json({ message: "failed to login", e: e.message });
  }
};

const getData = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await Users.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ data: userExists, message: "data sent successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "failed to get data", error: err.message });
  }
};

module.exports = { signup, login, getData };
