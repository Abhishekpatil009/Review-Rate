import { MapPinIcon } from "@heroicons/react/24/solid";

export default function FilterBar({
  locationTerm,
  onLocationSearch,
  onAddCompany,
  onSort,
}) {
  return (
    <div className="bg-white shadow rounded-md px-6 py-5 flex items-end gap-4">
      <div className="flex flex-col w-[350px]">
        <label className="text-sm text-gray-500 mb-1">
          Search by Address / City
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Indore, Shubham Nagar"
            value={locationTerm}
            onChange={(e) => onLocationSearch(e.target.value)}
            className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-purple-500"
          />
          <MapPinIcon className="w-5 h-5 text-purple-600 absolute right-3 top-2.5" />
        </div>
      </div>

      <button
        onClick={onAddCompany}
        className="bg-purple-600 text-white px-6 py-2 rounded-md"
      >
        + Add Company
      </button>

      <div className="ml-auto">
        <label className="text-sm text-gray-500 block mb-1">Sort:</label>
        <select
          className="border rounded-md px-4 py-2 w-44"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="name">By Name (A–Z)</option>
          <option value="date">By Founded Date</option>
        </select>
      </div>
    </div>
  );
}
