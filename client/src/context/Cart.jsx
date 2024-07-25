import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if(existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export const useCart = () => useContext(CartContext);

export default CartProvider;










