"use client";

import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,  // now comes from context
    cartOpen,
    setCartOpen,
  } = useCart();

  const router = useRouter();

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-[360px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 flex gap-3 items-center"
            >
              <img
                src={item.image}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-green-600">
                  ₹{Number(item.price).toLocaleString()}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeFromCart(item.id);
                      } else {
                        updateQuantity(item.id, item.quantity - 1);
                      }
                    }}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-5 border-t bg-white">
          <div className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>₹{Number(cartTotal).toLocaleString()}</span>
          </div>

          <button
            onClick={() => {
              setCartOpen(false);
              router.push("/checkout");
            }}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}