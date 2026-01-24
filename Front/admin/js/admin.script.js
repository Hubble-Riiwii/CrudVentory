import Admin from "../../../Back/models/Admin.js";
document.addEventListener("DOMContentLoaded", ()=>{
    const admin = JSON.parse(sessionStorage.getItem("user"))
    if(admin === null)location = "../"; //return to index if not user in sesionStorage
    if(admin.role !=="admin")location = "../"; //return to index if user is not admin
})
const admin = Admin.createAdmin(JSON.parse(sessionStorage.getItem("user")))
await Admin.fetchUsers();
console.log(Admin.users)
document.addEventListener("click", async e=>{
    let attribute = e.target.getAttribute("data-user-id")
    if(attribute){
        console.log(await admin.deleteUser(attribute))
    }
})
