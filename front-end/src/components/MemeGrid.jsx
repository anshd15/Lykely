import axios from 'axios';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const MemesGrid = ({ memes }) => {
	if (!memes.length) {
		return <div className='text-white text-center'>No memes found</div>;
	}

	const handleCalcResults = async (memeId) => {
		try {
			toast.promise(
				axios.get(
					import.meta.env.VITE_SERVER_URL + `/api/memes/calc-results/${memeId}`
				),
				{
					loading: 'Calculating results...',
					success: () => {
						toast.success('Results calculated!');
						window.location.reload();
					},
					error: 'Failed to calculate results',
				}
			);
			toast.success(res.data.message);
		} catch (error) {
			console.error(error);
		}
	};

	const handleRewardsDistribution = async (memeId) => {
		try {
			toast.promise(
				axios.get(
					import.meta.env.VITE_SERVER_URL +
						`/api/memes/distribute-rewards/${memeId}`
				),
				{
					loading: 'Distributing rewards...',
					success: () => {
						toast.success('Rewards distributed!');
						window.location.reload();
					},
					error: 'Failed to distribute rewards',
				}
			);
			toast.success(res.data.message);
		} catch (error) {
			console.error(error);
		}
	};

	const formatDate = (date) => {
		const d = new Date(date);
		return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
	};
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{memes.map((meme) => (
				<div key={meme._id} className='bg-gray-800 rounded-lg overflow-hidden'>
					<div className='aspect-video relative p-2'>
						<Link to={`/reel/${meme._id}`}>
							{meme.media.mediaType == 'image' ? (
								<img
									src={meme.media.link}
									alt={meme.title}
									className='object-cover w-full h-full rounded-lg'
								/>
							) : (
								<video
									src={meme.media.link}
									alt={meme.title}
									className='object-cover w-full h-full rounded-lg'
									autoPlay
									loop
									muted
								/>
							)}
						</Link>
					</div>
					<div className='p-3'>
						<h3 className='text-white text-lg font-semibold mb-3 truncate'>
							{meme.title}
						</h3>
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-2'>
								<Heart className='w-4 h-4 text-red-500' />
								<span className='text-gray-400'>{meme.likers.length}</span>
							</div>
							<span className='text-gray-400'>
								{formatDate(meme.createdAt)}
							</span>
						</div>
						<div className='flex items-end justify-between gap-4 mt-2'>
							{meme.result === 'pending' ? (
								<button
									onClick={() => handleCalcResults(meme._id)}
									className='bg-[#FE005B] text-black px-4 py-2 text-[14px] font-bold rounded-lg mt-2'
								>
									Calculate Results
								</button>
							) : (
								<p>
									Result :{' '}
									<span
										className={`capitalize ${
											meme.result === 'viral' ? 'text-green-500' : 'text-lukso'
										} `}
									>
										{meme.result === 'viral' ? 'Viral' : 'Not Viral'}
									</span>
								</p>
							)}
							{meme.rewardsDistributed ? (
								<p className='text-green-500'>Rewards Distributed</p>
							) : (
								<button
									onClick={() => handleRewardsDistribution(meme._id)}
									className='bg-[#FE005B] text-black px-4 py-2 text-[14px] font-bold rounded-lg mt-2'
								>
									Distribute Rewards
								</button>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
