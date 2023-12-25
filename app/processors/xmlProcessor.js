const xml2js = require('xml2js');

function processXMLDataIntoJSON(data) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rss.channel[0].item);
            }
        });
    });
}

module.exports = processXMLDataIntoJSON;