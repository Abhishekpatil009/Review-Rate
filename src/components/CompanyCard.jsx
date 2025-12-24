import { MapPinIcon, StarIcon } from "@heroicons/react/24/solid";

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div className="flex gap-5">
        {/* LOGO */}
        <div
          className={`w-16 h-16 rounded-md flex items-center justify-center text-white text-xl font-bold ${company.bg}`}
        >
          {company.logo}
        </div>

        {/* DETAILS */}
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
            {company.reviews && (
              <span className="text-sm font-medium ml-2">
                {company.reviews} Reviews
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <p className="text-sm text-gray-400 mb-4">{company.date}</p>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-md">
          Detail Review
        </button>
      </div>
    </div>
  );
}
