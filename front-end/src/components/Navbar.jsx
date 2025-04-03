import { Link } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa6';
import { FaBarsStaggered } from 'react-icons/fa6';
import { User } from 'lucide-react';

const Navbar = () => {
	return (
		<nav className='px-5 primary-font max-md:px-1 flex backdrop-blur-lg items-center h-[10vh] justify-between fixed top-0 left-0 right-0 z-10 border-b-2 border-[#FE005B]'>
			<Link to={'/'} className='flex items-end gap-2 p-2'>
				<img width={54} src='/logo.png' alt='logo' />
				<h1 className='text-4xl text-[#FE005B]'>Lykely</h1>
			</Link>
			<div className='hidden md:flex items-center max-md:gap-2 gap-4'>
				<Link
					to={'/list'}
					className='text-[#FE005B] max-md:text-sm max-md:text-px-1 hover:bg-[#FE005B] hover:border-none hover:text-black flex items-baseline gap-2 max-md:gap-1 text-lg border-2 border-[#FE005B] rounded-lg py-1.5 px-4'
				>
					<FaUpload />
					Upload
				</Link>
				<Link
					to={'/dashboard'}
					className='text-[#FE005B] max-md:text-sm max-md:text-px-1 hover:bg-[#FE005B] hover:border-transparent hover:text-black flex items-baseline gap-2 max-md:gap-1 text-lg border-2 border-[#FE005B] rounded-lg py-1.5 px-4'
				>
					<User />
				</Link>
			</div>

			<div className='dropdown md:hidden dropdown-bottom absolute right-[20px]'>
				<label tabIndex={0} className='btn btn-ghost'>
					<FaBarsStaggered size={24} className='text-[#FE005B]' />
				</label>
				<div
					tabIndex={0}
					className='dropdown-content menu p-2 shadow bg-base-100 flex flex-col gap-3 items-center rounded-box w-52 absolute top-[20px] right-[0px]'
				>
					<div className='flex justify-center w-full'>
						<Link
							to={'/list'}
							className='text-[#FE005B] hover:bg-slate-100   hover:border-none hover:text-black flex items-baseline justify-center w-full gap-2 max-md:gap-1 text-lg border-2 border-[#FE005B] rounded-lg py-1.5 px-4'
						>
							<FaUpload />
							Upload
						</Link>
					</div>
					<div className='flex justify-center w-full'></div>
					<div className='flex justify-center w-full'>
						<Link
							to={'/dashboard'}
							className='text-[#FE005B] hover:bg-slate-100   hover:border-none hover:text-black flex items-baseline justify-center w-full gap-2 max-md:gap-1 text-lg border-2 border-[#FE005B] rounded-lg py-1.5 px-4'
						>
							<User />
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
