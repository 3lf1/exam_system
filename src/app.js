const express = require('express');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Exam system API is running' });
});

module.exports = app;