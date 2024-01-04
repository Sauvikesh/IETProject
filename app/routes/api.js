const axios = require('axios');
const express = require('express');
const router = express.Router();

// non-library imports
const processXMLToRSSJSON = require('../processors/XMLToRSSJson'); // unsure why it gets angry when I make it all uppercase
const processRSSJSONToAct = require('../processors/RSSJSONToAct');
const insertActivities = require('../database/insertActivity');
const clearData = require('../database/deleteAllData');
const get20Activities = require('../database/getActivities');


// route that deletes data to be used for testing
router.get('/clearData', async (req, res) => {
    res.send(await clearData());
});

router.get('/getRSS', async (req, res) => {
    axios.get("https://www.ucdavis.edu/news/latest/rss")
    .then(async (response) => {
        // parses xml response and turns it into json
        const jsonData = await processXMLToRSSJSON(response.data);

        // turns json into activity objects
        const arrayOfActivities = processRSSJSONToAct(jsonData);

        res.send(arrayOfActivities);


        // inserts the activity objects into the database
        // const insertResponse = await insertActivities(arrayOfActivities);

        // res.send(insertResponse);
    })
});

// define url and response to /posts
router.get("/posts", async (req, res) => {
    res.send(await get20Activities());
});

module.exports = router;