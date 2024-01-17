const axios = require('axios');

async function insertActivitiesIntoAF(arrayOfActivities) {
    const apiKey = "b1e07a9f-3d22-4251-aef3-3e1becbd2e51";
    const apiURL = "http://edustream:8080/api/v1/activity";

    const settings = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `ApiKey ${apiKey}`,
        }
    }

    for (const actvitiy of arrayOfActivities.slice(0, 4)) {
        const requestData = {
            activity: actvitiy
        }

        try {
            const response = await axios.post(apiURL, requestData, settings);
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
        };
    }
}

module.exports = insertActivitiesIntoAF;
