// import { fetchDataset } from '../utility/api-calls.js';

const api = 'https://spiritan-tonybllvc.vercel.app/api/information'
// const updateApi = 'https://spiritan-tonybllvc.vercel.app/api/jpic'
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

    data.forEach((item, index) => {
      // Determine the class based on the index
      const className = index % 2 === 0 ? 'py-5 mb-5 row align-items-center justify-content-between' : 'py-5 mb-5 bg-gray d-flex row flex-column flex-lg-row-reverse  align-items-center justify-content-between';

      // Create the outer div with the determined class
      const outerDiv = document.createElement('div');
      outerDiv.className = className;

      // One div within pageContent
      const contentColumn = document.createElement('div');
      contentColumn.classList.add('col-12', 'col-lg-5');

      const aboutContent = document.createElement('div');
      aboutContent.classList.add('about-content');

      const sermonTitle = document.createElement('h2');
      sermonTitle.textContent = item.title;

      const sermonContent = document.createElement('p');
      sermonContent.textContent = item.content;

      aboutContent.appendChild(sermonTitle);
      aboutContent.appendChild(sermonContent);

      contentColumn.appendChild(aboutContent);

      // Another div
      const imageColumn = document.createElement('div');
      imageColumn.classList.add('col-12', '-pt-5', 'col-lg-6', 'w-100', 'h-100');

      const aboutThumbnail = document.createElement('div');
      aboutThumbnail.classList.add('about-thumbnail', 'h-100', 'w-100');

      const image = document.createElement('img');
      image.id = 'imagery';
      image.alt = 'image_item';
      image.width = '500px';
      image.height = '550px';
      image.style.width = '100%';
      image.style.height = '550px';
      image.style.backgroundPosition = 'center';
      image.style.backgroundSize = 'cover';
      image.style.backgroundRepeat = 'no-repeat';
      image.style.objectFit = 'cover';
      image.style.cursor = 'pointer';

      // Set the src attribute of the img element to the URL of the image
      const imageUrl = `https://spiritan-tonybllvc.vercel.app/api/image/upload/${item.images}`;
      image.src = imageUrl;

      aboutThumbnail.appendChild(image);
      imageColumn.appendChild(aboutThumbnail);

      outerDiv.appendChild(contentColumn);
      outerDiv.appendChild(imageColumn);

      pageContentElement.appendChild(outerDiv);
    });
  } else {
    console.log('Content is undefined.');
  }
}

// Function to populate data into the table
// async function populateTable(data) {
//   if (data) {
//     const pageContentElement = document.getElementById('pageContent');

//     data.forEach(item => {
//       const grid = document.createElement('div');
//       grid.classList.add('single-upcoming-events-area', 'd-flex', 'flex-wrap', 'align-items-center');
//       grid.style.marginTop = '5rem'
//       grid.style.marginBottom = '5rem'

//       const imageThumb = document.createElement('div');
//       imageThumb.classList.add('upcoming-events-thumbnail');
//       // imageThumb.style.backgroundColor = 'blue';
//       imageThumb.style.width = '100%';
//       imageThumb.style.height = '250px';

//       const image = document.createElement('img');
//       image.src = `https://spiritan-tonybllvc.vercel.app/api/image/upload/${item.images}`; // Replace 'imageSrc' with the actual property name from your data
//       image.alt = 'Sermon Image'; // Replace 'Sermon Image' with appropriate alt text
//       image.width = "100%";
//       image.height = "100%";
//       image.style.width = '100%';
//       image.style.height = '250px';
//       image.style.objectFit = 'cover';
//       image.style.cursor = 'pointer';

//       imageThumb.appendChild(image);

//       const flexwrap = document.createElement('div');
//       flexwrap.classList.add('upcoming-events-content', 'd-flex', 'flex-wrap', 'align-items-center');


//       const flexAorund = document.createElement('div');
//       flexAorund.classList.add('events-text', 'justify-content-around');

//       const Title = document.createElement('h4');
//       Title.textContent = item.title; // Replace 'title' with the actual property name from your data

//       const Content = document.createElement('p');
//       Content.textContent = item.content; // Replace 'content' with the actual property name from your data

//       flexAorund.appendChild(Title);
//       flexAorund.appendChild(Content);

//       flexwrap.appendChild(flexAorund);

//       grid.appendChild(imageThumb);
//       grid.appendChild(flexwrap);

//       pageContentElement.appendChild(grid);
//     });
//   } else {
//     console.log('Content is undefined.');
//   }
// }


// Call the function to populate the table
// populateTable();
