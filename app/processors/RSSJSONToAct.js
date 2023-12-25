const Activity = require('../models/AFactivity');

/*
    unfinshed processor that extracts certain data from the RSS response and returns an array
*/

function processRSSJSONToAct (arrayOfRSSItems) {
    let arrayOfActivityObjects = [];

    for (let i = 0; i < arrayOfRSSItems.length; i++) {
        let singleItem = arrayOfRSSItems[i];
        
        const activityObject = new Activity({
            actor: {
                author: {
                    displayName: singleItem['dc:creator'][0],
                }
            },
            object: {
                content: singleItem.description[0],
                ucdSrcId: singleItem.guid[0]._,
                ucdEdusModel: {
                    url: singleItem.link[0],
                }
            },
            title: singleItem.title[0],
            published: singleItem.pubDate[0].time[0]._, // must be Date format YYYY-MM-DDTHH:mm:ss.SSSZ
        });

        arrayOfActivityObjects.push(activityObject);
    }
    return arrayOfActivityObjects;
}

module.exports = processRSSJSONToAct;
