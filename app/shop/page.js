"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../js/supabaseClient";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";

export default function Shop() {

  const { addToCart } = useCart();
  const router = useRouter();

  const categories = [
    {
      name: "Vegetables",
      image:
        "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg",
    },
    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    },
    {
      name: "Milk & Dairy",
      image:
        "https://img.freepik.com/free-vector/realistic-milk-containers-table-poser_1284-21368.jpg",
    },
    {
      name: "Bakery",
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    },
    {
      name: "Snacks",
      image:
        "https://www.vikhrolicucina.com/uploads/stories/1674223639_samosasingaraindianfriedbakedpastrywithsavoryfillingspicedpotatoesonionpeas.jpg",
    },
    {
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
    },
    {
      name: "Grains",
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    },
    {
      name: "Spices",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    },
    {
      name: "Ice Creams",
      image:
        "https://shwetainthekitchen.com/wp-content/uploads/2020/08/IMG_9187.jpg",
    },
    {
      name: "Chocolates",
      image:
        "https://jindalcocoa.com/cdn/shop/files/Dark_Chocolate_Hazelnut_Pista.jpg?v=1728627801",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    searchTerm !== "" ? searchResults : filteredProducts;

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-500 p-8">

      <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
        Shop Fresh Products
      </h1>

      <div className="flex justify-center mb-14">

        <div className="relative w-full md:w-[600px]">

          <input
            type="text"
            placeholder="Search products like Rice, Apple, Milk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/30
            text-white placeholder-white/80
            shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <span className="absolute left-4 top-4 text-white text-lg">
            🔍
          </span>

        </div>

      </div>

      <h2 className="text-white text-2xl font-semibold text-center mb-6">
        Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">

        {categories.map((cat, index) => (

          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className="cursor-pointer group rounded-2xl overflow-hidden
            bg-white/20 backdrop-blur-md
            border border-white/30
            shadow-xl hover:scale-105 transition"
          >

            <div className="h-32 overflow-hidden">

              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover
                group-hover:scale-110 transition duration-300"
              />

            </div>

            <div className="p-3 text-center font-semibold text-white">
              {cat.name}
            </div>

          </div>

        ))}

      </div>

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

                {/* GLASS PRODUCT NAME */}

                <h3 className="text-lg font-semibold text-white/90 mb-2
                bg-white/10 backdrop-blur-md
                border border-white/20
                rounded-lg px-3 py-1 w-fit">

                  {product.name}

                </h3>

                <p className="text-purple-200 text-sm mb-3">
                  Fresh farm product
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
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {displayedProducts.length === 0 && selectedCategory && (
        <p className="text-white text-lg text-center">
          No products found in this category.
        </p>
      )}

      <div className="flex justify-center mt-16">

        <button
          onClick={() => router.push("/")}
          className="px-10 py-3 rounded-full text-white font-semibold
          bg-gradient-to-r from-pink-500 to-purple-600
          hover:scale-105 transition shadow-xl"
        >
          Back to Homepage
        </button>

      </div>

    </div>

  );

}