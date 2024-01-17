const Activity = require('../models/AFactivity');
const createHash = require('../utils/hash');
const generateGuid = require('../utils/generateGuid');

function removeHTMLTags(description) {
    // Use a regular expression to match <a> tags and capture link and content
    let newString = description.replace(/<a\b[^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gi, '$1 ($2)')
    
    // removes new lines
    .replace(/\n/g, '')

    // removes <p> tags with classes
    .replace(/<p\b[^>]*class=['"][^'"]*['"][^>]*>(.*?)<\/p>/gi, '$1')

    // removes opening <p>
    .replace(/^<p>/, '')

    // Remove </|p> tag at the end
    .replace(/<\/p>$/, '')

    // Remove lingering <p> tags that are next to each other
    .replace(/<\/p>\s*<p>/gi, '');

    return newString;
}

/*
const connectorData = {
          id: rssConnectors.id,
          name: rssConnectors.name,
          uri: rssConnectors.uri,
          enabled: rssConnectors.enabled,
          approveBy: rssConnectors.approveBy,
          includeImage: rssConnectors.includeImages,
          startSyncWindow: rssConnectors.startSyncWindow,
          endSyncWindow: rssConnectors.endSyncWindow
        }
*/

/*
    processor that extracts all data from the RSS response a creates activity objects
*/
function processRSSToAF(arrayOfRSSItems, rssConnectorData) {
    let arrayOfActivityObjects = [];

    arrayOfRSSItems.forEach(item => {
        // lines that check if the values exist before adding to our activity object
        let authorName = item['dc:creator'][0] ?? "No Author";
        let description = removeHTMLTags(item.description[0] ?? "No description");
        let title = item.title[0] ?? "No title";
        let publishDate = item.pubDate[0].time[0].$.datetime ?? "No publish date";
        let dateObject = new Date(publishDate);
        let guid = generateGuid(item.guid[0]._);
        let url = item.link[0];
        
        let object = {
            icon: "icon-comment-alt",
            actor: {
                id: "edustest",
                objectType: "person",
                displayName: "UC Davis IET",
                image : {
                    color: "#ffffff"
                },
                author: {
                    id: "N/A",
                    displayName: authorName,
                },
            },
            verb: "post",
            title: title,
            object: {
                ucdSrcId: guid,
                objectType: "notification",
                content: description,
                ucdEdusModel: {
                    url: url,
                    urlDisplayName: rssConnectorData.name,
                    event: {
                        hasStartTime: false, 
                        hasEndTime: false,
                        location: "N/A",
                        startDate: "2022-04-14T17:44:56.297Z",
                        endDate: "2022-04-14T17:44:56.297Z",
                        isAllDay: false,
                    },
                },
                location: {
                    displayName: "N/A",
                    geo: {
                        latitude: "N/A",
                        longitude: "N/A",
                    },
                    // missing the geometry field, had errors
                },
            },
            generator: {
                id: rssConnectorData.id
            },
            to: [{
                id: "public",
                g: true,
                i: false,
            }],
            published: dateObject.toISOString(), 
            ucdEdusMeta: {
                labels: ["~academic"],
                startDate: "2022-04-14T17:44:56.297Z",
                endDate: "2030-01-01T00:00:00.000Z",
            },
        };
        arrayOfActivityObjects.push(object);
    });

    return arrayOfActivityObjects;
}

module.exports = processRSSToAF;
