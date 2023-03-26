const searchBox = document.getElementById('searchBox');
const resultsContainer = document.getElementById('resultsContainer');

const airtableApiKey = 'keyUKafa60cDwHmoq';
const airtableBaseId = 'app32VEPUDOKJwj8t';
const airtableTableName = 'tblxIhDyoscjELMJm';

const airtableApiUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;

searchBox.addEventListener('input', async () => {
    const searchTerm = searchBox.value.trim();
    resultsContainer.innerHTML = '';

    if (searchTerm.length > 0) {
        const records = await fetchAirtableRecords(searchTerm);
        renderAirtableRecords(records);
    }
});

async function fetchAirtableRecords(searchTerm) {
    const response = await axios.get(`${airtableApiUrl}?filterByFormula=OR(FIND("${searchTerm}", {Title}), FIND("${searchTerm}", {'Publish Date'}))`, {
        headers: {
            'Authorization': `Bearer ${airtableApiKey}`
        }
    });

    return response.data.records;
}

function renderAirtableRecords(records) {
    records.forEach(record => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <h2>${record.fields['Title']}</h2>
            <p>${record.fields['Publish Date']}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}
