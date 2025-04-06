import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
	const { user, loading } = useAuth();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (!loading && !user) {
			toast.error('Connect your wallet first');
			setShouldRedirect(true);
		}
	}, [user, loading]);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className=' text-[#FE005B] loader ' />
			</div>
		);
	}

	if (shouldRedirect) return <Navigate to='/home' replace />;

	return <Outlet />;
};

export default ProtectedRoute;