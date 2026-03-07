import supabase from './supabaseClient.js'

async function loadOrders(){

const { data, error } = await supabase
.from('orders')
.select('*')

if(error){
console.log(error)
return
}

const container=document.getElementById("ordersList")

container.innerHTML=""

data.forEach(order=>{

container.innerHTML+=`

<div class="bg-white p-4 mb-4 rounded shadow">

<h3 class="font-bold">${order.name}</h3>

<p>📍 ${order.address}</p>

<p>📞 ${order.phone}</p>

<p class="text-sm text-gray-600">
Items: ${order.items}
</p>

</div>

`

})

}

loadOrders()