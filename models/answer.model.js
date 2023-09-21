const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    title: String,
    vote: Number,
    link_to_vote: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ANSWER", answerSchema);
