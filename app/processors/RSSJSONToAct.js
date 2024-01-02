const Activity = require('../models/AFactivity');
const createHash = require('../utils/hash');

/*
    unfinshed processor that extracts certain data from the RSS response and returns an array
*/

function processRSSJSONToAct (arrayOfRSSItems) {
    let arrayOfActivityObjects = [];

    arrayOfRSSItems.forEach(item => {
        // lines that check if the values exist before adding to our activity object

        let authorName = item['dc:creator'][0] ?? "No Author";
        let description = item.description[0] ?? "No description";
        let title = item.title[0] ?? "No title";
        let publishDate = item.pubDate[0].time[0]._ ?? "No publish data";
        
        let object = {
            actor: {
                author: {
                    displayName: authorName,
                }
            },
            object: {
                content: description,
                ucdSrcId: item.guid[0]._,
                ucdEdusModel: {
                    url: item.link[0],
                }
            },
            title: title,
            published: publishDate, // must be Date format YYYY-MM-DDTHH:mm:ss.SSSZ
        };
        object.hashValue = createHash(object);

        const activityObject = new Activity(object);
        arrayOfActivityObjects.push(activityObject);
    });

    return arrayOfActivityObjects;
}

module.exports = processRSSJSONToAct;
