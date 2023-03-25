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

// Target
const jobCardContainer = document.getElementById("job-cards");


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
    const myObj = {
      name: name,
      status: status,
      link:link,
      img: img,
      subtext: sub
    };
    
    
    if(status == "Yes"){
      
        jobAds.push(myObj);
        console.log(jobAds);

        const jobCard = document.createElement("div");
      jobCard.classList.add("col");
      jobCard.innerHTML = `
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${job.name}</h5>
            <p class="card-text">${job.subtext}</p>
            <a href={job.link} class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      `;
      jobCardContainer.appendChild(jobCard);

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
