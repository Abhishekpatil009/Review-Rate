import { MapPinIcon, StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
  return (
    <Link to={`/company/${company._id}`}>
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-lg transition cursor-pointer">
        <div className="flex gap-5">
          <div
            className={`w-16 h-16 rounded-md flex items-center justify-center text-white text-xl font-bold ${company.bg}`}
          >
            {company.name.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-semibold">{company.name}</h3>

            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPinIcon className="w-4 h-4" />
              {company.address}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">{company.rating}</span>

              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
              ))}

              <span className="text-sm ml-2">
                {company.reviewsCount} Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
