const Activity = require('../models/AFactivity');

async function clearData() {
    try {
        // Delete all activities
        const result = await Activity.deleteMany({});
        return { success: true, data: result };
    } catch (error) {
        return { success: false, data: error.message || 'Error deleting data' };
    }
}

module.exports = clearData;
