import supabase from './supabaseClient.js'

const params=new URLSearchParams(window.location.search)

const id=params.get("id")

async function loadProduct(){

const {data}=await supabase
.from('products')
.select('*')
.eq('id',id)
.single()

document.getElementById("productImage").src=data.image
document.getElementById("productName").textContent=data.name
document.getElementById("productPrice").textContent="₹"+data.price
document.getElementById("productDesc").textContent=data.description

document.getElementById("addCart").onclick=()=>addToCart(data)

}

function addToCart(product){

let cart=JSON.parse(localStorage.getItem("cart"))||[]

cart.push(product)

localStorage.setItem("cart",JSON.stringify(cart))

alert("Added to cart")

}

loadProduct()