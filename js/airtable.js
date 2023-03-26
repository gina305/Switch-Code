const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyUKafa60cDwHmoq' }).base('app32VEPUDOKJwj8t');

function getBlogPosts() {
  return new Promise((resolve, reject) => {
    base('tblxIhDyoscjELMJm').select({
      // Add any additional filtering or sorting options here
    }).all((error, records) => {
      if (error) {
        reject(error);
      } else {
        resolve(records);
      }
    });
  });
}
