import { MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function CompanyCard({ company }) {
  if (!company) return null;

  const rating = company.rating ?? 1;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Link to={`/company/${company._id}`} className="block">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          p-7
          flex
          items-center
          border
          border-gray-100
          hover:shadow-lg
          hover:-translate-y-1
          transition
          cursor-pointer
        "
      >
        <div className="flex gap-6">
          {/* Logo */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={
                company.logo ||
                `https://ui-avatars.com/api/?name=${company.name
                  ?.split(" ")
                  .join("+")}&background=random`
              }
              alt={company.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {company.name}
            </h3>

            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPinIcon className="w-4 h-4 text-gray-400" />
              {company.address}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="font-semibold text-gray-800">
                {rating.toFixed(1)}
              </span>

              <div className="flex gap-1">
                {[...Array(fullStars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
                {hasHalfStar && (
                  <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                  (_, i) => (
                    <FaRegStar key={i} className="text-yellow-400 w-4 h-4" />
                  )
                )}
              </div>

              <span className="text-sm text-gray-500 ml-2">
                {company.reviewsCount ?? 0} Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
