const axios = require('axios');
const express = require('express');
const router = express.Router();

// non-library imports
const processXMLToRSSJSON = require('../processors/XMLToRSSJson'); // unsure why it gets angry when I make it all uppercase
const processRSSJSONToAct = require('../processors/RSSJSONToAct');
const processRSSToAF = require('../processors/RSSTOAF');
const insertActivities = require('../database/insertActivity');
const insertActivitiesIntoAF = require('../database/insertActivityIntoAF');
const clearData = require('../database/deleteAllData');
const get20Activities = require('../database/getActivities');
const getRSSConnectors = require('../utils/getRSSConnector');

// route that deletes data to be used for testing
router.get('/clearData', async (req, res) => {
    res.send(await clearData());
});

router.get('/postAF', async (req, res) => {
    const connector = await getRSSConnectors();
    console.log(connector);
    const uri = connector.uri;

    axios.get(uri)
    .then(async (response) => {
        // parses xml response and turns it into json
        const jsonData = await processXMLToRSSJSON(response.data);

        // turns json into activity objects
        const arrayOfActivities = processRSSToAF(jsonData, connector);

        // inserts the activity objects into the database
        const insertResponse = await insertActivitiesIntoAF(arrayOfActivities);

        res.send(insertResponse);
    })
});


router.get('/getRSS', async (req, res) => {
    const connector = await getRSSConnectors();
    console.log(connector);
    const uri = connector.uri;

    axios.get(uri)
    .then(async (response) => {
        // parses xml response and turns it into json
        const jsonData = await processXMLToRSSJSON(response.data);

        // turns json into activity objects
        const arrayOfActivities = processRSSJSONToAct(jsonData, connector);

        // inserts the activity objects into the database
        const insertResponse = await insertActivities(arrayOfActivities);

        res.send(insertResponse);
    })
});

// define url and response to /posts
router.get("/posts", async (req, res) => {
    res.send(await get20Activities());
});

module.exports = router;