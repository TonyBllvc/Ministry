// import { fetchDataset } from '../utility/api-calls.js';

const api = 'http://localhost:4242/api/information'
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


function updateDatasetWithImage(url) {

  async function updateDataWithImage(formData) {


    const form = document.getElementById('updateCouncil');
    // form.addEventListener('submit', handleUpdate);
    form.enctype = "multipart/form-data"
    form.method = "PUT"
    // data = null
    // const details = {
    //   id: id,
    //   title: title,
    //   content: content
    // };
    // console.log(data)
    // pending = true
    try {
      const response = await fetch(url, {
        method: 'PUT',
        // headers: {
        //   'Accept': '*/*',
        //   'Content-Type': 'multipart/form-data',
        // },
        // body: JSON.stringify(details),
        body: formData,
      });

      const json = await response.json()
      console.log(response.status)

      if (response.status === 401) {

        console.log(json?.message || json?.error)
      }

      if (response.status === 400 || response.status === 404) {
        console.log(json?.message || json?.error)
      } else if (response.status === 201) {
        console.log(json?.table || 'nothing')
        console.log(json?.message)
        // return data = json?.content
      }
      // pending = false
    } catch (error) {
      console.log(error.message + "from here")
    };
    // pending = false
  }

  return { updateDataWithImage, pending }

}

function deleteDataset(url) {

  async function deleteData(id, Id) {

    // data = null
    const details = {
      id: id,
      Id: Id,
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
    const latestTimeElement = document.getElementById('latestTime');

    if (latestTimeElement) {
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
      latestTimeElement.textContent = "last updated " + latestUpdateTime;
    } else {
      console.error('Element with ID "latestTime" not found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

// Function to populate data into the table
async function populateTable(data) {
  if (data) {
    // console.log(data)
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear existing table rows


    // Check if data is not undefined before using it
    // if (data) {
    data.map(data => {
      // console.log(data._id)
      const row = document.createElement('tr');
      row.classList.add(data._id);
      // const id =
      row.innerHTML = `
      <td colspan="1"  style="width: 20%; word-break: break-all;"> 
       ${data.title}
      </td>
      <td colspan="1" style="width: 45%; word-break: break-all;">
        ${data.content}
      </td>
      <td class="text-center"><button type="button" onclick="editRow('${data._id}')" class="text-center text-white"
      style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: green;"> 
        Edit
      </button></td>
      <td class="text-center"><button type="button" onclick="deleteRow('${data._id}')" class="text-center  text-white "
      style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: red;"> 
        Delete 
      </button></td>
    `;

      tableBody.appendChild(row);
    });
  } else {
    console.log('Content is undefined.');
  }
  // }
}

// Call the function to populate the table
populateTable();


// Function to handle image selection and preview
function handleImageChange(event) {
  const imageContainer = document.getElementById('imageContainer');
  const imageInput = event.target;
  const form = document.getElementById('updateCouncil');
  const MAX_FILE_SIZE = 1024 * 1024 * 1.5; // 1.5MB in bytes

  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    // console.log(file.size)
    if (file.size > MAX_FILE_SIZE) {
      alert('File size can not exceed 1.5MB. Please choose a smaller file.');
      imageInput.value = ''; // Reset the file input
      imagePreview.src = ''; // Clear the image preview
      return;
    }

    reader.onload = function (e) {
      // Create an image element
      const imagePreview = document.getElementById('imageU')
      // const imagePreview = document.createElement('img');
      imagePreview.src = e.target.result;
      // imagePreview.alt = 'Image Preview';
      imagePreview.style.maxWidth = '100%';
      imagePreview.style.maxHeight = '150px';

      // Clear previous image previews
      // imageContainer.style.;

      // Append the new image preview to the image container
      // imageContainer.appendChild(imagePreview);
    };

    // Read the selected image file
    reader.readAsDataURL(imageInput.files[0]);
  }

  const image = document.getElementById('image').files[0];

  // const image = document.getElementById('image').files[0];
  // const Id = document.getElementById('imageU').value
  // var id = document.getElementById('id').value
  console.log(image)
  form.enctype = "multipart/form-data"
  console.log(form.enctype)
  console.log(document.getElementById('imageU').value)
}

// Function to confirm edit data into the table
async function editRow(id) {
  const { dataSet } = fetchDataset(api)

  const { data } = await dataSet();
  // Find the corresponding object in the dataSet array
  const selectedData = data.find(data => data._id === id);


  // Access individual properties of the selected object
  const { title, content, _id, id: Id, images } = selectedData;

  document.getElementById("fetchCouncil").style.display = 'none'
  document.getElementById("updateCouncil").style.display = 'flex'

  // pass values from api to each element
  document.getElementById('title').value = title
  document.getElementById('content').value = content
  document.getElementById('imageU').value = Id
  document.getElementById('id').value = id || _id

  console.log(document.getElementById('imageU').value)

  const image = document.getElementById('image').files[0];

  // const image = document.getElementById('image').files[0];
  // const Id = document.getElementById('imageU').value
  // var id = document.getElementById('id').value
  console.log(image)
  // Set the src attribute of the img element to the URL of the image
  const imageUrl = `http://localhost:4242/api/image/upload/${images}`;
  document.getElementById('imageU').src = imageUrl;
}


// Function to confirm delete data into the table
async function deleteRow(id) {
  const { dataSet } = fetchDataset(api)

  const { data } = await dataSet()
  // Find the corresponding object in the dataSet array
  const selectedData = data.find(data => data._id === id);


  // Access individual properties of the selected object
  const { title, content, _id, id: Id, images } = selectedData;

  document.getElementById("fetchCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'flex'


  // pass values from api to each element
  document.getElementById('titleD').value = title
  document.getElementById('contentD').value = content
  document.getElementById('imageD').value = Id
  document.getElementById('idD').value = id || _id

  // Set the src attribute of the img element to the URL of the image
  const imageUrl = `http://localhost:4242/api/image/upload/${images}`;
  document.getElementById('imageD').src = imageUrl;
}

// Function to cancel any update/delete to the data into the table
function cancelBtn() {
  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
  // sessionStorage.setItem('id', JSON.stringify({ id }))
}

// Function to update a dataset on the table
async function handleUpdate() {
  const { updateData } = updateDataset(api)
  const { updateDataWithImage } = updateDatasetWithImage(Api)

  // const form = document.getElementById('updateCouncil');

  var title = document.getElementById('title').value
  var content = document.getElementById('content').value
  // const image = document.getElementById('image').value
  const image = document.getElementById('image').files[0];
  const Id = document.getElementById('imageU').value
  var id = document.getElementById('id').value


  // console.log(id + " " + image + " " + Id)
  try {
    if (image) {

      const formData = new FormData();
      formData.append('id', id);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('Id', Id);
      // form.enctype = "multipart/form-data"
      // console.log('yes image')
      await updateDataWithImage(formData)
      //   // // alert('Working:' + title + " " + content + " ")
      //   // // localStorage.setItem('jwt', JSON.stringify({ title: title }))

      document.getElementById("updateCouncil").style.display = 'none'
      document.getElementById("deleteCouncil").style.display = 'none'
      document.getElementById("fetchCouncil").style.display = 'flex'
      return
    }

    if (!image || image == undefined) {
      //   // console.log('no image')
      await updateData(id, title, content)

      document.getElementById("updateCouncil").style.display = 'none'
      document.getElementById("deleteCouncil").style.display = 'none'
      document.getElementById("fetchCouncil").style.display = 'flex'

      return
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
}

async function handleDelete() {
  const { deleteData } = deleteDataset(api)
  // const title = document.getElementById('titleD').value
  // const content = document.getElementById('contentD').value
  const id = document.getElementById('idD').value
  const Id = document.getElementById('imageD').value

  await deleteData(id, Id)
  // alert('Working:' + title + " " + content + " ")
  // After the asynchronous operation is complete, reload the page
  window.location.reload();

  // Optionally, you can also hide/show elements as needed
  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
}

