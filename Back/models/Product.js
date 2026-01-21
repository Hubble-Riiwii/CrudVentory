import {Product_State} from "./Product_State.js";
import {Category} from "./Category.js";


export default class Product{
    static db = "http://localhost:3000";
    constructor(id, name, category_id, price, stock, description, images, product_state){
        this.id=id;
        this.name=name;
        this.category_id=Category;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.images = images;
        this.product_state = Product_State;
    }

    createProduct(Product){
        return new Product(Product.id, Product.name, Product.category_id, Product.price, Product.stock, Product.description, Product.images, Product.product_state);
    }
}