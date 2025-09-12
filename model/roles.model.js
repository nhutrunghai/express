const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const { Schema } = mongoose;
const RolesSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    permission: { type: Array, default: [] },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);
const Roles = mongoose.model("Roles", RolesSchema, "roles");
module.exports = Roles;
