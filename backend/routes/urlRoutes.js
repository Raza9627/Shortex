import express from "express"
import {
    getAnalytics,
    getAllUrls,
    createUrl,
    disableUrl,
    enableUrl,
    deleteUrl,
    getAnalyticsDetails,
    getWeeklyAnalytics
} from "../controllers/urlControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { redirectUrl } from "../controllers/shortUrl.js";
const router=express.Router();

router.get("/", authMiddleware, getAllUrls);
router.post("/", authMiddleware, createUrl);
router.get("/analytics",authMiddleware,getAnalytics)
router.get("/analytics/weekly", authMiddleware, getWeeklyAnalytics);
router.get("/analytics/details", authMiddleware, getAnalyticsDetails);
router.get("/:shortCode", redirectUrl);
router.patch("/:id/disable",authMiddleware,disableUrl);
router.patch("/:id/enable",authMiddleware,enableUrl);
router.delete("/:id",authMiddleware,deleteUrl);
export default router 