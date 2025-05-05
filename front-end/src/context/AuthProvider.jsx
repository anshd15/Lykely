import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Check if user is logged in via JWT
	useEffect(() => {
		const checkLoggedIn = async () => {
			const token = localStorage.getItem('token');

			if (token) {
				try {
					// Set auth header
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					// Verify token with backend
					const res = await axios.get(
						`${import.meta.env.VITE_SERVER_URL}/api/users/get`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
					setUser(res.data.user);
				} catch (error) {
					// Clear invalid token
					localStorage.removeItem('token');
					delete axios.defaults.headers.common['Authorization'];
				}
			}

			setLoading(false);
		};

		checkLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
