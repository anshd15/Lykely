import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { FaCoins, FaMoneyBill, FaMoneyCheck } from 'react-icons/fa';
import { ethers } from 'ethers';

const ViralToggle = ({ memeId, creator_wallet, result, uploadDate }) => {
	const [selectedBet, setSelectedBet] = useState(null);
	const userEmail = localStorage.getItem('email');
	const userId = localStorage.getItem('userId');
	const [modalIsOpen, setIsOpen] = useState(false);
	const [betAmount, setBetAmount] = useState('');
	const [action, setAction] = useState('');

	useEffect(() => {
		const checkUserBet = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_SERVER_URL
					}/api/memes/${memeId}/user-bet/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
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

	const hasPaymentMade = async (creator_wallet, amount) => {
		try {
			if (!window.lukso) {
				toast.error('Please install the LUKSO UP extension.');
				return;
			}
			console.log(amount, creator_wallet);
			if (!amount) {
				toast.error('Please enter an amount to place a bet.');
				return;
			}
			if (parseFloat(amount) <= 0) {
				toast.error('Please enter a valid amount to place a bet.');
				return;
			}
			closeModal();
			const provider = new ethers.BrowserProvider(window.lukso);
			const signer = await provider.getSigner();
			await signer.sendTransaction({
				to: creator_wallet,
				value: ethers.parseEther(amount.toString()),
			});
			toast.success('Transaction successful!');
			return true;
		} catch (error) {
			toast.error('Transaction failed!');
			console.log('Error sending transaction:', error);
			return false;
		}
	};

	const [placingBet, setPlacingBet] = useState(false);

	const placeBet = async (betType) => {
		try {
			setPlacingBet(true);
			if (betAmount < 0.1) {
				toast.error('Minimum bet amount is $LYX 0.1');
				return;
			}
			if (selectedBet) {
				toast.error(`You have already placed a bet on ${selectedBet}`);
				return;
			}
			const a = betAmount.trim();
			if (!a) {
				toast.error('Please enter an amount to bet.');
				return;
			}
			if (!betType) {
				toast.error('Please select an action.');
				return;
			}
			const amount = betAmount.trim();
			const payStatus = await hasPaymentMade(creator_wallet, amount);
			if (!payStatus) {
				return;
			}
			await toast.promise(
				axios.post(
					`${import.meta.env.VITE_SERVER_URL}/api/memes/place-bet/${memeId}`,
					{
						amount,
						betType,
					}
				),
				{
					loading: 'Verifying transaction...',
					success: `Bet placed on ${betType.toUpperCase()} for ${amount} $LYX`,
					error: 'Failed to place bet',
				}
			);
			setSelectedBet(betType);
		} catch (error) {
			console.error('Error placing bet', error);
			toast.error(error.response?.data?.message || 'Failed to place bet');
		} finally {
			setPlacingBet(false);
		}
	};

	function openModal(action) {
		setIsOpen(true);
		setAction(action);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	const isBettingOpen =
		new Date().getTime() <=
		new Date(new Date(uploadDate).getTime() + 3 * 24 * 60 * 60 * 1000);

	const isResultDeclared =
		(result !== 'pending' && result !== undefined) ||
		result === 'viral' ||
		result === 'notViral';

	const resultText = result === 'viral' ? 'Viral' : 'Not Viral';

	return (
		<div className='relative max-md:h-[5vh] h-[7vh] px-2 primary-font text-[15px] flex gap-4 w-full'>
			{isBettingOpen ? (
				<>
					<button
						className={`items-center justify-center rounded-lg hover:scale-110 transition-all duration-300 text-lg pt-1 flex w-[50%]  ${
							selectedBet === 'viral'
								? 'bg-green-600 mt-3'
								: 'font-extrabold bg-gradient-to-r from-lukso to-purple-500  bg-clip-text text-transparent'
						}`}
						onClick={() => openModal('viral')}
						disabled={!!selectedBet}
					>
						Viral
					</button>
					<div className='h-[70%] w-[1px] mt-3 rounded-3xl bg-[#ffffff2f] '></div>
					<button
						className={`  items-center justify-center rounded-lg hover:scale-110 transition-all duration-300 text-lg pt-1 flex w-[50%]  ${
							selectedBet === 'notViral'
								? 'bg-lukso mt-3'
								: 'font-extrabold bg-gradient-to-r from-lukso to-purple-500  bg-clip-text text-transparent'
						}`}
						onClick={() => openModal('notViral')}
						disabled={!!selectedBet}
					>
						Not Viral
					</button>{' '}
				</>
			) : (
				<p
					className={`${
						isResultDeclared ? 'bg-green-500' : 'bg-lukso'
					} text-white p-2 mx-auto text-center flex items-center justify-center text-lg w-full rounded-md font-bold`}
				>
					{isResultDeclared
						? 'Result Declared :' + ' ' + resultText
						: 'Betting Closed'}
				</p>
			)}

			{placingBet && (
				<div className='absolute top-0 left-0 py-3 w-full bg-black/70 flex flex-col items-center justify-center'>
					<p className='text-lg mb-2'>Placing Bet</p>
					<img
						src='/loader.png'
						alt='Loading...'
						className='w-12 h-12 animate-spin '
					/>
				</div>
			)}

			{/* Amount Modal */}
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				contentLabel='Example Modal'
				style={{
					overlay: {
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
					},
				}}
				className='bg-gradient-to-br from-lukso to-purple-500 max-lg:w-[96%] max-lg:h-[46%] text-lg px-10 shadow-2xl text-white absolute h-[43%] w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] my-auto rounded-xl flex flex-col gap-2 items-center justify-center'
			>
				<h1 className='text-2xl mb-1 font-bold text-left flex gap-2 items-center'>
					<FaCoins size={28} /> Bet{' '}
				</h1>
				<p className='w-full text-left'>
					Enter the amount in $LYX you wan'na bet on this meme:
				</p>
				<p className='w-full text-left'>Min amount : $LYX 0.1</p>
				<p className='w-full text-left'>
					Your action :{' '}
					{action.toLowerCase().includes('not') ? 'Not Viral' : 'Viral'}
				</p>
				<input
					type='number'
					className='rounded-lg w-full bg-white text-black px-4 py-2 text-lg'
					placeholder='Amount in $LYX'
					onChange={(e) => setBetAmount(e.target.value)}
					value={betAmount}
				/>
				<div className='flex gap-6 justify-items-start w-full'>
					<button
						onClick={() => placeBet(action)}
						className='px-3 py-1 font-bold text-[16px] border-2 hover:bg-white hover:text-lukso rounded-lg'
					>
						Place Bet
					</button>
					<button
						className='px-3 py-1 font-bold text-[16px] border-2 hover:bg-white hover:text-lukso rounded-lg'
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default ViralToggle;
