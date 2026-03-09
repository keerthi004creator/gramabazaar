"use client";

import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#F3F0FF] to-[#EDE9FE] p-6">

      <h1 className="text-4xl font-bold text-center mb-8 text-[#6D28D9]">
        Checkout
      </h1>

      <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl shadow-lg p-8">

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4
                  border border-[#E5E7EB] rounded-xl
                  hover:shadow-md transition"
                >

                  <div>
                    <p className="font-semibold text-[#111827] text-lg">
                      {item.name}
                    </p>

                    <p className="text-[#6B7280] text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-[#16A34A] text-lg">
                    ₹{item.price * item.quantity}
                  </p>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">

              <span className="text-xl font-semibold text-[#111827]">
                Total
              </span>

              <span className="text-2xl font-bold text-[#6D28D9]">
                ₹{cartTotal}
              </span>

            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 py-3 rounded-xl text-white font-semibold text-lg
              bg-[#6D28D9] hover:bg-[#5B21B6]
              shadow-md transition transform hover:scale-[1.02]"
            >
              Place Order
            </button>

          </>
        )}
      </div>
    </div>
  );
}