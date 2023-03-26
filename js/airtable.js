
// const base = new Airtable({ apiKey: 'keyUKafa60cDwHmoq' }).base('app32VEPUDOKJwj8t');

// base('tblxIhDyoscjELMJm').select({
//   // Add any additional filtering or sorting options here
// }).eachPage((records, fetchNextPage) => {
//   // Process each page of records
//   records.forEach(record => {
//     // Create a new article element for each record
//     const article = document.createElement('article');
//     article.innerHTML = `
//       <h2>${record.get('Title')}</h2>
//       <p>${record.get('Publish Date')}</p>
//       <!-- Add any additional fields from your Airtable table -->
//     `;
//     // Add the article to the container element
//     document.getElementById('blog-articles').appendChild(article);
//   });

//   // Fetch the next page of records, if there are more
//   fetchNextPage();
// }, error => {
//   console.error(error);
// });
