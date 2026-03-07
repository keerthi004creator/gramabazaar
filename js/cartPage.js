const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

cartContainer.innerHTML="";

if(cart.length===0){

cartContainer.innerHTML="<p class='text-gray-500 text-center'>Your cart is empty.</p>";

totalPriceEl.textContent="";

return;

}

let total=0;

cart.forEach((item,index)=>{

const subtotal=item.price*item.quantity;

total+=subtotal;

const div=document.createElement("div");

div.className="p-4 bg-white rounded shadow flex items-center justify-between";

div.innerHTML=`

<div class="flex items-center space-x-4">

<img src="${item.image_url}" class="w-20 h-20 object-cover rounded">

<div>

<h3 class="font-bold">${item.name}</h3>

<p>Quantity: ${item.quantity}</p>

<p>₹${item.price}</p>

</div>

</div>

<button class="bg-red-600 text-white px-3 py-1 rounded remove-btn">

Remove

</button>

`;

div.querySelector(".remove-btn").addEventListener("click",()=>{

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

renderCart();

});

cartContainer.appendChild(div);

});

totalPriceEl.textContent="Total Price: ₹"+total;

}

checkoutBtn.addEventListener("click",()=>{

alert("Order placed successfully!");

cart=[];

localStorage.setItem("cart",JSON.stringify(cart));

renderCart();

});

renderCart();