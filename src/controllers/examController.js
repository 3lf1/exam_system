const Exam = require('../models/Exam');

exports.createExam = async (req, res) => {
  try {
    const { title, subject, date, durationMinutes, status } = req.body;

    const exam = await Exam.create({
      title,
      subject,
      date,
      durationMinutes,
      status,
      teacher: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      exam,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    if (req.user.role === 'student') {
      queryObj.status = 'published';
    }

    let query = Exam.find(queryObj).populate('teacher', 'name email');

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-date');
    }

    const exams = await query;

    res.status(200).json({
      status: 'success',
      results: exams.length,
      exams,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};