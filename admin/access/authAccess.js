// No longer in use
function authe() {
    const old = localStorage.getItem('jwt')
    // console.log(old)
    if (!old) {
        return window.location.href = "/spiritual/index.html"
    }

    if (old) {
        return window.location.href = "/spiritual/JPIC-content.html"
    }
}