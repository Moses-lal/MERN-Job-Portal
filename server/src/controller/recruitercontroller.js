import Application from "../models/applicationmodel.js";
import Job from "../models/jobModel.js";
import User from "../models/usermodel.js";


export const AddNewJobs = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      workType,
      experienceLevel,
      skills,
      lastDateToApply,
      noOfOpenings,
    } = req.body;

    if (
      !title ||
      !description ||
      !company ||
      !location ||
      !salary ||
      !jobType ||
      !workType ||
      !experienceLevel ||
      !skills ||
      !lastDateToApply ||
      !noOfOpenings
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the job to the database
    const job = await Job.create({
      recruiterID: req.user._id,
      title,
      description,
      company,
      location,
      salary,
      jobType,
      workType,
      experienceLevel,
      skills,
      lastDateToApply,
      noOfOpenings,
    });
    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    next(error);
  }
};


export const GetPostedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiterID: req.user._id });
    res
      .status(200)
      .json({ message: "Posted jobs retrieved successfully", data:jobs });
  } catch (error) {
    next(error);
  }
};


export const UpdateJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      workType,
      experienceLevel,
      skills,
      lastDateToApply,
      noOfOpenings,
      _id,
    } = req.body;

    // Validate the request body
    if (
      !title ||
      !description ||
      !company ||
      !location ||
      !salary ||
      !jobType ||
      !workType ||
      !experienceLevel ||
      !skills ||
      !lastDateToApply ||
      !noOfOpenings ||
      !_id
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const existingJob = await Job.findById(_id);

    if(!existingJob){
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }


    existingJob.title = title;
    existingJob.description = description;
    existingJob.company = company;
    existingJob.location = location;
    existingJob.salary = salary;
    existingJob.jobType = jobType;
    existingJob.workType = workType;
    existingJob.experienceLevel = experienceLevel;
    existingJob.skills = skills;
    existingJob.lastDateToApply = lastDateToApply;
    existingJob.noOfOpenings = noOfOpenings;
    
    await existingJob.save();
    res.status(200).json({ message: "Job updated successfully" });

  } catch (error) {
    next(error);
  }
};



export const GetApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      recruiterID: req.user.id,
    })
      .populate("userID")
      .populate("jobID");

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Applied",
      "Under Review",
      "Interview Scheduled",
      "Offered",
      "Rejected",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", data: application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const UpdateRecruiterProfile = async (req, res) => {
  try {

    const {
      pronouns,
      title,
      location,
      degree,
      institute,
      companyName,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        pronouns,
        title,
        location,
        "companyeducation.degree":         degree,
        "companyeducation.institute":      institute,
        "recruiterExperience.companyName": companyName,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  }catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};