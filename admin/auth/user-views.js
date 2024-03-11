const apiii = 'https://spiritan.vercel.app/api/visit'

// ensures the javascript runs before the dom is served
document.addEventListener('DOMContentLoaded', async function () {

    const { fetchNote } = handleLogVisit(apiii)
    
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const { data } = await fetchNote()
    
    console.log(data)
    const inputString = navigator.userAgent;

    // Define the regular expression pattern
    const regexPattern = /\(([^)]+)\)/;
    // const regexPattern = /\((.*?)\)/;

    // Extract the match using regex
    const match = inputString.match(regexPattern);
    console.log(inputString.match(regexPattern))
    // Get device information
    // const deviceInfo = {
    //     name: navigator.userAgent,
    //     // You can extract more specific information about the device if needed
    //     // Example: model: "iPhone X"
    //     //          type: "smartphone"
    // };
    const agent = navigator.userAgent
    // // Record device information
    // visitData.devices[navigator.userAgent] = deviceInfo;
    if (match) {
        const { sendNote } = handleVisit(apiii)

        const extractedContent = match[1]; // Extracted content without the brackets

        if (data) {
            const currentDateItems = data.filter((item) => item?.date == currentDate && item?.name == extractedContent);


            if (currentDateItems.length > 0) {
                console.log('Data already exists for currentDate and extractedContent');
                return;
            }

            const otherItems = data.filter((item) => item?.date != currentDate || item?.name != extractedContent);
            if (otherItems) {
                try {
                    
                    console.log(agent)
                    await sendNote(currentDate, agent, extractedContent)
                    console.log('done')
                } catch (error) {
                    console.error('Error: ', error);

                }
            }
        } else {
            console.log('no content')
        }

    } else {
        console.log("No content within curved brackets found.");
    }
    // date.value = currentDate
    // device.value = deviceInfo.name
    // Save updated visit data back to localStorage
    // localStorage.setItem(currentDate, JSON.stringify(visitData));
    // } else {
    //     console.log("Sorry! No Web Storage support..");
    // }
})


function handleVisit(url) {

    async function sendNote(currentDate, agent, extractedContent) {
        console.log('27')

        // const name = match.join(""); // Convert the array to a string
        // data = null
        const details = {
            name: extractedContent,
            date: currentDate,
            device: agent,
        };
        console.log('data')
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
            console.log('sk')
            const json = await response.json()
            console.log(response.status)

            if (response.status === 401) {
                // await handleLogout(apiLogoutCheck).logout()
                // window.location.href = redirectUrlBack
                console.log(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                alert(json?.message || json?.error)
            } else if (response.status === 201) {
                // console.log(json?.content || 'nothing')
                // console.log(json?.message)
                console.log(json?.data)
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

    return { sendNote }

}


function handleLogVisit(url) {

    async function fetchNote() {
        // console.log('27')

        // data = null
        // console.log(data)
        // pending = true
        try {
            const response = await fetch(url);

            const json = await response.json()
            console.log(response.status)

            if (response.status === 401) {
                await handleLogout(apiLogoutCheck).logout()
                // window.location.href = redirectUrlBack
                // console.log(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                alert(json?.message || json?.error)
            } else if (response.status === 200) {
                // console.log(json?.content || 'nothing')
                // console.log(json?.message)
                console.log(json?.data)
                // localStorage.removeItem('userInfo');
                return data = json
                // console.log('doner')
            }
            // pending = false
        } catch (error) {
            console.log(error.message)
        };
        // pending = false
    }

    return { fetchNote }

}