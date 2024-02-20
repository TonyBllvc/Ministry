// import { fetchContentDataset } from '../utility/api-calls.js';

const contentApi = 'https://spiritan-tonybllvc.vercel.app/api/house_all/organisation'
// const updateApi = 'https://spiritan-tonybllvc.vercel.app/api/jpic'
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

            const imageUrlTwo = `https://spiritan-tonybllvc.vercel.app/api/image/upload/${item.images}`;
            imageTwo.src = imageUrlTwo;

            // Create div element with class 'sermons-meta-data'
            const metaDataDivTwo = document.createElement('div');
            metaDataDivTwo.classList.add('sermons-meta-data', 'pt-3');
            console.log(item)

            // Create p elements for each piece of data
            const namePTwo = document.createElement('p');
            namePTwo.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span>${item.name}</span>`;

            const officePTwo = document.createElement('p');
            officePTwo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/><path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/></svg> Portfolio: <span>${item.office}</span>`;

            const emailPTwo = document.createElement('p');
            emailPTwo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg> Email: <span>${item.email}</span>`;

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

            const imageUrlTwo = `https://spiritan-tonybllvc.vercel.app/api/image/upload/${item.images}`;
            imageTwo.src = imageUrlTwo;

            // Create div element with class 'sermons-meta-data'
            const metaDataDivTwo = document.createElement('div');
            metaDataDivTwo.classList.add('sermons-meta-data', 'pt-3');
            console.log(item)

            // Create p elements for each piece of data
            const namePTwo = document.createElement('p');
            namePTwo.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span>${item.name}</span>`;

            const officePTwo = document.createElement('p');
            officePTwo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/><path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/></svg> Portfolio: <span>${item.portfolio}</span>`;

            const emailPTwo = document.createElement('p');
            emailPTwo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg> Email: <span>${item.email}</span>`;

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
