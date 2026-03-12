"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../js/supabaseClient";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/languageContext";
import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";

export default function Shop(){

const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
const router = useRouter();
const { language } = useLanguage();

const categories = [
{
name_en:"Vegetables",
name_kn:"ತರಕಾರಿಗಳು",
image:"https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg"
},
{
name_en:"Fruits",
name_kn:"ಹಣ್ಣುಗಳು",
image:"https://images.unsplash.com/photo-1610832958506-aa56368176cf"
},
{
name_en:"Milk & Dairy",
name_kn:"ಹಾಲು & ಡೇರಿ",
image:"https://img.freepik.com/free-vector/realistic-milk-containers-table-poser_1284-21368.jpg"
},
{
name_en:"Bakery",
name_kn:"ಬೇಕರಿ",
image:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
},
{
name_en:"Snacks",
name_kn:"ಸ್ನಾಕ್ಸ್",
image:"https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg"
},
{
name_en:"Beverages",
name_kn:"ಪಾನೀಯಗಳು",
image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87"
},
{
name_en:"Grains",
name_kn:"ಕಣಜಗಳು",
image:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
},
{
name_en:"Spices",
name_kn:"ಮಸಾಲೆಗಳು",
image:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
},
{
name_en:"Ice Creams",
name_kn:"ಐಸ್ ಕ್ರೀಮ್",
image:"https://shwetainthekitchen.com/wp-content/uploads/2020/08/IMG_9187.jpg"
},
{
name_en:"Chocolates",
name_kn:"ಚಾಕೊಲೇಟ್",
image:"https://jindalcocoa.com/cdn/shop/files/Dark_Chocolate_Hazelnut_Pista.jpg"
},
];

const [selectedCategory,setSelectedCategory]=useState(null);
const [products,setProducts]=useState([]);
const [filteredProducts,setFilteredProducts]=useState([]);
const [searchTerm,setSearchTerm]=useState("");
const [searchResults,setSearchResults]=useState([]);
const [selectedSubcategory,setSelectedSubcategory]=useState(null);

useEffect(()=>{

const fetchProducts = async()=>{

const {data,error} = await supabase
.from("products")
.select("*");

if(error){
console.log(error);
setProducts([]);
}else{
setProducts(data);
}

};

fetchProducts();

},[]);

useEffect(()=>{

if(!selectedCategory){
setFilteredProducts([]);
return;
}

const filtered = products.filter(
p=>p.category===selectedCategory
);

setFilteredProducts(filtered);

},[selectedCategory,products]);

useEffect(()=>{

if(searchTerm.trim()===""){
setSearchResults([]);
return;
}

const results = products.filter(product=>
product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

setSearchResults(results);

},[searchTerm,products]);

const displayedProducts =
searchTerm!=="" ?
searchResults :
selectedSubcategory ?
filteredProducts.filter(p=>p.subcategory===selectedSubcategory) :
filteredProducts;

return(

<div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 px-6 md:px-12 py-12">

{/* Title */}

<motion.h1
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-5xl font-bold text-center text-green-700 mb-12"
>
{language==="en"?"Shop Fresh Products":"ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿ ಮಾಡಿ"}
</motion.h1>


{/* Search */}

<div className="flex justify-center mb-14">

<div className="relative w-full md:w-[520px]">

<Search className="absolute left-4 top-3 text-gray-400"/>

<input
type="text"
placeholder={language==="en"?"Search products...":"ಉತ್ಪನ್ನ ಹುಡುಕಿ"}
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="w-full pl-12 pr-6 py-3 rounded-full border border-gray-300 shadow-lg focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>

</div>


{/* SEARCH RESULTS */}

{searchTerm!=="" && displayedProducts.length>0 &&(

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">

{displayedProducts.map(product=>{

const cartItem = cartItems.find(item=>item.id===product.id);

return(

<motion.div
key={product.id}
whileHover={{y:-6}}
className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-4 flex flex-col"
>

<img
src={product.image}
className="h-40 object-cover rounded-xl mb-4"
/>

<h3 className="font-semibold text-gray-800">
{language==="en"?product.name:product.name_kn}
</h3>

<p className="text-sm text-gray-500 mt-1">
{product.description}
</p>

<p className="text-green-600 font-bold text-lg mt-2">
₹{product.price}
</p>

{cartItem ?(

<div className="flex items-center justify-center gap-4 mt-auto">

<button
onClick={()=>{
if(cartItem.quantity===1){
removeFromCart(product.id);
}else{
updateQuantity(product.id,cartItem.quantity-1);
}
}}
className="px-3 py-1 bg-gray-200 rounded-lg"
>
-
</button>

<span className="font-semibold">
{cartItem.quantity}
</span>

<button
onClick={()=>updateQuantity(product.id,cartItem.quantity+1)}
className="px-3 py-1 bg-gray-200 rounded-lg"
>
+
</button>

</div>

):(

<button
onClick={()=>addToCart(product)}
className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
>
{language==="en"?"Add to Cart":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ"}
</button>

)}

</motion.div>

);

})}

</div>

)}


{/* CATEGORIES */}

{searchTerm==="" &&(

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">

{categories.map((cat,index)=>(

<motion.div
key={index}
whileHover={{scale:1.05}}
onClick={()=>setSelectedCategory(cat.name_en)}
className="relative cursor-pointer rounded-3xl overflow-hidden shadow-xl"
>

<img
src={cat.image}
className="h-32 w-full object-cover"
/>

<div className="absolute inset-0 bg-black/30 flex items-center justify-center">

<h3 className="text-white text-lg font-semibold text-center px-2">
{language==="en"?cat.name_en:cat.name_kn}
</h3>

</div>

</motion.div>

))}

</div>

)}


{/* CATEGORY PRODUCTS */}

{searchTerm==="" && displayedProducts.length>0 &&(

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{displayedProducts.map(product=>{

const cartItem = cartItems.find(item=>item.id===product.id);

return(

<motion.div
key={product.id}
whileHover={{y:-6}}
className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-4 flex flex-col"
>

<img
src={product.image}
className="h-40 object-cover rounded-xl mb-4"
/>

<h3 className="font-semibold text-gray-800">
{language==="en"?product.name:product.name_kn}
</h3>

<p className="text-sm text-gray-500 mt-1">
{product.description}
</p>

<p className="text-green-600 font-bold text-lg mt-2">
₹{product.price}
</p>

{cartItem ?(

<div className="flex items-center justify-center gap-4 mt-auto">

<button
onClick={()=>{
if(cartItem.quantity===1){
removeFromCart(product.id);
}else{
updateQuantity(product.id,cartItem.quantity-1);
}
}}
className="px-3 py-1 bg-gray-200 rounded-lg"
>
-
</button>

<span className="font-semibold">
{cartItem.quantity}
</span>

<button
onClick={()=>updateQuantity(product.id,cartItem.quantity+1)}
className="px-3 py-1 bg-gray-200 rounded-lg"
>
+
</button>

</div>

):(

<button
onClick={()=>addToCart(product)}
className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
>
{language==="en"?"Add to Cart":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ"}
</button>

)}

</motion.div>

);

})}

</div>

)}


{/* Back Button */}

<div className="flex justify-center mt-16">

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>router.push("/")}
className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full shadow-lg"
>

{language==="en"?"Back to Homepage":"ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"}

</motion.button>


</div>

</div>

);

}