import React, { useEffect, useRef, useState } from 'react';
import {
	Share2,
	Copy,
	Mail,
	Send,
	MessageSquare,
	TwitterIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ShareButton = ({ memeTitle, memeId }) => {
	const [open, setOpen] = useState(false);
	const url = `https://localhost:3000/meme/${memeId}`;

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const shareOnWhatsApp = () => {
		const text = `Check out this meme on YourPlatform: ${memeTitle} - ${url}`;
		window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
	};

	const shareOnTelegram = () => {
		window.open(
			`https://t.me/share/url?url=${encodeURIComponent(
				url
			)}&text=${encodeURIComponent(memeTitle)}`,
			'_blank'
		);
	};

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				memeTitle
			)}&url=${encodeURIComponent(url)}`,
			'_blank'
		);
	};

	const shareViaEmail = () => {
		window.open(
			`mailto:?subject=${encodeURIComponent(
				memeTitle
			)}&body=${encodeURIComponent(url)}`,
			'_self'
		);
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				toast.success('Link copied to clipboard');
			})
			.catch((err) => console.error('Failed to copy: ', err));
	};

	const ShareArray = [
		{
			name: 'WhatsApp',
			icon: MessageSquare,
			color: 'green-400',
			action: shareOnWhatsApp,
		},
		{
			name: 'Telegram',
			icon: Send,
			color: 'blue-400',
			action: shareOnTelegram,
		},
		{
			name: 'Twitter',
			icon: TwitterIcon,
			color: 'blue-500',
			action: shareOnTwitter,
		},
		{ name: 'Email', icon: Mail, color: 'red-500', action: shareViaEmail },
		{ name: 'Copy', icon: Copy, color: 'gray-400', action: copyToClipboard },
	];

	return (
		<div className='relative inline-block'>
			<button
				onClick={() => setOpen(!open)}
				className='p-2 rounded-full border border-[#eee31a] text-white bg-slate-900 hover:bg-gray-700 flex place-items-center'
			>
				<Share2 className='w-4 h-4 -translate-x-[1px]' />
			</button>

			{open && (
				<div
					ref={dropdownRef}
					className='absolute right-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-lg p-3 grid grid-cols-3 gap-3 border border-[#FE005B]'
				>
					{ShareArray.map((share) => (
						<button
							key={share.name}
							onClick={share.action}
							className={`flex flex-col items-center gap-1 text-sm text-${share.color}`}
						>
							<share.icon className='w-5 h-5' />
							<span>{share.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ShareButton;
