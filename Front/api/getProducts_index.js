async function renderCards() {
    const containerOne = document.getElementById("cardsContainerOne");
    const containerTwo = document.getElementById("cardsContainerTwo");
    const containerThree = document.getElementById("cardsContainerThree");
    const containerFour = document.getElementById("cardsContainerFour");

    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();

    products.forEach(product => {
        const currentCategory = product.category_id;

        if (currentCategory === 1) {
            containerOne.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <article class="card p-3 d-flex flex-column align-items-center">
                    <div class="card-img w-50 h-50">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between w-100">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <p class="card-text text-center fw-bold text-success">
                            $${product.price.toLocaleString('es-CO')}
                        </p>
                        <a href="./details.html?id=${product.id}" class="btn btn-warning w-100 general-button">
                            Ver Detalles
                        </a>
                    </div>
                </article>
            </div>`;
        } else if (currentCategory === 2) {
            containerTwo.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <article class="card p-3 d-flex flex-column align-items-center">
                    <div class="card-img w-50 h-50">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between w-100">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <p class="card-text text-center fw-bold text-success">
                            $${product.price.toLocaleString('es-CO')}
                        </p>
                        <a href="./details.html?id=${product.id}" class="btn btn-warning w-100 general-button">
                            Ver Detalles
                        </a>
                    </div>
                </article>
            </div>`;
        } else if (currentCategory === 3) {
            containerThree.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <article class="card p-3 d-flex flex-column align-items-center">
                    <div class="card-img w-50 h-50">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between w-100">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <p class="card-text text-center fw-bold text-success">
                            $${product.price.toLocaleString('es-CO')}
                        </p>
                        <a href="./details.html?id=${product.id}" class="btn btn-warning w-100 general-button">
                            Ver Detalles
                        </a>
                    </div>
                </article>
            </div>`;
        } else if (currentCategory === 4) {
            containerFour.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <article class="card p-3 d-flex flex-column align-items-center">
                    <div class="card-img w-50 h-50">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between w-100">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <p class="card-text text-center fw-bold text-success">
                            $${product.price.toLocaleString('es-CO')}
                        </p>
                        <a href="./details.html?id=${product.id}" class="btn btn-warning w-100 general-button">
                            Ver Detalles
                        </a>
                    </div>
                </article>
            </div>`;
        } else {
        }
    });
}

renderCards();