import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Electric",
        "Sports",
        "SUV",
        "Convertible",
        "Sedan",
        "Off-Road",
        "Luxury",
      ],
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Electric", "Petrol", "Diesel", "Hybrid"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      default: "Unlimited",
    },
    features: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
