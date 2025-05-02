const Bet = require('../models/bets');
const Meme = require('../models/meme');
const User = require('../models/user');
const { tranferLYX } = require('../utils/transaction');

const createAmeme = async (req, res) => {
	try {
		const { title, media, description } = req.body;
		const userId = req.user.id;

		let meme = new Meme({
			title,
			description,
			media,
			creator: userId,
		});

		const user = await User.findByIdAndUpdate(userId, {
			$push: { createdMemes: meme._id },
		});

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		await meme.save();
		await user.save();

		res.status(201).send({ message: 'Meme uploaded successfully', meme });
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const getMemes = async (_req, res) => {
	try {
		const memes = await Meme.find().populate('creator');
		res.status(200).send(memes);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const getAMeme = async (req, res) => {
	try {
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId).populate('creator').exec();
		res.status(200).send(meme);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const memeAction = async (req, res) => {
	try {
		const { memeId, amount } = req.params;
		const { action, email } = req.body;
		const u = await User.findOne({ email });
		if (!u) {
			return res.status(404).send({ message: 'User not founds' });
		}
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		if (!['viral', 'notViral'].includes(action)) {
			return res.status(400).send({ message: 'Invalid action' });
		}
		meme.bets[action].push({ user: u._id, amount });
		u[`${action}Bets`].push(memeId);
		await u.save();
		await meme.save();
		res.status(200).send({ message: 'Action successful', meme });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const likeMeme = async (req, res) => {
	try {
		const { memeId } = req.params;

		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}
		const userId = user._id;

		if (meme.likers.includes(userId)) {
			meme.likers = meme.likers.filter((liker) => !liker.equals(userId));
			user.likedMemes = user.likedMemes.filter(
				(likedMeme) => !likedMeme.equals(memeId)
			);
			await user.save();
			await meme.save();

			return res.status(200).send({ message: 'Meme liked successfully', meme });
		}
		meme.likers.push(userId);
		user.likedMemes.push(memeId);
		await user.save();
		await meme.save();
		res.status(200).send({ message: 'Meme liked successfully', meme });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const betMeme = async (req, res) => {
	try {
		const { amount, betType } = req.body;

		if (!['viral', 'notViral'].includes(betType)) {
			return res.status(400).send({ message: 'Invalid bet type' });
		}

		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		const { memeId } = req.params;
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		const now = new Date();
		const threeDays = new Date(
			meme.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
		);
		if (now.getTime() > threeDays) {
			return res.status(400).json({
				message: 'Betting can be placed only upto 3 days from upload date.',
			});
		}

		if (meme.result == 'viral' || meme.result == 'not_viral') {
			return res.status(400).json({
				message: 'Result is already declared for this meme.',
			});
		}

		if (!meme.bets) {
			// Ensure bets structure exists
			meme.bets = { viral: [], notViral: [] };
		}

		// Check if user has already placed a bet
		const hasBetOnMeme = await Bet.findOne({
			user: user._id,
			meme: meme._id,
		});

		if (hasBetOnMeme) {
			return res
				.status(400)
				.send({ message: 'You have already placed a bet on this meme' });
		}

		const newBet = await Bet.create({
			user: user._id,
			meme: meme._id,
			betAmount: amount,
			betType,
		});

		// Place the bet
		meme.bets[betType].push(newBet._id);
		user.bets.push(newBet._id);

		await user.save();
		await meme.save();

		return res.status(200).send({ message: 'Bet placed successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const getUserBet = async (req, res) => {
	try {
		const { memeId, userId } = req.params;

		let bet = await Bet.findOne({
			user: req.user.id || userId,
			meme: memeId,
		});

		if (!bet) {
			return res.status(404).send({ message: 'Bet not found' });
		}

		return res.status(200).json({ placedBet: bet.betType });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const registerView = async (req, res) => {
	try {
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		const totalUserBase = await User.countDocuments({});

		meme.views =
			meme.views + 1 > totalUserBase ? totalUserBase : meme.views + 1;
		await meme.save();

		return res.status(200).send({ message: 'View registered successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const calcMemeResults = async (req, res) => {
	try {
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).json({ message: 'Meme not found' });
		}
		const now = new Date();
		const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		if (meme.createdAt > sevenDaysAgo) {
			return res.status(400).json({
				message: 'Result can be declared only after 7 days from upload date',
			});
		}

		if (meme.result !== 'pending') {
			return res.status(400).json({
				message: 'Result is already declared for this meme',
			});
		}

		const totalUserBase = await User.countDocuments({});
		const viewCount = meme.views;
		const likeCout = meme.likers.length;
		const supportersCount = meme.supporters.length;

		// Viraility Check Fromula
		const isViral =
			viewCount > 0.5 * totalUserBase &&
			likeCout > 0.15 * viewCount &&
			supportersCount > 0.03 * viewCount;

		isViral ? (meme.result = 'viral') : (meme.result = 'not_viral');

		await meme.save();

		res.status(200).send({
			message: 'Meme results calculated successfully',
			meme,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const distributeRewards = async (req, res) => {
	try {
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId).populate([
			{ path: 'bets.viral', populate: { path: 'user' } },
			{ path: 'bets.notViral', populate: { path: 'user' } },
			{ path: 'creator' },
		]);
		if (!meme) {
			return res.status(404).json({ message: 'Meme not found' });
		}
		if (meme.result == 'pending') {
			return res.status(400).json({
				message: 'Result is not declared yet',
			});
		}

		if (meme.rewardsDistributed) {
			return res.status(400).json({
				message: 'Rewards already distributed',
			});
		}

		const RESULT = meme.result === 'viral' ? 'viral' : 'notViral';

		let loosingTotalBetAmount = meme.bets[
			meme.result === 'viral' ? 'notViral' : 'viral'
		].reduce((acc, { betAmount }) => acc + betAmount, 0);

		const winningTotalBetAmount = meme.bets[RESULT].reduce(
			(acc, { betAmount }) => acc + betAmount,
			0
		);

		// 10% cut as platform fee
		const platformFee = loosingTotalBetAmount * 0.1;
		loosingTotalBetAmount = loosingTotalBetAmount - platformFee;

		// Send 20% of platform fee to meme creator
		if (meme.result == 'viral') {
			await tranferLYX(meme.creator?.walletAddress, platformFee * 0.3);
			console.log(
				`Reward of ${platformFee * 0.3} LYX sent to meme creator ${
					meme.creator?.walletAddress
				}`
			);
		}

		meme.bets[RESULT].forEach(async (bet) => {
			if (bet.betType !== RESULT) return;
			const reward =
				loosingTotalBetAmount * (bet.betAmount / winningTotalBetAmount);
			await tranferLYX(bet.user?.walletAddress, reward + bet.betAmount);
			console.log(
				`Reward of ${reward + bet.betAmount} LYX sent to ${
					bet.user?.walletAddress
				}`
			);
		});

		meme.rewardsDistributed = true;
		await meme.save();

		return res.status(200).json({ meme });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const supportCreator = async (req, res) => {
	try {
		const { memeId } = req.params;
		const { amount } = req.body;
		const userId = req.user.id;

		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		meme.supporters.push({ user: user._id, amount });
		await meme.save();

		res.status(200).send({ message: 'Support registered successfully', meme });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

module.exports = {
	createAmeme,
	getMemes,
	getAMeme,
	memeAction,
	likeMeme,
	betMeme,
	getUserBet,
	registerView,
	calcMemeResults,
	supportCreator,
	distributeRewards,
};
