import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Project-based",
      ],
      required: true,
    },
    workType: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: [
        "Entry-level",
        "Mid-level",
        "Senior-level",
        "Director",
        "Executive",
      ],
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    lastDateToApply: {
      type: Date,
      required: true,
    },
    noOfOpenings: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;