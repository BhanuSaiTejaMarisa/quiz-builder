import "./QuizList.scss";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/axios";
export default function QuizList() {
  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    async function getQuizzes() {
      try {
        const request = await axios.get("quiz");
        setQuizData(request.data);
      } catch (error) {
        console.error(error);
      }
    }
    getQuizzes();
  }, []);
  console.log(quizData);
  return (
    <div className="QuizList">
      <h6>QuizList</h6>

      {quizData.map((data) => (
        <div className="quiz">
          <h5>{data.quizTitle}</h5>
          <Link to={`${data._id}`}>Attempt Quiz</Link>
        </div>
      ))}
    </div>
  );
}
