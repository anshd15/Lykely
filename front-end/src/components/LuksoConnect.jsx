// src/components/LuksoConnect.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import { PowerIcon, PowerOffIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const LuksoConnect = () => {
	const [provider, setProvider] = useState(null);
	const [account, setAccount] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState(null);
	const [authLoading, setAuthLoading] = useState(false);
	const { user, loading, setUser } = useAuth();

	useEffect(() => {
		// Check if LUKSO extension is available
		if (window.lukso) {
			const ethersProvider = new ethers.BrowserProvider(window.lukso);
			setProvider(ethersProvider);
		} else {
			setError('LUKSO Browser Extension not found. Please install it.');
		}
	}, []);

	const connectWallet = async () => {
		if (!provider) {
			toast.error('Please install Universal Profile extension.');
			return;
		}
		// Request accounts
		const accounts = await provider.send('eth_requestAccounts', []);
		setAccount(accounts[0]);
		return accounts[0];
	};

	const handleAuth = async () => {
		try {
			setAuthLoading(true);
			const account = await connectWallet();
			if (!provider || !account) return;

			const { chainId } = await provider.getNetwork();

			// Generate nonce
			const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
				.map((b) => b.toString(16).padStart(2, '0'))
				.join('');
			// Create SIWE message
			const siweMessage = new SiweMessage({
				domain: window.location.host,
				address: account,
				statement: 'Sign in with your Universal Profile to access Lykely.',
				uri: window.location.origin,
				version: '1',
				chainId: chainId,
				nonce: nonce,
				issuedAt: new Date().toISOString(),
				resources: ['https://terms.example.com'],
			}).prepareMessage();

			// Get signer and request signature
			const signer = await provider.getSigner(account);
			const signature = await signer.signMessage(siweMessage);

			// Send to backend for verification and JWT generation
			const authResponse = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/api/users/auth`,
				{
					message: siweMessage,
					signature: signature,
					address: account,
				}
			);

			if (authResponse.data.token) {
				localStorage.setItem('token', authResponse.data.token);
				localStorage.setItem('user', JSON.stringify(authResponse.data.result));
				setUser(authResponse.data.result);
				setIsLoggedIn(true);
			}
			toast.success('Successfully logged in!');
		} catch (error) {
			setError('Error during sign-in: ' + error.message);
		} finally {
			setAuthLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsLoggedIn(false);
		setUser(null);
		toast.success('Successfully logged out!');
	};

	return (
		<div className='font-sans'>
			{!loading && user ? (
				<div className='flex items-center gap-4 max-sm:flex-col'>
					<Link to={'/dashboard'}>
						<p className='border-2 hover:bg-[#FE005B] hover:text-white flex gap-1 items-center text-lukso text-lg py-1.5 px-4 bg-gray-950 border-lukso rounded-md'>
							<User /> @{user.username}
						</p>
					</Link>
					<button
						className='bg-lukso p-2 rounded-lg text-white hover:saturate-[0.9] max-sm:w-full '
						onClick={logout}
					>
						<PowerIcon className='max-sm:mx-auto'/>
					</button>
				</div>
			) : (
				<div>
					{authLoading || loading ? (
						<div
							className={`bg-white/20 rounded-lg w-[130px] max-md:w-full h-[43px] animate-pulse`}
						/>
					) : (
						<button
							className='bg-lukso py-1.5 px-2 max-md:w-[190px] text-lg rounded-lg text-white hover:saturate-[0.9]'
							onClick={handleAuth}
						>
							Connect Wallet
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default LuksoConnect;
