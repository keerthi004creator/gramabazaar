"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [username, setUsername] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Default featured items (static)
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
    router.replace("/login"); // block access if not logged in
  } else {
    setUsername(JSON.parse(user).username);
  }
}, [router]);

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src="https://lens.usercontent.google.com/banana?agsi=CmdnbG9iYWw6OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAwZWI6MTo1NzZiZTI2NzdkYzk2YjJmOjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAxOTQ0ZjEwMzM2ODowMDA2NGM4MjI1YmM1NWRmEAI=" // Add your logo in the public folder
            alt="GramaBazaar Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-green-600">GramaBazaar</h1>
        </div>

        <div className="flex items-center gap-6">
          {username ? (
            <span className="font-semibold text-gray-700">Hello, {username}</span>
          ) : (
            <>
              <button onClick={() => router.push("/login")} className="hover:text-green-600 transition">
                Login
              </button>
              <button onClick={() => router.push("/signup")} className="hover:text-green-600 transition">
                Sign Up
              </button>
            </>
          )}

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative flex items-center gap-1 text-gray-700 hover:text-green-600 transition"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => router.push("/user")}
            className="text-gray-700 hover:text-green-600 transition"
          >
            My Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-green-100 to-blue-50">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Fresh Groceries Delivered</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Shop vegetables, fruits, dairy & more with fast delivery.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </section>

      {/* Featured Categories */}
      <section className="px-6 py-12">
        <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800">Explore Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-cover rounded-full mb-4"
              />
              <span className="font-semibold text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Overlay */}
      {cartOpen && (
        <div className="fixed top-16 right-0 w-80 bg-white shadow-lg p-4 z-50 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    x
                  </button>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="mt-4 font-bold">Total: ₹{cartTotal}</div>
          )}
        </div>
      )}
    </div>
  );
}