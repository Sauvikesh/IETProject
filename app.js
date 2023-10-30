const express = require('express');
const axios = require('axios');

const port = 8080;
const app = express();

// define url and response to /posts
app.get("/posts", (req, res) => {
    axios.get("https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=10")
    .then((response) => {
        // extracts data from response
        const dataObtained = response.data;

        // iterates through each object and extracts desired information 
        const activities = dataObtained.map((activity) => ({
            id: activity.id,
            published: activity.published,
            title: activity.title,
            actorDisplayName: activity.actor.displayName,
          }));
      
          // sends the requested number of activities in an array
          res.send(activities);
      })
      .catch((error) => {
        // sends an error if there was an error
        console.error(error);
      });
});

app.listen(port, () => {
    console.log("Server listening on", port);
});