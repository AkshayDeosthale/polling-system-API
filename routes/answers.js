const express = require("express");
const router = express.Router();
const AnswersController = require("../controllers/answer.controller");

//get single document details
router.get("/:id/add-vote", AnswersController.addVote);

//delete document
router.delete("/:id/delete", AnswersController.deleteAnswer);

module.exports = router;
