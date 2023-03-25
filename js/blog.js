// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Airtable Job Ads</title>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css">
//   <style>
//     .card-title {
//       font-size: 1.25rem;
//       font-weight: bold;
//     }
//     .card-text {
//       font-size: 1rem;
//     }
//   </style>
// </head>
// <body>

//   <div class="container mt-5">
//     <div id="job-cards" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>
//   </div>

//   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//   <script>
//     const apiKey = '<YOUR_API_KEY>'; // replace with your Airtable API key
//     const baseId = '<YOUR_BASE_ID>'; // replace with your Airtable base ID
//     const tableName = '<YOUR_TABLE_NAME>'; // replace with the name of your Airtable table

//     const jobCardContainer = document.getElementById('job-cards');

//     axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`, {
//       headers: { 'Authorization': `Bearer ${apiKey}` }
//     })
//     .then(response => {
//       const jobAds = response.data.records.map(record => ({
//         title: record.fields['Job Title'],
//         description: record.fields['Job Description']
//       }));

//       jobAds.forEach(job => {
//         const jobCard = document.createElement('div');
//         jobCard.classList.add('col');
//         jobCard.innerHTML = `
//           <div class="card border-0 shadow-sm">
//             <div class="card-body">
//               <h5 class="card-title">${job.title}</h5>
//               <p class="card-text">${job.description}</p>
//               <a href="#" class="btn btn-primary">Apply Now</a>
//             </div>
//           </div>
//         `;
//         jobCardContainer.appendChild(jobCard);
//       });
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   </script>
// </body>
// </html>
