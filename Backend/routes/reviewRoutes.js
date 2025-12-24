import express from "express";
import {
  getReviewsByCompany,
  createReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/company/:companyId", getReviewsByCompany);
router.post("/", createReview);


export default router;
