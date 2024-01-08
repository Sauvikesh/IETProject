const { v5: uuidv5 } = require('uuid');

function generateGuid(input) {
    const namespace = '1b671a64-40d5-491e-99b0-da01ff1f3341'; // predefined namespace

    return uuidv5(input, namespace);
}

module.exports = generateGuid;
