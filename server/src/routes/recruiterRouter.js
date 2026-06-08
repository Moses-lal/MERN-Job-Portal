import express from 'express';
import { isRecruiter, Protect } from '../middlewares/authmiddle.js';
import { GetPostedJobs ,AddNewJobs,UpdateJob } from '../controller/recruitercontroller.js';
import { GetApplicants ,updateApplicationStatus ,UpdateRecruiterProfile } from '../controller/recruitercontroller.js';

const router = express.Router();

router.post('/add-new-job', Protect, isRecruiter, AddNewJobs);
router.get('/get-posted-jobs', Protect, isRecruiter, GetPostedJobs);
router.post('/update-job',Protect, isRecruiter,UpdateJob)
router.get( '/get-applicants',  Protect,  isRecruiter,  GetApplicants);
router.put("/update-status/:id", Protect , isRecruiter ,updateApplicationStatus);
router.put("/update-profile", Protect, isRecruiter, UpdateRecruiterProfile);

export default router;