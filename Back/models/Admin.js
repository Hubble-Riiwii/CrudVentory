import User from "./User.js";
export default class Admin extends User{
    role = "admin";
    constructor(id, name, email, password){
        super(id, name, email, password);
    }
    createAdmin(User){
        //Update method to include the deletion of the prevous user, and update the JSON file accordingly
        return new Admin(User.id, User.name, User.email, User.password);
    }
    updateProduct(productId, {}){
        //update product
    }
}