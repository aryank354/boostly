const { runQuery } = require('../db/database');

/**
 * Reset monthly credits for all students
 * POST /api/admin/reset-credits
 * This simulates a monthly cron job
 */
const resetMonthlyCredits = async (req, res) => {
    try {
        // Carry forward up to 50 unused credits
        // new_balance = 100 (base) + LEAST(50, current_sending_balance)
        // SQLite doesn't have LEAST(), so we use a CASE statement.
        const query = `
            UPDATE students
            SET 
                sending_balance = 100 + (CASE WHEN sending_balance < 50 THEN sending_balance ELSE 50 END),
                monthly_sending_limit_used = 0;
        `;

        const result = await runQuery(query);

        res.status(200).json({
            success: true,
            message: `Monthly credits reset successfully for ${result.changes} students.`,
            students_affected: result.changes
        });

    } catch (error) {
        console.error('Error resetting monthly credits:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset monthly credits'
        });
    }
};

module.exports = {
    resetMonthlyCredits
};