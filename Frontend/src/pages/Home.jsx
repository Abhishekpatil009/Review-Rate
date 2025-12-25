import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    founded: "",
  });

  /* 🔹 FETCH COMPANIES */
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies");
        const data = await res.json();
        setCompanies(data);
        setFilteredCompanies(sortCompanies(data, sortBy));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  /* 🔹 SORT FUNCTION */
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

  /* 🔹 FILTER HANDLER */
  const handleFilter = ({ search, rating }) => {
    let filtered = companies;

    if (search) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (rating) {
      filtered = filtered.filter((c) => c.rating >= rating);
    }

    setFilteredCompanies(sortCompanies(filtered, sortBy));
  };

  /* 🔹 SORT HANDLER */
  const handleSortChange = (value) => {
    setSortBy(value);
    setFilteredCompanies(sortCompanies(filteredCompanies, value));
  };

  /* 🔹 FORM CHANGE */
  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🔹 SUBMIT COMPANY */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.name
    )}&background=random`;

    try {
      const res = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          founded: formData.founded || null,
          logo: logoUrl,
        }),
      });

      const newCompany = await res.json();
      const updated = [newCompany, ...companies];

      setCompanies(updated);
      setFilteredCompanies(sortCompanies(updated, sortBy));
      setShowForm(false);
      setFormData({ name: "", address: "", founded: "" });
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <FilterBar
            onFilter={handleFilter}
            onSort={handleSortChange}
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
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Company</h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="date"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  {submitting ? "Adding..." : "Add Company"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
