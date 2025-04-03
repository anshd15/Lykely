const { Schema, model } = require("mongoose");

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
          enum: ["image", "video"],
        },
      },
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    bets: {
      type: {
        viral: [
          {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            amount: Number,
          },
        ],
        notViral: [
          {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            amount: Number,
          },
        ],
      },
    },
  },
  { timestamps: true }
);

const Meme = model("Meme", memeSchema);
module.exports = Meme;
