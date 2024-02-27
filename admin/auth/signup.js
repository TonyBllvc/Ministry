const api = 'https://spiritan.vercel.app/api/users'
// const secondApi = 'http://localhost:4242/api/structure_content'
const redirectUrl = "/spiritual/verify.html"
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

function handleReg(url) {

  async function signup(name, lastName, email, password) {
    // console.log('27')

    // data = null
    const details = {
      name: name,
      lastName: lastName,
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

        console.log(json?.message || json?.error)
        return
      }

      if (response.status === 400 || response.status === 404) {
        console.log(json?.message || json?.error)
        return
      } else if (response.status === 201) {
        // console.log(json?.content || 'nothing')
        // console.log(json?.message)
        // localStorage.setItem('userInfo', JSON.stringify({ ...json }));
        sessionStorage.setItem('email', email)
        // return data = json?.content
        console.log('doner')
        window.location.href = redirectUrl
        return
      }
      // pending = false
    } catch (error) {
      console.log(error.message)
    };
    // pending = false
  }

  return { signup }

}

async function handleRegister(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const { signup } = handleReg(api)


  var name = document.getElementById('name').value
  var lastName = document.getElementById('lastName').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var confirmPassword = document.getElementById('confirmPassword').value

  try {
    if (password !== confirmPassword) {
      return console.log("error: Passwords do not match")
    }
    await signup(name, lastName, email, password);
    // console.log('done')
    // window.location.href = redirectUrl;
  } catch (error) {
    console.error('Error signup: ', error);
    // Handle error, display message to the user, etc.
  }
}