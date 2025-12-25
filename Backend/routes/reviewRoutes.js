import express from "express";
import { toggleLikeReview } from "../controllers/reviewController.js";
import {
  getReviewsByCompany,
  createReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/company/:companyId", getReviewsByCompany);
router.post("/", createReview);


// POST /api/reviews/:id/like
router.post("/:id/like", toggleLikeReview);

export default router;
