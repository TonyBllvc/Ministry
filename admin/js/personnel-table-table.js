const api = 'https://spiritan.vercel.app/api/personnel_table'
const redirectUrl = "/spiritual/personnel-table-index.html"
let data
let pending = false

function createDataset(url) {

    async function createData(name, email, phone) {
        // console.log('27')

        // data = null
        const details = {
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
                body: JSON.stringify(details)
                // body: formData,
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

// // Function to handle image selection and preview
// function handleImageChange(event) {
//     const imageContainer = document.getElementById('imageContainer');
//     const imageInput = event.target;

//     if (imageInput.files && imageInput.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             // Create an image element
//             const imagePreview = document.createElement('img');
//             imagePreview.src = e.target.result;
//             imagePreview.alt = 'Image Preview';
//             imagePreview.style.maxWidth = '100%';
//             imagePreview.style.maxHeight = '150px';

//             // Clear previous image previews
//             imageContainer.innerHTML = '';

//             // Append the new image preview to the image container
//             imageContainer.appendChild(imagePreview);
//         };

//         // Read the selected image file
//         reader.readAsDataURL(imageInput.files[0]);
//     }
// }

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { createData } = createDataset(api)
    // console.log('2')
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    // const image = document.getElementById('image').files[0]; // Get the uploaded image file
    // console.log('3')
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('office', office);
    // formData.append('email', email);
    // formData.append('phone', phone);
    // formData.append('image', image);

    try {
        // console.log(formData.image)
        // console.log(formData)
        await createData(name, email, phone)
        // await createData(formData);
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, display message to the user, etc.
    }
}