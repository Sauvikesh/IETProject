const axios = require('axios');
const express = require('express');
const router = express.Router();
const xml2js = require('xml2js');

// non-library imports
const processRSSData = require('../processors/RSSProcessor');

router.get('/getRSS', async (req, res) => {
    axios.get("https://www.ucdavis.edu/news/latest/rss")
    .then((response) => {

        // parses xml response and turns it into json
        xml2js.parseString(response.data, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                let arrayOfItems = processRSSData(result.rss.channel[0].item);
                res.send(arrayOfItems);
            }
          });
    })
});

// define url and response to /posts
router.get("/posts", async (req, res) => {
    axios.get("https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=10")
    .then((response) => {
        // extracts data from response
        const dataObtained = response.data;

        // iterates through each object and extracts desired information 
        const activities = dataObtained.map((activity) => ({
            id: activity.id,
            published: activity.published,
            title: activity.title,
            author: activity.actor.displayName,
            description: activity.object.content,
            link: activity.object.ucdEdusModel.url
          }));
      
          // sends the activities in an array
          res.send(activities);
      })
      .catch((error) => {
        console.error(error);
      });
});

module.exports = router;