const api = 'https://spiritan-tonybllvc.vercel.app/api/support'
let data
let pending = false

function createDataset(url) {

    async function createData(title, content) {
        // console.log('27')

        // data = null
        const details = {
            title: title,
            content: content
        };
        // console.log(data)
        // pending = true
        try {
            const response = await fetch(url, {
                method: 'POST',
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
                // console.log(json?.content || 'nothing')
                // console.log(json?.message)
                // return data = json?.content
                window.location.href = "/spiritual/support-groups-index.html"
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { createData }

}

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { createData } = createDataset(api)
    // console.log('2')
    var title = document.getElementById('title').value
    var content = document.getElementById('content').value
    // console.log('3')

    try {
        await createData(title, content);
        window.location.href = "/spiritual/support-groups-index.html";
    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, display message to the user, etc.
    }
}


window.onload = function () {
    var textOne = document.getElementById('titleH')
    var textTwo = document.getElementById('contentH')
  
    textOne.value = ''
    textTwo.value = ''
  }