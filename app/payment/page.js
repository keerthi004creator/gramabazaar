"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../js/supabaseClient";
import { useCart } from "../../context/cartContext";

export default function PaymentPage() {

const router = useRouter();
const { cartItems, clearCart } = useCart();

const [paymentMethod,setPaymentMethod] = useState("");
const [cardType,setCardType] = useState("");
const [upiType,setUpiType] = useState("");
const [address,setAddress] = useState("");

const cardLogo="https://cdn-icons-png.flaticon.com/512/179/179457.png";

const upiLogos={
PhonePe:"https://static.vecteezy.com/system/resources/previews/067/065/681/non_2x/phonepe-colored-logo-rounded-icon-transparent-background-free-png.png",
Paytm:"https://cdn-icons-png.flaticon.com/512/825/825454.png",
GooglePay:"https://cdn-icons-png.flaticon.com/512/6124/6124998.png"
};

const codIcon="https://cdn-icons-png.flaticon.com/512/2489/2489756.png";

const handleConfirmOrder = async ()=>{

if(!paymentMethod) return alert("Please select payment method");
if(paymentMethod==="card" && !cardType) return alert("Select card type");
if(paymentMethod==="upi" && !upiType) return alert("Select UPI method");
if(!address) return alert("Enter delivery address");

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
router.push("/login");
return;
}

const total = cartItems.reduce(
(sum,item)=> sum + item.price * item.quantity,0
);

const paymentType =
paymentMethod==="card"
?cardType
:paymentMethod==="upi"
?upiType
:"COD";

const { error } = await supabase
.from("orders")
.insert([{
user_email:user.email,
items:cartItems,
total:total,
payment_method:paymentMethod,
payment_type:paymentType,
address:address,
status:"Placed"
}]);

if(error){
console.log(error);
alert("Order Failed");
return;
}

clearCart();

alert("Order Placed Successfully");

router.push("/user");

};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">

<div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">

<h1 className="text-3xl font-bold text-center mb-8">
Payment & Delivery
</h1>

<h2 className="text-lg mb-4 font-semibold">
Select Payment Method
</h2>

<div className="flex flex-col gap-4 mb-8">

<button
onClick={()=>{setPaymentMethod("card");setUpiType("");}}
className={`p-4 rounded-xl flex items-center gap-3 border transition hover:scale-105 ${paymentMethod==="card"?"bg-white/30":"bg-white/10"}`}
>
<img src={cardLogo} className="h-7"/>
Card
</button>

<button
onClick={()=>{setPaymentMethod("upi");setCardType("");}}
className={`p-4 rounded-xl border transition hover:scale-105 ${paymentMethod==="upi"?"bg-white/30":"bg-white/10"}`}
>
UPI
</button>

<button
onClick={()=>{setPaymentMethod("cod");setCardType("");setUpiType("");}}
className={`p-4 rounded-xl flex items-center gap-3 border transition hover:scale-105 ${paymentMethod==="cod"?"bg-white/30":"bg-white/10"}`}
>
<img src={codIcon} className="h-7"/>
Cash On Delivery
</button>

</div>

{paymentMethod==="card" &&(

<div className="flex gap-4 mb-6">

<button
onClick={()=>setCardType("credit")}
className={`px-4 py-2 rounded-lg ${cardType==="credit"?"bg-pink-500":"bg-white/20"}`}
>
Credit Card
</button>

<button
onClick={()=>setCardType("debit")}
className={`px-4 py-2 rounded-lg ${cardType==="debit"?"bg-pink-500":"bg-white/20"}`}
>
Debit Card
</button>

</div>

)}

{paymentMethod==="upi" &&(

<div className="flex gap-4 mb-6">

{Object.entries(upiLogos).map(([name,logo])=>(

<button
key={name}
onClick={()=>setUpiType(name)}
className={`px-4 py-2 rounded-lg flex items-center gap-2 ${upiType===name?"bg-indigo-500":"bg-white/20"}`}
>
<img src={logo} className="h-6"/>
{name}
</button>

))}

</div>

)}

<textarea
placeholder="Enter Delivery Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="w-full p-3 rounded-lg text-black mb-6"
/>

<button
onClick={handleConfirmOrder}
className="w-full py-4 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl text-lg font-semibold hover:scale-105 transition"
>
Confirm Order
</button>

</div>

</div>

);

}