import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: String,
    address: String,
    founded: Date,
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    bg: String,
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
