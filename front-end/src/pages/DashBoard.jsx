import React, { useEffect, useState } from 'react';
import {
	Search,
	Trophy,
	ImagePlus,
	TrendingUp,
	Heart,
	LucideXCircle,
	CheckCircle2Icon,
	Loader2,
} from 'lucide-react';
import { MemesGrid } from '../components/MemeGrid';
import { BetsGrid } from '../components/BetsGrid';
import axios from 'axios';

const UserDashboard = () => {
	const [activeTab, setActiveTab] = useState('memes');
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');
	const [betStatusFilter, setBetStatusFilter] = useState('all');

	// const userData = {
	//   username: "lolcatz",
	//   totalBetsWon: 2,
	//   totalBetsLost: 1,
	//   totalAmount: 2500,
	//   memesPosted: 3,
	//   memes: [
	//     {
	//       id: 1,
	//       title: "Web3 Problems",
	//       likes: 234,
	//       date: "2024-01-28",
	//       image:
	//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSHffAqYqYsZhUL2N4-AUiXQaqF_j0i4DgQ&s",
	//     },

	//   ],
	//   bets: [
	//     {
	//       id: 2,
	//       amount: 50,
	//       choice: "non-viral",
	//       status: "lost",
	//       date: "2024-01-27",
	//       memeTitle: "DeFi Drama",
	//       image: "https://pbs.twimg.com/media/EX4CyEzWsAIbzLn.jpg",
	//     },

	//   ],
	// };

	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { data } = await axios.get(
					import.meta.env.VITE_SERVER_URL +
						`/api/users/${localStorage.getItem('email')}`
				);
				setUserData(data);
			} catch (error) {
				console.error(error);

				toast.error('Failed to fetch user data');

				setUserData([]);
			} finally {
				setTimeout(() => setLoading(false), 1000);
			}
		};

		fetchUserData();
	}, []);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className=' text-[#FE005B] loader ' />
			</div>
		);
	}

	if (userData.length === 0) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<p className='text-white text-lg'>No user found</p>
			</div>
		);
	}

	const filteredMemes = userData.memes
		.filter((meme) =>
			meme.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (activeFilter === 'latest') return new Date(b.date) - new Date(a.date);
			if (activeFilter === 'oldest') return new Date(a.date) - new Date(b.date);
			return 0;
		});

	const filteredBets = userData.bets
		.filter(
			(bet) =>
				bet.memeTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
				(betStatusFilter === 'all' || bet.status === betStatusFilter)
		)
		.sort((a, b) => {
			if (activeFilter === 'latest') return new Date(b.date) - new Date(a.date);
			if (activeFilter === 'oldest') return new Date(a.date) - new Date(b.date);
			return 0;
		});

	return (
		<div className='min-h-screen primary-font bg-gray-900 p-6'>
			<div className='mb-8'>
				<h1 className='text-4xl font-bold text-white mb-4'>
					Hello{' '}
					<span className='text-[#FE005B] italic'>{userData.username}</span>
				</h1>

				<div className='bg-gray-800 rounded-lg p-6 flex justify-between gap-4 max-sm:flex-col max-sm:items-center'>
					<div className='flex place-items-center gap-2'>
						<Trophy className='w-8 h-8 text-[#FE005B]' />
						<p className='text-2xl font-bold text-[#FE005B]'>
							${userData.totalAmount}
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<CheckCircle2Icon className='w-8 h-8 text-green-400' />
						<p className='text-green-400 text-2xl font-semibold'>
							{userData.totalBetsWon} Won
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<LucideXCircle className='w-8 h-8 text-red-400' />
						<p className='text-red-400 text-2xl font-semibold'>
							{userData.totalBetsLost} Lost
						</p>
					</div>

					<div className='flex items-center gap-2'>
						<ImagePlus className='w-8 h-8 text-blue-400' />
						<p className='text-blue-400 text-2xl font-semibold'>
							{userData.memesPosted} Memes
						</p>
					</div>
				</div>
			</div>

			<div className='flex flex-wrap gap-4 mb-6'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none' />
					<input
						type='text'
						className='w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#FE005B] focus:outline-none'
						placeholder='Search...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{activeTab === 'memes' ? (
					<div className='flex gap-2'>
						{['all', 'oldest', 'latest'].map((filter) => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`px-4 py-2 rounded-lg capitalize transition-colors ${
									activeFilter === filter
										? 'bg-[#FE005B] text-gray-900'
										: 'bg-gray-800 text-gray-400 hover:bg-gray-700'
								}`}
							>
								{filter}
							</button>
						))}
					</div>
				) : (
					<div className='flex gap-2'>
						{['all', 'won', 'lost', 'in-progress'].map((status) => (
							<button
								key={status}
								onClick={() => setBetStatusFilter(status)}
								className={`px-4 py-2 rounded-lg capitalize transition-colors ${
									betStatusFilter === status
										? 'bg-[#FE005B] text-gray-900'
										: 'bg-gray-800 text-gray-400 hover:bg-gray-700'
								}`}
							>
								{status}
							</button>
						))}
					</div>
				)}
			</div>

			<div className='flex mb-6 gap-2'>
				<button
					onClick={() => setActiveTab('memes')}
					className={`flex items-center px-4 py-2 font-medium transition-colors rounded-lg ${
						activeTab === 'memes'
							? 'text-gray-900 bg-[#FE005B] '
							: 'text-gray-100 bg-gray-500 hover:text-white'
					}`}
				>
					<ImagePlus className='w-4 h-4 mr-2' />
					My Memes
				</button>
				<button
					onClick={() => setActiveTab('bets')}
					className={`flex items-center px-4 py-2 font-medium transition-colors rounded-lg ${
						activeTab === 'bets'
							? 'text-gray-900 bg-[#FE005B] '
							: 'text-gray-100 bg-gray-500 hover:text-white'
					}`}
				>
					<TrendingUp className='w-4 h-4 mr-2' />
					My Bets
				</button>
			</div>

			{activeTab === 'memes' ? (
				<MemesGrid memes={filteredMemes} />
			) : (
				<BetsGrid bets={filteredBets} />
			)}
		</div>
	);
};

export default UserDashboard;
