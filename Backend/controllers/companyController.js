import Company from "../models/Company.js";

/**
 * @desc    Get all companies
 * @route   GET /api/companies
 */
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .sort({ createdAt: -1 })
      .select(
        "name logo address founded rating reviewsCount bg createdAt"
      );

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single company by ID
 * @route   GET /api/companies/:id
 */
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create new company (Admin)
 * @route   POST /api/companies
 */
export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    const createdCompany = await company.save();
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const createReview = async (req, res) => {
  try {
    // 1️⃣ Create review
    const review = await Review.create(req.body);

    // 2️⃣ Get all reviews of this company
    const reviews = await Review.find({ company: review.company });

    // 3️⃣ Calculate average rating
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // 4️⃣ Update company
    await Company.findByIdAndUpdate(review.company, {
      rating: avgRating,
      reviewsCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
