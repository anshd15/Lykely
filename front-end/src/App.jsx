import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import AuthDetails from "./pages/authDetails";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/DashBoard";
import LandingPage from "./pages/LandingPage";

// Custom wrapper to use hooks outside Router
function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/Get-Started"];

  return (
    <div >
      <Toaster />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListingPage />} />
        <Route path="/Get-Started" element={<LandingPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/auth/details" element={<AuthDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
