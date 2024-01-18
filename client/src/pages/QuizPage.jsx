import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Quiz from "../components/Quiz";
import { userState } from '../atoms/user';
import { useRecoilState , useRecoilValue } from "recoil";
import { userScore  } from '../atoms/userScore';
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

function QuizPage() {
  const user = useRecoilValue(userState);
  const [localUserScore, setLocalUserScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    async function fetchQuiz(language) {
      try {
        const response = await axios.get(`http://localhost:3000/qna/${language}`, {
          headers: {
            Authorization: "Bearer " + user.token
          }
        });
        console.log(response.data);
        const { questions, answers } = response.data;
        setQuestions(questions);
        setAnswers(answers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    }

    if (selectedLanguage) {
      setLoading(true);
      fetchQuiz(selectedLanguage);
    }
  }, [selectedLanguage, user.token]);

  const handleQuizSubmit = (userResponses) => {
    const score = userResponses.reduce((totalScore, response, index) => {
      return response === answers[index] ? totalScore + 2 : totalScore - 2;
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    
    <Navbar onLanguageSelect={setSelectedLanguage} />
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Language Proficiency Quiz
            </Typography>
            {loading ? (
              <p>Loading quiz...</p>
            ) : (
              <Quiz questions={questions} answers={answers} onSubmit={handleQuizSubmit} />
            )}
          </CardContent>
        </Card>
      </div>
      <Dashboard userScore={localUserScore} />
    </div>
  </div>
  );
}

export default QuizPage;