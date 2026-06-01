import express from 'express'
import { UpdateProfile ,changephoto , ApplyJob, AppliedJobs , withdrawApplication} from "../controller/usercontroller.js";
import { UpdateJobPreference , AddEducation, DeleteEducation , AddExperience ,DeleteExperience , AddProject , DeleteProject} from '../controller/usercontroller.js'; 
import { Protect } from "../middlewares/authmiddle.js";
import multer from 'multer'

const router = express.Router();
const upload = multer();



router.put("/update", Protect, UpdateProfile);

router.patch("/changephoto", Protect, upload.single("profilePicture"),changephoto);

router.post("/apply-job", Protect, ApplyJob);

router.get("/applied-jobs", Protect, AppliedJobs);

router.delete("/applied-jobs/:id", Protect, withdrawApplication);

router.put("/preferences", Protect, UpdateJobPreference)

router.post("/education", Protect, AddEducation  )

router.delete("/delete-education/:eduId", Protect , DeleteEducation);

router.post("/experience", Protect, AddExperience);

router.delete("/delete-experience/:expId", Protect, DeleteExperience);

router.post("/project", Protect, AddProject);

router.delete("/delete-project/:projectId", Protect, DeleteProject);

export default router;