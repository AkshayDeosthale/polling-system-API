const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    title: String,
    vote: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ANSWER", answerSchema);
