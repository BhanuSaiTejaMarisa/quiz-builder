const QuizModel = require("../models/QuizModel");

const quizRouter = require("express").Router();

quizRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const updatedData = new QuizModel(data);
    await updatedData.save();
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
quizRouter.get("/", async (req, res) => {
  try {
    const quizes = await QuizModel.find();
    res.status(200).json(quizes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = quizRouter;
