// import { fetchDataset } from '../utility/api-calls.js';

const api = 'http://localhost:4242/api/jpic'
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
      pageContentElement.querySelector('h2').textContent = data.title;
      pageContentElement.querySelector('p').textContent = data.content;
      // }
      
  // Set the src attribute of the img element to the URL of the image
  const imageUrl = `http://localhost:4242/api/image/upload/${data.images}`;
  document.getElementById('imagary').src = imageUrl;
    });
  } else {
    console.log('Content is undefined.');
  }
}

// Call the function to populate the table
populateTable();

