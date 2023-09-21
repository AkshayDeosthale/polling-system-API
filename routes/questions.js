const express = require("express");
const router = express.Router();
const QuestionsController = require("../controllers/question.controller");

//get all document
router.get("/", QuestionsController.getAllQuestions);

// Form to create a new document
router.post("/create", QuestionsController.createQuestion);
//get single document details
router.get("/:id", QuestionsController.getQuestionsDetails);
//create an option
router.get("/:id/options/create", QuestionsController.createQuestionOption);

//delete document
router.delete("/:id/delete", QuestionsController.deleteQuestions);

module.exports = router;
