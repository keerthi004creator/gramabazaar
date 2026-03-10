"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../context/languageContext";

export default function Home() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, setCartOpen,cartOpen } = useCart();
  const { language, toggleLanguage } = useLanguage();

  const [username, setUsername] = useState(null);
  const [showLogo, setShowLogo] = useState(
    typeof window !== "undefined" && !sessionStorage.getItem("logoShown")
  );

  const featuredItems = [
    { id: 1, name_en: "Vegetables", name_kn: "ತರಕಾರಿಗಳು", image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b" },
    { id: 2, name_en: "Fruits", name_kn: "ಹಣ್ಣುಗಳು", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
    { id: 3, name_en: "Milk & Dairy", name_kn: "ಹಾಲು & ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b" },
    { id: 4, name_en: "Snacks", name_kn: "ಸ್ನಾಕ್ಸ್", image: "https://static.toiimg.com/photo/59217136.cms" },
    { id: 5, name_en: "Bakery", name_kn: "ಬೇಕರಿ", image: "https://static.vecteezy.com/system/resources/previews/059/553/517/non_2x/assorted-delicious-pastries-and-donuts-sweet-treats-platter-bakery-goods-gourmet-delights-png.png" },
  ];

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
        <h1 className="text-3xl font-extrabold ...">
  🛍 {language === "en" ? "GramaBazaar" : "ಗ್ರಾಮಬಜಾರ್"}
        </h1>

        <div className="flex items-center gap-8">
          <span className="font-medium text-white/90">
          {language === "en" ? "Hello" : "ನಮಸ್ಕಾರ"}, {username}
          </span>

          {/* Language switcher */}
          <select
            value={language}
            onChange={(e) => toggleLanguage(e.target.value)}
            className="bg-white/20 text-white px-3 py-1 rounded backdrop-blur-md"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>

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
          {language === "en" ? "Fresh Village Groceries" : "ತಾಜಾ ಹಳ್ಳಿ ಗ್ರೋಸರಿ"}
        </h2>

        <p className="text-white/80 text-xl mb-10">
          {language === "en"
            ? "Organic fruits, vegetables and traditional foods directly from farmers"
            : "ಕೃಷಕರು ನೇರವಾಗಿ ನೀಡುವ ಆರ್ಗ್ಯಾನಿಕ್ ಹಣ್ಣುಗಳು, ತರಕಾರಿಗಳು ಮತ್ತು ಪರಂಪರಾ ಆಹಾರಗಳು"}
        </p>

        <button
          onClick={() => router.push("/shop")}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 px-16 py-4 rounded-full text-lg shadow-2xl hover:scale-110 transition"
        >
          {language === "en" ? "Shop Now" : "ಇದೀಗ ಖರೀದಿ ಮಾಡಿ"}
        </button>
      </section>

      {/* CATEGORY GRID */}
      <section className="px-12 pb-24">
        <h3 className="text-4xl font-bold text-center mb-16">
          {language === "en" ? "Available Categories" : "ವರ್ಗಾವಾರು ಖರೀದಿ ಮಾಡಿ"}
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
                {language === "en" ? item.name_en : item.name_kn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CART DRAWER & FOOTER remain unchanged */}
      <footer className="bg-black/40 backdrop-blur-md text-white py-10 text-center">

        <p>
          © 2026 GramaBazaar • Connecting Villages to Cities
        </p>

      </footer>

    </div>
  );
}