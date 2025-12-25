import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaStar } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      
      // Save JWT and name
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name); // save name for Navbar

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 overflow-hidden">
      <FaStar className="absolute text-purple-100 text-6xl top-24 left-20 opacity-10" />
      <FaStar className="absolute text-purple-100 text-5xl bottom-28 right-24 opacity-10" />

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg px-8 py-7 z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
            <FaStar />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Review<span className="text-purple-600">&</span>RATE
          </h1>
        </div>

        <h2 className="text-lg font-semibold text-center">Create Account</h2>
        <p className="text-gray-500 text-center mb-5 text-sm">
          Share your experience with trusted reviews
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div>
            <label className="text-xs font-medium text-gray-600">Full Name</label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Email Address</label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-purple-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
