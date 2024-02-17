const api = 'https://spiritan.vercel.app/api/jpic'
let data
let pending = false

function createDataset(url) {

    async function createData(formData) {
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
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(details)
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
                window.location.href = "/spiritual/JPIC-index.html"
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { createData }

}

// Function to handle image selection and preview
function handleImageChange(event) {
    const imageContainer = document.getElementById('imageContainer');
    const imageInput = event.target;
    const MAX_FILE_SIZE = 1024 * 1024 * 1.5; // 1.5MB in bytes

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();
    
        // console.log(file.size)
        if (file.size > MAX_FILE_SIZE) {
          alert('File size can not exceed 1.5MB. Please choose a smaller file.');
          imageInput.value = ''; // Reset the file input
          imagePreview.src = ''; // Clear the image preview
          return;
        }

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


async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { createData } = createDataset(api)
    // console.log('2')
    var title = document.getElementById('title').value
    var content = document.getElementById('content').value
    const image = document.getElementById('image').files[0]; // Get the uploaded image file
    // console.log('3')
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
        // console.log(formData.image)
        // console.log(formData)
        // await createData(title, content);
        await createData(formData);
        window.location.href = "/spiritual/JPIC-index.html";
    } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, display message to the user, etc.
    }
}

window.onload = function () {
    var textOne = document.getElementById('title')
    var textTwo = document.getElementById('content')

    textOne.value = ''
    textTwo.value = ''
}