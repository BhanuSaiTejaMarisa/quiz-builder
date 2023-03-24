import "./AttemptQuestion.scss"
import React, { useState } from 'react'

export default function AttemptQuestion({ questionIndex, options, questionText, questionType, updateAnswers, _id }) {
  const [viewQuestion, setViewQuestion] = useState(true);
  const [answer, setAnswer] = useState(() => {
    if (questionType === "mcq") {
      return Array(options?.length).fill(0)
    }
    return ""
  })
  function handleToggleView() {
    setViewQuestion(!viewQuestion);
  }
  function handleChange(optionIndex) {
    return e => {
      if (questionType === "mcq") {
        if (e.target.checked) {
          answer[optionIndex] = 1
        }
        else {
          answer[optionIndex] = 0
        }
        setAnswer([...answer])
        updateAnswers(answer)
      }
      if (questionType === "ss" || questionType === "binary") {
        if (e.target.checked) {
          setAnswer(optionIndex)
          updateAnswers(optionIndex)
        }
      }
    }
  }


  console.log(answer);
  return (
    <div className="AttemptQuestion">
      <div className="header">
        <p>Question {questionIndex + 1}</p>
        <button
          className={`accordion-toggle ${viewQuestion && "rotate"}`}
          onClick={handleToggleView}
        ></button>
      </div>
      {viewQuestion && <><p>{questionText + "?"}</p>
        {
          options.map((option, optionIndex) => (
            <div key={optionIndex + "options" + questionIndex}>
              <input key={optionIndex} type={questionType === "mcq" ? "checkbox" : "radio"}
                value={optionIndex}
                // checked={quest}
                name={questionIndex}
                onChange={handleChange(optionIndex)}
              />
              <label>{option}</label>
            </div>
          ))
        }
      </>}
    </div>

  )
}
