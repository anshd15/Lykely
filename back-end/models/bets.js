const { Schema, model } = require('mongoose');

const betSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		memeId: {
			type: String,
			required: true,
		},
		betAmount: {
			type: Number,
			required: true,
		},
		isViralBet: {
			type: Boolean,
			required: true,
		},
		result: {
			type: String,
			enum: ['won', 'lost', 'pending'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Bet = model('Bet', betSchema);
module.exports = Bet;
