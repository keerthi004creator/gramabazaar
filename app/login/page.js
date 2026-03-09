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
      // 1️⃣ Check admin table first
      const { data: adminData, error: adminError } = await supabase
        .from("admin") // Your admin table
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single(); // Only one record

      if (adminError && adminError.code !== "PGRST116") {
        console.log(adminError);
      }

      if (adminData) {
        // Admin credentials matched
        localStorage.setItem("admin", JSON.stringify(adminData));
        router.push("/admin/dashboard"); // Redirect to admin dashboard
        return;
      }

      // 2️⃣ If not admin, check normal users table
      const { data: userData, error: userError } = await supabase
        .from("users") // Your user table
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (userError) {
        console.log(userError);
        setErrorMsg("Email or password is incorrect.");
        return;
      }

      if (userData) {
        // User credentials matched
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/"); // Redirect to home page
        return;
      }

      // If neither admin nor user matched
      setErrorMsg("Email or password is incorrect.");
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errorMsg}</p>
        )}

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="w-full border p-2 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
          <p className="text-center mt-4">
    New User?{" "}
    <span
      onClick={() => router.push("/signup")}
      className="text-blue-600 hover:underline cursor-pointer"
    >
      Sign Up
    </span>
  </p>
      </form>
    </div>
  );
}