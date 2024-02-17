// import { fetchDataset } from '../utility/api-calls.js';

const api = 'https://spiritan.vercel.app/api/apostolate'
// const updateApi = 'https://spiritan.vercel.app/api/jpic'
let data
let pending = false

// ensures the javascript runs before the dom is served
document.addEventListener('DOMContentLoaded', async function () {
  // Fetch dataset and populate table
  await fetchDataAndPopulateTable();
});

function fetchDataset(url) {

  async function dataSet() {

    // data = null
    // // const details = {
    // //     access: access,
    // // };
    // console.log(data)
    pending = true
    try {
      const response = await fetch(url)
      //     {
      //     method: 'PUT',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(details),
      // });

      const json = await response.json()
      console.log(response.status)

      if (response.status === 401) {

        console.log(json?.message || json?.error)
      }

      if (response.status === 400 || response.status === 404) {
        console.log(json?.message || json?.error)
      } else if (response.status === 200) {
        console.log(json?.latestUpdateTime || 'nothing')
        return data = json
      }
      pending = false
    } catch (error) {
      console.log(error.message)
    };
    pending = false
  }

  return { dataSet, pending }

}

// 
async function fetchDataAndPopulateTable() {
  try {

    const { dataSet } = fetchDataset(api);
    const { data } = await dataSet();

    // console.log(data)
    // console.log(contentPage)
    if (data) {
      populateTable(data);
    } else {
      console.log('No data available.');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

// Function to populate data into the table
async function populateTable(data) {

  if (data) {
    const pageContentElement = document.getElementById('pageContent');

    console.log(data)
    data.map(data => {
      // const column = document.createElement('div');
      pageContentElement.classList.add('col-12');

      const sermon = document.createElement('div');
      sermon.classList.add('section-heading', 'text-center');

      const sermonTitle = document.createElement('h2');
      sermonTitle.textContent = data.title; // Replace 'title' with the actual property name from your data

      const sermonContent = document.createElement('p');
      sermonContent.textContent = data.content; // Replace 'content' with the actual property name from your data

      // Append elements to sermon container
      // sermon.appendChild(image);
      sermon.appendChild(sermonTitle);
      sermon.appendChild(sermonContent);

      // Append sermon container to column
      // column.appendChild(sermon);

      // Append column to page content
      pageContentElement.appendChild(sermon);

    });
  } else {
    console.log('Content is undefined.');
  }
}

// Call the function to populate the table
populateTable();


