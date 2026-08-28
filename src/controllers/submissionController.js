const Submission = require('../models/Submission');
const Exam = require('../models/Exam');

exports.startExam = async (req, res) => {
    try{
        const examId = req.params.examId;
        const exam = await Exam.findById(examId);

        if(!exam || exam.status !== 'ongoing') {
            return res.status(404).json({ status: 'fail', message: 'Exam not found or not published' });
        }

        const submission = await Submission.create({
            student: req.user._id,
            exam: examId,
        });

        res.status(201).json({
            status: 'success',
            submission,
        });
    } catch(err){
        if(err.code === 11000) {
            return res.status(400).json({ status: 'fail', message: 'You have already started this exam' });
        }
        res.status(400).json({ status: 'fail', message: err.message });
    }
}

exports.submitExam = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const { answers, score } = req.body;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ status: 'fail', message: 'Submission not found' });
    }

    if (submission.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'fail', message: 'This is not your submission' });
    }

    const exam = await Exam.findById(submission.exam);
    const elapsedMinutes = (Date.now() - submission.startedAt) / 1000 / 60;
    const isLate = elapsedMinutes > exam.durationMinutes;

    submission.answers = answers;
    submission.score = score;
    submission.status = 'submitted';
    submission.submittedAt = Date.now();
    submission.isLate = isLate;

    await submission.save();

    res.status(200).json({
      status: 'success',
      message: isLate ? 'Submitted, but after the time limit' : 'Submitted on time',
      submission,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};



