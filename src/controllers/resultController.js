const mongoose = require('mongoose');
const Submission = require('../models/Submission');

exports.getExamResults = async (req, res) => {
    try {
        const examId = req.params.examId;
        
        const stats = await Submission.aggregate([
            {
                $match: {
                    exam: new mongoose.Types.ObjectId(examId),
                    status: 'submitted',
                },
            },
            {
                $group: {
                    _id:'$exam',
                    averageScore: { $avg: '$score' },
                    highestScore: { $max: '$score' },
                    lowestScore: { $min: '$score' },
                    totalSubmissions: { $sum: 1 },
                    passCount: { 
                        $sum: {
                            $cond: [{ $gte: ['$score', 60]}, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    averageScore: 1,
                    highestScore: 1,
                    lowestScore: 1,
                    totalSubmissions: 1,
                    passCount: 1,
                    passRate: {
                        $round:[
                            {$multiply: [{ $divide:['$passCount', '$totalSubmissions']}, 100]},
                            1,
                        ],
                    },
                },
            },
        ]);

        res.status(200).json({
            status: 'success',
            data: stats[0] || "No submissions yet for this exam",
        });
    }catch(err){
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMySubmissions = async (req, res) => {
    try{
        const submissions = await Submission.find({ student: req.user._id})
        .populate('exam','title subject date status')
        .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: submissions.length,
            submissions,
        });
    }catch(err){
        res.status(400).json({ status: 'fail', message: err.message });
    }
}