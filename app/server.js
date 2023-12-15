const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

// Frontend route
const FrontRouter = require('./routes/front');

// API routes
const APIRoutes = require('./routes/api');

// Database connection
const db = require('./config/keys').mongoProdURI;
mongoose
    .connect(db)
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));


app.use(FrontRouter);
app.use(APIRoutes);


app.listen(port, () => {
    console.log("Server listening on:", port);
});
