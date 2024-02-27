const api = 'https://spiritan.vercel.app/api/users/validate'
const apiGen = 'https://spiritan.vercel.app/api/users/generate'
// const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/login.html"
let data
let pending = false

document.addEventListener('DOMContentLoaded', function () {

    const btnRegen = document.getElementById('btnRegen');
    const btnVerify = document.getElementById('btnVerify');
    const email = sessionStorage.getItem('email');

    const emailName = document.getElementById('emailName')

    const old = localStorage.getItem('userInfo')

    // console.log(!old)

    // if (!old === true) {
    //   window.location.href = "/spiritual/login.html"
    // }
    if (old.length > 0) {
        window.location.href = redirectUrl
    }

    // setCountdownTimer()
    emailName.textContent = email
    emailName.style.paddingRight = '3px'


    btnRegen.style.display = 'flex';
    btnVerify.disabled = true;
})

function setCountdownTimer() {
    // Get the countdown element
    const countdownElement = document.getElementById('countdown');
    const btnVerify = document.getElementById('btnVerify');
    const btnRegen = document.getElementById('btnRegen');

    // Set the target time to 1 minute and 55 seconds from now
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + 118); // 1 minute = 60 seconds, so 1 minute 55 seconds = 115 seconds

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        // Calculate the remaining time
        const currentTime = new Date();
        const remainingTime = Math.max(targetTime - currentTime, 0);

        // Convert remaining time to minutes and seconds
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        // Format the remaining time as mm:ss
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update the countdown element
        countdownElement.textContent = formattedTime;

        // If the remaining time is 0, stop the countdown
        if (remainingTime === 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none'
            btnVerify.disabled = true;
            btnRegen.style.display = 'flex'; // Show the btnRegen button
        } else {
            btnVerify.disabled = false;
            btnRegen.style.display = 'none'; // Hide the btnRegen button
            countdownElement.style.display = "flex"
        }
    }

    // Initial update of the countdown
    // updateCountdown();
};

// function generateOtp() {
// };


function handleValidate(url) {

    async function validate(email, number) {
        // console.log('27')

        // data = null
        const details = {
            email: email,
            code: number
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
                alert(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {

                console.log(json?.message || json?.error)
                alert(json?.message || json?.error)
            } else if (response.status === 200) {
                // console.log(json?.content || 'nothing')
                console.log(json?.message)
                // return data = json?.content
                sessionStorage.removeItem('email')
                console.log('doner')
                window.location.href = redirectUrl
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { validate }

}


function generateOtp(url) {

    async function generate(email) {
        // console.log('27')

        // data = null
        const details = {
            email: email
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
                // alert(json?.code)
                // return data = json?.content
                console.log(json?.code)
                setCountdownTimer()
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { generate }

}

async function handleGenOtp() {
    const { generate } = generateOtp(apiGen)
    const email = sessionStorage.getItem('email')

    try {

        await generate(email)
        // console.log('done')
        // window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error signup: ', error);
        // Handle error, display message to the user, etc.
    }
}

async function handleValOTP(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const { validate } = handleValidate(api)

    const email = sessionStorage.getItem('email')
    var number = document.getElementById('number').value

    try {

        await validate(email, number)
        // console.log('done')
        // window.location.href = redirectUrl;

    } catch (error) {
        console.error('Error signup: ', error);
        // Handle error, display message to the user, etc.
    }
}