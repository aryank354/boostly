const { getAll } = require('../db/database');

/**
 * Get student leaderboard
 * GET /api/leaderboard
 */
const getLeaderboard = async (req, res) => {
    try {
        // Get limit from query params, default to 10
        const limit = parseInt(req.query.limit) || 10;

        const query = `
            SELECT 
                s.id,
                s.name,
                s.email,
                s.received_balance,
                COUNT(DISTINCT r.id) as total_recognitions_received,
                COUNT(DISTINCT e.id) as total_endorsements_received
            FROM 
                students s
            LEFT JOIN 
                recognitions r ON s.id = r.receiver_id
            LEFT JOIN 
                endorsements e ON r.id = e.recognition_id
            GROUP BY 
                s.id
            ORDER BY 
                s.received_balance DESC,
                s.id ASC
            LIMIT ?;
        `;

        const leaderboard = await getAll(query, [limit]);

        res.json({
            success: true,
            count: leaderboard.length,
            data: leaderboard
        });

    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch leaderboard'
        });
    }
};

module.exports = {
    getLeaderboard
};