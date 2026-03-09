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

  if (showLogo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-500">
        <div className="text-center animate-pulse">
          <Image src="/images/logo.png" alt="logo" width={420} height={420}/>
          <h1 className="text-5xl font-bold text-white mt-4 tracking-widest">
            GramaBazaar
          </h1>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-500 text-white relative overflow-hidden">

      {/* Glow Background */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 blur-[120px] opacity-40"></div>

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 px-12 py-4 flex justify-between items-center shadow-xl">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent">
          🛍 GramaBazaar
        </h1>

        <div className="flex items-center gap-8">

          <span className="font-medium text-white/90">
            Hello, {username}
          </span>

          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative text-2xl hover:scale-125 transition"
          >
            🛒

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}

          </button>

          <button
            onClick={() => router.push("/user")}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
          >
            My Account
          </button>

        </div>

      </nav>

      {/* HERO */}

      <section className="text-center py-32">

        <h2 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-300 via-white to-indigo-300 bg-clip-text text-transparent">

          Fresh Village Groceries

        </h2>

        <p className="text-white/80 text-xl mb-10">
          Organic fruits, vegetables and traditional foods directly from farmers
        </p>

        <button
          onClick={() => router.push("/shop")}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 px-16 py-4 rounded-full text-lg shadow-2xl hover:scale-110 transition"
        >
          Shop Now
        </button>

      </section>

      {/* CATEGORY GRID */}

      <section className="px-12 pb-24">

        <h3 className="text-4xl font-bold text-center mb-16">
          Shop by Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">

          {featuredItems.map((item) => (

            <div
              key={item.id}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:-translate-y-3 hover:shadow-2xl transition p-6 text-center cursor-pointer"
            >

              <img
                src={item.image}
                className="h-24 w-24 object-cover mx-auto rounded-full mb-4 border-4 border-white/30 group-hover:scale-110 transition"
              />

              <p className="font-semibold text-white text-lg">
                {item.name}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CART DRAWER */}

      <div className={`fixed top-0 right-0 h-full w-96 bg-white text-gray-800 shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>

        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (

          <p className="text-gray-500">Your cart is empty</p>

        ) : (

          <>
            {cartItems.map((item) => (

              <div key={item.id} className="flex justify-between items-center mb-5 border-b pb-4">

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-indigo-600 font-bold">₹{item.price * item.quantity}</p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
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

            <div className="font-bold text-lg mt-4">
              Total ₹{cartTotal}
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-3 rounded-xl mt-5 hover:scale-105 transition"
            >
              Checkout
            </button>

          </>

        )}

      </div>

      {/* FOOTER */}

      <footer className="bg-black/40 backdrop-blur-md text-white py-10 text-center">

        <p>
          © 2026 GramaBazaar • Connecting Villages to Cities
        </p>

      </footer>

    </div>
  );
}