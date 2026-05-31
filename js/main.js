async function init() {
    await fetchProduct();
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

init();