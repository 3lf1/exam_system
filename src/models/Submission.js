const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
            required: [true, "Please provide an exam for the submission"],
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Please provide a student for the submission"],
        },
        answers: {
            type:[mongoose.Schema.Types.Mixed],
            default: [],
        },
        score: {
            type: Number,
            default: null,
        },
        status: {
            type: String,
            enum: ["in-progress","submitted", "graded"],
            default: "in-progress"
        },
        startedAt: {
            type: Date,
            default: Date.now,
        },
        submittedAt: {
            type: Date,
            default: null,
        },
        isLate: {
            type: Boolean,
            default: false,
        },
    },{timestamps: true}
)

submissionSchema.index({ exam: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Submission", submissionSchema);