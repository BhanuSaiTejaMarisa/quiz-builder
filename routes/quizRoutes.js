const { getAll, postQuiz, getQuizById, answerQuiz } = require("../controllers/quizController");
const QuizModel = require("../models/QuizModel");

const quizRouter = require("express").Router();

quizRouter.post("/", postQuiz);
quizRouter.get("/", getAll);
quizRouter.get("/:quizId", getQuizById)
quizRouter.post("/:quizId", answerQuiz)

module.exports = quizRouter;
