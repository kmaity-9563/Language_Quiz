import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Quiz from "../components/Quiz";
import { userState } from '../atoms/user';
import { useRecoilValue, useRecoilState } from "recoil";
import { userScore as userScoreAtom } from '../atoms/userScore';
import Dashboard from "../components/Dashboard";

function QuizPage() {
  const user = useRecoilValue(userState);
  const [localUserScore, setLocalUserScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [Answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get("http://localhost:3000/qna/English", {
          headers: {
            Authorization: "Bearer " + user.token
          }
        });
        console.log(response.data)
        const { englishQuestions, englishAnswers } = response.data;
        setQuestions(englishQuestions);
        setAnswers(englishAnswers)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [user.token]);

  const handleQuizSubmit = (userResponses) => {
    console.log("Quiz submission" , userResponses)
    // Make sure userResponses is an array
    // if (!Array.isArray(userResponses)) {
    //   console.error("Invalid userResponses, expected an array");
    //   return;
    // }
  
    const score = userResponses.reduce((totalScore, response, index) => {
      return response === Answers[index] ? totalScore + 2 : totalScore;
    }, 0);
  
    setLocalUserScore(score);
    updateScore(score);
  };
  

  const updateScore = async (score) => {
    try {
      const response = await axios.put('http://localhost:3000/updateUserScore', {
        userId: user.userId,
        score: score,
      }, {
        headers : {
          Authorization: 'Bearer ' + user.token,
        }
      });
      console.log(response.data)
      console.log('User score updated on the server.');
    } catch (error) {
      console.error('Error updating user score on the server:', error);
    }
  };

  return (
    <div
      style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Language Proficiency Quiz
          </Typography>
          {loading ? (
            <p>Loading quiz...</p>
          ) : (
 // QuizPage.jsx
<Quiz questions={questions} answers={Answers} onSubmit={handleQuizSubmit} />


          )}
        </CardContent>
      </Card>
      <Dashboard/>
    </div>
  );
}

export default QuizPage;
