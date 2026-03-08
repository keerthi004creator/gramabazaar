"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../js/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const categories = [
    "Vegetables",
    "Fruits",
    "Milk & Dairy",
    "Bakery",
    "Snacks",
    "Beverages",
    "Grains",
    "Spices",
    "Meat & Fish",
    "Others"
  ];

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      router.push("/admin/login");
    } else {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleChange = e => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("products")
      .insert([{
        name: productForm.name,
        category: productForm.category,
        price: parseFloat(productForm.price),
        image: productForm.image
      }]);

    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      alert("Product added successfully!");
      setProductForm({ name: "", category: "", price: "", image: "" });
    }
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6 text-gray-700">Logged in as: {admin.email}</p>

      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-10 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <select
          name="category"
          value={productForm.category}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={productForm.image}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>

      {/* Optionally, you can create 10 separate forms per category below if needed */}
    </div>
  );
}