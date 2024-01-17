const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const EnglishRoutes = require('./routes/QuestionRoutes'); // Adjust the path accordingly

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/qna', EnglishRoutes); // Use your EnglishRoutes here

app.get('/', (req, res) => {
  res.send('Welcome');
});

mongoose.connect('mongodb+srv://koushikmaity9563:MG7YybFw21OD0egb@quize.bkgajss.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
