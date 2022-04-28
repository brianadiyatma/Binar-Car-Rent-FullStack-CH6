const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    unique: false,
    required: [true, "Nama Depan Harus Diisi"],
  },
  last_name: {
    type: String,
    required: true,
    unique: false,
    required: [true, "Nama Belakang Harus Diisi"],
  },
  email: {
    type: String,
    required: [true, "Email Wajib Diisi"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Email Tidak Valid"],
  },
  password: {
    type: String,
    required: [true, "Password Wajib Diisi"],
    minlength: [8, "Password Minimal 8 Karakter"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
