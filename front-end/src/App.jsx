import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import AuthDetails from './pages/authDetails';
import Navbar from './components/Navbar';
import UserDashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<div className='pt-[10vh] bg-gray-900'>
			<BrowserRouter>
				<Toaster />
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route element={<ProtectedRoute />}>
						<Route path='/upload' element={<ListingPage />} />
						<Route path='/dashboard' element={<UserDashboard />} />
						<Route path='/auth/details' element={<AuthDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
