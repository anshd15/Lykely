import axios from 'axios';
import { toast } from 'react-hot-toast';
import ViralToggle from './ViralAction';
import ShareButton from './ShareComponent';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { FaHeart, FaChevronUp, FaShare } from 'react-icons/fa';

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
}) => {
	const [liked, setLiked] = useState(likedOrNot || false);
	const [likesCount, setLikesCount] = useState(likes);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const videoRef = useRef(null);
	const isActive = activeReel === id;

	const handleLike = async () => {
		if (liked) {
			toast.error('You have already liked this post');
			return;
		}

		try {
			await axios.post(
				import.meta.env.VITE_SERVER_URL + `/api/memes/like/${id}`,
				{
					email: localStorage.getItem('email'),
				}
			);
			setLikesCount((prev) => prev + 1);
			setLiked(true);
		} catch (error) {
			console.error('Error liking the post:', error);
			toast.error('Failed to like the post');
		}
	};

	const togglePlayPause = () => {
		if (!isActive) {
			setActiveReel(id);
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

	const handleSupport = async () => {};

	return (
		<div className='relative rounded-none flex flex-col h-[89vh] w-[30vw] max-sm:w-[100vw] bg-base-100'>
			<div className='flex flex-col h-full w-full items-center justify-center'>
				{type === 'video' ? (
					<video
						ref={videoRef}
						className='w-auto h-[100vh] max-w-full max-h-screen object-contain'
						src={media}
						autoPlay={isActive}
						loop
						playsInline
						onClick={togglePlayPause}
						muted={!isActive}
					/>
				) : (
					<img
						className='w-auto h-[100vh] max-w-full max-h-screen object-contain'
						src={media}
						alt='Meme'
					/>
				)}
			</div>

			<div
				className={`transition-all duration-300 ease-in-out ${
					drawerOpen ? 'h-[50%]' : 'h-[7%]'
				} bg-[#000000b5] text-white p-4 absolute bottom-0 left-0 w-full rounded-t-2xl`}
			>
				<h1
					className={`text-lg  font-semibold text-white primary-font mb-2 ${
						drawerOpen ? 'absolute top-2' : 'relative w-[90%] truncate'
					}`}
				>
					{title}
				</h1>

				<p
					className={`text-base text-gray-300 transition-all duration-300 ease-in-out ${
						drawerOpen
							? 'h-[80%]  w-[87%]  mt-7 overflow-auto'
							: 'h-0 overflow-hidden'
					}`}
				>
					{description}
				</p>

				<div className='absolute bottom-11 left-1/2 transform -translate-x-1/2'>
					<button
						onClick={toggleDrawer}
						className='bg-transparent text-[#eee31a] rounded-full'
					>
						<FaChevronUp
							size={20}
							className={`transform ${drawerOpen ? 'rotate-180' : ''}`}
						/>
					</button>
				</div>
			</div>

			<ViralToggle memeId={id} />

			<div className='absolute bottom-16 right-4 flex flex-col items-center gap-4'>
				<div className='flex flex-col items-center'>
					<button
						className={`p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700 ${
							liked ? 'text-[#FE005B]' : ''
						}`}
						onClick={handleLike}
					>
						<FaHeart size={16} />
					</button>
					<span className='text-xs text-white mt-2'>{likesCount} Likes</span>
				</div>

				<div className='flex flex-col items-center'>
					<ShareButton memeTitle={title} memeId={id} />
					<span className='text-xs text-white mt-2'> Share</span>
				</div>

				<div onClick={handleSupport} className='flex flex-col items-center'>
					<button className='p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700'>
						<FaHandHoldingHeart size={15} />
					</button>
					<span className='text-xs text-white mt-2'>{shares} Support</span>
				</div>
			</div>
		</div>
	);
};

export default Reel;
