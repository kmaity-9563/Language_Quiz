// UserModel.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        LanguageprofiencyScore: { type: Number, default : 0 },
        LanguageprofiencyLevel: { type: Number, default : 0 },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
