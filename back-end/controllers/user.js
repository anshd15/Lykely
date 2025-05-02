const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const User = require('../models/user');
const { getUPdata } = require('../utils/up');
const UniversalProfileContract = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');

const handleAuth = async (req, res) => {
	try {
		const { message, signature, address } = req.body;

		if (!message || !signature || !address) {
			return res.status(400).json({ error: 'Missing required parameters' });
		}

		const provider = new ethers.JsonRpcProvider(
			'https://rpc.mainnet.lukso.network'
		);

		const universalProfileContract = new ethers.Contract(
			address,
			UniversalProfileContract.abi,
			provider
		);

		const hashedMessage = ethers.hashMessage(message);
		const isValidSignature = await universalProfileContract.isValidSignature(
			hashedMessage,
			signature
		);

		if (isValidSignature !== '0x1626ba7e') {
			return res.status(401).json({ error: 'Invalid signature' });
		}

		let user = await User.findOne({ walletAddress: address.toLowerCase() });

		if (!user) {
			const upData = await getUPdata(address);
			if (!upData) {
				return res.status(404).json({ error: 'Unable to get UP data' });
			}
			user = new User({
				username: `${upData.value.LSP3Profile.name}#${address.slice(2, 6)}`,
				walletAddress: address.toLowerCase(),
				nonce: crypto.randomBytes(16).toString('hex'),
			});
			await user.save();
		} else {
			user.nonce = crypto.randomBytes(16).toString('hex');
			await user.save();
		}

		const payload = {
			user: {
				id: user.id,
				address: user.address,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: '7d' },
			(err, token) => {
				if (err) throw err;
				res.json({ message: 'Verifed successfully', token, result: user });
			}
		);
	} catch (error) {
		console.error('Auth error:', error);
		return res.status(500).json({ error: 'Server error' });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
			.select('-nonce')
			.populate('createdMemes')
			.populate('likedMemes');
		// .populate('bets');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { handleAuth, getUser };
