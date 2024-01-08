const Activity = require('../models/AFactivity');
const generateGuid = require('../utils/generateGuid');

// passes in an array of activity objects
async function insertActivities(arrayOfActivities) {

    // keeps track of documents made/changed to be sent as response
    let documentsCreated = 0;
    let documentsUpdated = 0;

    for (const item of arrayOfActivities) {
        try {
            const activityInDB = await Activity.findOne({"object.ucdSrcId": item.object.ucdSrcId});

            // create a new document
            if (activityInDB == null) {
                documentsCreated += 1;
                await Activity.create(item);
            } else if (activityInDB.hashValue != item.hashValue) {
                // update a document
                documentsUpdated += 1;
                await Activity.updateOne({"object.ucdSrcId": item.object.ucdSrcId}, item);
            }
            
        } catch (error) {
            console.error(`Error processing activity with ucdSrcId ${item.object.ucdSrcId}: ${error.message}`);
        }
    }
    
    return {newDocuments:documentsCreated, updatedDocuments: documentsUpdated};
}

module.exports = insertActivities;
