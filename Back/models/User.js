export default class User{
    static db = "http://localhost:3000";
    rol = "user";
    constructor(id, name, email, password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password = password;
    }
    //Add methods for buying and updating user information

    async buyProduct(idProduct){
        try{
            const response = await fetch(User.db+"/product/:"+idProduct,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(!response.ok){
                return new Error(`HTTP Error! ${response.status}`);
            }
            data = await response.json();
        } catch(error){
            console.error("error", error)
        }
    }
}