const api = 'http://localhost:4242/api/structure_organisation'
const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/structure-organisation-index.html"
let data
let pending = false

function createDataset(url) {

    async function createData(formData) {
        // console.log('27')

        // data = null
        // const details = {
        //     office: office,
        //     name: name,
        //     email: email,
        //     phone: phone
        // };
        // console.log(data)
        // pending = true
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
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


function createContentDataset(url) {

    async function createContentData(formData) {
        // console.log('27')

        // data = null
        // const details = {
        //     title: title,
        //     content: content
        // };
        // console.log(data)
        // pending = true
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
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

    return { createContentData }

}

// Function to handle image selection and preview
function handleImageChange(event) {
    const imageContainer = document.getElementById('imageContainerH');
    const imageInput = event.target;

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Create an image element
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            imagePreview.alt = 'Image Preview';
            imagePreview.style.maxWidth = '100%';
            imagePreview.style.maxHeight = '150px';

            // Clear previous image previews
            imageContainer.innerHTML = '';

            // Append the new image preview to the image container
            imageContainer.appendChild(imagePreview);
        };

        // Read the selected image file
        reader.readAsDataURL(imageInput.files[0]);
    }
}

async function handleContentSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { createContentData } = createContentDataset(secondApi)
    // console.log('2')
    var title = document.getElementById('titleH').value
    var content = document.getElementById('contentH').value
    const image = document.getElementById('imageH').files[0]; // Get the uploaded image file
    // console.log('3')
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
        await createContentData(formData);
        window.location.href = redirectUrl;
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