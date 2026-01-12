import Job from "../models/jobModel.js";

 const GetAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ message: "Jobs retrieved successfully", data: jobs });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving jobs", error });
  }
};


export default GetAllJobs;