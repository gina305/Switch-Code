const Airtable = require('airtable');

// Replace <YOUR_API_KEY> with your personal access token
const apiKey = "keyUKafa60cDwHmoq";

// Replace <YOUR_BASE_ID> with your Airtable base ID
const baseId = "app32VEPUDOKJwj8t";

// Replace <YOUR_TABLE_NAME> with the name of the Airtable table you want to retrieve records from
const tableName = "tblxIhDyoscjELMJm";

// Initialize Airtable client
const base = new Airtable({ apiKey: apiKey }).base(baseId);

// Retrieve records from Airtable
base(tableName).select({
  maxRecords: 10,
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  // Iterate through records
  records.forEach(function(record) {

    console.log(record.get('Name'));


  });

  // Fetch the next page of records
  fetchNextPage();
}, function done(err) {
  if (err) {
    console.error(err);
    return;
  }
});
