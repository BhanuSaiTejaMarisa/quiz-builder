const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quizSchema = new mongoose.Schema({
  quizTitle: {
    required: true,
    type: String,
  },
  questions: {
    required: true,
    type: [
      {
        questionText: {
          type: String,
          required: true,
        },
        questionType: {
          type: String,
          required: true,
          default: ["binary", "ss", "mcq"],
        },
        options: {
          required: true,
          type: [String],
          validate: {
            validator: (value) => {
              return (
                Array.isArray(value) &&
                value.every((v) => typeof v === "string")
              );
            },
          },
          message: props => `${props.value} is not a valid array of strings.`
        },
        correctAnswerIndex: {
          required: true,
          //   type: [Number],
          type: Schema.Types.Mixed,
          valldate: (v) => {
            return (
              typeofv === "number" ||
              (Array.isArray(v) && v.every((n) => typeof n === "number"))
            );
          },
          message: "Field must be a number or an array of numbers",
        },
      },
    ],
  },
});

const QuizModel = mongoose.model("Quiz", quizSchema);
module.exports = QuizModel;
