import cloudinary from 'cloudinary'
import Application from "../models/applicationmodel.js";
import Job from "../models/jobModel.js";
import user from '../models/usermodel.js'



export const UpdateProfile = async (req, res, next) => {
  try {
    const {
      role,
      fullName,
      skills,
      qualification,
      dob,
      phone,
      exp,
      address,
      bio,
      linkedin,
      github,
      insta,
      twitter,
      gender,
      companyName,
      companyAddress,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyDescription,
      companyDetail,
      companySince,
      companyEmployees,
    } = req.body;

    const currentUser = req.user;

    if (currentUser.role === "applicant") {
      if (
        !fullName ||
        !phone ||
        !gender ||
        !dob ||
        !qualification ||
        !exp ||
        !address ||
        !bio ||
        !linkedin ||
        !github ||
        !insta ||
        !twitter ||
        !skills
      ) {
        const error = new Error("All fields are required applicant");
        error.statusCode = 400;
        return next(error);
      }

      currentUser.fullName = fullName;
      currentUser.phone = phone;
      currentUser.gender = gender;
      currentUser.dob = dob;
      currentUser.qualification = qualification;
      currentUser.exp = exp;
      currentUser.address = address;
      currentUser.bio = bio;
      currentUser.linkedin = linkedin;
      currentUser.github = github;
      currentUser.insta = insta;
      currentUser.twitter = twitter;
      currentUser.skills = skills;

      const updatedUser = await currentUser.save();

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } else if (currentUser.role === "recruiter") {
      if (
        !fullName ||
        !phone ||
        !gender ||
        !dob ||
        !companyName ||
        !companyAddress ||
        !companyEmail ||
        !companyPhone ||
        !companyWebsite ||
        !companyDescription ||
        !companyDetail ||
        !companySince ||
        !companyEmployees ||
        !linkedin ||
        !insta ||
        !twitter
      ) {
        const error = new Error("All fields are required Recruiter");
        error.statusCode = 400;
        return next(error);
      }

      currentUser.fullName = fullName;
      currentUser.phone = phone;
      currentUser.gender = gender;
      currentUser.dob = dob;
      currentUser.companyName = companyName;
      currentUser.companyAddress = companyAddress;
      currentUser.companyEmail = companyEmail;
      currentUser.companyPhone = companyPhone;
      currentUser.companyWebsite = companyWebsite;
      currentUser.companyDescription = companyDescription;
      currentUser.companyDetail = companyDetail;
      currentUser.companySince = companySince;
      currentUser.companyEmployees = companyEmployees;
      currentUser.linkedin = linkedin;
      currentUser.insta = insta;
      currentUser.twitter = twitter;

      const updatedUser = await currentUser.save();

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};


export const changephoto = async(req, res, next)=>{
  
  try {

    console.log("changing phhto ");
    
    const currentUser = req.user;

    const dp = req.file;

    

    if (!dp) {
      const error = new Error("Profile picture is required");
      error.statusCode = 400;
      return next(error);
    }


    if (currentUser.photoid !== "N/A") {
      await cloudinary.uploader.destroy(currentUser.photoid);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    const dataUri = `data:${dp.mimetype};base64,${b64}`;

    console.log(dataUri.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "job-portal",
      width: 500,
      height: 500,
      crop: "fill",
    });
    console.log("File uploaded successfully:", result);
    currentUser.photo = result.secure_url;
    currentUser.photoid = result.public_id;

    const updatedUser = await currentUser.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      data: updatedUser,
    });

    
  } catch (error) {
    next(error)
  }
}

export const ApplyJob = async (req, res, next) => {
  try {
    const { jobID } = req.body;
    const currentUser = req.user;

    const alreadyApplied = await Application.findOne({
      userID: currentUser._id,
      jobID: jobID,
    });
    if (alreadyApplied) {
      const error = new Error("You have already applied to this job");
      error.statusCode = 400;
      return next(error);
    }

    const job = await Job.findById(jobID);
    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }

    const newApplication = await Application.create({
      recruiterID: job.recruiterID,
      userID: currentUser._id,
      jobID: jobID,
      status: "Applied",
      appliedAt: Date.now(),
    });

    res.status(201).json({
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const AppliedJobs = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const applications = await Application.find({ userID: currentUser._id })
      .populate("jobID")
      .populate("recruiterID")
      .populate("userID");

    res.status(200).json({
      message: "Applied jobs retrieved successfully",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};




































