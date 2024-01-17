// QuestionModel.js
const mongoose = require("mongoose");;

const QuestionSchema = mongoose.Schema({
    questions: { type: Array, default: [] },
    answers: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
});

 const Question = mongoose.model('Question', QuestionSchema);

 module.exports = Question