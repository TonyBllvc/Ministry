const api = 'http://localhost:4242/api/support'
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

function updateDataset(url) {

  async function updateData(id, title, content) {

    // data = null
    const details = {
      id: id,
      title: title,
      content: content
    };
    // console.log(data)
    pending = true
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const json = await response.json()
      console.log(response.status)

      if (response.status === 401) {

        console.log(json?.message || json?.error)
      }

      if (response.status === 400 || response.status === 404) {
        console.log(json?.message || json?.error)
      } else if (response.status === 201) {
        console.log(json?.content || 'nothing')
        console.log(json?.message)
        // return data = json?.content
      }
      pending = false
    } catch (error) {
      console.log(error.message)
    };
    pending = false
  }

  return { updateData, pending }

}


function deleteDataset(url) {

  async function deleteData(id, title, content) {

    // data = null
    const details = {
      id: id,
      // title: title,
      // content: content
    };
    // console.log(data)
    pending = true
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const json = await response.json()
      console.log(response.status)

      if (response.status === 401) {

        console.log(json?.message || json?.error)
      }

      if (response.status === 400 || response.status === 404) {
        console.log(json?.message || json?.error)
      } else if (response.status === 200) {
        // console.log(json?.content || 'nothing')
        console.log(json?.message)
        // return data = json?.content
      }
      pending = false
    } catch (error) {
      console.log(error.message)
    };
    pending = false
  }

  return { deleteData, pending }

}

// 
async function fetchDataAndPopulateTable() {
  try {
    // const latestTimeElement = document.getElementById('latestTime');

    // if (latestTimeElement) {
      const { dataSet } = fetchDataset(api);
      const { data, latestUpdateTime } = await dataSet();

      // console.log(data)
      // console.log(latestTimeElement)
      if (data) {
        populateTable(data);
      } else {
        console.log('No data available.');
      }

      // Update the latestTime div element with the latest update time
      // latestTimeElement.textContent = "last updated " + latestUpdateTime;
    // } else {
    //   console.error('Element with ID "latestTime" not found');
    // }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
// Function to populate data into the table
async function populateTable(data) {
  if (data && data.length > 0) {
    console.log(data)
    const pageContentElement = document.getElementById('pageContent');

    data.forEach(dataContent => {
      const h2 = document.createElement('h2');
      h2.textContent = dataContent.title;

      const p = document.createElement('p');
      p.textContent = dataContent.content;

      // Append elements to the container
      pageContentElement.appendChild(h2);
      pageContentElement.appendChild(p);
    });
  } else {
    console.log('Content is undefined.');
  }
}

// Call the function to populate the table
populateTable();


window.onload = function () {
  var textOne = document.getElementById('titleH')
  var textTwo = document.getElementById('contentH')

  textOne.value = ''
  textTwo.value = ''
}