import supabase from "./supabaseClient.js";

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupSearch();
  setupCategoryFilter();
});

// ----------------------------
// Load products from Supabase
// ----------------------------
async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error loading products:", error);
    return;
  }

  allProducts = data || [];
  displayProducts(allProducts);
}

// ----------------------------
// Display products
// ----------------------------
function displayProducts(products) {

  const container = document.getElementById("product-list");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    const image = product.image || "https://via.placeholder.com/300";
    const rating = product.rating || 4;

    const productHTML = `
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">

        <img src="${image}" 
        class="w-full h-40 object-cover rounded">

        <h3 class="text-lg font-bold mt-2">
        ${product.name}
        </h3>

        <p class="text-green-700 font-semibold">
        ₹${product.price}
        </p>

        <p class="text-yellow-500">
        ⭐ ${rating}
        </p>

        <a href="product.html?id=${product.id}"
        class="text-blue-600 block mt-2">
        View Details
        </a>

        <button
        onclick='addToCart(${JSON.stringify(product)})'
        class="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">
        Add to Cart
        </button>

      </div>
    `;

    container.insertAdjacentHTML("beforeend", productHTML);

  });

}

// ----------------------------
// Search Function
// ----------------------------
function setupSearch() {

  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(text)
    );

    displayProducts(filtered);

  });

}

// ----------------------------
// Category Filter
// ----------------------------
function setupCategoryFilter() {

  const categoryFilter = document.getElementById("categoryFilter");

  if (!categoryFilter) return;

  categoryFilter.addEventListener("change", () => {

    const category = categoryFilter.value;

    const filtered = category
      ? allProducts.filter(p => p.category === category)
      : allProducts;

    displayProducts(filtered);

  });

}

// ----------------------------
// Add to Cart (LocalStorage)
// ----------------------------
function addToCart(product) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart");

}

window.addToCart = addToCart;