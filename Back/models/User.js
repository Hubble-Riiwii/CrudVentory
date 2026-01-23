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