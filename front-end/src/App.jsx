import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import AuthDetails from './pages/authDetails';
import Navbar from './components/Navbar';
import UserDashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import { useEffect, useState } from 'react';

function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <>
      <Toaster />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/upload' element={<ListingPage />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/auth/details' element={<AuthDetails />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className='pt-[10vh] bg-gray-900'>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;