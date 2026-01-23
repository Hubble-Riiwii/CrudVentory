import User from "./User.js";
export default class Admin extends User{
    role = "admin";
    constructor(id, name, email, password){
        super(id, name, email, password);
        delete this.cart; //removes the cart property, as admins should not have
    }
    static createAdmin({id, name, email, password} = {}){
        try{
            if (!id || !name || !email || !password) {
                throw new Error("Missing required user fields");
            }
            return new Admin(id, name, email, password);
        } catch (err){
            console.error("error", err)
            return null;
        }
    }
    async grantAdminPermisions(user){
        if(user instanceof User){
            console.warn("NOT A USER OBJECT")
            return null
        }
        const newAdmin =  new Admin(user.id, user.name, user.email, user.password);
        try{
            const response = await fetch(User.db+"/users/"+user.id, {
                method: "PUT", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(newAdmin)
            });
            if(!response.ok){
                throw new Error(`HTTP Error! ${response.status}`)
            }
            return await response.ok;
        } catch(err){
            console.error("error", err);
            return null;
        }
    }
    updateProduct(productId, {name, category_id, price, stock, description, images, product_state}){
        //update product

    }
}