import supabase from './supabaseClient.js'

async function addProduct(){

const name = document.getElementById("name").value
const price = document.getElementById("price").value
const image = document.getElementById("image").value
const description = document.getElementById("description").value

const { data, error } = await supabase
.from('products')
.insert([
{
name:name,
price:price,
image:image,
description:description
}
])

if(error){
alert("Error adding product")
console.log(error)
}else{
alert("Product Added Successfully")
}

}

window.addProduct = addProduct