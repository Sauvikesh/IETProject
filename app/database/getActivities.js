const Activity = require('../models/AFactivity');

async function get20Activities() {
    try {
        // retrieves 20 most recent activities
        const result = await Activity.find({}).sort({ _id: -1 }).limit(20).exec();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, data: error.message || 'Error deleting data' };
    }
}

module.exports = get20Activities;
