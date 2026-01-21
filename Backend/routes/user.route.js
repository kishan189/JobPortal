import express from "express";
import { login, register, updateProfile, logout, updateProfilePicture, getUserData } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenicated.js";
import multer from "multer";

const router = express.Router();
const upload = multer(); // memory storage, since you only read text + maybe resume file
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getUserData").get(authenticateToken,getUserData);

router.route("/profile/update").post(authenticateToken, upload.single("file"),updateProfile);
router.route("/profile/picture/update").post(authenticateToken, upload.single("profilePhoto"), updateProfilePicture);

export default router;