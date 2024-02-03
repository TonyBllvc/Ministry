// Example dataset with unique identifiers
const dataSet = [
    { _id: "10", name: "John Doe", email: "john@example.com", phone: "123-456-7890", btn: "yes" },
    { _id: "22", name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", btn: "yes" },
    { _id: "35", name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", btn: "yes" },
    { _id: "35", name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", btn: "yes" },
    { _id: "33", name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", btn: "yes" },
    { _id: "31", name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", btn: "yes" }
];

const dataSets = { _id: "10", name: "John Doe", email: "john@example.com", phone: "123-456-7890", btn: "yes" }
// Function to populate data into the table
function populateTable() {
    const tableBody = document.querySelector('#dataTable tbody');

    dataSet.forEach(data => {
        // console.log(data._id)
        const row = document.createElement('tr');
        row.classList.add(data._id);
        // const id =
        row.innerHTML = `
        <td colspan="1"  style="width: 20%; word-break: break-all;">${data.name}</td>
        <td colspan="1"  style="width: 20%; word-break: break-all;">${data.email}</td>
        <td colspan="1"  style="width: 20%; word-break: break-all;">${data.phone}</td>
        <td><button type="button" onclick="editRow('${data._id}')" class="text-center text-white"
        style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: green;"> Edit </button></td>
        <td><button type="button" onclick="deleteRow('${data._id}')" class="text-center text-white "
        style="width: 70px; padding: 3px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: medium; font-weight: 500; border-radius: .4rem; border: none;  background-color: red;">  Delete </button></td>
      `;

        tableBody.appendChild(row);
    });
}

// Call the function to populate the table
populateTable();


// Function to confirm edit data into the table
function editRow(id) {
    // Find the corresponding object in the dataSet array
    const selectedData = dataSet.find(data => data._id === id);


    // Access individual properties of the selected object
    const { name, email, phone } = selectedData;

    document.getElementById("fetchCouncil").style.display = 'none'
    document.getElementById("updateCouncil").style.display = 'flex'


    // pass values from api to each element
    document.getElementById('name').value = name
    document.getElementById('email').value = email
    document.getElementById('phone').value = phone
}


// Function to confirm delete data into the table
function deleteRow(id) {
    // Find the corresponding object in the dataSet array
    const selectedData = dataSet.find(data => data._id === id);


    // Access individual properties of the selected object
    const { name, email, phone } = selectedData;

    document.getElementById("fetchCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'flex'


    // pass values from api to each element
    document.getElementById('nameD').value = name
    document.getElementById('emailD').value = email
    document.getElementById('phoneD').value = phone
}

// Function to cancel any update/delete to the data into the table
function cancelBtn() {
    document.getElementById("updateCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'none'
    document.getElementById("fetchCouncil").style.display = 'flex'
    // sessionStorage.setItem('id', JSON.stringify({ id }))
}

// Function to update a dataset on the table
function handleUpdate() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value

    alert('Working:' + name + " " + email + " " + phone)


    document.getElementById("updateCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'none'
    document.getElementById("fetchCouncil").style.display = 'flex'
}



function handleDelete() {
    var name = document.getElementById('nameD').value
    var email = document.getElementById('emailD').value
    var phone = document.getElementById('phoneD').value

    alert('Working:' + name + " " + email + " " + phone)


    document.getElementById("updateCouncil").style.display = 'none'
    document.getElementById("deleteCouncil").style.display = 'none'
    document.getElementById("fetchCouncil").style.display = 'flex'
}

