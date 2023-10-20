const { Schema, model } = require("mongoose");
const hash = require("object-hash"); // object-hash  hashing library like bcrypt

const customerSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    valid_account: { type: Boolean, default: false },
    last_login: { type: Date },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//? Add a pre-save hook to hash the password every time a user modifies their password in a user management system.

customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving
    this.password = hash.MD5(this.password);
  }
  next();
});

const CustomerModel = model("Customer", customerSchema);

module.exports = { CustomerModel };
