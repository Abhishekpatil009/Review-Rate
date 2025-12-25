import { MapPinIcon } from "@heroicons/react/24/solid";

export default function FilterBar({ onAddCompany, onSort }) {
  return (
    <div className="bg-white shadow rounded-md px-6 py-5 flex items-end gap-4">
      {/* CITY */}
      <div className="flex flex-col w-[350px]">
        <label className="text-sm text-gray-500 mb-1">Select City</label>
        <div className="relative">
          <input
            value="Indore, Madhya Pradesh, India"
            readOnly
            className="w-full border rounded-md px-4 py-2 pr-10"
          />
          <MapPinIcon className="w-5 h-5 text-purple-600 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* FIND */}
      <button className="bg-purple-600 text-white px-6 py-2 rounded-md">
        Find Company
      </button>

      {/* ADD */}
      <button
        onClick={onAddCompany}
        className="bg-purple-600 text-white px-6 py-2 rounded-md"
      >
        + Add Company
      </button>

      {/* SORT */}
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
