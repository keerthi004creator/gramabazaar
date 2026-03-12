"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {

    const existing = cartItems.find(item => item.id === product.id);

    if (existing) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 }
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {

    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ⭐ THIS FIXES YOUR ERROR
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartOpen,
        setCartOpen,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);