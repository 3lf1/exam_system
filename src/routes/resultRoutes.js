const express = require('express');
const { getExamResults } = require('../controllers/resultController');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/exam/:examId', restrictTo('teacher'), getExamResults);

module.exports = router;