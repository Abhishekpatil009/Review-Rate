import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Company from "./models/Company.js";
import Review from "./models/Review.js";

import companies from "./data/companies.js";
import reviews from "./data/reviews.js";

await connectDB();

const importData = async () => {
  try {
    await Company.deleteMany();
    await Review.deleteMany();

    await Company.insertMany(companies);
    await Review.insertMany(reviews);

    console.log("Companies & Reviews Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
