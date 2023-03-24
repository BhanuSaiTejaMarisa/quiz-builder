import "./PostQuestion.scss";
import React, { useState } from "react";
import { typeOfQuestions } from "./singleQuestionData";

export default function PostQuestion({
  question,
  questionIndex,
  updateQuestion,
  removeQuestion,
}) {
  const { questionType, options, questionText, correctAnswerIndex } = question;
  const [viewQuestion, setViewQuestion] = useState(true);

  const handleQuestionTypeChange = (event) => {
    const { value } = event.target;

    if (value === "binary" || value === "ss") {
      const binaryOptionsInitState = ["", ""];
      updateQuestion({
        ...question,
        questionType: event.target.value,
        options: binaryOptionsInitState,
        correctAnswerIndex: ""
      });
    }
    if (value === "mcq") {
      updateQuestion({
        ...question,
        questionType: event.target.value,
        options: [""],
        correctAnswerIndex: [0]
      });
    }
  };

  const handleOptionChange = (optionIndex) => {
    return (event) => {
      const newOptions = [...options];
      newOptions[optionIndex] = event.target.value;
      updateQuestion({ ...question, options: newOptions });
    };
  };

  function addOption() {
    if (questionType === "mcq" && options.length < 5) {
      updateQuestion({ ...question, options: [...options, ""], correctAnswerIndex: [...correctAnswerIndex, 0] });
    }
    if ((questionType === "binary" && options.length < 2) || (questionType === "ss" && options.length < 5)) {
      updateQuestion({ ...question, options: [...options, ""], correctAnswerIndex: "" });
    }
  }

  function checkOptions() {
    // console.log({ questionType: !questionType, questionIndex });
    if (!questionType) {
      return true;
    }
    if (questionType === "mcq" || questionType === "ss") {
      return options.length === 5;
    } else if (questionType === "binary") {
      return options.length === 2;
    }
  }
  function handleQuestionChange(e) {
    updateQuestion({ ...question, questionText: e.target.value });
  }
  function handleRemoveQuestion() {
    removeQuestion(questionIndex);
  }
  function handleToggleView() {
    setViewQuestion(!viewQuestion);
  }
  function removeOption(optionIndex) {
    const newOptions = [
      ...options.slice(0, optionIndex),
      ...options.slice(optionIndex + 1),
    ];
    if (questionType === "mcq") {
      let newCorrectAnswers = [
        ...correctAnswerIndex.slice(0, optionIndex),
        ...correctAnswerIndex.slice(optionIndex + 1)
      ]
      updateQuestion({ ...question, options: newOptions, correctAnswerIndex: newCorrectAnswers });
      return
    }

    updateQuestion({ ...question, options: newOptions });
  }
  function handleCorrectAnswer(optionIndex) {
    return (e) => {

      if (questionType === "mcq") {
        if (e.target.checked) {
          correctAnswerIndex[optionIndex] = 1
        }
        else {
          correctAnswerIndex[optionIndex] = 0
        }
        updateQuestion({ ...question, correctAnswerIndex })
        return;
      }

      if ((questionType === "ss" || questionType === "binary") && e.target.checked) {
        updateQuestion({ ...question, correctAnswerIndex: optionIndex })
      }

    };
  }
  return (
    <div className="PostQuestion">
      <div className="header">
        <p>Question {questionIndex + 1}</p>
        <button
          className={`accordion-toggle ${viewQuestion && "rotate"}`}
          onClick={handleToggleView}
        ></button>
      </div>
      {viewQuestion && (
        <>
          <div className="content-header">
            <button onClick={handleRemoveQuestion} className="remove-question">
              Remove Question
            </button>
          </div>
          {typeOfQuestions.map((q, typeIndex) => (
            <div
              key={typeIndex + "typeOfQ" + questionIndex}
              className="question-types"
            >
              <input
                checked={q.value === questionType}
                type="radio"
                id={q.id}
                name={"typeOfQ" + questionIndex}
                value={q.value}
                onChange={handleQuestionTypeChange}
              />
              <label htmlFor={q.id}>{q.label}</label>
            </div>
          ))}

          <div className="question-text-container">
            <input
              type="text"
              placeholder={"Please Type Question 1 Here"}
              onChange={handleQuestionChange}
              value={questionText}
              className="question-text"
            />
            <button onClick={addOption} disabled={checkOptions()}>
              Add option
            </button>
          </div>
          {questionType && (
            <div className="options-container">
              {options.map((option, optionIndex) => (
                <div key={optionIndex + "options" + questionIndex}>
                  <input
                    type="text"
                    placeholder={"Option " + (optionIndex + 1)}
                    onChange={handleOptionChange(optionIndex)}
                    value={option}
                  />
                  <button onClick={() => removeOption(optionIndex)}>
                    <i className="fas fa-times"></i>
                  </button>
                  <input
                    type={questionType === "mcq" ? "checkbox" : "radio"}
                    onChange={handleCorrectAnswer(optionIndex)}
                    name={"correctOptions" + questionIndex}
                    value={optionIndex}
                    checked={questionType === "mcq" ? 1 === correctAnswerIndex[optionIndex] : correctAnswerIndex === optionIndex}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
