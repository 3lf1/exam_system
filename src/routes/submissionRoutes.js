const express = require('express');
const { startExam, submitExam } = require('../controllers/submissionController');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/:examId/start', restrictTo('student'), startExam);
router.patch('/:id/submit', restrictTo('student'), submitExam);

module.exports = router;