const Activity = require('../models/AFactivity');
const createHash = require('../utils/hash');

/*
    unfinshed processor that extracts certain data from the RSS response and returns an array
*/


function removeHTMLTags(description) {
    // Use a regular expression to match <a> tags and capture link and content
    let newString = description.replace(/<a\b[^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gi, '$1 ($2)');

    // removes opening <p>
    newString = newString.replace(/^<p>/, '');

    // Remove </|p> tag at the end
    newString = newString.replace(/<\/p>$/, '');

    newString= newString.replace(/<p class="MsoNormal">|<\/p>\s*<p>/gi, '');

    return newString;
}

function processRSSJSONToAct (arrayOfRSSItems) {
    let arrayOfActivityObjects = [];

    arrayOfRSSItems.forEach(item => {
        // lines that check if the values exist before adding to our activity object
        let authorName = item['dc:creator'][0] ?? "No Author";
        let description = removeHTMLTags(item.description[0] ?? "No description");
        let title = item.title[0] ?? "No title";
        let publishDate = item.pubDate[0].time[0].$.datetime ?? "No publish date";
        let guid = item.guid[0]._;
        let url = item.link[0];
        
        let object = {
            icon: "placeholder",
            actor: {
                id: "N/A",
                objectType: "N/A",
                displayName: "N/A",
                image : {
                    color: "N/A"
                },
                author: {
                    id: "N/A",
                    displayName: authorName,
                },
            },
            verb: "N/A",
            title: title,
            object: {
                ucdSrcId: guid,
                objectType: "N/A",
                content: description,
                ucdEdusModel: {
                    url: url,
                    urlDisplayName: "N/A",
                    event: {
                        hasStartTime: false,
                        hasEndTime: false,
                        location: "N/A",
                        startDate: "N/A",
                        endDate: "N/A",
                        isAllDay: false,
                    },
                },
                location: {
                    displayName: "N/A",
                    geo: {
                        latitidue: "N/A",
                        longitiude: "N/A",
                    },
                    // missing the geometry field, had errors
                },
            },
            generator: {
                id: "N/A"
            },
            to: [],
            published: publishDate, 
            ucdEdusMeta: {
                labels: [],
                startDate: "N/A",
                endDate: "N/A",
            },
        };
        object.hashValue = createHash(object);

        const activityObject = new Activity(object);
        arrayOfActivityObjects.push(activityObject);
    });

    return arrayOfActivityObjects;
}

module.exports = processRSSJSONToAct;
