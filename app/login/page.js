"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../js/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (adminData) {
        localStorage.setItem("admin", JSON.stringify(adminData));
        router.push("/admin/dashboard");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
        return;
      }

      setErrorMsg("Email or password is incorrect.");
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-4">
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg bg-white/80 shadow-xl border border-white/40 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {errorMsg && (
          <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {errorMsg}
          </p>
        )}

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
        >
          Login
        </button>

        <p className="text-center mt-5 text-gray-600">
          New User?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}