const mongoose = require("mongoose");
const ANSWER = require("./answer.model");

const questionSchema = new mongoose.Schema(
  {
    title: String,
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ANSWER" }],
  },
  {
    timestamps: true,
  }
);

// Set up a pre hook to remove associated answers when a question is removed
questionSchema.pre("remove", function (next) {
  // Remove the associated answer documents
  ANSWER.remove({ _id: { $in: this.answers } }, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
});

module.exports = mongoose.model("QUESTION", questionSchema);
