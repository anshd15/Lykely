const express = require('express');
const {
	getMemes,
	createAmeme,
	getAMeme,
	memeAction,
	likeMeme,
	betMeme,
	getUserBet,
	registerView,
	calcMemeResults,
	supportCreator,
	distributeRewards,
} = require('../controllers/meme');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', getMemes);
router.post('/', verifyToken, createAmeme);
router.get('/:memeId', verifyToken, getAMeme);
router.post('/action/:memeId', verifyToken, memeAction);
router.post('/like/:memeId', verifyToken, likeMeme);
router.post('/place-bet/:memeId', verifyToken, betMeme);
router.get('/register-view/:memeId', registerView);
router.get('/:memeId/user-bet/:userId', verifyToken, getUserBet);
router.post('/support/:memeId', verifyToken, supportCreator);
router.get('/calc-results/:memeId', calcMemeResults);
router.get('/distribute-rewards/:memeId', distributeRewards);
module.exports = router;
