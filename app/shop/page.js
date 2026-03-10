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
      image:
        "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg",
    },
    {
      name_en: "Fruits",
      name_kn: "ಹಣ್ಣುಗಳು",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    },
    {
      name_en: "Milk & Dairy",
      name_kn: "ಹಾಲು & ಡೇರಿ",
      image:
        "https://img.freepik.com/free-vector/realistic-milk-containers-table-poser_1284-21368.jpg",
    },
    {
      name_en: "Bakery",
      name_kn: "ಬೇಕರಿ",
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    },
    {
      name_en: "Snacks",
      name_kn: "ಸ್ನಾಕ್ಸ್",
      image:
        "https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg",
    },
    {
      name_en: "Beverages",
      name_kn: "ಪಾನೀಯಗಳು",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
    },
    {
      name_en: "Grains",
      name_kn: "ಕಣಜಗಳು",
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    },
    {
      name_en: "Spices",
      name_kn: "ಮಸಾಲೆಗಳು",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    },
    {
      name_en: "Ice Creams",
      name_kn: "ಐಸ್ ಕ್ರೀಮ್",
      image:
        "https://shwetainthekitchen.com/wp-content/uploads/2020/08/IMG_9187.jpg",
    },
    {
      name_en: "Chocolates",
      name_kn: "ಚಾಕೊಲೇಟ್",
      image:
        "https://jindalcocoa.com/cdn/shop/files/Dark_Chocolate_Hazelnut_Pista.jpg?v=1728627801",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.log(error);
        setProducts([]);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter(
      (p) => p.category === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  // Filter products by search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const displayedProducts =
  searchTerm !== ""
    ? searchResults
    : selectedSubcategory
      ? filteredProducts.filter(p => p.subcategory === selectedSubcategory)
      : filteredProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-500 p-8">

      <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
        {language === "en" ? "Shop Fresh Products" : "ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿ ಮಾಡಿ"}
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-14">
        <div className="relative w-full md:w-[600px]">
          <input
            type="text"
            placeholder={
              language === "en"
                ? "Search products like Rice, Apple, Milk..."
                : "ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ: ಅಕ್ಕಿ, ಹಣ್ಣು, ಹಾಲು..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/30
            text-white placeholder-white/80
            shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <span className="absolute left-4 top-4 text-white text-lg">🔍</span>
        </div>
      </div>

      {/* Categories */}
      <h2 className="text-white text-2xl font-semibold text-center mb-6">
        {language === "en" ? "Categories" : "ವರ್ಗಗಳು"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name_en)}
            className="cursor-pointer group rounded-2xl overflow-hidden
            bg-white/20 backdrop-blur-md
            border border-white/30
            shadow-xl hover:scale-105 transition"
          >
            <div className="h-32 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name_en}
                className="w-full h-full object-cover
                group-hover:scale-110 transition duration-300"
              />
            </div>
            <div className="p-3 text-center font-semibold text-white">
              {language === "en" ? cat.name_en : cat.name_kn}
            </div>
          </div>
        ))}
      </div>

      {(selectedCategory === "Chocolates" || selectedCategory === "Ice Creams") && (
  <div className="flex justify-center gap-4 mb-8">
    {[...new Set(products
      .filter(p => p.category === selectedCategory)
      .map(p => p.subcategory)
      .filter(Boolean))].map((sub, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${selectedSubcategory === sub ? "bg-pink-500" : "bg-white/20"} text-white`}
          onClick={() => setSelectedSubcategory(sub)}
        >
          {sub}
        </button>
      ))}
  </div>
)}

      {/* Products */}
      {displayedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl
              bg-white/20 backdrop-blur-lg
              border border-white/30
              shadow-2xl
              hover:-translate-y-2 hover:scale-105
              transition overflow-hidden flex flex-col"
            >
              <div className="p-6">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover
                    hover:scale-105 transition"
                  />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white/90 mb-2
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  rounded-lg px-3 py-1 w-fit"
                >
                  {language === "en" ? product.name : product.name_kn}
                </h3>

                <p className="text-purple-200 text-sm mb-3">
                  {language === "en" ? "Fresh farm product" : "ತಾಜಾ ಉತ್ಪನ್ನ"}
                </p>

                <p className="text-2xl font-bold text-pink-300 mb-4">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto py-2 rounded-full text-white font-semibold
                  bg-gradient-to-r from-pink-500 to-purple-500
                  hover:scale-105 transition shadow-lg"
                >
                  {language === "en" ? "Add to Cart" : "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {displayedProducts.length === 0 && selectedCategory && (
        <p className="text-white text-lg text-center">
          {language === "en"
            ? "No products found in this category."
            : "ಈ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ."}
        </p>
      )}

      {/* Back Button */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => router.push("/")}
          className="px-10 py-3 rounded-full text-white font-semibold
          bg-gradient-to-r from-pink-500 to-purple-600
          hover:scale-105 transition shadow-xl"
        >
          {language === "en" ? "Back to Homepage" : "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"}
        </button>
      </div>
    </div>
  );
}