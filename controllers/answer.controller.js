const ANSWER = require("../models/answer.model");

module.exports.addVote = async function (req, res) {
  try {
    // Find the answer document by its _id
    const answerdb = await ANSWER.findById(req.params.id);

    if (!answerdb) {
      // Handle the case where the answer with the provided ID was not found
      res.status(404).send("Option not found");
      return;
    }

    const answer = await ANSWER.updateOne(
      { _id: req.params.id }, // Use the _id of the question document
      { vote: answerdb.vote + 1 }
    );
    res.send(answer);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteAnswer = async function (req, res) {
  try {
    const option = ANSWER.findById(req.params.id);
    if (option.vote !== 0) {
      res.status(500).send("Cannot be delete option with likes");
    }

    await ANSWER.findByIdAndDelete(req.params.id);
    res.send("Option deleted");
  } catch (error) {
    console.log(error);
  }
};
