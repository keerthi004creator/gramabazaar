"use client";

import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>
        <p className="text-gray-500 mb-6">You will receive updates on your order via email or phone.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}