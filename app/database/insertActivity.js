const Activity = require('../models/AFactivity');


// passes in an array of activity objects
async function insertActivities(arrayOfActivities) {

    // keeps track of documents made/changed to be sent as response
    let documentsCreated = 0;
    let documentsUpdated = 0;

    arrayOfActivities.forEach(async item => {
        try {
            const activityInDB = await Activity.findOne({"object.ucdSrcId": item.object.ucdSrcId});

            if (activityInDB == null) {
                await Activity.create(item);
                documentsCreated += 1;
            } else {
                if (activityInDB.hashValue != item.hashValue) {
                    await Activity.updateOne({"object.ucdSrcId": item.object.ucdSrcId}, item);
                    documentsUpdated += 1;
                }
            }
        } catch (error) {
            return { success: false, data: error };
        }
    });

    return { success: true, newDocuments:documentsCreated, updatedDocuments: documentsUpdated};
}

module.exports = insertActivities;
