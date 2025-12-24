import { useParams } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

/* ⭐ STAR COMPONENT */
const Stars = memo(({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {[...Array(full)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ))}
      {half && <FaStarHalfAlt className="text-yellow-500" />}
    </div>
  );
});

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyRes = await fetch(
          `http://localhost:5000/api/companies/${id}`
        );
        const companyData = await companyRes.json();

        const reviewsRes = await fetch(
          `http://localhost:5000/api/reviews/company/${id}`
        );
        const reviewsData = await reviewsRes.json();

        setCompany(companyData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error loading company details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!company) {
    return <p className="text-center mt-10">Company not found</p>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-md border"
              />

              <div>
                <h1 className="text-xl font-bold">{company.name}</h1>
                <p className="text-gray-500">{company.address}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold">{company.rating}</span>
                  <Stars rating={company.rating} />
                  <span className="text-gray-500">
                    {reviews.length} Reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-400">
                Founded on{" "}
                {new Date(company.founded).toLocaleDateString()}
              </p>
              <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded">
                + Add Review
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-400 mb-4">
            Result Found: {reviews.length}
          </p>

          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b pb-4 mb-4 last:border-none"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="ml-auto">
                  <Stars rating={review.rating} />
                </div>
              </div>

              <p className="mt-2 text-gray-700 text-sm">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
