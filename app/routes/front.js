const axios = require('axios');
const express = require('express');
const router = express.Router();


// Home page route
router.get('/', async (req, res) => {
    res.send("this is home page. ");
});


router.get('/getRSS', async (req, res) => {

    axios.get("https://www.ucdavis.edu/news/latest/rss")
    .then((response) => {
        res.send(response.data);
    })
});


// define url and response to /posts
router.get("/posts", (req, res) => {
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
      
          // sends the requested number of activities in an array
          res.send(activities);
      })
      .catch((error) => {
        // sends an error if there was an error
        console.error(error);
      });
});

module.exports = router;
