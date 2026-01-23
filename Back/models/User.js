import Product from "./Product.js";
export default class User{
    static db = "http://localhost:3000";
    static isListening = false;
    role = "user";
    constructor(id, name, email, password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password = password;
        User.initializeEventListeners();
    }
    //Add methods for buying and updating user information
    static initializeEventListeners(){
        if(User.isListening){
            return;
        }
    }
    async buyProduct(){
        const product = await Product.getProductById(idProduct);
    }
}