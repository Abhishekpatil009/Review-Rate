import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Car from "./models/car.js";
import carRentalData from "./data/carRentalData.js";

await connectDB();

const importData = async () => {
  try {
    await Car.deleteMany();          // clear collection
    await Car.insertMany(carRentalData); // insert data

    console.log("🚗 Car Rental Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
