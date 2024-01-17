const axios = require('axios');

async function getRSSConnectors() {
    const apiKey = "b1e07a9f-3d22-4251-aef3-3e1becbd2e51";
    const apiURL = "http://edustream:8080/api/v1/source";
  
    const settings = {
        params: {
            connectorType: "rss",
        },
        headers: {
          'Authorization': `ApiKey ${apiKey}`,
        }
    }
  
    try {
        const response = await axios.get(apiURL, settings);
        const rssConnectors = response.data[0].connectors[0];
  
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
        return connectorData;
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

module.exports = getRSSConnectors;