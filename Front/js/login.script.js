import logIn from "./../../Back/utils/log_in.js";
const PasswordInput = document.getElementById("loginPassword");
const EmailInput = document.getElementById("loginEmail");

document.getElementById("loginForm").addEventListener("submit", async e=>{
    e.preventDefault();
    const user = await logIn(EmailInput.value, PasswordInput.value);
    if(user !== null){
        sessionStorage.setItem("user", JSON.stringify(user))
        location.reload()
    }
})
document.addEventListener("DOMContentLoaded", ()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user!==null){
        location = "./index.html"
    }
})