const apii = 'https://spiritan.vercel.app/api/users/verify'
const redirectUrlBack = "/spiritual/login.html"
const apiLogoutCheck = 'https://spiritan.vercel.app/api/users/logout'

document.addEventListener('DOMContentLoaded', async function () {
    const old = localStorage.getItem('userInfo')
    // console.log(!old)

    if (!old) {
        window.location.href = "/spiritual/login.html"
    }

    console.log(window.navigator.userActivation)
    console.log(navigator.userAgent)
    // Sample input string
    const inputString = navigator.userAgent;

    // Define the regular expression pattern
    const regexPattern = /\((.*?)\)/;

    // Extract the match using regex
    const match = inputString.match(regexPattern);

    // Check if a match is found
    if (match) {
        // Extract the content within the first pair of curved brackets
        const extractedContent = match[1];

        // Output the extracted content

        const { verifyLoggin } = handleLog(apii)

        try {
            // await handleLog(apii).verifyLoggin(extractedContent);

            await verifyLoggin(extractedContent)
            // await verifyLoggin('Windows NT 10.0; Win64; x64');
            // console.log('done')
            // window.location.href = redirectUrlBack;
        } catch (error) {
            console.error('Error verifyLoggin: ', error);
            // Handle error, display message to the user, etc.
        }
        // console.log("Extracted Content:", extractedContent);
    } else {
        alert("No content found.");
    }
    // to check visits
    // if (typeof(Storage) !== "undefined") {
    // const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    // let visitData = localStorage.getItem(currentDate);

    // Get device information
    // const deviceInfo = {
    //   name: navigator.userAgent,
    //   // You can extract more specific information about the device if needed
    //   // Example: model: "iPhone X"
    //   //          type: "smartphone"
    // };

    // // Record device information
    // visitData.devices[navigator.userAgent] = deviceInfo;

    // Save updated visit data back to localStorage
    //     localStorage.setItem(currentDate, JSON.stringify(visitData));
    //   } else {
    //     console.log("Sorry! No Web Storage support..");
    //   }

})


function handleLog(url) {

    async function verifyLoggin(extractedContent) {
        // console.log('27')

        // data = null
        const details = {
            device: extractedContent,
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
                await handleLogout(apiLogoutCheck).logout()
                // window.location.href = redirectUrlBack
                // console.log(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                alert(json?.message || json?.error)
            } else if (response.status === 202) {
                // console.log(json?.content || 'nothing')
                // console.log(json?.message)
                console.log(json?.device)
                // localStorage.removeItem('userInfo');
                // // return data = json?.content
                // console.log('doner')
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { verifyLoggin }

}

function handleLogout(url) {

    async function logout() {
        // console.log('27')

        // data = null
        // const details = {
        //     email: email,
        //     password: password
        // };
        // console.log(data)
        // pending = true
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(details)
                // body: formData,
            });

            const json = await response.json()
            console.log(response.status)

            if (response.status === 401) {

                console.log(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                console.log(json?.message || json?.error)
            } else if (response.status === 202) {
                // console.log(json?.content || 'nothing')
                console.log(json?.message)
                localStorage.removeItem('userInfo');
                // return data = json?.content
                console.log('doner')
                window.location.href = redirectUrlLogin
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { logout }

}