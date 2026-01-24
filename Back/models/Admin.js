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
    async updateDashboardStats(sta){
        console.log("Called")
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
            console.log(data)
        } catch(er){
            console.error("error", er)
            return er
        }
        console.log("Executed", data)
        for (const stat in sta){
            if(Object.hasOwn(data.stats,stat)){
                console.log("tiene", sta[stat])
                data.stats[stat] = sta[stat]
            }
        }
        try{
            const response = await fetch(User.db+"/dashboard", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data)
            })
            if(!response.ok){
                throw new Error(`HTTP ERROR! ${response.status}`)
            }
        } catch(er){
            console.error("error", er)
            return er
        }
        console.log("excuted", data)
    }
}