const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		walletAddress: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
    nonce: {
      type: String,
      default: null,
    },
		createdMemes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Meme',
			default: [],
		},
		likedMemes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Meme',
			default: [],
		},
		bets: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Bet',
			default: [],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
