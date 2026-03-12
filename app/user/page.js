"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../js/supabaseClient";

export default function UserPage(){

const router = useRouter();

const [user,setUser] = useState(null);
const [phone,setPhone] = useState("");
const [address,setAddress] = useState("");
const [orders,setOrders] = useState([]);

useEffect(()=>{

const storedUser = localStorage.getItem("user");

if(!storedUser){
router.push("/login");
return;
}

const u = JSON.parse(storedUser);
setUser(u);

fetchProfile(u.email);
fetchOrders(u.email);

},[]);

 const handleLogout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

const fetchProfile = async(email)=>{

const {data} = await supabase
.from("users_profiles")
.select("*")
.eq("email",email)
.single();

if(data){
setPhone(data.phone||"");
setAddress(data.address||"");
}

};

const fetchOrders = async(email)=>{

const {data} = await supabase
.from("orders")
.select("*")
.eq("user_email",email)
.order("created_at",{ascending:false});

if(data) setOrders(data);

};

const saveProfile = async()=>{

await supabase
.from("users_profiles")
.upsert({email:user.email,phone,address},{onConflict:["email"]});

alert("Profile updated");

};

const deleteOrder = async(id)=>{

await supabase
.from("orders")
.delete()
.eq("id",id);

setOrders(prev=>prev.filter(o=>o.id!==id));

};

if(!user) return null;

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-10 flex justify-center">

<div className="max-w-6xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">

<h2 className="text-3xl font-bold text-center mb-10">
My Account
</h2>

<div className="grid md:grid-cols-2 gap-10">

<div>

<h3 className="text-xl font-semibold mb-4">
Profile
</h3>

<p><b>Name:</b> {user.username}</p>
<p><b>Email:</b> {user.email}</p>

<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
placeholder="Phone"
className="w-full p-2 rounded text-black mt-3"
/>

<textarea
value={address}
onChange={(e)=>setAddress(e.target.value)}
placeholder="Address"
className="w-full p-2 rounded text-black mt-3"
/>

<button
onClick={saveProfile}
className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-2 rounded-lg hover:scale-105 transition"
>
Save Profile
</button>

</div>

<div>

<h3 className="text-xl font-semibold mb-4">
My Orders
</h3>

{orders.length>0 ?(

orders.map(order=>(

<div
key={order.id}
className="bg-white/10 border border-white/20 rounded-xl p-5 mb-4 hover:scale-[1.02] transition"
>

<p><b>Total:</b> ₹{order.total}</p>
<p><b>Status:</b> {order.status}</p>

<ul className="list-disc ml-6 mt-2">

{order.items?.map((item,index)=>(
<li key={index}>
{item.name} × {item.quantity}
</li>
))}

</ul>

<button
onClick={()=>deleteOrder(order.id)}
className="text-red-400 mt-2"
>
Delete Order
</button>

</div>

))

):( <p>No Orders Yet</p> )}

</div>

 <div className="flex justify-center mt-10">

          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl font-semibold text-white
            bg-rose-500 hover:bg-rose-600 transition shadow-lg"
          >
            Logout
          </button>

        </div>

         <div className="flex justify-center mt-10">

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl font-semibold text-white
            bg-rose-500 hover:bg-rose-600 transition shadow-lg"
          >
            Back to Home
          </button>

        </div>

</div>

</div>

</div>

);

}