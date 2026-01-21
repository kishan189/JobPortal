import express from "express";
import authenticateToken from "../middleware/isAuthenicated.js";
import { registerCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(authenticateToken,registerCompany);
router.route("/get").get(authenticateToken,getAllCompanies);
router.route("/get/:id").get(authenticateToken,getCompanyById);
router.route("/update/:id").post(authenticateToken,singleUpload,updateCompany);

export default router;