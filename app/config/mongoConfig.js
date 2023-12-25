// mongoConfig.js
const { MongoClient } = require('mongodb');

// Import the MongoDB connection URI from your keys file
const { mongoProdURI } = require('./keys');

const client = new MongoClient(mongoProdURI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { client, uri: mongoProdURI };
