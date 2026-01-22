import User from "./User.js";
export default class Admin extends User{
    role = "admin";
    constructor(id, username, email, password){
        super(id, username, email, password);
    }
    createAdmin(User){
        //Update method to include the deletion of the prevous user, and update the JSON file accordingly
        return new Admin(User.id, User.username, User.email, User.number, User.age);
    }
    
}