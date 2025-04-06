const express = require('express');
const { handleAuth, getUser } = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/auth', handleAuth);
router.get('/get', verifyToken, getUser);
module.exports = router;
