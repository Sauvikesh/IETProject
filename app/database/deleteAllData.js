const { client } = require('../config/mongoConfig');

async function clearData() {
    try {

        const database = client.db(); // Use the default database
        const collection = database.collection('activities'); // Replace with your actual collection name

        // Delete all documents in the collection
        const result = await collection.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);

    } finally {
        return('Deleted some data');
    }
}

module.exports = clearData;