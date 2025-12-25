import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");     // company name
  const [locationTerm, setLocationTerm] = useState(""); // address / city
  const [sortBy, setSortBy] = useState("name");
  const [showForm, setShowForm] = useState(false);

  /* FETCH COMPANIES */
  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("http://localhost:5000/api/companies");
      const data = await res.json();
      setCompanies(data);
      setFilteredCompanies(sortCompanies(data, sortBy));
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  /* SORT */
  const sortCompanies = (list, type) => {
    const sorted = [...list];

    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (type === "date") {
      sorted.sort(
        (a, b) => new Date(b.founded || 0) - new Date(a.founded || 0)
      );
    }

    return sorted;
  };

  /* FILTER: NAME + ADDRESS + SORT */
  useEffect(() => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationTerm) {
      filtered = filtered.filter((c) =>
        c.address?.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }

    setFilteredCompanies(sortCompanies(filtered, sortBy));
  }, [searchTerm, locationTerm, sortBy, companies]);

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <FilterBar
            locationTerm={locationTerm}
            onLocationSearch={setLocationTerm}
            onSort={setSortBy}
            onAddCompany={() => setShowForm(true)}
          />

          {!loading && (
            <p className="text-sm text-gray-400 mt-6">
              Result Found: {filteredCompanies.length}
            </p>
          )}

          {loading ? (
            <p className="mt-6">Loading companies...</p>
          ) : (
            <div className="mt-6 space-y-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ADD COMPANY MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h2 className="text-lg font-semibold mb-3">Add Company</h2>
            <p className="text-sm text-gray-500">
              Company form goes here…
            </p>

            <button
              onClick={() => setShowForm(false)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
