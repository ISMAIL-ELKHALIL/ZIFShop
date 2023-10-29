const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/env");

const customerSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    valid_account: { type: Boolean, default: false },
    last_login: { type: Date },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

//? Add a pre-save hook to hash the password every time a user modifies their password in a user management system.

customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving
    //const salt = await bcrypt.genSaltSync(parseInt(SALT));
    this.password = await bcrypt.hash(this.password, SALT);
  }
  next();
});

const CustomerModel = model("Customer", customerSchema, "customers");

module.exports = { CustomerModel };
