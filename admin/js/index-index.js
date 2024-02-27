
document.addEventListener('DOMContentLoaded', async function () {
    const old = localStorage.getItem('userInfo')
    // console.log(!old)

    console.log('doned')
    if (!old === true) {
        window.location.href = "/spiritual/login.html"
    }

    // to check visits
    if (typeof(Storage) !== "undefined") {
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        let visitData = localStorage.getItem(currentDate);
      
        if (!visitData) {
          // If no visit data exists for the current day, initialize it
          visitData = {
            visitCount: 1,
            devices: {}
          };
        } else {
          // If visit data exists, parse it from JSON
          visitData = JSON.parse(visitData);
          // If the device has already visited today, exit
          if (visitData.devices[navigator.userAgent]) {
            console.log("Device already visited today.");
            return;
          }
          // Otherwise, increment visit count
          visitData.visitCount++;
        }
      
        // Get device information
        const deviceInfo = {
          name: navigator.userAgent,
          // You can extract more specific information about the device if needed
          // Example: model: "iPhone X"
          //          type: "smartphone"
        };
      
        // Record device information
        visitData.devices[navigator.userAgent] = deviceInfo;
      
        // Save updated visit data back to localStorage
        localStorage.setItem(currentDate, JSON.stringify(visitData));
      } else {
        console.log("Sorry! No Web Storage support..");
      }
      
})

