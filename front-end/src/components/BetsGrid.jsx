const getStatusColor = (status) => {
	switch (status) {
		case 'won':
			return 'bg-green-500 text-white';
		case 'lost':
			return 'bg-red-500 text-white';
		case 'in-progress':
			return 'bg-[#FE005B] text-black';
		default:
			return 'bg-gray-500';
	}
};
export const BetsGrid = ({ bets }) => {
	if (!bets.length) {
		return <div className='text-white text-center'>No bets found</div>;
	}
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{bets.map((bet) => (
				<div key={bet.id} className='bg-gray-800 rounded-lg overflow-hidden'>
					<div className='aspect-video relative p-2'>
						{bet.mediaType === 'image' ? (
							<img
								src={bet.media}
								alt={bet.title}
								className='object-cover w-full h-full rounded-lg'
							/>
						) : (
							<video
								src={bet.media}
								alt={bet.title}
								className='object-cover w-full h-full rounded-lg'
								autoPlay
								loop
								muted
							/>
						)}
						<span
							className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
								bet.status
							)}`}
						>
							{bet.status}
						</span>
					</div>
					<div className='p-4'>
						<h3 className='text-white text-lg font-semibold mb-3 truncate'>
							{bet.memeTitle}
						</h3>
						<div className='grid grid-cols-2 gap-2 text-sm'>
							<span className='text-gray-400'>Amount:</span>
							<span className='text-[#FE005B] text-right'>${bet.amount}</span>
							<span className='text-gray-400'>Choice:</span>
							<span className='text-white text-right capitalize'>
								{bet.choice}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
