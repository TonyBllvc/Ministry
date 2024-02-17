// import { fetchContentDataset } from '../utility/api-calls.js';

const contentApi = 'http://localhost:4242/api/house_all/organisation'
// const updateApi = 'http://localhost:4242/api/jpic'
let data
let pending = false

// ensures the javascript runs before the dom is served
document.addEventListener('DOMContentLoaded', async function () {
    // Fetch dataset and populate table
    await fetchContentDataAndPopulateTable();
});

function fetchContentDataset(url) {

    async function contentDataSet() {

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
                return data = json
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
async function fetchContentDataAndPopulateTable() {
    try {
        const { contentDataSet } = fetchContentDataset(contentApi);
        const { data, dataTwo } = await contentDataSet();

        if (data || dataTwo) {
            populateTable(data, dataTwo);
        } else {
            console.log('No data available.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

function populateTable(data, dataTwo) {
    if (data) {
        const pageContentElement = document.getElementById('pageContent');

        data.forEach(item => {
            pageContentElement.classList.add('row', 'my-5');

            // Create div element with class 'col-12', 'col-sm-6', 'col-lg-4'
            const colDivTwo = document.createElement('div');
            colDivTwo.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'my-2', "mx-0.5");
            colDivTwo.style.boxShadow = '1.4px 5px 9px rgba(0, 0, 0, 0.2)'; // Add box shadow style here
            // colDivTwo.style.backgroundColor = 'blue'
            

            // Create div element with class 'single-latest-sermons', 'mb-100'
            const singleDivTwo = document.createElement('div');
            singleDivTwo.classList.add('single-latest-sermons', 'my-2');

            // // Create div element with class 'col-12', 'col-sm-6', 'col-lg-4'
            // const colDivTwo = document.createElement('div');
            // colDivTwo.classList.add('col-12', 'col-sm-6', 'col-lg-4');
            // colDivTwo.style.border = "2px solid black"
            // colDivTwo.style.padding = '15px'

            // // Create div element with class 'single-latest-sermons', 'mb-100'
            // const singleDivTwo = document.createElement('div');
            // singleDivTwo.classList.add('single-latest-sermons', 'mb-100');

            // Create div element with class 'sermons-thumbnail'
            const thumbnailDivTwo = document.createElement('div');
            thumbnailDivTwo.classList.add('sermons-thumbnail');

            // Create image element
            const imageTwo = document.createElement('img');
            imageTwo.alt = 'image_item';
            imageTwo.width = '100px';
            imageTwo.height = '200px';
            imageTwo.style.width = '100%';
            imageTwo.style.height = '200px';
            imageTwo.style.objectFit = 'cover';
            imageTwo.style.cursor = 'pointer';

            const imageUrlTwo = `http://localhost:4242/api/image/upload/${item.images}`;
            imageTwo.src = imageUrlTwo;

            // Create div element with class 'sermons-meta-data'
            const metaDataDivTwo = document.createElement('div');
            metaDataDivTwo.classList.add('sermons-meta-data', 'pt-3');
            console.log(item)

            // Create p elements for each piece of data
            const officePTwo = document.createElement('p');
            officePTwo.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Portfolio: <span>${item.office}</span>`;

            const namePTwo = document.createElement('p');
            namePTwo.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span>${item.name}</span>`;

            const emailPTwo = document.createElement('p');
            emailPTwo.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Email: <span>${item.email}</span>`;

            const phonePTwo = document.createElement('p');
            phonePTwo.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> Phone: <span>${item.phone}</span>`;

            // Append p elements to metaDataDiv
            metaDataDivTwo.appendChild(officePTwo);
            metaDataDivTwo.appendChild(namePTwo);
            metaDataDivTwo.appendChild(emailPTwo);
            metaDataDivTwo.appendChild(phonePTwo);


            thumbnailDivTwo.appendChild(imageTwo)

            // Append thumbnailDiv and metaDataDiv to singleDiv
            // singleDivTwo.appendChild(thumbnailDivTwo);
            singleDivTwo.appendChild(metaDataDivTwo);

            // Append singleDiv to colDiv
            colDivTwo.appendChild(singleDivTwo);

            // Append colDiv to the 'dataTwo' element in the HTML
            pageContentElement.appendChild(colDivTwo);
        });
    } else {
        console.log('Content is undefined.');
    }


    if (dataTwo) {
        const pageContentElement = document.getElementById('pageContentTwo');

        dataTwo.forEach(item => {
            pageContentElement.classList.add('row', 'my-5');
            // pageContentElement.style.border = "1px solid black"
            
            // Create div element with class 'col-12', 'col-sm-6', 'col-lg-4'
            const colDivTwo = document.createElement('div');
            colDivTwo.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'my-2', "mx-0.5");
            colDivTwo.style.boxShadow = '1.4px 5px 9px rgba(0, 0, 0, 0.2)'; // Add box shadow style here
            // colDivTwo.style.backgroundColor = 'blue'
            

            // Create div element with class 'single-latest-sermons', 'mb-100'
            const singleDivTwo = document.createElement('div');
            singleDivTwo.classList.add('single-latest-sermons', 'my-2');
            // singleDivTwo.style.backgroundColor = 'blue'

            // Create div element with class 'sermons-thumbnail'
            const thumbnailDivTwo = document.createElement('div');
            thumbnailDivTwo.classList.add('sermons-thumbnail');

            // Create image element
            const imageTwo = document.createElement('img');
            imageTwo.alt = 'image_item';
            imageTwo.width = '100px';
            imageTwo.height = '200px';
            imageTwo.style.width = '100%';
            imageTwo.style.height = '200px';
            imageTwo.style.objectFit = 'cover';
            imageTwo.style.cursor = 'pointer';

            const imageUrlTwo = `http://localhost:4242/api/image/upload/${item.images}`;
            imageTwo.src = imageUrlTwo;

            // Create div element with class 'sermons-meta-data'
            const metaDataDivTwo = document.createElement('div');
            metaDataDivTwo.classList.add('sermons-meta-data', 'pt-3');
            console.log(item)

            // Create p elements for each piece of data
            const officePTwo = document.createElement('p');
            officePTwo.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Portfolio: <span>${item.portfolio}</span>`;

            const namePTwo = document.createElement('p');
            namePTwo.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span>${item.name}</span>`;

            const emailPTwo = document.createElement('p');
            emailPTwo.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Email: <span>${item.email}</span>`;

            const phonePTwo = document.createElement('p');
            phonePTwo.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> Phone: <span>${item.phone}</span>`;

            // Append p elements to metaDataDiv
            metaDataDivTwo.appendChild(officePTwo);
            metaDataDivTwo.appendChild(namePTwo);
            metaDataDivTwo.appendChild(emailPTwo);
            metaDataDivTwo.appendChild(phonePTwo);


            thumbnailDivTwo.appendChild(imageTwo)

            // Append thumbnailDiv and metaDataDiv to singleDiv
            // singleDivTwo.appendChild(thumbnailDivTwo);
            singleDivTwo.appendChild(metaDataDivTwo);

            // Append singleDiv to colDiv
            colDivTwo.appendChild(singleDivTwo);

            // Append colDiv to the 'dataTwo' element in the HTML
            pageContentElement.appendChild(colDivTwo);
        });
    } else {
        console.log('Content is undefined.');
    }
}

// Call the function to populate the table
populateTable();
