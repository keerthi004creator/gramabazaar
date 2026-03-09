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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EEF2FF] to-[#ECFEFF] p-8 flex justify-center items-start">

      <div className="w-full max-w-5xl bg-white border border-[#E5E7EB] rounded-3xl shadow-xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10 
        bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
          My Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* USER PROFILE CARD */}
          <div className="bg-white border border-[#E5E7EB] rounded-3xl shadow-md p-6 transition hover:shadow-xl hover:-translate-y-1 flex flex-col gap-3">

            <h3 className="text-xl font-semibold text-[#111827] mb-2">
              User Info
            </h3>

            <p className="text-[#111827]">
              <strong>Name:</strong> {user.username}
            </p>

            <p className="text-[#111827]">
              <strong>Email:</strong> {user.email}
            </p>

            <p className="text-[#111827]">
              <strong>Phone:</strong>{" "}
              {editing ? (
                <input
                  className="border border-[#D1D5DB] rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <span className="text-[#6B7280]">
                  {user.phone || "Not Provided"}
                </span>
              )}
            </p>

            <p className="text-[#111827]">
              <strong>Address:</strong>{" "}
              {editing ? (
                <textarea
                  className="border border-[#D1D5DB] rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : (
                <span className="text-[#6B7280]">
                  {user.address || "Not Provided"}
                </span>
              )}
            </p>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="mt-3 px-4 py-2 rounded-xl text-white font-semibold
                bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]
                hover:opacity-90 transition shadow"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="mt-3 px-4 py-2 rounded-xl text-white font-semibold
                bg-emerald-500 hover:bg-emerald-600 transition shadow"
              >
                Save Profile
              </button>
            )}

          </div>

          {/* ORDERS CARD */}
          <div className="bg-white border border-[#E5E7EB] rounded-3xl shadow-md p-6 transition hover:shadow-xl hover:-translate-y-1 flex flex-col gap-3">

            <h3 className="text-xl font-semibold text-[#111827] mb-2">
              Orders
            </h3>

            {user.orders?.length > 0 ? (
              user.orders.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-[#E5E7EB] rounded-xl p-4 shadow-sm mb-4"
                >

                  <p className="text-sm text-gray-700">
                    <strong>Order ID:</strong> {order.id}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Total:</strong>{" "}
                    <span className="text-emerald-600 font-semibold">
                      ₹{order.total}
                    </span>
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span className="text-indigo-600 font-medium">
                      {order.status}
                    </span>
                  </p>

                  <p className="mt-2 font-semibold text-gray-700">Items:</p>

                  <ul className="ml-5 list-disc text-sm text-gray-600">
                    {order.items?.map((i) => (
                      <li key={i.id}>
                        {i.name} × {i.quantity} (₹{i.price})
                      </li>
                    ))}
                  </ul>

                </div>
              ))
            ) : (
              <p className="text-[#6B7280]">
                No orders yet.
              </p>
            )}

          </div>

        </div>

        {/* LOGOUT BUTTON */}
        <div className="flex justify-center mt-10">

          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl font-semibold text-white
            bg-rose-500 hover:bg-rose-600 transition shadow-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}