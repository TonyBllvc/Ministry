// import { fetchDataset } from '../utility/api-calls.js';

const api = 'http://localhost:4242/api/formation'
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

    data.forEach(item => {
      const grid = document.createElement('div');
      grid.classList.add('single-upcoming-events-area', 'd-flex', 'flex-wrap', 'align-items-center');
      grid.style.marginTop = '5rem'
      grid.style.marginBottom = '5rem'

      const imageThumb = document.createElement('div');
      imageThumb.classList.add('upcoming-events-thumbnail');
      imageThumb.style.backgroundColor = 'blue';
      imageThumb.style.backgroundPosition = 'cover'
      imageThumb.style.width = '350px';
      imageThumb.style.height = '150px';

      const image = document.createElement('img');
      image.src = `http://localhost:4242/api/image/upload/${item.images}`; // Replace 'imageSrc' with the actual property name from your data
      image.alt = 'Sermon Image'; // Replace 'Sermon Image' with appropriate alt text
      image.width = "100%";
      image.height = "100%";

      imageThumb.appendChild(image);

      const flexwrap = document.createElement('div');
      flexwrap.classList.add('upcoming-events-content', 'd-flex', 'flex-wrap', 'align-items-center');


      const flexAorund = document.createElement('div');
      flexAorund.classList.add('events-text', 'justify-content-around');

      const Title = document.createElement('h4');
      Title.textContent = item.title; // Replace 'title' with the actual property name from your data

      const Content = document.createElement('p');
      Content.textContent = item.content; // Replace 'content' with the actual property name from your data

      flexAorund.appendChild(Title);
      flexAorund.appendChild(Content);

      flexwrap.appendChild(flexAorund);

      grid.appendChild(imageThumb);
      grid.appendChild(flexwrap);

      pageContentElement.appendChild(grid);
    });
  } else {
    console.log('Content is undefined.');
  }
}


// Call the function to populate the table
populateTable();
