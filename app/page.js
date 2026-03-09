"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [username, setUsername] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // SHOW LOGO ONLY ONCE PER LOGIN SESSION
  const [showLogo, setShowLogo] = useState(
    typeof window !== "undefined" && !sessionStorage.getItem("logoShown")
  );

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

    // SHOW LOGO ONLY IF NOT ALREADY SHOWN
    if (!sessionStorage.getItem("logoShown")) {
      const timer = setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem("logoShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [router]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // LOGO SPLASH
  if (showLogo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
        <div className="text-center animate-pulse">
          <Image
            src="/images/logo.png"
            alt="GramaBazaar Logo"
            width={400}
            height={400}
            className="mx-auto drop-shadow-xl"
          />
          <h1 className="text-4xl font-bold text-orange-700 mt-4 tracking-wide">
            GramaBazaar
          </h1>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white relative">

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-50">

          <h1 className="text-3xl font-bold text-orange-600 tracking-wide">
            🛍 GramaBazaar
          </h1>

          <div className="flex items-center gap-8">

            <span className="text-gray-700 font-semibold text-lg">
              Hello, {username}
            </span>

            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative text-2xl hover:scale-110 transition"
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
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              My Account
            </button>

          </div>

        </nav>

        {/* Hero Section */}
        <section className="text-center py-24 bg-gradient-to-r from-orange-200 via-yellow-100 to-orange-100">

          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Discover Fresh Village Groceries
          </h2>

          <p className="text-gray-600 text-xl mb-10">
            Fresh vegetables, fruits and organic products directly from farmers
          </p>

          <button
            onClick={() => router.push("/shop")}
            className="bg-orange-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 transition"
          >
            Shop Now
          </button>

        </section>

        {/* Categories */}
        <section className="px-12 py-20">

          <h3 className="text-4xl font-bold text-center mb-14 text-gray-800">
            Shop by Category
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">

            {featuredItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-6 text-center cursor-pointer"
              >

                <img
                  src={item.image}
                  className="h-24 w-24 object-cover mx-auto rounded-full mb-4 border-4 border-orange-100"
                />

                <p className="font-semibold text-gray-700 text-lg">
                  {item.name}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Cart Panel */}
        {cartOpen && (

          <div className="fixed right-0 top-16 w-96 bg-white shadow-2xl p-6 h-[85vh] overflow-y-auto border-l">

            <h2 className="text-2xl font-bold mb-6 text-orange-600">
              Your Cart
            </h2>

            {cartItems.length === 0 ? (

              <p className="text-gray-500">Your cart is empty</p>

            ) : (

              <>
                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-5 border-b pb-4"
                  >

                    <div>

                      <p className="font-semibold text-gray-800">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-orange-600 font-bold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
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

                <div className="font-bold text-lg mt-4 text-gray-800">
                  Total ₹{cartTotal}
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl mt-5 hover:bg-orange-600 transition"
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

