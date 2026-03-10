"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../js/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [productForm, setProductForm] = useState({
    name: "",
    name_kn: "",
    description: "",
    description_kn: "",
    category: "",
    price: "",
    image: "",
    stock: "",
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
    "Ice Creams",
    "Chocolates",
  ];

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      router.push("/admin/login");
    } else {
      setAdmin(JSON.parse(storedAdmin));
      fetchProducts();
    }
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setProducts(data);
  }

  function handleChange(e) {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update({
          name: productForm.name,
          name_kn: productForm.name_kn,
          description: productForm.description,
          description_kn: productForm.description_kn,
          category: productForm.category,
          price: parseFloat(productForm.price),
          image: productForm.image,
          stock: parseInt(productForm.stock),
        })
        .eq("id", editingId);

      if (error) alert(error.message);
      else alert("Product Updated Successfully");
    } else {
      const { error } = await supabase.from("products").insert([
        {
          name: productForm.name,
          name_kn: productForm.name_kn,
          description: productForm.description,
          description_kn: productForm.description_kn,
          category: productForm.category,
          price: parseFloat(productForm.price),
          image: productForm.image,
          stock: parseInt(productForm.stock),
        },
      ]);

      if (error) alert(error.message);
      else alert("Product Added Successfully");
    }

    setProductForm({
      name: "",
      name_kn: "",
      description: "",
      description_kn: "",
      category: "",
      price: "",
      image: "",
      stock: "",
    });
    setEditingId(null);
    fetchProducts();
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      name_kn: product.name_kn || "",
      description: product.description || "",
      description_kn: product.description_kn || "",
      category: product.category,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete product?")) return;

    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  if (!admin) return null;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="text-sm bg-purple-600 px-4 py-2 rounded-full">
          {admin.email}
        </div>
      </div>

      {/* PRODUCT FORM */}
      <div className="bg-zinc-900 border border-purple-700 rounded-xl p-6 mb-12 max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-purple-400">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name (English)"
            value={productForm.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
            required
          />
          <input
            type="text"
            name="name_kn"
            placeholder="Product Name (Kannada)"
            value={productForm.name_kn}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description (English)"
            value={productForm.description}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
          />
          <input
            type="text"
            name="description_kn"
            placeholder="Description (Kannada)"
            value={productForm.description_kn}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
          />
          <select
            name="category"
            value={productForm.category}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productForm.price}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={productForm.stock}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productForm.image}
            onChange={handleChange}
            className="w-full p-3 mb-3 bg-black border border-purple-700 rounded"
          />
          {productForm.image && (
            <img
              src={productForm.image}
              className="h-28 mb-4 rounded border border-purple-700 object-cover w-full"
            />
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded font-semibold"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* CATEGORY FILTER */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          All
        </button>
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2 bg-zinc-800 hover:bg-purple-700 rounded transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-purple-800 rounded-xl p-4 hover:border-purple-500 transition"
          >
            <img
              src={product.image}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.category}</p>
            <p className="text-purple-400 font-bold text-lg mt-1">
              ₹{product.price}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}