const api = 'http://localhost:4242/api/structure_organisation'
const redirectUrl = "/spiritual/structure-organisation-index.html"
let data
let pending = false

function createDataset(url) {

    async function createData(office, name, email, phone) {
        // console.log('27')

        // data = null
        const details = {
            office: office,
            name: name,
            email: email,
            phone: phone
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
                window.location.href = redirectUrl
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
    const name = document.getElementById('name').value
    const office = document.getElementById('office').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    // console.log('3')

    try {
        await createData(office, name, email, phone);
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, display message to the user, etc.
    }
}