import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    founded: "",
  });

  /* FETCH COMPANIES */
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies");
        const data = await res.json();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  /* FILTER + SORT */
  useEffect(() => {
    let list = [...companies];

    if (searchTerm) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationTerm) {
      list = list.filter((c) =>
        c.address?.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "date") {
      list.sort((a, b) => new Date(b.founded || 0) - new Date(a.founded || 0));
    }

    setFilteredCompanies(list);
  }, [searchTerm, locationTerm, sortBy, companies]);

  /* SUBMIT COMPANY */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.address.trim() || !form.city.trim()) {
      setError("Company name, address and city are required");
      return;
    }

    const newCompany = {
      name: form.name,
      address: `${form.address}, ${form.city}`,
      founded: form.founded || null,
      rating: 1,
      reviewsCount: 0,
    };

    try {
      const res = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCompany),
      });

      const savedCompany = await res.json();
      setCompanies([savedCompany, ...companies]);
      setShowAddCompany(false);
      setForm({ name: "", address: "", city: "", founded: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add company");
    }
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <FilterBar
            locationTerm={locationTerm}
            onLocationSearch={setLocationTerm}
            onSort={setSortBy}
            onAddCompany={() => setShowAddCompany(true)}
          />

          {!loading && (
            <p className="text-sm text-gray-500 mt-6">
              Results Found: {filteredCompanies.length}
            </p>
          )}

          {loading ? (
            <p className="mt-6">Loading...</p>
          ) : (
            <div className="mt-8 space-y-8">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ADD COMPANY MODAL */}
      {showAddCompany && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px]">
            <h2 className="text-lg font-semibold mb-4">Add Company</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Company Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border w-full px-3 py-2 mb-3 rounded"
              />

              <input
                placeholder="Address *"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="border w-full px-3 py-2 mb-3 rounded"
              />

              <input
                placeholder="City *"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border w-full px-3 py-2 mb-3 rounded"
              />

              <input
                type="date"
                value={form.founded}
                onChange={(e) => setForm({ ...form, founded: e.target.value })}
                className="border w-full px-3 py-2 mb-3 rounded"
              />

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCompany(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
