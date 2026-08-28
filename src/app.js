const express = require('express');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/results', resultRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Exam system API is running' });
});

module.exports = app;