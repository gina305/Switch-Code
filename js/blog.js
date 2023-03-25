export function myFunction(arg1, arg2) {
  const Airtable = require('airtable');

  // Replace <YOUR_API_KEY> with your personal access token
  const apiKey = "keyUKafa60cDwHmoq";

  // Replace <YOUR_BASE_ID> with your Airtable base ID
  const baseId = "app32VEPUDOKJwj8t";

  // Replace <YOUR_TABLE_NAME> with the name of the Airtable table you want to retrieve records from
  const tableName = "tblxIhDyoscjELMJm";

  // Initialize Airtable client
  const base = new Airtable({ apiKey: apiKey }).base(baseId);

  // Lisrt of ads
  const jobAds = []



  // Retrieve records from Airtable
  base(tableName).select({
    maxRecords: 10,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // Iterate through records
    records.forEach(function(record) {
      
      //Save values
      const name = record.get('Name');
      const status = record.get('Active');
      const link = record.get('Link');
      const img = record.get('Image');
      const sub = record.get('Sub-text');

  //Create new obj
      const job = {
        name: name,
        status: status,
        link:link,
        img: img,
        subtext: sub
      };
      
      if(status == "Yes"){
  //Add job to ad list
      jobAds.push(jobAds);
        console.log(name);

      }
    

    });

    // Fetch the next page of records
    fetchNextPage();
  }, function done(err) {
    if (err) {
      console.error(err);
      return;
    }
  });
  };

return result;