import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AttemptQuestion from '../../components/attempt-question/AttemptQuestion'

export default function AttemptQuiz() {
  const [quiz, setQuiz] = useState({})
  const { quizId } = useParams()
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    getQuizbyId()
  }, [])

  async function submitQuiz() {
    console.log({ answers });
    try {
      const resp = await axios.post(`/api/quiz/${quizId}`, {
        userAnswers: answers
      })
      console.log(resp);
    }
    catch (err) {
      console.log(err);
    }
  }
  function updateAnswers(index, answer) {
    answers[index] = answer
    setAnswers(answers)
  }

  async function getQuizbyId() {
    try {
      const response = await axios.get(`/api/quiz/${quizId}`)
      setQuiz(response.data)
    }
    catch (err) {

    }
  }
  console.log(quiz);
  return (
    <div className="Quiz">
      <Link to="/">Back</Link>
      <h2>{quiz.quizTitle}</h2>
      <button onClick={submitQuiz}>Submit Quiz</button>
      <div>
        {quiz?.questions?.map((question, questionIndex) => (
          <AttemptQuestion questionIndex={questionIndex} {...question} key={question._id} updateAnswers={(answer) => updateAnswers(questionIndex, answer)} />
        ))}
      </div>
      <div className="add-question">

      </div>
    </div>
  )
}
