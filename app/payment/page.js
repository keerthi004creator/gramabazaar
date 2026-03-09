"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const cardLogo =
"https://www.shutterstock.com/image-vector/credit-card-sign-mobile-app-260nw-1776017327.jpg";

const upiLogos = {
PhonePe:
"https://static.vecteezy.com/system/resources/previews/067/065/681/non_2x/phonepe-colored-logo-rounded-icon-transparent-background-free-png.png",
Paytm:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEjY90pS-UfgHJU4glc8Aiupp1xCn_jcvRQ&s",
GooglePay:
"https://animationvisarts.com/wp-content/uploads/2023/11/Frame-43-1.png",
};

const codIcon =
"https://static.vecteezy.com/system/resources/thumbnails/008/013/016/small/payment-by-cash-for-express-delivery-flat-illustration-how-people-deliver-package-and-pay-for-the-delivery-by-cash-human-hand-holds-money-and-pay-for-the-package-courier-get-payment-for-it-vector.jpg";

export default function PaymentPage() {

const router = useRouter();

const [paymentMethod,setPaymentMethod] = useState("");
const [cardType,setCardType] = useState("");
const [upiType,setUpiType] = useState("");
const [address,setAddress] = useState("");

const handleConfirmOrder = () => {

if(!paymentMethod) return alert("Please select a payment method!");
if(paymentMethod==="card" && !cardType) return alert("Select Credit or Debit card");
if(paymentMethod==="upi" && !upiType) return alert("Select UPI method");
if(!address) return alert("Please enter your address");

router.push("/order-conformation");

};

return(

<div className="min-h-screen flex justify-center items-center p-6
bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-500 relative overflow-hidden">

{/* Glow Background */}

<div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 blur-[120px] opacity-30"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 blur-[120px] opacity-30"></div>

<div className="w-full max-w-2xl
bg-white/10 backdrop-blur-xl
border border-white/20
shadow-2xl rounded-3xl
p-10 text-white">

<h1 className="text-3xl font-bold text-center mb-8
bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">

Payment & Address

</h1>

{/* PAYMENT METHODS */}

<h2 className="text-xl font-semibold mb-5 text-white/90">

Select Payment Method

</h2>

<div className="flex flex-col gap-4 mb-8">

{/* CARD */}

<button

onClick={()=>{
setPaymentMethod("card");
setUpiType("");
}}

className={`flex items-center gap-4 p-4 rounded-2xl
border transition shadow-xl backdrop-blur-lg

${paymentMethod==="card"

? "bg-white/20 border-pink-300 scale-[1.02]"
: "bg-white/5 border-white/20 hover:bg-white/10"

}`}

>

<img src={cardLogo} className="h-10 rounded" />

<span className="text-lg font-semibold">

Card

</span>

</button>

{/* UPI */}

<button

onClick={()=>{
setPaymentMethod("upi");
setCardType("");
}}

className={`flex items-center gap-4 p-4 rounded-2xl
border transition shadow-xl backdrop-blur-lg

${paymentMethod==="upi"

? "bg-white/20 border-pink-300 scale-[1.02]"
: "bg-white/5 border-white/20 hover:bg-white/10"

}`}

>

<span className="text-lg font-semibold">

UPI

</span>

<div className="flex gap-3">

{Object.entries(upiLogos).map(([name,logo])=>(

<img key={name} src={logo} className="h-8"/>

))}

</div>

</button>

{/* COD */}

<button

onClick={()=>{
setPaymentMethod("cod");
setCardType("");
setUpiType("");
}}

className={`flex items-center gap-4 p-4 rounded-2xl
border transition shadow-xl backdrop-blur-lg

${paymentMethod==="cod"

? "bg-white/20 border-pink-300 scale-[1.02]"
: "bg-white/5 border-white/20 hover:bg-white/10"

}`}

>

<img src={codIcon} className="h-8 rounded"/>

<span className="text-lg font-semibold">

Cash on Delivery

</span>

</button>

</div>

{/* CARD TYPES */}

{paymentMethod==="card" && (

<div className="flex gap-6 justify-center mb-8">

<button

onClick={()=>setCardType("credit")}

className={`px-6 py-3 rounded-xl border transition shadow-lg

${cardType==="credit"

? "bg-pink-400 text-white border-pink-300"
: "bg-white/10 border-white/20 hover:bg-white/20"

}`}

>

Credit Card

</button>

<button

onClick={()=>setCardType("debit")}

className={`px-6 py-3 rounded-xl border transition shadow-lg

${cardType==="debit"

? "bg-pink-400 text-white border-pink-300"
: "bg-white/10 border-white/20 hover:bg-white/20"

}`}

>

Debit Card

</button>

</div>

)}

{/* UPI OPTIONS */}

{paymentMethod==="upi" && (

<div className="flex gap-4 justify-center mb-8">

{Object.entries(upiLogos).map(([name,logo])=>(

<button

key={name}

onClick={()=>setUpiType(name)}

className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-lg transition

${upiType===name

? "bg-indigo-400 text-white border-indigo-300"
: "bg-white/10 border-white/20 hover:bg-white/20"

}`}

>

<img src={logo} className="h-6"/>

<span>{name}</span>

</button>

))}

</div>

)}

{/* ADDRESS */}

<div className="mb-8">

<label className="block font-semibold mb-2">

Delivery Address

</label>

<textarea

value={address}

onChange={(e)=>setAddress(e.target.value)}

rows={3}

placeholder="Enter your delivery address"

className="w-full p-3 rounded-xl
bg-white/10 border border-white/20
placeholder-white/60
focus:outline-none focus:ring-2 focus:ring-pink-400"

/>

</div>

{/* PAY BUTTON */}

<button

onClick={()=>router.push("/order-conformation")}

className="w-full py-4 rounded-xl
bg-gradient-to-r from-pink-500 to-indigo-500
text-white text-lg font-semibold
shadow-xl hover:scale-105 transition"

>

Pay Now

</button>

</div>

</div>

);
}