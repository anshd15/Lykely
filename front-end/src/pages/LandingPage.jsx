import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles, Flame } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='w-full overflow-x-hidden bg-gradient-to-br from-[#2a0845] via-[#6441a5] to-lukso text-white relative'>
			<div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-lukso opacity-30 rounded-full blur-3xl animate-pulse z-0' />
			<div className='absolute top-[500px] left-[300px] w-[400px] h-[200px] bg-[#c437c1] opacity-20 rounded-full blur-[120px] animate-pulse z-0' />

			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.6 }}
				style={{
					border: '1px solid rgba(255, 255, 255, 0.15)',
					boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)',
				}}
				className='z-50 fixed top-6 mx-auto left-0 right-0 w-[90vw] max-w-[600px]
    px-4 py-2 md:px-6 md:py-3 rounded-full
    bg-white/10 backdrop-blur-xl
    flex items-center justify-between text-sm text-white font-medium'
			>
				<a
					href='#'
					className='text-lg sm:text-2xl flex items-end font-extrabold bg-gradient-to-r from-white via-lukso to-purple-500 bg-clip-text text-transparent drop-shadow-sm'
				>
					<img src='/logo.png' className='w-[40px] h-[35px] mr-2' />
					<span className='sm:mt-[2px] mt-[5px]'>Lykley</span>
				</a>

				<nav className='hidden sm:flex space-x-4 sm:space-x-6 text-white/80'>
					<a
						href='#features'
						className='hover:text-white transition-all duration-300'
					>
						Features
					</a>
					<a
						href='#how-it-works'
						className='hover:text-white transition-all duration-300'
					>
						How it Works
					</a>
					<a
						href='#join'
						className='hover:text-white transition-all duration-300'
					>
						Get Started
					</a>
				</nav>

				<div className='sm:hidden flex items-center'>
					<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? (
							<X className='w-6 h-6 text-white' />
						) : (
							<Menu className='w-6 h-6 text-white' />
						)}
					</button>
				</div>

				{/* Dropdown Menu */}
				{isMenuOpen && (
					<div className='absolute top-[60px] right-4 w-48 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white space-y-3 shadow-xl z-50 border border-white/20'>
						<a
							href='#features'
							onClick={() => setIsMenuOpen(false)}
							className='block hover:text-white/90'
						>
							Features
						</a>
						<a
							href='#how-it-works'
							onClick={() => setIsMenuOpen(false)}
							className='block hover:text-white/90'
						>
							How it Works
						</a>
						<a
							href='#join'
							onClick={() => setIsMenuOpen(false)}
							className='block hover:text-white/90'
						>
							Join Beta
						</a>
					</div>
				)}
			</motion.header>

			{/* Hero Section */}
			<section className='w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-20 pt-40 pb-24 text-center'>
				<h1 className='text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-lukso to-purple-500 drop-shadow-lg leading-tight'>
					Predict Meme Virality.
				</h1>
				<p className='text-lg md:text-xl text-white/80 mt-6 max-w-2xl'>
					Vote with your vibes. Earn $LYK if your prediction hits. Join the Web3
					meme movement powered by Lukso.
				</p>
				<div className='mt-10'>
					<Link to='/home'>
						<Button variant='primary' icon={Flame}>
							Get Started
						</Button>
					</Link>
				</div>
			</section>

			{/* Trending Memes */}
			{/* <section
        id="features"
        className="w-full flex flex-col items-center px-6 md:px-20 py-24 bg-white/5 backdrop-blur-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          🔥 Trending Memes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-screen-xl w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl bg-white/10 backdrop-blur-md hover:scale-[1.03] transition duration-300 shadow-lg flex flex-col items-center"
            >
              <div className="w-full aspect-video bg-gradient-to-br from-purple-500 via-lukso to-yellow-300 rounded-lg mb-4 animate-gradient-x" />
              <p className="text-white/90 font-medium mb-3">Meme #{i}</p>
              <Button variant="secondary" className="w-full">
                Predict 🔮
              </Button>
            </div>
          ))}
        </div>
      </section> */}

			{/* Features Section - Glass Cards + Mobile PNG */}
			<section
				id='features'
				className='w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-24 bg-black text-white'
			>
				{/* Feature Cards */}
				<div className='flex flex-col gap-8 max-w-xl w-full z-10'>
					{[
						[
							'Real-Time Predictions',
							'Predict meme virality in real-time with intuitive UI.',
						],
						[
							'$LYK Rewards',
							'Earn crypto for accurate predictions backed by Lukso blockchain.',
						],
						[
							'Social Sentiment',
							'Engage with community vibes and collective meme power.',
						],
					].map(([title, desc], i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: i * 0.2 }}
							viewport={{ once: true }}
							className='p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_30px_rgba(255,255,255,0.05)]
          hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300'
						>
							<h3 className='text-2xl font-bold mb-2 bg-gradient-to-r from-lukso to-purple-300 bg-clip-text text-transparent '>
								{title}
							</h3>
							<p className='text-white/30'>{desc}</p>
						</motion.div>
					))}
				</div>

				<div className='mt-12 md:mt-0 md:ml-20  flex justify-center z-10'>
					<img
						src='/mockup.png'
						alt='Mobile Mockup'
						className=' sm:h-[90vh] h-[40vh] rounded-2xl shadow-xl'
					/>
				</div>

				<div className='absolute top-[30%] left-[50%] w-[500px] h-[300px] bg-purple-600 opacity-40 rounded-full blur-[120px] z-0' />
			</section>

			{/* How It Works */}
			<section
				id='how-it-works'
				className='w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-24  bg-cover bg-center bg-no-repeat'
				// style={{ backgroundImage: "url('/ab.jpg')" }}
			>
				<div className='absolute bg-black opacity-80 backdrop-blur-lg z-10 min-h-screen overflow-hidden w-full'>
					{' '}
					<img src='/ab.jpg' className='h-screen w-screen blur-sm' />{' '}
				</div>
				<div className='absolute bg-black opacity-50 backdrop-blur-lg z-10 min-h-screen w-full'>
					{' '}
				</div>
				<h2 className='text-3xl md:text-4xl font-bold z-20 mb-16 text-center'>
					✨ How It Works
				</h2>
				<div className='grid grid-cols-1 z-20 md:grid-cols-3 gap-12 max-w-screen-xl w-full text-center'>
					{[
						['Scroll & Discover', 'Explore memes trending across the web.'],
						['Predict Virality', 'Vote on whether it’ll pop by end of month.'],
						['Earn Rewards', 'Earn $LYK for your meme market instincts.'],
					].map(([title, desc], i) => (
						<div key={i} className='flex flex-col items-center space-y-4 px-4'>
							<Sparkles className='w-10 h-10 text-lukso' />
							<h4 className='text-xl font-semibold'>{title}</h4>
							<p className='text-white/80 max-w-xs'>{desc}</p>
						</div>
					))}
				</div>
			</section>

			<section
				id='join'
				className='w-full min-h-[60vh] flex flex-col justify-center items-center px-6 md:px-20 py-24 text-center bg-black backdrop-blur-md'
			>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Be Part of the Memevolution
				</h2>
				<p className='text-white/70 mb-8 max-w-2xl'>
					The internet’s future runs on memes. Your prediction = your power.
				</p>
				<Link to='/home'>
					<Button variant='primary'>Get Started</Button>
				</Link>
			</section>

			{/* Footer */}
			<footer className='pb-6 text-center bg-black text-white/40 text-sm'>
				© 2025 Lykley • Built with 💜 on Lukso
			</footer>
		</div>
	);
}
