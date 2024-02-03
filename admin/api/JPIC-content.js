// Example dataset with unique identifiers
const dataSet = [
  { _id: "10", title: "John Doe", content: "john@example.com", btn: "yes" },
  { _id: "22", title: "Jane Smith", content: "jane@example.com", btn: "yes" },
  { _id: "35", title: "Alice Johnson", content: "alice@example.com", btn: "yes" },
  { _id: "35", title: "Alice Johnson", content: "alice@example.com", btn: "yes" },
  { _id: "33", title: "Alice Johnson", content: "alice@example.com", btn: "yes" },
  { _id: "31", title: "Alice Johnson", content: "alice@example.com", btn: "yes" }
];

const dataSets = { _id: "10", title: "John Doe", content: "john@example.com", btn: "yes" }
// Function to populate data into the table
function populateTable() {
  const tableBody = document.querySelector('#dataTable tbody');

  dataSet.forEach(data => {
    // console.log(data._id)
    const row = document.createElement('tr');
    row.classList.add(data._id);
    // const id =
    row.innerHTML = `
      <td colspan="1"  style="width: 20%; word-break: break-all;"> 
       ${data.title}
      </td>
      <td colspan="1" 
      style="width: 20%; word-break: break-all;">
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
}

// Call the function to populate the table
populateTable();


// Function to confirm edit data into the table
function editRow(id) {
  // Find the corresponding object in the dataSet array
  const selectedData = dataSet.find(data => data._id === id);


  // Access individual properties of the selected object
  const { title, content } = selectedData;

  document.getElementById("fetchCouncil").style.display = 'none'
  document.getElementById("updateCouncil").style.display = 'flex'


  // pass values from api to each element
  document.getElementById('title').value = title
  document.getElementById('content').value = content

}


// Function to confirm delete data into the table
function deleteRow(id) {
  // Find the corresponding object in the dataSet array
  const selectedData = dataSet.find(data => data._id === id);


  // Access individual properties of the selected object
  const { title, content } = selectedData;

  document.getElementById("fetchCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'flex'


  // pass values from api to each element
  document.getElementById('titleD').value = title
  document.getElementById('contentD').value = content
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
  var title = document.getElementById('title').value
  var content = document.getElementById('content').value
  alert('Working:' + title + " " + content + " ")
  localStorage.setItem('jwt', JSON.stringify({ title: title }))

  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
}



function handleDelete() {
  const title = document.getElementById('titleD').value
  const content = document.getElementById('contentD').value

  alert('Working:' + title + " " + content + " ")


  document.getElementById("updateCouncil").style.display = 'none'
  document.getElementById("deleteCouncil").style.display = 'none'
  document.getElementById("fetchCouncil").style.display = 'flex'
}

