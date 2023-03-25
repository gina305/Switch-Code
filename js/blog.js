// Import the dot env library
require('dotenv').config();
const axios = require('axios');


const apiKey = process.env.API_KEY;
const baseId = process.env.BASE_ID;
const tableName = process.env.TABLE_NAME;

const endpoint = `https://api.airtable.com/v0/${baseId}/${tableName}`;

axios.get(endpoint, {
  headers: { Authorization: `Bearer ${apiKey}` }
})
  .then(response => {
    const records = response.data.records;

    records.forEach(record => {
      const listItem = document.createElement('li');
      listItem.innerText = record.fields.Name;
      document.getElementById('records').appendChild(listItem);
    });
  })
  .catch(error => {
    console.error(error);
  });
