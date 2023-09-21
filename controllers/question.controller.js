const QUESTION = require("../models/question.model");
const ANSWER = require("../models/answer.model");

module.exports.createQuestion = async function (req, res) {
  try {
    const { title, options } = req.body;
    let answerIdArray = [];

    await options.forEach(async (element) => {
      const answerdb = new ANSWER(element);
      answerIdArray.push(answerdb._id.toString());
      await answerdb.save();
    });

    const question = new QUESTION({ title: title, options: answerIdArray });
    await question.save();
    res.send(question);
  } catch (error) {
    console.log(error);
    throw new Error("BROKEN");
  }
};

module.exports.createQuestionOption = async function (req, res) {
  try {
    const answerdb = new ANSWER(req.body);
    await answerdb.save();

    const question = await QUESTION.updateOne(
      { _id: req.params.id }, // Use the _id of the question document
      { $push: { options: answerdb._id } }
    );

    res.send(question);
  } catch (error) {
    console.log(error);
    throw new Error("BROKEN");
  }
};

module.exports.getAllQuestions = async function (req, res) {
  const question = await QUESTION.find({}).populate("options");
  res.send(question.reverse());
};

module.exports.getQuestionsDetails = async function (req, res) {
  try {
    const question = await QUESTION.findById(req.params.id).populate("options");

    res.send(question);
  } catch (error) {
    console.log(error);
    throw new Error("BROKEN");
  }
};

module.exports.deleteQuestions = async function (req, res) {
  try {
    const question = await QUESTION.findById(req.params.id).populate("options");
    let isDeletable = true;
    question.options.forEach((answer) => {
      if (answer.vote !== 0) {
        isDeletable = false;
      }
    });
    console.log(isDeletable);
    if (isDeletable) {
      console.log("this ran");
      await QUESTION.findByIdAndRemove(req.params.id);
      res.status(200).send(`${req.params.id} deleted successfully.`);
    } else {
      res
        .status(500)
        .send("Some answers of this questions have vote. cannot be deleted");
    }
  } catch (error) {
    res.send(error);
  }
};
