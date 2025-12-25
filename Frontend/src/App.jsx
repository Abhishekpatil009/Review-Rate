import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyDetail from "./pages/CompanyDetail";
import Login from "./pages/Login";
import Signup from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
