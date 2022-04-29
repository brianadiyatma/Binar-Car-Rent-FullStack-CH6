const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

require("dotenv").config();

const maxAge = "3d";
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Ada kesalahan dalam server",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Email Tidak Terdaftar",
      });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          message: "Ada kesalahan dalam server",
          error: err.message,
        });
      }
      if (!isMatch) {
        return res.status(401).json({
          message: "Password Salah",
        });
      }
      const token = jwt.sign(
        {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          userId: user._id,
          privilege: user.privilege,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: maxAge,
        }
      );
      return res.status(200).json({
        message: "Login Berhasil",
        token: token,
      });
    });
  });
};
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, privilege } = req.body;

  try {
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      privilege: privilege || "user",
    });

    const savedUser = await user.save();
    const token = jwt.sign(
      {
        firstName: savedUser.first_name,
        lastName: user.last_name,
        email: savedUser.email,
        userId: savedUser._id,
        privilege: user.privilege,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: maxAge,
      }
    );
    res.status(201).json({
      message: "User Sukses dibuat",
      token: token,
    });
  } catch (error) {

    res.status(500).json({
      message: "Ada Kesalahan ketika membuat user",
      error: error.message,
    });
  }
};
