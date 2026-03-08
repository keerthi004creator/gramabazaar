"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../js/supabaseClient";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";

export default function Shop() {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const categories = [
  {
    name: "Vegetables",
    image: "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg",
    bg: "bg-green-100",
  },
  {
    name: "Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
    bg: "bg-yellow-100",
  },
  {
    name: "Milk & Dairy",
    image: "https://img.freepik.com/free-vector/realistic-milk-containers-table-poser_1284-21368.jpg?semt=ais_rp_50_assets&w=740&q=80",
    bg: "bg-blue-100",
  },
  {
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&q=80",
    bg: "bg-orange-100",
  },
  {
    name: "Snacks",
    image: "https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg",
    bg: "bg-pink-100",
  },
  {
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    bg: "bg-purple-100",
  },
  {
    name: "Grains",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&q=80",
    bg: "bg-yellow-200",
  },
  {
    name: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    bg: "bg-red-100",
  },
  {
    name: "Ice Creams",
    image: "https://shwetainthekitchen.com/wp-content/uploads/2020/08/IMG_9187.jpg",
    bg: "bg-gray-200",
  },
  {
    name: "Chocolates",
    image: "https://jindalcocoa.com/cdn/shop/files/Dark_Chocolate_Hazelnut_Pista.jpg?v=1728627801",
    bg: "bg-teal-100",
  },
];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products
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

  // Filter products
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter(p => p.category === selectedCategory);
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">Shop By Category</h1>

      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 ${cat.bg}`}
          >
            <img src={cat.image} alt={cat.name} className="h-32 w-full object-cover" />
            <div className="p-3 text-center font-semibold">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-800">{selectedCategory}</h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow flex flex-col">
                  <img src={product.image} className="h-40 w-full object-cover rounded mb-3" />
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Back to Homepage Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-xl text-white font-semibold text-lg 
          bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 
          hover:from-green-600 hover:via-blue-600 hover:to-purple-600 
          shadow-lg transition transform hover:scale-105"
        >
          Back to Homepage
        </button>
      </div>

    </div>
  );
}