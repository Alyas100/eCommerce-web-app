// app/checkout/page.tsx
"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError("");

    try {
      // Step 1: Create Payment Intent
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          orderTotal: 5494.5,
          confirmPayment: false, // First call to create intent
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = await response.json();

      if (!clientSecret) {
        throw new Error("No client secret received");
      }

      // Step 2: Simulate payment processing
      console.log("Processing payment...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3: Confirm Payment & Complete Order (same API, different flag)
      const confirmResponse = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          orderTotal: 5494.5,
          confirmPayment: true, // Second call to confirm and complete
          paymentIntentId,
        }),
      });

      if (!confirmResponse.ok) {
        throw new Error("Failed to complete order");
      }

      const orderResult = await confirmResponse.json();
      console.log("Order completed:", orderResult);

      setPaymentSuccess(true);

      // Redirect to success page
      setTimeout(() => {
        window.location.href = `/order-success?orderId=${
          orderResult.order?.orderId || "unknown"
        }`;
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Product */}
              <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">iPhone 15 Pro</h3>
                  <p className="text-sm text-gray-600">Quantity: 5</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$4,995</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$4,995.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$499.50</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$5,494.50</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Place Order - $5,494.50"
                )}
              </button>

              <p className="text-sm text-gray-600 text-center mt-4">
                🔒 Your payment information is secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
