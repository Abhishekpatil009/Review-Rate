import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 FETCH COMPANIES FROM BACKEND */
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies");
        const data = await res.json();

        setCompanies(data);
        setFilteredCompanies(data); // default: show all
      } catch (err) {
        console.error("Error fetching companies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  /* 🔹 FILTER HANDLER (used by FilterBar) */
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

    setFilteredCompanies(filtered);
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* FILTER BAR */}
          <FilterBar onFilter={handleFilter} />

          {/* RESULT COUNT */}
          {!loading && (
            <p className="text-sm text-gray-400 mt-8">
              Result Found: {filteredCompanies.length}
            </p>
          )}

          {/* LOADING */}
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
    </>
  );
}
