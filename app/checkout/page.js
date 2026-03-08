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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between py-4 text-xl font-bold">
              <span>Total:</span>
              <span>₹{cartTotal}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}