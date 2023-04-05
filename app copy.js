import { env } from 'process';
  const dotenv = require('dotenv');
          import axios from '/axios'
    dotenv.config();

    const cors = require('cors'); 


    app.use(cors());
  export default function foo() {


  window.alert(process.env + "test");

  const apiKey1 = process.env.MY_KEY; // replace with your Airtable API key
  console.log("apiKey1")
  const baseId =  process.env.MY_BASEID; // replace with your Airtable base ID
    const tableName =  process.env.MY_TABLENAME; // replace with the name of your Airtable table

    const jobCardContainer = document.getElementById('job-cards');

    axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`, {
      headers: { 'Authorization': `Bearer ${apiKey1}` }
    })
    .then(response => {
      const jobAds = response.data.records.map(record => ({
        title: record.fields['Title'],
        pubDate: record.fields['Publish Date'],
        link: record.fields['Link'],
        img: record.fields['image']
      }));

      jobAds.forEach(job => {

      

        if(job.active = "Yes"){
        const jobCard = document.createElement('div');
        jobCard.classList.add('col');
        jobCard.innerHTML = `
<div class="card text-center" style="width: 18rem;"> 
  <img class="card-img-top" src=${job.img[0].url} alt="Card image cap">
  <div class="card-body">
    <p class="card-text">${job.title}</p>
<a href="${job.link}" class="btn btn-primary"> Read </a>
  </div>
</div>
        `;
        jobCardContainer.appendChild(jobCard);
      }
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export const blogImport = foo ();