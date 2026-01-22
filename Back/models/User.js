import Product from "./Product";
export default class User{
    static db = "http://localhost:3000";
    role = "user";
    constructor(id, name, email, password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password = password;
    }
    //Add methods for buying and updating user information

    async buyProduct(idProduct){
        const product = await Product.getProductById(idProduct);
    }
}