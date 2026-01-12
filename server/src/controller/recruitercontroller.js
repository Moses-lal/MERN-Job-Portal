
import Job from "../models/jobModel.js";



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