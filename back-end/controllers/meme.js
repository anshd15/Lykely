const Meme = require('../models/meme');
const User = require('../models/user');

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
			return res
				.status(400)
				.send({ message: 'You have already liked this meme' });
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
		const { email, amount, betType } = req.body;

		if (!['viral', 'notViral'].includes(betType)) {
			return res.status(400).send({ message: 'Invalid bet type' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		const { memeId } = req.params;
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}

		// Ensure bets structure exists
		if (!meme.bets) {
			meme.bets = { viral: [], notViral: [] };
		}

		// Check if user has already placed a bet
		const hasBetOnViral = meme.bets.viral.some((bet) =>
			bet.user.equals(user._id)
		);
		const hasBetOnNotViral = meme.bets.notViral.some((bet) =>
			bet.user.equals(user._id)
		);

		if (hasBetOnViral || hasBetOnNotViral) {
			return res
				.status(400)
				.send({ message: 'You have already placed a bet on this meme' });
		}

		// Place the bet
		meme.bets[betType].push({ user: user._id, amount });
		user[`${betType}Bets`] = user[`${betType}Bets`] || [];
		user[`${betType}Bets`].push(memeId);

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

		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}

		const hasBetOnViral = meme.bets?.viral.some((bet) =>
			bet.user.equals(userId)
		);
		const hasBetOnNotViral = meme.bets?.notViral.some((bet) =>
			bet.user.equals(userId)
		);

		let placedBet = null;
		if (hasBetOnViral) placedBet = 'viral';
		if (hasBetOnNotViral) placedBet = 'notViral';

		return res.status(200).send({ placedBet });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
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
};
