import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import QuizPost from "./pages/quiz-post/QuizPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPost />} />
      </Routes>
    </div>
  );
}

export default App;
