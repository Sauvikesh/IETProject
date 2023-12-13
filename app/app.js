const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const port = 3000;
const app = express();


/*
    required data for RSS:

    Title -> title
    Link -> object.ucdEdusModel.url
    Description -> object.content ??
    Pubish Data -> published
    Author -> actor.author.displayName
    PermaLInk -> ???
*/

// Database connection
const db = require('./config/keys').mongoProdURI;
mongoose
    .connect(db)
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));


// Home page route
app.get('/', async (req, res) => {
    res.send("this is the home page");
});

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

app.listen(port, () => {
    console.log("Server listening on", port);
});