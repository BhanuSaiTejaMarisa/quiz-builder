import "./QuizPost.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleQuestion from "../../components/single-question/SingleQuestion";
const initState = {
  questionText: null,
  questionType: null,
  options: [null],
  correctAnswerIndex: [],
};
export default function QuizPost() {
  const [questions, setQuestions] = useState([initState]);
  const [quizTitle, setQuizTitle] = useState(null);

  function handleQuizTitle(event) {
    setQuizTitle(event.target.value);
  }

  function addQuestion() {
    if (questions.length < 10) setQuestions([...questions, initState]);
  }
  function updateQuestion(index, question) {
    setQuestions([
      ...questions.slice(0, index),
      question,
      ...questions.slice(index + 1),
    ]);
  }
  console.log({ questions });

  function removeQuestion(questionIndex) {
    return (e) => {
      setQuestions([
        ...questions.slice(0, questionIndex),
        ...questions.slice(questionIndex + 1),
      ]);
    };
  }
  function postQuiz() {
    axios
      .post("http://localhost:5000/api/quiz", {
        quizTitle,
        questions,
      })
      .then((res) => {
        console.log(res).catch((err) => {
          console.log(err);
        });
      });
    console.log({ quizTitle, questions });
  }
  return (
    <div className="QuizPost">
      <Link to="/">Back</Link>
      <input
        type="text"
        placeholder="Quiz Title"
        className="quiz-title"
        value={quizTitle}
        onChange={handleQuizTitle}
      />
      <button onClick={postQuiz}>Post Quiz</button>
      <div>
        {questions.map((q, questionIndex) => (
          <SingleQuestion
            key={"question" + questionIndex}
            question={q}
            questionIndex={questionIndex}
            updateQuestion={(updatedQuestion) =>
              updateQuestion(questionIndex, updatedQuestion)
            }
            removeQuestion={removeQuestion(questionIndex)}
          />
        ))}
      </div>
      <div className="add-question">
        <button onClick={addQuestion} disabled={questions.length === 10}>
          Add Question
        </button>
      </div>
    </div>
  );
}
