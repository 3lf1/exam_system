const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for the exam"],
            trim: true,
        },
        subject: {
            type:String,
            required: [true, "Please provide a subject for the exam"],
            trim: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Please provide a teacher for the exam"],
        },
        date: {
            type: Date,
            required: [true, "Please provide a date for the exam"],
        },
        durationMinutes: {
            type: Number,
            required: [true, "Please provide a duration for the exam in minutes"],
            min: [1, "Duration must be at least 1 minute"],
        },
        status: {
            type: String,
            enum: ["scheduled", "ongoing", "completed"],
            default: "scheduled",
        },
    },    
    {timestamps: true}
);

module.exports = mongoose.model("Exam", examSchema);