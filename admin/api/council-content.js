// import { fetchContentDataset } from '../utility/api-calls.js';

const contentApi = 'http://localhost:4242/api/structure_content'
// const updateApi = 'http://localhost:4242/api/jpic'
let dataContent
let pending = false

// ensures the javascript runs before the dom is served
document.addEventListener('DOMContentLoaded', async function () {
    // Fetch dataset and populate table
    await fetchContentDataAndPopulateTable();
});

function fetchContentDataset(url) {

    async function contentDataSet() {

        // dataContent = null
        // // const details = {
        // //     access: access,
        // // };
        console.log('d')
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
                console.log(json?.latest || 'nothing')
                return dataContent = json
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
        const latestTime = document.getElementById('lateTime');
        console.log('jbd')
        if (latestTime) {
            const { contentDataSet } = fetchContentDataset(contentApi);
            const { dataContent, latest } = await contentDataSet();

            // console.log(dataContent)
            // console.log(latestTime)
            if (dataContent) {
                populateTable(dataContent);
            } else {
                console.log('No dataContent available.');
            }

            // Update the latestTime div element with the latest update time
            latestTime.textContent = "last updated " + latest;
        } else {
            console.error('Element with ID "latestTime" not found');
        }
    } catch (error) {
        console.error('Error fetching dataContent:', error);
    }

}

function populateTable(dataContent) {
    if (dataContent) {
        const pageContentElement = document.getElementById('pageContent');

        console.log(dataContent)
        dataContent.map(dataContent => {
            pageContentElement.querySelector('h1').textContent = dataContent.title;
            pageContentElement.querySelector('p').textContent = dataContent.content;
            // }
            // Set the src attribute of the image
            const imageUrl = `http://localhost:4242/api/image/upload/${dataContent.images}`;
            // imagePreview.setAttribute('src', imageUrl);
            document.getElementById('imageC').src = imageUrl;

            // Hide the image if no image is available
            if (!dataContent.images) {
                document.getElementById('imageC').style.display = 'none';
            }
        });
    } else {
        console.log('Content is undefined.');
    }
}

// Call the function to populate the table
populateTable();
