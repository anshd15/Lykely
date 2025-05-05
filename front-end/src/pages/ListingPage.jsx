import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ListingPage = () => {
	// State variables for the form fields
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [videoLink, setVideoLink] = useState('');
	const [error, setError] = useState({
		title: null,
		description: null,
		videoLink: null,
	});
	const [loading, setLoading] = useState(false);
	const [mediaType, setMediaType] = useState('video');
	const navigate = useNavigate();

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title) {
			setError({ ...error, title: 'Title is required' });
			return;
		}
		if (!description) {
			setError({ ...error, description: 'Description is required' });
			return;
		}
		if (!videoLink) {
			setError({ ...error, videoLink: 'Media file is required' });
			return;
		}
		try {
			setLoading(true);
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + '/api/memes',
				{
					title,
					description,
					media: {
						link: videoLink,
						mediaType,
					},
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
			);
			toast.success('Meme uploaded successfully');
			navigate('/dashboard');
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload meme');
		} finally {
			setLoading(false);
			setTitle('');
			setDescription('');
			setVideoLink('');
		}
		// Add further handling logic for submitting the reel (e.g., saving it to the server, blockchain, etc.)
	};

	return (
		<div className='min-h-[calc(100vh-60px)] bg-gray-900 mt-[10vh] text-white py-8 px-4'>
			{/* Form to create a new reel */}
			<div className='max-w-3xl mx-auto primary-font bg-gray-800 rounded-lg shadow-lg p-8'>
				<h1 className='text-3xl primary-font text-[#FE005B] font-bold text-center mb-8'>
					Upload a New Meme
				</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Title Input */}
					<div>
						<label
							htmlFor='title'
							className='text-lg mb-2 font-semibold text-[#FE005B]'
						>
							Title
						</label>
						<input
							id='title'
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full secondary-font p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE005B]'
							placeholder='Enter the title for your meme'
							required
						/>
						{error.title && <p className='text-red-500'>{error.title}</p>}
					</div>

					{/* Description Input */}
					<div>
						<label
							htmlFor='description'
							className='text-lg mb-2 font-semibold text-[#FE005B]'
						>
							Description
						</label>
						<textarea
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='w-full secondary-font p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE005B]'
							placeholder='Enter a description for your meme'
							rows='6'
							required
							maxLength={500}
						/>
						{error.description && (
							<p className='text-red-500'>{error.description}</p>
						)}
					</div>

					{/* Video Link Input */}
					<div className='uploadcare-widget'>
						<label
							htmlFor='videoLink'
							className='text-lg mb-1 font-semibold items-baseline gap-1 text-[#FE005B] flex'
						>
							Upload Media
							<p className='text-white text-sm secondary-font'>(Image/Video)</p>
						</label>
						<p className='text-sm secondary-font text-gray-300 pb-3'>
							Note: Aspect ratio should be 9:16
						</p>
						<FileUploaderRegular
							sourceList='local, url, camera, gdrive'
							classNameUploader='uc-dark uc-red'
							pubkey='63c390ba99b5cdeed23a'
							multiple={false}
							accept='image/*, video/*'
							onFileUploadSuccess={(e) => {
								setMediaType(e.isImage ? 'image' : 'video');
								setVideoLink(e.cdnUrl);
							}}
						/>
						{error.videoLink && (
							<p className='text-red-500'>{error.videoLink}</p>
						)}
						{videoLink && (
							<div className='flex items-center space-x-2'>
								{mediaType === 'image' ? (
									<img
										src={videoLink}
										alt='Uploaded Image'
										className='w-1/3 rounded-xl my-2'
									/>
								) : (
									<video
										src={videoLink}
										controls
										className='w-1/3 rounded-xl my-2'
									></video>
								)}
							</div>
						)}
					</div>

					<div className='w-full'>
						<button
							type='submit'
							className='px-6 py-2 w-full text-center text-xl bg-[#FE005B] hover:bg-[#FE005B] rounded-lg text-black font-medium'
						>
							{loading ? (
								<img
									className='animate-spin mx-auto'
									width={30}
									src='https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png'
								/>
							) : (
								'Publish'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ListingPage;
