const { Schema, model } = require('mongoose');

const betSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		meme: {
			type: Schema.Types.ObjectId,
			ref: 'Meme',
		},
		betAmount: {
			type: Number,
			required: true,
		},
		betType: {
			type: String,
			required: true,
			enum: ['viral', 'notViral'],
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
