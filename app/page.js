"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../context/languageContext";
import { ShoppingCart, User, Search } from "lucide-react";

export default function Home() {

  const router = useRouter();
  const { addToCart } = useCart();
  const { cartItems, setCartOpen } = useCart();
  const { language, toggleLanguage } = useLanguage();

  const [username, setUsername] = useState(null);
  const [showLogo, setShowLogo] = useState(
    typeof window !== "undefined" && !sessionStorage.getItem("logoShown")
  );

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) router.replace("/login");
    else setUsername(JSON.parse(user).username);

    if (!sessionStorage.getItem("logoShown")) {
      const timer = setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem("logoShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [router]);

  if (showLogo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center animate-pulse">
          <Image src="/images/logo.png" alt="logo" width={260} height={260}/>
          <h1 className="text-4xl font-bold text-green-600 mt-4">
            GramaBazaar
          </h1>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f7f8f9]">

{/* NAVBAR */}

<nav className="bg-white border-b px-10 py-4 flex items-center justify-between">

<div className="flex items-center gap-10">

<h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
🛒 GramaBazaar
</h1>

<ul className="hidden md:flex gap-8 text-gray-700 font-medium">

<li className="text-green-600 border-b-2 border-green-600 pb-1 cursor-pointer">Home</li>

<li onClick={()=>router.push("/shop")}
className="cursor-pointer hover:text-green-600">Categories</li>

<li onClick={()=>router.push("/about")} 
className="cursor-pointer hover:text-green-600">About</li>

<li onClick={()=>router.push("/contact")}
 className="cursor-pointer hover:text-green-600">Contact</li>

</ul>

</div>

<div className="flex items-center gap-6">

 <span className="text-gray-700 font-medium">
            Hello, {username}
          </span>

{/* CART */}

<button
onClick={()=>setCartOpen(true)}
className="relative bg-gray-100 p-2 rounded-full"
>

<ShoppingCart size={20}/>

{cartItems.length>0 && (

<span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 rounded-full">
{cartItems.length}
</span>

)}

</button>

{/* USER */}

<button
onClick={()=>router.push("/user")}
className="bg-gray-100 p-2 rounded-full"
>

<User size={20}/>

</button>

</div>

</nav>

{/* HERO */}

<section className="grid md:grid-cols-2 items-center px-16 py-16">

<div>

<h1 className="text-6xl font-bold text-gray-900 leading-tight">

Fresh From Farm <br/>

<span className="text-green-600">to Your Doorstep</span>

</h1>

<p className="text-gray-500 mt-6 text-lg">

Shop organic fruits, vegetables, and daily essentials at the best prices.

</p>

<div className="flex gap-4 mt-8">

<button
onClick={()=>router.push("/shop")}
className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
>

Shop Now

</button>

</div>

</div>

<div className="flex justify-center">

<img
src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg"
className="w-[520px]"
/>

</div>

</section>



{/* FEATURED PRODUCTS */}

<section className="px-16 mt-14 pb-20">

<div className="flex justify-between items-center mb-8">

<h2 className="text-2xl font-bold text-gray-800">

Featured Products

</h2>

</div>

<div className="grid md:grid-cols-6 gap-6">

{[
{ name:"Fresh Vegetables", price:"₹45 / kg", img:"https://pngimg.com/d/tomato_PNG12588.png" },
{ name:"Organic Rice", price:"₹60 / kg", img:"https://pngimg.com/d/rice_PNG6.png" },
{ name:"Farm Eggs", price:"₹90 / pack", img:"https://pngimg.com/d/egg_PNG40780.png" },
{ name:"Milk Products", price:"₹55 / bottle", img:"https://pngimg.com/d/milk_PNG12738.png" },
{ name:"Backery", price:"₹30 / kg", img:"https://media.istockphoto.com/id/518468635/photo/french-pastries-on-display-a-confectionery-shop.jpg?s=612x612&w=0&k=20&c=av7rYRCLckvDp6s9sGmA_S9Lp_fTSDSSOtmR0wWJ8nY=" },
{ name:"Fresh Fruits", price:"₹120 / kg", img:"https://pngimg.com/d/apple_PNG12433.png" },
].map((p,i)=>(

<div key={i}
className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
>

<img src={p.img} className="h-20 mx-auto mb-4"/>

<h3 className="font-semibold text-gray-800">{p.name}</h3>



</div>

))}

</div>

</section>

 {/* FOOTER */}

      <footer className="bg-black/40 backdrop-blur-md text-white py-10 text-center">

        <p>
          © 2026 GramaBazaar • Connecting Villages to Cities
        </p>

      </footer>

</div>

  );
}