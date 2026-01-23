export default class Product {
    static db = "http://localhost:3000";
    static products = new Map();

    constructor(id, name, category_id, price, stock, description, images, product_state) {
        this.id = id;
        this.name = name;
        let validationCategory = Product.validation(category_id, 'categories');
        validationCategory.then(async () => {
            if (await validationCategory === true) {
                this.category_id = category_id;
            } else {
                this.category_id = null;
            }
        })
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.images = images;

        let validationState = Product.validation(category_id, 'product_state');
        validationState.then(async () => {
            if (await validationState === true) {
                this.product_state = product_state;
            } else {
                this.product_state = null;
            }
        })
    }

    static async getAllProduct() {
        try {
            const response = await fetch(Product.db + "/products/", {
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
        const product = Product.products.get(idProduct) ?? null; //Simple verification for product inside memory
        if(product !== null){
            return product
        }
        try {
            const response = await fetch(Product.db + "/products/" + idProduct, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            if (!response.ok) {
                return new Error(`HTTP Error! ${response.status}`);
            }
            p = await response.json();
            const product = new Product(p?.id, p?.name, p?.category_id, p?.price, p?.stock, p?.description, p?.images, p?.product_state);
            Product.products.set(product.id, product)
            return product;

        } catch (error) {
            console.error("error", error)
            return null
        }
    }

    static async createProduct(Prod) {
        try {
            const response = await fetch(Product.db + "/products/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Prod)
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

    static async editProductById(Prod, idProduct) {
        if(Prod.id !== idProduct){      //Simple verification for id
            return new Error("ERROR! Not the same id")  
        }
        try {
            const response = await fetch(Product.db + "/products/" + idProduct, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Prod)
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
            const response = await fetch(Product.db + "/products/" + idProduct, {
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

    static async validation(id, url) {
        if (url === 'categories') {
            if (id > 4 || id <= 0) {
                return false;

            }
        }
        if (url === 'product_state') {
            if (id > 3 || id <= 0) {

                return false;
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/${url}/${id}`);

            if (!response.ok) {

            }
            const data = await response.json();

            if (!data || Object.keys(data).length === 0) {
                // console.log('no hay referencia');
                return false;
            }
            // console.log(data);
            return true;

        } catch (error) {
            console.error('Error:', error.message);
            return false;
        }
    }

}