const visitApi = 'https://spiritan.vercel.app/api/house_all/visits'

document.addEventListener('DOMContentLoaded', async function () {


  const { fetchNote } = handleLogVisit(visitApi)
    
  const { data,  dataTwo } = await fetchNote()
  
  if(data){
    const adminUseage = document.getElementById('adminUsers')
    const clientUseage = document.getElementById('clientUsers')

    console.log(data.length)
    
    adminUseage.textContent = data.length + " New Admin Visted Today"
    clientUseage.textContent = dataTwo.length + " New Users Visted Today"

  }
})

async function adminChannel(){

  const { fetchNote } = handleLogVisit(visitApi)
    
  const { data,  dataTwo } = await fetchNote()
  
  alert('working')
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
              // console.log(json?.Useage || 'nothing')
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


// document.addEventListener('DOMUseageLoaded', async function () {
//     const old = localStorage.getItem('userInfo')
//     // console.log(!old)

//     console.log('doned')
//     if (!old === true) {
//         window.location.href = "/spiritual/login.html"
//     }

//     // to check visits
//     if (typeof(Storage) !== "undefined") {
//         const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
//         let visitData = localStorage.getItem(currentDate);
      
//         if (!visitData) {
//           // If no visit data exists for the current day, initialize it
//           visitData = {
//             visitCount: 1,
//             devices: {}
//           };
//         } else {
//           // If visit data exists, parse it from JSON
//           visitData = JSON.parse(visitData);
//           // If the device has already visited today, exit
//           if (visitData.devices[navigator.userAgent]) {
//             console.log("Device already visited today.");
//             return;
//           }
//           // Otherwise, increment visit count
//           visitData.visitCount++;
//         }
      
//         // Get device information
//         const deviceInfo = {
//           name: navigator.userAgent,
//           // You can extract more specific information about the device if needed
//           // Example: model: "iPhone X"
//           //          type: "smartphone"
//         };
      
//         // Record device information
//         visitData.devices[navigator.userAgent] = deviceInfo;
      
//         // Save updated visit data back to localStorage
//         localStorage.setItem(currentDate, JSON.stringify(visitData));
//       } else {
//         console.log("Sorry! No Web Storage support..");
//       }
      
// })


