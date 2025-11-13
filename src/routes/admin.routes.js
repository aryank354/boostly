const express = require('express');
const router = express.Router();
const { resetMonthlyCredits } = require('../controllers/admin.controller');
// We are NOT adding 'authenticate' middleware here
// This is a "trusted" admin endpoint

/**
 * @route   POST /api/admin/reset-credits
 * @desc    Reset monthly credits for all students
 * @access  Public (Admin)
 */
router.post('/reset-credits', resetMonthlyCredits);

module.exports = router;