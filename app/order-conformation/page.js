"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Your fresh farm products will reach you soon.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}