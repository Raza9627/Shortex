import express from "express"
import { registerUser,getAllUsers,loginUser,getUserProfile,updateProfile,changePassword,forgotPassword,resetPassword,logoutUser } from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/profile",authMiddleware, getUserProfile)
router.patch("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/users", authMiddleware, getAllUsers);
export default router