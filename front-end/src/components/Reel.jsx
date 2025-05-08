import axios from 'axios';
import { toast } from 'react-hot-toast';
import ViralToggle from './ViralAction';
import { FiHeart, FiSend, FiZap } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { FaHeart, FaChevronUp } from 'react-icons/fa';
import { MdPeopleOutline } from 'react-icons/md';
import { ethers } from 'ethers';
import Modal from 'react-modal';

const Reel = ({
	media,
	title,
	description,
	likes,
	shares,
	likedOrNot,
	id,
	activeReel,
	setActiveReel,
	type,
	creator_wallet,
	reelData,
	views,
}) => {
	const [liked, setLiked] = useState(likedOrNot || false);
	const [likesCount, setLikesCount] = useState(likes);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [supportAmount, setSupportAmount] = useState(null);
	const videoRef = useRef(null);
	const isActive = activeReel === id;

	const handleLike = async () => {
		try {
			await axios.post(
				import.meta.env.VITE_SERVER_URL + `/api/memes/like/${id}`,
				null,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (liked) {
				setLiked(false);
				setLikesCount((prev) => prev - 1);
			} else {
				setLiked(true);
				setLikesCount((prev) => prev + 1);
			}
		} catch (error) {
			console.error('Error liking the post:', error);
			toast.error('Failed to like the post');
		}
	};

	const togglePlayPause = () => {
		if (!isActive) {
			setActiveReel(id);
		} else if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
			} else {
				videoRef.current.pause();
			}
		}
	};

	useEffect(() => {
		if (videoRef.current) {
			if (isActive) {
				videoRef.current.play();
				videoRef.current.muted = false;
			} else {
				videoRef.current.pause();
				videoRef.current.muted = true;
			}
		}
	}, [isActive]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					if (videoRef.current) {
						videoRef.current.play();
						videoRef.current.muted = false;
					}
				} else {
					if (videoRef.current) {
						videoRef.current.pause();
						videoRef.current.muted = true;
					}
				}
			},
			{
				threshold: 0.5,
			}
		);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		return () => {
			if (videoRef.current) {
				observer.unobserve(videoRef.current);
			}
		};
	}, []);

	const toggleDrawer = () => {
		setDrawerOpen((prev) => !prev);
	};

	const [boostingMeme, setBoostingMeme] = useState(false);

	const handleSupport = async () => {
		try {
			setBoostingMeme(true);
			if (!window.lukso) {
				toast.error('Please install the LUKSO UP extension.');
				return;
			}
			if (!supportAmount) {
				toast.error('Please enter an amount to support the creator.');
				return;
			}
			if (parseFloat(supportAmount) <= 0) {
				toast.error('Please enter a valid amount to support the creator.');
				return;
			}
			closeModal();
			const provider = new ethers.BrowserProvider(window.lukso);
			const signer = await provider.getSigner();
			await signer.sendTransaction({
				to: creator_wallet,
				value: ethers.parseEther(supportAmount.toString()),
			});
			await axios.post(
				import.meta.env.VITE_SERVER_URL + `/api/memes/support/${id}`,
				{
					amount: supportAmount,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success('Transaction successful!');
		} catch (error) {
			toast.error('Transaction failed!');
			console.log('Error sending transaction:', error);
		} finally {
			setBoostingMeme(false);
		}
	};

	const handleShare = () => {
		const url = `${window.location.origin}/reel/${id}`;
		navigator.clipboard.writeText(url);
		toast.success('Link copied to clipboard!');
	};

	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className='relative rounded-none border-s border-e border-[#ffffff1f] flex flex-col h-[90vh] w-[30vw] max-sm:w-[100vw] '>
			{boostingMeme && (
				<div className='z-10 absolute top-0 left-0 py-3 w-full bg-black/70 flex flex-col items-center justify-center'>
					<p className='text-lg mb-2'>Boosting Creator Meme</p>
					<img
						src='/loader.png'
						alt='Loading...'
						className='w-12 h-12 animate-spin '
					/>
				</div>
			)}
			<ViralToggle
				memeId={id}
				creator_wallet={creator_wallet}
				uploadDate={reelData.createdAt}
				result={reelData.result}
			/>
			<div className='flex flex-col  h-[76vh] w-[100vw] sm:w-full overflow-hidden items-center justify-center'>
				{type === 'video' ? (
					<video
						ref={videoRef}
						className='w-full h-full object-cover'
						src={media}
						autoPlay={isActive}
						loop
						playsInline
						onClick={togglePlayPause}
						muted={!isActive}
					/>
				) : (
					<img
						className='w-full h-full object-scale-down  '
						src={media}
						alt='Meme'
					/>
				)}
				<div className='w-full text-gray-400 text-sm absolute bottom-14 left-3 flex items-center gap-1'>
					<MdPeopleOutline size={21} />
					<p className='text-gray-400'>{views} views</p>
				</div>
			</div>

			<div
				className={`mb-[-4px] ease-in-out ${
					drawerOpen ? 'h-min' : 'h-[7vh]'
				} border border-white/10  bg-white/5 overflow-hidden backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-300 text-white p-4 flex-col flex absolute bottom-0 left-0 w-full rounded-t-3xl`}
			>
				<div className='absolute top-[40%] right-0 w-[600px] h-[200px] bg-purple-600 opacity-95 rounded-full blur-[90px] z-0' />
				<div className='absolute top-0 left-0 w-[600px] h-[200px] bg-purple-600 opacity-95 rounded-full blur-[90px] z-0' />

				<div className='relative  z-10'>
					<h1
						className={`text-lg font-semibold text-white primary-font mb-2 ${
							drawerOpen ? 'absolute mt-1 top-2' : 'relative truncate'
						}`}
					>
						{title}
					</h1>

					<p
						className={`text-sm text-white z-10 transition-all duration-300 ease-in-out ${
							drawerOpen
								? 'h-[80%] mt-10 mb-4 overflow-auto'
								: 'h-0 overflow-hidden'
						}`}
					>
						<p className='font-bold mb-2'>@{reelData.creator.username}</p>
						<hr className='bg-gray-400 text-gray-400 my-1' />
						{description}
						<p className='my-1 text-gray-300'>
							{new Date(reelData.createdAt).toDateString()}
						</p>
					</p>
				</div>

				<div
					className={`absolute left-1/2 transform -translate-x-1/2 z-10 ${
						drawerOpen ? 'bottom-0' : 'sm:bottom-6 bottom-4'
					}`}
				>
					<button
						onClick={toggleDrawer}
						className='bg-transparent text-lukso rounded-full'
					>
						<FaChevronUp
							size={20}
							className={`transform transition-transform duration-300 ${
								drawerOpen ? 'rotate-180' : ''
							}`}
						/>
					</button>
				</div>
			</div>

			{/* <ViralToggle memeId={id} /> */}

			<div className='absolute bottom-16 p-2 right-4 flex flex-col items-center gap-4'>
				<div className='flex flex-col items-center'>
					<button onClick={handleLike}>
						{liked ? (
							<FaHeart size={30} color='red' />
						) : (
							<FiHeart size={30} color='white' />
						)}
					</button>
					<span className='text-xs text-slate-300 mt-2'>{likesCount}</span>
				</div>

				<div className='flex flex-col items-center'>
					<button className='text-white' onClick={handleShare}>
						<FiSend size={28} />
					</button>
					<span className='text-xs text-white mt-1'> Share</span>
				</div>

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
					className='bg-gradient-to-br max-lg:w-[96%] max-sm:h-[38%] from-lukso to-purple-500 backdrop-brightness- text-lg px-10 shadow-2xl text-white absolute h-[40%] w-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] my-auto rounded-xl flex flex-col gap-4 items-center justify-center'
				>
					<h1 className='text-2xl mb-1 font-bold text-left flex gap-2 items-center'>
						<FiZap size={28} /> Boost{' '}
					</h1>
					<p className='text-left w-full'>
						Enter the amount in $LYX you wan'na send to creator of this meme:
					</p>
					<input
						type='number'
						className='rounded-lg w-full bg-white text-black px-4 py-2 text-lg'
						placeholder='Amount in $LYX'
						onChange={(e) => setSupportAmount(e.target.value)}
						value={supportAmount}
					/>
					<div className='flex gap-6 justify-items-start w-full'>
						<button
							onClick={handleSupport}
							className='px-3 py-1 font-bold text-[16px] border-2 hover:bg-white hover:text-lukso rounded-lg'
						>
							Proceed
						</button>
						<button
							className='px-3 py-1 font-bold text-[16px] border-2 hover:bg-white hover:text-lukso rounded-lg'
							onClick={closeModal}
						>
							Cancel
						</button>
					</div>
				</Modal>

				<div onClick={openModal} className='flex flex-col items-center'>
					<button className='text-white rotate-[15deg] '>
						<FiZap size={28} />
					</button>
					<span className='text-xs text-white mt-1 mb-2'>{shares} Boost</span>
				</div>
			</div>
		</div>
	);
};

export default Reel;
