import { Product_State } from "./Product_State.js";
import { Category } from "./Category.js";


export default class Product {
    static db = "http://localhost:3000";
    static products = new Map();

    constructor(id, name, category_id, price, stock, description, images, product_state) {
        this.id = id;
        this.name = name;
        this.category_id = Category;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.images = images;
        this.product_state = Product_State;
    }

    // createProduct(Product) {
    //     return new Product(Product.id, Product.name, Product.category_id, Product.price, Product.stock, Product.description, Product.images, Product.product_state);
    // }

    static async getAllProduct() {
        try {
            const response = await fetch(this.db + "/products/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            if (!response.ok) {
                return new Error(`HTTP Error! ${response.status}`);
            }
            data = await response.json();
            for(const p of data){
                Product.products.set(p?.id, new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state));
            }
            return data.map(p => new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state));

        } catch (error) {
            console.error("error", error)
        }

    }

    static async getProductById(idProduct) {
        try {
            const response = await fetch(this.db + "/products/" + idProduct, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            if (!response.ok) {
                return new Error(`HTTP Error! ${response.status}`);
            }
            data = await response.json();

            return data.map(p => new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state));

        } catch (error) {
            console.error("error", error)
        }
    }

    static async createProduct(Product) {
        try {
            const response = await fetch(this.db + "/products/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Product)
            })
            if (!response.ok) {
                return new Error(`HTTP ERROR!, ${response.status}`)
            }
            data = await response.json();

            return data.map(p => new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state));

        } catch (error) {
            console.error("error", error)
        }
    }

    static async editProductById(Product, idProduct) {
        try {
            const response = await fetch(this.db + "/products/" + idProduct, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Product)
            })
            if (!response.ok) {
                return new Error(`HTTP ERROR!, ${response.status}`)
            }
            data = await response.json();

            return data.map(p => new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state));

        } catch (error) {
            console.error("error", error)
        }
    }

    static async deleteProductById(idProduct) {
        try {
            const response = await fetch(this.db + "/products/" + idProduct, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            if (!response.ok) {
                return new Error(`HTTP ERROR!, ${response.status}`)
            }
            return true;

        } catch (error) {
            console.error("error", error)
        }
    }
}