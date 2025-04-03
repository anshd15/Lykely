const User = require("../models/user");

const handleAuth = async (req, res) => {
  try {
    const { name, email, wallet } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ message: "User authenticated successfully", user });
    }
    if (!user) {
      const newUser = new User({ email, name, wallet });
      await newUser.save();
      res
        .status(201)
        .send({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};


const getUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email })
      .populate('createdMemes', 'title media likers createdAt')
      .populate({
        path: 'viralBets',
        select: 'title media bets createdAt',
        populate: {
          path: 'bets.viral.user',
          select: 'email'
        }
      })
      .populate({
        path: 'notViralBets',
        select: 'title media bets createdAt',
        populate: {
          path: 'bets.notViral.user',
          select: 'email'
        }
      });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const userData = {
      username: user.name,
      totalBetsWon: 0, 
      totalBetsLost: 0, 
      totalAmount: 0, 
      memesPosted: user.createdMemes ? user.createdMemes.length : 0,
      memes: user.createdMemes.map(meme => ({
        id: meme._id,
        title: meme.title,
        likes: meme.likers.length,
        date: meme.createdAt,
        media: meme.media.link,
        mediaType: meme.media.mediaType
      })),
      bets: []
    };

    user.viralBets.forEach(meme => {
      const userBet = meme.bets.viral.find(bet => bet.user.email === email);
      if (userBet) {
        userData.bets.push({
          id: meme._id,
          amount: userBet.amount,
          choice: "viral",
          status: "in-progress", 
          date: meme.createdAt,
          memeTitle: meme.title,
          media: meme.media.link,
          mediaType: meme.media.mediaType
        });
      }
    });

    user.notViralBets.forEach(meme => {
      const userBet = meme.bets.notViral.find(bet => bet.user.email === email);
      if (userBet) {
        userData.bets.push({
          id: meme._id,
          amount: userBet.amount,
          choice: "non-viral",
          status: "in-progress", 
          date: meme.createdAt,
          memeTitle: meme.title,
          media: meme.media.link,
          mediaType: meme.media.mediaType
        });
      }
    });

    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};



module.exports = { handleAuth, getUser };
