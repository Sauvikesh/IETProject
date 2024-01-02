const crypto = require('crypto');

function createHash(input) {
    const hash = crypto.createHash('sha256'); // choose algo for hashing
    hash.update(JSON.stringify(input)); 
    const hashResult = hash.digest('hex'); // Get the hexadecimal representation of the hash

    return hashResult;
}

module.exports = createHash;
