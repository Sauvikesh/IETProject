const axios = require('axios');
const express = require('express');
const router = express.Router();

// non-library imports
const processXMLToRSSJSON = require('../processors/XMLToRSSJson'); // unsure why it gets angry when I make it all uppercase
const processRSSJSONToAct = require('../processors/RSSJSONToAct');
const insertActivities = require('../database/insertActivity');
const clearData = require('../database/deleteAllData');
const get20Activities = require('../database/getActivities');


// route that gets sources
router.get('/sources', async (req, res) => {
    const apiKey = "b1e07a9f-3d22-4251-aef3-3e1becbd2e51";
    const apiURL = "http://edustream:8080/api/v1/source";


    const settings = {
        params: {
            connectorType: "all",
        },
        headers: {
          'Authorization': `ApiKey ${apiKey}`,
        }
    }


    console.log("about to make the call");
    axios.get(apiURL, settings)
    .then(async (response) => {
        res.send(response.data);
    })
    .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error(`Status: ${error.response.status}`);
          console.error(`Data: ${error.response.data}`);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error(`Error message: ${error.message}`);
        };
});
    
});

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