import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa6';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';

const loginSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
	email: z.string().email({ message: 'Invalid email address' }),
});

const AuthDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [copied, setCopied] = React.useState(false);
	const walletAddress = location.state?.walletAddress;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			if (!walletAddress) {
				toast.error('Wallet address is missing!');
				return;
			}

			const response = await axios.post(
				import.meta.env.VITE_SERVER_URL + '/api/users/auth',
				{
					...data,
					wallet: walletAddress,
				}
			);
			localStorage.setItem('email', data.email);
			localStorage.setItem('name', data.name);
			localStorage.setItem('wallet', walletAddress);
			localStorage.setItem('userId', response.data.user._id);
			toast.success(response.data.message);
			navigate('/home');
		} catch (error) {
			console.error('Authentication error:', error);
			toast.error(error.response?.data?.message || 'Authentication failed!');
		}
	};

	const copyToClipboard = () => {
		if (walletAddress) {
			navigator.clipboard.writeText(walletAddress);
			toast.success('Wallet address copied to clipboard');
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	if (!walletAddress) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black'>
				<p
					className='text-white hover:underline'
					onClick={() => {
						navigate('/home');
					}}
				>
					No wallet address found. Please go back.
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4'>
			<div className='w-full max-w-md bg-gray-800 shadow-2xl rounded-lg border border-gray-700 overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-extrabold text-center mb-8 text-white'>
						Complete your profile
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						{/* Name input remains the same */}
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-300 mb-2'
							>
								Name
							</label>
							<div className='relative'>
								<input
									id='name'
									{...register('name')}
									placeholder='Enter your name'
									className={`
                    w-full px-4 py-3 
                    bg-gray-700 text-white 
                    rounded-lg 
                    border-2 
                    focus:outline-none 
                    transition-all duration-300
                    ${
											errors.name
												? 'border-red-500 focus:ring-2 focus:ring-red-500'
												: 'border-transparent focus:border-[#FE005B] focus:ring-2 focus:ring-[#FE005B]/50'
										}
                  `}
								/>
								{errors.name && (
									<div className='absolute inset-y-0 right-0 pr-3 flex items-center text-red-500'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
								)}
							</div>
							{errors.name && (
								<p className='text-red-500 text-xs mt-1 pl-1'>
									{errors.name.message}
								</p>
							)}
						</div>

						{/* Email input remains the same */}
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-300 mb-2'
							>
								Email
							</label>
							<div className='relative'>
								<input
									id='email'
									type='email'
									{...register('email')}
									placeholder='Enter your email'
									className={`
                    w-full px-4 py-3 
                    bg-gray-700 text-white 
                    rounded-lg 
                    border-2 
                    focus:outline-none 
                    transition-all duration-300
                    ${
											errors.email
												? 'border-red-500 focus:ring-2 focus:ring-red-500'
												: 'border-transparent focus:border-[#FE005B] focus:ring-2 focus:ring-[#FE005B]/50'
										}
                  `}
								/>
								{errors.email && (
									<div className='absolute inset-y-0 right-0 pr-3 flex items-center text-red-500'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
								)}
							</div>
							{errors.email && (
								<p className='text-red-500 text-xs mt-1 pl-1'>
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Wallet address input remains the same */}
						<div>
							<label
								htmlFor='wallet'
								className='block text-sm font-medium text-gray-300 mb-2'
							>
								Wallet Address
							</label>
							<div className='relative'>
								<input
									id='wallet'
									value={walletAddress}
									readOnly
									className='w-full px-4 py-3 pr-10 bg-gray-700 text-white rounded-lg border-2 border-transparent focus:outline-none focus:border-[#FE005B] focus:ring-2 focus:ring-[#FE005B]/50'
								/>
								<button
									type='button'
									onClick={copyToClipboard}
									className='absolute inset-y-0 right-0 px-3 flex items-center text-[#FE005B] hover:text-[#FE005B]'
								>
									{copied ? <IoCheckmarkDoneCircleSharp /> : <FaRegCopy />}
								</button>
							</div>
						</div>

						<button
							type='submit'
							disabled={isSubmitting}
							className={`
    w-full py-3 px-4 
    rounded-lg 
    text-white 
    font-bold 
    transition-all duration-300 
    focus:outline-none 
    mt-4  
    ${
			isSubmitting
				? 'bg-gray-600 cursor-not-allowed'
				: 'bg-[#FE005B] hover:bg-[#FE005B] hover:shadow-lg focus:ring-2 focus:ring-[#FE005B] focus:ring-opacity-50'
		}
  `}
						>
							{isSubmitting ? 'Authenticating...' : 'Submit'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AuthDetails;
