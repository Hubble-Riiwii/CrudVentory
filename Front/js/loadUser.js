import User from "../../Back/models/User.js";
import Admin from "../../Back/models/Admin.js";
const rechargueUser = ()=>{
    const userData = JSON.parse(sessionStorage.getItem("user"))
    if(userData === null){
        return
    }
    switch (userData.role) {
        case "admin":
            return new User(userData?.id, userData?.name, userData?.email, userData?.password)
        default:
            return new Admin(userData?.id, userData?.userData, userData?.email, userData?.password)
    }
}
