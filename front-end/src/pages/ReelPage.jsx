import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Reel from '../components/Reel';

const ReelPage = () => {
	const { id } = useParams();
	const [reel, setReel] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReel = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/api/memes/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setReel(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchReel();
	}, [id]);

	if (loading) {
		return <div className='text-white text-center mt-20'>Loading Reel...</div>;
	}

	if (!reel) {
		return <div className='text-white text-center mt-20'>Reel Not Found</div>;
	}

	return (
		<div className='h-screen w-screen flex justify-center items-center bg-black'>
			<Reel
				media={reel.media.link}
				type={reel.media.mediaType}
				title={reel.title}
				description={reel.description}
				likes={reel.likers.length}
				views={reel.views}
				shares={reel.shares}
				likedOrNot={reel.likers.includes(localStorage.getItem('userId'))}
				id={reel._id}
				activeReel={0}
				setActiveReel={() => {}}
				creator_wallet={reel.creator.wallet}
			/>
		</div>
	);
};

export default ReelPage;
