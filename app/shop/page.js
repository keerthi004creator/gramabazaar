"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../js/supabaseClient";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/languageContext";

export default function Shop() {

  const { addToCart } = useCart();
  const router = useRouter();
  const { language } = useLanguage();

  const categories = [
    {
      name_en: "Vegetables",
      name_kn: "ತರಕಾರಿಗಳು",
      image:"https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg"
    },
    {
      name_en: "Fruits",
      name_kn: "ಹಣ್ಣುಗಳು",
      image:"https://images.unsplash.com/photo-1610832958506-aa56368176cf"
    },
    {
      name_en: "Milk & Dairy",
      name_kn: "ಹಾಲು & ಡೇರಿ",
      image:"https://img.freepik.com/free-vector/realistic-milk-containers-table-poser_1284-21368.jpg"
    },
    {
      name_en: "Bakery",
      name_kn: "ಬೇಕರಿ",
      image:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
    },
    {
      name_en: "Snacks",
      name_kn: "ಸ್ನಾಕ್ಸ್",
      image:"https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg"
    },
    {
      name_en: "Beverages",
      name_kn: "ಪಾನೀಯಗಳು",
      image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87"
    },
    {
      name_en: "Grains",
      name_kn: "ಕಣಜಗಳು",
      image:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
    },
    {
      name_en: "Spices",
      name_kn: "ಮಸಾಲೆಗಳು",
      image:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
    },
    {
      name_en: "Ice Creams",
      name_kn: "ಐಸ್ ಕ್ರೀಮ್",
      image:"https://shwetainthekitchen.com/wp-content/uploads/2020/08/IMG_9187.jpg"
    },
    {
      name_en: "Chocolates",
      name_kn: "ಚಾಕೊಲೇಟ್",
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

    const fetchProducts=async()=>{

      const {data,error}=await supabase.from("products").select("*");

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

    const filtered=products.filter(
      p=>p.category===selectedCategory
    );

    setFilteredProducts(filtered);

  },[selectedCategory,products]);

  useEffect(()=>{

    if(searchTerm.trim()===""){
      setSearchResults([]);
      return;
    }

    const results=products.filter(product=>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);

  },[searchTerm,products]);

  const displayedProducts=
  searchTerm!==""?
  searchResults:
  selectedSubcategory?
  filteredProducts.filter(p=>p.subcategory===selectedSubcategory):
  filteredProducts;

  return(

<div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-8 py-10">

<h1 className="text-5xl font-bold text-green-700 text-center mb-10">
{language==="en"?"Shop Fresh Products":"ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿ ಮಾಡಿ"}
</h1>

{/* Search */}

<div className="flex justify-center mb-12">

<input
type="text"
placeholder={language==="en"?"Search products...":"ಉತ್ಪನ್ನ ಹುಡುಕಿ"}
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="w-full md:w-[500px] border border-gray-300 rounded-full px-6 py-3 shadow focus:ring-2 focus:ring-green-400 outline-none"
/>

</div>

{/* Categories */}

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-16">

{categories.map((cat,index)=>(

<div
key={index}
onClick={()=>setSelectedCategory(cat.name_en)}
className="bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer overflow-hidden"
>

<img
src={cat.image}
className="h-32 w-full object-cover"
/>

<div className="p-3 text-center font-semibold text-gray-700">
{language==="en"?cat.name_en:cat.name_kn}
</div>

</div>

))}

</div>

{/* Subcategory */}

{(selectedCategory==="Chocolates"||selectedCategory==="Ice Creams")&&(

<div className="flex justify-center gap-4 mb-10">

{[...new Set(products
.filter(p=>p.category===selectedCategory)
.map(p=>p.subcategory)
.filter(Boolean))]
.map((sub,index)=>(

<button
key={index}
onClick={()=>setSelectedSubcategory(sub)}
className={`px-5 py-2 rounded-full text-sm font-medium
${selectedSubcategory===sub
?"bg-green-600 text-white"
:"bg-white border border-gray-300"}
`}
>

{sub}

</button>

))}

</div>

)}

{/* Products */}

{displayedProducts.length>0&&(

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{displayedProducts.map(product=>(

<div
key={product.id}
className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col"
>

<img
src={product.image}
className="h-40 object-cover rounded-xl mb-4"
/>

<h3 className="font-semibold text-gray-800">
{language==="en"?product.name:product.name_kn}
</h3>

<p className="text-green-600 font-bold text-lg mt-1">
₹{product.price}
</p>

<button
onClick={()=>addToCart(product)}
className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
>

{language==="en"?"Add to Cart":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ"}

</button>

</div>

))}

</div>

)}

{/* No Products */}

{displayedProducts.length===0&&selectedCategory&&(

<p className="text-center text-gray-500 text-lg">
{language==="en"
?"No products found in this category."
:"ಈ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ."}
</p>

)}

{/* Back */}

<div className="flex justify-center mt-16">

<button
onClick={()=>router.push("/")}
className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow"
>

{language==="en"?"Back to Homepage":"ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"}

</button>

</div>

</div>

  );
}