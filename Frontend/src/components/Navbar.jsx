import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg">
              ★
            </div>
            <h1 className="text-xl font-semibold">
              Review<span className="text-purple-600">&</span>RATE
            </h1>
          </Link>
        </div>

        {/* SEARCH */}
        <div className="relative w-[420px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-purple-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-purple-600 absolute right-3 top-2.5" />
        </div>

        {/* AUTH */}
        <div className="flex gap-6 text-sm">
          <Link
            to="/signup"
            className="px-3 py-1 border rounded-md border-purple-600 text-purple-600 hover:bg-purple-50 transition"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="px-3 py-1 border rounded-md border-purple-600 text-purple-600 hover:bg-purple-50 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
