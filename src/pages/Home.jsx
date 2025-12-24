import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import CompanyCard from "../components/CompanyCard";
import { companies } from "../data/companies";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <FilterBar />

          <p className="text-sm text-gray-400 mt-8">
            Result Found: {companies.length}
          </p>

          <div className="mt-6 space-y-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
