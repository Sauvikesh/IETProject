const Activity = require('../models/AFactivity');

// passes in an array of activity objects
async function insertActivities(arrayOfActivities) {
    try {
        // inserts all activities in array into the db
        const result = await Activity.insertMany(arrayOfActivities);

        console.log('Data inserted successfully:', result);
        return('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return('Error inserting data into MongoDB');
    }
}

module.exports = insertActivities;
