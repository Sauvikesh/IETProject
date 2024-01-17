const axios = require('axios');

async function insertActivitiesIntoAF(arrayOfActivities) {
    const apiKey = "b1e07a9f-3d22-4251-aef3-3e1becbd2e51";
    const apiURL = "http://edustream:8080/api/v1/activity";


    const requestData = {
        activity: {
             icon: "icon-comment-alt",
             id: "0f412c41b44112d3357614a4540e988f9763f93c79593c15ee71a361a9d6d692",
             actor: {
                 id: "edustest",
                 objectType: "person",
                 displayName: "UC Davis IET",
                 author: {
                     id: "test",
                     displayName: "Test User"
                 }
             },
             verb: "post",
             title: "Test Notification",
             object: {
                 ucdSrcId: "http://ucdavis.edu",
                 objectType: "notification",
                 content: "This is a test notification",
                 ucdEdusModel: {
                     url: "http://ucdavis.edu",
                     urlDisplayName: "UC Davis"
                 },
                 id: "dcb6df608407684fb143b631e94e2fe9f0f52fcbc9b7793f520b6d5502525900",
                 masterId: "dcb6df608407684fb143b631e94e2fe9f0f52fcbc9b7793f520b6d5502525900"
             },
             ucdEdusMeta: {
                 startDate: "2022-04-14T17:44:56.297Z",
                 labels: [
                     "~campus-life"
                 ],
                 endDate: "2030-01-01T00:00:00.000Z",
                 bookmarkerIds: []
             },
             priority: 0,
             published: "2022-04-14T18:59:56.160Z",
             score: 0,
             to:[
                 {
                     id: "public",
                     g: true,
                     i: false
                 }
             ]
         }
    }

    myObject = arrayOfActivities[0]
    const requestData2 = {
      activity: myObject
    }

    console.log("MY VERSIONjkbnhjkbhjbhjb:")
    console.log(myObject)
    console.log("Right VERSION??:")
    console.log(requestData)

    const settings = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `ApiKey ${apiKey}`,
        }
    }

    try {
        const response = await axios.post(apiURL, requestData2, settings);
        console.log(response.data)
        console.log("<<----------------->>")
        console.log(arrayOfActivities[0])
      } catch(error) {
        // Handle error
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error(`Status: ${error.response.status}`);
          console.error(`Data: ${error.response.data}`);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error(`Error message: ${error.message}`);
        };
        throw error; 
    };

}

module.exports = insertActivitiesIntoAF;
