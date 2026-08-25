const express = require('express');
const { createExam, getAllExams } = require('../controllers/examController');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getAllExams);
router.post('/', restrictTo('teacher'), createExam);

module.exports = router;