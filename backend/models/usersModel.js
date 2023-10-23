const { Schema, model } = require("mongoose");
const { SALT } = require("../config/env");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    last_login: { type: Date },
  },
  {
    timestamps: true,
  }
);

//? Add a pre-save hook to hash the password every time a user modifies their password in a user management system.

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, SALT);
  }
  next();
});

const UserModel = model("User", userSchema);

module.exports = { UserModel };
