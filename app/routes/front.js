const express = require('express');
const router = express.Router();

// Home page route
router.get('/', async (req, res) => {
    res.send("This is the home page.");
});

module.exports = router;