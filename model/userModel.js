const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "None"],
    default: "None",
  },
  email: String,
  avatar: String,
  bio: String,
  isPremium: { type: Boolean, default: false },
  plans: [[{ type: mongoose.Schema.Types.ObjectId }]],
});

var Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
