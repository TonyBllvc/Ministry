const api = 'https://spiritan.vercel.app/api/users/logout'
// const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/login.html"
let data
let pending = false



function handleLog(url) {

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
                    window.location.href = redirectUrl
                }
                // pending = false
            } catch (error) {
                console.log(error.message)
            };
            // pending = false
        }

        return { logout }

    }

async function handleLogout() {
        const { logout } = handleLog(api)

        try {
            await logout();
            // console.log('done')
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('Error logout: ', error);
            // Handle error, display message to the user, etc.
        }
    }