const Activity = require('../models/AFactivity');


async function getActivitiesBySrcID(arrayOfActivities) {
    const currentSrcIDs = arrayOfActivities.map(activity => activity.object.ucdSrcId);

    try {
        const result = await Activity.find({ 'object.ucdSrcId': { $in: currentSrcIDs } });
        return (result.data);
    } catch (error) {
        return { success: false, data: error };
    }
}


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
