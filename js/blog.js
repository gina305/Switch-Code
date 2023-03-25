const axios = require('axios');

// Replace <YOUR_API_KEY> with your personal access token
const apiKey = "keyUKafa60cDwHmoq";

  // Replace <YOUR_BASE_ID> with your Airtable base ID
const baseId = "app32VEPUDOKJwj8";

  // Replace <YOUR_TABLE_NAME> with the name of the Airtable table you want to retrieve records from
const tableName = "tbldAB3RXAMBjUiQ9";
  // Initialize Airtable API endpoin


// Initialize Airtable API endpoint
const endpoint = `https://api.airtable.com/v2/${baseId}/${tableName}`;

// Make HTTP request to Airtable API to retrieve records
axios.get(endpoint, {
  headers: {
    "Authorization": `Bearer ${apiKey}`
  }
})
.then(response => {
  const records = response.data.records;
  console.log(records);
})
.catch(error => {
  console.log(error);
});
