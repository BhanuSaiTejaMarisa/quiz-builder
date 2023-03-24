import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import QuizPost from "./pages/quiz-post/QuizPost";
import QuizList from "./pages/quiz-list/QuizList";
import AttemptQuiz from "./pages/attempt-quiz/AttemptQuiz";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPost />} />
        <Route path="/quiz-list"  >
          <Route index element={<QuizList />} />
          <Route path=":quizId" element={<AttemptQuiz/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
