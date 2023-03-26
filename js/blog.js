const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'YOUR_API_KEY' }).base('YOUR_BASE_ID');

base('YOUR_TABLE_NAME').select({
  // Add any additional filtering or sorting options here
}).eachPage((records, fetchNextPage) => {
  // Process each page of records
  records.forEach(record => {
    // Create a blog card element for each record
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.innerHTML = `
      <h2>${record.get('Title')}</h2>
      <p>By ${record.get('Author')}</p>
      <p>${record.get('Date')}</p>
      <p>${record.get('Content')}</p>
    `;
    // Add the card to the container element
    document.getElementById('blog-cards').appendChild(card);
  });

  // Fetch the next page of records, if there are more
  fetchNextPage();
}, error => {
  console.error(error);
});
