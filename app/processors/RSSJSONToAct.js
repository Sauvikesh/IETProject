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
    processor that extracts all data from the RSS response a creates activity objects
*/
function processRSSJSONToAct (arrayOfRSSItems) {
    let arrayOfActivityObjects = [];

    arrayOfRSSItems.forEach(item => {
        // lines that check if the values exist before adding to our activity object
        let authorName = item['dc:creator'][0] ?? "No Author";
        let description = removeHTMLTags(item.description[0] ?? "No description");
        let title = item.title[0] ?? "No title";
        let publishDate = item.pubDate[0].time[0].$.datetime ?? "No publish date";
        let guid = generateGuid(item.guid[0]._);
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
