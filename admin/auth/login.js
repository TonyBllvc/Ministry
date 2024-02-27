const api = 'https://spiritan.vercel.app/api/users/auth'
// const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/index.html"
let data
let pending = false



document.addEventListener('DOMContentLoaded', async function () {
    const old = localStorage.getItem('userInfo')
    
    // console.log(!old)

    // if (!old === true) {
    //   window.location.href = "/spiritual/login.html"
    // }
    if (old.length > 0) {
        window.location.href = redirectUrl
    }
})

function handleLogin(url) {

    async function login(email, password) {
        // console.log('27')

        // data = null
        const details = {
            email: email,
            password: password
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

                alert(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                alert(json?.message || json?.error)
            } else if (response.status === 200) {
                // console.log(json?.content || 'nothing')
                // console.log(json?.message)
                localStorage.setItem('userInfo', JSON.stringify({ ...json }));
                // return data = json?.content
                console.log('doner')
                window.location.href = redirectUrl
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { login }

}

async function handleLog(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { login } = handleLogin(api)
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    try {
        await login(email, password);
        console.log('done')
        // window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error login: ', error);
        // Handle error, display message to the user, etc.
    }
}


function openEye() {

    document.getElementById('password').type = "text"
    document.getElementById('openEye').style.display = "none"
    document.getElementById('closeEye').style.display = "block"
}



function closeEye() {

    document.getElementById('password').type = "password"
    document.getElementById('openEye').style.display = "block"
    document.getElementById('closeEye').style.display = "none"

}