
import React, { useState, useEffect } from "react";
import { userScore } from "../atoms/userScore";
import { useRecoilState } from "recoil";

function Quiz({ questions, answers, onSubmit }) {
  const [userMarks, setUserMarks] = useState(0);
  const [Userscore, setUserscore] = useRecoilState(userScore);

  const checkAnswer = (questionIndex, selectedOptionIndex) => {
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
      return isCorrect ? prevMarks + 2 : prevMarks - 2;
    });
  };

  // useEffect(() => {
  //   // Update the user's score in Recoil state when userMarks changes
  //   setUserscore((prevScore) => prevScore + userMarks);
  // }, [userMarks, setUserscore]);

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
      {setUserscore(userMarks)}
      <p>User Marks: {userMarks}</p>
    </div>
  );
}

export default Quiz;
