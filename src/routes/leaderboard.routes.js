const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboard.controller');
const { authenticate } = require('../middleware/auth.middleware');

/**
 * @route   GET /api/leaderboard
 * @desc    Get student leaderboard
 * @access  Protected
 */
router.get('/', authenticate, getLeaderboard);

module.exports = router;