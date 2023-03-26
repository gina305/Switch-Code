 
 export default function foo() {
    
    require("dotenv").config();
  
  const apiKey = process.env.Key; // replace with your Airtable API key
    const baseId =  process.env.BASE_ID; // replace with your Airtable base ID
    const tableName =  process.env.TABLE_NAME; // replace with the name of your Airtable table

    const jobCardContainer = document.getElementById('job-cards');

    axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
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

<div class="card-container" style="flex: 1 0 30%;
  margin: 1%;">
  <div class="card text-center" ">
    <img class="card-img-top" src=${job.img[0].url} alt=${job.title}>
    <div class="card-body">
      <p class="card-text">${job.title}</p>
      <a href="${job.link}" class="btn btn-primary"> Read </a>
    </div>
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