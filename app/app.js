const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

// Frontend route
const FrontRouter = require('./routes/front');

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


app.use(FrontRouter);


app.listen(port, () => {
    console.log("Server listening on", port);
});
