const api = 'https://spiritan.vercel.app/api/users/auth'
// const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/index.html"
let data
let pending = false



document.addEventListener('DOMContentLoaded', async function () {
    const old = localStorage.getItem('userInfo')
    const date = document.getElementById('date')
    const device = document.getElementById('device')

    if (old) {
        window.location.href = redirectUrl
    }

    // to check visits
    if (typeof (Storage) !== "undefined") {
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        // let visitData = localStorage.getItem(currentDate);
        // console.log(currentDate)
        // if (!visitData) {
        // If no visit data exists for the current day, initialize it
        visitData = {
            visitCount: 1,
            devices: {}
        };
        // } else {
        //   // If visit data exists, parse it from JSON
        //   visitData = JSON.parse(visitData);
        //   // If the device has already visited today, exit
        //   if (visitData.devices[navigator.userAgent]) {
        //     console.log("Device already visited today.");
        //     return;
        //   }
        //   // Otherwise, increment visit count
        //   visitData.visitCount++;
        // }

        // Get device information
        const deviceInfo = {
            name: navigator.userAgent,
            // You can extract more specific information about the device if needed
            // Example: model: "iPhone X"
            //          type: "smartphone"
        };

        // Record device information
        visitData.devices[navigator.userAgent] = deviceInfo;

        date.value = currentDate
        device.value = deviceInfo.name
        // Save updated visit data back to localStorage
        // localStorage.setItem(currentDate, JSON.stringify(visitData));
    } else {
        console.log("Sorry! No Web Storage support..");
    }

})

function handleLogin(url) {

    async function login(email, password, date, device) {
        // console.log('27')

        // data = null
        const details = {
            email: email,
            password: password,
            date: date,
            device: device
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
    const date = document.getElementById('date').value
    const device = document.getElementById('device').value

    try {
        await login(email, password, date, device);
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