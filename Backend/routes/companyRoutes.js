import express from "express";
import {
  getCompanies,
  getCompanyById,
  createCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany); // admin

export default router;
