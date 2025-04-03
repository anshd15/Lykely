const express = require('express');
const { handleAuth, getUser } = require('../controllers/user');

const router = express.Router();

router.post('/auth', handleAuth);
router.get('/:email', getUser);
module.exports = router;
