import { useParams } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = memo(({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

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

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [likedReviews, setLikedReviews] = useState({});

  const fetchCompanyAndReviews = async () => {
    try {
      const companyRes = await fetch(`http://localhost:5000/api/companies/${id}`);
      const companyData = await companyRes.json();

      const reviewsRes = await fetch(`http://localhost:5000/api/reviews/company/${id}`);
      const reviewsData = await reviewsRes.json();

      setCompany(companyData);
      setReviews(reviewsData);

      const initialLikes = {};
      reviewsData.forEach((r) => {
        initialLikes[r._id] = false; 
      });
      setLikedReviews(initialLikes);
    } catch (err) {
      console.error("Error loading company details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyAndReviews();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.name
    )}&background=random`;

    try {
      await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, avatar, company: id }),
      });

      setFormData({ name: "", rating: 5, comment: "" });
      setErrors({});
      setShowForm(false);

      await fetchCompanyAndReviews(); 
    } catch (err) {
      console.error("Error adding review", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (reviewId) => {
    const currentlyLiked = likedReviews[reviewId];

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: currentlyLiked ? "unlike" : "like" }),
      });

      const data = await res.json();

      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, likes: data.likes } : r))
      );

      setLikedReviews((prev) => ({ ...prev, [reviewId]: !currentlyLiked }));
    } catch (err) {
      console.error("Error liking review", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!company) return <p className="text-center mt-10">Company not found</p>;

  const rating = company.rating || 1;

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex gap-4">
              <img
                src={
                  company.logo && company.logo.trim() !== ""
                    ? company.logo
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random`
                }
                alt={company.name}
                className="w-20 h-20 rounded-md border"
              />
              <div>
                <h1 className="text-xl font-bold">{company.name}</h1>
                <p className="text-gray-500">{company.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold">{rating.toFixed(1)}</span>
                  <Stars rating={rating} />
                  <span className="text-gray-500">{company.reviewsCount || 0} Reviews</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="h-fit bg-purple-600 text-white px-4 py-2 rounded hover:opacity-90"
            >
              + Add Review
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded ${errors.rating ? "border-red-500" : ""}`}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </select>
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>

              <div>
                <textarea
                  name="comment"
                  placeholder="Write your review..."
                  value={formData.comment}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded ${errors.comment ? "border-red-500" : ""}`}
                />
                {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-purple-600 text-white px-5 py-2 rounded disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "", rating: 5, comment: "" });
                    setErrors({});
                  }}
                  className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review.avatar && review.avatar.trim() !== ""
                        ? review.avatar
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`
                    }
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Stars rating={review.rating} />
                  <button
                    onClick={() => handleLike(review._id)}
                    className={`text-sm px-2 py-1 rounded ${
                      likedReviews[review._id] ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {likedReviews[review._id] ? "Liked" : "Like"} ({review.likes || 0})
                  </button>
                </div>
              </div>

              <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
