const mongoose = require('mongoose');

// Schema for activity
// UNFINISHED, need to add some more data and need to add which fields are required
const activity = new mongoose.Schema( {
    icon: String,
    actor: {
        id: String,
        objectType: String,
        displayName: String,
        image: {
            color: String
        },
        author: {
            id: String,
            displayName: String
        },
        verb: String,
        title: String,
        object: {
            ucdSrcId: String,
            objectType: String,
            content: String,
            contentImage: {
                
            },
            location: {
                displayName: String,
                geo: {
                    latitidue: String,
                    longitiude: String,
                },
                geometry: {
                    type: String,
                    coordinates: Array
                }
            }

        },
        generator: {
            id: String
        },
        to: String,
        published: String,
        ucdEdusMeta: {
            labels: Array,
            startDate: String,
            endDate: String
        },
    },

 });


 const Activity = mongoose.model('Activity', activity);

 module.exports = Activity;