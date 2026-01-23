const verifyLogin = ()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user===null){
        return false
    }
    return true
}
let isLogged = verifyLogin();
const nav = document.getElementById("nav-menu-box");
let link = isLogged ? `<a href="#" class="nav-menu-txt">Carrito</a>` : `<a href="./log_in.html" class="nav-menu-txt">Log In</a>`;
const navElement = document.createElement("div"); navElement.classList.add("nav-menu-txt-box"); navElement.innerHTML = link;
nav.appendChild(navElement)

