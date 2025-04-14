const { Schema, model } = require('mongoose');

const memeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		media: {
			type: {
				link: String,
				mediaType: {
					type: String,
					enum: ['image', 'video'],
				},
			},
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		likers: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
		},
		views: {
			type: Number,
			default: 0,
		},
		bets: {
			viral: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Bet',
				},
			],
			notViral: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Bet',
				},
			],
		},
		supporters: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
				amount: {
					type: Number,
				},
			},
		],
	},
	{ timestamps: true }
);

const Meme = model('Meme', memeSchema);
module.exports = Meme;
