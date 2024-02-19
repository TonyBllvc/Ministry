// import { fetchDataset } from '../utility/api-calls.js';

const api = 'https://spiritan.vercel.app/api/personnel_table'
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

function updateDataset(url) {

    async function updateData(id, name, email, phone) {

        // data = null
        const details = {
            id: id,
            name: name,
            email: email,
            phone: phone
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
                console.log(json?.name || 'nothing')
                console.log(json?.message)
                // return data = json?.name
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

    async function deleteData(id) {

        // data = null
        const details = {
          id: id,
        //   Id: Id,
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
                // console.log(json?.name || 'nothing')
                console.log(json?.message)
                // return data = json?.name
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

function populateTable(data) {
    if (data) {
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows

        data.map(data => {
            // console.log(data._id)
            const row = document.createElement('tr');
            row.classList.add(data._id);
            // const id =
            row.innerHTML = `
      <td colspan="1" style="width: 30%; word-break: break-all;">${data.name}</td>
      <td colspan="1" style="width: 30%; word-break: break-all;">${data.email}</td>
      <td colspan="1" style="width: 30%; word-break: break-all;">+234-${data.phone}</td>
      <td><button type="button" onclick="editRow('${data._id}')" class="text-center text-white"
      style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: green;"> Edit </button></td>
      <td><button type="button" onclick="deleteRow('${data._id}')" class="text-center text-white "
      style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: red;">  Delete </button></td>
    `;

            tableBody.appendChild(row);
        });
    } else {
        console.log('Content is undefined.');
    }
}

// Call the function to populate the table
populateTable();


// Function to confirm edit data into the table
async function editRow(id) {
    const { dataSet } = fetchDataset(api)

    const { data } = await dataSet();
    // Find the corresponding object in the dataSet array
    const selectedData = data.find(data => data._id === id);

    // Access individual properties of the selected object
    const { name, email, phone, _id } = selectedData;

    document.getElementById("fetchCouncil").style.display = 'none'
    document.getElementById("updateCouncil").style.display = 'flex'


    // pass values from api to each element
    document.getElementById('name').value = name
    document.getElementById('email').value = email
    document.getElementById('phone').value = phone
    document.getElementById('id').value = id || _id
}


// Function to confirm delete data into the table
async function deleteRow(id) {
    const { dataSet } = fetchDataset(api)

    const { data } = await dataSet()
    // Find the corresponding object in the dataSet array
    const selectedData = data.find(data => data._id === id);



    // Access individual properties of the selected object
    const { name, email, phone, _id,  } = selectedData;

    document.getElementById("fetchCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'flex'


    // pass values from api to each element
    document.getElementById('nameD').value = name
    document.getElementById('emailD').value = email
    document.getElementById('phoneD').value = phone
    // document.getElementById('imageD').value = Id
    document.getElementById('idD').value = id || _id

  // Set the src attribute of the img element to the URL of the image
//   const imageUrl = `https://spiritan.vercel.app/api/image/upload/${images}`;
//   document.getElementById('imageD').src = imageUrl;
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

    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value
    var id = document.getElementById('id').value

    await updateData(id, name, email, phone)


    document.getElementById("updateCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'none'
    document.getElementById("fetchCouncil").style.display = 'flex'
}



async function handleDelete() {
    const { deleteData } = deleteDataset(api)
    // const  = document.getElementById('titleD').value
    // const name = document.getElementById('contentD').value
    const id = document.getElementById('idD').value
    // const Id = document.getElementById('imageD').value

    await deleteData(id)
    // alert('Working:' +  + " " + name + " ")

    // After the asynchronous operation is complete, reload the page
    window.location.reload();

    document.getElementById("updateCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'none'
    document.getElementById("fetchCouncil").style.display = 'flex'
}
