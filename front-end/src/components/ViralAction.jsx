import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViralToggle = ({ memeId }) => {
	const [selectedBet, setSelectedBet] = useState(null);
	const userEmail = localStorage.getItem('email');
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		const checkUserBet = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_SERVER_URI
					}/api/memes/${memeId}/user-bet/${userId}`
				);
				if (res.data.placedBet) {
					setSelectedBet(res.data.placedBet);
				}
			} catch (error) {
				console.error('Error fetching bet info', error);
			}
		};
		checkUserBet();
	}, [memeId, userId]);

	const placeBet = async (betType) => {
		try {
			if (selectedBet) {
				toast.error(`You have already placed a bet on ${selectedBet}`);
				return;
			}
			const a = prompt('Enter the amount to bet (in $)');
			if (!a) return;
			const amount = parseInt(a, 10);
			await axios.post(
				`${import.meta.env.VITE_SERVER_URI}/api/memes/bet/${memeId}`,
				{
					email: userEmail,
					amount,
					betType,
				}
			);

			setSelectedBet(betType);
			toast.success(`Bet placed on ${betType} for $${amount}`);
		} catch (error) {
			console.error('Error placing bet', error);
			toast.error(error.response?.data?.message || 'Failed to place bet');
		}
	};

	return (
		<div className='absolute top-0 primary-font text-[15px] left-1/2 transform -translate-x-1/2 flex gap-4 mt-4 w-full px-4'>
			<button
				className={`p-2 rounded-full flex-1 text-white ${
					selectedBet === 'viral'
						? 'bg-[#FE005B]'
						: 'border border-[#afaeae] bg-slate-950'
				}`}
				onClick={() => placeBet('viral')}
				disabled={!!selectedBet}
			>
				Viral
			</button>
			<button
				className={`p-2 rounded-full flex-1 text-white ${
					selectedBet === 'notViral'
						? 'bg-orange-500'
						: 'border border-[#afaeae] bg-slate-950'
				}`}
				onClick={() => placeBet('notViral')}
				disabled={!!selectedBet}
			>
				Not Viral
			</button>
		</div>
	);
};

export default ViralToggle;
