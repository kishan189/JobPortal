import express from "express";
import authenticateToken from "../middleware/isAuthenicated.js";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(authenticateToken,postJob);
router.route("/get").get(authenticateToken,getAllJobs);
router.route("/getadminjobs").get(authenticateToken,getAdminJob);
router.route("/get/:id").get(authenticateToken,getJobById);

export default router;