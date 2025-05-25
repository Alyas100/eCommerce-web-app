"use client";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop",
      color: "Natural Titanium",
      storage: "128GB",
    },
    {
      id: 2,
      name: "AirPods Pro",
      price: 249,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=150&h=150&fit=crop",
      color: "White",
      storage: null,
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 1199,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&h=150&fit=crop",
      color: "Space Gray",
      storage: "256GB SSD",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <main>
          <div>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">Continue Shopping</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main>
        <div>
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item(s) in your cart</p>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div style={{ flex: 2 }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "2rem",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", gap: "1rem" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <div style={{ flex: 1 }}>
                    <h3>{item.name}</h3>
                    <p>Color: {item.color}</p>
                    {item.storage && <p>Storage: {item.storage}</p>}
                    <p>Price: ${item.price}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p>
                      Total: ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <Link href="/products">Continue Shopping</Link>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div>
              <h2>Order Summary</h2>
              <button>Proceed to Checkout</button>
              <p>Secure checkout</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
