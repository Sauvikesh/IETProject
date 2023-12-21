/*
    unfinshed processor that extracts certain data from the RSS response and returns an array
*/
function processRSSData (arrayOfRSSItems) {
    let arrayOfActivityObjects = [];

    for (let i = 0; i < arrayOfRSSItems.length; i++) {
        let singleItem = arrayOfRSSItems[i];

        let object = {
            title: singleItem.title,
            link: singleItem.link,
            description: singleItem.description,
            guid: singleItem.guid[0]._,
        }
        arrayOfActivityObjects.push(object);
    }
    return arrayOfActivityObjects;
}

module.exports = processRSSData;
