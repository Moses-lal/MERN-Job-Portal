import express from 'express';
import  GetAllJobs  from '../controller/publicontroller.js';

const router = express.Router();

router.get('/jobs', GetAllJobs);

export default router;