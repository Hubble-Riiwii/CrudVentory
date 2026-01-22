const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const getProductById =async (productId)=>{
    const respuesta = await fetch("http://localhost:3000/products/"+productId, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })
    const data = await respuesta.json();
    return data;
}
//console.log(product); // "3"
const product = await getProductById(productId);
document.querySelector(".name-product").textContent = product.name;