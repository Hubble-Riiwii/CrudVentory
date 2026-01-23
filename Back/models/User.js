import Product from "./Product.js";
export default class User{
    static db = "http://localhost:3000";
    static isListening = false;
    role = "user";
    constructor(id, name, email, password, cart = new Map()){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password = password;
        this.cart = cart; //Expected to include in constructor
    }
    static createUser({id, name, email, password, cart}){
        if (!id || !name || !email || !password || !cart) {
            console.error("Missing required user fields");
        }
        return new User(id, name, email, password, cart);
    }
    static async verifyEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //Regex to verify if it's username or email
        if(!emailRegex.test(email)){
            return false
        }
        try{
            const response = await fetch(User.db+"/users/?email="+email, {
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(!response.ok){
                throw new Error(`HTTP ERROR! ${response.status}`)
            }
            const data = await response.json();
            if(data.length===0){
                return true
            }
            return false
        } catch (err){
            console.error("error", err)
            return null;
        }
    }
    //Add methods for buying and updating user information
    async buyProduct(productId, amount){
        const product = await Product.getProductById(productId);
        if(product===null) return;
        //product.sell(amount)    //Expected method to reduce the product amount database 
    }
    
    async addProductToCart(productId, amount=1){
        amountInCart = this.cart.get(productId)
        if(amountInCart!==null){
            this.cart.set(productId, amountInCart+amount);
        }
        this.cart.set(productId, amount)
    }
}