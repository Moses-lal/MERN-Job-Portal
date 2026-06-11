import express from 'express';
import  GetAllJobs  from '../controller/publicontroller.js';
import Job from '../models/jobModel.js';

const router = express.Router();

router.get('/jobs', GetAllJobs);

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiterID");
    res.status(200).json({ message: "Job retrieved successfully", data: job });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving job", error });
  }
});

export default router;