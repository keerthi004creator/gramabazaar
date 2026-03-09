"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../js/supabaseClient";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) { router.push("/login"); return; }
    const u = JSON.parse(storedUser);
    setUser(u);
    setPhone(u.phone || "");
    setAddress(u.address || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from("users_profiles")
        .upsert({ email: user.email, phone, address }, { onConflict: ["email"] });
      if (error) throw error;

      const updatedUser = { ...user, phone, address };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile: " + err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">My Account</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Info */}
          <div className="bg-green-50 p-4 rounded-2xl shadow flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-gray-700">User Info</h3>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {editing ? <input className="border p-1 rounded" value={phone} onChange={(e)=>setPhone(e.target.value)} /> : (user.phone || "Not Provided")}</p>
            <p><strong>Address:</strong> {editing ? <textarea className="border p-1 rounded" value={address} onChange={(e)=>setAddress(e.target.value)} /> : (user.address || "Not Provided")}</p>
            {!editing ? (
              <button onClick={()=>setEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Edit</button>
            ) : (
              <button onClick={handleSaveProfile} className="bg-green-600 text-white px-3 py-1 rounded mt-2">Save</button>
            )}
          </div>

          {/* Orders Info */}
          <div className="bg-green-50 p-4 rounded-2xl shadow flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-gray-700">Orders</h3>
            {user.orders?.length > 0 ? (
              user.orders.map((order, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg shadow-sm mb-4">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Items:</strong></p>
                  <ul className="ml-4 list-disc">
                    {order.items?.map((i)=>(
                      <li key={i.id}>{i.name} × {i.quantity} (₹{i.price})</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}