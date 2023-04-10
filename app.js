import config from "./config.js";

const apiKey = config.MY_KEY;
const baseId = config.MY_BASEID;
const tableName = config.MY_TABLENAME;

    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?view=Grid%20view`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const records = response.data.records;
        displayData(records);
      } catch (error) {
        console.error(error);
      }
    }

    function displayData(records) {
      function formatDate(inputDateString) { const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date(inputDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Published ${day} ${month} ${year}`;
}


      const container = document.getElementById("data-container");
      records.forEach((record) => {
        const ad = record.fields.Advertise;
    
        if (ad == true) {
          const col = document.createElement("div");
          col.classList.add("col-md-4", "mb-4");
    
          const card = document.createElement("div");
          card.classList.add("card");
    
          const img = document.createElement("img");
          img.src = record.fields.ImageURL;
          img.classList.add("card-img-top");
          img.alt = record.fields.Title;
          card.appendChild(img);
    
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body", "d-flex", "flex-column");
    
          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = record.fields.Title;
          cardBody.appendChild(title);
    
          const description = document.createElement("p");
          description.classList.add("card-text", "text-muted", "mb-auto");
          const inputDateString = record.fields.PublishDate;
          const formattedDate = formatDate(inputDateString);
          description.textContent = formattedDate;
          cardBody.appendChild(description);
    
          const link = document.createElement("a");
          link.href = record.fields.Link;
          link.classList.add("btn", "btn-primary", "mt-auto");
          link.textContent = "Read more";
          cardBody.appendChild(link);
    
          card.appendChild(cardBody);
          col.appendChild(card);
          container.appendChild(col);
        }
      });
    }

    fetchData();

    