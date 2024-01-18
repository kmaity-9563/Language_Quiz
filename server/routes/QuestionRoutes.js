
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const { EnglishQuestion, englishAnswers } = require('../QuestionAnsrData.js/EnglishQuestion');
const { frenchQuestion, frenchAnswers } = require('../QuestionAnsrData.js/FrenchQuestion');
const { spanishQuestion, spanishAnswers } = require('../QuestionAnsrData.js/SpanishQuestion');

router.get('/:language', AuthMiddleware, async (req, res) => {
    try {
        const language = req.params.language.toLowerCase(); 
        let questions, answers;

        switch (language) {
            case 'english':
                questions = EnglishQuestion;
                answers = englishAnswers;
                break;
            case 'french':
                questions = frenchQuestion;
                answers = frenchAnswers;
                break;
            case 'spanish':
                questions = spanishQuestion;
                answers = spanishAnswers;
                break;
            default:
                return res.status(400).json({ message: 'Invalid language specified' });
        }

        res.status(200).json({ questions, answers });
    } catch (err) {
        res.status(500).json({ message: 'Error over question routes' + err.message });
    }
});

module.exports = router;
