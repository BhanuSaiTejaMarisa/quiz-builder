const QuizModel = require("../models/QuizModel");

async function getAll(req, res) {
  try {
    const quizes = await QuizModel.find();
    const response = quizes.map(({ _id, quizTitle }) => ({
      _id, quizTitle
    }))
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function postQuiz(req, res) {
  try {
    const data = req.body;
    const updatedData = new QuizModel(data);
    await updatedData.save();
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getQuizById(req, res) {
  try {
    const { quizId } = req.params;
    const quiz = await QuizModel.findById(quizId);
    const response = quiz.questions.map(({ options, questionText, questionType, _id }) => ({ options, questionText, questionType, _id }))

    res.status(200).json({ questions: response, quizTitle: quiz.quizTitle })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}
async function answerQuiz(req, res) {
  try {
    const { quizId } = req.params;
    const { userAnswers } = req.body;
    const quiz = await QuizModel.findById(quizId);
    const correctAnswers = quiz.questions.map(({ correctAnswerIndex }) => (correctAnswerIndex))
    const score = userAnswers.reduce((a, b, index) => {
      if (typeof b === "number") {
        if (Number(b) === correctAnswers[index]) {
          return a + 1
        }
        else {
          return a + 0;
        }
      }
      else if (typeof b === "object") {
        let userCorrectAns = correctAnswers[index].filter((ans, ansIndex) => ans === b[ansIndex] && ans === 1).length;
        let TotalCorrectAns = correctAnswers[index].filter(ans => ans === 1).length;
        return a + (userCorrectAns / TotalCorrectAns);
      }
      return a + 0;
    }, 0)
    res.status(200).json({ score })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { getAll, postQuiz, getQuizById, answerQuiz }
