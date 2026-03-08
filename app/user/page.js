"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../js/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("user"); // remove login data
  router.replace("/login");        // go to login page
};

  if (!user) return null;

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">My Account</h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-2xl shadow flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-gray-700">User Info</h3>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
            <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
          </div>

          {/* Orders Info */}
          <div className="bg-green-50 p-4 rounded-2xl shadow flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-gray-700">Orders</h3>
            {user.orders?.length > 0 ? (
              user.orders.map((order, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Items:</strong> {order.items.map(i => i.name).join(", ")}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                </div>
              ))
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
        <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
>
  Logout
</button>
        </div>
      </div>
    </div>
  );
}