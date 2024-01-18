import React from "react";
import { useState } from "react";
import { userScore } from "../atoms/userScore";
import { useRecoilState } from "recoil";

function Quiz({ questions, answers, onSubmit }) {
  const [userMarks, setUserMarks] = useState(0);
  const [Userscore, setUserscore] = useRecoilState(userScore);

  const checkAnswer = (questionIndex, selectedOptionIndex) => {
    // Ensure valid inputs
    if (
      !Array.isArray(answers) ||
      answers.length <= questionIndex ||
      !Number.isInteger(selectedOptionIndex) ||
      selectedOptionIndex < 0 ||
      selectedOptionIndex >= questions[questionIndex].options.length
    ) {
      console.error("Invalid answers array or index", {
        answers,
        questionIndex,
        selectedOptionIndex,
        question: questions[questionIndex],
      });
      return;
    }

    const isCorrect = selectedOptionIndex === answers[questionIndex];

    setUserMarks((prevMarks) => {
      // Update marks based on correctness
      return isCorrect ? prevMarks + 2 : prevMarks;
    });

    const currentScore = userMarks + Userscore;
    setUserscore(currentScore);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <h2>{question.question}</h2>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question_${questionIndex}`}
                    value={optionIndex}
                    onChange={() => checkAnswer(questionIndex, optionIndex)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => onSubmit(userMarks)}>Submit Quiz</button>
      <p>User Marks: {userMarks}</p>
    </div>
  );
}

export default Quiz;
