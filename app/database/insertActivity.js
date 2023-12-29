const Activity = require('../models/AFactivity');

// passes in an array of activity objects
async function insertActivities(arrayOfActivities) {
    try {
        // inserts all activities in array into the db
        const result = await Activity.insertMany(arrayOfActivities);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, data: error };
    }
}

module.exports = insertActivities;
