const navbar = document.getElementById("navbar")

displaynavbar()
function displaynavbar() {
  navbar.innerHTML = `
    <a href="/">View order</a>
    <a href="/input">Input</a>
  `
}
