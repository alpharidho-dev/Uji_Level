async function init() {
    product = await fetchProduct();
    if (product) {
        renderProduct(product);
    }
}

async function fetchProduct() {
  try {
        const response = await fetch("product.json");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
        console.log("Response OK");
        const dataProduct = await response.json();
        // console.log("Data Product:", dataProduct);
        return dataProduct; }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

async function renderProduct(dataProduct) {
    const productContainer = document.getElementById("product-container");

    // Clear existing content
    productContainer.innerHTML = "";

    // Create product elements
    dataProduct.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

init();