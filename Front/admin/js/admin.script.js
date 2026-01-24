document.addEventListener("DOMContentLoaded", ()=>{
    const admin = JSON.parse(sessionStorage.getItem("user"))
    if(admin === null)location = "../"; //return to index if not user in sesionStorage
    if(admin.role !=="admin")location = "../"; //return to index if user is not admin
    

})