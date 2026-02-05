import express from 'express'
import { UpdateProfile ,changephoto , ApplyJob, AppliedJobs , withdrawApplication} from "../controller/usercontroller.js";
import { Protect } from "../middlewares/authmiddle.js";
import multer from 'multer'

const router = express.Router();
const upload = multer();



router.put("/update", Protect, UpdateProfile);

router.patch("/changephoto", Protect, upload.single("profilePicture"),changephoto);

router.post("/apply-job", Protect, ApplyJob);

router.get("/applied-jobs", Protect, AppliedJobs);

router.delete("/applied-jobs/:id", Protect, withdrawApplication);



export default router;