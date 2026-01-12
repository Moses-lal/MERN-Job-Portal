import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    recruiterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    status: {
        type: String,
        enum: ["Applied", "Under Review", "Interview Scheduled", "Offered", "Rejected"],
        default: "Applied",
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;