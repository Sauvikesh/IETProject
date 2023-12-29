const { client } = require('../config/mongoConfig');

async function clearData() {
    try {
        // connect to database and the collection to delete
        const database = client.db(); 
        const collection = database.collection('activities'); 

        // Delete all activities
        const result = await collection.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    } finally {
        return('Deleted all data');
    }
}

module.exports = clearData;
