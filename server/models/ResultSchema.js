// ResultModel.js
const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
