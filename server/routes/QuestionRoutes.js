// Example usage in another file (e.g., QuestionRoutes.js)
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const { EnglishQuestion, englishAnswers } = require('../QuestionAnsrData.js/EnglishQuestion');


router.get('/English', AuthMiddleware, async (req, res) => {
    try {
        // const { username, password } = req.body;
        // if (!username || !password) {
        //     res.status(401).json({ message: "Invalid username or password" });
        //     return;
        // }
        console.log(EnglishQuestion ,englishAnswers )
        res.status(200).json({ englishQuestions: EnglishQuestion, englishAnswers: englishAnswers });
    } catch (err) {
                res.status(500).json({ message: "Error over question routes" + err.message })
    }
});

module.exports = router;
