import React from 'react';
import Player from '../components/Player';

const HomePage = () => {
	return (
		<div className='h-[90vh] mt-[10vh] w-screen relative bg-black'>
			<div className='h-[90vh]  relative hide-scrollbar overflow-y-hidden flex justify-center bottom-0  text-[#FE005B] '>
				<Player />
			</div>
		</div>
	);
};

export default HomePage;
