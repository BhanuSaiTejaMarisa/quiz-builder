import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="quiz">
        <button>Post a Quiz</button>
      </Link>
    </div>
  );
}
