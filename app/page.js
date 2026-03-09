"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [username, setUsername] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const featuredItems = [
    { id: 1, name: "Vegetables", image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b" },
    { id: 2, name: "Fruits", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
    { id: 3, name: "Milk & Dairy", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b" },
    { id: 4, name: "Snacks", image: "https://static.toiimg.com/photo/59217136.cms" },
    { id: 5, name: "Bakery", image: "https://static.vecteezy.com/system/resources/previews/059/553/517/non_2x/assorted-delicious-pastries-and-donuts-sweet-treats-platter-bakery-goods-gourmet-delights-png.png" },
    { id: 6, name: "Beverages", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGi5L0OjqpVgVi4Ilh1zHpLsuvyKrTMtyhlA&s" },
    { id: 7, name: "Frozen Foods", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZnSRdvg2aM97PpTG0i-HvJvKroPWQ8OX8g&s" },
    { id: 8, name: "Personal Care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrNcziBhqNaL79Ysm-0sU-Iec5EgqWfF3qg&s" },
    { id: 9, name: "Household Items", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQgfNgYgS6T8nplf1wtrb0s_twRk6aI1_FQ&s" },
    { id: 10, name: "Organic Products", image: "https://www.nimbarkfoods.com/images/blog/WhatsApp%20Image%202022-08-22%20at%2010.58.57%20AM.jpeg" },
  ];

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    } else {
      setUsername(JSON.parse(user).username);
    }

  }, [router]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-white relative">

      {/* Village Background Watermark */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef)",
        }}
      />

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="bg-white/90 backdrop-blur shadow-sm px-8 py-4 flex justify-between items-center sticky top-0">

          <h1 className="text-2xl font-bold text-green-700">
            🌾 GramaBazaar
          </h1>

          <div className="flex items-center gap-6">

            <span className="text-gray-700 font-medium">
              Hello : {username}
            </span>

            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative"
            >
              🛒

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}

            </button>

            <button
              onClick={() => router.push("/user")}
              className="text-gray-700"
            >
              My Account
            </button>

          </div>

        </nav>

        {/* Hero */}
        <section className="text-center py-20">

          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Fresh From Village Farms
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Authentic groceries directly from farmers to your home
          </p>

          <button
            onClick={() => router.push("/shop")}
            className="bg-green-600 text-white px-10 py-3 rounded-full text-lg hover:bg-green-700 transition"
          >
            Shop Fresh Groceries
          </button>

        </section>

        {/* Categories */}
        <section className="px-10 pb-20">

          <h3 className="text-3xl font-semibold text-center mb-12">
            Explore Categories
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">

            {featuredItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center"
              >

                <img
                  src={item.image}
                  className="h-20 w-20 object-cover mx-auto rounded-full mb-4"
                />

                <p className="font-medium text-gray-700">
                  {item.name}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Cart Panel */}
        {cartOpen && (

          <div className="fixed right-0 top-16 w-80 bg-white shadow-xl p-6 h-[80vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">
              Shopping Cart
            </h2>

            {cartItems.length === 0 ? (

              <p>Your cart is empty</p>

            ) : (

              <>
                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4 border-b pb-3"
                  >

                    {/* Product Info */}
                    <div>

                      <p className="font-semibold text-gray-700">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-green-600 font-semibold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        x
                      </button>

                    </div>

                  </div>

                ))}

                <div className="font-bold mt-4">
                  Total ₹{cartTotal}
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-green-600 text-white py-2 rounded mt-4"
                >
                  Checkout
                </button>

              </>

            )}

          </div>

        )}

      </div>

    </div>
  );
}