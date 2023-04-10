import config from "./config.js";

const apiKey1 = config.MY_KEY; // replace with your Airtable API key
const baseId = config.MY_BASEID; // replace with your Airtable base ID
const tableName = config.MY_ADS; // replace with the name of your Airtable table

const jobCardContainer = document.getElementById('job-cards');

axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`, {
  headers: { 'Authorization': `Bearer ${apiKey1}` }
})
.then(response => {
  console.log(response.data)
  const jobAds = response.data.records.map(record => ({
    title: record.fields['Job Title'],
    company: record.fields['Company'],
    link: record.fields['Link'],
    active: record.fields['Active']
  }));

  jobAds.forEach(job => {

    if(job.active == "Yes"){
    const jobCard = document.createElement('div');
    jobCard.classList.add('col');
    jobCard.innerHTML = `
<div class="card text-center" style="width: 18rem;"> 
  <div class="card-body">
    <p class="card-text">${job.title}</p>
    <i>${job.company}</i>
    <br>
    <a href="${job.link}" class="btn btn-primary" style="padding: 5px;margin:5px"> Apply Now </a>
  </div>
</div>`;

    jobCardContainer.appendChild(jobCard);
  }});
})
.catch(error => {
  console.error(error);
});
