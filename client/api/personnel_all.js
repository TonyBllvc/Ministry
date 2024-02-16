// import { fetchDataset } from '../utility/api-calls.js';

const api = 'http://localhost:4242/api/house_all/personnel'
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
        const { dataTwo, dataThree } = await dataSet();

        // console.log(dataTwo)
        // console.log(latestTimeElement)
        if (dataTwo || dataThree) {
            populateTable(dataTwo, dataThree);
        } else {
            console.log('No data available.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

async function populateTable(dataTwo, dataThree) {
    if (dataTwo || dataThree) {
        console.log(dataThree)
        console.log(dataTwo)
        // const pageContentElement = document.getElementById('data');
        const pageContentElementings = document.getElementById('dataTwo');
        const pageContentElements = document.getElementById('dataThree');

        // data.forEach((item, index) => {
        //     pageContentElement.classList.add('row');

        //     // Create the outer div with the determined class
        //     const outerDiv = document.createElement('div');
        //     outerDiv.classList.add('col-12')

        //     const sectionHeading = document.createElement('div');
        //     sectionHeading.classList.add('section-heading');

        //     const sermonTitle = document.createElement('h2');
        //     sermonTitle.textContent = item.title;

        //     const sermonContent = document.createElement('p');
            // namePTwo.style.fontWeight = 'bold';
        //     sermonContent.textContent = item.content;

        //     sectionHeading.appendChild(sermonTitle);
        //     sectionHeading.appendChild(sermonContent);

        //     outerDiv.appendChild(sectionHeading);

        //     pageContentElement.appendChild(outerDiv);
        // });
        // Assuming dataTwo is an array of objects
        dataTwo.forEach(item => {
            pageContentElementings.classList.add('row', 'mb-5');

            // Create div element with class 'col-12', 'col-sm-6', 'col-lg-4'
            const colDivTwo = document.createElement('div');
            colDivTwo.classList.add('col-12', 'col-md-6', 'col-lg-4', 'my-2', "mx-0.5");
            colDivTwo.style.boxShadow = '1.4px 5px 9px rgba(0, 0, 0, 0.2)'; // Add box shadow style here

            // Create div element with class 'single-latest-sermons', 'mb-100'
            const singleDivTwo = document.createElement('div');
            singleDivTwo.classList.add('single-latest-sermons', 'my-2');

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

            // Create p elements for each piece of data
            const namePTwo = document.createElement('p');
            namePTwo.style.fontWeight = 'bold';
            namePTwo.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span style='font-weight: 500;'>${item.name}</span>`;

            const emailPTwo = document.createElement('p');
            emailPTwo.style.fontWeight = 'bold';
            emailPTwo.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Email: <span style='font-weight: 500;'>${item.email}</span>`;

            const phonePTwo = document.createElement('p');
            phonePTwo.style.fontWeight = 'bold';
            phonePTwo.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> Phone: <span style='font-weight: 500;'>${item.phone}</span>`;

            // Append p elements to metaDataDiv
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
            pageContentElementings.appendChild(colDivTwo);
        });

        // Assuming dataThree is an array of objects
        dataThree.forEach(item => {
            pageContentElements.classList.add('row');

            // Create div element with class 'col-12', 'col-sm-6', 'col-lg-4'
            const colDivThree = document.createElement('div');
            // colDivThree.classList.add('col-12', 'col-sm-6', 'col-lg-4');
            colDivThree.classList.add('col-12', 'col-md-4', 'col-lg-4', 'my-2', "mx-0.5");
            colDivThree.style.boxShadow = '1.4px 5px 9px rgba(0, 0, 0, 0.2)'; // Add box shadow style here


            // Create div element with class 'single-latest-sermons', 'mb-100'
            const singleDivThree = document.createElement('div');
            singleDivThree.classList.add('single-latest-sermons', 'mb-100');

            // Create div element with class 'sermons-thumbnail'
            const thumbnailDivThree = document.createElement('div');
            thumbnailDivThree.classList.add('sermons-thumbnail');

            // Create image element
            const imageThree = document.createElement('img');
            imageThree.alt = 'image_item';
            imageThree.width = '100px';
            imageThree.height = '200px';
            imageThree.style.width = '100%';
            imageThree.style.height = '200px';
            imageThree.style.objectFit = 'cover';
            imageThree.style.cursor = 'pointer';

            const imageUrlThree = `http://localhost:4242/api/image/upload/${item.images}`;
            imageThree.src = imageUrlThree;

            // Create div element with class 'sermons-meta-data'
            const metaDataDivThree = document.createElement('div');
            metaDataDivThree.classList.add('sermons-meta-data', 'pt-3');

            // Create p elements for each piece of data
            const namePThree = document.createElement('p');
            namePThree.style.fontWeight = 'bold';
            namePThree.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> Name: <span style='font-weight: 500;'>${item.name} </span>`;

            const emailPThree = document.createElement('p');
            emailPThree.style.fontWeight = 'bold';
            emailPThree.innerHTML = `<i class="fa fa-tag" aria-hidden="true"></i> Email: <span style='font-weight: 500;'>${item.email}</span>`;

            const phonePThree = document.createElement('p');
            phonePThree.style.fontWeight = 'bold';
            phonePThree.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i> Phone: <span style='font-weight: 500;'>${item.phone}</span>`;

            // Append p elements to metaDataDiv
            metaDataDivThree.appendChild(namePThree);
            metaDataDivThree.appendChild(emailPThree);
            metaDataDivThree.appendChild(phonePThree);


            thumbnailDivThree.appendChild(imageThree)

            // Append thumbnailDiv and metaDataDiv to singleDiv
            // singleDivThree.appendChild(thumbnailDivThree);
            singleDivThree.appendChild(metaDataDivThree);

            // Append singleDiv to colDiv
            colDivThree.appendChild(singleDivThree);

            // Append colDiv to the 'dataThree' element in the HTML
            pageContentElements.appendChild(colDivThree);
        });

    } else {
        console.log('Content is undefined.');
    }
}

