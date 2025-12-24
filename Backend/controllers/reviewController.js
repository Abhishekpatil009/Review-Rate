import Review from "../models/Review.js";
import Company from "../models/Company.js";

/**
 * @desc    Get reviews by company ID
 * @route   GET /api/reviews/company/:companyId
 */
export const getReviewsByCompany = async (req, res) => {
  try {
    const reviews = await Review.find({
      company: req.params.companyId,
    }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create new review
 * @route   POST /api/reviews
 */
export const createReview = async (req, res) => {
  try {
    const { company, name, avatar, rating, comment } = req.body;

    const review = await Review.create({
      company,
      name,
      avatar,
      rating,
      comment,
    });

    // 🔥 Update company rating & reviews count
    const reviews = await Review.find({ company });

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Company.findByIdAndUpdate(company, {
      rating: avgRating.toFixed(1),
      reviewsCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
