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
						import.meta.env.VITE_SERVER_URL
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
				`${import.meta.env.VITE_SERVER_URL}/api/memes/bet/${memeId}`,
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
		<div className='relative h-[7vh] primary-font text-[15px] flex gap-4  w-full'>
			<button
				className={`items-center justify-center  hover:scale-110 transition-all duration-300 text-xl pt-1 flex w-[50%]  ${
					selectedBet === 'viral'
						? 'bg-[#FE005B]'
						: 'font-extrabold bg-gradient-to-r from-lukso to-purple-500  bg-clip-text text-transparent'
				}`}
				onClick={() => placeBet('viral')}
				disabled={!!selectedBet}
			>
				Viral
			</button>
			<div className='h-[70%] w-[1px] mt-3 rounded-3xl bg-[#ffffff2f] '></div>
			<button
				className={`  items-center justify-center hover:scale-110 transition-all duration-300 text-xl pt-1 flex w-[50%]   ${
					selectedBet === 'notViral'
						? 'bg-orange-500'
						: 'font-extrabold bg-gradient-to-r from-lukso to-purple-500  bg-clip-text text-transparent'
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
