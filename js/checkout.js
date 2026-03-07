import supabase from './supabaseClient.js'

document.getElementById("placeOrder").onclick = async () => {

const name=document.querySelector("input[placeholder='Name']").value
const address=document.querySelector("input[placeholder='Address']").value
const phone=document.querySelector("input[placeholder='Phone']").value

const cart=JSON.parse(localStorage.getItem("cart")) || []

const {error}=await supabase
.from('orders')
.insert([
{
name,
address,
phone,
items:JSON.stringify(cart)
}
])

if(error){
alert("Order failed")
return
}

localStorage.removeItem("cart")

alert("Order placed successfully!")

window.location.href="index.html"

}