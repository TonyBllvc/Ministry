// import { fetchDataset } from '../utility/api-calls.js';

const api = 'http://localhost:4242/api/structure_organisation'
const contentApi = 'http://localhost:4242/api/structure_content'
// const updateApi = 'http://localhost:4242/api/jpic'
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

function fetchContentDataset(url) {

  async function contentDataSet() {

    // dataContent = null
    // // const details = {
    // //     access: access,
    // // };
    // console.log(dataContent)
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
        console.log(json?.latest || 'nothing')
        return dataContent = json
      }
      pending = false
    } catch (error) {
      console.log(error.message)
    };
    pending = false
  }

  return { contentDataSet, pending }

}

// 
async function fetchDataAndPopulateTable() {
  try {
    const latestTimeElement = document.getElementById('latestTime');
    const latestTime = document.getElementById('lateTime');

    if (latestTimeElement) {
      const { contentDataSet } = fetchContentDataset(contentApi);
      const { dataSet } = fetchDataset(api);

      const { dataContent, latest } = await contentDataSet();
      const { data, latestUpdateTime } = await dataSet();

      // console.log(data)
      // console.log(latestTimeElement)
      // if (dataContent) {
      //   populateTable(dataContent);
      // } else {
      //   console.log('No dataContent available.');
      // }

      if (data || dataContent) {
        populateTable(data, dataContent);
      } else {
        console.log('No data available.');
      }

      // Update the latestTime div element with the latest update time
      latestTime.textContent = "last updated " + latest;
      latestTimeElement.textContent = "last updated " + latestUpdateTime;
    } else {
      console.error('Element with ID "latestTime" not found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

function populateTable(data, dataContent) {

  if (dataContent) {
    const pageContentElement = document.getElementById('pageContent');

    console.log(dataContent)
    dataContent.map(dataContent => {
      pageContentElement.querySelector('h1').textContent = dataContent.title;
      pageContentElement.querySelector('p').textContent = dataContent.content;
      // }
    });
  } else {
    console.log('Content is undefined.');
  }
}

// Call the function to populate the table
populateTable();

