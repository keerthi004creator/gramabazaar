"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Example logos (replace with real URLs or local images)
const cardLogo = "https://www.shutterstock.com/image-vector/credit-card-sign-mobile-app-260nw-1776017327.jpg";
const upiLogos = {
  PhonePe: "https://static.vecteezy.com/system/resources/previews/067/065/681/non_2x/phonepe-colored-logo-rounded-icon-transparent-background-free-png.png",
  Paytm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEjY90pS-UfgHJU4glc8Aiupp1xCn_jcvRQ&s",
  GooglePay: "https://animationvisarts.com/wp-content/uploads/2023/11/Frame-43-1.png",
};
const codIcon = "https://static.vecteezy.com/system/resources/thumbnails/008/013/016/small/payment-by-cash-for-express-delivery-flat-illustration-how-people-deliver-package-and-pay-for-the-delivery-by-cash-human-hand-holds-money-and-pay-for-the-package-courier-get-payment-for-it-vector.jpg";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardType, setCardType] = useState("");
  const [upiType, setUpiType] = useState("");
  const [address, setAddress] = useState("");

  const handleConfirmOrder = () => {
    if (!paymentMethod) return alert("Please select a payment method!");
    if (paymentMethod === "card" && !cardType) return alert("Select Credit or Debit card");
    if (paymentMethod === "upi" && !upiType) return alert("Select UPI method");
    if (!address) return alert("Please enter your address");

    router.push("/order-conformation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Payment & Address</h1>

        {/* Payment Method */}
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Select Payment Method:</h2>
        <div className="flex flex-col gap-4 mb-6">
          {/* Card Option */}
          <button
            onClick={() => { setPaymentMethod("card"); setUpiType(""); }}
            className={`flex items-center gap-4 p-4 rounded-lg shadow hover:shadow-lg transition border-2 ${paymentMethod === "card" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
          >
            <img src={cardLogo} className="h-10" alt="Card Logo" />
            <span className="text-lg font-semibold">Card</span>
          </button>

          {/* UPI Option */}
          <button
            onClick={() => { setPaymentMethod("upi"); setCardType(""); }}
            className={`flex items-center gap-4 p-4 rounded-lg shadow hover:shadow-lg transition border-2 ${paymentMethod === "upi" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
          >
            <span className="text-lg font-semibold">UPI</span>
            <div className="flex gap-2">
              {Object.entries(upiLogos).map(([name, logo]) => (
                <img key={name} src={logo} alt={name} className="h-8" />
              ))}
            </div>
          </button>

          {/* Cash on Delivery */}
          <button
            onClick={() => { setPaymentMethod("cod"); setCardType(""); setUpiType(""); }}
            className={`flex items-center gap-4 p-4 rounded-lg shadow hover:shadow-lg transition border-2 ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
          >
            <img src={codIcon} className="h-8" alt="Cash Icon" />
            <span className="text-lg font-semibold">Cash on Delivery</span>
          </button>
        </div>

        {/* Card Options */}
        {paymentMethod === "card" && (
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setCardType("credit")}
              className={`px-6 py-3 rounded-lg shadow border-2 transition ${cardType === "credit" ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-white"}`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setCardType("debit")}
              className={`px-6 py-3 rounded-lg shadow border-2 transition ${cardType === "debit" ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-white"}`}
            >
              Debit Card
            </button>
          </div>
        )}

        {/* UPI Options */}
        {paymentMethod === "upi" && (
          <div className="flex gap-4 mb-6 justify-center">
            {Object.entries(upiLogos).map(([name, logo]) => (
              <button
                key={name}
                onClick={() => setUpiType(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow border-2 transition ${upiType === name ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-white"}`}
              >
                <img src={logo} alt={name} className="h-6" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Address */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-blue-700">Delivery Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            placeholder="Enter your delivery address"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}