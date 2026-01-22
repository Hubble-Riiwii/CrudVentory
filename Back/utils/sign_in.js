import User from "../models/User.js";
export const signIn= async (name, password, email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //Regex to verify if it's username or email
    if(!emailRegex.test(email)){
        return new Error("Email invalid")
    }
    try{
        const user = {
            name: name,
            email:email,
            password:password,
            role:"user"
        }
        const response = await fetch(User.db+"/users", {
            method:"POST",
            headers:{"Content-Type":"applicaton/json"},
            body:JSON.stringify(user)
        })
        if(!response.ok){
            return new Error(`HTTP ERROR!, ${response.status}`)
        }
        const data = await response.json();
        return new User(data?.id, data?.name, data?.email, data?.password)
    }catch(er){
        console.error("Error", er)
    }
}