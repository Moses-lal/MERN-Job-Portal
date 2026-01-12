import express from 'express';
import { isRecruiter, Protect } from '../middlewares/authmiddle.js';
import { GetPostedJobs ,AddNewJobs,UpdateJob } from '../controller/recruitercontroller.js';


const router = express.Router();

router.post('/add-new-job', Protect, isRecruiter, AddNewJobs);
router.get('/get-posted-jobs', Protect, isRecruiter, GetPostedJobs);
router.post('/update-job',Protect, isRecruiter,UpdateJob)

export default router;