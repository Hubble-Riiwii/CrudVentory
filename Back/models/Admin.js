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
    async deleteUser(id){
        try{
            const response = await fetch(`${User.db}/users/${id}`, { 
                method: 'DELETE' 
            });
            if(!response.ok){
                throw new Error(`HTTP ERROR!! ${response.status}`)
            }
            const data = await response.json()
        } catch (er){
            console.error("error", er)
            return er;
        } finally{
            User.users.delete(id);
            let total_users = User.users.size
            return this.updateDashboardStats({"total_users": total_users});
        }
    }
    async getDashboardStats(sta){
        let data;
        try{
            const response = await fetch(User.db+"/dashboard/", {
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(!response.ok){
                throw new Error(`HTTP ERROR! ${response.status}`)
            }
            data = await response.json();
            return data.stats;
        } catch(er){
            console.error("error", er)
            return er
        }
    }
    async updateDashboardStats(statsUpdate){
        try{
            const stats = await this.getDashboardStats();
            const updatedStats = {...stats, ...statsUpdate}
            const response = await fetch(User.db+"/dashboard", {
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({stats: updatedStats})
            })
            return await response.json();
        } catch(er){
            console.error("error", er)
            return er
        }
    }
}