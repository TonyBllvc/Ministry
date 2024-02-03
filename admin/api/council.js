// Example dataset with unique identifiers
const dataSet = [
  { "_id": "10", "office": "Office A", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "btn": "yes" },
  { "_id": "22", "office": "Office B", "name": "Jane Smith", "email": "jane@example.com", "phone": "987-654-3210", "btn": "yes" },
  { "_id": "35", "office": "Office C", "name": "Alice Johnson", "email": "alice@example.com", "phone": "555-555-5555", "btn": "yes" },
  { "_id": "35", "office": "Office d", "name": "Alice Johnson", "email": "alice@example.com", "phone": "555-555-5555", "btn": "yes" },
  { "_id": "33", "office": "Office e", "name": "Alice Johnson", "email": "alice@example.com", "phone": "555-555-5555", "btn": "yes" },
  { "_id": "31", "office": "Office d", "name": "Alice Johnson", "email": "alice@example.com", "phone": "555-555-5555", "btn": "yes" }
];

const dataSets = { "_id": "10", "office": "Office A", "name": "John Doe", "email": "john@example.com", "phone": "123-456-7890", "btn": "yes" }
// Function to populate data into the table
function populateTable() {
  const tableBody = document.querySelector('#dataTable tbody');

  dataSet.map(data => {
    // console.log(data._id)
    const row = document.createElement('tr');
    row.classList.add(data._id);
    // const id =
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.office}</td>
      <td>${data.email}</td>
      <td>${data.phone}</td>
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
  // Check if the object is found
  // if (selectedData) {
  //   // Access and log all properties of the selected object
  //   console.log("Selected Data:", selectedData);

  //   console.log("Office:", office);
  //   console.log("Name:", name);
  //   console.log("Email:", email); 
  //   console.log("Phone:", phone);

  //   // Now you can use these values as needed
  // } else {
  //   console.log("Data not found");
  // }

  document.getElementById("fetchCouncil").style.display = 'none'
  document.getElementById("updateCouncil").style.display = 'flex'


  // pass values from api to each element
  document.getElementById('name').value = name
  // document.getElementById('office').value = office
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

  // sessionStorage.setItem('id', JSON.stringify({ id }))
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
  var office = document.getElementById('office').value
  var name = document.getElementById('name').value
  var email = document.getElementById('email').value
  var phone = document.getElementById('phone').value

  alert('Working:' + " " + office + " " + name + " " + email + " " + phone)


  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
}



function handleDelete() {
  var office = document.getElementById('officeD').value
  var name = document.getElementById('nameD').value
  var email = document.getElementById('emailD').value
  var phone = document.getElementById('phoneD').value

  alert('Working:' + " " + office + " " + name + " " + email + " " + phone)


  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
}


// function editRow(id) {
//   // Get the table body
//   const tableBody = document.querySelector('#dataTable tbody');

//   // Get the index of the row that triggered the function
//   const index = dataSet.findIndex(data => data._id === id);
//   console.log('1')
//   // Check if the confirmation rows already exist for this row
//   const existingConfirmationRow = tableBody.children[index + 1];
//   const existingConfirmationButtonsRow = tableBody.children[index + 2];
//   console.log('2')
//   console.log(id.length)
//   // return
//   // If confirmation rows exist, remove them
//   if (existingConfirmationRow && existingConfirmationButtonsRow && id.length == 0) {
//     tableBody.removeChild(existingConfirmationRow);
//     tableBody.removeChild(existingConfirmationButtonsRow);
//     console.log('returned')
//     return; // Stop execution if confirmation rows were removed
//   }

//   console.log('3')
//   // Create the confirmation table rows
//   const confirmationRow = document.createElement('tr');
//   confirmationRow.classList.add('table-danger');
//   confirmationRow.innerHTML = `
//     <td colspan="6" class="text-center text-danger"
//         style="font-size: large; font-weight: 700;"> Are you sure you want to delete this?</td>
//   `;
//   console.log('4')
//   const confirmationButtonsRow = document.createElement('tr');
//   confirmationButtonsRow.classList.add('table-light');
//   confirmationButtonsRow.innerHTML = `
//     <td colspan="5">
//       <div class="d-flex justify-content-end">
//           <button class="text-center text-white"
//               style="width: 100px; padding: 6px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: large; font-weight: 600; border-radius: .4rem; border: none; background-color: green;"
//               onclick="confirmAction('${id}', true)">
//               Yes
//           </button>
//       </div>
//     </td>
//     <td colspan="2">
//       <div class="d-flex justify-content-end">
//           <button class="text-center text-white"
//               style="width: 100px; padding: 6px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: large; font-weight: 600; border-radius: .4rem; border: none; background-color: red;"
//               onclick="confirmAction('${id}', false)">
//               No
//           </button>
//       </div>
//     </td>
//   `;
//   console.log('5')
//   // Insert the confirmation table rows after the row that triggered the function
//   tableBody.insertBefore(confirmationRow, tableBody.children[index + 1]);
//   tableBody.insertBefore(confirmationButtonsRow, tableBody.children[index + 2]);
//   console.log('6')
// }
// function editRow(id, btn) {
//   console.log(id)
//   console.log(btn)
//   // Get the table body
//   const tableBody = document.querySelector('#dataTable tbody');

//   // Get the index of the row that triggered the function
//   const index = dataSet.findIndex(data => data._id === id);

//   // Check if the confirmation rows already exist for this row
//   const existingConfirmationRow = tableBody.children[index + 1];
//   const existingConfirmationButtonsRow = tableBody.children[index + 2];

//   // Check if the edit button was clicked again after the confirmation rows were added
//   if (existingConfirmationRow && existingConfirmationButtonsRow && id.length == 0) {
//     // Remove the confirmation rows and exit the function
//     tableBody.removeChild(existingConfirmationRow);
//     tableBody.removeChild(existingConfirmationButtonsRow);
//     return;
//   }

//   // Remove any existing confirmation rows from other rows
//   const allRows = tableBody.children;
//   for (let i = 0; i < allRows.length; i++) {
//     if (allRows[i].classList.contains('table-danger') || allRows[i].classList.contains('table-light')) {
//       tableBody.removeChild(allRows[i]);
//     }
//   }

//   // Create the confirmation table rows
//   const confirmationRow = document.createElement('tr');
//   confirmationRow.classList.add('table-danger');
//   confirmationRow.innerHTML = `
//     <td colspan="6" class="text-center text-danger"
//         style="font-size: large; font-weight: 700;"> Are you sure you want to delete this?</td>
//   `;

//   const confirmationButtonsRow = document.createElement('tr');
//   confirmationButtonsRow.classList.add('table-light');
//   confirmationButtonsRow.innerHTML = `
//     <td colspan="5">
//       <div class="d-flex justify-content-end">
//           <button class="text-center text-white"
//               style="width: 100px; padding: 6px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: large; font-weight: 600; border-radius: .4rem; border: none; background-color: green;"
//               onclick="confirmAction('${id}', true)">
//               Yes ${id}
//           </button>
//       </div>
//     </td>
//     <td colspan="2">
//       <div class="d-flex justify-content-end">
//           <button class="text-center text-white"
//               style="width: 100px; padding: 6px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: large; font-weight: 600; border-radius: .4rem; border: none; background-color: red;"
//               onclick="confirmAction('${id}', false)">
//               No
//           </button>
//       </div>
//     </td>
//   `;

//   // Insert the confirmation table rows after the row that triggered the function
//   tableBody.insertBefore(confirmationRow, tableBody.children[index + 1]);
//   tableBody.insertBefore(confirmationButtonsRow, tableBody.children[index + 2]);

//   // document.getElementsByTagName("button").disabled = true
//   // document.getElementsByTagName("button").style.backgroundColor = "gray"
// }

// function confirmAction(id, confirm) {
//   // Perform action based on confirmation (true for "Yes", false for "No")
//   if (confirm) {
//     // Perform delete or update action here
//     alert(`Confirmed action for id: ${id}`);
//   }

//   // Get the table body
//   const tableBody = document.querySelector('#dataTable tbody');

//   // Get the index of the row that triggered the function
//   const index = dataSet.findIndex(data => data._id === id);

//   // Remove the confirmation table rows
//   const confirmationRow = tableBody.children[index + 1];
//   const confirmationButtonsRow = tableBody.children[index + 2];
//   if (confirmationRow && confirmationButtonsRow) {
//     tableBody.removeChild(confirmationRow);
//     tableBody.removeChild(confirmationButtonsRow);
//   }
// }
