const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: String,
    token: { type: String, default: generate.random(21) },
    phone: String,
    avatar: String,
    role_id: { type: String, default: "" },
    status: { type: String, default: "active" },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
