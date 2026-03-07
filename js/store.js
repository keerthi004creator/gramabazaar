// Development Mode
const DEV_MODE = true;

// Categories
const categories = [
  { id: 1, name: "Vegetables", image: "https://tse4.mm.bing.net/th/id/OIP.zKBIw8mx-mczZA6tdf7QvAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "Fruits", image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5347ce168045145.64340c191cbd5.jpg" },
  { id: 3, name: "Honey", image: "https://tse1.mm.bing.net/th/id/OIP.dIKOAqPQlywlk2u8gerrigHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 4, name: "Rice", image: "https://img.freepik.com/premium-photo/quality-premium-rice-design-concept-great-vector_1029476-123847.jpg" },
  { id: 5, name: "Dairy", image: "https://static.vecteezy.com/system/resources/previews/041/928/070/large_2x/dairy-product-horizontal-web-banner-farm-cheese-sour-cream-ice-cream-balls-yogurt-and-milk-in-packaging-liquid-splashes-illustration-for-header-website-cover-templates-in-modern-design-vector.jpg" }
];

// Products
const productsDB = [
  { id: 1, name: "Carrot", category_id: 1, price: 50, image_url: "https://static.vecteezy.com/system/resources/previews/030/663/871/large_2x/carrots-with-transparent-background-high-quality-ultra-hd-free-photo.jpg" },
  { id: 2, name: "Tomato", category_id: 1, price: 40, image_url: "https://images8.alphacoders.com/399/399003.jpg" },
  { id: 3, name: "Apple", category_id: 2, price: 100, image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" },
  { id: 4, name: "Banana", category_id: 2, price: 60, image_url: "https://www.geeky-gadgets.com/wp-content/uploads/2025/09/transform-photos-with-nano-banana.webp" },
  { id: 5, name: "Village Honey", category_id: 3, price: 250, image_url: "https://images.unsplash.com/photo-1587049352851-8d4e89133924" },
  { id: 6, name: "Basmati Rice", category_id: 4, price: 200, image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { id: 7, name: "Milk", category_id: 5, price: 50, image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b" },
  { id: 8, name: "Paneer", category_id: 5, price: 150, image_url: "https://facts.net/wp-content/uploads/2023/05/paneer-cheese.jpeg" }
];

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");
const cartCountElement = document.getElementById("cart-count");

// Update Cart Counter
function updateCartCount() {

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  if (cartCountElement) {
    cartCountElement.textContent = total;
  }

}

// Render Categories
categories.forEach(cat => {

  const card = document.createElement("div");

  card.className = "bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg text-center";

  card.innerHTML = `
  <img src="${cat.image}" class="h-24 w-full object-cover mb-2 rounded">
  <h2 class="font-bold">${cat.name}</h2>
  `;

  card.addEventListener("click", () => loadProducts(cat.id));

  categoriesContainer.appendChild(card);

});

// Load Products
function loadProducts(categoryId) {

  const filtered = productsDB.filter(p => p.category_id === categoryId);

  productsContainer.innerHTML = "";

  filtered.forEach(prod => {

    const card = document.createElement("div");

    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
    <img src="${prod.image_url}" class="h-40 w-full object-cover mb-2 rounded">
    <h3 class="font-bold">${prod.name}</h3>
    <p class="font-semibold">₹${prod.price}</p>
    <button class="mt-2 bg-green-600 text-white px-4 py-1 rounded">
    Add to Cart
    </button>
    `;

    const btn = card.querySelector("button");

    btn.addEventListener("click", () => addToCart(prod));

    productsContainer.appendChild(card);

  });

}

// Add to Cart
function addToCart(product) {

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  }
  else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert(product.name + " added to cart!");

}

updateCartCount();

if (DEV_MODE) {
  console.log("Development Mode Active");
}