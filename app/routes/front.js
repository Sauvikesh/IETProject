const express = require('express');
const router = express.Router();

// Home page route
router.get('/', async (req, res) => {
    res.send("this is home page.");
});

module.exports = router;