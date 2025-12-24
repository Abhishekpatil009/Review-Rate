import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {loading ? (
            <p>Loading companies...</p>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Result Found: {companies.length}
              </p>

              <div className="mt-6 space-y-6">
                {companies.map((company) => (
                  <CompanyCard key={company._id} company={company} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
